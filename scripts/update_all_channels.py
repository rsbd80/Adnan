#!/usr/bin/env python3
import os, json
from pathlib import Path
from urllib.request import Request, urlopen
ROOT = Path(__file__).resolve().parents[1]
try:
    url = "https://raw.githubusercontent.com/sm-monirulislam/Upcoming-and-Live-Sports-Data/main/Sports_data.m3u"
    req = Request(url, headers={"User-Agent":"Mozilla/5.0"})
    with urlopen(req, timeout=20) as r:
        text = r.read().decode("utf-8", errors="replace")
    if "#EXTINF" in text:
        (ROOT/"data").mkdir(parents=True, exist_ok=True)
        (ROOT/"data"/"channels.m3u").write_text(text, encoding="utf-8")
        print(f"Channels saved: {text.count('#EXTINF')}")
    else:
        print("Not M3U, skipped")
except Exception as e:
    print("Channel update skipped:", e)
