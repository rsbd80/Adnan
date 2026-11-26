/* =====================================================
   RsLive Go - FINAL v15
   Header: Pure Black Background
   Slim Bottom Nav, Premium Dark + Glass Search
   No Footer, No Bengali - All English
   ===================================================== */

document.getElementById('app').innerHTML = `
<style>
*{margin:0;padding:0;box-sizing:border-box;user-select:none;-webkit-user-select:none}
html,body{height:100%;width:100%;background:#000;color:#fff;font-family:Poppins,'Hind Siliguri',sans-serif;overflow-x:hidden}
body{display:flex;flex-direction:column;touch-action:pan-y}
#app{display:flex;flex-direction:column;flex:1;min-height:0;overflow-x:hidden}
.sticky{flex-shrink:0;z-index:100}
/* ===== HEADER - PURE BLACK ===== */
header{background:#000;border-bottom:1px solid #ffffff14;backdrop-filter:blur(20px);padding:14px 14px 13px;position:relative;overflow:hidden}
header:before{content:"";position:absolute;inset:0;background:radial-gradient(220px 70px at 20% 0%,rgba(139,124,255,.22),transparent 70%),radial-gradient(220px 70px at 85% 0%,rgba(34,211,238,.14),transparent 70%);pointer-events:none}
.header-top{display:flex;align-items:center;gap:10px;position:relative;z-index:2;min-height:42px}
.logo{display:flex;align-items:center;gap:10px;cursor:pointer;flex-shrink:0}
.play-ico{width:40px;height:40px;border-radius:12px;background:linear-gradient(135deg,#8b7cff,#22d3ee);display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0;box-shadow:0 4px 14px rgba(139,124,255,.35)}
.logo-text .name{font-family:Poppins,sans-serif;font-size:22px;font-weight:900;line-height:1;letter-spacing:.2px}
.logo-text .name i{font-style:normal;background:linear-gradient(90deg,#a78bfa,#22d3ee,#ff5d8f,#fb923c,#a78bfa);background-size:300%;background-clip:text;color:transparent;-webkit-background-clip:text}
.logo-text .tag{font-size:7.5px;letter-spacing:3px;color:#9a9ab5;font-weight:700;margin-top:3px}
.live-pill{display:none;align-items:center;gap:5px;background:rgba(255,45,85,.12);border:1px solid rgba(255,45,85,.3);color:#ff6b81;font-size:9px;font-weight:800;padding:6px 9px;border-radius:20px;flex-shrink:0;white-space:nowrap;margin-left:auto}
.live-pill i{width:7px;height:7px;background:#ff2d55;border-radius:50%;animation:pulse 1.4s infinite}
@keyframes pulse{70%{box-shadow:0 0 0 7px #ff2d5500}}
/* Searchbar - Glass Premium on Black */
#searchWrap{display:none;position:relative;flex:1;min-width:0;max-width:170px;margin-left:auto}
#searchWrap .s-ico{position:absolute;left:11px;top:50%;transform:translateY(-50%);font-size:12px;opacity:.7;z-index:1}
#search{width:100%;padding:9px 12px 9px 32px;border-radius:99px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.07);backdrop-filter:blur(10px);color:#fff;font-size:12px;outline:none;user-select:text;-webkit-user-select:text;transition:.2s}
#search:focus{background:rgba(255,255,255,.10);border-color:rgba(139,124,255,.60);box-shadow:0 0 0 3px rgba(139,124,255,.18)}
#search::placeholder{color:#8e91a8}
#pageTitle{display:none !important}
#cats{display:none !important}
.desktop-wrap{display:flex;flex-direction:column;flex:1;min-height:0;overflow-x:hidden}
#mainCol{flex:1;min-height:0;display:flex;flex-direction:column;overflow-x:hidden}
#scrollArea{flex:1;overflow-y:auto;overflow-x:hidden;padding-bottom:82px}
#matchesSection{display:none;padding:12px 12px 4px}
.matches-head{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:10px}
.matches-head strong{font-family:Poppins,sans-serif;font-size:13px}
.matches-head span{font-size:10px;color:#8e91a8}
#matchesGrid{display:grid;grid-template-columns:1fr;gap:8px}
.match-card{background:linear-gradient(115deg,#171a29,#10121d 58%,#171321);border:1px solid #ffffff19;border-radius:14px;padding:10px 12px;box-shadow:0 5px 14px #0005;cursor:pointer}
.match-card.live{border-left:3px solid #ff3d5a}
.match-card.upcoming{border-left:3px solid #f3a43b}
.match-card:active{transform:scale(.98)}
.match-top{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:8px}
.match-badge{border-radius:20px;padding:3px 8px;font-size:9px;font-weight:900}
.match-badge.live{background:#ff304e25;color:#ff6176;border:1px solid #ff304e44}
.match-badge.upcoming{background:#f5a43b22;color:#ffc36b;border:1px solid #f5a43b44}
.match-type{font-size:9px;color:#9b9db1;overflow:hidden;text-overflow:ellipsis}
.match-teams{display:grid;grid-template-columns:1fr 62px 1fr;align-items:center;gap:6px}
.match-team{min-width:0;display:flex;align-items:center;gap:8px}
.match-team.left{justify-content:flex-start;text-align:left;flex-direction:row}
.match-team.right{justify-content:flex-end;text-align:right;flex-direction:row-reverse}
.match-team img,.team-fallback{width:42px;height:42px;min-width:42px;object-fit:contain;border-radius:50%;background:#fff;padding:4px;flex-shrink:0}
.team-fallback{display:flex;align-items:center;justify-content:center;background:#25283a;color:#fff;font-weight:900;font-size:15px;border:1px solid #41445a}
.match-team b{font-size:12px;line-height:1.25;overflow-wrap:anywhere;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.match-team img.svg-logo{background:#fff !important;padding:5px !important}
.card img[src$=".svg"]{background:#fff !important;padding:4px !important}
.match-vs{text-align:center}
.match-vs .vs-txt{font-family:Poppins,sans-serif;font-size:13px;font-weight:900;color:#9ea4ba;display:block}
.match-vs .vs-time{font-size:9px;color:#aeb2c5;display:block;margin-top:2px}
.match-bottom{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-top:8px;padding-top:8px;border-top:1px solid #ffffff14}
.match-time{font-size:10px;color:#aeb2c5;line-height:1.5}
.match-action{border:0;border-radius:20px;padding:7px 12px;font-family:inherit;font-size:10px;font-weight:900;color:#fff;background:linear-gradient(90deg,#e93658,#f07836);cursor:pointer;flex-shrink:0}
.match-action.upcoming{background:#292c3d;border:1px solid #f5a43b55;color:#ffd08a}
.match-action:disabled{opacity:.45;cursor:not-allowed}
.match-countdown{display:block;color:#ffc36b;font-size:9px;font-variant-numeric:tabular-nums}
/* Channel - 2 Column */
#grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;padding:10px 12px}
.card{background:#15151f;border:1px solid #262633;border-radius:12px;padding:8px 10px;text-align:left;cursor:pointer;display:flex;align-items:center;gap:8px;overflow:hidden;min-width:0;min-height:56px}
.card:active{transform:scale(.97);border-color:#a78bfa}
.card .serial{flex-shrink:0;font-size:10px;background:rgba(255,255,255,.12);padding:3px 6px;border-radius:99px;color:#aaa;font-weight:800;order:-1;min-width:20px;text-align:center}
.card img{width:38px;height:38px;min-width:38px;object-fit:contain;background:#fff;border-radius:10px;padding:3px}
.card .c-txt{flex:1;min-width:0}
.card p{font-size:12px;margin:0;line-height:1.3;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;word-break:break-word;font-weight:600}
.card small{font-size:9px;color:#22d3ee;display:block;margin-top:2px}
/* Category - 3 Column Photo Card */
.cat-box{flex-direction:column !important;align-items:stretch !important;gap:0 !important;padding:0 !important;min-height:0 !important;overflow:hidden;position:relative;border:1px solid #ffffff22 !important}
.cat-photo{width:100%;height:62px;overflow:hidden;position:relative;background:linear-gradient(135deg,#1a1a2e,#2a1a3a);flex-shrink:0}
.cat-photo img{width:100%;height:100%;object-fit:cover;opacity:.92}
.cat-photo .cat-emoji{position:absolute;top:6px;left:7px;font-size:16px;filter:drop-shadow(0 2px 4px #000);z-index:2}
.cat-photo .cat-num{position:absolute;top:6px;right:6px;background:#000b;padding:2px 6px;border-radius:99px;font-size:8px;font-weight:800;z-index:2}
.cat-info{padding:8px 9px;width:100%}
.cat-info b{font-size:12px;display:block;line-height:1.25;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.cat-info small{color:#22d3ee;font-size:9px}
#homeEmpty{display:none;text-align:center;padding:30px 16px;color:#9a9ab5}
#homeEmpty b{color:#fff;font-size:14px;display:block;margin-bottom:6px}
#homeEmpty button{margin-top:12px;padding:10px 18px;border-radius:20px;border:0;background:linear-gradient(90deg,#22d3ee,#a78bfa);color:#fff;font-family:inherit;font-weight:800}
#loadMoreWrap{text-align:center;padding:6px 12px 18px;display:none}
#loadMoreBtn{width:100%;max-width:320px;padding:12px;border-radius:12px;background:#2a2a3a;color:#fff;font-family:inherit;font-size:13px;font-weight:700;border:1px solid #ffffff33}
#noticeBar{display:none;background:linear-gradient(90deg,#22d3ee,#a78bfa,#ff5d8f);color:#000;font-size:12px;font-weight:700;padding:8px;text-align:center}
#featured{display:none;margin:12px;background:#221a3a;border:1px solid #a78bfa;border-radius:12px;padding:12px;cursor:pointer}
/* ===== BOTTOM NAV - SLIM PREMIUM ===== */
#bottomNav{position:fixed;bottom:0;left:0;right:0;z-index:500;background:rgba(0,0,0,.88);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-top:1px solid #ffffff10;display:flex;gap:6px;padding:6px 10px calc(6px + env(safe-area-inset-bottom));}
.bnav{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;padding:6px 2px 5px;border-radius:12px;cursor:pointer;border:1px solid transparent;background:transparent;color:#7a7a8e;font-family:inherit;position:relative;min-height:46px}
.bnav .b-ico{line-height:1;display:flex}
.bnav .b-ico svg{width:19px;height:19px;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}
.bnav .b-txt{font-size:11px;font-weight:600;letter-spacing:.2px;line-height:1}
.bnav.active{color:#fff;background:linear-gradient(180deg,rgba(139,124,255,.22),rgba(139,124,255,.06));border-color:rgba(139,124,255,.35);box-shadow:inset 0 1px 0 rgba(255,255,255,.08)}
.bnav.active .b-ico svg{stroke:#c4b5fd}
.bnav.active .b-txt{color:#fff}
#status{display:none !important}
.tele{position:fixed;right:14px;bottom:108px;width:46px;height:46px;border-radius:50%;background:linear-gradient(135deg,#2AABEE,#229ED9);display:flex;align-items:center;justify-content:center;z-index:999}
.tele svg{width:23px;height:23px;fill:#fff}
#installBar{display:none;position:fixed;left:10px;right:10px;bottom:70px;z-index:998;background:#1a1a2e;border:1px solid #a78bfa77;border-radius:100px;padding:7px;align-items:center;gap:6px}
#installBar .ib-txt{flex:1;text-align:center}
#installBar .ib-txt b{font-size:12px;display:block}
#installBar .ib-txt span{font-size:10px;color:#b8b8d0}
#installBar button{background:linear-gradient(90deg,#22d3ee,#a78bfa,#ff5d8f);color:#fff;border:0;padding:7px 11px;border-radius:100px;font-weight:800;font-size:11px}
#closeInstall{cursor:pointer;padding:5px}
@media(max-width:480px){
.logo-text .name{font-size:19px}
.logo-text .tag{font-size:7.5px;letter-spacing:3px}
#searchWrap{max-width:148px}
#search{padding:9px 10px 9px 30px;font-size:12px}
.header-top{gap:8px}
}
@media(min-width:900px){
body{display:block;overflow-y:auto}
#app{display:block}
.sticky{position:sticky;top:0}
header{max-width:1440px;margin:auto;padding:18px 24px}
.logo-text .name{font-size:26px}
#searchWrap{max-width:300px;margin-left:auto}
.desktop-wrap{flex-direction:row;max-width:1440px;margin:auto;gap:18px;padding:16px 24px 40px}
#mainCol{order:1}
#scrollArea{overflow:visible}
#grid{grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;padding:14px 0}
.card{min-height:62px;padding:10px 12px}
.card img{width:44px;height:44px;min-width:44px}
.card p{font-size:13px}
#matchesSection{padding:8px 0 4px}
#matchesGrid{grid-template-columns:repeat(2,1fr)}
.match-card{padding:12px 14px}
.match-team img,.team-fallback{width:48px;height:48px;min-width:48px}
.match-team b{font-size:13px}
#bottomNav{max-width:480px;left:50%;transform:translateX(-50%);border-radius:16px 16px 0 0;padding:6px 8px}
}
@media(min-width:1300px){#grid{grid-template-columns:repeat(5,minmax(0,1fr))}}
</style>

<div id="noticeBar"></div>
<div class="sticky">
<header>
<div class="header-top">
<div class="logo" onclick="switchTab('events')">
<div class="play-ico">▶</div>
<div class="logo-text">
<div class="name">RsLive <i>Go</i></div>
<div class="tag" id="taglineEl">LIVE TV • BANGLADESH</div>
</div>
</div>
<div id="searchWrap">
<span class="s-ico">🔍</span>
<input id="search" placeholder="Search..." autocomplete="off">
</div>
<div class="live-pill" id="livePill"><i></i> LIVE</div>
</div>
</header>
</div>

<div class="desktop-wrap">
<div id="cats"></div>
<div id="mainCol">
<div id="scrollArea">
<section id="matchesSection">
<div class="matches-head">
<strong>LIVE & UPCOMING MATCHES</strong>
<span id="matchesCount"></span>
</div>
<div id="matchesGrid"></div>
</section>
<div id="homeEmpty">
<b>No Live / Upcoming Match Right Now</b>
<span>Tap Home to see all channels</span><br>
<button onclick="switchTab('home')">View All Channels →</button>
</div>
<div id="featured">
<div style="font-size:11px;color:#ff5d8f;font-weight:800">FEATURED LIVE</div>
<b id="featName"></b><br>
<span style="font-size:11px;color:#22d3ee">Watch Now →</span>
</div>
<div id="grid"></div>
<div id="loadMoreWrap">
<button id="loadMoreBtn" onclick="loadMore()">Load More ↓</button>
</div>
</div>
</div>
</div>

<a class="tele" id="teleBtn" href="https://t.me/RsLiveGo" target="_blank" rel="noopener">
<svg viewBox="0 0 24 24"><path d="M9.04 15.31l-.38 5.32c.54 0 .78-.23 1.06-.5l2.55-2.44 5.28 3.87c.97.53 1.66.25 1.92-.9L24 3.6c.1-.9-.32-1.38-1.1-1.12L1.5 10.2c-.9.35-.88 1.45.14 1.72l5.48 1.71 12.66-8.04c.6-.36 1.14-.17.7.23L9.04 15.31z"/></svg>
</a>

<div id="installBar">
<div class="ib-txt"><b>Get RsLive Go App</b><span>Save to phone in 1 click</span></div>
<button id="installBtn">Install</button>
<span id="closeInstall">✕</span>
</div>

<nav id="bottomNav">
<button class="bnav active" id="navEvents" onclick="switchTab('events')">
<span class="b-ico"><svg viewBox="0 0 24 24"><path d="M8 4h8v5a4 4 0 01-8 0V4z"/><path d="M8 6H5a3 3 0 003 5M16 6h3a3 3 0 01-3 5"/><path d="M12 13v4M8 20h8M10 17h4"/></svg></span><span class="b-txt">Events</span>
</button>
<button class="bnav" id="navHome" onclick="switchTab('home')">
<span class="b-ico"><svg viewBox="0 0 24 24"><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/></svg></span><span class="b-txt">Home</span>
</button>
<button class="bnav" id="navCategory" onclick="switchTab('category')">
<span class="b-ico"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg></span><span class="b-txt">Categories</span>
</button>
</nav>
`;

