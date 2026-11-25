/* =====================================================
   RsLive Go - COMPLETE APP.JS
   Live TV + GitHub Live & Upcoming Matches
   Thin Card + 2 Side Team Logo + SVG Logo + Fullscreen Player
   ===================================================== */

document.getElementById('app').innerHTML = `
<style>
*{margin:0;padding:0;box-sizing:border-box;user-select:none;-webkit-user-select:none}
html,body{height:100%;width:100%;background:#07070f;color:#fff;font-family:'Hind Siliguri',sans-serif;overflow-x:hidden;overscroll-behavior-x:none}
body{display:flex;flex-direction:column;touch-action:pan-y}
#app{display:flex;flex-direction:column;flex:1;min-height:0;overflow-x:hidden}
.sticky{flex-shrink:0;z-index:100}
header{background:rgba(10,10,20,.94);backdrop-filter:blur(16px);padding:14px 12px;border-bottom:1px solid #ffffff14;position:relative;overflow:hidden}
header:before,header:after{content:"";position:absolute;top:-50px;width:200px;height:110px;filter:blur(10px);pointer-events:none;animation:glow 4s ease-in-out infinite alternate}
header:before{left:-20px;background:radial-gradient(circle,rgba(34,211,238,.35),transparent 70%)}
header:after{right:-20px;background:radial-gradient(circle,rgba(167,139,250,.35),transparent 70%)}
@keyframes glow{to{transform:translateX(40px) scale(1.2)}}
.top-row{display:flex;flex-direction:column;position:relative;z-index:2}
.header-top{display:flex;align-items:center;justify-content:space-between}
.logo{display:flex;align-items:center;gap:10px;cursor:pointer}
.play-ico{width:36px;height:36px;border-radius:11px;background:linear-gradient(135deg,#22d3ee,#a78bfa,#ff5d8f);display:flex;align-items:center;justify-content:center;font-size:15px}
.logo-text .name{font-family:Poppins,sans-serif;font-size:21px;font-weight:900}
.logo-text .name i{font-style:normal;background:linear-gradient(90deg,#22d3ee,#a78bfa,#ff5d8f,#fb923c,#22d3ee);background-size:300%;background-clip:text;color:transparent;-webkit-background-clip:text;animation:shine 3s linear infinite}
@keyframes shine{to{background-position:300% center}}
.logo-text .tag{font-size:8.5px;letter-spacing:3px;color:#9a9ab5;font-weight:700}
.live-pill{display:flex;align-items:center;gap:6px;background:#ff2d5522;border:1px solid #ff2d5555;color:#ff6b81;font-size:10px;font-weight:800;padding:5px 9px;border-radius:20px}
.live-pill i{width:7px;height:7px;background:#ff2d55;border-radius:50%;animation:pulse 1.4s infinite}
@keyframes pulse{70%{box-shadow:0 0 0 7px #ff2d5500}}
.search-wrap{position:relative;margin-top:12px}
.search-wrap .s-ico{position:absolute;left:14px;top:50%;transform:translateY(-50%)}
#search{width:100%;padding:12px 14px 12px 40px;border-radius:14px;border:1px solid #ffffff20;background:#1d1d2e;color:#fff;font-size:13px;outline:none;user-select:text;-webkit-user-select:text}
#cats{display:flex;gap:7px;overflow-x:auto;padding:12px;white-space:nowrap;scrollbar-width:none;background:#07070f;border-bottom:1px solid #ffffff14;flex-shrink:0}
#cats::-webkit-scrollbar{display:none}
.cat{padding:8px 12px;border-radius:20px;background:#ffffff0f;border:1px solid #ffffff18;font-size:12px;font-weight:600;cursor:pointer;flex-shrink:0;display:inline-flex;align-items:center;gap:5px}
.cat-count{font-size:10px;background:#ffffff20;padding:2px 7px;border-radius:20px}
.cat.active{background:#2a2a3a;border-color:#ffffff55}
.desktop-wrap{display:flex;flex-direction:column;flex:1;min-height:0;overflow-x:hidden}
#mainCol{flex:1;min-height:0;display:flex;flex-direction:column;overflow-x:hidden}
#scrollArea{flex:1;overflow-y:auto;overflow-x:hidden;padding-bottom:90px}
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
.match-vs{text-align:center}
.match-vs .vs-txt{font-family:Poppins,sans-serif;font-size:13px;font-weight:900;color:#9ea4ba;display:block}
.match-vs .vs-time{font-size:9px;color:#aeb2c5;display:block;margin-top:2px}
.match-bottom{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-top:8px;padding-top:8px;border-top:1px solid #ffffff14}
.match-time{font-size:10px;color:#aeb2c5;line-height:1.5}
.match-action{border:0;border-radius:20px;padding:7px 12px;font-family:inherit;font-size:10px;font-weight:900;color:#fff;background:linear-gradient(90deg,#e93658,#f07836);cursor:pointer;flex-shrink:0}
.match-action.upcoming{background:#292c3d;border:1px solid #f5a43b55;color:#ffd08a}
.match-action:disabled{opacity:.45;cursor:not-allowed}
.match-countdown{display:block;color:#ffc36b;font-size:9px;font-variant-numeric:tabular-nums}
/* SVG লোগো সুন্দর দেখানোর জন্য */
.match-team img.svg-logo{
  background:#fff !important;
  padding:5px !important;
  object-fit:contain;
}
.card img[src$=".svg"]{
  background:#fff !important;
  padding:4px !important;
}
/* ===== চিকন চ্যানেল কার্ড ===== */
#grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;padding:10px 12px}
.card{background:#15151f;border:1px solid #262633;border-radius:12px;padding:8px 10px;text-align:left;cursor:pointer;display:flex;align-items:center;gap:10px;overflow:hidden;min-width:0;min-height:56px;position:relative}
.card:active{transform:scale(.97);border-color:#a78bfa}
.card .serial{position:static;flex-shrink:0;font-size:9px;background:rgba(255,255,255,.12);padding:4px 7px;border-radius:99px;color:#aaa;font-weight:800;order:-1}
.card img{width:38px;height:38px;min-width:38px;object-fit:contain;background:#fff;border-radius:10px;padding:3px}
.card .c-txt{flex:1;min-width:0}
.card p{font-size:12px;margin:0;line-height:1.3;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;word-break:break-word;font-weight:600;padding-right:0}
.card small{font-size:9px;color:#22d3ee;display:block;margin-top:2px}
#loadMoreWrap{text-align:center;padding:6px 12px 18px;display:none}
#loadMoreBtn{width:100%;max-width:320px;padding:12px;border-radius:12px;background:#2a2a3a;color:#fff;font-family:inherit;font-size:13px;font-weight:700;border:1px solid #ffffff33}
#noticeBar{display:none;background:linear-gradient(90deg,#22d3ee,#a78bfa,#ff5d8f);color:#000;font-size:12px;font-weight:700;padding:8px;text-align:center}
#featured{display:none;margin:12px;background:#221a3a;border:1px solid #a78bfa;border-radius:12px;padding:12px;cursor:pointer}
#status{position:fixed;bottom:0;left:0;right:0;background:#0a0a14ed;padding:10px;text-align:center;font-size:11px;color:#c8c8dd;border-top:1px solid #ffffff14;z-index:200}
#status b{color:#22d3ee}
.tele{position:fixed;right:14px;bottom:110px;width:52px;height:52px;border-radius:50%;background:linear-gradient(135deg,#2AABEE,#229ED9);display:flex;align-items:center;justify-content:center;z-index:999}
.tele svg{width:26px;height:26px;fill:#fff}
#installBar{display:none;position:fixed;left:10px;right:10px;bottom:36px;z-index:998;background:#1a1a2e;border:1px solid #a78bfa77;border-radius:100px;padding:7px;align-items:center;gap:6px}
#installBar .ib-txt{flex:1;text-align:center}
#installBar .ib-txt b{font-size:12px;display:block}
#installBar .ib-txt span{font-size:10px;color:#b8b8d0}
#installBar button{background:linear-gradient(90deg,#22d3ee,#a78bfa,#ff5d8f);color:#fff;border:0;padding:7px 11px;border-radius:100px;font-weight:800;font-size:11px}
#closeInstall{cursor:pointer;padding:5px}
@media(min-width:900px){
body{display:block;overflow-y:auto}
#app{display:block}
.sticky{position:sticky;top:0}
header{max-width:1440px;margin:auto;padding:16px 24px}
.top-row{flex-direction:row;align-items:center;gap:20px}
.search-wrap{flex:1;margin:0 0 0 auto;max-width:720px}
.desktop-wrap{flex-direction:row;max-width:1440px;margin:auto;gap:18px;padding:16px 24px 40px}
#mainCol{order:1}
#cats{order:2;flex-direction:column;overflow-x:hidden;width:260px;position:sticky;top:120px;max-height:calc(100vh - 160px);padding:0 0 20px;white-space:normal;border:0;background:transparent}
.cat{width:100%;padding:11px 12px;font-size:13px}
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
}
@media(min-width:1300px){#grid{grid-template-columns:repeat(5,minmax(0,1fr))}}
</style>

<div id="noticeBar"></div>
<div class="sticky">
<header>
<div class="top-row">
<div class="header-top">
<div class="logo" onclick="goHome()">
<div class="play-ico">▶</div>
<div class="logo-text">
<div class="name">RsLive <i>Go</i></div>
<div class="tag" id="taglineEl">LIVE TV • BANGLADESH</div>
</div>
</div>
<div class="live-pill" id="livePill"><i></i> LIVE</div>
</div>
<div class="search-wrap">
<span class="s-ico">🔍</span>
<input id="search" placeholder="চ্যানেল খুঁজো..." autocomplete="off">
</div>
</div>
</header>
</div>

<div class="desktop-wrap">
<div id="cats"></div>
<div id="mainCol">
<div id="scrollArea">
<section id="matchesSection">
<div class="matches-head">
<strong>⚽ LIVE & UPCOMING MATCHES</strong>
<span id="matchesCount"></span>
</div>
<div id="matchesGrid"></div>
</section>
<div id="featured">
<div style="font-size:11px;color:#ff5d8f;font-weight:800">⭐ FEATURED LIVE</div>
<b id="featName"></b><br>
<span style="font-size:11px;color:#22d3ee">এখনই দেখো →</span>
</div>
<div id="grid">
<div style="grid-column:1/-1;text-align:center;padding:40px;color:#aaa">⏳ চ্যানেল লোড হচ্ছে...</div>
</div>
<div id="loadMoreWrap">
<button id="loadMoreBtn" onclick="loadMore()">আরো দেখো ↓</button>
</div>
</div>
</div>
</div>

<div id="status">Loading...</div>

<a class="tele" id="teleBtn" href="https://t.me/RsLiveGo" target="_blank" rel="noopener">
<svg viewBox="0 0 24 24"><path d="M9.04 15.31l-.38 5.32c.54 0 .78-.23 1.06-.5l2.55-2.44 5.28 3.87c.97.53 1.66.25 1.92-.9L24 3.6c.1-.9-.32-1.38-1.1-1.12L1.5 10.2c-.9.35-.88 1.45.14 1.72l5.48 1.71 12.66-8.04c.6-.36 1.14-.17.7.23L9.04 15.31z"/></svg>
</a>

<div id="installBar">
<div class="ib-txt"><b>RsLive Go অ্যাপ নাও</b><span>১ ক্লিকেই ফোনে সেভ হবে ✨</span></div>
<button id="installBtn">ইন্সটল করো</button>
<span id="closeInstall">✕</span>
</div>
`;

