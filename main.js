/**
 * MOHAMMED ANSIL CK — LUXURY PORTFOLIO SCRIPT
 * Theme: Cream + Brown Luxury Aesthetic
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. DYNAMIC COPYRIGHT YEAR
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. STICKY HEADER SCROLL EFFECT
  const siteHeader = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  }, { passive: true });

  // 3. MOBILE MENU DRAWER
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerCloseBtn = document.getElementById('drawerCloseBtn');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  const openDrawer = () => {
    if (mobileDrawer) mobileDrawer.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    if (mobileDrawer) mobileDrawer.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openDrawer);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // Close drawer when clicking outside
  document.addEventListener('click', (e) => {
    if (mobileDrawer && mobileDrawer.classList.contains('open')) {
      if (!mobileDrawer.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        closeDrawer();
      }
    }
  });

  // 4. ACTIVE NAVIGATION LINK SPY
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.desktop-nav .nav-link');

  const onScrollSpy = () => {
    const scrollPos = window.pageYOffset + 140;
    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        desktopNavLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };
  window.addEventListener('scroll', onScrollSpy, { passive: true });

  // 5. HERO PORTRAIT 3D MOUSE PARALLAX & GLASS SHEEN
  const heroStage = document.getElementById('heroCardStage');
  const portraitFrame = heroStage ? heroStage.querySelector('.portrait-card-frame') : null;
  const portraitSheen = document.getElementById('portraitSheen');

  if (heroStage && portraitFrame) {
    heroStage.addEventListener('mousemove', (e) => {
      const rect = heroStage.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const deltaX = (x - centerX) / centerX;
      const deltaY = (y - centerY) / centerY;

      portraitFrame.style.transform = `perspective(1000px) rotateY(${deltaX * 6}deg) rotateX(${-deltaY * 6}deg) scale3d(1.02, 1.02, 1.02)`;

      if (portraitSheen) {
        portraitSheen.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.45) 0%, rgba(107, 66, 47, 0.12) 35%, transparent 65%)`;
      }
    });

    heroStage.addEventListener('mouseleave', () => {
      portraitFrame.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)';
      if (portraitSheen) {
        portraitSheen.style.background = 'transparent';
      }
    });
  }

  // 6. PORTFOLIO FILTER TABS
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 7. LIGHTBOX MODAL FOR PORTFOLIO
  const projectModal = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalImg = document.getElementById('modalImg');
  const modalVideo = document.getElementById('modalVideo');
  const modalTag = document.getElementById('modalTag');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalTools = document.getElementById('modalTools');

  const openProjectModal = (card) => {
    const title = card.getAttribute('data-title');
    const tag = card.getAttribute('data-tag');
    const desc = card.getAttribute('data-desc');
    const tools = card.getAttribute('data-tools');
    const imgSrc = card.getAttribute('data-img');
    const videoSrc = card.getAttribute('data-video');

    if (modalTitle) modalTitle.textContent = title;
    if (modalTag) modalTag.textContent = tag;
    if (modalDesc) modalDesc.textContent = desc;
    if (modalTools) modalTools.textContent = tools;

    if (videoSrc && modalVideo) {
      if (modalImg) modalImg.style.display = 'none';
      modalVideo.style.display = 'block';
      modalVideo.src = videoSrc;
      modalVideo.currentTime = 0;
      modalVideo.play().catch(() => {});
    } else {
      if (modalVideo) {
        modalVideo.pause();
        modalVideo.style.display = 'none';
        modalVideo.src = '';
      }
      if (modalImg) {
        modalImg.style.display = 'block';
        modalImg.src = imgSrc || '';
        modalImg.alt = title || 'Project Preview';
      }
    }

    if (projectModal) {
      projectModal.classList.add('active');
      projectModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeProjectModal = () => {
    if (modalVideo) {
      modalVideo.pause();
      modalVideo.src = '';
    }
    if (projectModal) {
      projectModal.classList.remove('active');
      projectModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  };

  projectCards.forEach(card => {
    const quickViewBtn = card.querySelector('.btn-quick-view');
    if (quickViewBtn) {
      quickViewBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openProjectModal(card);
      });
    }
    card.addEventListener('click', () => {
      openProjectModal(card);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);

  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) {
        closeProjectModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProjectModal();
      closeDrawer();
    }
  });

  // 8. SUBTLE SCROLL-REVEAL ENTRANCE FOR PORTFOLIO
  const portfolioGrid = document.getElementById('portfolioGrid');
  if (portfolioGrid && 'IntersectionObserver' in window) {
    const cards = portfolioGrid.querySelectorAll('.project-card');
    cards.forEach((card, index) => {
      card.classList.add('reveal-init');
      card.style.transitionDelay = `${(index % 3) * 110}ms`;
    });

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    cards.forEach(card => observer.observe(card));
  }

});
