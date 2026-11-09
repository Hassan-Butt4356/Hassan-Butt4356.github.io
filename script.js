(function () {
  "use strict";

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} },
    sget(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } },
    sset(k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} }
  };

  let lang = "en";
  let swarmReady = false;
  const L = (f) => (f == null ? "" : typeof f === "string" ? f : (lang === "zh" ? f.zh : f.en));
  const catById = (id) => CATEGORIES.find((c) => c.id === id);
  const projById = (id) => PROJECTS.find((p) => p.id === id);
  const projectsIn = (cid) => PROJECTS.filter((p) => p.cats.includes(cid));
  const pad = (n) => String(n).padStart(2, "0");
  const UI = {
    en: { enter: "Click to enter", room: "Enter the room", projects: "projects", all: "All", view: "View case study", overview: "Overview", built: "What I built", stack: "Stack", prev: "Previous", next: "Next", category: "Category", period: "Period", tools: "Tools", links: "Links", pipeline: "pipeline", live: "live", building: "Building", scanning: "Scanning page…", done: "layers built", idle: "Swarm idle", agents: "agents", newp: "NEW" },
    zh: { enter: "点击进入", room: "进入房间", projects: "个项目", all: "全部", view: "查看案例", overview: "概述", built: "我做了什么", stack: "技术栈", prev: "上一个", next: "下一个", category: "类别", period: "时间", tools: "工具", links: "链接", pipeline: "流程", live: "运行中", building: "构建中", scanning: "正在扫描页面…", done: "个图层已构建", idle: "智能体待命", agents: "个智能体", newp: "新" }
  };
  const T = (k) => UI[lang][k];

  /* =========================================================
     LANGUAGE
     ========================================================= */
  function applyLang(next) {
    lang = next;
    document.documentElement.setAttribute("lang", lang === "zh" ? "zh-CN" : "en");
    document.documentElement.setAttribute("data-lang", lang);
    $$("[data-en]").forEach((el) => {
      const v = el.getAttribute(lang === "zh" ? "data-zh" : "data-en");
      if (v !== null) el.innerHTML = v;
    });
    $$(".lang-opt").forEach((el) => el.classList.remove("active"));
    $(lang === "zh" ? ".lang-zh" : ".lang-en").classList.add("active");
    renderDoors();
    renderIndex();
    renderSkills();
    renderTimeline();
    flipIdx = 0; setFlip(false);
    route(true);
    if (swarmReady) Swarm.recount();
  }
  $("#langToggle").addEventListener("click", () => applyLang(lang === "en" ? "zh" : "en"));

  /* =========================================================
     CLOCK (local time in Pakistan)
     ========================================================= */
  function tickClock() {
    const now = new Date();
    try {
      const t = new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Karachi", hour: "numeric", minute: "2-digit" }).format(now);
      const d = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Karachi", day: "2-digit", month: "short", year: "numeric" }).format(now);
      $("#clockTime").textContent = t.replace(" ", "").toLowerCase();
      $("#clockDate").textContent = d;
    } catch (e) { /* very old browsers: leave placeholder */ }
  }
  tickClock();
  setInterval(tickClock, 20000);

  /* =========================================================
     THEME — pull the cord
     ========================================================= */
  const cord = $("#pullCord");
  const themeBtn = $("#themeToggle");
  function setTheme(next, save) {
    document.documentElement.setAttribute("data-theme", next);
    themeBtn.setAttribute("aria-label", next === "dark" ? "Switch to light mode" : "Switch to dark mode");
    if (save) store.set("hh-theme", next);
  }
  const otherTheme = () => (document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light");
  setTheme(document.documentElement.getAttribute("data-theme") || "dark", false);
  cord.addEventListener("click", () => {
    cord.classList.remove("pulled"); void cord.offsetWidth; cord.classList.add("pulled");
    setTimeout(() => setTheme(otherTheme(), true), 180);
  });
  themeBtn.addEventListener("click", () => setTheme(otherTheme(), true));
  // follow the OS setting until the visitor picks a theme themselves
  if (window.matchMedia) {
    window.matchMedia("(prefers-color-scheme: light)").addEventListener("change", (e) => {
      if (!store.get("hh-theme")) setTheme(e.matches ? "light" : "dark", false);
    });
  }

  /* =========================================================
     HERO FLIP CARD
     ========================================================= */
  let flipIdx = 0;
  const flipCard = $("#flipCard");
  function setFlip(animate) {
    const roles = ROLES[lang];
    const write = () => {
      $("#flipText").textContent = roles[flipIdx % roles.length];
      $("#flipCount").textContent = `${pad((flipIdx % roles.length) + 1)} / ${pad(roles.length)}`;
    };
    if (!animate || reducedMotion) return write();
    flipCard.classList.remove("flipping"); void flipCard.offsetWidth; flipCard.classList.add("flipping");
    setTimeout(write, 300);
  }
  setInterval(() => { flipIdx++; setFlip(true); }, 2800);

  /* =========================================================
     DOORS
     ========================================================= */
  let activeDoor = CATEGORIES[0].id;
  function renderDoors() {
    const row = $("#doorsRow");
    row.innerHTML = CATEGORIES.map((c, i) => `
      <button class="door${c.id === activeDoor ? " active" : ""}" style="--door:${c.color}" data-cat="${c.id}" data-sw aria-label="${L(c.name)}">
        <span class="door-frame"></span>
        <span class="door-inside"></span>
        <span class="door-leaf">
          <span class="door-plaque">${L(c.plaque)}</span>
          <span class="door-enter">${T("enter")}</span>
          <span class="door-knob"></span>
        </span>
        <span class="door-num">${pad(i + 1)} · ${projectsIn(c.id).length} ${T("projects")}</span>
      </button>`).join("");
    $$(".door", row).forEach((d) => {
      const id = d.dataset.cat;
      d.addEventListener("mouseenter", () => setActiveDoor(id));
      d.addEventListener("focus", () => setActiveDoor(id));
      d.addEventListener("click", () => enterDoor(id));
    });
    renderDoorPanel();
  }
  function setActiveDoor(id) {
    if (activeDoor === id) return;
    activeDoor = id;
    $$(".door").forEach((d) => d.classList.toggle("active", d.dataset.cat === id));
    renderDoorPanel();
  }
  function renderDoorPanel() {
    const c = catById(activeDoor);
    const panel = $("#doorPanel");
    panel.innerHTML = `
      <div>
        <h3 class="dp-title">${L(c.name)}</h3>
        <p class="dp-tag">${L(c.tagline)}</p>
        <button class="dp-cta" type="button">${T("room")} →</button>
      </div>
      <ul class="dp-list">${projectsIn(c.id).map((p) => `<li><a href="#/project/${p.id}">${L(p.name)}</a></li>`).join("")}</ul>`;
    $(".dp-cta", panel).addEventListener("click", () => enterDoor(c.id));
  }

  let entering = false;
  async function enterDoor(id) {
    if (entering) return;
    const door = $(`.door[data-cat="${id}"]`);
    if (reducedMotion || !door) { location.hash = `#/doors/${id}`; return; }
    entering = true;
    door.classList.add("open");
    await wait(520);
    const r = door.getBoundingClientRect();
    const portal = $("#portal");
    portal.classList.remove("go");
    Object.assign(portal.style, { left: r.left + "px", top: r.top + "px", width: r.width + "px", height: r.height + "px", borderRadius: "999px 999px 0 0", opacity: "1" });
    void portal.offsetWidth;
    portal.classList.add("go");
    Object.assign(portal.style, { left: "-20vw", top: "-20vh", width: "140vw", height: "140vh", borderRadius: "0" });
    await wait(620);
    location.hash = `#/doors/${id}`;
    await wait(420);
    portal.classList.remove("go");
    portal.style.opacity = "0";
    door.classList.remove("open");
    entering = false;
  }

  /* =========================================================
     PROJECT INDEX
     ========================================================= */
  let indexFilter = "all";
  function renderIndex() {
    const f = $("#indexFilters");
    f.innerHTML = [`<button class="chip${indexFilter === "all" ? " active" : ""}" data-f="all">${T("all")} · ${PROJECTS.length}</button>`]
      .concat(CATEGORIES.map((c) => `<button class="chip${indexFilter === c.id ? " active" : ""}" data-f="${c.id}"><i style="background:${c.color}"></i>${L(c.name)}</button>`)).join("");
    $$(".chip", f).forEach((b) => b.addEventListener("click", () => {
      indexFilter = b.dataset.f;
      $$(".chip", f).forEach((x) => x.classList.toggle("active", x === b));
      $$(".index-row").forEach((r) => r.classList.toggle("hidden", indexFilter !== "all" && !r.dataset.cats.split(" ").includes(indexFilter)));
    }));

    $("#indexList").innerHTML = PROJECTS.map((p, i) => {
      const c = catById(p.cat);
      return `
      <li class="index-row${indexFilter !== "all" && !p.cats.includes(indexFilter) ? " hidden" : ""}" data-sw data-cats="${p.cats.join(" ")}" data-id="${p.id}" role="link" tabindex="0">
        <span class="ir-num">${pad(i + 1)}</span>
        <span class="ir-name">${L(p.name)}${p.isNew ? ` <span class="new-badge">${T("newp")}</span>` : ""}</span>
        <span class="ir-tag">${L(p.tag)}</span>
        <span class="ir-cat">${p.cats.map((id) => `<i style="background:${catById(id).color}"></i>`).join("")}${L(c.name)}${p.cats.length > 1 ? ` + ${p.cats.length - 1}` : ""}</span>
        <span class="ir-go">→</span>
      </li>`;
    }).join("");
    $$(".index-row").forEach((r) => {
      const go = () => { location.hash = `#/project/${r.dataset.id}`; };
      r.addEventListener("click", go);
      r.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); } });
    });
  }

  /* =========================================================
     SKILLS
     ========================================================= */
  function renderSkills() {
    $("#skillsGrid").innerHTML = SKILLS.map((g) => `
      <div class="skill-card" data-sw>
        <h3>${L(g)}<span>${pad(g.items.length)}</span></h3>
        <ul>${g.items.map((it) => `<li>${it}</li>`).join("")}</ul>
      </div>`).join("");
  }

  /* =========================================================
     STORY — sticky year that follows the timeline
     ========================================================= */
  let yearObserver;
  let shownYear = 2026;
  function renderTimeline() {
    const wrap = $("#timeline");
    wrap.innerHTML = EXPERIENCE.map((j, i) => `
      <div class="tl-item${i === 0 ? " active" : ""}" data-sw data-year="${j.year}" data-range="${j.date}">
        <span class="tl-date">${j.date}</span>
        <h3>${L(j.role)}</h3>
        <p class="tl-company">${j.company} <span class="tl-loc">— ${L(j.location)}</span></p>
        <ul>${L(j.bullets).map((b) => `<li>${b}</li>`).join("")}</ul>
      </div>`).join("");
    $("#storyRange").textContent = EXPERIENCE[0].date;
    if (yearObserver) yearObserver.disconnect();
    yearObserver = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        $$(".tl-item").forEach((x) => x.classList.toggle("active", x === e.target));
        $("#storyRange").textContent = e.target.dataset.range;
        countYear(+e.target.dataset.year);
      });
    }, { rootMargin: "-45% 0px -45% 0px" });
    $$(".tl-item").forEach((el) => yearObserver.observe(el));
  }
  let yearRaf;
  function countYear(target) {
    const el = $("#storyYear");
    cancelAnimationFrame(yearRaf);
    const from = shownYear, t0 = performance.now(), dur = reducedMotion ? 1 : 600;
    const step = (t) => {
      const k = Math.min(1, (t - t0) / dur);
      const e = 1 - Math.pow(1 - k, 3);
      shownYear = Math.round(from + (target - from) * e);
      el.textContent = shownYear;
      if (k < 1) yearRaf = requestAnimationFrame(step);
    };
    yearRaf = requestAnimationFrame(step);
  }

  /* =========================================================
     SCREENS + ROUTER
     #/doors/<cat>      → room behind a door
     #/project/<id>     → project detail screen
     ========================================================= */
  const catScreen = $("#catScreen");
  const projScreen = $("#projScreen");
  const contactScreen = $("#contactScreen");
  let openCatId = null, openProjId = null, contactOpen = false;

  function lock() { document.body.classList.toggle("locked", !!(openCatId || openProjId || contactOpen)); }
  function show(screen, on) {
    screen.classList.toggle("open", on);
    screen.setAttribute("aria-hidden", on ? "false" : "true");
  }

  function renderCat(id) {
    const c = catById(id);
    $("#catCrumb").textContent = `${L(c.plaque)} · ${projectsIn(id).length} ${T("projects")}`;
    const body = $("#catBody");
    body.style.setProperty("--c", c.color);
    body.innerHTML = `
      <div class="cat-hero fade-in" style="--c:${c.color}">
        <div class="cat-door-mini"></div>
        <div><h1>${L(c.name)}</h1><p>${L(c.tagline)}</p></div>
      </div>
      <div class="cat-grid">
        ${projectsIn(id).map((p, i) => `
          <a class="cat-card fade-in" href="#/project/${p.id}" style="--c:${c.color};animation-delay:${0.08 * i + 0.1}s">
            <div class="cc-visual"><div class="mini-win"><div class="mini-flow">${p.flow.map((n) => `<span>${n}</span>`).join("<b>→</b>")}</div></div></div>
            <div class="cc-body">
              <h3>${L(p.name)}${p.isNew ? ` <span class="new-badge">${T("newp")}</span>` : ""}</h3>
              <p>${L(p.tag)}</p>
              <div class="cc-foot">
                <div class="tech-row">${p.tech.slice(0, 4).map((t) => `<span class="tech-pill">${t}</span>`).join("")}</div>
                <span class="cc-more">${T("view")} →</span>
              </div>
            </div>
          </a>`).join("")}
      </div>`;
  }

  function renderProject(p) {
    // colour + back link follow the door the visitor came through
    const c = catById(openCatId && p.cats.includes(openCatId) ? openCatId : p.cat);
    const idx = PROJECTS.indexOf(p);
    const prev = PROJECTS[(idx - 1 + PROJECTS.length) % PROJECTS.length];
    const next = PROJECTS[(idx + 1) % PROJECTS.length];
    $("#projBack").innerHTML = `← ${L(c.name)}`;
    $("#projBack").setAttribute("href", `#/doors/${c.id}`);
    $("#projCount").textContent = `${pad(idx + 1)} / ${pad(PROJECTS.length)}`;
    $("#projPrev").setAttribute("href", `#/project/${prev.id}`);
    $("#projNext").setAttribute("href", `#/project/${next.id}`);
    const slug = p.id.toLowerCase();
    const links = (p.links || []).map((l, i) => `<a class="pd-link${i ? " ghost" : ""}" href="${l.url}" target="_blank" rel="noopener">${L(l.label)} ↗</a>`).join("");

    const body = $("#projBody");
    body.style.setProperty("--c", c.color);
    body.innerHTML = `
      <div class="pd-hero">
        <div>
          <span class="pd-plaque" data-sw>${L(c.plaque)}${p.isNew ? ` · ${T("newp")}` : ""}</span>
          <h1 data-sw>${L(p.name)}</h1>
          <p class="pd-tag" data-sw>${L(p.tag)}</p>
        </div>
        <div class="pd-meta" data-sw>
          <div class="pd-meta-row"><span>${T("category")}</span><span>${p.cats.map((id) => L(catById(id).name)).join(" · ")}</span></div>
          ${p.period ? `<div class="pd-meta-row"><span>${T("period")}</span><span>${p.period}</span></div>` : ""}
          <div class="pd-meta-row"><span>${T("tools")}</span><span>${p.tech.length}</span></div>
          ${links ? `<div class="pd-links">${links}</div>` : ""}
        </div>
      </div>

      <div class="pd-console" data-sw>
        <div class="pd-console-bar"><span>~/${slug}/${T("pipeline")}</span><span class="live"><span class="pulse-dot"></span>${T("live")}</span></div>
        <div class="pipeline">
          ${p.flow.map((n, i) => `${i ? `<div class="pl-wire" style="--i:${i - 1}"></div>` : ""}<div class="pl-node" style="--i:${i}"><small>${pad(i + 1)}</small>${n}</div>`).join("")}
        </div>
      </div>

      <div class="pd-metrics">
        ${(p.metrics || []).map((m) => `<div class="metric" data-sw><b>${m.v}</b><span>${L(m.l)}</span></div>`).join("")}
      </div>

      <div class="pd-split">
        <div data-sw>
          <p class="pd-h">${T("overview")}</p>
          <p class="pd-overview">${L(p.desc)}</p>
        </div>
        <div>
          <p class="pd-h" data-sw>${T("built")}</p>
          <div class="pd-features">
            ${L(p.bullets).map((b, i) => `<div class="pd-feature" data-sw><b>${pad(i + 1)}</b><p>${b}</p></div>`).join("")}
          </div>
        </div>
      </div>

      <p class="pd-h" data-sw>${T("stack")}</p>
      <div class="pd-stack" data-sw>${p.tech.map((t) => `<span>${t}</span>`).join("")}</div>

      <div class="pd-nav" data-sw>
        <a href="#/project/${prev.id}"><small>← ${T("prev")}</small><strong>${L(prev.name)}</strong></a>
        <a href="#/project/${next.id}"><small>${T("next")} →</small><strong>${L(next.name)}</strong></a>
      </div>`;
  }

  function route(rerenderOnly) {
    const h = decodeURIComponent(location.hash || "");
    let m;
    const prevProj = openProjId;
    if (h === "#/contact") {
      const was = contactOpen;
      contactOpen = true;
      show(contactScreen, true);
      if (!was && !rerenderOnly) { $("#contactScroll").scrollTop = 0; contactScreen.focus({ preventScroll: true }); }
      lock();
      return;
    }
    const closedContact = contactOpen;
    if (contactOpen) { contactOpen = false; show(contactScreen, false); }
    if ((m = h.match(/^#\/project\/([\w-]+)/)) && projById(m[1])) {
      const p = projById(m[1]);
      if (openCatId && !p.cats.includes(openCatId)) { openCatId = null; show(catScreen, false); }
      openProjId = p.id;
      renderProject(p);
      show(projScreen, true);
      if (!rerenderOnly && prevProj !== p.id) {
        $("#projScroll").scrollTop = 0;
        projScreen.focus({ preventScroll: true });
        Swarm.buildScreen($("#projBody"), $("#projLayer"), $("#projScroll"));
      } else {
        $$("#projBody [data-sw]").forEach((el) => el.classList.remove("sw-pending"));
      }
    } else if ((m = h.match(/^#\/doors\/(\w+)/)) && catById(m[1])) {
      openProjId = null; show(projScreen, false);
      const changed = openCatId !== m[1];
      openCatId = m[1];
      renderCat(openCatId);
      show(catScreen, true);
      setActiveDoor(openCatId);
      if (changed && !rerenderOnly) { $("#catScroll").scrollTop = 0; catScreen.focus({ preventScroll: true }); }
    } else {
      const wasOpen = openCatId || openProjId || closedContact;
      openCatId = null; openProjId = null;
      show(catScreen, false); show(projScreen, false);
      if (wasOpen && !rerenderOnly) {
        lock();
        const target = h.length > 1 && !h.startsWith("#/") ? document.getElementById(h.slice(1)) : null;
        if (target) target.scrollIntoView();
        if (h === "#/") history.replaceState(null, "", location.pathname + location.search);
      }
    }
    lock();
  }
  window.addEventListener("hashchange", () => route(false));
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (contactOpen) { location.hash = "#/"; return; }
    if (openProjId && openCatId) location.hash = `#/doors/${openCatId}`;
    else if (openProjId || openCatId) location.hash = "#/";
  });
  $$("[data-close]").forEach((a) => !a.closest("#contactScreen") && a.setAttribute("href", a.classList.contains("back-link") ? "#work" : "#/"));

  /* =========================================================
     CONTACT SCREEN — copy buttons + project brief
     ========================================================= */
  $$("[data-copy]").forEach((b) => b.addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(b.dataset.copy); } catch (e) {
      const t = document.createElement("textarea"); t.value = b.dataset.copy; document.body.appendChild(t); t.select();
      try { document.execCommand("copy"); } catch (e2) {} t.remove();
    }
    b.textContent = lang === "zh" ? "已复制 ✓" : "Copied ✓";
    b.classList.add("ok");
    setTimeout(() => { b.textContent = b.getAttribute(lang === "zh" ? "data-zh" : "data-en"); b.classList.remove("ok"); }, 1600);
  }));
  const brief = $("#briefForm");
  const MAIL = $('#contactScreen a[href^="mailto:"]').getAttribute("href").slice(7);
  const WA = $('#contactScreen a[href^="https://wa.me/"]').getAttribute("href");
  brief.addEventListener("submit", (e) => {
    e.preventDefault();
    const via = (e.submitter && e.submitter.dataset.via) || "whatsapp";
    const f = new FormData(brief);
    const name = (f.get("name") || "").trim(), msg = (f.get("message") || "").trim();
    const err = $("#briefError");
    err.hidden = !!(name && msg);
    if (!name || !msg) { (name ? brief.message : brief.name).focus(); return; }
    const types = f.getAll("type");
    const contact = (f.get("contact") || "").trim();
    const lines = ["Hi Hassan, I have a project for you.", "", "Name: " + name];
    if (contact) lines.push("Contact: " + contact);
    if (types.length) lines.push("Looking for: " + types.join(", "));
    if (f.get("timeline")) lines.push("Timeline: " + f.get("timeline"));
    lines.push("", msg);
    const text = lines.join("\n");
    if (via === "email") {
      location.href = "mailto:" + MAIL + "?subject=" + encodeURIComponent("Project enquiry from " + name) + "&body=" + encodeURIComponent(text);
    } else {
      window.open(WA + "?text=" + encodeURIComponent(text), "_blank", "noopener");
    }
  });
  brief.addEventListener("input", () => { $("#briefError").hidden = true; });

  /* =========================================================
     HEADER / NAV
     ========================================================= */
  const header = $("#siteHeader");
  window.addEventListener("scroll", () => header.classList.toggle("scrolled", window.scrollY > 20), { passive: true });
  const burger = $("#navBurger"), nav = $("#mainNav");
  burger.addEventListener("click", () => { nav.classList.toggle("open"); burger.classList.toggle("open"); });
  $$("a", nav).forEach((a) => a.addEventListener("click", () => { nav.classList.remove("open"); burger.classList.remove("open"); }));

  /* =========================================================
     SWARM REBUILD
     A swarm of agent cursors scans the page, drags a selection
     box over each layer and builds it into place.
     ========================================================= */
  const Swarm = (() => {
    const COLORS = ["#ff5c5c", "#4aa3ff", "#3ddc97", "#b06bff", "#ffb020", "#ff6bd6", "#29d3e6", "#9be15d"];
    const NAMES = ["layout-agent", "copy-agent", "ui-agent", "rag-agent", "api-agent", "style-agent", "a11y-agent", "qa-agent"];
    const MAX_AGENTS = window.innerWidth < 700 ? 4 : 8;
    const bar = $("#swBar"), statusEl = $("#swStatus"), meter = $("#swMeter"), countEl = $("#swCount");
    const speedBtn = $("#swSpeed"), toggleBtn = $("#swToggle");
    let speed = 1;
    let enabled = store.get("hh-swarm") !== "off";
    let gen = 0;              // bumps on skip → in-flight builds abort
    let total = 0, built = 0;
    const layers = new Map(); // layer element → { agents, queue, busy }
    const sleep = (ms) => wait(ms / speed);

    $("#swDots").innerHTML = COLORS.slice(0, MAX_AGENTS).map((c) => `<i style="background:${c}"></i>`).join("");

    function setStatus(s) { statusEl.textContent = s; }
    function updateCount() {
      countEl.textContent = `${built} / ${total}`;
      meter.style.width = total ? (built / total) * 100 + "%" : "0";
    }
    function setToggle() {
      toggleBtn.textContent = enabled ? "on" : "off";
      toggleBtn.classList.toggle("off", !enabled);
      toggleBtn.title = enabled ? "Agents build sections as you scroll — click to turn off" : "Turn agents back on";
    }
    setToggle();

    function layerState(layer) {
      if (!layers.has(layer)) layers.set(layer, { agents: [], queue: [], busy: 0 });
      return layers.get(layer);
    }

    function viewportToLayer(layer, vx, vy) {
      const r = layer.getBoundingClientRect();
      return { x: vx - r.left, y: vy - r.top };
    }
    function edgePoint(layer) {
      const w = window.innerWidth, h = window.innerHeight, side = Math.floor(Math.random() * 4);
      const vx = side === 0 ? -20 : side === 1 ? w + 10 : Math.random() * w;
      const vy = side === 2 ? -20 : side === 3 ? h + 10 : Math.random() * h;
      return viewportToLayer(layer, Math.max(-20, Math.min(w - 30, vx)), vy);
    }

    function makeAgent(layer, i) {
      const el = document.createElement("div");
      const color = COLORS[i % COLORS.length];
      el.className = "sw-agent";
      el.innerHTML = `<svg viewBox="0 0 24 24"><path d="M3 2l7.6 19 2.5-7.7L21 10.7z" fill="${color}" stroke="#fff" stroke-width="1.5" stroke-linejoin="round"/></svg><em style="background:${color}">${NAMES[i % NAMES.length]}</em>`;
      layer.appendChild(el);
      const a = { el, color, x: 0, y: 0, idleTimer: null, gone: true };
      el.style.opacity = "0";
      return a;
    }
    function place(a, x, y) {
      a.el.style.transitionDuration = "0ms";
      a.el.style.transform = `translate3d(${x}px,${y}px,0)`;
      a.x = x; a.y = y;
    }
    function move(a, x, y, ms) {
      const maxX = (a.el.parentElement.clientWidth || window.innerWidth) - 26;
      x = Math.max(0, Math.min(maxX, x));
      a.el.style.transitionDuration = ms / speed + "ms";
      a.el.style.transform = `translate3d(${x}px,${y}px,0)`;
      a.x = x; a.y = y;
      return sleep(ms);
    }
    function wake(layer, a) {
      clearTimeout(a.idleTimer);
      if (a.gone) {
        const p = edgePoint(layer);
        place(a, p.x, p.y);
        a.el.style.opacity = "1";
        a.gone = false;
      }
    }
    function rest(a) {
      clearTimeout(a.idleTimer);
      a.idleTimer = setTimeout(() => { a.el.style.opacity = "0"; a.gone = true; }, 1400);
    }

    function relRect(el, layer) {
      const r = el.getBoundingClientRect(), l = layer.getBoundingClientRect();
      return { x: r.left - l.left, y: r.top - l.top, w: r.width, h: r.height };
    }

    function reveal(el, animate = true) {
      if (!el.classList.contains("sw-pending")) return;
      el.classList.remove("sw-pending");
      if (el.dataset.swMain) { built++; updateCount(); if (built >= total) finished(); }
      if (!animate || reducedMotion) return;
      el.style.setProperty("--sw-d", Math.round(480 / speed) + "ms");
      el.classList.add("sw-built");
      el.addEventListener("animationend", () => el.classList.remove("sw-built"), { once: true });
    }
    function fadeReveal(el) {
      if (!el.classList.contains("sw-pending")) return;
      reveal(el, false);
      el.classList.remove("fade-in"); void el.offsetWidth; el.classList.add("fade-in");
      el.addEventListener("animationend", () => el.classList.remove("fade-in"), { once: true });
    }

    async function buildOne(layer, a, el) {
      const g = gen;
      const r = relRect(el, layer);
      if (!r.w || !r.h) return reveal(el, false);
      const dist = Math.hypot(r.x - a.x, r.y - a.y);
      await move(a, r.x, r.y, Math.max(220, Math.min(620, dist * 0.8)));
      if (g !== gen) return;
      const box = document.createElement("div");
      box.className = "sw-box";
      box.style.cssText = `left:${r.x}px;top:${r.y}px;width:0;height:0;border-color:${a.color};background:${a.color}14`;
      box.innerHTML = `<i style="border-color:${a.color}"></i><i style="border-color:${a.color}"></i><i style="border-color:${a.color}"></i><i style="border-color:${a.color}"></i><em style="background:${a.color}">${Math.round(r.w)} × ${Math.round(r.h)}</em>`;
      layer.appendChild(box);
      void box.offsetWidth;
      const d = Math.max(300, Math.min(560, (r.w + r.h) * 0.35));
      box.style.transitionDuration = d / speed + "ms";
      box.style.width = r.w + "px";
      box.style.height = r.h + "px";
      await move(a, r.x + r.w - 6, r.y + r.h - 6, d);
      if (g !== gen) { box.remove(); return; }
      reveal(el);
      await sleep(160);
      box.classList.add("done");
      setTimeout(() => box.remove(), 450);
    }

    function enqueue(layer, els) {
      const st = layerState(layer);
      const fresh = els.filter((el) => el.classList.contains("sw-pending") && !st.queue.includes(el));
      st.queue.push(...fresh);
      st.queue.sort((a, b) => {
        const ra = a.getBoundingClientRect(), rb = b.getBoundingClientRect();
        return (ra.top - rb.top) || (ra.left - rb.left);
      });
      const max = layer.id === "projLayer" ? 3 : MAX_AGENTS;
      while (st.agents.length < max) st.agents.push(makeAgent(layer, st.agents.length));
      st.agents.forEach((a) => { if (!a.working && st.queue.length) worker(layer, st, a); });
    }
    async function worker(layer, st, a) {
      a.working = true;
      wake(layer, a);
      const g = gen;
      while (st.queue.length && g === gen) {
        // take the queued element closest to this agent
        let best = 0, bestD = Infinity;
        for (let i = 0; i < Math.min(st.queue.length, 6); i++) {
          const r = relRect(st.queue[i], layer);
          const d = Math.hypot(r.x - a.x, r.y - a.y) + i * 120;
          if (d < bestD) { bestD = d; best = i; }
        }
        const el = st.queue.splice(best, 1)[0];
        if (el.classList.contains("sw-pending")) await buildOne(layer, a, el);
      }
      a.working = false;
      rest(a);
    }

    function clearAll() {
      gen++;
      layers.forEach((st, layer) => {
        st.queue.forEach((el) => reveal(el, false));
        st.queue.length = 0;
        st.agents.forEach((a) => { a.working = false; a.el.style.opacity = "0"; a.gone = true; });
        $$(".sw-box", layer).forEach((b) => b.remove());
      });
    }

    /* ---------- main page ---------- */
    let io;
    function observeMain() {
      io = new IntersectionObserver((entries) => {
        const hits = entries.filter((e) => e.isIntersecting).map((e) => e.target);
        if (!hits.length) return;
        hits.forEach((el) => io.unobserve(el));
        if (enabled && !reducedMotion) enqueue($("#swLayer"), hits);
        else hits.forEach(fadeReveal);
      }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
      $$("main [data-sw].sw-pending").forEach((el) => io.observe(el));
    }

    function markMain() {
      const els = $$("main [data-sw]");
      els.forEach((el) => { el.classList.add("sw-pending"); el.dataset.swMain = "1"; });
      total = els.length; built = 0; updateCount();
      return els;
    }

    async function intro() {
      gen++;
      const g = gen;
      window.scrollTo({ top: 0, behavior: "instant" });
      bar.classList.remove("mini");
      // header items are part of the intro, the rest of main is built as you scroll
      const headerEls = $$("header [data-sw]");
      headerEls.forEach((el) => el.classList.add("sw-pending"));
      const mainEls = markMain();
      total += headerEls.length; updateCount();
      headerEls.forEach((el) => { el.dataset.swMain = "1"; });
      if (io) io.disconnect();

      setStatus(T("scanning"));
      const layer = $("#swLayer");
      const st = layerState(layer);
      while (st.agents.length < MAX_AGENTS) st.agents.push(makeAgent(layer, st.agents.length));
      // agents fly in from the edges while the scan line sweeps
      st.agents.forEach((a) => {
        wake(layer, a);
        const p = viewportToLayer(layer, 80 + Math.random() * (window.innerWidth - 160), 100 + Math.random() * (window.innerHeight - 200));
        move(a, p.x, p.y, 700 + Math.random() * 300);
      });
      const scan = document.createElement("div");
      scan.className = "sw-scan";
      document.body.appendChild(scan);
      await scan.animate([{ transform: "translateY(0)" }, { transform: `translateY(${window.innerHeight}px)` }], { duration: 1000 / speed, easing: "ease-in-out" }).finished.catch(() => {});
      scan.remove();
      if (g !== gen) return;

      setStatus(`${T("building")} · ${MAX_AGENTS} ${T("agents")}`);
      const inView = headerEls.concat(mainEls).filter((el) => {
        const r = el.getBoundingClientRect();
        return r.bottom > 0 && r.top < window.innerHeight && r.width > 0;
      });
      headerEls.forEach((el) => { if (!inView.includes(el)) reveal(el, false); }); // e.g. collapsed mobile nav
      enqueue(layer, inView);
      // wait for the visible layers, then hand the rest to the scroll observer
      while (inView.some((el) => el.classList.contains("sw-pending")) && g === gen) await wait(120);
      if (g !== gen) return;
      store.sset("hh-swarm-played", "1");
      observeMain();
      await wait(900);
      if (g === gen) toMini();
    }

    function toMini() {
      bar.classList.add("mini");
      setStatus(built >= total ? `${total} ${T("done")}` : T("idle"));
    }
    function finished() { setStatus(`${total} ${T("done")}`); }

    function skip() {
      clearAll();
      $$("[data-sw].sw-pending").forEach((el) => reveal(el, false));
      $$(".sw-scan").forEach((s) => s.remove());
      store.sset("hh-swarm-played", "1");
      toMini();
    }

    function init() {
      if (reducedMotion) { bar.classList.add("mini"); setStatus(T("idle")); updateCount(); return; }
      const played = store.sget("hh-swarm-played") === "1";
      if (!played && enabled && !location.hash.startsWith("#/")) {
        intro();
      } else {
        markMain();
        observeMain();
        toMini();
      }
    }

    // detail screen: agents build the visible blocks, the rest fade in on scroll
    function buildScreen(body, layer, scroller) {
      const els = $$("[data-sw]", body);
      if (reducedMotion) return;
      els.forEach((el) => el.classList.add("sw-pending"));
      requestAnimationFrame(() => {
        const h = scroller.clientHeight;
        const vis = [], rest = [];
        els.forEach((el) => (el.getBoundingClientRect().top < h * 0.95 ? vis : rest).push(el));
        if (enabled) {
          const st = layerState(layer);
          st.queue.length = 0;
          $$(".sw-box", layer).forEach((b) => b.remove());
          enqueue(layer, vis);
        } else vis.forEach(fadeReveal);
        const sio = new IntersectionObserver((entries) => {
          entries.forEach((e) => { if (e.isIntersecting) { sio.unobserve(e.target); fadeReveal(e.target); } });
        }, { root: scroller, threshold: 0.1 });
        rest.forEach((el) => sio.observe(el));
      });
    }

    speedBtn.addEventListener("click", () => {
      speed = speed === 1 ? 2 : speed === 2 ? 4 : 1;
      speedBtn.textContent = speed + "x";
    });
    $("#swSkip").addEventListener("click", skip);
    toggleBtn.addEventListener("click", () => {
      enabled = !enabled;
      store.set("hh-swarm", enabled ? "on" : "off");
      setToggle();
    });
    $("#swRebuild").addEventListener("click", () => {
      if (reducedMotion) return;
      if (!enabled) { enabled = true; store.set("hh-swarm", "on"); setToggle(); }
      clearAll();
      if (io) io.disconnect();
      $$("main [data-sw], header [data-sw]").forEach((el) => el.classList.remove("sw-pending", "sw-built", "fade-in"));
      intro();
    });

    function recount() {
      built = total - $$("[data-sw].sw-pending").filter((el) => el.dataset.swMain).length;
      updateCount();
    }

    return { init, buildScreen, recount };
  })();

  /* =========================================================
     INIT
     ========================================================= */
  $("#statProjects").textContent = PROJECTS.length;
  applyLang("en");
  Swarm.init();
  swarmReady = true;
})();
