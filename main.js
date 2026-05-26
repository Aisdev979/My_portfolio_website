'use strict';

    /* ──────────────────────────────────────────────
       CONSTANTS & HELPERS
    ────────────────────────────────────────────── */
    const $ = (sel, ctx = document) => ctx.querySelector(sel);
    const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

    /* ──────────────────────────────────────────────
       DYNAMIC YEAR
    ────────────────────────────────────────────── */
    const yearEl = $('#footer-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* ──────────────────────────────────────────────
       TYPING ANIMATION
    ────────────────────────────────────────────── */
    (function initTyper() {
      const el = $('#typed-text');
      if (!el) return;

      const phrases = [
        'Full Stack Developer',
        'React & Node.js Engineer',
        'Cloud Architect',
        'API Designer',
        'Open Source Enthusiast',
      ];

      let phraseIdx = 0;
      let charIdx = 0;
      let isDeleting = false;
      let isPaused = false;

      function type() {
        const phrase = phrases[phraseIdx];
        if (isPaused) { isPaused = false; setTimeout(type, 1500); return; }

        if (!isDeleting) {
          el.textContent = phrase.substring(0, charIdx + 1);
          charIdx++;
          if (charIdx === phrase.length) { isDeleting = true; isPaused = true; setTimeout(type, 100); return; }
        } else {
          el.textContent = phrase.substring(0, charIdx - 1);
          charIdx--;
          if (charIdx === 0) {
            isDeleting = false;
            phraseIdx = (phraseIdx + 1) % phrases.length;
          }
        }

        setTimeout(type, isDeleting ? 50 : 80);
      }

      setTimeout(type, 800);
    }());

    /* ──────────────────────────────────────────────
       NAV SCROLL BEHAVIOR
    ────────────────────────────────────────────── */
    (function initNav() {
      const header = $('#site-header');
      const navLinks = $$('.nav__link');
      const sections = $$('section[id]');

      // Scrolled class
      function onScroll() {
        header.classList.toggle('scrolled', window.scrollY > 20);

        // Active link highlight
        let current = '';
        sections.forEach(sec => {
          const top = sec.offsetTop - 120;
          if (window.scrollY >= top) current = sec.id;
        });
        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          link.classList.toggle('active', href === `#${current}`);
        });
      }

      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();

      // Smooth close mobile nav on link click
      $$('.nav__mobile .nav__link').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
      });
    }());

    /* ──────────────────────────────────────────────
       HAMBURGER MENU
    ────────────────────────────────────────────── */
    const hamburger = $('#hamburger-btn');
    const mobileMenu = $('#mobile-menu');

    function openMobileMenu() {
      mobileMenu.classList.add('open');
      mobileMenu.setAttribute('aria-hidden', 'false');
      hamburger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
      mobileMenu.classList.remove('open');
      mobileMenu.setAttribute('aria-hidden', 'true');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    hamburger?.addEventListener('click', () => {
      const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
      isOpen ? closeMobileMenu() : openMobileMenu();
    });

    // Close on Escape
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && mobileMenu?.classList.contains('open')) closeMobileMenu();
    });

    /* ──────────────────────────────────────────────
       SCROLL REVEAL
    ────────────────────────────────────────────── */
    (function initReveal() {
      const revealEls = $$('.reveal');
      if (!revealEls.length) return;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            // Stagger siblings
            const siblings = $$('.reveal', entry.target.parentElement);
            const idx = siblings.indexOf(entry.target);
            entry.target.style.transitionDelay = `${idx * 80}ms`;
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

      revealEls.forEach(el => observer.observe(el));
    }());

    /* ──────────────────────────────────────────────
       BACK TO TOP
    ────────────────────────────────────────────── */
    (function initBackToTop() {
      const btn = $('#back-to-top');
      if (!btn) return;

      window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 400);
      }, { passive: true });

      btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }());

    /* ──────────────────────────────────────────────
       CONTACT FORM VALIDATION
    ────────────────────────────────────────────── */
    (function initForm() {
      const form     = $('#contact-form');
      const success  = $('#form-success');
      const submitBtn = $('#form-submit-btn');
      if (!form) return;

      function setError(groupId, show) {
        const g = $(`#${groupId}`);
        if (g) g.classList.toggle('has-error', show);
      }

      function validateEmail(val) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
      }

      function sanitize(str) {
        // Basic XSS sanitisation — strip tags
        return str.replace(/<[^>]*>/g, '').trim();
      }

      form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Honeypot check
        if (form.querySelector('#website')?.value) return;

        const name    = sanitize(form.name.value);
        const email   = sanitize(form.email.value);
        const message = sanitize(form.message.value);

        let valid = true;

        setError('fg-name',    !name);
        setError('fg-email',   !validateEmail(email));
        setError('fg-message', message.length < 10);

        if (!name || !validateEmail(email) || message.length < 10) valid = false;

        if (!valid) {
          // Focus first error
          const firstErr = $$('.has-error')[0];
          firstErr?.querySelector('input, textarea')?.focus();
          return;
        }

        // Simulate submission
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending…';

        setTimeout(() => {
          form.style.display = 'none';
          success.classList.add('show');
        }, 1200);
      });

      // Live validation — clear error on input
      $$('.form-input, .form-textarea', form).forEach(input => {
        input.addEventListener('input', () => {
          const group = input.closest('.form-group');
          if (group?.classList.contains('has-error')) {
            group.classList.remove('has-error');
          }
        });
      });
    }());

    /* ──────────────────────────────────────────────
       KEYBOARD TRAP — Mobile Menu Accessibility
    ────────────────────────────────────────────── */
    (function initFocusTrap() {
      mobileMenu?.addEventListener('keydown', function(e) {
        if (e.key !== 'Tab') return;
        const focusable = $$('a, button', mobileMenu).filter(el => !el.disabled);
        const first = focusable[0];
        const last  = focusable[focusable.length - 1];
        if (e.shiftKey ? document.activeElement === first : document.activeElement === last) {
          e.preventDefault();
          (e.shiftKey ? last : first).focus();
        }
      });
    }());