/**
 * MOHAMMED ANSIL CK — DARK EDITORIAL OBSIDIAN PORTFOLIO SCRIPT
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. DYNAMIC COPYRIGHT YEAR
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. SCROLL PROGRESS BAR, HEADER STATE & ACTIVE NAV SPY
  const siteHeader = document.getElementById('header');
  const progressBar = document.getElementById('scrollProgressBar');
  const sections = document.querySelectorAll('section[id], footer[id]');
  const desktopNavLinks = document.querySelectorAll('.desktop-nav .nav-link');

  const onScrollUpdate = () => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? Math.min(100, Math.max(0, (scrollY / docHeight) * 100)) : 0;

    if (progressBar) {
      progressBar.style.width = `${pct.toFixed(2)}%`;
    }

    if (siteHeader) {
      siteHeader.classList.toggle('scrolled', scrollY > 30);
    }

    // Active Navigation Spy
    const probeY = scrollY + 180;
    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');
      if (probeY >= top && probeY < top + height) {
        desktopNavLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  };

  window.addEventListener('scroll', onScrollUpdate, { passive: true });
  onScrollUpdate();

  // 3. MOBILE NAVIGATION DRAWER
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerCloseBtn = document.getElementById('drawerCloseBtn');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  const openDrawer = () => {
    if (!mobileDrawer) return;
    mobileDrawer.classList.add('open');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    if (!mobileDrawer) return;
    mobileDrawer.classList.remove('open');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openDrawer);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
  mobileLinks.forEach(link => link.addEventListener('click', closeDrawer));

  document.addEventListener('click', (e) => {
    if (mobileDrawer && mobileDrawer.classList.contains('open')) {
      if (!mobileDrawer.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        closeDrawer();
      }
    }
  });

  // 4. HERO SUBTLE DEPTH PARALLAX ON DESKTOP MOUSE MOVE
  const heroSection = document.getElementById('home');
  const heroWordmark = document.getElementById('heroWordmarkLayer');
  const heroSubject = document.getElementById('heroSubjectLayer');

  if (heroSection && heroWordmark && heroSubject && window.matchMedia('(pointer: fine)').matches) {
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;

      heroWordmark.style.transform = `translate3d(${-nx * 14}px, calc(-48% + ${-ny * 10}px), 0)`;
      heroSubject.style.transform = `translate3d(calc(-50% + ${nx * 10}px), ${ny * 6}px, 0)`;
    });

    heroSection.addEventListener('mouseleave', () => {
      heroWordmark.style.transform = 'translate3d(0, -48%, 0)';
      heroSubject.style.transform = 'translate3d(-50%, 0, 0)';
    });
  }

  // 5. SERVICES ACCORDION (WHAT I CAN DO)
  const serviceRows = document.querySelectorAll('.service-row');
  serviceRows.forEach(row => {
    const trigger = row.querySelector('.service-row-trigger');
    const panel = row.querySelector('.service-row-panel');
    if (!trigger || !panel) return;

    trigger.addEventListener('click', () => {
      const isOpen = row.classList.contains('open');

      serviceRows.forEach(other => {
        other.classList.remove('open');
        const otherBtn = other.querySelector('.service-row-trigger');
        const otherPanel = other.querySelector('.service-row-panel');
        if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        if (otherPanel) otherPanel.style.maxHeight = null;
      });

      if (!isOpen) {
        row.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
        panel.style.maxHeight = `${panel.scrollHeight}px`;
      }
    });
  });

  // 6. PORTFOLIO FILTERING, INLINE VIDEO CONTROLS & DETAILS DRAWERS
  const filterBtns = document.querySelectorAll('.filter-btn');
  const workCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');

      workCards.forEach(card => {
        const category = card.getAttribute('data-category');
        const visible = filter === 'all' || category === filter;
        card.style.display = visible ? 'grid' : 'none';
      });
    });
  });

  workCards.forEach(card => {
    const video = card.querySelector('.work-video');
    const playBtn = card.querySelector('.toggle-play');
    const muteBtn = card.querySelector('.toggle-mute');
    const detailsAcc = card.querySelector('.work-details-accordion');
    const detailsBtn = card.querySelector('.details-toggle-btn');

    if (playBtn && video) {
      playBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (video.paused) {
          video.play().catch(() => {});
          playBtn.innerHTML = '<i class="fa-solid fa-pause"></i> <span>Pause</span>';
        } else {
          video.pause();
          playBtn.innerHTML = '<i class="fa-solid fa-play"></i> <span>Play</span>';
        }
      });
    }

    if (muteBtn && video) {
      muteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        video.muted = !video.muted;
        muteBtn.innerHTML = video.muted
          ? '<i class="fa-solid fa-volume-xmark"></i> <span>Sound off</span>'
          : '<i class="fa-solid fa-volume-high"></i> <span>Sound on</span>';
      });
    }

    if (detailsBtn && detailsAcc) {
      detailsBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = detailsAcc.classList.toggle('open');
        detailsBtn.setAttribute('aria-expanded', String(isOpen));
        const sign = detailsBtn.querySelector('.plus-sign');
        if (sign) sign.textContent = isOpen ? '−' : '+';
      });
    }
  });

  // 7. DARK GLASS LIGHTBOX MODAL
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

    if (modalTitle) modalTitle.textContent = title || '';
    if (modalTag) modalTag.innerHTML = tag || '';
    if (modalDesc) modalDesc.textContent = desc || '';
    if (modalTools) modalTools.textContent = tools || '';

    if (videoSrc && modalVideo) {
      if (modalImg) modalImg.style.display = 'none';
      modalVideo.style.display = 'block';
      modalVideo.src = videoSrc;
      modalVideo.currentTime = 0;
      modalVideo.muted = false;
      modalVideo.play().catch(() => {});
    } else if (modalImg) {
      if (modalVideo) {
        modalVideo.pause();
        modalVideo.style.display = 'none';
        modalVideo.src = '';
      }
      modalImg.style.display = 'block';
      modalImg.src = imgSrc || '';
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

  workCards.forEach(card => {
    const quickViewBtn = card.querySelector('.btn-quick-view');
    const mediaFrame = card.querySelector('.work-media-frame');
    if (quickViewBtn) {
      quickViewBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openProjectModal(card);
      });
    }
    if (mediaFrame) {
      mediaFrame.addEventListener('click', () => openProjectModal(card));
    }
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);
  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) closeProjectModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProjectModal();
      closeDrawer();
    }
  });

  // 8. INSIDE THE CREATIVE ENGINE (INTERACTIVE TABBED CONSOLE)
  const engineData = {
    video: {
      kicker: '01 / MOTION & CINEMATOGRAPHY',
      title: 'GOOGLE VEO & KLING AI VIDEO ENGINE',
      desc: 'Orchestrating Hollywood-grade camera movement, realistic fluid & fabric physics, and seamless temporal continuity across 4K commercial spots.',
      step: '01 / 04',
      icon: 'fa-solid fa-film',
      core: 'ANSIL / VIDEO CORE',
      metric: '99.2% TEMPORAL STABILITY',
      prompt: '> Direct macro luxury shot, slow dolly-in, golden chiaroscuro lighting',
      tags: ['[ENGINE: KLING AI + VEO]', '[ASPECT: 16:9 / 9:16]', '[OUTPUT: STUDIO GRADE]'],
      specs: [
        ['Google Veo', 'Physics fidelity & 1080p–4K lighting consistency', 'Primary Motion'],
        ['Kling AI', 'Complex human expressions & camera choreography', 'Cinema Dynamics'],
        ['Seed & Temporal Lock', 'Frame-accurate continuity across multi-cut commercials', 'Scene Coherence'],
        ['Commercial Pacing', 'Hook optimization for first-3-second scroll retention', 'ROAS Tuned']
      ]
    },
    prompt: {
      kicker: '02 / REASONING & NARRATIVE SCRIPTING',
      title: 'CHATGPT PROMPT ARCHITECTURE',
      desc: 'Designing structured shot-by-shot camera instructions, conversion-focused ad hooks, and cohesive narrative scripts tailored to diffusion models.',
      step: '02 / 04',
      icon: 'fa-solid fa-comments',
      core: 'ANSIL / PROMPT MATRIX',
      metric: 'MULTI-SHOT HOOK CONVERSION',
      prompt: '> Structure 15s luxury Meta Ad storyboard with 3-sec sensory scroll hook',
      tags: ['[MODEL: CHATGPT PRO]', '[SYSTEM: SHOT LIST]', '[FOCUS: CONVERSION]'],
      specs: [
        ['Scene Decomposition', 'Shot-list matrices calibrated for generative video engines', 'Narrative Arc'],
        ['Ad Copywriting', 'High-CTR captions, voiceover scripts, and Meta Ad headlines', 'Direct Response'],
        ['Camera Syntax', 'Lens focal length, shutter speed, and lighting prompt tokens', 'Cinematic Control'],
        ['Brand Voice Lock', 'Consistent luxury tone aligned with target brand identity', 'Bespoke Tone']
      ]
    },
    image: {
      kicker: '03 / PHOTOREALISTIC SYNTHESIS',
      title: 'NANO BANANA EDITORIAL IMAGERY',
      desc: 'Synthesizing hyper-realistic commercial stills, luxury product staging, consistent virtual characters, and bespoke moodboards with micro-detail accuracy.',
      step: '03 / 04',
      icon: 'fa-solid fa-wand-magic-sparkles',
      core: 'ANSIL / VISION STUDIO',
      metric: 'STUDIO LIGHTING FIDELITY',
      prompt: '> Stage luxury fragrance flacon on dark obsidian stone, rim light',
      tags: ['[ENGINE: NANO BANANA]', '[STYLE: EDITORIAL STILL]', '[RES: 4K RAW]'],
      specs: [
        ['Product Staging', 'Commercial studio backdrops, reflections, and natural shadows', 'Brand Campaigns'],
        ['Character Consistency', 'Repeating subject identity across multi-angle storyboards', 'Keyframes'],
        ['Material Realism', 'Metallic chrome, fabric weave, liquid splashes & crystal gleam', 'Texture Depth'],
        ['Visual Ideation', 'Rapid moodboards and concept exploration before video render', 'Pre-Vis']
      ]
    },
    design: {
      kicker: '04 / POST-PRODUCTION & WEB CRAFT',
      title: 'CAPCUT, CANVA & VIBE CODING',
      desc: 'Completing every production with rhythmic sound synchronization, luxury color grading in CapCut, Canva typography systems, and bespoke responsive websites.',
      step: '04 / 04',
      icon: 'fa-solid fa-scissors',
      core: 'ANSIL / FINISHING SUITE',
      metric: 'END-TO-END SHIP READY',
      prompt: '> Sync kinetic bass hit @ 00:02.40 + apply obsidian lut + deploy web showcase',
      tags: ['[TOOLS: CAPCUT + CANVA]', '[WEB: VIBE CODING]', '[STATUS: SHIPPED]'],
      specs: [
        ['CapCut Pro', 'Precision beat-sync cutting, SFX design, and LUT color grading', 'Rhythm Edit'],
        ['Canva Studio', 'Editorial ad graphics, Reels cover typography, and decks', 'Brand Layouts'],
        ['Meta Ads Formats', 'Reels, Stories & Feed variations structured for A/B testing', 'Performance'],
        ['Website Development', 'Modern responsive portfolios & landing experiences via Vibe Coding', 'Interactive UI']
      ]
    }
  };

  const engineTabs = document.querySelectorAll('.engine-tab');
  const elKicker = document.getElementById('engineKicker');
  const elTitle = document.getElementById('engineTitle');
  const elDesc = document.getElementById('engineDesc');
  const elSpecList = document.getElementById('engineSpecList');
  const elStep = document.getElementById('engineStepCounter');
  const elIcon = document.getElementById('engineVisualIcon');
  const elCore = document.getElementById('engineCoreLabel');
  const elMetric = document.getElementById('engineMetricLine');
  const elPrompt = document.getElementById('enginePromptLine');
  const elTags = document.getElementById('engineTagsRow');

  engineTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const key = tab.getAttribute('data-tab');
      const data = engineData[key];
      if (!data) return;

      engineTabs.forEach(t => {
        t.classList.toggle('active', t === tab);
        t.setAttribute('aria-selected', String(t === tab));
      });

      if (elKicker) elKicker.textContent = data.kicker;
      if (elTitle) elTitle.textContent = data.title;
      if (elDesc) elDesc.textContent = data.desc;
      if (elStep) elStep.textContent = data.step;
      if (elIcon) elIcon.className = data.icon;
      if (elCore) elCore.textContent = data.core;
      if (elMetric) elMetric.textContent = data.metric;
      if (elPrompt) elPrompt.textContent = data.prompt;

      if (elTags) {
        elTags.innerHTML = data.tags.map(t => `<span>${t}</span>`).join('');
      }
      if (elSpecList) {
        elSpecList.innerHTML = data.specs.map(([name, desc, meta]) => `
          <div class="spec-row">
            <div>
              <strong>${name}</strong>
              <small>${desc}</small>
            </div>
            <span class="spec-meta">${meta}</span>
          </div>
        `).join('');
      }
    });
  });

  // 9. SUBTLE FLOATING EMBER / AUTUMN SPARK PARTICLES ON CANVAS
  const canvas = document.getElementById('ambientParticleCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    const parentSection = canvas.parentElement;
    let width = 0;
    let height = 0;
    let particles = [];
    let animId = null;

    const palette = [
      'rgba(224, 96, 20, 0.78)',
      'rgba(240, 145, 36, 0.65)',
      'rgba(184, 52, 22, 0.7)',
      'rgba(200, 243, 29, 0.35)'
    ];

    const resizeCanvas = () => {
      if (!parentSection) return;
      width = canvas.width = parentSection.offsetWidth;
      height = canvas.height = parentSection.offsetHeight;
    };

    const createParticles = () => {
      const count = window.innerWidth < 768 ? 14 : 26;
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * (width || 1200),
        y: Math.random() * (height || 800),
        rx: 4 + Math.random() * 11,
        ry: 1.5 + Math.random() * 4.5,
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.02,
        vx: -0.25 + Math.random() * 0.6,
        vy: 0.35 + Math.random() * 0.85,
        color: palette[Math.floor(Math.random() * palette.length)]
      }));
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.angle += p.spin;
        if (p.y > height + 30) { p.y = -30; p.x = Math.random() * width; }
        if (p.x > width + 30) p.x = -30;
        if (p.x < -30) p.x = width + 30;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.beginPath();
        ctx.ellipse(0, 0, p.rx, p.ry, 0, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.restore();
      }
      animId = requestAnimationFrame(render);
    };

    resizeCanvas();
    createParticles();
    window.addEventListener('resize', resizeCanvas);

    if ('IntersectionObserver' in window && parentSection) {
      const pObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !animId) {
            animId = requestAnimationFrame(render);
          } else if (!entry.isIntersecting && animId) {
            cancelAnimationFrame(animId);
            animId = null;
          }
        });
      }, { threshold: 0.02 });
      pObs.observe(parentSection);
    } else {
      animId = requestAnimationFrame(render);
    }
  }

  // 10. SCROLL REVEAL ENTRANCE OBSERVER (Progressive Enhancement)
  const revealEls = document.querySelectorAll('.reveal-up');
  const revealVisible = () => {
    const cutoff = window.innerHeight * 1.15;
    revealEls.forEach(el => {
      if (!el.classList.contains('in-view')) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= cutoff) {
          el.classList.add('in-view');
        }
      }
    });
  };

  revealVisible();
  document.body.classList.add('js-anim');

  if ('IntersectionObserver' in window) {
    const revObs = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05 });

    revealEls.forEach(el => {
      if (!el.classList.contains('in-view')) {
        revObs.observe(el);
      }
    });
    window.addEventListener('hashchange', () => setTimeout(revealVisible, 50));
    window.addEventListener('scroll', revealVisible, { passive: true });
  } else {
    revealEls.forEach(el => el.classList.add('in-view'));
  }

});
