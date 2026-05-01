/**
 * KICK POVERTY — SHARED COMPONENTS
 * ==================================
 * Injects shared nav and footer HTML into each page.
 * Each page calls these functions after DOMContentLoaded.
 *
 * Usage:
 *   <div id="nav-placeholder"></div>
 *   <div id="footer-placeholder"></div>
 *   <script src="../js/components.js"></script>
 *   <script>injectNav('../'); injectFooter('../');</script>
 *
 * The basePath argument adjusts relative links for pages
 * inside subdirectories (e.g., pages/about.html → '../')
 */

/**
 * Inject the global navigation bar.
 * @param {string} base - path prefix for links ('' for root, '../' for subdirs)
 */
function injectNav (base) {
  base = base || '';
  const placeholder = document.getElementById('nav-placeholder');
  if (!placeholder) return;

  placeholder.innerHTML = `
    <!-- =====================================================
         NAVIGATION BAR
         Fixed top bar present on every page.
         Mobile: hamburger toggle | Tablet+: inline links
    ===================================================== -->
    <nav class="nav" role="navigation" aria-label="Main navigation">
      <div class="container">
        <div class="nav__inner">

          <!-- Brand / Logo -->
          <a href="${base}index.html" class="nav__brand" aria-label="Kick Poverty home">
            <span class="nav__brand-name">Kick Po</span>
            <span class="nav__brand-tag">Microfinance</span>
          </a>

          <!-- Mobile hamburger toggle -->
          <button class="nav__toggle" aria-label="Toggle menu" aria-expanded="false">
            <span></span>
            <span></span>
            <span></span>
          </button>

          <!-- Navigation menu -->
          <div class="nav__menu" id="nav-menu">
            <ul class="nav__links" role="list">
              <li><a href="${base}index.html"            class="nav__link">Home</a></li>
              <li><a href="${base}pages/about.html"      class="nav__link">About</a></li>
              <li><a href="${base}pages/services.html"   class="nav__link">Services</a></li>
              <li><a href="${base}pages/team.html"       class="nav__link">Team</a></li>
              <li><a href="${base}pages/investors.html"  class="nav__link">Invest</a></li>
              <li><a href="${base}pages/contact.html"    class="nav__link nav__cta btn btn--primary btn--sm">Contact Us</a></li>
            </ul>
          </div>

        </div>
      </div>
    </nav>
  `;
}

/**
 * Inject the global site footer.
 * @param {string} base - path prefix for links
 */
function injectFooter (base) {
  base = base || '';
  const placeholder = document.getElementById('footer-placeholder');
  if (!placeholder) return;

  placeholder.innerHTML = `
    <!-- =====================================================
         SITE FOOTER
         Three-column on desktop, stacked on mobile.
    ===================================================== -->
    <footer class="footer" role="contentinfo">
      <div class="container">

        <!-- Footer grid: brand | links | contact -->
        <div class="footer__grid">

          <!-- Brand column -->
          <div class="footer__col">
            <div class="footer__brand-name">Kick Poverty</div>
            <div class="footer__brand-tag">Microfinance Company</div>
            <p class="footer__desc">
              Empowering women and families through accessible,
              small-scale financial services in Sierra Leone.
            </p>
            <br>
            <span class="footer__badge">Fully Registered</span>
          </div>

          <!-- Quick links column -->
          <div class="footer__col">
            <h4 class="footer__heading">Quick Links</h4>
            <ul class="footer__links" role="list">
              <li><a href="${base}index.html"           class="footer__link">Home</a></li>
              <li><a href="${base}pages/about.html"     class="footer__link">About Us</a></li>
              <li><a href="${base}pages/services.html"  class="footer__link">Our Services</a></li>
              <li><a href="${base}pages/team.html"      class="footer__link">Our Team</a></li>
              <li><a href="${base}pages/investors.html" class="footer__link">Investors</a></li>
              <li><a href="${base}pages/contact.html"   class="footer__link">Contact</a></li>
            </ul>
          </div>

          <!-- Contact column -->
          <div class="footer__col">
            <h4 class="footer__heading">Contact</h4>
            <p class="footer__contact-line">
              Four Mile, Masiaka Highway<br>
              Newton, Waterloo<br>
              Western Area Rural District
            </p>
            <p class="footer__contact-line">
              Dr. Moses Simon<br>
              +232 30 651 955<br>
              +232 79 179 161 (WhatsApp)
            </p>
            <p class="footer__contact-line">
              Ms. Mariama Farmah<br>
              +232 80 462 376 (WhatsApp)
            </p>
          </div>

        </div>

        <!-- Bottom bar: copyright -->
        <div class="footer__bottom">
          <span>&copy; <span class="js-year"></span> Kick Poverty Microfinance Company. All rights reserved.</span>
          <span>Registered with the Corporate Affairs Commission</span>
        </div>

      </div>
    </footer>

    <!-- =====================================================
         BACK-TO-TOP BUTTON
         Appears on every page after scrolling down 300px.
         Clicking it scrolls back to #top smoothly.
    ===================================================== -->
    <button class="back-to-top" aria-label="Back to top" title="Back to top">
      <!-- Up arrow SVG -->
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <polyline points="18 15 12 9 6 15"></polyline>
      </svg>
    </button>
  `;
}
