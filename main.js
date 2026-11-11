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

  // 4. HERO & VISION SCROLL/CURSOR DEPTH PARALLAX
  const heroSection = document.getElementById('home');
  const heroOrbitStage = document.getElementById('heroOrbitStage');
  const heroWordmark = document.getElementById('heroWordmarkLayer');
  const heroSubject = document.getElementById('heroSubjectLayer');
  const visionSection = document.getElementById('vision');
  const visionPreviews = document.querySelectorAll('.floating-preview-card');
  const visionSpheres = document.querySelectorAll('.chrome-sphere');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!reducedMotion && heroSection && heroWordmark && heroSubject) {
    let targetMx = 0;
    let targetMy = 0;
    let currentMx = 0;
    let currentMy = 0;
    let parallaxRaf = null;

    const applyParallaxFrame = () => {
      currentMx += (targetMx - currentMx) * 0.08;
      currentMy += (targetMy - currentMy) * 0.08;

      const sy = window.scrollY;
      const heroH = heroSection.offsetHeight || 900;
      const heroProgress = Math.min(1, Math.max(0, sy / heroH));

      // Layer 1: PORTFOLIO wordmark parallax & scale
      const wordShiftY = sy * 0.16;
      const wordScale = 1 - heroProgress * 0.06;
      heroWordmark.style.transform = `translate3d(${(-currentMx * 16).toFixed(2)}px, calc(-48% + ${(-currentMy * 10 + wordShiftY).toFixed(2)}px), 0) scale(${wordScale.toFixed(4)})`;
      heroWordmark.style.opacity = String(Math.max(0.18, 1 - heroProgress * 1.05));

      // Layer 2: Foreground subject cutout parallax
      const subjShiftY = sy * 0.06;
      heroSubject.style.transform = `translate3d(calc(-50% + ${(currentMx * 12).toFixed(2)}px), ${(currentMy * 6 + subjShiftY).toFixed(2)}px, 0)`;

      // Layer 3: Subtle orbital ring depth shift
      if (heroOrbitStage) {
        heroOrbitStage.style.transform = `translate3d(${(-currentMx * 8).toFixed(2)}px, ${(-currentMy * 6 + sy * 0.09).toFixed(2)}px, 0)`;
      }

      // Layer 4: IMAGINE. stage spheres & floating tilted browser cards
      if (visionSection) {
        const vRect = visionSection.getBoundingClientRect();
        if (vRect.bottom > -100 && vRect.top < window.innerHeight + 100) {
          const centerOffset = (vRect.top + vRect.height * 0.5 - window.innerHeight * 0.5) / window.innerHeight;
          visionPreviews.forEach((card, idx) => {
            const speed = idx === 0 ? -28 : idx === 1 ? 22 : -18;
            card.style.setProperty('--parallax-y', `${(centerOffset * speed).toFixed(2)}px`);
          });
          visionSpheres.forEach((sphere, idx) => {
            const speed = idx === 0 ? 34 : idx === 1 ? -24 : 30;
            sphere.style.setProperty('--sphere-y', `${(centerOffset * speed).toFixed(2)}px`);
          });
        }
      }

      const delta = Math.abs(targetMx - currentMx) + Math.abs(targetMy - currentMy);
      if (delta > 0.001) {
        parallaxRaf = requestAnimationFrame(applyParallaxFrame);
      } else {
        parallaxRaf = null;
      }
    };

    const queueParallax = () => {
      if (!parallaxRaf) {
        parallaxRaf = requestAnimationFrame(applyParallaxFrame);
      }
    };

    if (window.matchMedia('(pointer: fine)').matches) {
      heroSection.addEventListener('mousemove', (e) => {
        const rect = heroSection.getBoundingClientRect();
        targetMx = (e.clientX - rect.left) / rect.width - 0.5;
        targetMy = (e.clientY - rect.top) / rect.height - 0.5;
        queueParallax();
      });

      heroSection.addEventListener('mouseleave', () => {
        targetMx = 0;
        targetMy = 0;
        queueParallax();
      });
    }

    window.addEventListener('scroll', queueParallax, { passive: true });
    applyParallaxFrame();
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

  const engineStage = document.getElementById('engineStage');
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
        elSpecList.innerHTML = data.specs.map(([name, desc, meta], idx) => `
          <div class="spec-row spec-item-enter" style="--spec-i: ${idx}">
            <div>
              <strong>${name}</strong>
              <small>${desc}</small>
            </div>
            <span class="spec-meta">${meta}</span>
          </div>
        `).join('');
      }

      if (engineStage) {
        engineStage.classList.remove('tab-swapping');
        void engineStage.offsetWidth;
        engineStage.classList.add('tab-swapping');
      }
    });
  });

  // 9. AMBIENT FALLING EMBER LEAVES & SPARK PARTICLES ACROSS SERVICES / WORK
  const canvas = document.getElementById('ambientParticleCanvas');
  const emberZones = [document.getElementById('services'), document.getElementById('portfolio')].filter(Boolean);
  if (canvas && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let particles = [];
    let animId = null;

    const leafPalettes = [
      { edge: '#E84214', mid: '#FF7D24', tip: '#FFB636' },
      { edge: '#C72B12', mid: '#EB5E1B', tip: '#F3942A' },
      { edge: '#D85814', mid: '#F69D26', tip: '#FFD15C' },
      { edge: '#9E2312', mid: '#DF4818', tip: '#FF8524' }
    ];

    const resizeCanvas = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const spawnLeaf = (randomY = false) => {
      const isSpark = Math.random() < 0.35;
      const pal = leafPalettes[Math.floor(Math.random() * leafPalettes.length)];
      return {
        isSpark,
        x: Math.random() * (width || 1440),
        y: randomY ? Math.random() * (height || 900) : -30 - Math.random() * 80,
        size: isSpark ? 1.5 + Math.random() * 2.5 : 10 + Math.random() * 14,
        vx: -0.35 + Math.random() * 0.85,
        vy: isSpark ? 0.55 + Math.random() * 1.1 : 0.75 + Math.random() * 1.35,
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.025,
        tumble: Math.random() * Math.PI * 2,
        tumbleSpeed: 0.015 + Math.random() * 0.025,
        swayPhase: Math.random() * Math.PI * 2,
        swaySpeed: 0.012 + Math.random() * 0.018,
        alpha: isSpark ? 0.45 + Math.random() * 0.4 : 0.55 + Math.random() * 0.38,
        pal
      };
    };

    const createParticles = () => {
      const count = window.innerWidth < 768 ? 16 : 30;
      particles = Array.from({ length: count }, () => spawnLeaf(true));
    };

    const drawOrganicLeaf = (p) => {
      const len = p.size;
      const wid = p.size * 0.44 * Math.max(0.32, Math.abs(Math.cos(p.tumble)));
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);

      const grad = ctx.createLinearGradient(-len, 0, len, 0);
      grad.addColorStop(0, p.pal.edge);
      grad.addColorStop(0.55, p.pal.mid);
      grad.addColorStop(1, p.pal.tip);

      ctx.beginPath();
      ctx.moveTo(-len, 0);
      ctx.quadraticCurveTo(0, -wid, len, 0);
      ctx.quadraticCurveTo(0, wid, -len, 0);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.shadowBlur = 12;
      ctx.shadowColor = 'rgba(255, 92, 24, 0.32)';
      ctx.fill();

      // Subtle golden central midrib vein
      ctx.beginPath();
      ctx.moveTo(-len * 0.85, 0);
      ctx.lineTo(len * 0.85, 0);
      ctx.strokeStyle = 'rgba(255, 224, 150, 0.28)';
      ctx.lineWidth = 0.7;
      ctx.stroke();
      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.swayPhase += p.swaySpeed;
        p.x += p.vx + Math.sin(p.swayPhase) * 0.42;
        p.y += p.vy;
        p.angle += p.spin;
        p.tumble += p.tumbleSpeed;

        if (p.y > height + 40 || p.x > width + 60 || p.x < -60) {
          Object.assign(p, spawnLeaf(false));
        }

        if (p.isSpark) {
          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.pal.tip;
          ctx.shadowBlur = 10;
          ctx.shadowColor = p.pal.mid;
          ctx.fill();
          ctx.restore();
        } else {
          drawOrganicLeaf(p);
        }
      }
      animId = requestAnimationFrame(render);
    };

    resizeCanvas();
    createParticles();
    window.addEventListener('resize', resizeCanvas);

    if ('IntersectionObserver' in window && emberZones.length) {
      const visibleZones = new Set();
      const zoneObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            visibleZones.add(entry.target);
          } else {
            visibleZones.delete(entry.target);
          }
        });
        const shouldRun = visibleZones.size > 0;
        document.body.classList.toggle('ember-active', shouldRun);
        if (shouldRun && !animId) {
          animId = requestAnimationFrame(render);
        } else if (!shouldRun && animId) {
          cancelAnimationFrame(animId);
          animId = null;
        }
      }, { threshold: 0.08 });
      emberZones.forEach(zone => zoneObs.observe(zone));
    }
  }

  // 10. SCROLL REVEAL ENTRANCE OBSERVER (Progressive Enhancement)
  const revealEls = document.querySelectorAll('.reveal-up');
  const revealVisible = () => {
    const cutoff = window.innerHeight * 0.96;
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
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

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