/* ================= CONFIG - v15 ================= */
const CONFIG_VERSION = 'nova-v15-black-header';
const DEFAULT = { siteName:'RsLive Go', tagline:'LIVE TV • BANGLADESH', telegram:'https://t.me/RsLiveGo', searchPh:'Search...', statusText:'Total {count} Channels - RsLive Go', showLive:true, showTele:true, proxyUrl:'', notice:'', showNotice:false, featName:'', featUrl:'', showFeat:false, playlists:[] };
let saved=null; try{saved=JSON.parse(localStorage.getItem('rslive_config')||'null');}catch(e){}
if(!saved||!Array.isArray(saved.playlists)) saved=null;
const CFG={...DEFAULT,...(saved||{})};
try{
  document.getElementById('taglineEl').textContent=CFG.tagline;
  document.getElementById('search').placeholder=CFG.searchPh;
  document.getElementById('teleBtn').href=CFG.telegram;
  if(!CFG.showTele) document.getElementById('teleBtn').style.display='none';
  if(CFG.showNotice&&CFG.notice){const n=document.getElementById('noticeBar');n.textContent=CFG.notice;n.style.display='block';}
  if(CFG.showFeat&&CFG.featName){document.getElementById('featured').style.display='block';document.getElementById('featName').textContent=CFG.featName;window._f=CFG.featUrl;}
}catch(e){}

