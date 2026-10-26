/**
 * Main Controller - Vo Minh Kiet Portfolio
 * Pure Basic HTML, CSS & Vanilla JavaScript
 * Smooth Scroll Reveal Animations (Left, Right, Top, Up)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. Mobile Menu Navigation
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  // 3. Simple Vanilla JS Scroll Reveal Entrance Animations (Left, Right, Top, Up)
  const revealElements = document.querySelectorAll('.reveal-up, .reveal-down, .reveal-left, .reveal-right');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.95) {
      el.classList.add('is-revealed');
    } else {
      revealObserver.observe(el);
    }
  });

  // 4. Lightbox Photo Modal
  const modal = document.getElementById('photo-modal');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalClose = document.getElementById('modal-close');

  window.openPhotoModal = function (src, title, desc) {
    if (!modal) return;
    if (modalImg) modalImg.src = src;
    if (modalTitle) modalTitle.textContent = title;
    if (modalDesc) modalDesc.textContent = desc;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closePhotoModal = function () {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  };

  if (modalClose) {
    modalClose.addEventListener('click', window.closePhotoModal);
  }
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) window.closePhotoModal();
    });
  }

  // 5. Contact Copy Helper
  window.copyText = function (text, btnElement) {
    navigator.clipboard.writeText(text).then(() => {
      const origText = btnElement.innerText;
      btnElement.innerText = 'Đã sao chép!';
      setTimeout(() => {
        btnElement.innerText = origText;
      }, 2000);
    });
  };
});
