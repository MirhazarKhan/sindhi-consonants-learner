#!/usr/bin/env python3
"""
Apply existing `scripts/transcription_report.json` to mapping files.
This script is a safe, fast alternative to re-running Whisper; it reads the
existing report and previews or applies label updates to
`src/data/clean_audio_mapping.json` and `audio_classification.json`.

Usage:
  python scripts/apply_transcription_report.py --apply

"""
import argparse
import json
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
REPORT = ROOT / 'scripts' / 'transcription_report.json'
CLN = ROOT / 'src' / 'data' / 'clean_audio_mapping.json'
AC = ROOT / 'audio_classification.json'


def main(do_apply=False, limit=0):
    if not REPORT.exists():
        print('No transcription report found at', REPORT)
        return

    report = json.loads(REPORT.read_text(encoding='utf-8'))
    if limit and limit > 0:
        report = report[:limit]

    # Build mapping basename -> text
    mapping = {}
    for r in report:
        txt = (r.get('text') or '').strip()
        if not txt:
            continue
        base = Path(r['file']).name
        mapping[base] = txt

    cln = json.loads(CLN.read_text(encoding='utf-8')) if CLN.exists() else []
    ac = json.loads(AC.read_text(encoding='utf-8')) if AC.exists() else []

    planned = []

    def collect_changes(lst, target_name):
        for entry in lst:
            sf = entry.get('soundFile')
            if not sf:
                continue
            if sf in mapping:
                old = entry.get('labels')
                new = [mapping[sf]]
                if old != new:
                    planned.append({'soundFile': sf, 'old': old, 'new': new, 'target': target_name})

    collect_changes(cln, 'clean_audio_mapping')
    collect_changes(ac, 'audio_classification')

    print(f'Planned changes: {len(planned)}')
    if not planned:
        print('No changes detected.')
        return

    for p in planned[:50]:
        print(f"- {p['soundFile']}: {p['old']} -> {p['new']} ({p['target']})")

    if not do_apply:
        print('\nDry run complete. Re-run with --apply to write changes and create backups.')
        return

    # Backups
    for f in (CLN, AC):
        if f.exists():
            shutil.copy2(f, f.with_suffix('.bak'))

    # Apply changes
    def apply_changes(lst, target_name):
        applied = 0
        for entry in lst:
            sf = entry.get('soundFile')
            if sf and sf in mapping:
                new = [mapping[sf]]
                if entry.get('labels') != new:
                    entry['labels'] = new
                    applied += 1
        return applied

    a1 = apply_changes(cln, 'clean_audio_mapping')
    a2 = apply_changes(ac, 'audio_classification')

    CLN.write_text(json.dumps(cln, indent=2, ensure_ascii=False), encoding='utf-8')
    AC.write_text(json.dumps(ac, indent=2, ensure_ascii=False), encoding='utf-8')

    print(f'Applied changes: {a1} in clean_audio_mapping, {a2} in audio_classification')
    print('Backups created with .bak suffix.')


if __name__ == '__main__':
    p = argparse.ArgumentParser()
    p.add_argument('--apply', action='store_true', help='Apply updates')
    p.add_argument('--limit', type=int, default=0, help='Limit number of report rows to consider')
    args = p.parse_args()
    main(do_apply=args.apply, limit=args.limit)
