#!/usr/bin/env python3
"""
Apply only confident-looking transcriptions from scripts/transcription_report.json.
Confidence heuristic: transcription begins with "as " (case-insensitive).

Usage:
  python scripts/apply_confident_transcriptions.py --apply
"""
import argparse
import json
import shutil
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
REPORT = ROOT / 'scripts' / 'transcription_report.json'
CLN = ROOT / 'src' / 'data' / 'clean_audio_mapping.json'
AC = ROOT / 'audio_classification.json'

PAT = re.compile(r'^\s*as\b', re.I)


def main(do_apply=False, limit=0):
    if not REPORT.exists():
        print('No transcription report found at', REPORT)
        return

    report = json.loads(REPORT.read_text(encoding='utf-8'))
    if limit and limit > 0:
        report = report[:limit]

    mapping = {}
    for r in report:
        txt = (r.get('text') or '').strip()
        if not txt:
            continue
        if not PAT.search(txt):
            continue
        base = Path(r['file']).name
        mapping[base] = txt

    if not mapping:
        print('No confident transcriptions found.')
        return

    cln = json.loads(CLN.read_text(encoding='utf-8')) if CLN.exists() else []
    ac = json.loads(AC.read_text(encoding='utf-8')) if AC.exists() else []

    planned = []

    def collect(lst, target):
        for entry in lst:
            sf = entry.get('soundFile')
            if sf and sf in mapping:
                old = entry.get('labels')
                new = [mapping[sf]]
                if old != new:
                    planned.append({'soundFile': sf, 'old': old, 'new': new, 'target': target})

    collect(cln, 'clean_audio_mapping')
    collect(ac, 'audio_classification')

    print(f'Confident planned changes: {len(planned)}')
    for p in planned[:100]:
        print(f"- {p['soundFile']}: {p['old']} -> {p['new']} ({p['target']})")

    if not do_apply:
        print('\nDry run complete. Re-run with --apply to perform these changes.')
        return

    for f in (CLN, AC):
        if f.exists():
            shutil.copy2(f, f.with_suffix('.bak'))

    # apply
    def apply_changes(lst):
        applied = 0
        for entry in lst:
            sf = entry.get('soundFile')
            if sf and sf in mapping:
                new = [mapping[sf]]
                if entry.get('labels') != new:
                    entry['labels'] = new
                    applied += 1
        return applied

    a1 = apply_changes(cln)
    a2 = apply_changes(ac)

    CLN.write_text(json.dumps(cln, indent=2, ensure_ascii=False), encoding='utf-8')
    AC.write_text(json.dumps(ac, indent=2, ensure_ascii=False), encoding='utf-8')

    print(f'Applied changes: {a1} in clean_audio_mapping, {a2} in audio_classification')


if __name__ == '__main__':
    p = argparse.ArgumentParser()
    p.add_argument('--apply', action='store_true')
    p.add_argument('--limit', type=int, default=0)
    args = p.parse_args()
    main(do_apply=args.apply, limit=args.limit)