/* ================= CONFIG ================= */
const CONFIG_VERSION = 'nova-v7-svg-logo';
const DEFAULT = {
  siteName: 'RsLive Go',
  tagline: 'LIVE TV • BANGLADESH',
  telegram: 'https://t.me/RsLiveGo',
  searchPh: 'চ্যানেল খুঁজো...',
  statusText: '✅ মোট {count} টা চ্যানেল - RsLive Go',
  showLive: true,
  showTele: true,
  proxyUrl: '',
  notice: '',
  showNotice: false,
  featName: '',
  featUrl: '',
  showFeat: false,
  playlists: []
};
let saved = null;
try { saved = JSON.parse(localStorage.getItem('rslive_config') || 'null'); } catch(e) {}
if (!saved || !Array.isArray(saved.playlists)) saved = null;
const CFG = {...DEFAULT, ...(saved || {})};
try {
  document.getElementById('taglineEl').textContent = CFG.tagline;
  document.getElementById('search').placeholder = CFG.searchPh;
  document.getElementById('teleBtn').href = CFG.telegram;
  if (!CFG.showLive) document.getElementById('livePill').style.display = 'none';
  if (!CFG.showTele) document.getElementById('teleBtn').style.display = 'none';
  if (CFG.showNotice && CFG.notice) { const n = document.getElementById('noticeBar'); n.textContent = CFG.notice; n.style.display = 'block'; }
  if (CFG.showFeat && CFG.featName) { document.getElementById('featured').style.display = 'block'; document.getElementById('featName').textContent = CFG.featName; window._f = CFG.featUrl; }
} catch(e) {}

