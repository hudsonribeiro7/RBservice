/**
 * RB Service — main.js
 * Hudson Ribeiro | Reformas de Alto Padrão + Desenvolvimento de Sistemas
 */

'use strict';

/* ============================================================
   CUSTOM CURSOR
============================================================ */
(function initCursor() {
  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  // Interactable elements trigger cursor expansion
  const interactables = 'a, button, [role="button"], .c-card, .upload-area, .srv-card';

  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(interactables)) {
      document.body.classList.add('cursor-hover');
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(interactables)) {
      document.body.classList.remove('cursor-hover');
    }
  });

  // Smooth lag on ring
  (function animRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animRing);
  })();
})();

/* ============================================================
   MOBILE MENU
============================================================ */
(function initMobileMenu() {
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const overlay    = document.getElementById('overlay');
  const menuClose  = document.getElementById('menuClose');

  if (!hamburger || !mobileMenu) return;

  function openMenu() {
    mobileMenu.classList.add('open');
    overlay.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    menuClose.focus();
  }

  function closeMenu() {
    mobileMenu.classList.remove('open');
    overlay.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }

  hamburger.addEventListener('click', openMenu);
  menuClose.addEventListener('click', closeMenu);
  overlay.addEventListener('click', closeMenu);

  // Close on any link click
  mobileMenu.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', closeMenu);
  });

  // Keyboard: Escape to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) closeMenu();
  });
})();

/* ============================================================
   NAVBAR — scroll style + active link
============================================================ */
(function initNavbar() {
  const navEl    = document.querySelector('nav');
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id]');

  if (!navEl) return;

  function updateNav() {
    // Scrolled style
    navEl.classList.toggle('scrolled', window.scrollY > 60);

    // Active link
    let current = '';
    sections.forEach((s) => {
      if (window.scrollY >= s.offsetTop - 220) current = s.id;
    });

    navLinks.forEach((a) => {
      const href = a.getAttribute('href');
      if (href === '#' + current) {
        a.classList.add('active');
      } else {
        a.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();
})();

/* ============================================================
   SCROLL REVEAL
============================================================ */
(function initReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target); // fire once
        }
      });
    },
    { threshold: 0.12 }
  );

  reveals.forEach((el) => io.observe(el));
})();

/* ============================================================
   MULTI-STEP FORM
============================================================ */
(function initForm() {
  const TOTAL_STEPS = 3;
  let currentStep = 1;

  const steps    = [];
  const progress = document.querySelectorAll('.form-progress-dot');
  const success  = document.getElementById('formSuccess');

  for (let i = 1; i <= TOTAL_STEPS; i++) {
    steps.push(document.getElementById('step' + i));
  }

  if (!steps[0] || !progress.length) return;

  /** Update progress bar */
  function updateProgress(step) {
    progress.forEach((dot, i) => {
      dot.classList.toggle('active', i < step);
    });

    const bar = document.getElementById('formProgress');
    if (bar) {
      bar.setAttribute('aria-valuenow', step);
    }
  }

  /** Animate between steps */
  function goToStep(from, to) {
    const fromEl = steps[from - 1];
    const toEl   = steps[to - 1];
    if (!fromEl || !toEl) return;

    fromEl.classList.remove('active');
    toEl.classList.add('active');
    currentStep = to;
    updateProgress(to);

    // Scroll form card into view on mobile
    fromEl.closest('.form-card')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  /** Simple Validation */
  function validateStep(step) {
    const inputs = steps[step - 1].querySelectorAll('input[required], select[required], textarea[required]');
    let valid = true;
    inputs.forEach(input => {
      if (!input.value.trim()) valid = false;
    });
    return valid;
  }

  /** Next buttons */
  document.getElementById('next1')?.addEventListener('click', () => {
    goToStep(1, 2);
  });

  document.getElementById('next2')?.addEventListener('click', () => {
    goToStep(2, 3);
  });

  /** Prev buttons */
  document.getElementById('prev2')?.addEventListener('click', () => {
    goToStep(2, 1);
  });

  document.getElementById('prev3')?.addEventListener('click', () => {
    goToStep(3, 2);
  });

  /** File upload feedback */
  const uploadInput = document.getElementById('f-upload');
  const uploadArea  = document.getElementById('uploadArea');
  const uploadText  = document.getElementById('uploadText');

  if (uploadArea && uploadInput) {
    uploadArea.addEventListener('click', () => uploadInput.click());

    uploadArea.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') uploadInput.click();
    });

    uploadInput.addEventListener('change', () => {
      const files = Array.from(uploadInput.files);
      if (!files.length) return;
      const names = files.map((f) => f.name).join(', ');
      if (uploadText) {
        uploadText.innerHTML =
          `<strong style="color:var(--lime)">${files.length} arquivo(s) selecionado(s)</strong><br><small>${names}</small>`;
      }
    });

    // Drag-and-drop
    uploadArea.addEventListener('dragover', (e) => {
      e.preventDefault();
      uploadArea.style.borderColor = 'var(--coral)';
    });

    uploadArea.addEventListener('dragleave', () => {
      uploadArea.style.borderColor = '';
    });

    uploadArea.addEventListener('drop', (e) => {
      e.preventDefault();
      uploadArea.style.borderColor = '';
      uploadInput.files = e.dataTransfer.files;
      uploadInput.dispatchEvent(new Event('change'));
    });
  }

  /** Submit — build WhatsApp message and show success */
  document.getElementById('submitBtn')?.addEventListener('click', () => {
    if (!validateStep(3)) {
      alert('Por favor, preencha a descrição do projeto.');
      return;
    }

    const nome    = document.getElementById('f-nome')?.value.trim()    || 'Não informado';
    const tel     = document.getElementById('f-tel')?.value.trim()     || 'Não informado';
    const servico = document.getElementById('f-servico')?.value        || 'Não informado';
    const prazo   = document.getElementById('f-prazo')?.value          || 'Não informado';
    const metragem= document.getElementById('f-metragem')?.value       || 'Não informado';
    const desc    = document.getElementById('f-desc')?.value.trim()    || '';

    const msg = encodeURIComponent(
      `Olá, Hudson! Vim pelo site.\n\n` +
      `👤 Nome: ${nome}\n` +
      `📱 Telefone: ${tel}\n` +
      `🔧 Serviço: ${servico}\n` +
      `📐 Metragem: ${metragem}m²\n` +
      `📅 Prazo: ${prazo}\n\n` +
      (desc ? `📝 Detalhes:\n${desc}` : '')
    );

    // Show success state
    if (steps[2]) steps[2].classList.remove('active');
    if (success)  {
      success.style.display = 'block';
      success.focus?.();
    }
    updateProgress(TOTAL_STEPS);

    // Open WhatsApp after brief delay
    setTimeout(() => {
      window.open('https://wa.me/5548984927764?text=' + msg, '_blank', 'noopener,noreferrer');
    }, 1200);
  });
})();

/* ============================================================
   CAROUSEL — pause on focus (keyboard accessibility)
============================================================ */
(function initCarousel() {
  const track = document.querySelector('.carousel-track');
  if (!track) return;

  // Pause when any card receives focus (keyboard nav)
  track.querySelectorAll('.c-card').forEach((card) => {
    card.setAttribute('tabindex', '0');

    card.addEventListener('focus', () => {
      track.style.animationPlayState = 'paused';
    });

    card.addEventListener('blur', () => {
      track.style.animationPlayState = '';
    });
  });
})();

/* ============================================================
   SMOOTH SCROLL for anchor links
============================================================ */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});


