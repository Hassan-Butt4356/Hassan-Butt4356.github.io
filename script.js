(function () {
  "use strict";

  let currentLang = "en";

  /* ---------------- LANGUAGE ---------------- */
  function applyLang(lang) {
    currentLang = lang;
    document.documentElement.setAttribute("lang", lang === "zh" ? "zh-CN" : "en");
    document.documentElement.setAttribute("data-lang", lang);

    document.querySelectorAll("[data-en]").forEach((el) => {
      const val = el.getAttribute(lang === "zh" ? "data-zh" : "data-en");
      if (val !== null) el.innerHTML = val;
    });

    document.querySelectorAll(".lang-opt").forEach((el) => el.classList.remove("active"));
    document.querySelector(lang === "zh" ? ".lang-zh" : ".lang-en").classList.add("active");

    renderSkills();
    renderTimeline();
    renderFeatured();
    renderMore();
    restartStream();
  }

  document.getElementById("langToggle").addEventListener("click", () => {
    applyLang(currentLang === "en" ? "zh" : "en");
  });

  /* ---------------- HERO TOKEN STREAM ---------------- */
  let streamTimer = null;

  function restartStream() {
    if (streamTimer) clearTimeout(streamTimer);
    const el = document.getElementById("streamText");
    const lines = STREAM_LINES[currentLang];
    let lineIdx = 0, charIdx = 0, deleting = false;

    function tick() {
      const full = lines[lineIdx];
      if (!deleting) {
        charIdx++;
        el.textContent = full.slice(0, charIdx);
        if (charIdx >= full.length) {
          deleting = false;
          streamTimer = setTimeout(() => { deleting = true; tick(); }, 1400);
          return;
        }
        streamTimer = setTimeout(tick, 42);
      } else {
        charIdx--;
        el.textContent = full.slice(0, charIdx);
        if (charIdx <= 0) {
          deleting = false;
          lineIdx = (lineIdx + 1) % lines.length;
          streamTimer = setTimeout(tick, 350);
          return;
        }
        streamTimer = setTimeout(tick, 20);
      }
    }
    tick();
  }

  /* ---------------- RENDER: SKILLS ---------------- */
  function renderSkills() {
    const grid = document.getElementById("skillsGrid");
    grid.innerHTML = "";
    SKILLS.forEach((group, i) => {
      const card = document.createElement("div");
      card.className = "skill-card reveal";
      card.style.setProperty("--d", (i % 4) * 0.06 + "s");
      card.innerHTML = `
        <h3>${currentLang === "zh" ? group.zh : group.en}</h3>
        <ul>${group.items.map((it) => `<li>${it}</li>`).join("")}</ul>
      `;
      grid.appendChild(card);
    });
    observeReveals();
  }

  /* ---------------- RENDER: EXPERIENCE ---------------- */
  function renderTimeline() {
    const wrap = document.getElementById("timeline");
    wrap.innerHTML = "";
    EXPERIENCE.forEach((job, i) => {
      const item = document.createElement("div");
      item.className = "timeline-item reveal";
      item.style.setProperty("--d", i * 0.08 + "s");
      const loc = currentLang === "zh" ? job.location.zh : job.location.en;
      const role = currentLang === "zh" ? job.role.zh : job.role.en;
      const bullets = currentLang === "zh" ? job.bullets.zh : job.bullets.en;
      item.innerHTML = `
        <div class="tl-marker"><span></span></div>
        <div class="tl-content">
          <span class="tl-date">${job.date}</span>
          <h3>${role}</h3>
          <p class="tl-company">${job.company} <span class="tl-loc">— ${loc}</span></p>
          <ul>${bullets.map((b) => `<li>${b}</li>`).join("")}</ul>
        </div>
      `;
      wrap.appendChild(item);
    });
    observeReveals();
  }

  /* ---------------- RENDER: FEATURED PROJECTS ---------------- */
  function pick(field) {
    if (typeof field === "string") return field;
    return currentLang === "zh" ? field.zh : field.en;
  }

  function renderFeatured() {
    const grid = document.getElementById("featuredGrid");
    grid.innerHTML = "";
    FEATURED_PROJECTS.forEach((p, i) => {
      const card = document.createElement("article");
      card.className = "feat-card reveal";
      card.style.setProperty("--d", (i % 2) * 0.1 + "s");
      const bullets = currentLang === "zh" ? p.bullets.zh : p.bullets.en;
      const links = [
        p.link ? `<a class="feat-link" href="${p.link}" target="_blank" rel="noopener" title="PyPI">📦</a>` : "",
        p.demoLink ? `<a class="feat-link" href="${p.demoLink}" target="_blank" rel="noopener" title="Live Demo">▶</a>` : ""
      ].join("");
      card.innerHTML = `
        <div class="feat-head">
          <h3>${pick(p.name)} ${links}</h3>
          <p class="feat-tag">${pick(p.tag)}</p>
        </div>
        <p class="feat-desc">${pick(p.desc)}</p>
        <ul class="feat-bullets">${bullets.map((b) => `<li>${b}</li>`).join("")}</ul>
        <div class="tech-row">${p.tech.map((t) => `<span class="tech-pill">${t}</span>`).join("")}</div>
      `;
      grid.appendChild(card);
    });
    observeReveals();
  }

  /* ---------------- RENDER: MORE PROJECTS ---------------- */
  function renderMore() {
    const grid = document.getElementById("moreGrid");
    grid.innerHTML = "";
    MORE_PROJECTS.forEach((p, i) => {
      const card = document.createElement("article");
      card.className = "more-card reveal";
      card.style.setProperty("--d", (i % 3) * 0.07 + "s");
      card.innerHTML = `
        <h4>${pick(p.name)}</h4>
        <p class="more-tag">${pick(p.tag)}</p>
        <p class="more-desc">${pick(p.desc)}</p>
        <div class="tech-row">${p.tech.map((t) => `<span class="tech-pill sm">${t}</span>`).join("")}</div>
      `;
      grid.appendChild(card);
    });
    observeReveals();
  }

  /* ---------------- SCROLL REVEAL ---------------- */
  let io;
  function observeReveals() {
    if (!io) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("in-view");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 }
      );
    }
    document.querySelectorAll(".reveal:not(.in-view)").forEach((el) => io.observe(el));
  }

  /* ---------------- HEADER / NAV / PROGRESS ---------------- */
  const header = document.getElementById("siteHeader");
  const progressFill = document.getElementById("progressFill");
  const burger = document.getElementById("navBurger");
  const nav = document.getElementById("mainNav");

  function onScroll() {
    header.classList.toggle("scrolled", window.scrollY > 20);
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    progressFill.style.width = scrolled + "%";
  }
  window.addEventListener("scroll", onScroll, { passive: true });

  burger.addEventListener("click", () => {
    nav.classList.toggle("open");
    burger.classList.toggle("open");
  });
  nav.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      nav.classList.remove("open");
      burger.classList.remove("open");
    })
  );

  /* ---------------- AMBIENT BACKGROUND CANVAS ---------------- */
  const canvas = document.getElementById("bgCanvas");
  const ctx = canvas.getContext("2d");
  let particles = [];
  let W, H;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    const count = Math.min(70, Math.floor((W * H) / 22000));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      r: Math.random() * 1.4 + 0.6
    }));
  }
  window.addEventListener("resize", resize);
  resize();

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function frame() {
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "rgba(217, 165, 68, 0.55)";
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.strokeStyle = "rgba(217, 165, 68, 0.08)";
    ctx.lineWidth = 1;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i], b = particles[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 130 * 130) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }
    if (!prefersReducedMotion) requestAnimationFrame(frame);
  }
  frame();

  /* ---------------- INIT ---------------- */
  applyLang("en");
})();
