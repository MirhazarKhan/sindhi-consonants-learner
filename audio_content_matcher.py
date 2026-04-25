#!/usr/bin/env python3
"""
Content-based audio-to-tile suggestion tool.

This script does not use filename patterns for matching. It builds an acoustic
feature space from known tile audio samples, then finds nearest neighbors for
candidate/unmapped audio clips.

Usage examples:
  python audio_content_matcher.py
  python audio_content_matcher.py --lesson heh
  python audio_content_matcher.py --targets all-mp3 --topk 8
  python audio_content_matcher.py --targets-file custom_targets.txt
"""

from __future__ import annotations

import argparse
import json
import math
import os
import re
import subprocess
import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Dict, Iterable, List, Optional, Sequence, Tuple

import numpy as np


DEFAULT_SR = 16000


@dataclass
class TileReference:
    tile_key: str
    lesson_id: str
    tile_index: int
    audio_rel_path: str
    audio_abs_path: Path


@dataclass
class Suggestion:
    target_file: str
    best_tile_key: str
    best_lesson_id: str
    best_tile_index: int
    confidence: float
    best_distance: float
    top_matches: List[Dict[str, object]]
    tile_index_votes: List[Dict[str, object]]


@dataclass
class RefModel:
    ref_meta: List[TileReference]
    X_ref: np.ndarray
    Z_ref: np.ndarray
    med: np.ndarray
    scale: np.ndarray
    lesson_to_ref_indices: Dict[str, np.ndarray]


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Suggest tile placement using audio content only")
    parser.add_argument("--root", default=".", help="Project root (default: current directory)")
    parser.add_argument(
        "--reference-source",
        default="sindhi-json",
        choices=["sindhi-json", "mapping-js"],
        help="Reference tile source. sindhi-json is usually the most accurate in this project.",
    )
    parser.add_argument(
        "--sindhi-json",
        default="sindhi_app_data.json",
        help="JSON file used to reconstruct lesson tile mapping",
    )
    parser.add_argument(
        "--mapping-js",
        default="baseExtractedStageAudio.js",
        help="JS file containing audio key -> file mapping",
    )
    parser.add_argument(
        "--unmapped-html",
        default="unmapped_auditor.html",
        help="HTML containing const sounds=[...] list",
    )
    parser.add_argument(
        "--targets",
        default="unmapped-html",
        choices=["unmapped-html", "all-mp3", "mapped-tiles"],
        help="Candidate target source",
    )
    parser.add_argument(
        "--targets-file",
        default="",
        help="Optional text file (one audio filename/path per line) overriding --targets",
    )
    parser.add_argument(
        "--lesson",
        default="",
        help="Optional lesson id (e.g., heh) to constrain suggestions to that lesson's 10 tiles",
    )
    parser.add_argument("--topk", type=int, default=5, help="Nearest neighbors to keep")
    parser.add_argument(
        "--lesson-aware-weight",
        type=float,
        default=0.35,
        help="Blend weight for lesson-normalized distances (0 disables lesson-aware scoring)",
    )
    parser.add_argument(
        "--sequence-lessons",
        default="",
        help="Comma-separated lessons to generate one-target-per-tile constrained assignments",
    )
    parser.add_argument(
        "--sequence-targets-per-tile",
        type=int,
        default=3,
        help="How many candidate targets to keep per tile in constrained assignment output",
    )
    parser.add_argument(
        "--out-json",
        default="audio_tile_suggestions.json",
        help="Output JSON report file",
    )
    parser.add_argument(
        "--out-csv",
        default="audio_tile_suggestions.csv",
        help="Output CSV summary file",
    )
    return parser.parse_args()


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def parse_mapping_js(mapping_js_text: str) -> Dict[str, str]:
    entries: Dict[str, str] = {}
    line_re = re.compile(r"'([^']+)'\s*:\s*'([^']+)'\s*,?")
    for raw in mapping_js_text.splitlines():
        m = line_re.search(raw)
        if m:
            entries[m.group(1)] = m.group(2)
    return entries