/* ================= GLOBAL DATA ================= */
let all = [];
let cat = 'All';
let _catCache = null;
let visibleCount = 200;
let currentFiltered = [];
let allMatches = [];
const MATCH_INDEX_URL = '/data/matches/index.json';
function goHome() { window.location.href = '/?t=' + Date.now(); }

/* ================= MATCH JSON HANDLING ================= */
function unwrapMatchFile(data) {
  if (!data || typeof data !== 'object') return [];
  if (Array.isArray(data.matches)) return data.matches;
  if (data.match) return Array.isArray(data.match) ? data.match : [data.match];
  if (Array.isArray(data.liveSports)) return data.liveSports;
  if (data.name || data.event_name || data.title) return [data];
  return [];
}
function normalizeMatch(raw) {
  if (!raw || typeof raw !== 'object') return null;
  const m = {...raw};
  m.name = String(m.name || m.event_name || m.title || '').trim();
  const streams = Array.isArray(m.streams) ? m.streams : [];
  const first = streams.find(x => x && (x.url || x.stream_url || x.src));
  m.url = String(m.url || (first && (first.url || first.stream_url || first.src)) || '').trim();
  m.startTime = m.startTime || m.start_time || m.start || '';
  m.endTime = m.endTime || m.end_time || m.end || '';
  m.teamA = String(m.teamA || m.homeTeam || m.team1 || '').trim();
  m.teamB = String(m.teamB || m.awayTeam || m.team2 || '').trim();
  // SVG + সব নামের লোগো ধরবে
  m.teamALogo = m.teamALogo || m.logoA || m.teamA_logo || m.homeLogo || m.teamAFlag || m.flagA || m.teamAImage || m.teamAImg || '';
  m.teamBLogo = m.teamBLogo || m.logoB || m.teamB_logo || m.awayLogo || m.teamBFlag || m.flagB || m.teamBImage || m.teamBImg || '';
  if (!m.teamA || !m.teamB) {
    const parts = m.name.split(/\s+(?:vs\.?|v\.?|versus)\s+/i);
    if (parts.length >= 2) { if (!m.teamA) m.teamA = parts[0].trim(); if (!m.teamB) m.teamB = parts.slice(1).join(' vs ').trim(); }
  }
  if (!m.name) return null;
  if (m.enabled === false || String(m.enabled).toLowerCase() === 'off' || String(m.show).toLowerCase() === 'no') return null;
  return m;
}

