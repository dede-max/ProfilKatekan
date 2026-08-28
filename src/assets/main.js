import './main.css';

document.addEventListener('DOMContentLoaded', () => {

  // ── Mobile menu ──────────────────────────────────────────────
  const menuBtn    = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      const open = !mobileMenu.classList.contains('hidden');
      mobileMenu.classList.toggle('hidden', open);
      menuBtn.setAttribute('aria-expanded', String(!open));
    });
  }

  // ── Navbar scroll effect ────────────────────────────────────
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const onScroll = () => {
      if (window.scrollY > 60) {
        navbar.classList.add('shadow-lg', 'bg-white/95', 'backdrop-blur-sm');
      } else {
        navbar.classList.remove('shadow-lg', 'bg-white/95', 'backdrop-blur-sm');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // ── Flash auto-dismiss ───────────────────────────────────────
  document.querySelectorAll('.flash-msg').forEach(el => {
    setTimeout(() => {
      el.style.transition = 'opacity .3s, transform .3s';
      el.style.opacity    = '0';
      el.style.transform  = 'translateY(-8px)';
      setTimeout(() => el.remove(), 350);
    }, 4000);

    el.querySelector('.flash-close')?.addEventListener('click', () => el.remove());
  });

  // ── Image preview for file inputs ────────────────────────────
  document.querySelectorAll('[data-preview]').forEach(input => {
    input.addEventListener('change', function () {
      const previewId = this.dataset.preview;
      const preview   = document.getElementById(previewId);
      if (preview && this.files?.[0]) {
        const reader = new FileReader();
        reader.onload = e => {
          preview.src = e.target.result;
          preview.classList.remove('hidden');
        };
        reader.readAsDataURL(this.files[0]);
      }
    });
  });

  // ── Confirm delete ───────────────────────────────────────────
  document.querySelectorAll('form[data-confirm]').forEach(form => {
    form.addEventListener('submit', e => {
      const msg = form.dataset.confirm || 'Yakin ingin menghapus? Tindakan ini tidak bisa dibatalkan.';
      if (!confirm(msg)) e.preventDefault();
    });
  });

  // ── Smooth scroll for anchor links ───────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ── Lightbox (GLightbox) ─────────────────────────────────────
  if (typeof GLightbox !== 'undefined') {
    GLightbox({ selector: '.glightbox', touchNavigation: true, loop: true });
  }

  // ── AOS ──────────────────────────────────────────────────────
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 700, once: true, offset: 80 });
  }

});
