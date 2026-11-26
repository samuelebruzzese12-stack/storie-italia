/* Storie d'Italia – la scena in chat.
   - Quando la storia nomina i luoghi o i punti di accesso, sotto il messaggio compare la planimetria
     (planimetrie.js) con i luoghi in evidenza, «tu sei qui» e i personaggi visti nei luoghi.
   - Toccandola si apre a tutto schermo: si ingrandisce con due dita, si tocca un luogo per andarci.
   - I testi scritti che la storia fa leggere (biglietti, lettere, messaggi, telegrammi, giornali,
     referti, cartelli, schermi) diventano fogli veri invece che righe di testo. */
(function(W){
  "use strict";
  const D = document, PV = W.PIANTE, $ = id => D.getElementById(id);
  const esc = t => String(t).replace(/[&<>"]/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;" }[c]));
  const clamp = (v, a, b) => v < a ? a : v > b ? b : v;
  // agganci dati da index.html: la partita aperta, come si manda un messaggio, i colori dei personaggi…
  let H = { st:() => null, story:() => null, invia:() => {}, scrivi:() => {}, occupato:() => false, attive:() => true, colori:["#e9b65a"], toast:() => {}, indietro:() => {} };
  const iniziale = n => { const p = String(n || "?").replace(/^(il|lo|la|l'|i|gli|le|'o|'u|'a|er|zi'|zu'|don|donna|mr\.?|sig\.?ra|sor[ao]?|nonn[ao]|mamma|papà|zi[ao]|padre|suor|fra|frate|mastro|duca)\s+/i, "").trim(); return (p[0] || "?").toUpperCase(); };
  const pedine = (s, pers) => Object.keys(pers || {}).map(i => ({ p:pers[i].p, s:iniziale((s.chars[i] || {}).n), c:H.colori[i % H.colori.length], i:+i, n:(s.chars[i] || {}).n }));

  /* ======================================================================
     LA SCHEDA IN CHAT
     ====================================================================== */
  const QUANTE_APERTE = 2;
  function livelliDi(m, tav, ids, tutto){
    if(tav.tipo !== "pianta" || tutto || tav.liv.length <= 3) return null;
    const L = [...new Set(ids.map(id => { const l = m.perId[id]; return l && l.ti === tav.i ? l.li : -1; }).filter(n => n >= 0))].sort((a, b) => a - b);
    return L.length && L.length < tav.liv.length ? L.slice(0, 3) : null;
  }
  // quale tavola mostrare: quella dei luoghi nominati; per gli accessi contano di più le vie di entrata e il posto dove sei
  function tavolaPer(m, ids, accessi, qui){
    const conta = m.tav.map(() => 0);
    ids.forEach(id => { const l = m.perId[id]; if(l) conta[l.ti] += 1 + (accessi && l.acc ? 1 : 0); });
    if(accessi && !ids.some(id => m.perId[id] && m.perId[id].acc)) m.accessi.forEach(l => { conta[l.ti] += .5; });
    if(qui && m.perId[qui]) conta[m.perId[qui].ti] += accessi ? 1.5 : .6;
    let best = 0; conta.forEach((n, i) => { if(n > conta[best]) best = i; });
    return best;
  }
  function riempi(el, x, s, stt, i, aperta, nuova){
    const m = stt.m, info = stt.msg[i]; if(!info) return;
    const ids = info.luoghi.slice(), acc = info.carta === "accessi";
    const fuoco = ids.concat(info.qui && !ids.length ? [info.qui] : []);
    // se sei dentro l'edificio, nominare l'edificio («il Bar Ferrante») vale per la sua pianta, non per la mappa della città
    const dentro = m.dentro && info.qui && m.perId[info.qui] && m.perId[info.qui].ti === m.perId[m.dentro].ti;
    const ti = tavolaPer(m, fuoco.map(id => dentro && m.perId[id] && m.perId[id].edificio ? m.dentro : id), acc, info.qui), tav = m.tav[ti];
    const nomi = ids.map(id => m.perId[id].n.split(" · ")[0]).slice(0, 3).join(", ");
    const sotto = acc ? "Vie di entrata e di uscita" : nomi || (info.qui ? "Tu sei qui" : m.t);
    el.className = "pmap" + (aperta ? " aperta" : " chiusa") + (nuova ? " nuova" : "");
    el.dataset.pv = i; el.dataset.ti = ti;
    if(!aperta){ el.innerHTML = `<div class="pmap-h"><span class="pmap-i">📍</span><b>Planimetria</b><span class="pmap-s">${esc(sotto)}</span><span class="pmap-x">Apri</span></div>`; return; }
    const r = PV.svg(m, ti, { evid:ids, tu:info.qui, pers:pedine(s, info.pers), accessi:acc, livelli:livelliDi(m, tav, fuoco.concat(info.qui ? [info.qui] : []), acc), anim:!!nuova });
    let piede = "";
    if(acc) piede = m.accessi.map(l => `<span class="pmap-a"><i>A${l.an}</i>${esc(l.acc)}</span>`).join("");
    else piede = ids.slice(0, 4).map(id => `<span class="pmap-l${info.nuovi.includes(id) ? " nu" : ""}">${esc(m.perId[id].n.split(" · ")[0])}${info.nuovi.includes(id) && !m.perId[id].livello ? "<i>nuovo</i>" : ""}</span>`).join("");
    el.innerHTML = `<div class="pmap-h"><span class="pmap-i">📍</span><b>${acc ? "Punti di accesso" : "Planimetria"}</b><span class="pmap-s">${esc(m.t)}</span><span class="pmap-x">Ingrandisci ⤢</span></div><div class="pmap-m" style="background:${r.stile.c}">${r.html}</div>${piede ? `<div class="pmap-f">${piede}</div>` : ""}`;
  }
  // chiamata per ogni risposta della storia: aggiunge la scheda e i segnaposto dei luoghi
  function decora(row, i){
    try{
      const x = H.st(); if(!x || !PV || i < 0 || !H.attive()) return;
      const s = H.story(x.sid), stt = PV.stato(x, s); if(!stt) return;
      const info = stt.msg[i]; if(!info) return;
      const col = row.querySelector(".col"), acts = row.querySelector(".macts"); if(!col) return;
      if(info.carta){
        const carte = Object.keys(stt.msg).map(Number).filter(k => stt.msg[k].carta).sort((a, b) => a - b);
        const aperta = carte.indexOf(i) >= carte.length - QUANTE_APERTE, ultima = i === x.messages.length - 1;
        const el = D.createElement("div");
        riempi(el, x, s, stt, i, aperta, ultima && !row.classList.contains("vecchia"));
        col.insertBefore(el, acts || null);
        if(ultima){ const log = $("log"); if(log){ const ap = [...log.querySelectorAll(".pmap.aperta")]; ap.slice(0, Math.max(0, ap.length - QUANTE_APERTE + (el.isConnected ? 0 : 1))).forEach(o => { if(o !== el) riempi(o, x, s, stt, +o.dataset.pv, false, false); }); } }
      }
      if(acts && info.luoghi.length){
        const m = stt.m;
        info.luoghi.filter(id => !m.perId[id].livello).slice(0, 2).forEach(id => { const b = D.createElement("button"); b.className = "plc"; b.dataset.pl = id; b.textContent = "📍 " + m.perId[id].n.split(" · ")[0]; acts.insertBefore(b, acts.querySelector(".flagb")); });
      }
    }catch(e){ try{ console.warn("scena", e && e.message); }catch(e2){} }
  }
  D.addEventListener("click", e => {
    const c = e.target.closest && e.target.closest(".pmap");
    if(c){ const x = H.st(); if(!x) return; const stt = PV.stato(x, H.story(x.sid)), info = stt && stt.msg[+c.dataset.pv]; apri(info ? { evid:info.luoghi, accessi:info.carta === "accessi", ti:c.dataset.ti != null ? +c.dataset.ti : null } : {}); return; }
    const p = e.target.closest && e.target.closest(".plc");
    if(p) apri({ sel:p.dataset.pl });
  });

  /* ======================================================================
     IL VISORE A TUTTO SCHERMO
     ====================================================================== */
  let V = null;   // { m, s, x, stt, ti, sel, evid, accessi }
  let Z = { k:1, tx:0, ty:0 };
  function costruisci(){
    if($("pv")) return;
    const el = D.createElement("div");
    el.className = "pv"; el.id = "pv"; el.setAttribute("role", "dialog"); el.setAttribute("aria-label", "Planimetria della storia");
    el.innerHTML = `<div class="pv-bar"><button class="ico" id="pvX" aria-label="Chiudi"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M15 18l-6-6 6-6"/></svg></button><div class="who"><b id="pvT">Planimetria</b><span id="pvS"></span></div><button class="pv-acc" id="pvAcc">Accessi</button></div>
      <div class="pv-tabs" id="pvTabs"></div>
      <div class="pv-map" id="pvMap"><div class="pv-in" id="pvIn"></div><div class="pv-zoom"><button id="pvPiu" aria-label="Ingrandisci">+</button><button id="pvMeno" aria-label="Rimpicciolisci">−</button></div><div class="pv-hint" id="pvHint">Due dita per ingrandire · tocca un luogo</div></div>
      <div class="pv-info" id="pvInfo"></div>`;
    (D.querySelector(".app") || D.body).appendChild(el);
    $("pvX").onclick = chiudi;
    $("pvAcc").onclick = () => { V.accessi = !V.accessi; disegna(); };
    $("pvPiu").onclick = () => zoomA(Z.k * 1.5);
    $("pvMeno").onclick = () => zoomA(Z.k / 1.5);
    $("pvTabs").onclick = e => { const b = e.target.closest("[data-ti]"); if(!b) return; V.ti = +b.dataset.ti; V.sel = null; Z = { k:1, tx:0, ty:0 }; disegna(); inquadra(); };
    $("pvInfo").onclick = suInfo;
    gesti($("pvMap"), $("pvIn"));
  }
  const aperto = () => { const e = $("pv"); return !!(e && e.classList.contains("on")); };
  function apri(o){
    o = o || {};
    const x = H.st(); if(!x || !PV) return;
    const s = H.story(x.sid), stt = PV.stato(x, s);
    if(!stt){ H.toast("Questa storia non ha ancora una planimetria."); return; }
    costruisci();
    const m = stt.m, ult = Object.keys(stt.msg).map(Number).sort((a, b) => b - a)[0], ultimo = ult != null ? stt.msg[ult] : null;
    const evid = o.evid || (ultimo ? ultimo.luoghi : []);
    // si apre sulla tavola della scheda toccata; dal pulsante in alto, su quella dove ti trovi
    const perno = o.sel || (o.evid ? evid[0] : null) || stt.qui || evid[0];
    V = { m, s, x, stt, sel:o.sel || null, evid, accessi:!!o.accessi, ti:o.ti != null && m.tav[o.ti] ? o.ti : perno && m.perId[perno] ? m.perId[perno].ti : 0 };
    Z = { k:1, tx:0, ty:0 };
    $("pv").classList.add("on");
    disegna(); inquadra();
    H.indietro();
    PV.pronto().then(() => { if(aperto()) disegna(); });
    setTimeout(() => { const h = $("pvHint"); if(h) h.classList.add("via"); }, 3200);
  }
  function chiudi(){ const e = $("pv"); if(e) e.classList.remove("on"); V = null; H.indietro(); }
  function disegna(){
    if(!V) return;
    const m = V.m, tav = m.tav[V.ti], stt = V.stt;
    $("pvT").textContent = m.t || "Planimetria";
    $("pvS").textContent = (tav.n || "") + " · " + Object.keys(stt.visti).filter(id => !m.perId[id].livello).length + " luoghi su " + m.luoghi.length + " scoperti";
    $("pvAcc").classList.toggle("on", V.accessi); $("pvAcc").style.display = m.accessi.length ? "" : "none";
    $("pvTabs").innerHTML = m.tav.length > 1 ? m.tav.map((t, i) => `<button data-ti="${i}" class="${i === V.ti ? "on" : ""}">${esc(t.n || "Tavola " + (i + 1))}</button>`).join("") : "";
    $("pvTabs").style.display = m.tav.length > 1 ? "" : "none";
    const r = PV.svg(m, V.ti, { evid:V.sel ? [V.sel] : V.evid, tu:stt.qui, pers:pedine(V.s, stt.pers), accessi:V.accessi, anim:true, grande:true });
    V.pos = r.pos;
    $("pvMap").style.background = r.stile.c2;
    $("pvIn").innerHTML = r.html;
    applica();
    info();
  }
  function info(){
    const m = V.m, stt = V.stt, s = V.s, P = pedine(s, stt.pers);
    let h = "";
    if(V.sel && m.perId[V.sel]){
      const l = m.perId[V.sel], art = PV.articoli(l), qui = P.filter(q => q.p === l.id);
      const dove = l.lv ? l.lv.n : (m.tav[l.ti].n || "");
      h += `<div class="pv-sel"><div class="pv-sel-h"><span class="pv-ic">${icona(l.ic)}</span><div><b>${esc(l.n)}</b><span>${esc(dove)}${l.chiuso ? " · chiuso al pubblico" : ""}${l.acc ? " · via di entrata" : ""}${stt.qui === l.id ? " · tu sei qui" : ""}</span></div><button class="pv-no" data-a="no" aria-label="Chiudi">✕</button></div>
        ${l.d ? `<p>${esc(l.d)}</p>` : ""}${l.acc && l.acc !== l.n ? `<p class="pv-acn">▲ ${esc(l.acc)}</p>` : ""}
        ${qui.length ? `<div class="pv-chi">${qui.map(q => `<span><i style="background:${q.c}">${esc(q.s)}</i>${esc(q.n)}</span>`).join("")}<em>visti qui l'ultima volta</em></div>` : ""}
        <div class="pv-btn"><button class="pv-b oro" data-a="vai">🚶 Vai qui</button><button class="pv-b" data-a="oss">👁 Osserva</button><button class="pv-b" data-a="scr">✍️ Scrivi tu</button></div></div>`;
      $("pvInfo").innerHTML = h; $("pvInfo").scrollTop = 0;
      return;
    }
    const qui = stt.qui && m.perId[stt.qui];
    h += `<div class="pv-qui" data-p="${qui ? qui.id : ""}"><i></i><div><b>${qui ? "Tu sei qui: " + esc(qui.n.split(" · ")[0]) : "Non si sa ancora dove sei"}</b><span>${qui ? esc(qui.lv ? qui.lv.n : qui.livello ? "" : (m.tav[qui.ti].n || "")) : "Tocca un luogo e scegli «Vai qui»"}</span></div></div>`;
    if(m.accessi.length) h += `<h5>Vie di entrata e di uscita</h5><div class="pv-chips">${m.accessi.map(l => `<button data-p="${l.id}"><i>A${l.an}</i>${esc(l.acc)}</button>`).join("")}</div>`;
    if(P.length) h += `<h5>Personaggi visti</h5><div class="pv-pers">${P.map(q => `<button data-p="${q.p}"><i style="background:${q.c}">${esc(q.s)}</i><b>${esc(q.n)}</b><span>${esc(m.perId[q.p].n.split(" · ")[0])}</span></button>`).join("")}</div>`;
    h += `<h5>Luoghi</h5>`;
    m.tav.forEach((tav, ti) => {
      const gruppi = tav.tipo === "pianta" ? tav.liv.map(lv => [lv.n, lv.st]) : [[m.tav.length > 1 ? tav.n : "", tav.luoghi]];
      gruppi.forEach(([nome, L]) => { h += (nome ? `<div class="pv-gr">${esc(nome)}</div>` : "") + `<div class="pv-list">${L.map(l => `<button data-p="${l.id}" class="${stt.visti[l.id] != null ? "ok" : ""}"><em>${l.num}</em>${esc(l.n)}${l.chiuso ? " 🔒" : ""}</button>`).join("")}</div>`; });
    });
    $("pvInfo").innerHTML = h;
  }
  const icona = n => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="${PV.IC[n] || PV.IC.punto}"/></svg>`;
  function scegli(id){
    if(!V || !V.m.perId[id] || V.m.perId[id].livello) return;
    const l = V.m.perId[id];
    V.sel = id;
    if(l.ti !== V.ti){ V.ti = l.ti; Z = { k:1, tx:0, ty:0 }; }
    disegna();
    centra(id);
  }
  function suInfo(e){
    const a = e.target.closest("[data-a]");
    if(a && V && V.sel){
      const l = V.m.perId[V.sel], art = PV.articoli(l), az = a.dataset.a;
      if(az === "no"){ V.sel = null; disegna(); return; }
      if(az === "scr"){ chiudi(); H.scrivi("*Vado " + art.a + "* "); return; }
      if(H.occupato()){ H.toast("Aspetta che la storia finisca di scrivere."); return; }
      const t = az === "vai" ? "*Vado " + art.a + ".*" : "*Osservo con attenzione " + art.il + ".*";
      chiudi(); H.invia(t);
      return;
    }
    const p = e.target.closest("[data-p]");
    if(p && p.dataset.p) scegli(p.dataset.p);
  }
  /* --- ingrandire e spostare con le dita --- */
  function applica(){
    const box = $("pvMap"), inn = $("pvIn"); if(!box || !inn) return;
    const bw = box.clientWidth, bh = box.clientHeight, iw = inn.offsetWidth * Z.k, ih = inn.offsetHeight * Z.k;
    Z.tx = iw <= bw ? (bw - iw) / 2 : clamp(Z.tx, bw - iw, 0);
    Z.ty = ih <= bh ? (bh - ih) / 2 : clamp(Z.ty, bh - ih, 0);
    inn.style.transform = `translate(${Z.tx.toFixed(1)}px,${Z.ty.toFixed(1)}px) scale(${Z.k.toFixed(3)})`;
  }
  function zoomA(k, cx, cy){
    const box = $("pvMap"); if(!box) return;
    k = clamp(k, 1, 4.5);
    if(cx == null){ cx = box.clientWidth / 2; cy = box.clientHeight / 2; }
    const px = (cx - Z.tx) / Z.k, py = (cy - Z.ty) / Z.k;
    Z.k = k; Z.tx = cx - px * k; Z.ty = cy - py * k;
    $("pvIn").classList.add("morbido"); applica(); setTimeout(() => { const i = $("pvIn"); if(i) i.classList.remove("morbido"); }, 260);
  }
  // all'apertura: se la tavola è più alta dello schermo, si parte dal punto che interessa (dove sei, o il luogo acceso)
  function inquadra(){
    if(!V) return;
    const m = V.m, qui = V.stt.qui && m.perId[V.stt.qui];
    const su = id => id && m.perId[id] && !m.perId[id].livello && m.perId[id].ti === V.ti && V.pos && V.pos[id] ? id : null;
    const id = su(V.sel) || su(qui && qui.id) || (V.evid || []).map(su).find(Boolean);
    const p = id && V.pos[id], box = $("pvMap"), inn = $("pvIn"); if(!p || !box || !inn) return;
    const u = inn.offsetWidth / 600;
    Z.tx = box.clientWidth / 2 - (p.x + p.w / 2) * u * Z.k; Z.ty = box.clientHeight / 2 - (p.y + p.h / 2) * u * Z.k;
    applica();
  }
  function centra(id){
    const p = V && V.pos && V.pos[id], box = $("pvMap"), inn = $("pvIn"); if(!p || !box || !inn) return;
    const u = inn.offsetWidth / 600;
    if(Z.k < 1.5 && inn.offsetWidth < 520) Z.k = 1.6;
    Z.tx = box.clientWidth / 2 - (p.x + p.w / 2) * u * Z.k; Z.ty = box.clientHeight / 2 - (p.y + p.h / 2) * u * Z.k;
    inn.classList.add("morbido"); applica(); setTimeout(() => inn.classList.remove("morbido"), 260);
  }
  function gesti(box, inn){
    const pts = new Map(); let d0 = 0, k0 = 1, c0 = null, t0 = null, mosso = 0, ultimoTap = 0;
    const centro = () => { const a = [...pts.values()]; return [(a[0][0] + a[1][0]) / 2, (a[0][1] + a[1][1]) / 2]; };
    box.addEventListener("pointerdown", e => {
      if(e.target.closest(".pv-zoom")) return;
      try{ box.setPointerCapture(e.pointerId); }catch(err){}
      pts.set(e.pointerId, [e.clientX, e.clientY]); if(pts.size === 1) mosso = 0;
      if(pts.size === 2){ const a = [...pts.values()]; d0 = Math.hypot(a[0][0] - a[1][0], a[0][1] - a[1][1]) || 1; k0 = Z.k; c0 = centro(); t0 = [Z.tx, Z.ty]; mosso = 99; }
    });
    box.addEventListener("pointermove", e => {
      if(!pts.has(e.pointerId)) return;
      const prima = pts.get(e.pointerId); pts.set(e.pointerId, [e.clientX, e.clientY]);
      if(pts.size === 1){ const dx = e.clientX - prima[0], dy = e.clientY - prima[1]; mosso += Math.abs(dx) + Math.abs(dy); Z.tx += dx; Z.ty += dy; applica(); }
      else if(pts.size === 2){ const a = [...pts.values()], d = Math.hypot(a[0][0] - a[1][0], a[0][1] - a[1][1]), c = centro(), r = box.getBoundingClientRect(); const px = (c0[0] - r.left - t0[0]) / k0, py = (c0[1] - r.top - t0[1]) / k0; Z.k = clamp(k0 * d / d0, 1, 4.5); Z.tx = c[0] - r.left - px * Z.k; Z.ty = c[1] - r.top - py * Z.k; applica(); }
    });
    const su = e => {
      if(!pts.has(e.pointerId)) return;
      const era = pts.size; pts.delete(e.pointerId);
      if(era === 1 && mosso < 9 && e.type === "pointerup"){
        const ora = Date.now(), r = box.getBoundingClientRect();
        const el = D.elementFromPoint(e.clientX, e.clientY), p = el && el.closest && el.closest("[data-p]");
        if(p && p.dataset.p && !/^l\d/.test(p.dataset.p)){ scegli(p.dataset.p); ultimoTap = 0; return; }
        if(ora - ultimoTap < 320){ zoomA(Z.k > 1.6 ? 1 : 2.4, e.clientX - r.left, e.clientY - r.top); ultimoTap = 0; } else ultimoTap = ora;
      }
    };
    box.addEventListener("pointerup", su); box.addEventListener("pointercancel", su);
    box.addEventListener("wheel", e => { e.preventDefault(); const r = box.getBoundingClientRect(); zoomA(Z.k * (e.deltaY < 0 ? 1.2 : 1 / 1.2), e.clientX - r.left, e.clientY - r.top); }, { passive:false });
    W.addEventListener("resize", () => { if(aperto()) applica(); });
  }

  /* ======================================================================
     I DOCUMENTI: i testi scritti diventano fogli veri
     ====================================================================== */
  const TIPI = [
    ["sms", "Messaggio", /^(messaggi[oi]|messaggin[oi]|sms|whatsapp|chat|notific[ah]e?|vocale)$/, /^(telefon[oi]|cellular[ei]|smartphone|telefonin[oi])$/],
    ["telegramma", "Telegramma", /^(telegramm[ai]|dispacci[o]?|cablogramm[ai]|marconigramm[ai]|radiogramm[ai])$/],
    ["giornale", "Giornale", /^(giornal[ei]|quotidian[oi]|titol[oi]|articol[oi]|gazzetta|manifest[oi]|volantin[oi]|locandina|rivista|notiziario)$/],
    ["lettera", "Lettera", /^(letter[ae]|cartolin[ae]|missiva|invit[oi]|partecipazion[ei])$/, /^(busta)$/],
    ["atto", "Documento", /^(refert[oi]|verbal[ei]|document[oi]|registr[oi]|contratt[oi]|testament[oi]|certificat[oi]|rapport[oi]|fascicol[oi]|sched[ae]|ricevut[ae]|fattur[ae]|elenco|lista|ordine|decreto|sentenza|denuncia|mandato|dossier|modulo|avviso|comunicato|circolare|scontrino|passaporto|tessera|cartella)$/],
    ["cartello", "Scritta", /^(cartell[oi]|scritt[ae]|targ[ah]e?|insegn[ae]|striscion[ei]|murales?|graffit[oi]|lapid[ei]|incision[ei]|iscrizion[ei]|etichett[ae]|targhett[ae]|epigrafe)$/, /^(muro|parete|porta|saracinesca|serranda|vetrina|lavagna)$/],
    ["schermo", "Schermo", /^(scherm[oi]|monitor|display|terminal[ei]|e ?mail|mail|tablet|ologramm[ai]|console|post|tweet|commento|didascalia)$/, /^(computer|pc|portatile|notebook)$/],
    ["diario", "Appunti", /^(diari[o]?|quadern[oi]|pagin[ae]|taccuin[oi]|agend[ae]|appunt[oi]|not[ae]|memoriale)$/],
    ["pergamena", "Pergamena", /^(pergamen[ae]|papir[oi]|codice|manoscritt[oi]|tavolett[ae]|rotol[oi]|profezia)$/],
    ["biglietto", "Biglietto", /^(bigliett[oi]|bigliettin[oi]|fogli[o]?|fogliett[oi]|post ?it|pizzin[oi]|cartoncin[oi])$/]
  ];
  const nrm = t => String(t || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, " ").trim();
  function tipoDa(parole, largo){
    for(let i = parole.length - 1; i >= 0; i--){ const w = parole[i]; for(const T of TIPI){ if(T[2].test(w) || (largo && T[3] && T[3].test(w))) return T; } }
    return null;
  }
  // «Sul muro c'è scritto: "…"»: la riga dice che è un testo scritto anche senza nominare un foglio
  const SCRITTO = /\b(scritt[oaie]|si legge|incis[oaie]|stampat[oaie])\b/;
  const CARTELLO = TIPI.find(q => q[0] === "cartello");
  const ARTICOLI = /^(il|lo|la|l|i|gli|le|un|una|uno|sul|sulla|sullo|sull|nel|nella|nello|nell|dal|dalla|sui|sulle|quel|quella|questo|questa|ecco)$/;
  // divide il testo in pezzi: testo normale e documenti
  function segmenti(t){
    t = String(t || "");
    if(t.length < 16 || !/["“«]/.test(t)) return null;
    const docs = [];
    // 1) una riga «Biglietto: "testo"»
    //    (il testo può andare a capo – una lettera con la firma – purché dentro non ci siano altre virgolette)
    const re1 = /(^|\n)([ \t]*\*?[ \t]*)([A-ZÀ-Ü][^:*"“«\n]{1,42}?)[ \t]*:[ \t]*\*?[ \t]*["“«]([^\n]{3,900}?|[^"“”«»\n]{1,500}(?:\n[^"“”«»\n]{0,500}){1,12}?)["”»][ \t]*\*?[ \t]*(?=\n|$)/g;
    let r;
    while((r = re1.exec(t))){
      const parole = nrm(r[3]).split(" ").filter(w => !ARTICOLI.test(w));
      const T = (parole.length ? TIPI.find(q => q[2].test(parole[0])) : null) || (SCRITTO.test(nrm(r[3])) ? tipoDa(parole, true) || CARTELLO : null);
      if(!T) continue;
      const da = r.index + r[1].length;
      docs.push({ da, a:r.index + r[0].length, k:T[0], label:r[3].trim(), t:r[4].trim() });
    }
    // 2) nella narrazione: «…sul foglio c'è scritto: "testo"»
    const re2 = /["“«]([^"“”«»\n]{10,700})["”»]/g;
    while((r = re2.exec(t))){
      const da = r.index, a = da + r[0].length;
      if(docs.some(d => da < d.a && d.da < a)) continue;
      const prima = t.slice(Math.max(0, da - 190), da), coda = prima.replace(/[\s*]+$/, "");
      if(!/[:]$/.test(coda)) continue;
      const riga = prima.slice(prima.lastIndexOf("\n") + 1);
      // una battuta di dialogo («Nome: "…"») non è un documento, a meno che il nome non sia quello di un foglio
      const battuta = /^[ \t]*\*?[ \t]*[A-ZÀ-Ü][^:*\n]{0,34}:[\s*]*$/.test(riga) && riga.trim().split(/\s+/).length <= 5;
      const T = battuta ? (tipoDa(nrm(riga).split(" "), false) || (SCRITTO.test(nrm(riga)) ? tipoDa(nrm(riga).split(" "), true) || CARTELLO : null)) : tipoDa(nrm(coda.slice(-150)).split(" "), true);
      if(!T) continue;
      docs.push({ da, a, k:T[0], label:T[1], t:r[1].trim(), dentro:true });
    }
    if(!docs.length) return null;
    docs.sort((p, q) => p.da - q.da);
    const out = []; let pos = 0, prefisso = "";
    docs.forEach(d => {
      let prima = prefisso + t.slice(pos, d.da), dentroSpan = false;
      prefisso = "";
      if(d.dentro){ const riga = prima.slice(prima.lastIndexOf("\n") + 1); dentroSpan = (riga.match(/\*/g) || []).length % 2 === 1; if(dentroSpan) prima = prima.replace(/[ \t]+$/, "") + "*"; }
      prima = prima.replace(/[ \t]*\n+[ \t]*$/, "");
      if(prima.replace(/\*/g, "").trim()) out.push({ t:prima });
      out.push({ doc:true, k:d.k, label:d.label, t:d.t });
      pos = d.a;
      if(d.dentro){
        pos += t.slice(pos).match(/^[ \t]*[.!?…,;]*[ \t]*/)[0].length;
        if(dentroSpan){ if(t[pos] === "*") pos++; else { const fine = t.indexOf("\n", pos), resto = t.slice(pos, fine < 0 ? t.length : fine); if(resto.replace(/\*/g, "").trim()) prefisso = "*"; } }
      }
    });
    const resto = (prefisso + t.slice(pos)).replace(/^[ \t]*\n+/, "");
    if(resto.replace(/\*/g, "").trim()) out.push({ t:resto });
    return out;
  }
  function docHTML(d){
    let corpo = d.t, firma = "";
    const mf = corpo.match(/^([\s\S]{8,}?)[\s]*[–—-][ ]?([A-ZÀ-Ü][^.!?]{1,34})$/);
    if(mf){ corpo = mf[1].trim(); firma = mf[2].trim(); }
    const lettere = corpo.replace(/[^A-Za-zÀ-ÿ]/g, ""), maiusc = lettere.length > 6 && lettere.replace(/[^A-ZÀ-Ü]/g, "").length / lettere.length > .7;
    const etichetta = d.label && d.label.length <= 44 ? d.label : "";
    const ICO = { sms:"💬", telegramma:"📨", giornale:"📰", lettera:"✉️", atto:"📄", cartello:"🪧", schermo:"🖥️", diario:"📓", pergamena:"📜", biglietto:"📝" };
    let dentro = esc(corpo);
    if(d.k === "telegramma") dentro = esc(corpo.toUpperCase().replace(/\.\s+/g, " STOP ").replace(/\.$/, " STOP"));
    return `<div class="docu d-${d.k}${maiusc ? " maiusc" : ""}"><span class="docu-l">${ICO[d.k] || "📄"} ${esc(etichetta || "Documento")}</span><div class="docu-b"><span class="docu-t">${dentro}</span>${firma ? `<span class="docu-f">${esc(firma)}</span>` : ""}</div></div>`;
  }
  // il testo di un messaggio con i documenti al loro posto; base = la formattazione normale dell'app
  function formatta(t, base){
    let seg = null;
    try{ seg = H.attiviDoc() ? segmenti(t) : null; }catch(e){ seg = null; }
    if(!seg) return base(t);
    return seg.map(q => q.doc ? docHTML(q) : base(q.t)).join("");
  }

  H.attiviDoc = () => true;
  W.SCENA = {
    init(h){ H = Object.assign(H, h || {}); },
    decora, apri, chiudi, aperto, formatta, segmenti, docHTML,
    haMappa(s){ try{ return !!(PV && PV.per(s)); }catch(e){ return false; } },
    partita(){ return H.st(); },
    stato(){ const x = H.st(); return x && PV ? PV.stato(x, H.story(x.sid)) : null; },
    storia(){ const x = H.st(); return x ? H.story(x.sid) : null; },
    luoghi(s, nome, corto){ try{ return PV ? PV.prompt(s, nome, corto) : ""; }catch(e){ return ""; } }
  };
})(window);