def extract_tile_references(mapping: Dict[str, str], root: Path) -> List[TileReference]:
    tile_re = re.compile(r"^([a-zA-Z0-9_]+)-tile-(\d{1,2})$")
    refs: List[TileReference] = []
    for key, rel in mapping.items():
        m = tile_re.match(key)
        if not m:
            continue
        lesson_id = m.group(1).lower()
        tile_index = int(m.group(2))
        rel_norm = rel.lstrip("/").replace("\\", "/")
        abs_path = (root / rel_norm).resolve()
        refs.append(
            TileReference(
                tile_key=key,
                lesson_id=lesson_id,
                tile_index=tile_index,
                audio_rel_path=rel_norm,
                audio_abs_path=abs_path,
            )
        )
    return refs


def build_tile_refs_from_sindhi_json(sindhi_rows: Sequence[dict], root: Path) -> List[TileReference]:
    lessons = [
        "alif",
        "be",
        "bbe",
        "pe",
        "bhe",
        "te",
        "the",
        "tte",
        "tthe",
        "se",
        "jeem",
        "nye",
        "jhe",
        "che",
        "chhe",
        "he",
        "khe",
        "dal",
        "dhal",
        "ddal",
        "ddhal",
        "zal",
        "re",
        "rre",
        "ze",
        "seen",
        "sheen",
        "swad",
        "zwad",
        "toe",
        "zoe",
        "ain",
        "ghain",
        "fe",
        "phe",
        "qaf",
        "kaf",
        "khaf",
        "gaf",
        "ggaf",
        "ngoe",
        "lam",
        "meem",
        "noon",
        "nnoon",
        "waw",
        "heh",
        "hamza",
        "ye",
    ]

    groups: List[dict] = []
    current: Optional[dict] = None

    for row in sindhi_rows:
        if row.get("type") == "letter_sound" and row.get("isLetterTile") is True:
            if current:
                groups.append(current)
            current = {"intro": row, "tiles": []}
        elif current is not None:
            current["tiles"].append(row)

    if current:
        groups.append(current)

    # Keep behavior consistent with existing project analyzer.
    for i in range(len(groups) - 1, 0, -1):
        if len(groups[i]["tiles"]) < 10 and len(groups[i - 1]["tiles"]) < 10:
            groups[i - 1]["tiles"].extend(groups[i]["tiles"])
            groups.pop(i)

    refs: List[TileReference] = []
    lesson_count = min(len(lessons), len(groups))
    for li in range(lesson_count):
        lesson_id = lessons[li]
        g = groups[li]
        tiles = list(g["tiles"])
        if len(tiles) == 9:
            tiles = [g["intro"], *tiles]
        n = min(10, len(tiles))
        for idx in range(n):
            row = tiles[idx]
            sf = str(row.get("soundFile", "")).strip()
            if not sf:
                continue
            rel = f"extracted_audio/{sf}".replace("\\", "/")
            refs.append(
                TileReference(
                    tile_key=f"{lesson_id}-tile-{idx + 1:02d}",
                    lesson_id=lesson_id,
                    tile_index=idx + 1,
                    audio_rel_path=rel,
                    audio_abs_path=(root / rel).resolve(),
                )
            )

    return refs


def parse_unmapped_html(html_text: str) -> List[str]:
    m = re.search(r"const\s+sounds\s*=\s*\[(.*?)\];", html_text, flags=re.S)
    if not m:
        return []
    body = m.group(1)
    return re.findall(r'"([^"]+\.(?:mp3|wav))"', body, flags=re.I)


def load_targets_from_file(path: Path) -> List[str]:
    items = []
    for line in read_text(path).splitlines():
        s = line.strip()
        if not s or s.startswith("#"):
            continue
        items.append(s)
    return items


def decode_audio_to_float32_mono(path: Path, sample_rate: int = DEFAULT_SR) -> np.ndarray:
    cmd = [
        "ffmpeg",
        "-v",
        "error",
        "-i",
        str(path),
        "-ac",
        "1",
        "-ar",
        str(sample_rate),
        "-f",
        "f32le",
        "-",
    ]
    proc = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, check=False)
    if proc.returncode != 0:
        err = proc.stderr.decode("utf-8", errors="replace").strip()
        raise RuntimeError(f"ffmpeg decode failed for {path.name}: {err}")
    audio = np.frombuffer(proc.stdout, dtype=np.float32)
    if audio.size == 0:
        raise RuntimeError(f"empty decoded audio for {path.name}")
    # Prevent clipping spikes from dominating spectral stats.
    return np.clip(audio, -1.0, 1.0)


