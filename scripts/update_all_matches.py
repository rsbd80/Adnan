#!/usr/bin/env python3
import json, os, re
from pathlib import Path
from urllib.request import Request, urlopen
ROOT = Path(__file__).resolve().parents[1]
MATCHES_DIR = ROOT / "data" / "matches"
PLAYLIST_URL = os.environ.get("SPORTS_M3U_URL","https://raw.githubusercontent.com/sm-monirulislam/Upcoming-and-Live-Sports-Data/main/Sports_data.m3u")
def fetch_text(url):
    req=Request(url,headers={"User-Agent":"RS-LiveTV-Updater/1.0"})
    with urlopen(req,timeout=30) as r: return r.read().decode("utf-8",errors="replace")
def norm(t): return re.sub(r"[^a-z0-9]+","",(t or "").lower())
def parse_m3u(text, name):
    wanted=norm(name); entries=[]; cur=None; lk=""; lt=""
    for raw in text.splitlines():
        line=raw.strip()
        if not line: continue
        if line.startswith("#EXTINF:"): cur={"display":line.rsplit(",",1)[-1].strip()}; lk=lt=""
        elif "license_type=" in line: lt=line.split("=",1)[1].strip()
        elif "license_key=" in line: lk=line.split("=",1)[1].strip()
        elif line.startswith("#"): continue
        else:
            if cur and wanted in norm(cur["display"]):
                drm={"scheme":"clearkey","license":lk} if lk and "clearkey" in lt.lower() else None
                entries.append({"name":cur["display"].split(" - ",1)[-1].strip(),"url":line,**({"drm":drm} if drm else {}),"show":"yes"})
            cur=None; lk=lt=""
    seen=set(); out=[]
    for e in entries:
        if e["url"] not in seen: seen.add(e["url"]); out.append(e)
    return out
def main():
    playlist=""
    try: playlist=fetch_text(PLAYLIST_URL)
    except Exception as e: print("M3U fetch failed",e)
    files=sorted(MATCHES_DIR.glob("match-*.json"))
    index=[]
    for p in files:
        data=json.loads(p.read_text(encoding="utf-8")); m=data.get("match",{})
        if not m.get("name"): continue
        if playlist:
            s=parse_m3u(playlist,m["name"])
            if s: m["streams"]=s; m["url"]=s[0]["url"]; m["drm"]=s[0].get("drm",m.get("drm"))
        p.write_text(json.dumps(data,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
        index.append(p.name)
    (MATCHES_DIR/"index.json").write_text(json.dumps({"files":index},ensure_ascii=False,indent=2),encoding="utf-8")
    print(f"Done: {len(index)} matches -> index.json")
if __name__=="__main__": main()
