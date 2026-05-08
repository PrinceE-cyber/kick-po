/**
 * CHEN & KICK POVERTY MICROFINANCE — SHARED JAVASCRIPT
 * Handles: sticky nav shadow, mobile menu toggle, scroll animations
 * Pure vanilla JS — no frameworks or libraries
 */

(function () {
  'use strict';

  /* ── 1. NAVBAR: scrolled class + shadow ──────────────────── */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const onScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // Run once on load
  }

  /* ── 2. MOBILE HAMBURGER TOGGLE ──────────────────────────── */
  const hamburger = document.querySelector('.navbar__hamburger');
  const navLinks  = document.querySelector('.navbar__links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      navLinks.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));

      // Prevent body scroll when menu is open on mobile
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu when any nav link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target)) {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  /* ── 3. SCROLL-IN ANIMATIONS ─────────────────────────────── */
  // All elements with class "animate-in" fade up when they enter viewport
  const animatedEls = document.querySelectorAll('.animate-in');

  if (animatedEls.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Animate once only
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    animatedEls.forEach(el => observer.observe(el));
  } else {
    // Fallback: just show everything if IntersectionObserver not supported
    animatedEls.forEach(el => el.classList.add('visible'));
  }

  /* ── 4. STAGGER ANIMATION DELAYS FOR CARD GRIDS ──────────── */
  // Applies incremental animation-delay to children of .stagger-grid
  document.querySelectorAll('.stagger-grid').forEach(grid => {
    Array.from(grid.children).forEach((child, i) => {
      child.style.transitionDelay = `${i * 80}ms`;
    });
  });

  /* ── 5. ACTIVE NAV LINK BASED ON CURRENT PAGE ────────────── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar__links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ── 6. SMOOTH SCROLL FOR ANCHOR LINKS ───────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navH = parseInt(
          getComputedStyle(document.documentElement).getPropertyValue('--nav-height'),
          10
        ) || 68;
        const top = target.getBoundingClientRect().top + window.scrollY - navH - 16;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

})();