def frame_signal(x: np.ndarray, frame_size: int, hop_size: int) -> np.ndarray:
    if x.size < frame_size:
        pad = np.zeros(frame_size - x.size, dtype=np.float32)
        x = np.concatenate([x, pad])
    n_frames = 1 + (x.size - frame_size) // hop_size
    frames = np.zeros((n_frames, frame_size), dtype=np.float32)
    for i in range(n_frames):
        s = i * hop_size
        frames[i] = x[s : s + frame_size]
    return frames


def spectral_features(x: np.ndarray, sr: int) -> Tuple[float, float, float]:
    win = np.hanning(x.size).astype(np.float32)
    mag = np.abs(np.fft.rfft(x * win))
    freqs = np.fft.rfftfreq(x.size, 1.0 / sr)

    mag_sum = float(np.sum(mag)) + 1e-12
    centroid = float(np.sum(freqs * mag) / mag_sum)

    cum = np.cumsum(mag)
    cutoff = 0.85 * cum[-1]
    rolloff_idx = int(np.searchsorted(cum, cutoff))
    rolloff = float(freqs[min(rolloff_idx, freqs.size - 1)])

    pow_spec = mag * mag + 1e-12
    gmean = float(np.exp(np.mean(np.log(pow_spec))))
    amean = float(np.mean(pow_spec))
    flatness = gmean / (amean + 1e-12)

    return centroid, rolloff, flatness


def compute_features(x: np.ndarray, sr: int = DEFAULT_SR) -> np.ndarray:
    duration = x.size / float(sr)
    rms = float(np.sqrt(np.mean(x * x)))

    # Robust silence ratio using low-energy threshold.
    silence_ratio = float(np.mean(np.abs(x) < 0.01))

    # Zero crossing rate.
    zc = np.where(np.diff(np.signbit(x)))[0]
    zcr = float(zc.size / max(1, x.size - 1))

    centroid, rolloff, flatness = spectral_features(x, sr)

    # Coarse temporal stability from short-time RMS variance.
    frame_size = int(0.03 * sr)
    hop = int(0.015 * sr)
    frames = frame_signal(x, frame_size, hop)
    frms = np.sqrt(np.mean(frames * frames, axis=1) + 1e-12)
    rms_mean = float(np.mean(frms))
    rms_std = float(np.std(frms))
    rms_cv = rms_std / (rms_mean + 1e-12)

    return np.array(
        [duration, rms, silence_ratio, zcr, centroid, rolloff, flatness, rms_cv],
        dtype=np.float64,
    )


def robust_scale_fit(X: np.ndarray) -> Tuple[np.ndarray, np.ndarray]:
    med = np.median(X, axis=0)
    mad = np.median(np.abs(X - med), axis=0)
    scale = np.where(mad < 1e-9, 1.0, mad * 1.4826)
    return med, scale


def robust_scale_transform(X: np.ndarray, med: np.ndarray, scale: np.ndarray) -> np.ndarray:
    return (X - med) / scale


def euclidean_distances(a: np.ndarray, B: np.ndarray) -> np.ndarray:
    diff = B - a[None, :]
    return np.sqrt(np.sum(diff * diff, axis=1))


def to_rel_audio_path(candidate: str) -> str:
    p = candidate.replace("\\", "/").strip()
    if p.lower().startswith("extracted_audio/"):
        return p
    return f"extracted_audio/{p.lstrip('/')}"


def build_ref_model(ref_meta: List[TileReference], ref_rows: Sequence[np.ndarray]) -> RefModel:
    X_ref = np.vstack(ref_rows)
    med, scale = robust_scale_fit(X_ref)
    Z_ref = robust_scale_transform(X_ref, med, scale)

    lesson_to_ref_indices: Dict[str, List[int]] = {}
    for idx, meta in enumerate(ref_meta):
        lesson_to_ref_indices.setdefault(meta.lesson_id, []).append(idx)

    lesson_to_ref_idx_np = {k: np.array(v, dtype=np.int32) for k, v in lesson_to_ref_indices.items()}
    return RefModel(
        ref_meta=ref_meta,
        X_ref=X_ref,
        Z_ref=Z_ref,
        med=med,
        scale=scale,
        lesson_to_ref_indices=lesson_to_ref_idx_np,
    )


