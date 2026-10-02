/**
 * Ashwini Kumar Singh (dwinsi) Portfolio — Apple Pro Design Engine
 * Seamless Theme Switching, Apple Segmented Filters & Interaction
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initSegmentedProjectFilters();
  initMobileMenu();
  initEmailCopy();
  initAppleScrollSpy();
  initFooterYear();
});

/**
 * Apple Theme Toggle (Pitch Black Pro Dark / Crisp Minimal Light)
 */
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;

  const savedTheme = localStorage.getItem('apple_theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const currentTheme = savedTheme || (prefersDark ? 'dark' : 'dark');

  document.documentElement.setAttribute('data-theme', currentTheme);

  toggleBtn.addEventListener('click', () => {
    const activeTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('apple_theme', newTheme);
  });
}

/**
 * Apple Segmented Control: Dynamic Project Filter
 */
function initSegmentedProjectFilters() {
  const filterBtns = document.querySelectorAll('.seg-btn');
  const projectCards = document.querySelectorAll('.apple-card');

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active state
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filterValue = btn.getAttribute('data-filter');

      // Filter cards with Apple-like subtle fade
      projectCards.forEach(card => {
        const categories = (card.getAttribute('data-category') || '').split(' ');
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.classList.remove('hidden');
          card.style.opacity = '0';
          card.style.transform = 'scale(0.98)';
          setTimeout(() => {
            card.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 20);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

/**
 * Apple Mobile Navigation
 */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const navList = document.getElementById('apple-nav-list');

  if (!menuBtn || !navList) return;

  menuBtn.addEventListener('click', () => {
    const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', !isExpanded);
    navList.classList.toggle('mobile-open');
  });

  navList.querySelectorAll('.nav-item').forEach(link => {
    link.addEventListener('click', () => {
      menuBtn.setAttribute('aria-expanded', 'false');
      navList.classList.remove('mobile-open');
    });
  });
}

/**
 * Apple 1-Click Email Copy with Centered Pill Toast
 */
function initEmailCopy() {
  const copyButtons = [
    document.getElementById('hero-copy-email-btn'),
    document.getElementById('footer-copy-email-btn')
  ].filter(Boolean);

  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');
  let toastTimer;

  function showAppleToast(message) {
    if (!toast) return;
    if (toastMsg) toastMsg.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  copyButtons.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const email = btn.getAttribute('data-email') || 'ashwini.kr.singh.020@gmail.com';
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(email);
        } else {
          const textarea = document.createElement('textarea');
          textarea.value = email;
          textarea.style.position = 'fixed';
          textarea.style.left = '-999999px';
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
        }
        showAppleToast('Copied email to clipboard');
      } catch (err) {
        showAppleToast(`Email: ${email}`);
      }
    });
  });
}

/**
 * Apple Navigation Active Link Highlighting (ScrollSpy)
 */
function initAppleScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-item');

  if (!sections.length || !navItems.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navItems.forEach(item => {
          if (item.getAttribute('href') === `#${id}`) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(sec => observer.observe(sec));
}

/**
 * Dynamic Year in Footer
 */
function initFooterYear() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
