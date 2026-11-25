#!/usr/bin/env python3
"""Update match streams from a sports M3U and build data/matches/index.json.

Supported input files: data/matches/New.json, match-1.json, match-2.json, etc.
Each file may contain {"match": {...}}, {"matches": [...]}, or a match object.
Expired matches are retained in JSON; the website hides them by endTime.
"""
from __future__ import annotations

import json
import os
import re
import sys
from pathlib import Path
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[1]
MATCH_DIR = ROOT / "data" / "matches"
INDEX_PATH = MATCH_DIR / "index.json"
PLAYLIST_URL = os.environ.get(
    "SPORTS_M3U_URL",
    "https://raw.githubusercontent.com/sm-monirulislam/Upcoming-and-Live-Sports-Data/main/Sports_data.m3u",
).strip()


def fetch_text(url: str) -> str:
    request = Request(url, headers={"User-Agent": "RsLiveGo-Match-Updater/1.0"})
    with urlopen(request, timeout=35) as response:
        return response.read().decode("utf-8", errors="replace")


def norm(value: str) -> str:
    return re.sub(r"[^a-z0-9]+", "", str(value or "").lower())


def extract_match_nodes(data):
    if isinstance(data, list):
        return [item for item in data if isinstance(item, dict) and item.get("name")]
    if not isinstance(data, dict):
        return []
    if isinstance(data.get("matches"), list):
        return [item for item in data["matches"] if isinstance(item, dict) and item.get("name")]
    if isinstance(data.get("match"), dict):
        return [data["match"]] if data["match"].get("name") else []
    if isinstance(data.get("match"), list):
        return [item for item in data["match"] if isinstance(item, dict) and item.get("name")]
    if isinstance(data.get("liveSports"), list):
        return [item for item in data["liveSports"] if isinstance(item, dict) and item.get("name")]
    return [data] if data.get("name") else []


def parse_m3u(text: str):
    entries = []
    current = None
    license_key = ""
    license_type = ""

    def finish(url):
        nonlocal current, license_key, license_type
        if current and url and not url.startswith("#"):
            drm = None
            if license_key and license_type.lower() == "clearkey":
                drm = {"scheme": "clearkey", "license": license_key}
            entry = {
                "name": current.get("display", "").strip(),
                "url": url.strip(),
                "show": "yes",
            }
            if drm:
                entry["drm"] = drm
            entries.append(entry)
        current = None
        license_key = ""
        license_type = ""

    for raw in text.splitlines():
        line = raw.strip()
        if not line:
            continue
        if line.startswith("#EXTINF:"):
            current = {"display": line.rsplit(",", 1)[-1].strip()}
            license_key = ""
            license_type = ""
        elif line.startswith("#KODIPROP:inputstream.adaptive.license_type="):
            license_type = line.split("=", 1)[1].strip()
        elif line.startswith("#KODIPROP:inputstream.adaptive.license_key="):
            license_key = line.split("=", 1)[1].strip()
        elif line.startswith("#"):
            continue
        else:
            finish(line)
    return entries


def find_streams(entries, match_name):
    wanted = norm(match_name)
    if not wanted:
        return []
    found = []
    seen = set()
    for entry in entries:
        display = norm(entry.get("name", ""))
        if wanted in display or display in wanted:
            url = entry.get("url", "")
            if url and url not in seen:
                seen.add(url)
                # Keep the channel/server name, not the full EXTINF title.
                name = entry.get("name", "")
                if " - " in name:
                    name = name.split(" - ", 1)[1].strip()
                item = {"name": name or "Live Server", "url": url, "show": "yes"}
                if entry.get("drm"):
                    item["drm"] = entry["drm"]
                found.append(item)
    return found


def write_json(path: Path, data):
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def main():
    MATCH_DIR.mkdir(parents=True, exist_ok=True)
    files = sorted(
        path for path in MATCH_DIR.glob("*.json")
        if path.name.lower() != "index.json"
    )
    if not files:
        print("No individual match JSON files found; writing an empty index.")

    playlist_entries = []
    if PLAYLIST_URL:
        try:
            playlist_entries = parse_m3u(fetch_text(PLAYLIST_URL))
            print(f"Loaded {len(playlist_entries)} entries from sports M3U")
        except Exception as exc:
            print(f"WARNING: M3U update skipped: {exc}", file=sys.stderr)

    all_matches = []
    seen = set()
    for path in files:
        try:
            original = json.loads(path.read_text(encoding="utf-8"))
        except Exception as exc:
            print(f"WARNING: Cannot read {path.name}: {exc}", file=sys.stderr)
            continue

        nodes = extract_match_nodes(original)
        changed = False
        for match in nodes:
            name = str(match.get("name", "")).strip()
            streams = find_streams(playlist_entries, name) if playlist_entries else []
            if streams:
                match["streams"] = streams
                match["url"] = streams[0]["url"]
                if streams[0].get("drm"):
                    match["drm"] = streams[0]["drm"]
                else:
                    match.pop("drm", None)
                changed = True
                print(f"{path.name}: refreshed {len(streams)} server(s) for {name}")

            match.setdefault("enabled", True)
            match.setdefault("status", "auto")
            match.setdefault("section", "liveSports")
            match.setdefault("category", "Live Sports")
            match["sourceFile"] = path.name

            identity = str(match.get("id") or match.get("match_id") or name).strip().lower()
            if identity and identity not in seen:
                seen.add(identity)
                all_matches.append(match.copy())

        if changed:
            write_json(path, original)

    all_matches.sort(key=lambda item: str(item.get("startTime") or item.get("start_time") or ""))
    index_data = {"matches": all_matches}
    previous = None
    if INDEX_PATH.exists():
        try:
            previous = json.loads(INDEX_PATH.read_text(encoding="utf-8"))
        except Exception:
            previous = None
    if previous != index_data:
        write_json(INDEX_PATH, index_data)
        print(f"Built index.json with {len(all_matches)} match(es)")
    else:
        print(f"index.json already current ({len(all_matches)} match(es))")


if __name__ == "__main__":
    main()
