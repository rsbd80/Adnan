/* RsLive Go - app.js | Logo + All Channels + Play Fix */
const PROXY_BASE = 'https://stream-through-spark.lovable.app/api/proxy?u=';
let proxyMap = JSON.parse(localStorage.getItem('rslive_proxy_map') || '{}');
let playlists = [];
let currentList = null;
let searchText = '';
let hls = null;
let showProxy = false;

const app = document.getElementById('app');

// Category Icon - ভুল Flag আর না, এখন Emoji + আসল লোগো
function catIcon(name){
  const n = name.toLowerCase();
  if(n.includes('sport')) return '🏆';
  if(n.includes('news')) return '📰';
  if(n.includes('movie')) return '🎬';
  if(n.includes('kid')) return '🧒';
  if(n.includes('music')) return '🎵';
  if(n.includes('entertain')) return '🎭';
  if(n.includes('bangladesh')) return '🇧🇩';
  if(n.includes('india')) return '🇮🇳';
  return '📺';
}

// 👇 ঠিক করা Parser - tvg-logo, group-title, খালি লাইন সব পড়বে
function parseM3U(text){
  const lines = text.split(/\r?\n/);
  const chans = [];
  for(let i=0;i<lines.length;i++){
    const line = lines[i].trim();
    if(!line.startsWith('#EXTINF')) continue;
    let logo = '';
    let m = line.match(/tvg-logo="([^"]*)"/);
    if(m) logo = m[1];
    let grp = '';
    m = line.match(/group-title="([^"]*)"/);
    if(m) grp = m[1];
    const name = line.split(',').pop().trim();
    let url = '';
    for(let j=i+1;j<lines.length;j++){
      const nxt = lines[j].trim();
      if(!nxt) continue;
      if(nxt.startsWith('#')){
        if(nxt.startsWith('#EXTINF')) i = j-1;
        break;
      }
      url = nxt; i = j; break;
    }
    if(url && name) chans.push({ name, url, logo, group: grp });
  }
  return chans;
}

async function fetchM3U(url){
  const res = await fetch(url);
  return parseM3U(await res.text());
}

// 👇 আসল ফিক্স - চ্যানেলের URL এও Proxy লাগবে
function getPlayUrl(pl, ch){
  if(proxyMap[pl.name]){
    if(ch.url.startsWith(PROXY_BASE)) return ch.url;
    return PROXY_BASE + encodeURIComponent(ch.url);
  }
  return ch.url;
}

function playChannel(pl, ch){
  const video = document.getElementById('player');
  const np = document.getElementById('nowPlaying');
  if(!video) return;
  video.style.display = 'block';
  np.style.display = 'block';
  np.textContent = '▶️ চলছে: ' + ch.name;
  window.scrollTo({ top: 0, behavior: 'smooth' });
  const url = getPlayUrl(pl, ch);
  if(hls){ hls.destroy(); hls = null; }
  if(window.Hls && Hls.isSupported()){
    hls = new Hls({ maxBufferLength: 30 });
    hls.loadSource(url);
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED, ()=> video.play().catch(()=>{}));
  } else if(video.canPlayType('application/vnd.apple.mpegurl')){
    video.src = url; video.play().catch(()=>{});
  } else { video.src = url; video.play().catch(()=>{}); }
}

