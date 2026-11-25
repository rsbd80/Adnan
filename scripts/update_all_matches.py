
#!/usr/bin/env python3

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MATCH_DIR = ROOT / "data" / "matches"
INDEX_FILE = MATCH_DIR / "index.json"


def main():
    MATCH_DIR.mkdir(parents=True, exist_ok=True)

    match_files = sorted(
        MATCH_DIR.glob("match-*.json"),
        key=lambda p: p.name.lower()
    )

    valid_files = []

    for file in match_files:
        try:
            with file.open("r", encoding="utf-8") as f:
                data = json.load(f)

            if not isinstance(data, dict):
                print(f"Skipped invalid JSON structure: {file.name}")
                continue

            if not (
                isinstance(data.get("match"), dict)
                or isinstance(data.get("matches"), list)
                or "name" in data
            ):
                print(f"Skipped: No match data in {file.name}")
                continue

            valid_files.append(file.name)
            print(f"Checked: {file.name}")

        except Exception as e:
            print(f"Skipped {file.name}: {e}")

    index_data = {
        "files": valid_files
    }

    new_content = json.dumps(
        index_data,
        ensure_ascii=False,
        indent=2
    ) + "\n"

    old_content = ""

    if INDEX_FILE.exists():
        old_content = INDEX_FILE.read_text(encoding="utf-8")

    if old_content == new_content:
        print("Match index is already up to date.")
        return

    INDEX_FILE.write_text(new_content, encoding="utf-8")

    print(f"Match index updated: {len(valid_files)} valid match files")


if __name__ == "__main__":
    main()