/* ================= GLOBAL ================= */
let all=[];
let cat='All';
let currentTab='events';
let _catCache=null;
let visibleCount=200;
let currentFiltered=[];
let allMatches=[];
let categoryHomeMode=false;
const MATCH_INDEX_URL='/data/matches/index.json';
function goHome(){ switchTab('events'); }
function updateHeader(){
  const searchWrap=document.getElementById('searchWrap');
  const livePill=document.getElementById('livePill');
  if(currentTab==='home'){ searchWrap.style.display='block'; livePill.style.display='none'; }
  else { searchWrap.style.display='none'; livePill.style.display = CFG.showLive ? 'flex' : 'none'; }
}
function switchTab(tab){
  currentTab=tab;
  categoryHomeMode = (tab==='category');
  document.getElementById('search').value='';
  document.querySelectorAll('.bnav').forEach(b=>b.classList.remove('active'));
  const btn = tab==='events' ? document.getElementById('navEvents') : tab==='home' ? document.getElementById('navHome') : document.getElementById('navCategory');
  if(btn) btn.classList.add('active');
  if(tab==='home') cat='All';
  updateHeader();
  renderGrid(true); renderMatches();
  const sa=document.getElementById('scrollArea'); if(sa) sa.scrollTop=0; window.scrollTo({top:0});
}
function unwrapMatchFile(data){
  if(!data||typeof data!=='object') return [];
  if(Array.isArray(data.matches)) return data.matches;
  if(data.match) return Array.isArray(data.match)?data.match:[data.match];
  if(Array.isArray(data.liveSports)) return data.liveSports;
  if(data.name||data.event_name||data.title) return [data];
  return [];
}
function normalizeMatch(raw){
  if(!raw||typeof raw!=='object') return null;
  const m={...raw};
  m.name=String(m.name||m.event_name||m.title||'').trim();
  const streams=Array.isArray(m.streams)?m.streams:[];
  const first=streams.find(x=>x&&(x.url||x.stream_url||x.src));
  m.url=String(m.url||(first&&(first.url||first.stream_url||first.src))||'').trim();
  m.startTime=m.startTime||m.start_time||m.start||'';
  m.endTime=m.endTime||m.end_time||m.end||'';
  m.teamA=String(m.teamA||m.homeTeam||m.team1||'').trim();
  m.teamB=String(m.teamB||m.awayTeam||m.team2||'').trim();
  m.teamALogo=m.teamALogo||m.logoA||m.teamA_logo||m.homeLogo||m.teamAFlag||m.flagA||m.teamAImage||'';
  m.teamBLogo=m.teamBLogo||m.logoB||m.teamB_logo||m.awayLogo||m.teamBFlag||m.flagB||m.teamBImage||'';
  if(!m.teamA||!m.teamB){
    const parts=m.name.split(/\s+(?:vs\.?|v\.?|versus)\s+/i);
    if(parts.length>=2){if(!m.teamA)m.teamA=parts[0].trim();if(!m.teamB)m.teamB=parts.slice(1).join(' vs ').trim();}
  }
  if(!m.name) return null;
  if(m.enabled===false||String(m.enabled).toLowerCase()==='off'||String(m.show).toLowerCase()==='no') return null;
  return m;
}
function getMatchState(m){
  const now=Date.now();
  const start=Date.parse(m.startTime||'');
  const end=Date.parse(m.endTime||'');
  if(Number.isFinite(end)&&end>0&&now>=end) return 'expired';
  const manual=String(m.status||'').toLowerCase();
  if(manual==='ended'||manual==='finished'||manual==='expired') return 'expired';
  if(Number.isFinite(start)&&start>0&&now<start) return 'upcoming';
  if(manual==='upcoming'&&!(Number.isFinite(start)&&start>0)) return 'upcoming';
  return 'live';
}
function fmtMatchTime(v){const d=new Date(v);if(!Number.isFinite(d.getTime())) return 'Time Not Set';return d.toLocaleString('en-GB',{day:'2-digit',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit',hour12:true});}
function matchCountdown(m){const t=Date.parse(m.startTime||'');if(!Number.isFinite(t))return'';let sec=Math.max(0,Math.floor((t-Date.now())/1000));const days=Math.floor(sec/86400);sec%=86400;const hours=Math.floor(sec/3600);sec%=3600;const mins=Math.floor(sec/60);sec%=60;return ((days?days+'d ':'')+String(hours).padStart(2,'0')+':'+String(mins).padStart(2,'0')+':'+String(sec).padStart(2,'0'));}
function teamNode(name,logo,side){
  const wrap=document.createElement('div');wrap.className='match-team '+(side||'left');
  const labelName=name||'Team';let logoEl;
  if(logo){
    const img=document.createElement('img');img.src=logo;img.alt=labelName;img.loading='lazy';
    if(String(logo).toLowerCase().split('?')[0].includes('.svg')) img.classList.add('svg-logo');
    img.onerror=function(){this.remove();const fb=document.createElement('div');fb.className='team-fallback';fb.textContent=labelName.trim().slice(0,2).toUpperCase();if(side==='right')wrap.prepend(fb);else wrap.insertBefore(fb,wrap.firstChild);};
    logoEl=img;
  }else{logoEl=document.createElement('div');logoEl.className='team-fallback';logoEl.textContent=labelName.trim().slice(0,2).toUpperCase();}
  const label=document.createElement('b');label.textContent=labelName;
  if(side==='right'){wrap.append(label,logoEl);}else{wrap.append(logoEl,label);}
  return wrap;
}
function openMatch(m,idx){
  if(!m.url) return;
  try{localStorage.setItem('rslive_sports_match',JSON.stringify({name:m.name,streams:m.streams||[{stream_url:m.url}],savedAt:Date.now()}));}catch(e){}
  const params=new URLSearchParams({url:m.url,name:m.name,src:'Live Sports',group:m.matchType||m.category||'Sports',serial:String((idx||0)+1),fs:'1'});
  window.location.href='player.html?'+params.toString();
}
function openCh(u,n,s,g,serial){
  const params=new URLSearchParams({url:u,name:n,src:s,group:g,serial:String(serial||1),fs:'1'});
  window.location.href='player.html?'+params.toString();
}
function renderMatches(){
  const section=document.getElementById('matchesSection');
  const grid=document.getElementById('matchesGrid');
  const homeEmpty=document.getElementById('homeEmpty');
  if(!section||!grid) return;
  const q=(document.getElementById('search')?.value||'').trim().toLowerCase();
  const visible=allMatches.map(normalizeMatch).filter(Boolean).filter(m=>getMatchState(m)!=='expired').filter(m=>!q||m.name.toLowerCase().includes(q));
  visible.sort((a,b)=>{const sa=getMatchState(a);const sb=getMatchState(b);if(sa!==sb) return sa==='live'?-1:1;return ((Date.parse(a.startTime||'')||0)-(Date.parse(b.startTime||'')||0));});
  const showMatches=(currentTab==='events'||!!q);
  section.style.display=(showMatches&&visible.length)?'block':'none';
  if(homeEmpty) homeEmpty.style.display=(currentTab==='events'&&!q&&visible.length===0)?'block':'none';
  const count=document.getElementById('matchesCount');
  if(count) count.textContent=visible.length?visible.length+' Matches':'';
  grid.replaceChildren();
  visible.forEach((m,idx)=>{
    const state=getMatchState(m);
    const card=document.createElement('article');card.className='match-card '+state;
    card.addEventListener('click',()=>{if(state==='live'&&m.url) openMatch(m,idx);});
    const top=document.createElement('div');top.className='match-top';
    const badge=document.createElement('span');badge.className='match-badge '+state;badge.textContent=state==='live'?'LIVE':'UPCOMING';
    const type=document.createElement('span');type.className='match-type';type.textContent=m.matchType||m.category||'LIVE SPORTS';
    top.append(badge,type);
    const teams=document.createElement('div');teams.className='match-teams';
    const a=teamNode(m.teamA||m.name,m.teamALogo,'left');
    const vs=document.createElement('div');vs.className='match-vs';
    vs.innerHTML=`<span class="vs-txt">VS</span><span class="vs-time">${state==='live'?'LIVE':(fmtMatchTime(m.startTime).split(',')[1]||'')}</span>`;
    const b=teamNode(m.teamB||'',m.teamBLogo,'right');
    teams.append(a,vs,b);
    const bottom=document.createElement('div');bottom.className='match-bottom';
    const time=document.createElement('div');time.className='match-time';time.textContent='Start: '+fmtMatchTime(m.startTime);
    if(state==='upcoming'){const cd=document.createElement('span');cd.className='match-countdown';cd.textContent='Starts in '+matchCountdown(m);time.appendChild(cd);}
    const btn=document.createElement('button');btn.className='match-action '+state;btn.type='button';btn.textContent=state==='live'?'Watch Live':'UPCOMING';btn.disabled=state!=='live'||!m.url;
    if(!btn.disabled){btn.addEventListener('click',(e)=>{e.stopPropagation();openMatch(m,idx);});}
    bottom.append(time,btn);
    card.append(top,teams,bottom);
    grid.appendChild(card);
  });
}
async function loadMatches(){
  try{
    const indexResponse=await fetch(MATCH_INDEX_URL+'?t='+Date.now(),{cache:'no-store'});
    if(!indexResponse.ok) throw new Error('Index HTTP '+indexResponse.status);
    const indexData=await indexResponse.json();
    if(!Array.isArray(indexData.files)) throw new Error('No files in index.json');
    const files=indexData.files.filter(file=>typeof file==='string'&&/^[a-zA-Z0-9_-]+\.json$/.test(file));
    const results=await Promise.all(files.map(async file=>{
      try{
        const response=await fetch('/data/matches/'+encodeURIComponent(file)+'?t='+Date.now(),{cache:'no-store'});
        if(!response.ok) throw new Error('HTTP '+response.status);
        const data=await response.json();
        return unwrapMatchFile(data).map(normalizeMatch).filter(Boolean);
      }catch(error){console.warn('Match file failed:',file,error);return[];}
    }));
    allMatches=results.flat();renderMatches();
  }catch(error){console.error('Match index load failed:',error);renderMatches();}
}
async function getPlaylistsFromSW(){
  try{
    if('serviceWorker' in navigator) await navigator.serviceWorker.ready;
    const r=await fetch('/api/playlists',{cache:'no-store'});
    if(!r.ok) throw new Error('Playlist API error');
    const data=await r.json();
    if(Array.isArray(data)&&data.length) return data;
  }catch(e){console.warn('SW playlist unavailable:',e);}
  return Array.isArray(CFG.playlists)?CFG.playlists:[];
}
async function loadOne(p){
  if(!p||!p.url) return [];
  const tryFetch=async(u)=>{
    const r=await fetch(u);
    if(!r.ok) throw new Error('Playlist HTTP '+r.status);
    const t=await r.text();
    return parse(t);
  };
  try{
    let u=p.url;
    if(p.useProxy&&CFG.proxyUrl) u=CFG.proxyUrl+encodeURIComponent(p.url);
    const list=await tryFetch(u);
    if(list.length) return list;
    throw new Error('Empty playlist');
  }catch(e1){
    try{
      const proxyBase = CFG.proxyUrl || 'https://api.allorigins.win/raw?url=';
      return await tryFetch(proxyBase+encodeURIComponent(p.url));
    }catch(e2){ console.warn('Playlist proxy failed:',p.name,e2); return []; }
  }
}
function parse(t){
  const lines=t.split(/\r?\n/);const output=[];let channel=null;
  for(const line of lines){
    const x=line.trim();
    if(x.startsWith('#EXTINF')){
      const name=x.split(',').pop().trim();
      const logo=x.match(/tvg-logo="([^"]+)"/);
      const group=x.match(/group-title="([^"]+)"/);
      channel={name:name,logo:logo?logo[1]:'',group:group?group[1]:'General'};
    }else if(/^https?:\/\//i.test(x)&&channel){channel.url=x;output.push(channel);channel=null;}
  }
  return output;
}
async function loadAll(){
  loadMatches();
  CFG.playlists=await getPlaylistsFromSW();
  for(const p of CFG.playlists){
    const list=await loadOne(p);
    console.log('Playlist loaded:',p.name,list.length);
    for(const ch of list){ch.source=p.name||'TV';if(!all.some(y=>y.url===ch.url)) all.push(ch);}
    _catCache=null;renderGrid();renderMatches();
  }
  renderGrid();renderMatches();switchTab('events');
}
function normName(s){ return String(s||'').toLowerCase().trim().replace(/\s+/g,' '); }
function getCats(){
  if(_catCache) return _catCache;
  const seen=new Set(); const out=[];
  const push=(c)=>{ const k=normName(c); if(!k||seen.has(k)) return; seen.add(k); out.push(c.trim()); };
  CFG.playlists.forEach(p=>{ if(p.name) push(p.name); });
  ['All','Sports','News','Entertainment','Movies','Kids','Music','Bangladesh','India'].forEach(push);
  _catCache=['All',...out.filter(c=>normName(c)!=='all')];
  return _catCache;
}
function catIcon(c){
  const n=normName(c);
  if(n==='tapmad') return '📺';
  if(n==='toffee') return '🍬';
  if(n==='aynaott'||n==='ayna ott') return '📺';
  if(n==='jagobd'||n==='jago bd') return '🇧🇩';
  const icons={All:'📺',Sports:'🏆',News:'📰',Entertainment:'🎭',Movies:'🎬',Kids:'🧒',Music:'🎵',Bangladesh:'🇧🇩',India:'🇮🇳'};
  for(const k in icons){ if(normName(k)===n) return icons[k]; }
  return '📺';
}
function catCount(c){
  if(!all.length) return 0;
  if(normName(c)==='all') return all.length;
  const pl=CFG.playlists.find(p=>normName(p.name)===normName(c));
  if(pl){
    const cnt=all.filter(x=>normName(x.source)===normName(c)).length;
    if(cnt>0) return cnt;
    return all.filter(x=>normName(x.group).includes(normName(c))||normName(x.name).includes(normName(c))).length;
  }
  return all.filter(x=>matchesCat(x,c)).length;
}
function matchesCat(c,category){
  const name=normName(c.name); const group=normName(c.group); const catN=normName(category);
  if(catN==='all') return true;
  const pl=CFG.playlists.find(p=>normName(p.name)===catN);
  if(pl){
    if(normName(c.source)===catN) return true;
    if(group.includes(catN)||name.includes(catN)) return true;
    return false;
  }
  if(catN==='sports') return ['sport','cricket','football'].some(x=>group.includes(x));
  if(catN==='news') return group.includes('news');
  if(catN==='movies') return group.includes('movie');
  if(catN==='kids') return group.includes('kid');
  if(catN==='music') return group.includes('music');
  if(catN==='entertainment') return group.includes('entertainment')||group.includes('general');
  if(catN==='bangladesh') return ['bangla','btv','t sports','somoy','jamuna'].some(x=>name.includes(x));
  if(catN==='india') return ['star','sony','zee','colors'].some(x=>name.includes(x));
  return group.includes(catN);
}
function renderCategoryHome(){
  const grid=document.getElementById('grid');
  grid.style.display='grid';
  grid.style.gridTemplateColumns='repeat(3,1fr)';
  grid.replaceChildren();
  getCats().forEach(c=>{
    if(normName(c)==='all') return;
    const firstCh = all.find(x=>matchesCat(x,c));
    const photo = firstCh?.logo || '';
    const box=document.createElement('div');
    box.className='card cat-box';
    box.innerHTML=`
      <div class="cat-photo">
        ${photo ? `<img src="${photo}" loading="lazy" onerror="this.remove()">` : ''}
        <span class="cat-emoji">${catIcon(c)}</span>
        <span class="cat-num">${catCount(c)} Channels</span>
      </div>
      <div class="cat-info"><b>${c}</b><small>View →</small></div>
    `;
    box.onclick=()=>{ cat=c; categoryHomeMode=false; renderGrid(true); };
    grid.appendChild(box);
  });
  document.getElementById('loadMoreWrap').style.display='none';
}
function renderGrid(reset=true){
  const grid=document.getElementById('grid');
  const wrap=document.getElementById('loadMoreWrap');
  const feat=document.getElementById('featured');
  if(currentTab==='events'&&!(document.getElementById('search').value||'').trim()){
    grid.replaceChildren();grid.style.display='none';
    if(wrap) wrap.style.display='none';
    if(feat) feat.style.display='none';
    if(reset){const sa=document.getElementById('scrollArea');if(sa)sa.scrollTop=0;window.scrollTo({top:0});}
    return;
  }
  if(currentTab==='category' && categoryHomeMode && !(document.getElementById('search').value||'').trim()){
    renderCategoryHome();
    return;
  }
  grid.style.display='grid';
  grid.style.gridTemplateColumns='';
  if(reset) visibleCount=200;
  const q=document.getElementById('search').value.toLowerCase();
  const effCat = currentTab==='home' ? 'All' : cat;
  currentFiltered=all.filter(c=>{if(q&&!String(c.name).toLowerCase().includes(q)) return false;return matchesCat(c,effCat);});
  const show=currentFiltered.slice(0,visibleCount);
  grid.replaceChildren();
  show.forEach((c,i)=>{
    const card=document.createElement('div');card.className='card';
    const serial=document.createElement('span');serial.className='serial';serial.textContent=String(i+1);
    const img=document.createElement('img');img.loading='lazy';img.src=c.logo||'https://cdn-icons-png.flaticon.com/512/1179/1179069.png';
    img.onerror=function(){this.src='https://cdn-icons-png.flaticon.com/512/1179/1179069.png';};
    const txt=document.createElement('div');txt.className='c-txt';
    const name=document.createElement('p');name.textContent=c.name;
    const group=document.createElement('small');group.textContent=c.group||'General';
    txt.append(name,group);
    card.append(serial,img,txt);
    card.addEventListener('click',()=>{openCh(c.url,c.name,c.source||'',c.group||'',i+1);});
    grid.appendChild(card);
  });
  const btn=document.getElementById('loadMoreBtn');
  if(currentFiltered.length>visibleCount){wrap.style.display='block';btn.textContent='Load More ('+visibleCount+'/'+currentFiltered.length+')';}else{wrap.style.display='none';}
  if(reset){const sa=document.getElementById('scrollArea');if(sa)sa.scrollTop=0;window.scrollTo({top:0});}
}
function loadMore(){visibleCount+=200;renderGrid(false);}
let _searchT=null;
document.getElementById('search').addEventListener('input',()=>{clearTimeout(_searchT);_searchT=setTimeout(()=>{renderGrid(true);renderMatches();},100);});
let _rszT=null;
window.addEventListener('resize',()=>{clearTimeout(_rszT);_rszT=setTimeout(()=>{switchTab(currentTab);},150);});
loadAll();
setInterval(loadMatches,60000);
setInterval(renderMatches,1000);
if('serviceWorker' in navigator){navigator.serviceWorker.register('/sw.js').catch(e=>console.warn('Service Worker:',e));}
let deferredPrompt=null;
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredPrompt=e;if(!window.matchMedia('(display-mode: standalone)').matches){const bar=document.getElementById('installBar');if(bar&&!localStorage.getItem('rslive_install_closed')) bar.style.display='flex';}});
document.getElementById('installBtn')?.addEventListener('click',async()=>{if(!deferredPrompt){alert('Browser Menu -> Add to Home Screen');return;}deferredPrompt.prompt();const choice=await deferredPrompt.userChoice;if(choice.outcome==='accepted') document.getElementById('installBar').style.display='none';deferredPrompt=null;});
document.getElementById('closeInstall')?.addEventListener('click',()=>{document.getElementById('installBar').style.display='none';localStorage.setItem('rslive_install_closed','1');});
window.addEventListener('appinstalled',()=>{document.getElementById('installBar').style.display='none';});