function render(){
  const cats = playlists.filter(p => p.name.toLowerCase().includes(searchText));
  let catHtml = '';
  if(!playlists.length){
    catHtml = '<p style="padding:20px;color:#aaa;text-align:center">লোড হচ্ছে...</p>';
  } else if(!cats.length){
    catHtml = '<p style="padding:20px;color:#aaa;text-align:center">কোনো Category পাওয়া যায়নি</p>';
  } else {
    catHtml = cats.map(pl => {
      // Category Thumb = প্রথম চ্যানেলের আসল লোগো, না থাকলে Emoji
      const firstLogo = pl.channels.find(c => c.logo)?.logo || '';
      const thumb = firstLogo
        ? `<img src="${firstLogo}" onerror="this.parentElement.innerHTML='<div style=font-size:40px>${catIcon(pl.name)}</div>'" style="width:100%;height:100%;object-fit:cover">`
        : `<div style="font-size:40px">${catIcon(pl.name)}</div>`;
      return `<div class="card" data-cat="${pl.name}">
        <div class="thumb">${thumb}<div class="badge">${pl.channels.length} Channels</div></div>
        <div class="card-body"><b>${pl.name}</b><span>View →</span></div>
      </div>`;
    }).join('');
  }

  let proxyHtml = '';
  if(showProxy){
    proxyHtml = `<div style="padding:4px 2px 12px">
      <p style="color:#aaa;font-size:13px;margin-bottom:10px">যেই Playlist এ Proxy লাগবে, শুধু ওইটারটা ON করো।</p>
      ${playlists.map(pl => `
        <div class="ch" style="cursor:default">
          <div style="flex:1"><b>${pl.name}</b><br><small style="color:#888">${proxyMap[pl.name]?'Proxy দিয়ে চলবে':'সরাসরি চলবে'} • ${pl.channels.length} Channels</small></div>
          <span class="p-badge">${proxyMap[pl.name]?'Proxy ON':'Proxy OFF'}</span>
          <div class="switch ${proxyMap[pl.name]?'on':''}" data-proxy="${pl.name}"></div>
        </div>`).join('')}
    </div>`;
  }

  let listHtml = '';
  if(currentList){
    let chans = currentList.channels;
    if(searchText) chans = chans.filter(c => c.name.toLowerCase().includes(searchText));
    listHtml = `
      <button class="back" id="btnBack">← Back</button>
      <h2 style="margin:0 0 12px">${currentList.name} • ${currentList.channels.length} Channels</h2>
      ${!chans.length ? '<p style="color:#aaa">এই Category তে চ্যানেল পাওয়া যায়নি। Proxy ON করে দেখো।</p>' : ''}
      ${chans.map((c, idx) => `
        <div class="ch" data-ch="${idx}">
          <div class="num">${idx+1}</div>
          ${c.logo
            ? `<img src="${c.logo}" onerror="this.outerHTML='<div class=no-logo>${catIcon(currentList.name)}</div>'">`
            : `<div class="no-logo">${catIcon(currentList.name)}</div>`}
          <div style="flex:1;min-width:0"><b>${c.name}</b><br><small>${c.group || currentList.name}</small></div>
          <span>▶️</span>
        </div>`).join('')}
    `;
  }

  app.innerHTML = `
    <style>
      .top{display:flex;justify-content:space-between;align-items:center;padding:12px 16px;position:sticky;top:0;background:#07070f;z-index:10}
      .logo{font-size:22px;font-weight:900;font-family:Poppins}.logo span{color:#22d3ee}
      .logo small{display:block;font-size:9px;letter-spacing:3px;color:#888;font-weight:700}
      .search{background:#12121f;border:1px solid #222;border-radius:20px;padding:8px 12px;color:#fff;width:140px;outline:none}
      .wrap{max-width:1000px;margin:0 auto;padding:12px;padding-bottom:100px}
      video{width:100%;aspect-ratio:16/9;background:#000;border-radius:12px;display:none}
      .now{margin:10px 0;font-weight:700;display:none}
      .tabs{display:flex;gap:8px;margin:12px 0}
      .tabs button{flex:1;padding:10px;border:0;border-radius:10px;background:#1c1c2e;color:#fff;font-weight:700;cursor:pointer}
      .tabs button.active{background:#22c55e;color:#000}
      .grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px}
      .card{background:#12121f;border:1px solid #222;border-radius:16px;overflow:hidden;cursor:pointer}
      .thumb{height:110px;background:#1a1a2e;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden}
      .badge{position:absolute;top:8px;right:8px;background:rgba(0,0,0,.85);font-size:11px;font-weight:700;padding:4px 10px;border-radius:20px}
      .card-body{padding:10px 12px}.card-body b{font-size:16px;display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.card-body span{color:#22d3ee;font-size:13px}
      .back{padding:10px 14px;background:#1c1c2e;border:0;color:#fff;border-radius:10px;margin-bottom:12px;cursor:pointer}
      .ch{display:flex;gap:12px;align-items:center;background:#141422;border:1px solid #222;border-radius:12px;padding:10px;margin-bottom:10px;cursor:pointer}
      .ch img{width:52px;height:52px;border-radius:10px;object-fit:contain;background:#fff;flex-shrink:0}
      .no-logo{width:52px;height:52px;border-radius:10px;background:#222;display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0}
      .ch b{font-size:14px}.ch small{color:#22d3ee}
      .num{width:32px;height:32px;border-radius:50%;background:#222;display:flex;align-items:center;justify-content:center;font-size:12px;color:#aaa;flex-shrink:0}
      .switch{position:relative;width:44px;height:24px;background:#333;border-radius:20px;cursor:pointer;flex-shrink:0}
      .switch.on{background:#22c55e}.switch::after{content:'';position:absolute;top:3px;left:3px;width:18px;height:18px;background:#fff;border-radius:50%;transition:.2s}.switch.on::after{left:23px}
      .p-badge{font-size:11px;background:#222;padding:4px 10px;border-radius:20px}
      .bottom{position:fixed;bottom:0;left:0;right:0;background:#0a0a14;border-top:1px solid #222;display:flex;padding:8px;z-index:20}
      .bottom button{flex:1;background:none;border:0;color:#888;padding:8px;font-weight:700;cursor:pointer}
      .bottom button.active{color:#fff;background:#1c1c2e;border-radius:12px}
      .tele{position:fixed;right:14px;bottom:90px;width:56px;height:56px;border-radius:50%;background:#229ED9;display:flex;align-items:center;justify-content:center;font-size:26px;z-index:20;cursor:pointer}
    </style>
    <div class="top">
      <div class="logo">RsLive <span>Go</span><small>LIVE TV • BANGLADESH</small></div>
      <input class="search" placeholder="🔍 Search..." value="${searchText}">
    </div>
    <div class="wrap">
      <video id="player" controls playsinline></video>
      <div class="now" id="nowPlaying"></div>
      ${currentList ? listHtml : `
        <div class="tabs">
          <button class="${!showProxy?'active':''}" id="tabCat">Categories</button>
          <button class="${showProxy?'active':''}" id="tabProxy">⚙️ Proxy Setting</button>
        </div>
        ${showProxy ? proxyHtml : `<div class="grid">${catHtml}</div>`}
      `}
    </div>
    <div class="bottom">
      <button>🏆 Events</button>
      <button class="active">🏠 Home</button>
      <button>⊞ Categories</button>
    </div>
    <div class="tele">✈️</div>
  `;

  // HLS.js লোড (একবার)
  if(!document.querySelector('script[src*="hls.js"]')){
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/hls.js@latest';
    document.head.appendChild(s);
  }

  // Events
  const inp = app.querySelector('.search');
  inp?.addEventListener('input', e => { searchText = e.target.value.toLowerCase(); render(); inp.focus(); inp.setSelectionRange(inp.value.length, inp.value.length); });

  document.getElementById('tabCat')?.addEventListener('click', ()=>{ showProxy=false; render(); });
  document.getElementById('tabProxy')?.addEventListener('click', ()=>{ showProxy=true; render(); });
  document.getElementById('btnBack')?.addEventListener('click', ()=>{ currentList=null; searchText=''; render(); });

  app.querySelectorAll('[data-cat]').forEach(el => {
    el.addEventListener('click', ()=>{
      currentList = playlists.find(p=>p.name===el.dataset.cat);
      searchText=''; render();
    });
  });

  app.querySelectorAll('[data-ch]').forEach(el => {
    el.addEventListener('click', ()=>{
      let chans = currentList.channels;
      if(searchText) chans = chans.filter(c=>c.name.toLowerCase().includes(searchText));
      // Search ফিল্টার থাকলেও আসল চ্যানেলটা খুঁজে Play করো
      playChannel(currentList, chans[parseInt(el.dataset.ch)]);
    });
  });

  app.querySelectorAll('[data-proxy]').forEach(sw => {
    sw.addEventListener('click', async (e)=>{
      e.stopPropagation();
      const name = sw.dataset.proxy;
      proxyMap[name] = !proxyMap[name];
      localStorage.setItem('rslive_proxy_map', JSON.stringify(proxyMap));
      if(navigator.serviceWorker.controller) navigator.serviceWorker.controller.postMessage({ type:'SET_PROXY_ONE', name, enabled: proxyMap[name] });
      await loadPlaylists();
    });
  });
}

async function loadPlaylists(){
  try{
    const res = await fetch('/api/playlists');
    const lists = await res.json();
    const newLists = [];
    for(const pl of lists){
      if(proxyMap[pl.name]===undefined) proxyMap[pl.name] = pl.useProxy;
      let chans = [];
      try{ chans = await fetchM3U(pl.url); }catch(e){ console.log(pl.name,'fail',e); }
      newLists.push({ ...pl, channels: chans });
    }
    playlists = newLists;
    localStorage.setItem('rslive_proxy_map', JSON.stringify(proxyMap));
    if(navigator.serviceWorker.controller) navigator.serviceWorker.controller.postMessage({ type:'SET_PROXY_ALL', map: proxyMap });
    if(currentList) currentList = playlists.find(p=>p.name===currentList.name) || currentList;
    render();
  }catch(e){ console.log('load fail', e); }
}

if('serviceWorker' in navigator){
  navigator.serviceWorker.register('/sw.js').then(()=> navigator.serviceWorker.ready).then(()=> loadPlaylists());
} else { loadPlaylists(); }
render();
