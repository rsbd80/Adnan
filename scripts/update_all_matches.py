#!/usr/bin/env python3
# RS Live TV - GitHub Actions থেকে চ্যানেল অটো আপডেট
import os
from pathlib import Path
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[1]
CHANNELS_M3U = ROOT / "data" / "channels.m3u"
SETTINGS = ROOT / "settings.json"

# এখানে তোমার চ্যানেলের M3U লিংকটা দাও
# যেই লিংক থেকে চ্যানেল আনতে চাও
SOURCE_M3U_URL = os.environ.get(
    "CHANNELS_M3U_URL",
    "https://raw.githubusercontent.com/sm-monirulislam/Upcoming-and-Live-Sports-Data/main/Sports_data.m3u"
)

def fetch_text(url):
    req = Request(url, headers={"User-Agent": "RS-LiveTV-Channel-Updater/1.0"})
    with urlopen(req, timeout=30) as r:
        return r.read().decode("utf-8", errors="replace")

def main():
    print(f"Fetching channels from: {SOURCE_M3U_URL}")
    try:
        text = fetch_text(SOURCE_M3U_URL)
    except Exception as e:
        print("FAILED:", e)
        return

    if "#EXTM3U" not in text and "#EXTINF" not in text:
        print("M3U মনে হচ্ছে না, স্কিপ করলাম")
        return

    # data ফোল্ডার না থাকলে বানাও
    CHANNELS_M3U.parent.mkdir(parents=True, exist_ok=True)
    CHANNELS_M3U.write_text(text, encoding="utf-8")
    print(f"Done: {text.count('#EXTINF')} channels saved to data/channels.m3u")

    # settings.json এ এই ফাইলটা পয়েন্ট করে দাও যাতে সাইট এখান থেকে চ্যানেল নেয়
    import json
    settings = {}
    if SETTINGS.exists():
        try:
            settings = json.loads(SETTINGS.read_text(encoding="utf-8"))
        except:
            settings = {}
    # GitHub Pages এ এই ফাইলটাই চলবে
    settings["m3uPlaylist1"] = "data/channels.m3u"
    SETTINGS.write_text(json.dumps(settings, ensure_ascii=False, indent=2), encoding="utf-8")
    print("settings.json updated -> m3uPlaylist1 = data/channels.m3u")

if __name__ == "__main__":
    main()
