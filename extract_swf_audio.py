from __future__ import annotations

import argparse
import struct
from pathlib import Path


def skip_rect(data: bytes, pos: int) -> int:
    first = data[pos]
    nbits = first >> 3
    total_bits = 5 + (nbits * 4)
    return pos + ((total_bits + 7) // 8)


def iter_tags(data: bytes, start: int):
    pos = start
    while pos + 2 <= len(data):
        record_header = struct.unpack_from('<H', data, pos)[0]
        pos += 2
        code = record_header >> 6
        length = record_header & 0x3F
        if length == 0x3F:
            length = struct.unpack_from('<I', data, pos)[0]
            pos += 4
        payload = data[pos:pos + length]
        pos += length
        yield code, payload
        if code == 0:
            break


def extract_mp3_sounds(swf_path: Path, output_dir: Path) -> Path:
    data = swf_path.read_bytes()
    if data[:3] not in (b'FWS', b'CWS'):
        raise ValueError('Unsupported SWF signature')
    if data[:3] == b'CWS':
        import zlib
        data = b'FWS' + data[3:8] + zlib.decompress(data[8:])

    pos = 8
    pos = skip_rect(data, pos)
    pos += 4

    output_dir.mkdir(parents=True, exist_ok=True)
    rows = []

    for code, payload in iter_tags(data, pos):
        if code != 14 or len(payload) < 9:
            continue

        sound_id = struct.unpack_from('<H', payload, 0)[0]
        flags = payload[2]
        sound_format = (flags >> 4) & 0x0F
        sample_count = struct.unpack_from('<I', payload, 3)[0]

        if sound_format != 2:
            continue

        seek_samples = struct.unpack_from('<h', payload, 7)[0]
        mp3_bytes = payload[9:]
        target = output_dir / f'sound_{sound_id:04d}.mp3'
        target.write_bytes(mp3_bytes)
        rows.append((sound_id, sample_count, seek_samples, len(mp3_bytes)))

    rows.sort(key=lambda row: row[0])
    index_path = output_dir / 'index.tsv'
    index_path.write_text(
        'sound_id\tsample_count\tseek_samples\tbytes\n' + '\n'.join(
            f'{sound_id}\t{sample_count}\t{seek_samples}\t{byte_count}'
            for sound_id, sample_count, seek_samples, byte_count in rows
        ),
        encoding='utf-8'
    )
    return index_path


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        '--swf',
        default='Learn Sindhi Language - Basics.swf'
    )
    parser.add_argument(
        '--out',
        default='extracted_audio'
    )
    args = parser.parse_args()

    swf_path = Path(args.swf).resolve()
    output_dir = Path(args.out).resolve()
    index_path = extract_mp3_sounds(swf_path, output_dir)
    print(f'Extracted MP3 audio to {output_dir}')
    print(f'Wrote manifest to {index_path}')


if __name__ == '__main__':
    main()
