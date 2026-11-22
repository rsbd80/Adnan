#!/usr/bin/env python3
import json, os, re
from pathlib import Path
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[1]
MATCHES_DIR = ROOT / "data" / "matches"
PLAYLIST_URL = "https://raw.githubusercontent.com/sm-monirulislam/SonyLiv_Event_Playlist/refs/heads/main/sonyLiv.m3u"

FLAGS = {
 "pakistan":"https://flagcdn.com/w160/pk.png","india":"https://flagcdn.com/w160/in.png",
 "bangladesh":"https://flagcdn.com/w160/bd.png","australia":"https://flagcdn.com/w160/au.png",
 "england":"https://flagcdn.com/w160/gb-eng.png","sri lanka":"https://flagcdn.com/w160/lk.png",
 "srilanka":"https://flagcdn.com/w160/lk.png","new zealand":"https://flagcdn.com/w160/nz.png",
 "south africa":"https://flagcdn.com/w160/za.png","afghanistan":"https://flagcdn.com/w160/af.png",
 "nepal":"https://flagcdn.com/w160/np.png","brazil":"https://flagcdn.com/w160/br.png",
 "argentina":"https://flagcdn.com/w160/ar.png","spain":"https://flagcdn.com/w160/es.png",
 "france":"https://flagcdn.com/w160/fr.png","germany":"https://flagcdn.com/w160/de.png",
 "italy":"https://flagcdn.com/w160/it.png","uruguay":"https://flagcdn.com/w160/uy.png",
 "saudi arabia":"https://flagcdn.com/w160/sa.png","portugal":"https://flagcdn.com/w160/pt.png",
 "usa":"https://flagcdn.com/w160/us.png",
}
def flag_for(team):
    t = (team or "").lower().strip().replace(" a","").strip()
    return FLAGS.get(t, "")

def fetch_text(url):
    try:
        req=Request(url,headers={"User-Agent":"Mozilla/5.0"})
        with urlopen(req,timeout=20) as r: return r.read().decode("utf-8",errors="replace")
    except Exception as e:
        print("M3U fetch failed, will keep old data:", e)
        return ""

def norm(t): return re.sub(r"[^a-z0-9]+","",(t or "").lower())

def parse_m3u(text, name):
    if not text: return []
    wanted=norm(name); entries=[]; cur=None; logo=""; ch_no=""
    for raw in text.splitlines():
        line=raw.strip()
        if not line: continue
        if line.startswith("#EXTINF:"):
            m=re.search(r',([^,]+)$',line); lm=re.search(r'tvg-logo="([^"]*)"',line)
            cur={"display":m.group(1).strip() if m else ""}; logo=lm.group(1) if lm else ""; ch_no=""
            if "CH-" in cur["display"]:
                mm=re.search(r"CH-\d+",cur["display"])
                if mm: ch_no=mm.group(0)
        elif line.startswith("#"): continue
        else:
            if cur and wanted in norm(cur["display"]):
                entries.append({"name":cur["display"],"url":line,"logo":logo,"ch":ch_no})
            cur=None
    seen=set(); out=[]
    for e in entries:
        if e["url"] not in seen: seen.add(e["url"]); out.append(e)
    return out

def split_teams(name):
    parts=re.split(r"\s+Vs\s+|\s+vs\s+|\s+VS\s+", name, flags=re.I)
    if len(parts)>=2: return parts[0].strip(), parts[1].strip()
    return name.strip(), ""

def main():
    try:
        MATCHES_DIR.mkdir(parents=True, exist_ok=True)
        playlist=fetch_text(PLAYLIST_URL)
        files=sorted(MATCHES_DIR.glob("match-*.json"))
        index=[]
        for p in files:
            try:
                data=json.loads(p.read_text(encoding="utf-8")); m=data.get("match",{})
                if not m.get("name"): continue
                t1,t2=split_teams(m["name"])
                m["team1"]=t1; m["team2"]=t2
                if not m.get("team1Logo"): m["team1Logo"]=flag_for(t1)
                if not m.get("team2Logo"): m["team2Logo"]=flag_for(t2)
                if playlist:
                    s=parse_m3u(playlist,m["name"])
                    if s:
                        m["streams"]=[{"name":f"Server {i+1}","url":x["url"],"show":"yes"} for i,x in enumerate(s)]
                        m["url"]=s[0]["url"]
                        if s[0].get("ch"): m["channel"]=s[0]["ch"]
                p.write_text(json.dumps(data,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
                index.append(p.name)
            except Exception as e:
                print(f"Skip {p.name}: {e}")
                continue
        (MATCHES_DIR/"index.json").write_text(json.dumps({"files":index},ensure_ascii=False,indent=2),encoding="utf-8")
        print(f"Done: {len(index)} matches")
    except Exception as e:
        print("Script finished with warning:", e)

if __name__=="__main__": main()
