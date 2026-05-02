import re
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / 'public' / 'stage-experience.js'
OUT = ROOT / 'scripts' / 'audio_list.json'

pattern = re.compile(r"\"(?P<key>[\w\-]+\-?(?:info|main|example)?)\":\s*\"(?P<path>/extracted_audio/[\w_\-\.]+\.mp3)\"")

content = SRC.read_text(encoding='utf-8')
matches = list(pattern.finditer(content))

items = {}
for m in matches:
    key = m.group('key')
    path = m.group('path')
    items.setdefault(path, []).append(key)

OUT.parent.mkdir(parents=True, exist_ok=True)
OUT.write_text(json.dumps([{'file': p, 'keys': ks} for p, ks in items.items()], indent=2), encoding='utf-8')

print(f'Wrote {OUT} with {len(items)} audio files')
