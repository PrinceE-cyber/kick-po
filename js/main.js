/**
 * ============================================================
 * CHEND & KICK POVERTY MICROFINANCE — MAIN JAVASCRIPT
 * Shared functionality: navbar, scroll reveal, animations
 * ============================================================
 */

/* ─── DOM READY ─── */
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollReveal();
  initStickyNav();
  setActiveNavLink();
  initCounterAnimation();
});

/* ─────────────────────────────────────────────
   NAVBAR — mobile hamburger toggle
   ───────────────────────────────────────────── */
function initNavbar() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open', isOpen);

    // Prevent body scroll when menu is open
    document.body.style.overflow = isOpen ? 'hidden' : '';

    // Accessibility: update aria attributes
    hamburger.setAttribute('aria-expanded', isOpen);
    mobileMenu.setAttribute('aria-hidden', !isOpen);
  });

  // Close mobile menu when a link is clicked
  mobileMenu.querySelectorAll('.navbar__mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Close mobile menu on outside click
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}

/* ─────────────────────────────────────────────
   STICKY NAV — add "scrolled" class on scroll
   ───────────────────────────────────────────── */
function initStickyNav() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // Run once on load
}

/* ─────────────────────────────────────────────
   ACTIVE NAV LINK — highlight current page
   ───────────────────────────────────────────── */
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.navbar__link, .navbar__mobile-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* ─────────────────────────────────────────────
   SCROLL REVEAL — animate elements into view
   Uses IntersectionObserver for performance
   ───────────────────────────────────────────── */
function initScrollReveal() {
  // All elements with the .reveal class will animate in
  const revealElements = document.querySelectorAll('.reveal');

  if (!revealElements.length) return;

  // IntersectionObserver fires when element enters viewport
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Stop observing once revealed (one-time animation)
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,      // Trigger when 12% of element is visible
      rootMargin: '0px 0px -40px 0px'  // Small offset from bottom
    }
  );

  revealElements.forEach(el => observer.observe(el));
}

/* ─────────────────────────────────────────────
   COUNTER ANIMATION — animates stat numbers
   Looks for elements with data-count attribute
   ───────────────────────────────────────────── */
function initCounterAnimation() {
  const counters = document.querySelectorAll('[data-count]');

  if (!counters.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(el => observer.observe(el));
}

/**
 * Animate a number counter from 0 to target value.
 * @param {HTMLElement} el - Element with data-count="<number>" attribute
 */
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-count'), 10);
  const suffix = el.getAttribute('data-suffix') || '';
  const duration = 1800; // ms
  const start = performance.now();

  const update = (timestamp) => {
    const elapsed = timestamp - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease-out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);
    el.textContent = current.toLocaleString() + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target.toLocaleString() + suffix;
    }
  };

  requestAnimationFrame(update);
}

/* ─────────────────────────────────────────────
   CONTACT FORM — basic validation & feedback
   ───────────────────────────────────────────── */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Collect form values
    const name    = form.querySelector('[name="name"]')?.value.trim();
    const email   = form.querySelector('[name="email"]')?.value.trim();
    const message = form.querySelector('[name="message"]')?.value.trim();

    // Simple required-field validation
    if (!name || !email || !message) {
      showFormMessage(form, 'Please fill in all required fields.', 'error');
      return;
    }

    // Email format check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showFormMessage(form, 'Please enter a valid email address.', 'error');
      return;
    }

    // Success state (in a real deployment this would POST to a server)
    showFormMessage(form, '✓ Thank you! Your message has been received. We will be in touch shortly.', 'success');
    form.reset();
  });
}

/**
 * Display a success or error message below the form.
 * @param {HTMLFormElement} form
 * @param {string} message
 * @param {'success'|'error'} type
 */
function showFormMessage(form, message, type) {
  // Remove any existing message
  const existing = form.querySelector('.form-message');
  if (existing) existing.remove();

  const div = document.createElement('div');
  div.className = 'form-message';
  div.textContent = message;
  div.style.cssText = `
    margin-top: 1rem;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    font-size: 0.875rem;
    font-weight: 500;
    ${type === 'success'
      ? 'background: #dcfce7; color: #15803d; border: 1px solid #86efac;'
      : 'background: #fee2e2; color: #dc2626; border: 1px solid #fca5a5;'
    }
  `;

  form.appendChild(div);

  // Auto-remove after 6 seconds
  setTimeout(() => div.remove(), 6000);
}

/* Call contact form init if on the contact page */
document.addEventListener('DOMContentLoaded', initContactForm);

/* ─────────────────────────────────────────────
   SMOOTH SCROLL — for anchor links on same page
   ───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (!target) return;

      e.preventDefault();
      const navHeight = parseInt(getComputedStyle(document.documentElement)
        .getPropertyValue('--nav-height'), 10) || 72;

      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - navHeight - 16,
        behavior: 'smooth'
      });
    });
  });
});

/* ─────────────────────────────────────────────
   YEAR — auto-update copyright year in footer
   ───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