/* ================= MATCH TIME ================= */
function getMatchState(m) {
  const now = Date.now();
  const start = Date.parse(m.startTime || '');
  const end = Date.parse(m.endTime || '');
  if (Number.isFinite(end) && end > 0 && now >= end) return 'expired';
  const manual = String(m.status || '').toLowerCase();
  if (manual === 'ended' || manual === 'finished' || manual === 'expired') return 'expired';
  if (Number.isFinite(start) && start > 0 && now < start) return 'upcoming';
  if (manual === 'upcoming' && !(Number.isFinite(start) && start > 0)) return 'upcoming';
  return 'live';
}
function fmtMatchTime(value) {
  const d = new Date(value);
  if (!Number.isFinite(d.getTime())) return 'সময় নির্ধারিত নয়';
  return d.toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true });
}
function matchCountdown(m) {
  const t = Date.parse(m.startTime || '');
  if (!Number.isFinite(t)) return '';
  let sec = Math.max(0, Math.floor((t - Date.now()) / 1000));
  const days = Math.floor(sec / 86400); sec %= 86400;
  const hours = Math.floor(sec / 3600); sec %= 3600;
  const mins = Math.floor(sec / 60); sec %= 60;
  return ((days ? days + 'd ' : '') + String(hours).padStart(2, '0') + ':' + String(mins).padStart(2, '0') + ':' + String(sec).padStart(2, '0'));
}

