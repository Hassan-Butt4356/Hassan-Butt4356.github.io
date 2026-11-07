/* ==========================================================
   3D LAYER (optional) — tilt cards and door-room depth.
   Remove the two "3D layer" lines in index.html to turn off.
   ========================================================== */
(function () {
  "use strict";

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;
  document.documentElement.classList.add("fx3d");

  /* ---------------- 1. tilt + shine (mouse only) ---------------- */
  const TILT = ".cat-card, .metric, .skill-card, .edu-col, .pd-feature, .portrait-frame, .door";
  const MAX = { door: 7, "portrait-frame": 9 };
  let current = null;

  function reset(el) {
    el.classList.remove("is-tilting");
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  }

  if (finePointer && !reduced) {
    document.addEventListener("pointermove", (e) => {
      if (e.pointerType !== "mouse") return;
      const el = e.target.closest ? e.target.closest(TILT) : null;
      if (el !== current) { if (current) reset(current); current = el; }
      if (!el) return;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      const key = Object.keys(MAX).find((k) => el.classList.contains(k));
      const max = key ? MAX[key] : 8;
      el.style.setProperty("--rx", ((0.5 - py) * max).toFixed(2) + "deg");
      el.style.setProperty("--ry", ((px - 0.5) * max).toFixed(2) + "deg");
      el.style.setProperty("--mx", (px * 100).toFixed(1) + "%");
      el.style.setProperty("--my", (py * 100).toFixed(1) + "%");
      el.classList.add("is-tilting");
    }, { passive: true });
    document.addEventListener("pointerleave", () => { if (current) { reset(current); current = null; } });

    /* a finished fade-in keeps transform:none and would block the tilt */
    document.addEventListener("animationend", (e) => {
      const el = e.target;
      if (el.classList && el.classList.contains("fade-in") && el.matches(TILT)) el.classList.remove("fade-in");
    });

    /* ---------------- 2. doors room parallax ---------------- */
    const stage = document.querySelector(".doors-stage");
    if (stage) {
      stage.addEventListener("pointermove", (e) => {
        const r = stage.getBoundingClientRect();
        stage.style.setProperty("--px", (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
        stage.style.setProperty("--py", (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
      }, { passive: true });
      stage.addEventListener("pointerleave", () => {
        stage.style.setProperty("--px", "0");
        stage.style.setProperty("--py", "0");
      });
    }
  }
})();
