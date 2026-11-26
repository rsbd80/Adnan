/* =====================================================
   RsLive Go - FINAL v23.3 - Top Lively + Countdown Light
   ===================================================== */

document.getElementById('app').innerHTML = `
<style>
*{margin:0;padding:0;box-sizing:border-box;user-select:none;-webkit-user-select:none}
html,body{height:100%;width:100%;background:#000;color:#fff;font-family:Poppins,'Hind Siliguri',sans-serif;overflow-x:hidden}
body{display:flex;flex-direction:column;touch-action:pan-y}
#app{display:flex;flex-direction:column;flex:1;min-height:0;overflow-x:hidden}
.sticky{flex-shrink:0;z-index:100}
header{background:#000;border-bottom:1px solid #ffffff14;padding:14px 14px 13px;position:relative;overflow:hidden}
header:before{content:"";position:absolute;inset:0;background:radial-gradient(220px 70px at 20% 0%,rgba(139,124,255,.22),transparent 70%),radial-gradient(220px 70px at 85% 0%,rgba(34,211,238,.14),transparent 70%);pointer-events:none}
.header-top{display:flex;align-items:center;gap:10px;position:relative;z-index:2;min-height:42px}
.logo{display:flex;align-items:center;gap:10px;cursor:pointer;flex-shrink:0}
.play-ico{width:42px;height:42px;min-width:42px;border-radius:13px;background:linear-gradient(135deg,#22d3ee 0%,#8b7cff 48%,#ff5d8f 100%);display:flex;align-items:center;justify-content:center;flex-shrink:0;border:1px solid rgba(255,255,255,.28);box-shadow:0 6px 18px rgba(139,124,255,.45), inset 0 1px 0 rgba(255,255,255,.45), inset 0 -2px 6px rgba(0,0,0,.18);position:relative;overflow:hidden}
.play-ico:before{content:"";position:absolute;top:0;left:0;right:0;height:50%;background:linear-gradient(180deg,rgba(255,255,255,.35),transparent);border-radius:13px 13px 0 0}
.play-ico svg{width:17px;height:17px;fill:#fff;filter:drop-shadow(0 1px 2px rgba(0,0,0,.4));position:relative;z-index:1;margin-left:2px}
.logo-text .name{font-family:Poppins,sans-serif;font-size:22px;font-weight:900;line-height:1;letter-spacing:.2px}
.logo-text .name i{font-style:normal;background:linear-gradient(90deg,#a78bfa,#22d3ee,#ff5d8f,#fb923c,#a78bfa);background-size:300%;background-clip:text;color:transparent;-webkit-background-clip:text}
.logo-text .tag{font-size:7.5px;letter-spacing:3px;color:#9a9ab5;font-weight:700;margin-top:3px}
#searchWrap{display:flex;position:relative;flex:1;min-width:0;max-width:170px;margin-left:auto}
#searchWrap .s-ico{position:absolute;left:11px;top:50%;transform:translateY(-50%);font-size:12px;opacity:.7;z-index:1}
#search{width:100%;padding:9px 12px 9px 32px;border-radius:99px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.07);color:#fff;font-size:12px;outline:none;user-select:text;-webkit-user-select:text;transition:.2s}
#search:focus{background:rgba(255,255,255,.10);border-color:rgba(139,124,255,.60);box-shadow:0 0 0 3px rgba(139,124,255,.18)}
#search::placeholder{color:#8e91a8}
#pageTitle{display:none !important}
#cats{display:none !important}
.desktop-wrap{display:flex;flex-direction:column;flex:1;min-height:0;overflow-x:hidden}
#mainCol{flex:1;min-height:0;display:flex;flex-direction:column;overflow-x:hidden}
#scrollArea{flex:1;overflow-y:auto;overflow-x:hidden;padding-bottom:82px}
#matchesSection{display:none;padding:8px 10px 2px}
.matches-head{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:7px}
.matches-head strong{font-family:Poppins,sans-serif;font-size:12px}
.matches-head span{font-size:9px;color:#8e91a8}
#matchesGrid{display:grid;grid-template-columns:1fr;gap:8px}
.match-card{background:linear-gradient(135deg,#1a1d2e 0%,#10121d 55%,#171321 100%);border:1px solid #ffffff22;border-radius:14px;padding:7px 11px 9px;box-shadow:0 6px 16px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.06);cursor:pointer;position:relative;overflow:hidden}
.match-card:before{content:"";position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(34,211,238,.5),rgba(167,139,250,.5),transparent)}
.match-card.live{border-left:3px solid #ff3d5a;box-shadow:0 6px 16px rgba(0,0,0,.5), 0 0 18px rgba(255,61,90,.12)}
.match-card.upcoming{border-left:3px solid #f3a43b;box-shadow:0 6px 16px rgba(0,0,0,.5), 0 0 14px rgba(243,164,59,.08)}
.match-card:active{transform:scale(.98)}
.match-top{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:1px}
.sport-badge{display:flex;align-items:center;gap:5px;font-size:10.5px;font-weight:800;color:#fff;background:linear-gradient(90deg,rgba(34,211,238,.22),rgba(139,124,255,.22));padding:3px 9px 3px 7px;border-radius:99px;border:1px solid rgba(34,211,238,.35);box-shadow:0 2px 10px rgba(34,211,238,.18)}
.sport-badge .sport-ico{font-size:12px;line-height:1;filter:drop-shadow(0 1px 3px rgba(0,0,0,.4))}
.match-badge{border-radius:20px;padding:3px 9px;font-size:8.5px;font-weight:900;letter-spacing:.5px}
.match-badge.live{background:linear-gradient(90deg,rgba(255,48,78,.35),rgba(255,93,143,.25));color:#ff8fa0;border:1px solid #ff304e55;box-shadow:0 2px 8px rgba(255,48,78,.25)}
.match-badge.upcoming{background:linear-gradient(90deg,rgba(245,164,59,.28),rgba(255,200,100,.18));color:#ffd98a;border:1px solid #f5a43b55;box-shadow:0 2px 8px rgba(245,164,59,.2)}
.match-type{font-size:9px;color:#c7cadb;overflow:hidden;text-overflow:ellipsis;font-weight:600}
.match-status-center{text-align:center;margin:0 0 4px}
.match-status-center .match-badge{display:inline-block;box-shadow:0 3px 10px rgba(0,0,0,.4)}
.match-teams{display:grid;grid-template-columns:1fr 54px 1fr;align-items:center;gap:6px}
.match-team{min-width:0;display:flex;align-items:center;gap:9px}
.match-team.left{justify-content:flex-start;text-align:left}
.match-team.right{justify-content:flex-end;text-align:right}
.match-team img,.team-fallback{width:38px;height:38px;min-width:38px;object-fit:contain;border-radius:50%;background:#fff;padding:4px;flex-shrink:0;border:2px solid rgba(255,255,255,.25);box-shadow:0 4px 10px rgba(0,0,0,.5)}
.team-fallback{display:flex;align-items:center;justify-content:center;background:#25283a;color:#fff;font-weight:900;font-size:13px;border:1px solid #41445a}
.match-team b{font-size:12px;line-height:1.25;overflow-wrap:anywhere;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.match-team img.svg-logo{background:#fff !important;padding:5px !important}
.card img[src$=".svg"]{background:#fff !important;padding:3px !important}
.match-vs{text-align:center}
.match-vs .vs-txt{font-family:Poppins,sans-serif;font-size:11px;font-weight:900;color:#fff;display:inline-block;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.15);padding:4px 8px;border-radius:99px}
.match-bottom{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-top:7px;padding-top:7px;border-top:1px solid #ffffff14}
.match-time{font-size:9.5px;color:#c9cce0;line-height:1.4;text-align:left}
.match-action{border:0;border-radius:20px;padding:6px 11px;font-family:inherit;font-size:9px;font-weight:900;color:#fff;background:linear-gradient(90deg,#e93658,#f07836);cursor:pointer;flex-shrink:0}
.match-action.upcoming{background:#292c3d;border:1px solid #f5a43b55;color:#ffd08a}
.match-action:disabled{opacity:.45;cursor:not-allowed}
.match-countdown{display:block;color:#fff2cc;font-size:11px;font-weight:700;font-variant-numeric:tabular-nums;text-align:right;line-height:1.3;white-space:nowrap;text-shadow:0 1px 6px rgba(255,220,140,.35)}
.match-countdown small{display:block;font-size:7.5px;font-weight:700;color:#b8bccf;letter-spacing:1.5px}
#grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;padding:10px 12px}
.card{background:#15151f;border:1px solid #262633;border-radius:12px;padding:8px 10px;text-align:left;cursor:pointer;display:flex;align-items:center;gap:8px;overflow:hidden;min-width:0;min-height:56px;box-shadow:0 5px 14px rgba(0,0,0,.35)}
.card:active{transform:scale(.97);border-color:#a78bfa}
.card .serial{flex-shrink:0;font-size:10px;background:rgba(255,255,255,.12);
