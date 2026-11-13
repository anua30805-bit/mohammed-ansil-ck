# Portfolio Design & Animation Lock (`mohammed-ansil-ck`)

**CRITICAL RULE — LUXURY OBSIDIAN & AMBER GOLD ECLIPSE THEME LOCK**

The user explicitly requested `"e theme aakknm"` (Luxury Obsidian Void & Warm Amber Gold Eclipse) matching the editorial mock-up image while maintaining **identical** motion and animation behavior across all future updates (`"same animation eppalum venm.maaraan paadilla"`).

When adding new videos, images, projects, services, tools, or text updates:

1. **Preserve the Visual Theme**
   - Obsidian Void `#070709`, Dark Glass Surfaces (`#0E0E11`, `#141418`), Warm Amber Gold / Champagne Gold (`#F5D061`, `#FFE29F`, `#D8982C`), Metallic Chrome Gradient (`--chrome-gradient`), and Typography (`Caveat` cursive signature, `Outfit` display, `Plus Jakarta Sans` body, `JetBrains Mono` tech specs).
   - Fixed Header with Gold "A" Monogram Badge, Navigation links (`Home`, `About`, `Portfolio`, `Skills`, `Contact`), and `"Let's Talk →"` pill button.
   - Hero Section with cursive signature "Mohammed Ansil CK", headline `"Creating the Future with AI."` ("AI." in gold gradient), roles bar, primary `"Explore My Work →"` button, 4 circular social buttons, and right-side subject against the glowing golden eclipse arc.
   - About Me Section in rounded dark glass card with left gold-framed portrait, bio, `"Know More →"`, and right vertical stack of 5 service capabilities with gold outline icons.
   - My Creative Works with gold filter pills (`All`, `AI Videos`, `Ads`, `Images`, `Social Media`) and 4-card showcase (`work-thumb-robot.png`, `work-thumb-dream.png`, `work-thumb-studio.png`, `work-thumb-camera.png`) with circular play buttons opening the video lightbox modals.
   - Skills & Tools 8-squircle app icon grid (`ChatGPT`, `Midjourney`, `Kling`, `Veo`, `Nano Banana`, `Canva`, `Meta Ads`, `VS Code`) + Interactive telemetry engine.
   - Outro Callout with 360-degree rotating amber-gold neon laser border `"DM FOR WORK"` button.
   - Footer with email `anuansil989@gmail.com`, WhatsApp `+91 9207560571`, and giant watermark `ANSIL CK`.

2. **Preserve Every Core Animation (Never Remove, Disable, or Change Timing/Easing)**
   - **Hero Reveal & Golden Eclipse Arc**: Rotating & floating golden eclipse halo arc (`eclipseArcFloat`), `.hero-cursive-signature` glow, `.btn-gold-glow` breathing glow, and responsive scaling on desktop and mobile (`390px`).
   - **Vertical Reel Smartphone Showcase (`#reels`)**: 3 sleek smartphone mockups (9:16) with 3D perspective (`phone-card-left`, `phone-card-center` with radiant gold aura, `phone-card-right`), dynamic island notches, and interactive play/mute controls. Smooth horizontal snap carousel on mobile (`390px`).
   - **Outro Traveling Neon Laser Border Button (`#callout`)**: Headline `"IF YOU'RE LOOKING FOR CONTENT THAT STANDS OUT"` + `"DM FOR WORK"` button with continuous 360-degree rotating neon laser beam ring (`laserBorderRotate` conic-gradient).
   - **Multi-Layer Depth Parallax & Orbital Geometry**: Hero & `#vision` orbital rings, metallic spheres, and floating preview cards.
   - **Tech Stack Marquee**: `.stack-ticker-track` infinite `tickerScroll` (`30s linear infinite`, pause on hover).
   - **Ambient Falling Gold Ember Leaves & Sparks (`#ambientParticleCanvas`)**: Warm champagne & amber gold leaves and glowing spark particles active across `#portfolio` and `#services`.
   - **Interactive Sweeps, Modals & Reveals**: `.reveal-up` -> `.in-view` scroll reveals, interactive lightbox video modal, and squircle hover transforms.

3. **Do Not Bypass Verification or Cache Busting**
   - Always keep `style.css?v=...` and `main.js?v=...` cache-busting query strings bumped after CSS/JS edits.
   - Keep `server.ps1` HTTP Range support untouched so inline MP4 videos stream smoothly (`206`).
