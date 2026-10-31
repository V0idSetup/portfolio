/* =========================================================
   Logique du portfolio — normalement, pas besoin de modifier.
   ========================================================= */
(() => {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const el = (tag, cls, html) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  };
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const base = p => `Projets/${encodeURIComponent(p.dossier)}/`;

  /* ---------- Préférences (langue, thème) ---------- */
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };
  let lang = store.get("lang");
  if (!I18N[lang]) lang = (navigator.language || "fr").toLowerCase().startsWith("fr") ? "fr" : "en";

  /* Texte traduit : "simple" ou { fr, en } */
  const tr = x => (x && typeof x === "object" && !Array.isArray(x) && ("fr" in x || "en" in x)) ? (x[lang] ?? x.fr ?? x.en) : x;
  const ui = k => I18N[lang][k] ?? I18N.fr[k] ?? k;
  const paras = x => { const v = tr(x); return Array.isArray(v) ? v : [v || ""]; };

  /* ---------- Pastilles de compétences ---------- */
  const skillLabel = k => { const c = COMPETENCES[k]; return c ? (lang === "en" && c.en) || c.label : k; };
  function pad(key, small) {
    const c = COMPETENCES[key] || { sym: key.slice(0, 3), color: "#17262b" };
    const n = el("span", "pad" + (small ? " sm" : ""), esc(c.sym));
    n.style.setProperty("--c", c.color);
    n.title = skillLabel(key);
    n.setAttribute("role", "img");
    n.setAttribute("aria-label", skillLabel(key));
    return n;
  }

  /* ---------- Textes statiques + boutons ---------- */
  function applyStatic() {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach(n => { n.textContent = ui(n.dataset.i18n); });
    document.querySelectorAll("[data-i18n-aria]").forEach(n => n.setAttribute("aria-label", ui(n.dataset.i18nAria)));
    const lb = $("#lang-btn");
    lb.textContent = ui("other_lang");
    lb.setAttribute("aria-label", lang === "fr" ? "Switch to English" : "Passer en français");
    lb.lang = lang === "fr" ? "en" : "fr";
  }

  /* ---------- Profil ---------- */
  function renderProfil() {
    const nom = tr(PROFIL.nom);
    document.title = `${nom} — ${ui("title_suffix")}`;
    $("#brand-name").textContent = nom;
    $("#hero-nom").textContent = nom;
    $("#hero-titre").textContent = tr(PROFIL.titre);
    $("#hero-ecole").textContent = tr(PROFIL.ecole);
    $("#hero-linkedin").href = PROFIL.linkedin;
    $("#about-initials").textContent = nom.split(/\s+/).map(w => w[0]).slice(0, 2).join("").toUpperCase();
    $("#about-body").innerHTML = paras(PROFIL.presentation).map(t => `<p>${esc(t)}</p>`).join("");
    const links = $("#about-links");
    links.innerHTML = `<li><a class="btn btn-ghost" href="${esc(PROFIL.linkedin)}" target="_blank" rel="noopener">LinkedIn ↗</a></li>`;
    if (PROFIL.email) links.innerHTML += `<li><a class="btn btn-ghost" href="mailto:${esc(PROFIL.email)}">${esc(PROFIL.email)}</a></li>`;
    $("#footer-text").textContent = `© ${new Date().getFullYear()} ${nom}`;

    // photo (webp / jpg / png) : initiales si le fichier n'existe pas
    const photo = $("#about-photo"), box = photo.parentNode;
    photo.alt = nom;
    if (photo.dataset.src !== PROFIL.photo) {
      photo.dataset.src = PROFIL.photo || "";
      photo.onload = () => box.classList.remove("no-photo");
      photo.onerror = () => box.classList.add("no-photo");
      if (PROFIL.photo) photo.src = PROFIL.photo; else box.classList.add("no-photo");
    }

    // légende : liste PROFIL.competences si elle existe, sinon compétences utilisées dans les projets
    const legend = $("#skill-legend");
    legend.innerHTML = "";
    (Array.isArray(PROFIL.competences) ? PROFIL.competences : [...new Set(PROJETS.flatMap(p => p.competences || []))]).forEach(k => {
      const li = el("li");
      li.append(pad(k, true), document.createTextNode(skillLabel(k)));
      legend.append(li);
    });
  }

  /* ---------- Sections + cartes ---------- */
  function renderProjets() {
    const root = $("#projets");
    const nav = $("#nav");
    root.innerHTML = "";
    nav.querySelectorAll("a[data-dyn]").forEach(a => a.remove());
    CATEGORIES.forEach(cat => {
      const list = PROJETS.filter(p => p.categorie === cat.id);
      if (!list.length) return;
      const sec = el("section", "proj-section");
      sec.id = "cat-" + cat.id;
      sec.innerHTML = `
        <div class="wrap">
          <div class="proj-head reveal">
            <p class="ref mono">${esc(cat.ref)} — ${list.length} ${ui(list.length > 1 ? "projects_many" : "projects_one")}</p>
            <h2>${esc(tr(cat.titre))}</h2>
            <div class="proj-desc">${paras(cat.desc).filter(Boolean).map(t => `<p>${esc(t)}</p>`).join("")}</div>
          </div>
          <div class="proj-grid"></div>
        </div>`;
      const grid = $(".proj-grid", sec);
      list.forEach(p => grid.append(card(p)));
      root.append(sec);

      const a = el("a", null, esc(tr(cat.titre)));
      a.href = "#" + sec.id;
      a.dataset.dyn = "1";
      nav.append(a);
    });
  }


  /* ---------- Parcours & développement ---------- */
  function videoEmbed(src) {
    let m = src.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{6,})/);
    let url = m && `https://www.youtube-nocookie.com/embed/${m[1]}`;
    if (!url && (m = src.match(/vimeo\.com\/(?:video\/)?(\d+)/))) url = `https://player.vimeo.com/video/${m[1]}`;
    if (url) {
      const f = document.createElement("iframe");
      f.src = url; f.loading = "lazy"; f.allowFullscreen = true;
      f.allow = "accelerometer; encrypted-media; picture-in-picture; fullscreen";
      return f;
    }
    const v = document.createElement("video");   // fichier local (mp4 / webm)
    v.src = src; v.controls = true; v.preload = "metadata"; v.playsInline = true;
    return v;
  }

  function renderCarriere() {
    const root = $("#carriere");
    root.innerHTML = "";
    if (typeof CARRIERE === "undefined" || !(CARRIERE.blocs || []).length) return;
    const titre = tr(CARRIERE.titre);
    const sec = el("section", "proj-section");
    sec.id = "carriere-section";
    sec.innerHTML = `
      <div class="wrap">
        <div class="proj-head reveal">
          <p class="ref mono">${esc(CARRIERE.ref || "")}</p>
          <h2>${esc(titre)}</h2>
          <div class="proj-desc">${paras(CARRIERE.desc).filter(Boolean).map(t => `<p>${esc(t)}</p>`).join("")}</div>
        </div>
        <div class="career-list"></div>
      </div>`;
    const list = $(".career-list", sec);
    CARRIERE.blocs.forEach(b => {
      const texts = paras(b.texte).filter(Boolean);
      const bt = tr(b.titre);
      const blk = el("div", "career-block reveal");
      if (bt || texts.length) {
        blk.append(el("div", "career-text", (bt ? `<h3>${esc(bt)}</h3>` : "") + texts.map(t => `<p>${esc(t)}</p>`).join("")));
      } else blk.classList.add("no-text");
      if (b.video) {
        const fig = el("figure", "career-media");
        const v = videoEmbed(b.video);
        if (v.tagName === "VIDEO") {
          if (b.poster) v.poster = b.poster;
          v.addEventListener("error", () => { fig.remove(); blk.classList.add("no-media"); });
        }
        fig.append(v);
        const cap = tr(b.legende);
        if (cap) fig.append(el("figcaption", null, esc(cap)));
        blk.append(fig);
      } else blk.classList.add("no-media");
      list.append(blk);
    });
    root.append(sec);

    const a = el("a", null, esc(titre));
    a.href = "#" + sec.id;
    a.dataset.dyn = "1";
    $("#nav").append(a);
  }

  function card(p) {
    const a = el("a", "card reveal");
    a.href = "#projet-" + p.dossier;
    const img = el("div", "card-img");
    const im = new Image();
    im.alt = "";
    im.loading = "lazy";
    // vignette : front.webp, sinon img1.webp, sinon message d'aide
    const candidates = ["front.webp", "img1.webp"];
    let tried = 0;
    im.onerror = () => {
      if (++tried < candidates.length) { im.src = base(p) + candidates[tried]; return; }
      img.classList.add("empty"); img.textContent = ui("front_missing");
    };
    im.src = base(p) + candidates[0];
    img.append(im);
    const pads = el("div", "card-pads");
    (p.competences || []).forEach(k => pads.append(pad(k)));
    img.append(pads);
    const body = el("div", "card-body", `
      <h3>${esc(tr(p.titre))}</h3>
      <p>${esc(tr(p.resume) || "")}</p>
      <div class="card-meta"><span>${esc(p.annee || "")}</span><span>${esc(ui("see_project"))}</span></div>`);
    a.append(img, body);
    return a;
  }

  /* ---------- Détection automatique des médias ---------- */
  const testImage = url => new Promise(res => {
    const i = new Image();
    i.onload = () => res(true); i.onerror = () => res(false); i.src = url;
  });
  const testVideo = url => new Promise(res => {
    const v = document.createElement("video");
    const done = ok => { v.removeAttribute("src"); v.load(); res(ok); };
    v.preload = "metadata";
    v.onloadedmetadata = () => done(true);
    v.onerror = () => done(false);
    setTimeout(() => done(false), 5000);
    v.src = url;
  });
  const testPdf = url => fetch(url, { method: "HEAD" }).then(r => r.ok).catch(() => false);

  async function scan(prefix, exts, test, max = 60) {
    const found = [];
    for (let n = 1; n <= max; n++) {
      let hit = null;
      for (const e of exts) {
        const f = `${prefix}${n}.${e}`;
        if (await test(f)) { hit = f; break; }
      }
      if (!hit) break;
      found.push(hit);
    }
    return found;
  }

  const cache = {};
  async function decouvrir(p) {
    if (cache[p.dossier]) return cache[p.dossier];
    const b = base(p);
    const m = p.medias || {};
    const full = list => list.map(f => b + encodeURIComponent(f));
    const [images, videos, pdf] = await Promise.all([
      m.images ? full(m.images) : scan(b + "img", ["webp"], testImage),
      m.videos ? full(m.videos) : scan(b + "video", ["mp4", "webm"], testVideo),
      m.pdf ? full(m.pdf) : scan(b + "doc", ["pdf"], testPdf)
    ]);
    return (cache[p.dossier] = { images, videos, pdf });
  }

  /* ---------- Modale projet ---------- */
  const modal = $("#modal");
  const content = $("#modal-content");
  let lastFocus = null;
  let openToken = 0;

  async function openProject(p) {
    const token = ++openToken;
    if (modal.hidden) lastFocus = document.activeElement;
    const keepScroll = !modal.hidden ? $(".modal-panel").scrollTop : 0;
    const cat = CATEGORIES.find(c => c.id === p.categorie);
    const titre = tr(p.titre);
    content.innerHTML = "";
    const head = el("header", "m-head", `
      <p class="ref mono">${esc(cat ? cat.ref + " — " + tr(cat.titre).toUpperCase() : "")}${p.annee ? " · " + esc(p.annee) : ""}</p>
      <h2 id="modal-title">${esc(titre)}</h2>`);
    const skills = el("ul", "m-skills");
    (p.competences || []).forEach(k => {
      const li = el("li");
      li.append(pad(k, true), document.createTextNode(skillLabel(k)));
      skills.append(li);
    });
    head.append(skills);
    const text = el("div", "m-text", paras(p.texte).map(t => `<p>${esc(t)}</p>`).join(""));
    const slot = el("div", "m-media", `<p class="m-loading mono">${esc(ui("loading"))}</p>`);
    content.append(head, text, slot);

    const wasHidden = modal.hidden;
    modal.hidden = false;
    document.body.classList.add("no-scroll");
    if (wasHidden) $(".modal-close").focus();
    $(".modal-panel").scrollTop = keepScroll;

    const { images, videos, pdf } = await decouvrir(p);
    if (token !== openToken || modal.hidden) return;
    slot.innerHTML = "";

    // 1) Photos + vidéos dans une galerie qui s'adapte au nombre d'éléments
    const items = [
      ...images.map(src => ({ type: "img", src })),
      ...videos.map(src => ({ type: "video", src }))
    ];
    let autoVideo = null;
    if (items.length) {
      const g = el("div", "gallery");
      g.dataset.n = items.length;
      items.forEach((it, i) => {
        const fig = el("figure", "g-item");
        if (it.type === "img") {
          const im = new Image();
          im.src = it.src; im.alt = `${titre} — ${ui("image")} ${i + 1}`; im.loading = "lazy";
          im.addEventListener("click", () => openLightbox(images, images.indexOf(it.src)));
          fig.append(im);
        } else {
          const v = document.createElement("video");
          v.src = it.src; v.controls = true; v.preload = "metadata"; v.playsInline = true;
          if (!autoVideo && p.autoplay !== false) autoVideo = v;   // seule la 1re vidéo démarre seule
          fig.append(v);
        }
        g.append(fig);
      });
      slot.append(g);
      if (autoVideo) {
        // lecture automatique, toujours sans le son (le visiteur peut l'activer)
        autoVideo.muted = true;
        autoVideo.controls = false;          // pas de barre de lecture
        autoVideo.loop = true;               // rejoue en boucle
        autoVideo.style.pointerEvents = "none"; // le clic ne met pas en pause
        autoVideo.play().catch(() => {});
      }
    }

    // 2) PDF lus directement dans la page
    if (pdf.length) {
      slot.append(el("h3", "m-title", `${esc(ui("documents"))} · ${pdf.length}`));
      pdf.forEach(src => slot.append(pdfViewer(src)));
    }

    if (!items.length && !pdf.length) {
      slot.append(el("p", "m-loading mono", esc(ui("no_media"))));
    }
  }

  function pdfViewer(src) {
    const name = decodeURIComponent(src.split("/").pop());
    const w = el("div", "pdf-viewer");
    const bar = el("div", "pdf-bar", `<span>${esc(name)}</span>`);
    const btn = el("button", null, esc(ui("fullscreen")));
    btn.type = "button";
    btn.addEventListener("click", () => {
      const full = w.classList.toggle("full");
      btn.textContent = ui(full ? "close_full" : "fullscreen");
    });
    bar.append(btn);
    const f = document.createElement("iframe");
    f.src = src + "#view=FitH";
    f.title = name;
    f.loading = "lazy";
    w.append(bar, f);
    return w;
  }

  function closeProject() {
    openToken++;
    modal.hidden = true;
    document.body.classList.remove("no-scroll");
    content.innerHTML = "";
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  /* ---------- Lightbox ---------- */
  const lb = $("#lightbox"), lbImg = $("#lb-img");
  let lbList = [], lbIdx = 0;
  function openLightbox(list, i) { lbList = list; lbIdx = i; lb.classList.toggle("single", list.length < 2); showLb(); lb.hidden = false; }
  function showLb() { lbImg.src = lbList[lbIdx]; }
  function stepLb(d) { lbIdx = (lbIdx + d + lbList.length) % lbList.length; showLb(); }
  $(".lb-close").addEventListener("click", () => lb.hidden = true);
  $(".lb-prev").addEventListener("click", () => stepLb(-1));
  $(".lb-next").addEventListener("click", () => stepLb(1));
  lb.addEventListener("click", e => { if (e.target === lb) lb.hidden = true; });

  /* ---------- Navigation par hash (#projet-xxx) ---------- */
  function route() {
    const m = location.hash.match(/^#projet-(.+)$/);
    const p = m && PROJETS.find(x => x.dossier === decodeURIComponent(m[1]));
    if (p) openProject(p); else if (!modal.hidden) closeProject();
  }
  function closeAndClearHash() {
    if (location.hash.startsWith("#projet-")) history.pushState("", document.title, location.pathname + location.search + "#projets-start");
    closeProject();
  }
  modal.addEventListener("click", e => { if (e.target.closest("[data-close]")) closeAndClearHash(); });
  document.addEventListener("keydown", e => {
    if (!lb.hidden) {
      if (e.key === "Escape") lb.hidden = true;
      else if (e.key === "ArrowLeft") stepLb(-1);
      else if (e.key === "ArrowRight") stepLb(1);
      return;
    }
    const full = $(".pdf-viewer.full");
    if (e.key === "Escape") { if (full) full.querySelector("button").click(); else if (!modal.hidden) closeAndClearHash(); }
  });
  window.addEventListener("hashchange", route);

  /* ---------- Oscilloscope du hero ---------- */
  function scope() {
    const c = $("#scope"), ctx = c.getContext("2d");
    let w, h;
    const resize = () => {
      const d = window.devicePixelRatio || 1;
      w = c.clientWidth; h = c.clientHeight;
      c.width = w * d; c.height = h * d;
      ctx.setTransform(d, 0, 0, d, 0, 0);
    };
    resize(); window.addEventListener("resize", resize);
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let t = 0;
    function trace(fn, color, mid, amp, width) {
      ctx.beginPath();
      for (let x = 0; x <= w; x += 3) {
        const y = mid - fn(x) * amp;
        x ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
      }
      ctx.strokeStyle = color; ctx.lineWidth = width;
      ctx.shadowColor = color; ctx.shadowBlur = 12;
      ctx.stroke(); ctx.shadowBlur = 0;
    }
    function frame() {
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = "rgba(125,255,192,.07)"; ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 56) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
      for (let y = 0; y < h; y += 56) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
      trace(x => Math.sin(x * .011 + t) * .75 + Math.sin(x * .034 + t * 1.8) * .18, "rgba(125,255,192,.55)", h * .62, h * .13, 1.8);
      trace(x => Math.tanh(4 * Math.sin(x * .016 - t * 1.2)), "rgba(231,164,108,.45)", h * .84, h * .05, 1.5);
      if (!reduce) { t += .018; requestAnimationFrame(frame); }
    }
    frame();
  }

  /* ---------- Apparition au scroll + lien actif ---------- */
  let io = null, spy = null;
  function observers() {
    if (io) io.disconnect();
    if (spy) spy.disconnect();
    io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .08 });
    document.querySelectorAll(".reveal").forEach(n => io.observe(n));
    const links = [...document.querySelectorAll("#nav a")];
    const secs = links.map(a => $(a.getAttribute("href"))).filter(Boolean);
    spy = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id));
    }), { rootMargin: "-40% 0px -55% 0px" });
    secs.forEach(s => spy.observe(s));
  }

  /* ---------- Thème jour / nuit ---------- */
  function setTheme(t) {
    document.documentElement.dataset.theme = t;
    store.set("theme", t);
    const m = document.querySelector('meta[name="theme-color"]');
    if (m) m.content = t === "dark" ? "#07110d" : "#f2eee3";
  }
  $("#theme-btn").addEventListener("click", () => {
    setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
  });

  /* ---------- Langue ---------- */
  function render() {
    applyStatic();
    renderProfil();
    renderProjets();
    renderCarriere();
    observers();
    route();
  }
  $("#lang-btn").addEventListener("click", () => {
    lang = lang === "fr" ? "en" : "fr";
    store.set("lang", lang);
    render();
  });

  if (!document.documentElement.dataset.theme) document.documentElement.dataset.theme = "light";
  scope();
  render();
})();