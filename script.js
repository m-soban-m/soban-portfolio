(function () {
  "use strict";

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- SCROLL REVEAL ---------------- */
  const revealEls = Array.from(document.querySelectorAll(".reveal"));

  if (reducedMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("in-view"); });
  } else {
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---------------- SCROLLSPY NAV ---------------- */
  const navLinks = Array.from(document.querySelectorAll(".nav-links a"));
  const sections = navLinks
    .map(function (link) { return document.getElementById(link.dataset.section); })
    .filter(Boolean);

  function setActiveLink(id) {
    navLinks.forEach(function (link) {
      link.classList.toggle("active", link.dataset.section === id);
    });
  }

  if ("IntersectionObserver" in window && sections.length) {
    const spyObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) setActiveLink(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach(function (s) { spyObserver.observe(s); });
  }

  /* ---------------- MOBILE MENU ---------------- */
  const burger = document.getElementById("navBurger");
  const navLinksEl = document.querySelector(".nav-links");

  if (burger && navLinksEl) {
    burger.addEventListener("click", function () {
      const open = navLinksEl.classList.toggle("mobile-open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
    navLinksEl.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinksEl.classList.remove("mobile-open");
        burger.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------------- BACK TO TOP ---------------- */
  const fab = document.getElementById("fabTop");
  const footerToTop = document.getElementById("toTop");

  function toggleFab() {
    if (window.scrollY > window.innerHeight * 0.6) {
      fab.classList.add("visible");
    } else {
      fab.classList.remove("visible");
    }
  }

  window.addEventListener("scroll", toggleFab, { passive: true });
  toggleFab();

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  }
  if (fab) fab.addEventListener("click", scrollToTop);
  if (footerToTop) footerToTop.addEventListener("click", scrollToTop);
})();