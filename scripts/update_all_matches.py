#!/usr/bin/env python3
"""Auto-update ALL matches in data/matches/ from remote M3U."""
import json, os, re
from pathlib import Path
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[1]
MATCHES_DIR = ROOT / "data" / "matches"
PLAYLIST_URL = os.environ.get("SPORTS_M3U_URL",
  "https://raw.githubusercontent.com/sm-monirulislam/Upcoming-and-Live-Sports-Data/main/Sports_data.m3u")

def fetch_text(url):
    req = Request(url, headers={"User-Agent": "SPORTYNOVA-Updater/1.0"})
    with urlopen(req, timeout=30) as r:
        return r.read().decode("utf-8", errors="replace")

def norm(t): return re.sub(r"[^a-z0-9]+", "", (t or "").lower())

def parse_m3u(text, match_name):
    wanted = norm(match_name)
    entries, current, l_key, l_type = [], None, "", ""
    for raw in text.splitlines():
        line = raw.strip()
        if not line: continue
        if line.startswith("#EXTINF:"):
            current = {"display": line.rsplit(",",1)[-1].strip()}
            l_key = l_type = ""
        elif "license_type=" in line:
            l_type = line.split("=",1)[1].strip()
        elif "license_key=" in line:
            l_key = line.split("=",1)[1].strip()
        elif line.startswith("#"): continue
        else:
            if current and wanted in norm(current["display"]):
                drm = {"scheme":"clearkey","license":l_key} if l_key and "clearkey" in l_type.lower() else None
                entries.append({"name": current["display"].split(" - ",1)[-1].strip(), "url": line, **({"drm":drm} if drm else {}), "show":"yes"})
            current=None; l_key=l_type=""
    # dedupe
    seen=set(); out=[]
    for e in entries:
        if e["url"] not in seen: seen.add(e["url"]); out.append(e)
    return out

def main():
    playlist = fetch_text(PLAYLIST_URL)
    for p in sorted(MATCHES_DIR.glob("match-*.json")):
        data = json.loads(p.read_text(encoding="utf-8"))
        m = data.get("match", {})
        if not m.get("name"): continue
        streams = parse_m3u(playlist, m["name"])
        if not streams:
            print(f"SKIP {p.name}: no stream for {m['name']}")
            continue
        m["streams"]=streams; m["url"]=streams[0]["url"]
        if streams[0].get("drm"): m["drm"]=streams[0]["drm"]
        else: m.pop("drm",None)
        p.write_text(json.dumps(data, ensure_ascii=False, indent=2)+"\n", encoding="utf-8")
        print(f"OK {p.name}: {len(streams)} streams")

if __name__ == "__main__": main()