def apply_lesson_aware_distances(
    base_dists: np.ndarray,
    feat: np.ndarray,
    model: RefModel,
    lesson_weight: float,
) -> np.ndarray:
    if lesson_weight <= 0.0:
        return base_dists

    adjusted = base_dists.copy()
    for lesson_id, idxs in model.lesson_to_ref_indices.items():
        if idxs.size < 2:
            continue

        X_l = model.X_ref[idxs]
        med_l, scale_l = robust_scale_fit(X_l)
        z_l = robust_scale_transform(feat[None, :], med_l, scale_l)[0]
        Z_ref_l = robust_scale_transform(X_l, med_l, scale_l)
        d_l = euclidean_distances(z_l, Z_ref_l)

        # Blend global and lesson-local spaces.
        adjusted[idxs] = (1.0 - lesson_weight) * adjusted[idxs] + lesson_weight * d_l

    return adjusted


def parse_csv_lessons(raw: str) -> List[str]:
    out = []
    for part in raw.split(","):
        s = part.strip().lower()
        if s:
            out.append(s)
    return out


def build_constrained_assignments(
    suggestions: Sequence[Suggestion],
    lessons: Sequence[str],
    targets_per_tile: int,
) -> Dict[str, Dict[str, object]]:
    result: Dict[str, Dict[str, object]] = {}
    if not lessons:
        return result

    for lesson in lessons:
        # target -> tile -> best score found in top matches
        target_tile_score: Dict[str, Dict[int, float]] = {}
        target_tile_distance: Dict[str, Dict[int, float]] = {}

        for s in suggestions:
            for m in s.top_matches:
                if str(m.get("lesson_id", "")).lower() != lesson:
                    continue
                tile = int(m.get("tile_index", 0))
                if tile < 1 or tile > 10:
                    continue
                score = float(m.get("weight", 0.0))
                dist = float(m.get("distance", 9999.0))

                tile_map = target_tile_score.setdefault(s.target_file, {})
                dist_map = target_tile_distance.setdefault(s.target_file, {})
                if score > tile_map.get(tile, -1.0):
                    tile_map[tile] = score
                    dist_map[tile] = dist

        # Ranked candidate lists per tile.
        per_tile_candidates: Dict[int, List[Dict[str, object]]] = {}
        for tile in range(1, 11):
            cands = []
            for target, tile_scores in target_tile_score.items():
                if tile in tile_scores:
                    cands.append(
                        {
                            "target_file": target,
                            "score": tile_scores[tile],
                            "distance": target_tile_distance[target][tile],
                        }
                    )
            cands.sort(key=lambda x: (-float(x["score"]), float(x["distance"]), str(x["target_file"])))
            per_tile_candidates[tile] = cands[: max(1, targets_per_tile)]

        # Greedy unique assignment across all tile-target pairs.
        edges = []
        for tile in range(1, 11):
            for cand in per_tile_candidates[tile]:
                edges.append((tile, str(cand["target_file"]), float(cand["score"]), float(cand["distance"])))
        edges.sort(key=lambda e: (-e[2], e[3], e[1], e[0]))

        used_tiles = set()
        used_targets = set()
        assigned: Dict[int, Dict[str, object]] = {}
        for tile, target, score, dist in edges:
            if tile in used_tiles or target in used_targets:
                continue
            assigned[tile] = {
                "target_file": target,
                "score": score,
                "distance": dist,
            }
            used_tiles.add(tile)
            used_targets.add(target)

        result[lesson] = {
            "coverage": len(assigned),
            "targets_per_tile": max(1, targets_per_tile),
            "per_tile_candidates": {str(k): v for k, v in per_tile_candidates.items()},
            "greedy_unique_assignment": {str(k): v for k, v in sorted(assigned.items())},
        }

    return result


