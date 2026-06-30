/* =========================================================
   MEAT GUARD — Shared App Logic
   - branded route/skeleton loader
   - localStorage "auth" (demo) + page guard
   - validation + toast helpers
   ========================================================= */
(function () {
  "use strict";

  const KEY = "mg_user";
  const dark = document.body.classList.contains("theme-dark") ||
               document.documentElement.dataset.theme === "dark";

  /* ---------- Auth (demo, client-side only) ---------- */
  const Auth = {
    get() { try { return JSON.parse(localStorage.getItem(KEY) || "null"); } catch { return null; } },
    set(u) { localStorage.setItem(KEY, JSON.stringify(u)); },
    clear() { localStorage.removeItem(KEY); },
    isIn() { return !!this.get(); }
  };

  /* ---------- Branded loader overlay ---------- */
  function buildLoader(text) {
    if (document.getElementById("mg-loader")) return;
    const el = document.createElement("div");
    el.id = "mg-loader";
    if (dark) el.classList.add("theme-dark");
    el.innerHTML =
      '<div class="mg-loader-brand"><span class="meat">MEAT</span><span class="guard">GUARD</span></div>' +
      '<div class="mg-spinner"></div>' +
      '<div class="mg-loader-sub">' + (text || "กำลังโหลด…") + '</div>';
    document.body.appendChild(el);
  }

  function hideLoader() {
    const el = document.getElementById("mg-loader");
    document.body.classList.add("revealed");
    if (!el) return;
    el.classList.add("hide");
    setTimeout(() => el.remove(), 600);
  }

  // Show loader immediately (before paint where possible)
  if (document.body) buildLoader(document.body.dataset.loaderText);

  // Hide once everything is in & after a graceful minimum so the skeleton reads as intentional
  const MIN = 550;
  const t0 = performance.now();
  window.addEventListener("load", () => {
    const wait = Math.max(0, MIN - (performance.now() - t0));
    setTimeout(hideLoader, wait);
  });
  // Safety net if 'load' is delayed by remote assets
  setTimeout(hideLoader, 4000);

  /* ---------- Navigation with loader ---------- */
  function go(url, text) {
    buildLoader(text || "กำลังโหลด…");
    const el = document.getElementById("mg-loader");
    if (el) el.classList.remove("hide");
    setTimeout(() => (window.location.href = url), 280);
  }

  /* ---------- Toast ---------- */
  function toast(msg, type) {
    let wrap = document.getElementById("mg-toast-wrap");
    if (!wrap) {
      wrap = document.createElement("div");
      wrap.id = "mg-toast-wrap";
      document.body.appendChild(wrap);
    }
    const t = document.createElement("div");
    t.className = "mg-toast " + (type || "");
    const icon = type === "ok" ? "✅" : type === "err" ? "⚠️" : type === "warn" ? "🔔" : "ℹ️";
    t.innerHTML = '<span>' + icon + '</span><span>' + msg + '</span>';
    wrap.appendChild(t);
    setTimeout(() => {
      t.style.transition = "opacity .35s, transform .35s";
      t.style.opacity = "0";
      t.style.transform = "translateY(10px)";
      setTimeout(() => t.remove(), 350);
    }, 2800);
  }

  /* ---------- Validation helpers ---------- */
  const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
  const isPhone = (v) => /^0\d{8,9}$/.test(v.replace(/[\s-]/g, ""));

  function setError(input, msg) {
    if (!input) return;
    input.classList.toggle("bad", !!msg);
    const box = input.closest(".field")?.querySelector(".field-error");
    if (box) box.textContent = msg || "";
  }

  /* ---------- Password show/hide wiring ---------- */
  function wirePasswordToggles(root) {
    (root || document).querySelectorAll("[data-toggle-pass]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const inp = document.getElementById(btn.dataset.togglePass);
        if (!inp) return;
        const show = inp.type === "password";
        inp.type = show ? "text" : "password";
        btn.textContent = show ? "🙈" : "👁️";
      });
    });
  }

  /* ---------- Page guard (protected pages) ---------- */
  function guard() {
    if (!Auth.isIn()) {
      sessionStorage.setItem("mg_redirect_msg", "1");
      window.location.replace("index.html");
      return false;
    }
    return true;
  }

  /* ---------- Greeting / logout wiring (optional elements) ---------- */
  function hydrateChrome() {
    const u = Auth.get();
    document.querySelectorAll("[data-user-name]").forEach((el) => {
      el.textContent = u?.name || u?.email || "ผู้ใช้งาน";
    });
    document.querySelectorAll("[data-logout]").forEach((el) => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        Auth.clear();
        go("index.html", "กำลังออกจากระบบ…");
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    wirePasswordToggles();
    hydrateChrome();
  });

  /* ---------- Expose ---------- */
  window.MeatGuard = { Auth, go, toast, isEmail, isPhone, setError, guard, hideLoader, buildLoader };
})();