/* ================= TEAM LOGO - 2 SIDE + SVG ================= */
function teamNode(name, logo, side){
  const wrap = document.createElement('div');
  wrap.className = 'match-team ' + (side || 'left');
  const labelName = name || 'Team';
  let logoEl;
  if (logo) {
    const img = document.createElement('img');
    img.src = logo; img.alt = labelName; img.loading = 'lazy';
    if(String(logo).toLowerCase().split('?')[0].includes('.svg')) img.classList.add('svg-logo');
    img.onerror = function(){
      this.remove();
      const fb = document.createElement('div');
      fb.className = 'team-fallback';
      fb.textContent = labelName.trim().slice(0,2).toUpperCase();
      if(side==='right') wrap.prepend(fb); else wrap.insertBefore(fb, wrap.firstChild);
    };
    logoEl = img;
  } else {
    logoEl = document.createElement('div');
    logoEl.className = 'team-fallback';
    logoEl.textContent = labelName.trim().slice(0,2).toUpperCase();
  }
  const label = document.createElement('b');
  label.textContent = labelName;
  if(side==='right'){ wrap.append(label, logoEl); }
  else { wrap.append(logoEl, label); }
  return wrap;
}

/* ================= OPEN MATCH / CHANNEL - FULLSCREEN ================= */
function openMatch(m, idx) {
  if (!m.url) return;
  try{ localStorage.setItem('rslive_sports_match', JSON.stringify({name:m.name, streams:m.streams||[{stream_url:m.url}], savedAt:Date.now()})); }catch(e){}
  const params = new URLSearchParams({ url: m.url, name: m.name, src: 'Live Sports', group: m.matchType || m.category || 'Sports', serial: String((idx||0)+1), fs: '1' });
  window.location.href = 'player.html?' + params.toString();
}
function openCh(u, n, s, g, serial) {
  const params = new URLSearchParams({ url: u, name: n, src: s, group: g, serial: String(serial||1), fs: '1' });
  window.location.href = 'player.html?' + params.toString();
}

