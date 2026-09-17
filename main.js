(function () {
  "use strict";

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);

    localStorage.setItem("xoliqulovpc-theme", theme);

    document.querySelectorAll(".theme-toggle").forEach((btn) => {
      btn.textContent = theme === "dark" ? "☀️" : "🌙";

      btn.setAttribute(
        "aria-label",
        theme === "dark"
          ? "Light mode ga o'tish"
          : "Dark mode ga o'tish"
      );
    });
  }

  function initTheme() {
    const saved =
      localStorage.getItem("xoliqulovpc-theme") ||
      (window.matchMedia("(prefers-color-scheme: light)").matches
        ? "light"
        : "dark");

    applyTheme(saved);

    document.querySelectorAll(".theme-toggle").forEach((btn) => {
      btn.addEventListener("click", () => {
        const current =
          document.documentElement.getAttribute("data-theme");

        applyTheme(current === "dark" ? "light" : "dark");
      });
    });
  }

  function initLanguage() {
    const langSelect = document.querySelector(".lang-select");

    if (!langSelect) return;

    langSelect.addEventListener("change", () => {
      const lang = langSelect.value;

      document.documentElement.setAttribute("lang", lang);

      localStorage.setItem("xoliqulovpc-lang", lang);
    });
  }

  function initSidebar() {
    const hamburger = document.querySelector(".hamburger");
    const sidebar = document.querySelector(".sidebar");
    const overlay = document.querySelector(".sidebar-overlay");
    const closeBtn = document.querySelector(".sidebar__close");

    if (!hamburger || !sidebar || !overlay) return;

    function openSidebar() {
      sidebar.classList.add("is-open");
      overlay.classList.add("is-open");
      hamburger.classList.add("is-active");

      hamburger.setAttribute("aria-expanded", "true");

      document.body.style.overflow = "hidden";
    }

    function closeSidebar() {
      sidebar.classList.remove("is-open");
      overlay.classList.remove("is-open");
      hamburger.classList.remove("is-active");

      hamburger.setAttribute("aria-expanded", "false");

      document.body.style.overflow = "";
    }

    hamburger.addEventListener("click", () => {
      if (sidebar.classList.contains("is-open")) {
        closeSidebar();
      } else {
        openSidebar();
      }
    });

    overlay.addEventListener("click", closeSidebar);

    if (closeBtn) {
      closeBtn.addEventListener("click", closeSidebar);
    }

    sidebar.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeSidebar);
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 1024) {
        closeSidebar();
      }
    });
  }

  function markActiveNav() {
    const current =
      location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll("[data-nav-link]").forEach((link) => {
      const href = link.getAttribute("href");

      if (href === current) {
        link.classList.add("is-active");
      }
    });
  }

  function initHeaderScroll() {
    const header = document.querySelector(".site-header");

    if (!header) return;

    window.addEventListener("scroll", () => {
      header.classList.toggle(
        "is-scrolled",
        window.scrollY > 12
      );
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initLanguage();
    initSidebar();
    markActiveNav();
    initHeaderScroll();
  });
})();