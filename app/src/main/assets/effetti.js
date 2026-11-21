/* =====================================================================
   STORIE D'ITALIA – EFFETTI (animazioni e grafica)
   Modulo indipendente: il motore dell'app lo chiama con window.FX.
   Se manca o qualcosa va storto, l'app funziona lo stesso.
   ===================================================================== */
(() => {
"use strict";
const D = document, root = D.documentElement, W = window;
const $ = id => D.getElementById(id);
const RM = W.matchMedia ? W.matchMedia("(prefers-reduced-motion: reduce)") : { matches:false };
const HAS_ANIM = !!(Element.prototype.animate);
const t0 = performance.now();
let level = "full";
try{ const s = JSON.parse(localStorage.getItem("si2:settings") || "{}"); if(s && s.fx === "low") level = "low"; }catch(e){}
const low = () => level === "low" || RM.matches;
const rand = (a, b) => a + Math.random() * (b - a);
const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;" }[c]));
const splashLeft = () => Math.max(0, 2050 - (performance.now() - t0));
const safe = fn => function(){ try{ return fn.apply(this, arguments); }catch(e){ return undefined; } };

/* ---------- tessere SVG per le particelle (generate una volta sola) ---------- */
function rng(seed){ let x = seed; return () => { x ^= x << 13; x ^= x >>> 17; x ^= x << 5; return ((x >>> 0) % 100000) / 100000; }; }
const uri = svg => 'url("data:image/svg+xml,' + encodeURIComponent(svg) + '")';
function tile(w, h, seed, draw){ const R = rng(seed); let s = ""; draw(R, x => s += x); return uri(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${s}</svg>`); }
function dots(n, w, h, seed, cols, r0, r1, o0, o1){
  return tile(w, h, seed, (R, add) => { for(let i = 0; i < n; i++){ const r = r0 + R() * (r1 - r0); add(`<circle cx="${(r + R() * (w - 2 * r)).toFixed(1)}" cy="${(r + R() * (h - 2 * r)).toFixed(1)}" r="${r.toFixed(2)}" fill="${cols[i % cols.length]}" fill-opacity="${(o0 + R() * (o1 - o0)).toFixed(2)}"/>`); } });
}
const birds = c => uri(`<svg xmlns="http://www.w3.org/2000/svg" width="42" height="17" viewBox="0 0 42 17"><g fill="none" stroke="${c}" stroke-width="1.5" stroke-linecap="round"><path d="M2 9 q4 -5 8 0 q4 -5 8 0"/><path d="M21 4 q3 -4 6 0 q3 -4 6 0"/><path d="M15 14 q2.5 -3 5 0 q2.5 -3 5 0"/></g></svg>`);
const TILES = {
  rain: tile(90, 120, 7, (R, add) => { for(let i = 0; i < 8; i++){ const l = 10 + R() * 10, x = 4 + R() * 82, y = R() * (118 - l); add(`<line x1="${x.toFixed(1)}" y1="${y.toFixed(1)}" x2="${(x - 2).toFixed(1)}" y2="${(y + l).toFixed(1)}" stroke="#cfe3ff" stroke-opacity="${(.25 + R() * .35).toFixed(2)}" stroke-width="1" stroke-linecap="round"/>`); } }),
  starsA: dots(9, 120, 120, 11, ["#ffffff", "#fff4d6", "#d6e4ff"], .5, 1.3, .5, .95),
  starsB: dots(9, 120, 120, 23, ["#ffffff", "#d6e4ff"], .4, 1.1, .4, .9),
  embers: dots(7, 100, 120, 31, ["#ffb35c", "#ffd27a", "#ff8a3d"], .7, 1.8, .55, .95),
  embersB: dots(6, 130, 120, 37, ["#ffd27a", "#ff9f4a"], .5, 1.3, .4, .85),
  ash: dots(8, 110, 120, 41, ["#d9d4c7", "#b9b2a3", "#ffffff"], .5, 1.2, .25, .55),
  dust: dots(8, 120, 120, 47, ["#ffe3b0", "#fff1d6"], .5, 1.1, .25, .6),
  bokeh: dots(4, 160, 160, 53, ["#ff8fb1", "#ffd9a8", "#ffb3c8"], 5, 14, .07, .16),
  confetti: tile(120, 120, 59, (R, add) => { const C = ["#e0a83f", "#ff7ab6", "#7fd4e0", "#a6f08f", "#ffffff", "#c8423b", "#2f9e5b"]; for(let i = 0; i < 9; i++){ const x = 6 + R() * 108, y = 6 + R() * 108; add(`<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="3" height="6" rx="1" fill="${C[i % C.length]}" fill-opacity=".85" transform="rotate(${Math.floor(R() * 180)} ${x.toFixed(1)} ${y.toFixed(1)})"/>`); } }),
  birds: birds("#1a0f12"),
  birdsL: birds("#d8f0df")
};
Object.keys(TILES).forEach(k => root.style.setProperty("--t-" + k, TILES[k]));

/* ---------- effetti di genere ---------- */
const OV = {
  giallo:'<i class="o-rain"></i><i class="o-light"></i>',
  romantico:'<i class="o-bokeh"></i><i class="o-heart" style="left:18%;animation-delay:-1s">♥</i><i class="o-heart" style="left:58%;animation-delay:-3.6s">♥</i><i class="o-heart" style="left:82%;animation-delay:-6s">♥</i>',
  fantascienza:'<i class="o-stars"></i><i class="o-stars b"></i><i class="o-shoot"></i>',
  avventura:'<i class="o-fly" style="left:16%;top:34%"></i><i class="o-fly" style="left:70%;top:58%;animation-delay:-2.4s,-1s"></i><i class="o-fly" style="left:44%;top:76%;animation-delay:-4.1s,-.4s"></i><i class="o-birds"></i>',
  fantasy:'<i class="o-embers"></i><i class="o-embers b"></i>',
  malavita:'<i class="o-blinds"></i><i class="o-smoke"></i><i class="o-smoke b"></i>',
  guerra:'<i class="o-flash"></i><i class="o-beam"></i><i class="o-beam b"></i><i class="o-ash"></i>',
  thriller:'<i class="o-scan"></i><i class="o-glitch"></i><i class="o-rec">● REC</i>',
  horror:'<i class="o-fog"></i><i class="o-fog b"></i><i class="o-pulse"></i>',
  commedia:'<i class="o-confetti"></i><i class="o-confetti b"></i>',
  drama:'<i class="o-beamw"></i><i class="o-dust"></i>',
  vita:'<i class="o-beamw"></i><i class="o-dust"></i><i class="o-birds"></i>',
  azione:'<i class="o-police"></i><i class="o-police b"></i><i class="o-neon"></i>'
};
function overlay(g){ const d = D.createElement("div"); d.className = "fxo"; d.innerHTML = OV[g] || OV.drama; return d; }

/* copertine vive: l'effetto esiste solo per le copertine visibili */
let coverIO = null;
const watched = new Set();
function liveCovers(scope){
  if(!scope || !("IntersectionObserver" in W)) return;
  watched.forEach(el => { if(!el.isConnected){ if(coverIO) coverIO.unobserve(el); watched.delete(el); } });
  if(low()) return;
  if(!coverIO) coverIO = new IntersectionObserver(ents => ents.forEach(en => {
    const el = en.target;
    if(en.isIntersecting && !low()){ if(!el._fx){ el._fx = overlay(el.dataset.fxg); el.appendChild(el._fx); } }
    else if(el._fx){ el._fx.remove(); el._fx = null; }
  }), { threshold:.2 });
  scope.querySelectorAll(".scard[data-g] .cv").forEach(cv => {
    if(watched.has(cv)) return;
    cv.dataset.fxg = cv.parentElement.dataset.g; watched.add(cv); coverIO.observe(cv);
  });
}
function decorate(host, g){
  if(!host) return;
  const old = host.querySelector(":scope > .fxo"); if(old) old.remove();
  if(low()) return;
  host.appendChild(overlay(g));
}

/* ---------- comparsa mentre scorri ---------- */
let revIO = null;
function reveal(els){
  if(low() || !("IntersectionObserver" in W)) return;
  if(!revIO) revIO = new IntersectionObserver(ents => ents.forEach(en => {
    if(!en.isIntersecting) return;
    const el = en.target; revIO.unobserve(el); el.classList.add("in");
    setTimeout(() => { el.classList.remove("rv", "in"); el.style.transitionDelay = ""; }, 1300);
  }), { threshold:.08 });
  els.forEach(el => { el.classList.add("rv"); revIO.observe(el); });
}

/* ---------- onda al tocco ---------- */
const RIP = ".btn,.gchip,.li,.go,.mcard,.qr button,.seg button,.gsel button,.reasons button,.ch,.story,.resume,.createcard,.drow button,.ico,.act,.scard,.feat,.bdg,.tab";
D.addEventListener("pointerdown", safe(e => {
  if(low()) return;
  let el = e.target.closest(RIP); if(!el) return;
  if(el.classList.contains("scard")) el = el.querySelector(".cv") || el;
  else if(el.classList.contains("feat")) el = el.querySelector(".img") || el;
  const r = el.getBoundingClientRect(), s = Math.max(r.width, r.height) * 2.2;
  const w = D.createElement("span"); w.className = "rip";
  w.style.width = w.style.height = s + "px";
  w.style.left = (e.clientX - r.left - s / 2) + "px"; w.style.top = (e.clientY - r.top - s / 2) + "px";
  el.appendChild(w); setTimeout(() => w.remove(), 650);
}), { passive:true });

/* ---------- livello di coriandoli e oggetti volanti ---------- */
function layer(){ let l = $("fxl"); if(!l){ l = D.createElement("div"); l.id = "fxl"; D.body.appendChild(l); } return l; }
function burst(x, y, o = {}){
  if(low() || !HAS_ANIM) return;
  const L = layer(), n = o.n || 18, cols = o.colors || ["#e0a83f", "#f3c873", "#2f9e5b", "#f2f2f2", "#c8423b"];
  for(let i = 0; i < n; i++){
    const p = D.createElement("i"); p.className = "bp";
    if(o.emoji){ p.classList.add("em"); p.textContent = o.emoji[i % o.emoji.length]; }
    else { p.style.background = cols[i % cols.length]; if(i % 3 === 0) p.style.borderRadius = "50%"; }
    p.style.left = (x - 4) + "px"; p.style.top = (y - 4) + "px"; L.appendChild(p);
    const a = rand(0, Math.PI * 2), sp = rand((o.spread || 120) * .45, o.spread || 120), dx = Math.cos(a) * sp, dy = Math.sin(a) * sp - rand(20, 60);
    const an = p.animate([
      { transform:"translate(0,0) scale(.4) rotate(0deg)", opacity:1 },
      { transform:`translate(${dx.toFixed(1)}px,${dy.toFixed(1)}px) scale(1) rotate(${rand(-200, 200).toFixed(0)}deg)`, opacity:1, offset:.6 },
      { transform:`translate(${(dx * 1.15).toFixed(1)}px,${(dy + 80).toFixed(1)}px) scale(.8) rotate(${rand(-320, 320).toFixed(0)}deg)`, opacity:0 }
    ], { duration:rand(850, 1250), easing:"cubic-bezier(.2,.7,.3,1)" });
    an.onfinish = () => p.remove();
  }
}
function burstEl(el, o){ if(!el) return; const r = el.getBoundingClientRect(); burst(r.left + r.width / 2, r.top + r.height / 2, o); }

/* ---------- apertura dell'app: libro che si apre ---------- */
function splash(){
  const s = $("splash"); if(!s || low()) return;
  const lines = (x0, x1) => [42, 52, 62, 72, 82].map(y => `<path d="M${x0} ${y} Q${(x0 + x1) / 2} ${y - 6} ${x1} ${y}"/>`).join("");
  const page = "M80 30 Q112 20 144 27 L144 96 Q112 89 80 99 Z";
  s.insertAdjacentHTML("afterbegin", `<div class="sp-rays"></div>
  <svg class="sp-book" viewBox="0 0 160 112" aria-hidden="true">
    <defs>
      <linearGradient id="bkp" x1="0" x2="1"><stop offset="0" stop-color="#fbf1dd"/><stop offset="1" stop-color="#e7d3a8"/></linearGradient>
      <linearGradient id="bkq" x1="1" x2="0"><stop offset="0" stop-color="#fbf1dd"/><stop offset="1" stop-color="#e7d3a8"/></linearGradient>
      <radialGradient id="bkg"><stop offset="0" stop-color="#f3c873" stop-opacity=".55"/><stop offset="1" stop-color="#f3c873" stop-opacity="0"/></radialGradient>
    </defs>
    <ellipse class="bk-glow" cx="80" cy="62" rx="80" ry="50" fill="url(#bkg)"/>
    <path d="M80 33 Q46 22 12 29 L12 100 Q46 93 80 103 Z" fill="#8e2a22"/><path d="M80 33 Q114 22 148 29 L148 100 Q114 93 80 103 Z" fill="#7a221c"/>
    <path d="M80 30 Q48 20 16 27 L16 96 Q48 89 80 99 Z" fill="url(#bkq)"/><path d="${page}" fill="url(#bkp)"/>
    <g stroke="#c9ad7c" stroke-width="1.2" stroke-linecap="round" fill="none" opacity=".75">${lines(88, 134)}</g>
    <path class="bk-page p1" d="${page}" fill="#fdf6e8"/><path class="bk-page p2" d="${page}" fill="#fbf2df"/><path class="bk-page p3" d="${page}" fill="#fdf6e8"/>
    <g stroke="#c9ad7c" stroke-width="1.2" stroke-linecap="round" fill="none" opacity=".75">${lines(26, 72)}</g>
    <path d="M80 30 L80 99" stroke="#b9945c" stroke-width="1"/>
    <g class="bk-rib"><rect x="104" y="95" width="3" height="15" fill="#2f9e5b"/><rect x="107" y="95" width="3" height="15" fill="#f2f2f2"/><rect x="110" y="95" width="3" height="15" fill="#c8423b"/><polygon points="104,110 113,110 108.5,106" fill="#0d0d11"/></g>
    <circle class="bk-sp" cx="60" cy="22" r="1.6" fill="#ffe7a6" style="animation-delay:.9s"/><circle class="bk-sp" cx="96" cy="16" r="1.2" fill="#fff" style="animation-delay:1.2s"/>
    <circle class="bk-sp" cx="118" cy="24" r="1.8" fill="#ffd27a" style="animation-delay:1.45s"/><circle class="bk-sp" cx="40" cy="30" r="1.1" fill="#fff" style="animation-delay:1.7s"/>
  </svg>`);
  const logo = s.querySelector(".sp-logo");
  if(logo && logo.firstChild && logo.firstChild.nodeType === 3){
    const txt = logo.firstChild.textContent; let k = 0;
    logo.firstChild.replaceWith(...[...txt].map(ch => { const i = D.createElement("i"); i.className = "l"; i.textContent = ch === " " ? " " : ch; i.style.animationDelay = (.55 + (k++) * .045).toFixed(3) + "s"; return i; }));
  }
}

/* ---------- barra in basso ---------- */
function tabInd(){
  const nav = $("tabs"); if(!nav) return;
  let ind = nav.querySelector(".tab-ind");
  if(!ind){ ind = D.createElement("span"); ind.className = "tab-ind"; nav.appendChild(ind); }
  const on = nav.querySelector(".tab.on"); if(!on || !on.offsetWidth) return;
  ind.style.transform = `translateX(${on.offsetLeft + (on.offsetWidth - 54) / 2}px)`;
}

/* ---------- interruttori a pillola che scivola ---------- */
function seg(id){
  const s = $(id); if(!s) return;
  let th = s.querySelector(".thumb");
  if(!th){ th = D.createElement("i"); th.className = "thumb"; s.insertBefore(th, s.firstChild); s.classList.add("has-thumb"); }
  const on = s.querySelector("button.on");
  if(!on || !on.offsetWidth){ th.style.opacity = 0; return; }
  th.style.opacity = 1; th.style.width = on.offsetWidth + "px"; th.style.transform = `translateX(${on.offsetLeft}px)`;
}

/* ---------- cielo della home ---------- */
let heroDone = false;
function heroInit(){
  if(heroDone) return; heroDone = true;
  const hero = D.querySelector(".hero"); if(!hero) return;
  const fx = D.createElement("div"); fx.className = "hfx";
  fx.innerHTML = '<i class="h-stars"></i><i class="h-stars b"></i><i class="h-halo"></i><i class="h-cloud c1"></i><i class="h-cloud c2"></i><i class="h-shoot"></i><i class="h-birds"></i>';
  const grad = hero.querySelector(".grad"); hero.insertBefore(fx, grad || null);
  parallax($("homeScroll"), hero, "--hy", 300);
}
function parallax(scroller, target, prop, max){
  if(!scroller || !target) return;
  let raf = 0;
  scroller.addEventListener("scroll", () => {
    if(raf || low()) return;
    raf = requestAnimationFrame(() => { raf = 0; target.style.setProperty(prop, Math.min(scroller.scrollTop, max).toFixed(0)); });
  }, { passive:true });
}

/* ---------- passaggio dalla copertina alla scheda ---------- */
function zoomFrom(el){
  if(low() || !HAS_ANIM || !el) return;
  const cv = el.querySelector(".cv, .img") || el, svg = cv.querySelector("svg"); if(!svg) return;
  const r = cv.getBoundingClientRect(), app = (D.querySelector(".app") || D.body).getBoundingClientRect();
  if(r.width < 20 || r.bottom < 0 || r.top > innerHeight) return;
  const g = D.createElement("div"); g.className = "zoomghost"; g.innerHTML = svg.outerHTML;
  D.body.appendChild(g);
  const rad = getComputedStyle(cv).borderTopLeftRadius || "16px";
  const a = g.animate([
    { left:r.left + "px", top:r.top + "px", width:r.width + "px", height:r.height + "px", borderRadius:rad },
    { left:app.left + "px", top:"0px", width:app.width + "px", height:"290px", borderRadius:"0px" }
  ], { duration:430, easing:"cubic-bezier(.2,.8,.2,1)", fill:"forwards" });
  a.onfinish = () => { const b = g.animate([{ opacity:1 }, { opacity:0 }], { duration:260, fill:"forwards" }); b.onfinish = () => g.remove(); };
  setTimeout(() => g.remove(), 1500);
}

/* ---------- titolo di apertura del capitolo ---------- */
function words(t, d0, step){ let k = 0; return esc(t).split(/\s+/).map(w => `<span class="w" style="animation-delay:${(d0 + (k++) * step).toFixed(2)}s">${w}</span>`).join(" "); }
function titleCard(o){
  return new Promise(res => {
    if(low()){ res(); return; }
    const old = $("tcard"); if(old) old.remove();
    const t = D.createElement("div"); t.id = "tcard"; if(o.short) t.className = "short";
    t.style.setProperty("--tc-a", o.accent || "#e0a83f");
    t.innerHTML = `<div class="tc-bg">${String(o.cover || "").replace(/<text[\s\S]*?<\/text>/g, "")}</div><div class="tc-shade"></div><div class="tc-bar t"></div><div class="tc-bar b"></div>
      <div class="tc-in"><div class="tc-emo">${esc(o.emoji)}</div><div class="tc-cap">${esc(o.cap)}</div><h2 class="tc-title">${words(o.title, o.short ? .25 : .85, .09)}</h2><i class="tc-line"></i>
      <div class="tc-meta">${esc(o.meta)}</div>${o.you ? `<div class="tc-you">${esc(o.you)}</div>` : ""}</div>${o.short ? "" : '<div class="tc-skip">Tocca per continuare</div>'}`;
    D.body.appendChild(t);
    let done = false;
    const end = () => { if(done) return; done = true; t.classList.add("out"); setTimeout(() => { t.remove(); res(); }, 480); };
    t.addEventListener("click", end);
    t._end = end;
    setTimeout(end, o.short ? 1500 : 3400);
  });
}

/* ---------- chat ---------- */
function ambient(g, col){
  const a = $("amb"); if(!a) return;
  a.innerHTML = "";
  a.style.background = col ? `radial-gradient(130% 55% at 50% 0%, ${col}aa, transparent 72%)` : "";
  if(!low()) a.appendChild(overlay(g));
}
function inkReveal(el){
  if(!el || low()) return;
  el.classList.add("ink");
  const stop = () => el.classList.remove("ink");
  el.addEventListener("animationend", stop, { once:true });
  el.addEventListener("click", stop, { once:true });
}
let toEndInit = false;
function toEnd(){
  if(toEndInit) return; toEndInit = true;
  const log = $("log"), b = $("toEnd"); if(!log || !b) return;
  let raf = 0;
  log.addEventListener("scroll", () => {
    if(raf) return;
    raf = requestAnimationFrame(() => { raf = 0; b.classList.toggle("on", log.scrollHeight - log.scrollTop - log.clientHeight > 280); });
  }, { passive:true });
  b.addEventListener("click", () => { log.scrollTo({ top:log.scrollHeight, behavior:low() ? "auto" : "smooth" }); });
}
function plane(){
  if(low() || !HAS_ANIM) return;
  const b = $("sendBtn"); if(!b) return;
  const r = b.getBoundingClientRect(), p = D.createElement("div"); p.className = "plane";
  p.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="#f3c873"><path d="M3 20l18-8L3 4v6l12 2-12 2z"/></svg>';
  p.style.left = (r.left + r.width / 2 - 10) + "px"; p.style.top = (r.top + r.height / 2 - 10) + "px"; layer().appendChild(p);
  p.animate([
    { transform:"translate(0,0) rotate(0deg) scale(1)", opacity:1 },
    { transform:"translate(-36px,-58px) rotate(-28deg) scale(1.15)", opacity:1, offset:.45 },
    { transform:"translate(-150px,-230px) rotate(-38deg) scale(.4)", opacity:0 }
  ], { duration:720, easing:"cubic-bezier(.3,.6,.3,1)" }).onfinish = () => p.remove();
  b.animate([{ transform:"scale(1)" }, { transform:"scale(.8)" }, { transform:"scale(1.1)" }, { transform:"scale(1)" }], { duration:460 });
}

/* ---------- traguardi ---------- */
const BADGES = [
  { id:"prima",  e:"📖", n:"Prima pagina",  d:"Inizia la tua prima storia.",             k:"stories", v:1 },
  { id:"esplo",  e:"🗺️", n:"Esploratore",   d:"Inizia 5 storie diverse.",                k:"stories", v:5 },
  { id:"generi", e:"🧭", n:"Giramondo",     d:"Gioca storie di 5 generi diversi.",       k:"genres",  v:5 },
  { id:"citta",  e:"🇮🇹", n:"Giro d'Italia", d:"Gioca storie in 10 luoghi diversi.",      k:"cities",  v:10 },
  { id:"chiac",  e:"💬", n:"Chiacchierone", d:"Arriva a 100 messaggi in tutte le storie.", k:"msgs",    v:100 },
  { id:"mara",   e:"🏃", n:"Maratoneta",    d:"Arriva a 60 messaggi in una sola storia.", k:"longest", v:60 },
  { id:"detec",  e:"🔍", n:"Detective",     d:"Scopri 10 indizi con la memoria dell'AI.", k:"clues",   v:10 },
  { id:"autore", e:"✍️", n:"Autore",        d:"Crea una storia tutta tua.",              k:"created", v:1 }
];
const BK = "si2:badges";
function unlocked(){ try{ return JSON.parse(localStorage.getItem(BK) || "[]"); }catch(e){ return []; } }
function check(st, silent){
  if(!st) return [];
  const have = unlocked(), fresh = BADGES.filter(b => (st[b.k] || 0) >= b.v && !have.includes(b.id)).map(b => b.id);
  if(fresh.length){
    try{ localStorage.setItem(BK, JSON.stringify(have.concat(fresh))); }catch(e){}
    if(!silent){
      const b = BADGES.find(z => z.id === fresh[0]);
      if(W.__toast) W.__toast(`🏅 Traguardo sbloccato: ${b.n}${fresh.length > 1 ? ` (e altri ${fresh.length - 1})` : ""}`);
      burst(innerWidth / 2, 70, { n:24 });
    }
  }
  return fresh;
}
function badges(st){
  const box = $("badges"); if(!box || !st) return;
  const fresh = check(st, true), have = unlocked();
  box.innerHTML = BADGES.map((b, i) => {
    const ok = have.includes(b.id), cur = Math.min(st[b.k] || 0, b.v);
    return `<div class="bdg ${ok ? "ok" : ""} ${fresh.includes(b.id) ? "new" : ""}" style="animation-delay:${(i * .05).toFixed(2)}s" data-bdg="${b.id}"><div class="md"><span>${b.e}</span>${ok ? "" : "<em>🔒</em>"}</div><b>${b.n}</b><small>${ok ? "Sbloccato" : cur + " / " + b.v}</small>${ok ? "" : `<i class="pb"><i style="width:${Math.round(cur / b.v * 100)}%"></i></i>`}</div>`;
  }).join("");
  const c = $("bdgCount"); if(c) c.textContent = have.length + " / " + BADGES.length;
  if(fresh.length) setTimeout(() => burstEl(box.querySelector(".bdg.new"), { n:20 }), 500);
  box.onclick = e => { const el = e.target.closest("[data-bdg]"); if(!el) return; const b = BADGES.find(z => z.id === el.dataset.bdg); if(b && W.__toast) W.__toast(`${b.e} ${b.n}: ${b.d}`); };
}

/* ---------- cervello dell'AI ---------- */
function brainInit(){
  const b = D.querySelector(".brain"); if(!b || b.querySelector(".orb")) return;
  b.insertAdjacentHTML("afterbegin", '<span class="orb"><i></i></span><span class="orb b"><i></i></span>');
}

/* ---------- API usata dal motore ---------- */
let lastTyping = 0, lastExGenre = null;
D.addEventListener("input", e => { if(e.target && e.target.id === "q") lastTyping = Date.now(); }, true);
D.addEventListener("visibilitychange", () => D.body.classList.toggle("paused", D.hidden));
W.addEventListener("resize", () => { tabInd(); seg("sexSeg"); seg("persSeg"); });

W.FX = {
  setLevel: safe(v => {
    level = v === "low" ? "low" : "full";
    D.body.classList.toggle("fx-low", low());
    if(low()){ D.querySelectorAll(".fxo").forEach(o => o.remove()); watched.forEach(el => el._fx = null); }
    else { heroInit(); liveCovers(D); }
  }),
  onShow: safe(v => {
    tabInd();
    if(v !== "chat"){ const t = $("tcard"); if(t && t._end) t._end(); }
    if(v === "setup") brainInit();
  }),
  onHome: safe(() => {
    heroInit();
    const body = $("homeBody"); if(!body) return;
    setTimeout(() => {
      if(!body.isConnected) return;
      const items = [];
      body.querySelectorAll(":scope > .sec").forEach(sec => {
        if(sec.querySelector(".rowx")){
          const h = sec.querySelector(".sec-h"); if(h) items.push(h);
          sec.querySelectorAll(".scard").forEach((c, i) => { c.style.transitionDelay = Math.min(i, 5) * 70 + "ms"; items.push(c); });
        } else items.push(sec);
      });
      reveal(items);
      liveCovers(body);
      const f = body.querySelector(".feat"); if(f) decorate(f.querySelector(".img"), f.dataset.g);
    }, splashLeft());
  }),
  onGrid: safe(() => {
    const g = $("exGrid"); if(!g) return;
    const typing = Date.now() - lastTyping < 600;
    const chip = D.querySelector("#exChips .gchip.on"), key = chip ? chip.dataset.exg : "";
    if(!typing && !low()){
      g.querySelectorAll(".scard").forEach((c, i) => { if(i < 10){ c.classList.add("pop"); c.style.animationDelay = (i * .045).toFixed(3) + "s"; } });
      if(key !== lastExGenre){ const n = $("exCount"); if(n){ n.classList.remove("bump"); void n.offsetWidth; n.classList.add("bump"); } }
    }
    lastExGenre = key;
    liveCovers(g);
  }),
  onDetail: safe(s => {
    const t = $("dTitle");
    if(t && !low()) t.innerHTML = words(t.textContent, .12, .07);
    const art = $("dArt"); decorate(art, s && s.g);
    const top = D.querySelector("#v-detail .dtop"), sc = D.querySelector("#v-detail .scroll");
    if(top){ top.style.setProperty("--sy", 0); if(!top._px){ top._px = 1; parallax(sc, top, "--sy", 290); } }
    requestAnimationFrame(() => requestAnimationFrame(() => { seg("sexSeg"); seg("persSeg"); }));
  }),
  seg: safe(id => seg(id)),
  zoomFrom: safe(zoomFrom),
  enterChat: safe((s, x, g, isNew, extra) => {
    toEnd();
    ambient(s.g, g && g.c1);
    const o = extra || {}, name = x.name || "", m = x.sex === "m";
    if(isNew){
      titleCard({ emoji:s.e || (g && g.e) || "📖", cap:"Capitolo I", title:o.title || s.t, meta:o.meta || [s.city, s.era || "Oggi"].filter(Boolean).join(" · "),
                  you:"Tu sei " + name, accent:g && g.a, cover:o.cover }).then(() => {
        const first = D.querySelector("#log .row-ai .msg.ai");
        if(first && !first.querySelector(".typing")) inkReveal(first);
      });
    } else {
      titleCard({ short:true, emoji:s.e || "📖", cap:(m ? "Bentornato, " : "Bentornata, ") + name, title:o.title || s.t,
                  meta:m ? "Riprendi da dove eri rimasto" : "Riprendi da dove eri rimasta", accent:g && g.a, cover:o.cover });
    }
  }),
  sent: safe(plane),
  memory: safe(clue => {
    const b = $("memBtn"); if(!b) return;
    b.classList.remove("memglow"); void b.offsetWidth; b.classList.add("memglow");
    burstEl(b, { n:clue ? 14 : 9, emoji:clue ? ["🔍", "✨", "🗝️"] : ["✨", "💭"], spread:80 });
  }),
  burstEl: safe(burstEl),
  burstCenter: safe(() => burst(innerWidth / 2, innerHeight / 2.4, { n:32, spread:170 })),
  collapse: safe((el, done) => {
    if(!el || low() || !HAS_ANIM){ done(); return; }
    const h = el.offsetHeight;
    const a = el.animate([{ opacity:1, transform:"none", height:h + "px", marginBottom:"10px" }, { opacity:0, transform:"translateX(-40px)", height:h + "px", marginBottom:"10px", offset:.55 }, { opacity:0, transform:"translateX(-40px)", height:"0px", marginBottom:"0px", paddingTop:"0px", paddingBottom:"0px" }], { duration:480, easing:"cubic-bezier(.4,0,.2,1)", fill:"forwards" });
    a.onfinish = done;
  }),
  check: safe(st => check(st, false)),
  badges: safe(badges),
  typing: safe(on => { const a = $("cAv"); if(a) a.classList.toggle("talk", !!on); })
};

const appBox = D.querySelector(".app");
if(appBox) appBox.addEventListener("scroll", () => { if(appBox.scrollLeft || appBox.scrollTop){ appBox.scrollLeft = 0; appBox.scrollTop = 0; } }, { passive:true });
splash();
D.body.classList.toggle("fx-low", low());
requestAnimationFrame(tabInd);
})();