/* ================= RENDER MATCH CARDS ================= */
function renderMatches() {
  const section = document.getElementById('matchesSection');
  const grid = document.getElementById('matchesGrid');
  if (!section || !grid) return;
  const q = (document.getElementById('search')?.value || '').trim().toLowerCase();
  const visible = allMatches.map(normalizeMatch).filter(Boolean).filter(m => getMatchState(m) !== 'expired').filter(m => !q || m.name.toLowerCase().includes(q));
  visible.sort((a, b) => { const sa = getMatchState(a); const sb = getMatchState(b); if (sa !== sb) return sa === 'live' ? -1 : 1; return ((Date.parse(a.startTime || '') || 0) - (Date.parse(b.startTime || '') || 0)); });
  section.style.display = visible.length ? 'block' : 'none';
  const count = document.getElementById('matchesCount');
  if (count) count.textContent = visible.length ? visible.length + ' ম্যাচ' : '';
  grid.replaceChildren();
  visible.forEach((m, idx) => {
    const state = getMatchState(m);
    const card = document.createElement('article');
    card.className = 'match-card ' + state;
    card.addEventListener('click', ()=>{ if(state==='live' && m.url) openMatch(m, idx); });
    const top = document.createElement('div'); top.className = 'match-top';
    const badge = document.createElement('span'); badge.className = 'match-badge ' + state; badge.textContent = state === 'live' ? '● LIVE' : '◷ UPCOMING';
    const type = document.createElement('span'); type.className = 'match-type'; type.textContent = m.matchType || m.category || 'LIVE SPORTS';
    top.append(badge, type);
    const teams = document.createElement('div'); teams.className = 'match-teams';
    const a = teamNode(m.teamA || m.name, m.teamALogo, 'left');
    const vs = document.createElement('div'); vs.className = 'match-vs';
    vs.innerHTML = `<span class="vs-txt">VS</span><span class="vs-time">${state==='live' ? '● LIVE' : (fmtMatchTime(m.startTime).split(',')[1] || '')}</span>`;
    const b = teamNode(m.teamB || '', m.teamBLogo, 'right');
    teams.append(a, vs, b);
    const bottom = document.createElement('div'); bottom.className = 'match-bottom';
    const time = document.createElement('div'); time.className = 'match-time'; time.textContent = 'শুরু: ' + fmtMatchTime(m.startTime);
    if (state === 'upcoming') { const cd = document.createElement('span'); cd.className = 'match-countdown'; cd.textContent = 'শুরু হতে বাকি ' + matchCountdown(m); time.appendChild(cd); }
    const btn = document.createElement('button'); btn.className = 'match-action ' + state; btn.type = 'button'; btn.textContent = state === 'live' ? '▶ Watch Live' : 'UPCOMING'; btn.disabled = state !== 'live' || !m.url;
    if (!btn.disabled) { btn.addEventListener('click', (e)=>{ e.stopPropagation(); openMatch(m, idx); }); }
    bottom.append(time, btn);
    card.append(top, teams, bottom);
    grid.appendChild(card);
  });
}

/* ================= LOAD MATCHES ================= */
async function loadMatches() {
  try {
    const indexResponse = await fetch(MATCH_INDEX_URL + '?t=' + Date.now(), {cache: 'no-store'});
    if (!indexResponse.ok) throw new Error('Index HTTP ' + indexResponse.status);
    const indexData = await indexResponse.json();
    if (!Array.isArray(indexData.files)) throw new Error('index.json এ files তালিকা পাওয়া যায়নি');
    const files = indexData.files.filter(file => typeof file === 'string' && /^[a-zA-Z0-9_-]+\.json$/.test(file));
    const results = await Promise.all(files.map(async file => {
      try {
        const response = await fetch('/data/matches/' + encodeURIComponent(file) + '?t=' + Date.now(), {cache: 'no-store'});
        if (!response.ok) throw new Error('HTTP ' + response.status);
        const data = await response.json();
        return unwrapMatchFile(data).map(normalizeMatch).filter(Boolean);
      } catch(error) { console.warn('Match file failed:', file, error); return []; }
    }));
    allMatches = results.flat();
    renderMatches();
    console.log('RsLive matches loaded:', allMatches.length, 'from', files.length, 'files');
  } catch(error) { console.error('Match index load failed:', error); renderMatches(); }
}

