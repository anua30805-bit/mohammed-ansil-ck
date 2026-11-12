# Portfolio Design & Animation Lock (`mohammed-ansil-ck`)

**CRITICAL RULE — NEVER ALTER THE ANIMATIONS OR THEME**

The user explicitly requires that the visual theme and every motion/animation behavior in this portfolio remain **identical** across all future updates (`"same animation eppalum venm.maaraan paadilla"`).

When adding new videos, images, projects, services, tools, or text updates:

1. **Preserve the Visual Theme**
   - Obsidian Void `#070707`, Surface `#111113`, Surface-2 `#17171A`, Acid Lime `#C8F31D` (`--accent-lime`), Chrome Metallic Text Gradient (`--chrome-gradient`), and Typography (`Outfit`, `Playfair Display`, `Plus Jakarta Sans`, `JetBrains Mono`).
   - Do not switch background colors, fonts, border styles, or typography hierarchy unless explicitly requested.

2. **Preserve Every Core Animation (Never Remove, Disable, or Change Timing/Easing)**
   - **Hero Reveal**: `html.hero-preload` sync (max 280ms cap) + `.hero-char-mask` + `.hero-char` using `heroCharReveal` (`0.85s var(--ease-out-expo)` staggered by `--char-i`), `.hero-cutout-img` using `heroSubjectReveal`, and `.hero-identity-col` / `.hero-scroll-cue` / `.hero-cta-col` using `heroUiFadeUp`.
   - **Hero & `#vision` Orbital Geometry**: Hero `.ring-1` / `.i-ring-1` (`ringBreathe`), `.ring-2` / `.i-ring-2` (`orbitSpinSlow`), `.ring-3` / `.i-ring-3` (`orbitSpinReverse`), `.carrier-lime` (`orbitCarrierLime`), `.carrier-silver-1` (`orbitCarrierSilverOne`), `.carrier-silver-2` (`orbitCarrierSilverTwo`) — clearly scaled and visible on both mobile phones (`390px`) and desktop.
   - **Hero & `#vision` Multi-Layer Depth Parallax (`main.js` Section 4)**: Mouse, touch, & scroll parallax on `#heroWordmarkLayer`, `#heroSubjectLayer`, `#heroOrbitStage`, all 4 `.floating-preview-card` items (`transform: translate3d(0, var(--parallax-y, 0px), 0) rotate(var(--card-rot))`), and `.chrome-sphere` items (`--sphere-y` inside `floatSlow` `translate3d`). Never hide `.floating-preview-card` on mobile — keep all 4 scaled cleanly around `IMAGINE.` on phones without overlapping corners.
   - **`IMAGINE.` Floating Accent Motion**: `.chrome-sphere` and `.stage-lime-orb` continuous `floatSlow` keyframes + `floating-preview-card` border/shadow hover lift.
   - **Tech Stack Marquee**: `.stack-ticker-track` infinite `tickerScroll` (`30s linear infinite`, pause on hover).
   - **Ambient Falling Ember Leaves & Sparks (`#ambientParticleCanvas`)**: Warm amber/orange organic leaves (`drawOrganicLeaf`) and glowing spark particles active whenever `#services` (`WHAT I CAN DO`) or `#portfolio` (`SELECTED WORK.`) is in view (`body.ember-active`). Do not leak embers into `#home`, `#about`, `#vision`, `#tools`, `#journey`, or `#contact`.
   - **Interactive Sweeps & Reveals**: `.service-row::before` and `.journey-row::before` left-to-right lime sweep on hover/open, `.reveal-up` -> `.in-view` scroll reveals + nth-child stagger delays, `.pulse-lime-dot` / `.chat-pill-dot` (`pulseLime`), `.scroll-arrow-down` (`bounceY`), and `#engineStage.tab-swapping` / `.spec-item-enter` (`engineFadeSlide`).

3. **Do Not Bypass Verification or Cache Busting**
   - Always keep `style.css?v=...` and `main.js?v=...` cache-busting query strings bumped after CSS/JS edits.
   - Keep `server.ps1` HTTP Range support untouched so inline MP4 videos stream smoothly (`206`).
