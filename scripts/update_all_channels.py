#!/usr/bin/env python3
from pathlib import Path
from urllib.request import Request, urlopen
import re
ROOT = Path(__file__).resolve().parents[1]
try:
    url = "https://raw.githubusercontent.com/sm-monirulislam/Upcoming-and-Live-Sports-Data/main/Sports_data.m3u"
    req = Request(url, headers={"User-Agent":"Mozilla/5.0"})
    with urlopen(req, timeout=20) as r:
        text = r.read().decode("utf-8", errors="replace")
    lines = text.splitlines()
    seen = set()
    out = ["#EXTM3U"]
    i = 0
    while i < len(lines):
        line = lines[i].strip()
        if line.startswith("#EXTINF:"):
            m = re.search(r',([^,]+)$', line)
            name = m.group(1).strip() if m else line
            # একই নামের ২য় কপি বাদ দাও, শুধু প্রথমটা রাখো
            # যেমন: "FC Barcelona Vs Villarreal - DAZN" -> "fcbarcelonavsvillarreal"
            base = re.sub(r'[^a-z0-9]+','', name.lower().split(' - ')[0].split(' | ')[0])
            if base in seen:
                i += 2
                continue
            seen.add(base)
            out.append(line)
            if i+1 < len(lines):
                out.append(lines[i+1])
            i += 2
        else:
            i += 1
    final = "\n".join(out)
    (ROOT/"data").mkdir(parents=True, exist_ok=True)
    (ROOT/"data"/"channels.m3u").write_text(final, encoding="utf-8")
    print(f"Channels saved: {len(seen)} unique channels, duplicates removed")
except Exception as e:
    print("Channel update skipped:", e)
