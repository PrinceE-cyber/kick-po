/**
 * KICK POVERTY (KICK PO) — MAIN JAVASCRIPT
 * =========================================
 * Handles:
 *   1. Mobile navigation toggle
 *   2. Sticky nav shadow on scroll
 *   3. Active nav link highlighting
 *   4. Back-to-top button show/hide + click
 *   5. Scroll-triggered reveal animations (Intersection Observer)
 *   6. Current year in footer copyright
 *
 * No external dependencies — vanilla JS only.
 * All DOM queries use null checks to be safe across pages.
 */

(function () {
  'use strict';

  /* --------------------------------------------------------
     UTILITY: Wait for DOM to be ready
  -------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', init);

  function init () {
    initNav();
    initBackToTop();
    initScrollReveal();
    initFooterYear();
    initActiveNavLink();
  }


  /* --------------------------------------------------------
     1. MOBILE NAVIGATION
     Toggles the mobile menu open/closed.
     Adds 'open' class to both toggle button and menu panel.
     Closes menu when a link is clicked (smooth UX on mobile).
  -------------------------------------------------------- */
  function initNav () {
    const toggle = document.querySelector('.nav__toggle');
    const menu   = document.querySelector('.nav__menu');
    const links  = document.querySelectorAll('.nav__link');

    if (!toggle || !menu) return;

    // Toggle button click
    toggle.addEventListener('click', function () {
      const isOpen = menu.classList.contains('open');
      menu.classList.toggle('open');
      toggle.classList.toggle('open');
      // Update ARIA attribute for accessibility
      toggle.setAttribute('aria-expanded', !isOpen);
    });

    // Close menu when any link is clicked (mobile UX)
    links.forEach(function (link) {
      link.addEventListener('click', function () {
        menu.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu when clicking outside on mobile
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.nav') && menu.classList.contains('open')) {
        menu.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }


  /* --------------------------------------------------------
     2. STICKY NAV SHADOW
     Adds .scrolled class to nav once the user has scrolled
     past 10px, triggering a subtle drop shadow in CSS.
  -------------------------------------------------------- */
  (function initNavScroll () {
    const nav = document.querySelector('.nav');
    if (!nav) return;

    function onScroll () {
      if (window.scrollY > 10) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // Run on load in case page is already scrolled
  })();


  /* --------------------------------------------------------
     3. ACTIVE NAV LINK
     Marks the current page's nav link as active by comparing
     the link href to the current URL pathname.
  -------------------------------------------------------- */
  function initActiveNavLink () {
    const links = document.querySelectorAll('.nav__link');
    const current = window.location.pathname.split('/').pop() || 'index.html';

    links.forEach(function (link) {
      const href = link.getAttribute('href');
      // Match exact page or index (root path → index.html)
      if (href === current || (current === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  }


  /* --------------------------------------------------------
     4. BACK-TO-TOP BUTTON
     Shows the button after the user scrolls 300px down.
     Clicking it smoothly scrolls back to the top.
  -------------------------------------------------------- */
  function initBackToTop () {
    const btn = document.querySelector('.back-to-top');
    if (!btn) return;

    const SCROLL_THRESHOLD = 300; // px before button appears

    // Show / hide based on scroll position
    function onScroll () {
      if (window.scrollY > SCROLL_THRESHOLD) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // Evaluate immediately on load

    // Click → scroll to top
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


  /* --------------------------------------------------------
     5. SCROLL-TRIGGERED REVEAL ANIMATIONS
     Uses IntersectionObserver to add 'visible' class to
     elements with class 'reveal' or 'reveal-stagger' as
     they enter the viewport. CSS handles the animation.
  -------------------------------------------------------- */
  function initScrollReveal () {
    // Exit gracefully if browser doesn't support IntersectionObserver
    if (!('IntersectionObserver' in window)) {
      // Fallback: make everything visible immediately
      document.querySelectorAll('.reveal, .reveal-stagger').forEach(function (el) {
        el.classList.add('visible');
      });
      return;
    }

    const options = {
      root: null,            // Observe relative to viewport
      rootMargin: '0px',
      threshold: 0.12        // Trigger when 12% of element is visible
    };

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Once revealed, stop observing to save resources
          observer.unobserve(entry.target);
        }
      });
    }, options);

    // Observe all elements with reveal classes
    document.querySelectorAll('.reveal, .reveal-stagger').forEach(function (el) {
      observer.observe(el);
    });
  }


  /* --------------------------------------------------------
     6. FOOTER YEAR
     Dynamically inserts the current year into any element
     with the class 'js-year', so copyright is always current.
  -------------------------------------------------------- */
  function initFooterYear () {
    const yearEls = document.querySelectorAll('.js-year');
    const year = new Date().getFullYear();
    yearEls.forEach(function (el) {
      el.textContent = year;
    });
  }

})();