/* ================= PLAYLIST SYSTEM ================= */
async function getPlaylistsFromSW() {
  try {
    if ('serviceWorker' in navigator) await navigator.serviceWorker.ready;
    const r = await fetch('/api/playlists', {cache: 'no-store'});
    if (!r.ok) throw new Error('Playlist API error');
    const data = await r.json();
    if (Array.isArray(data) && data.length) return data;
  } catch(e) { console.warn('SW playlist unavailable:', e); }
  return Array.isArray(CFG.playlists) ? CFG.playlists : [];
}
async function loadOne(p) {
  if (!p || !p.url) return [];
  try {
    let u = p.url;
    if (p.useProxy && CFG.proxyUrl) u = CFG.proxyUrl + encodeURIComponent(p.url);
    const r = await fetch(u);
    if (!r.ok) throw new Error('Playlist HTTP ' + r.status);
    const t = await r.text();
    return parse(t);
  } catch(e) { console.warn('Playlist failed:', p.name, e); return []; }
}
function parse(t) {
  const lines = t.split(/\r?\n/); const output = []; let channel = null;
  for (const line of lines) {
    const x = line.trim();
    if (x.startsWith('#EXTINF')) {
      const name = x.split(',').pop().trim();
      const logo = x.match(/tvg-logo="([^"]+)"/);
      const group = x.match(/group-title="([^"]+)"/);
      channel = { name: name, logo: logo ? logo[1] : '', group: group ? group[1] : 'General' };
    } else if (/^https?:\/\//i.test(x) && channel) { channel.url = x; output.push(channel); channel = null; }
  }
  return output;
}
async function loadAll() {
  loadMatches();
  CFG.playlists = await getPlaylistsFromSW();
  for (const p of CFG.playlists) {
    const list = await loadOne(p);
    for (const ch of list) { ch.source = p.name || 'TV'; if (!all.some(y => y.url === ch.url)) all.push(ch); }
    document.getElementById('status').innerHTML = '✅ মোট <b>' + all.length + '</b> টা চ্যানেল লোড হচ্ছে...';
    _catCache = null; renderCats(); renderGrid();
  }
  document.getElementById('status').innerHTML = CFG.statusText.replace('{count}', '<b>' + all.length + '</b>');
  renderCats(); renderGrid();
}

/* ================= CATEGORY ================= */
function getCats() {
  if (_catCache) return _catCache;
  const sources = [...new Set(CFG.playlists.map(p => p.name).filter(Boolean))];
  _catCache = ['All', ...sources, 'Sports', 'News', 'Entertainment', 'Movies', 'Kids', 'Music', 'Bangladesh', 'India'];
  return _catCache;
}
function catIcon(c) { const icons = { All: '🏠', Sports: '🏆', News: '📰', Entertainment: '🎭', Movies: '🎬', Kids: '🧒', Music: '🎵', Bangladesh: '🇧🇩', India: '🇮🇳' }; return icons[c] || '📺'; }
function catCount(c) { if (!all.length) return 0; if (c === 'All') return all.length; if (CFG.playlists.find(p => p.name === c)) return all.filter(x => x.source === c).length; return all.filter(x => matchesCat(x, c)).length; }
function matchesCat(c, category) {
  const name = String(c.name || '').toLowerCase(); const group = String(c.group || '').toLowerCase();
  if (category === 'All') return true;
  if (CFG.playlists.find(p => p.name === category)) return c.source === category;
  if (category === 'Sports') return ['sport','cricket','football'].some(x => group.includes(x));
  if (category === 'News') return group.includes('news');
  if (category === 'Movies') return group.includes('movie');
  if (category === 'Kids') return group.includes('kid');
  if (category === 'Music') return group.includes('music');
  if (category === 'Entertainment') return group.includes('entertainment') || group.includes('general');
  if (category === 'Bangladesh') return ['bangla','btv','t sports','somoy','jamuna'].some(x => name.includes(x));
  if (category === 'India') return ['star','sony','zee','colors'].some(x => name.includes(x));
  return group.includes(category.toLowerCase());
}
function renderCats() {
  const isDesktop = window.innerWidth >= 900; const catsEl = document.getElementById('cats'); if (!catsEl) return;
  catsEl.replaceChildren();
  if (isDesktop) { const heading = document.createElement('div'); heading.style.cssText = 'font-family:Poppins;font-size:13px;font-weight:800;padding:2px 6px 12px'; heading.textContent = '✨ ক্যাটাগরি (' + getCats().length + ')'; catsEl.appendChild(heading); }
  getCats().forEach(c => {
    const el = document.createElement('div'); el.className = 'cat' + (c === cat ? ' active' : ''); el.dataset.cat = c;
    const count = document.createElement('span'); count.className = 'cat-count'; count.textContent = catCount(c);
    el.append(document.createTextNode(catIcon(c) + ' ' + c + ' '), count);
    el.addEventListener('click', () => setCat(c)); catsEl.appendChild(el);
  });
}

