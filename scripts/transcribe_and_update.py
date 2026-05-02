#!/usr/bin/env python3
"""
Transcribe audio files listed in scripts/audio_list.json using local Whisper.
Writes a JSON report `scripts/transcription_report.json` and can apply simple updates
to `src/data/clean_audio_mapping.json` and `audio_classification.json` by replacing
label entries with the transcribed text (preview mode by default).

Usage:
  python scripts/transcribe_and_update.py --apply

Requirements:
  - Python 3.8+
  - ffmpeg on PATH
  - pip install -U openai-whisper  # optional; script will try to import whisper

This script is conservative: it creates backups before modifying files.
"""
import json
import subprocess
from pathlib import Path
import argparse
import shutil

ROOT = Path(__file__).resolve().parents[1]
LIST = ROOT / 'scripts' / 'audio_list.json'
REPORT = ROOT / 'scripts' / 'transcription_report.json'
CLN = ROOT / 'src' / 'data' / 'clean_audio_mapping.json'
AC = ROOT / 'audio_classification.json'


def transcribe_with_whisper(path):
    try:
        import whisper
    except Exception:
        raise RuntimeError('whisper package not available; install with `pip install -U openai-whisper`')
    model = whisper.load_model('small')
    res = model.transcribe(str(path))
    return res.get('text','').strip()


def main(dry=True):
    if not LIST.exists():
        print('Run scripts/generate_audio_list.py first to create audio_list.json')
        return

    items = json.loads(LIST.read_text(encoding='utf-8'))
    report = []
    for it in items:
        file_rel = it['file']
        file_abs = ROOT / file_rel.lstrip('/')
        if not file_abs.exists():
            report.append({'file': file_rel, 'error': 'missing'})
            continue
        print('Transcribing', file_rel)
        text = transcribe_with_whisper(file_abs)
        report.append({'file': file_rel, 'text': text, 'keys': it.get('keys',[])})

    REPORT.write_text(json.dumps(report, indent=2, ensure_ascii=False), encoding='utf-8')
    print('Wrote', REPORT)

    if dry:
        print('Dry run: not applying updates. Re-run with --apply to modify mapping files.')
        return

    # Backup files
    for f in (CLN, AC):
        if f.exists():
            shutil.copy2(f, f.with_suffix(f'.bak'))

    # Load mapping files
    cln = json.loads(CLN.read_text(encoding='utf-8')) if CLN.exists() else []
    ac = json.loads(AC.read_text(encoding='utf-8')) if AC.exists() else []

    # Apply transcriptions to entries that match by soundFile basename.
    def apply_to_list(lst):
        changed = 0
        for r in report:
            base = Path(r['file']).name
            if 'text' not in r or not r['text']:
                continue
            for entry in lst:
                if entry.get('soundFile') == base:
                    entry['labels'] = [r['text']]
                    changed += 1
        return changed

    changed1 = apply_to_list(cln)
    changed2 = apply_to_list(ac)

    CLN.write_text(json.dumps(cln, indent=2, ensure_ascii=False), encoding='utf-8')
    AC.write_text(json.dumps(ac, indent=2, ensure_ascii=False), encoding='utf-8')
    print(f'Applied changes: {changed1} in clean_audio_mapping, {changed2} in audio_classification')


if __name__ == '__main__':
    p = argparse.ArgumentParser()
    p.add_argument('--apply', dest='apply', action='store_true', help='Apply updates to mapping files')
    args = p.parse_args()
    main(dry=not args.apply)