def write_csv(path: Path, rows: Sequence[Suggestion]) -> None:
    header = [
        "target_file",
        "best_tile_key",
        "best_lesson_id",
        "best_tile_index",
        "confidence",
        "best_distance",
    ]
    lines = [",".join(header)]
    for r in rows:
        lines.append(
            ",".join(
                [
                    r.target_file,
                    r.best_tile_key,
                    r.best_lesson_id,
                    str(r.best_tile_index),
                    f"{r.confidence:.6f}",
                    f"{r.best_distance:.6f}",
                ]
            )
        )
    path.write_text("\n".join(lines) + "\n", encoding="utf-8")


def main() -> int:
    args = parse_args()
    root = Path(args.root).resolve()
    mapping_js = root / args.mapping_js
    sindhi_json = root / args.sindhi_json
    unmapped_html = root / args.unmapped_html

    tile_refs: List[TileReference] = []
    if args.reference_source == "sindhi-json":
        if not sindhi_json.exists():
            print(f"Sindhi JSON file not found: {sindhi_json}", file=sys.stderr)
            return 1
        try:
            rows = json.loads(read_text(sindhi_json))
        except Exception as exc:
            print(f"Failed to parse {sindhi_json.name}: {exc}", file=sys.stderr)
            return 1
        if not isinstance(rows, list):
            print(f"Expected top-level list in {sindhi_json.name}", file=sys.stderr)
            return 1
        tile_refs = build_tile_refs_from_sindhi_json(rows, root)
    else:
        if not mapping_js.exists():
            print(f"Mapping file not found: {mapping_js}", file=sys.stderr)
            return 1
        mapping_text = read_text(mapping_js)
        mapping = parse_mapping_js(mapping_text)
        tile_refs = extract_tile_references(mapping, root)

    if args.lesson:
        lesson = args.lesson.strip().lower()
        tile_refs = [r for r in tile_refs if r.lesson_id == lesson]
        if not tile_refs:
            print(f"No tile references for lesson '{lesson}'", file=sys.stderr)
            return 1

    tile_refs = [r for r in tile_refs if r.audio_abs_path.exists()]
    if len(tile_refs) < 5:
        print("Not enough mapped tile audio files to build a reference space", file=sys.stderr)
        return 1

    if args.targets_file:
        target_candidates = load_targets_from_file((root / args.targets_file).resolve())
    elif args.targets == "unmapped-html":
        if not unmapped_html.exists():
            print(f"Unmapped HTML file not found: {unmapped_html}", file=sys.stderr)
            return 1
        target_candidates = parse_unmapped_html(read_text(unmapped_html))
    elif args.targets == "all-mp3":
        target_candidates = [p.name for p in sorted((root / "extracted_audio").glob("*.mp3"))]
    else:  # mapped-tiles
        target_candidates = [Path(r.audio_rel_path).name for r in tile_refs]

    target_paths: List[Tuple[str, Path]] = []
    for c in target_candidates:
        rel = to_rel_audio_path(c)
        abs_path = (root / rel).resolve()
        if abs_path.exists():
            target_paths.append((Path(rel).name, abs_path))

    if not target_paths:
        print("No valid target audio files found", file=sys.stderr)
        return 1

    # Feature extraction for reference tiles.
    ref_rows = []
    ref_meta = []
    for ref in tile_refs:
        try:
            x = decode_audio_to_float32_mono(ref.audio_abs_path)
            feat = compute_features(x, DEFAULT_SR)
            ref_rows.append(feat)
            ref_meta.append(ref)
        except Exception:
            continue

    if len(ref_rows) < 5:
        print("Feature extraction failed for too many reference tiles", file=sys.stderr)
        return 1

    model = build_ref_model(ref_meta, ref_rows)

    # Suggest for each target.
    k = max(1, int(args.topk))
    suggestions: List[Suggestion] = []
    skipped = 0

    for file_name, abs_path in target_paths:
        try:
            x = decode_audio_to_float32_mono(abs_path)
            feat = compute_features(x, DEFAULT_SR)
            z = robust_scale_transform(feat[None, :], model.med, model.scale)[0]
            dists = euclidean_distances(z, model.Z_ref)
            dists = apply_lesson_aware_distances(dists, feat, model, max(0.0, min(1.0, args.lesson_aware_weight)))

            order = np.argsort(dists)
            top_idx = order[: min(k, len(order))]
            top_d = dists[top_idx]

            # Confidence from softmin on top-k distances.
            temperature = float(np.std(top_d) + 1e-6)
            logits = -top_d / temperature
            logits -= np.max(logits)
            probs = np.exp(logits)
            probs /= np.sum(probs)

            top_matches = []
            tile_vote: Dict[int, float] = {}
            for rank, (i_ref, dist, prob) in enumerate(zip(top_idx, top_d, probs), start=1):
                meta = ref_meta[int(i_ref)]
                top_matches.append(
                    {
                        "rank": rank,
                        "tile_key": meta.tile_key,
                        "lesson_id": meta.lesson_id,
                        "tile_index": meta.tile_index,
                        "audio_rel_path": meta.audio_rel_path,
                        "distance": float(dist),
                        "weight": float(prob),
                    }
                )
                tile_vote[meta.tile_index] = tile_vote.get(meta.tile_index, 0.0) + float(prob)

            best_match = top_matches[0]
            tile_index_votes = [
                {"tile_index": idx, "score": score}
                for idx, score in sorted(tile_vote.items(), key=lambda kv: kv[1], reverse=True)
            ]

            suggestions.append(
                Suggestion(
                    target_file=file_name,
                    best_tile_key=str(best_match["tile_key"]),
                    best_lesson_id=str(best_match["lesson_id"]),
                    best_tile_index=int(best_match["tile_index"]),
                    confidence=float(best_match["weight"]),
                    best_distance=float(best_match["distance"]),
                    top_matches=top_matches,
                    tile_index_votes=tile_index_votes,
                )
            )
        except Exception:
            skipped += 1

    if not suggestions:
        print("No target files could be analyzed", file=sys.stderr)
        return 1

    sequence_lessons = parse_csv_lessons(args.sequence_lessons)
    constrained = build_constrained_assignments(
        suggestions,
        sequence_lessons,
        max(1, int(args.sequence_targets_per_tile)),
    )

    # Persist reports.
    out_json = (root / args.out_json).resolve()
    out_csv = (root / args.out_csv).resolve()

    payload = {
        "root": str(root),
        "reference_count": len(ref_meta),
        "target_count": len(target_paths),
        "analyzed_count": len(suggestions),
        "skipped_count": skipped,
        "lesson_filter": args.lesson or None,
        "feature_names": [
            "duration_s",
            "rms",
            "silence_ratio",
            "zcr",
            "spectral_centroid_hz",
            "spectral_rolloff_85_hz",
            "spectral_flatness",
            "rms_coeff_variation",
        ],
        "lesson_aware_weight": max(0.0, min(1.0, args.lesson_aware_weight)),
        "sequence_lessons": sequence_lessons,
        "constrained_assignments": constrained,
        "suggestions": [
            {
                "target_file": s.target_file,
                "best_tile_key": s.best_tile_key,
                "best_lesson_id": s.best_lesson_id,
                "best_tile_index": s.best_tile_index,
                "confidence": s.confidence,
                "best_distance": s.best_distance,
                "top_matches": s.top_matches,
                "tile_index_votes": s.tile_index_votes,
            }
            for s in suggestions
        ],
    }

    out_json.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    write_csv(out_csv, suggestions)

    # Console summary.
    conf = np.array([s.confidence for s in suggestions], dtype=np.float64)
    print(f"Reference tiles: {len(ref_meta)}")
    print(f"Targets found: {len(target_paths)}")
    print(f"Targets analyzed: {len(suggestions)}")
    print(f"Targets skipped: {skipped}")
    print(f"Confidence mean: {float(np.mean(conf)):.3f}")
    print(f"Confidence median: {float(np.median(conf)):.3f}")
    if constrained:
        for lesson_id in sequence_lessons:
            info = constrained.get(lesson_id, {})
            print(f"Constrained coverage {lesson_id}: {int(info.get('coverage', 0))}/10")
    print(f"Wrote JSON: {out_json}")
    print(f"Wrote CSV: {out_csv}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