/* ================= RENDER CHANNELS - THIN CARD ================= */
function renderGrid(reset = true) {
  if (reset) visibleCount = 200;
  const q = document.getElementById('search').value.toLowerCase();
  currentFiltered = all.filter(c => { if (q && !String(c.name).toLowerCase().includes(q)) return false; return matchesCat(c, cat); });
  const show = currentFiltered.slice(0, visibleCount);
  const grid = document.getElementById('grid');
  grid.replaceChildren();
  show.forEach((c, i) => {
    const card = document.createElement('div'); card.className = 'card';
    const serial = document.createElement('span'); serial.className = 'serial'; serial.textContent = '#' + String(i+1).padStart(2,'0');
    const img = document.createElement('img'); img.loading = 'lazy'; img.src = c.logo || 'https://cdn-icons-png.flaticon.com/512/1179/1179069.png';
    img.onerror = function() { this.src = 'https://cdn-icons-png.flaticon.com/512/1179/1179069.png'; };
    const txt = document.createElement('div'); txt.className = 'c-txt';
    const name = document.createElement('p'); name.textContent = c.name;
    const group = document.createElement('small'); group.textContent = c.group || 'General';
    txt.append(name, group);
    card.append(serial, img, txt);
    card.addEventListener('click', () => { openCh(c.url, c.name, c.source || '', c.group || '', i+1); });
    grid.appendChild(card);
  });
  const wrap = document.getElementById('loadMoreWrap'); const btn = document.getElementById('loadMoreBtn');
  if (currentFiltered.length > visibleCount) { wrap.style.display = 'block'; btn.textContent = 'আরো দেখো ↓ (' + visibleCount + '/' + currentFiltered.length + ')'; } else { wrap.style.display = 'none'; }
  if (reset) { const sa = document.getElementById('scrollArea'); if (sa) sa.scrollTop = 0; window.scrollTo({top: 0}); }
}
function loadMore() { visibleCount += 200; renderGrid(false); }
function setCat(c) { if (cat === c) return; cat = c; document.querySelectorAll('#cats .cat').forEach(el => { el.classList.toggle('active', el.dataset.cat === c); }); renderGrid(true); }

/* ================= SEARCH ================= */
let _searchT = null;
document.getElementById('search').addEventListener('input', () => { clearTimeout(_searchT); _searchT = setTimeout(() => { renderGrid(true); renderMatches(); }, 100); });
let _rszT = null;
window.addEventListener('resize', () => { clearTimeout(_rszT); _rszT = setTimeout(renderCats, 150); });

/* ================= START ================= */
loadAll();
setInterval(loadMatches, 60000);
setInterval(renderMatches, 1000);

/* ================= PWA ================= */
if ('serviceWorker' in navigator) { navigator.serviceWorker.register('/sw.js').catch(e => console.warn('Service Worker:', e)); }
let deferredPrompt = null;
window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); deferredPrompt = e; if (!window.matchMedia('(display-mode: standalone)').matches) { const bar = document.getElementById('installBar'); if (bar && !localStorage.getItem('rslive_install_closed')) bar.style.display = 'flex'; } });
document.getElementById('installBtn')?.addEventListener('click', async () => { if (!deferredPrompt) { alert('ব্রাউজারের Menu (⋮) -> Add to Home Screen এ চাপ দাও'); return; } deferredPrompt.prompt(); const choice = await deferredPrompt.userChoice; if (choice.outcome === 'accepted') document.getElementById('installBar').style.display = 'none'; deferredPrompt = null; });
document.getElementById('closeInstall')?.addEventListener('click', () => { document.getElementById('installBar').style.display = 'none'; localStorage.setItem('rslive_install_closed', '1'); });
window.addEventListener('appinstalled', () => { document.getElementById('installBar').style.display = 'none'; });
