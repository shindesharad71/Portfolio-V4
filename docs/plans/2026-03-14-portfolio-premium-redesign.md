# Portfolio Premium Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform the portfolio from a clean but generic dark site into a polished, premium experience inspired by Linear/Vercel/Raycast — with GSAP-driven animations, Lenis smooth scroll, glassmorphism, and a refined charcoal + indigo palette.

**Architecture:** Single-page Astro site with SCSS styling. New motion layer via GSAP ScrollTrigger and Lenis (loaded as client-side islands). Custom cursor and magnetic interactions as standalone scripts. Canvas particle field in hero. All animation respects `prefers-reduced-motion`.

**Tech Stack:** Astro 5, SCSS (Sass), GSAP 3 + ScrollTrigger, Lenis, Vanilla JS (canvas particles, custom cursor, magnetic effects)

---

## Task 1: Install Dependencies

**Files:**
- Modify: `package.json`

**Step 1: Install GSAP and Lenis**

```bash
npm install gsap lenis
```

**Step 2: Verify installation**

```bash
node -e "require('gsap'); require('lenis'); console.log('OK')"
```

Expected: `OK`

**Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add gsap and lenis dependencies"
```

---

## Task 2: Update Design Tokens

**Files:**
- Modify: `src/styles/global.scss` (lines 1-82, the `:root` block)

**Step 1: Replace the `:root` color and typography tokens**

Replace the entire `:root` block in `src/styles/global.scss` with the new design system. Keep spacing, radii, and shadows — update colors, fonts, type scale, transitions, and layout tokens.

```scss
// Design System Tokens
:root {
  // Colors — Charcoal + Indigo palette
  --color-bg: #09090b;
  --color-bg-subtle: #18181b;
  --color-surface-1: rgba(255, 255, 255, 0.03);
  --color-surface-2: rgba(255, 255, 255, 0.06);
  --color-surface-3: rgba(255, 255, 255, 0.09);
  --color-border: rgba(255, 255, 255, 0.06);
  --color-border-hover: rgba(255, 255, 255, 0.12);
  --color-text: #fafafa;
  --color-text-secondary: #a1a1aa;
  --color-text-tertiary: #71717a;
  --color-accent: #818cf8;
  --color-accent-hover: #a5b4fc;
  --color-accent-glow: rgba(129, 140, 248, 0.15);
  --color-accent-subtle: rgba(129, 140, 248, 0.08);

  // Spacing (8pt grid) — keep existing
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-7: 32px;
  --space-8: 40px;
  --space-9: 48px;
  --space-10: 64px;
  --space-11: 80px;
  --space-12: 96px;
  --space-13: 128px;
  --space-14: 160px;

  // Typography
  --font-serif: 'Instrument Serif', Georgia, serif;
  --font-display: 'Sora', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;

  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 2rem;
  --text-4xl: 2.5rem;
  --text-5xl: 3.25rem;
  --text-6xl: clamp(2.5rem, 5vw, 4rem);

  --leading-tight: 1.15;
  --leading-normal: 1.6;
  --leading-relaxed: 1.75;

  --weight-normal: 400;
  --weight-medium: 500;
  --weight-semibold: 600;
  --weight-bold: 700;

  // Radii
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-full: 9999px;

  // Shadows
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.25);
  --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.3);
  --shadow-glow: 0 0 20px var(--color-accent-glow);

  // Transitions
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  --duration-fast: 200ms;
  --duration-normal: 400ms;
  --duration-slow: 700ms;
  --duration-hero: 1200ms;

  // Layout
  --max-width: 1200px;
  --header-height: 72px;

  // Breakpoints (reference only — use in media queries)
  // sm: 480px, md: 768px, lg: 1024px
}
```

**Step 2: Update legacy token references**

Throughout `global.scss`, replace old token names with new ones:
- `--color-surface` → `--color-surface-1`
- `--color-surface-hover` → `--color-surface-2`
- `--color-text-muted` → `--color-text-secondary`
- `--color-text-subtle` → `--color-text-tertiary`

In the body of `global.scss` below the `:root` block, make these replacements:
- Line 149: `color: var(--color-text-muted);` → `color: var(--color-text-secondary);`
- Line 6: remove old `--color-surface` and `--color-surface-hover` (now surface-1 and surface-2)

Also update:
- `h1, h2, h3` — use `--font-display` for headings (already `Sora`)
- `h1` — increase to `--text-6xl` for hero use

**Step 3: Verify build compiles**

```bash
npm run build
```

Expected: Build succeeds with no errors.

**Step 4: Commit**

```bash
git add src/styles/global.scss
git commit -m "feat: update design tokens to charcoal + indigo palette"
```

---

## Task 3: Add New Fonts

**Files:**
- Modify: `src/components/MainHead.astro` (line 48)

**Step 1: Update Google Fonts link**

Replace the existing Google Fonts `<link>` tag (line 48) with:

```html
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400&family=Sora:wght@500;600&display=swap" rel="stylesheet">
```

Also update `theme-color` meta (line 42-43) from `#0a0f1e` to `#09090b`.

**Step 2: Verify fonts load in dev**

```bash
npm run dev
```

Open browser, inspect Network tab — confirm all 4 font families load.

**Step 3: Commit**

```bash
git add src/components/MainHead.astro
git commit -m "feat: add Instrument Serif and Sora fonts"
```

---

## Task 4: Migrate Component Token References

**Files:**
- Modify: `src/components/Header.astro`
- Modify: `src/components/Intro.astro`
- Modify: `src/components/Skills.astro`
- Modify: `src/components/SkillItem.astro`
- Modify: `src/components/Work.astro`
- Modify: `src/components/WorkItem.astro`
- Modify: `src/components/Journey.astro`
- Modify: `src/components/Footer.astro`

**Step 1: Find and replace old token names across all components**

In every component file, replace:
- `var(--color-surface)` → `var(--color-surface-1)` (except where hover state, use surface-2)
- `var(--color-surface-hover)` → `var(--color-surface-2)`
- `var(--color-text-muted)` → `var(--color-text-secondary)`
- `var(--color-text-subtle)` → `var(--color-text-tertiary)`
- `var(--color-accent-glow)` stays (name unchanged)
- Hardcoded colors referencing old palette:
  - `rgba(10, 15, 30, 0.85)` → `rgba(9, 9, 11, 0.8)` (header scrolled bg)
  - `rgba(10, 15, 30, 0.97)` → `rgba(9, 9, 11, 0.95)` (mobile nav bg)
  - `rgba(252, 163, 17, 0.2)` → `rgba(129, 140, 248, 0.2)` (tag/badge borders)

**Step 2: Verify build**

```bash
npm run build
```

Expected: Build succeeds, no SCSS compilation errors.

**Step 3: Commit**

```bash
git add src/components/
git commit -m "refactor: migrate all components to new design tokens"
```

---

## Task 5: Set Up Lenis Smooth Scroll

**Files:**
- Modify: `src/pages/index.astro` (add Lenis init script)
- Modify: `src/styles/global.scss` (remove `scroll-behavior: smooth`)

**Step 1: Remove native smooth scroll**

In `src/styles/global.scss`, remove `scroll-behavior: smooth;` from the `html` rule (line 94). Lenis handles this now.

**Step 2: Add Lenis initialization to `index.astro`**

Replace the existing `<script>` block (lines 29-47) in `index.astro` with:

```html
<script>
  import Lenis from 'lenis';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let lenis: InstanceType<typeof Lenis> | null = null;

  if (!prefersReducedMotion) {
    lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis?.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  // Expose lenis globally for GSAP integration
  (window as any).__lenis = lenis;
</script>
```

**Step 3: Add Lenis base CSS to `global.scss`**

Add at the end of the file (after the reduced motion block):

```scss
// Lenis smooth scroll overrides
html.lenis, html.lenis body {
  height: auto;
}
.lenis.lenis-smooth {
  scroll-behavior: auto !important;
}
.lenis.lenis-smooth [data-lenis-prevent] {
  overscroll-behavior: contain;
}
.lenis.lenis-stopped {
  overflow: hidden;
}
```

**Step 4: Verify smooth scroll works**

```bash
npm run dev
```

Open browser, scroll page — should feel buttery smooth with slight damping.

**Step 5: Commit**

```bash
git add src/pages/index.astro src/styles/global.scss
git commit -m "feat: add Lenis smooth scroll"
```

---

## Task 6: Set Up GSAP ScrollTrigger Reveal System

**Files:**
- Modify: `src/pages/index.astro` (add GSAP init after Lenis)

**Step 1: Add GSAP ScrollTrigger setup**

Add a second `<script>` block in `index.astro`, below the Lenis script:

```html
<script>
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  gsap.registerPlugin(ScrollTrigger);

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion) {
    // Integrate Lenis with ScrollTrigger
    const lenis = (window as any).__lenis;
    if (lenis) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    }

    // Heading reveals — clip-path from bottom
    gsap.utils.toArray<HTMLElement>('[data-reveal="heading"]').forEach((el) => {
      gsap.from(el, {
        clipPath: 'inset(100% 0 0 0)',
        y: 20,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 80%', once: true },
      });
    });

    // Text reveals — fade + translate
    gsap.utils.toArray<HTMLElement>('[data-reveal="text"]').forEach((el) => {
      gsap.from(el, {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 75%', once: true },
      });
    });

    // Card reveals — scale + fade with stagger
    gsap.utils.toArray<HTMLElement>('[data-reveal="cards"]').forEach((container) => {
      const cards = container.children;
      gsap.from(cards, {
        scale: 0.95,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: { trigger: container, start: 'top 65%', once: true },
      });
    });

    // Fade-in reveals — simple opacity + Y
    gsap.utils.toArray<HTMLElement>('[data-reveal="fade"]').forEach((el) => {
      gsap.from(el, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 80%', once: true },
      });
    });
  } else {
    // Reduced motion: make all reveal elements visible immediately
    document.querySelectorAll('[data-reveal]').forEach((el) => {
      (el as HTMLElement).style.opacity = '1';
      (el as HTMLElement).style.transform = 'none';
      (el as HTMLElement).style.clipPath = 'none';
    });
  }
</script>
```

**Step 2: Remove the old IntersectionObserver scroll reveal CSS from `global.scss`**

Remove the `[data-reveal]` and `[data-reveal].revealed` CSS rules (lines 206-214). GSAP handles reveals now.

Keep the reduced-motion media query but update it to be GSAP-compatible.

**Step 3: Update `data-reveal` attributes on components**

This will be done in each component task below. For now, the system is ready.

**Step 4: Verify build**

```bash
npm run build
```

**Step 5: Commit**

```bash
git add src/pages/index.astro src/styles/global.scss
git commit -m "feat: add GSAP ScrollTrigger reveal system"
```

---

## Task 7: Create Custom Cursor

**Files:**
- Create: `src/components/Cursor.astro`
- Modify: `src/pages/index.astro` (add Cursor component)
- Modify: `src/styles/global.scss` (hide native cursor on desktop)

**Step 1: Create the Cursor component**

Create `src/components/Cursor.astro`:

```astro
---
// Custom cursor — renders a small dot that follows the mouse with inertia.
// Expands on hoverable elements. Hidden on touch devices.
---
<div id="cursor" class="cursor" aria-hidden="true">
  <div class="cursor-dot"></div>
  <div class="cursor-ring"></div>
  <span class="cursor-label"></span>
</div>

<script>
  const cursor = document.getElementById('cursor');
  const dot = cursor?.querySelector('.cursor-dot') as HTMLElement;
  const ring = cursor?.querySelector('.cursor-ring') as HTMLElement;
  const label = cursor?.querySelector('.cursor-label') as HTMLElement;

  if (cursor && !('ontouchstart' in window) && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
      cursor.style.opacity = '0';
    });

    function animate() {
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;
      cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);

    // Hover state handlers
    const interactiveSelector = 'a, button, [role="button"], input, textarea, select';
    const projectCardSelector = '.work-card';

    document.addEventListener('mouseover', (e) => {
      const target = e.target as HTMLElement;
      if (target.closest(projectCardSelector)) {
        cursor.classList.add('cursor--project');
        label.textContent = 'View';
      } else if (target.closest(interactiveSelector)) {
        cursor.classList.add('cursor--link');
      }
    });

    document.addEventListener('mouseout', (e) => {
      const target = e.target as HTMLElement;
      if (target.closest(projectCardSelector)) {
        cursor.classList.remove('cursor--project');
        label.textContent = '';
      } else if (target.closest(interactiveSelector)) {
        cursor.classList.remove('cursor--link');
      }
    });
  } else if (cursor) {
    cursor.style.display = 'none';
  }
</script>

<style lang="scss">
  .cursor {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s ease;
    mix-blend-mode: difference;
  }

  .cursor-dot {
    width: 8px;
    height: 8px;
    background: #fff;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.3s var(--ease-out), height 0.3s var(--ease-out),
                background 0.3s var(--ease-out);
  }

  .cursor-ring {
    position: absolute;
    top: 0;
    left: 0;
    width: 8px;
    height: 8px;
    border: 1.5px solid transparent;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.4s var(--ease-out), height 0.4s var(--ease-out),
                border-color 0.3s var(--ease-out);
  }

  .cursor-label {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    white-space: nowrap;
    opacity: 0;
    transition: opacity 0.3s var(--ease-out);
    color: #fff;
  }

  // Link hover state
  .cursor--link {
    .cursor-dot {
      width: 40px;
      height: 40px;
      background: rgba(255, 255, 255, 0.1);
    }
    .cursor-ring {
      width: 40px;
      height: 40px;
      border-color: rgba(255, 255, 255, 0.5);
    }
  }

  // Project card hover state
  .cursor--project {
    .cursor-dot {
      width: 80px;
      height: 80px;
      background: rgba(255, 255, 255, 0.08);
    }
    .cursor-ring {
      width: 80px;
      height: 80px;
      border-color: rgba(255, 255, 255, 0.3);
    }
    .cursor-label {
      opacity: 1;
    }
  }
</style>
```

**Step 2: Add to `index.astro`**

Import and add `<Cursor />` right after `<body>`:

```astro
import Cursor from '../components/Cursor.astro';
```

```html
<body>
  <Cursor />
  ...
```

**Step 3: Add cursor hiding to `global.scss`**

Add near the body styles:

```scss
@media (hover: hover) and (pointer: fine) {
  * { cursor: none !important; }
}
```

**Step 4: Verify cursor works in dev**

```bash
npm run dev
```

Move mouse — custom dot should follow. Hover links — should expand. Touch devices — hidden.

**Step 5: Commit**

```bash
git add src/components/Cursor.astro src/pages/index.astro src/styles/global.scss
git commit -m "feat: add custom cursor with context-aware states"
```

---

## Task 8: Redesign Header

**Files:**
- Modify: `src/components/Header.astro` (complete rewrite of template + styles + script)
- Modify: `src/data/site.json` (update nav to include Journey link)

**Step 1: Update nav data**

In `src/data/site.json`, update the `nav` array to:

```json
"nav": [
  { "link": "#skills", "name": "Skills" },
  { "link": "#work", "name": "Work" },
  { "link": "#journey", "name": "Journey" },
  { "link": "#footer", "name": "Contact" },
  { "link": "https://cv.shrd.in/", "name": "Resume", "target": "_blank" }
]
```

**Step 2: Rewrite Header.astro**

Replace `src/components/Header.astro` entirely. Key changes:
- Logo text: "SS" → "SB" (monogram), use `--font-serif` (Instrument Serif)
- Nav links: add underline-draw animation on hover
- Active section indicator: accent dot via scroll-spy
- Scroll behavior: hide on scroll-down, show on scroll-up
- Mobile: full-screen overlay with staggered reveals
- Glassmorphism: `rgba(9, 9, 11, 0.8)` + `backdrop-filter: blur(16px)`

The full component code:

```astro
---
import site from "../data/site.json";
const { nav } = site;
---
<header id="header" role="banner">
  <nav class="header-nav" aria-label="Main navigation">
    <a href="#" class="header-logo" aria-label="Back to top">SB</a>
    <button class="mobile-toggle" aria-label="Toggle menu" aria-expanded="false">
      <span class="toggle-bar"></span>
      <span class="toggle-bar"></span>
      <span class="toggle-bar"></span>
    </button>
    <ul class="nav-links" role="list">
      {nav.map((item) => (
        <li>
          <a
            href={item.link}
            class="nav-link"
            {...(item.target ? { target: item.target, rel: "noopener noreferrer" } : {})}
          >
            <span class="nav-link-text">{item.name}</span>
            <span class="nav-link-line"></span>
          </a>
        </li>
      ))}
    </ul>
  </nav>
</header>

<script>
  const header = document.getElementById('header');
  const toggle = header?.querySelector('.mobile-toggle');
  const navLinks = header?.querySelector('.nav-links');
  const links = header?.querySelectorAll('.nav-link');

  // Scroll: glassmorphism + hide/show
  let lastScroll = 0;
  const onScroll = () => {
    const y = window.scrollY;
    header?.classList.toggle('scrolled', y > 50);
    if (y > lastScroll && y > 200) {
      header?.classList.add('header-hidden');
    } else {
      header?.classList.remove('header-hidden');
    }
    lastScroll = y;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Scroll-spy: highlight active section
  const sections = document.querySelectorAll('section[id], footer[id]');
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          links?.forEach((link) => {
            const href = link.getAttribute('href');
            link.classList.toggle('active', href === `#${id}`);
          });
        }
      });
    },
    { threshold: 0.3, rootMargin: '-72px 0px -40% 0px' }
  );
  sections.forEach((s) => sectionObserver.observe(s));

  // Mobile toggle
  toggle?.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    navLinks?.classList.toggle('open');
  });
  navLinks?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle?.setAttribute('aria-expanded', 'false');
      navLinks?.classList.remove('open');
    });
  });
</script>

<style lang="scss">
  header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 50;
    transition: background var(--duration-normal) var(--ease-out),
                box-shadow var(--duration-normal) var(--ease-out),
                transform var(--duration-normal) var(--ease-out);

    &.scrolled {
      background: rgba(9, 9, 11, 0.8);
      backdrop-filter: saturate(180%) blur(16px);
      -webkit-backdrop-filter: saturate(180%) blur(16px);
      box-shadow: 0 1px 0 var(--color-border);
    }

    &.header-hidden {
      transform: translateY(-100%);
    }
  }

  .header-nav {
    max-width: var(--max-width);
    width: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--space-4) var(--space-6);
    height: var(--header-height);
  }

  .header-logo {
    font-family: var(--font-serif);
    font-weight: var(--weight-normal);
    font-size: var(--text-2xl);
    color: var(--color-text);
    text-decoration: none;
    letter-spacing: -0.02em;
    transition: color var(--duration-fast) var(--ease-out);
    &:hover { color: var(--color-accent); }
  }

  .mobile-toggle {
    display: none;
    flex-direction: column;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    padding: var(--space-2);
    z-index: 51;

    .toggle-bar {
      width: 22px;
      height: 2px;
      background: var(--color-text);
      border-radius: 2px;
      transition: transform var(--duration-normal) var(--ease-out),
                  opacity var(--duration-fast) var(--ease-out);
    }

    &[aria-expanded="true"] {
      .toggle-bar:nth-child(1) { transform: translateY(7px) rotate(45deg); }
      .toggle-bar:nth-child(2) { opacity: 0; }
      .toggle-bar:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
    }
  }

  .nav-links {
    display: flex;
    align-items: center;
    gap: var(--space-1);
    list-style: none;
  }

  .nav-link {
    position: relative;
    display: block;
    padding: var(--space-2) var(--space-4);
    color: var(--color-text-secondary);
    text-decoration: none;
    font-size: var(--text-sm);
    font-weight: var(--weight-medium);
    transition: color var(--duration-fast) var(--ease-out);

    &:hover, &.active { color: var(--color-text); }

    .nav-link-line {
      position: absolute;
      bottom: 4px;
      left: var(--space-4);
      right: var(--space-4);
      height: 1px;
      background: var(--color-accent);
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.3s var(--ease-out);
    }

    &:hover .nav-link-line,
    &.active .nav-link-line {
      transform: scaleX(1);
    }

    &.active::before {
      content: '';
      position: absolute;
      left: calc(var(--space-4) - 8px);
      top: 50%;
      transform: translateY(-50%);
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: var(--color-accent);
    }
  }

  @media (max-width: 768px) {
    .header-nav { padding: var(--space-4) var(--space-5); }
    .mobile-toggle { display: flex; }
    .nav-links {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100dvh;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: var(--space-4);
      background: rgba(9, 9, 11, 0.95);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      opacity: 0;
      pointer-events: none;
      transition: opacity var(--duration-normal) var(--ease-out);

      &.open { opacity: 1; pointer-events: all; }

      li a {
        font-size: var(--text-xl);
        padding: var(--space-3) var(--space-6);
      }
    }
  }
</style>
```

**Step 3: Verify in dev**

```bash
npm run dev
```

Check: logo says "SB" in serif, nav links have underline draw, header hides on scroll-down and reappears on scroll-up, glassmorphism on scroll.

**Step 4: Commit**

```bash
git add src/components/Header.astro src/data/site.json
git commit -m "feat: redesign header with scroll-spy, hide/show, and glassmorphism"
```

---

## Task 9: Redesign Hero / Intro Section

**Files:**
- Modify: `src/components/Intro.astro` (complete rewrite)

**Step 1: Rewrite Intro.astro**

Replace `src/components/Intro.astro` entirely. Key changes:
- Full 100vh hero section
- Instrument Serif for the name (display)
- Sora for role/tagline
- Staggered GSAP entrance (driven by `data-hero-*` attributes, animated from the GSAP script)
- Canvas particle field (separate component, next task)
- Two CTA buttons (glassmorphism)
- Scroll indicator at bottom
- Mesh gradient accent in background

```astro
---
const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth() + 1;
let years = currentYear - 2017;
let months = currentMonth - 11;

if (months < 0) {
    years--;
    months += 12;
}
---
<section class="hero" aria-label="Introduction">
    <div class="hero-gradient" aria-hidden="true"></div>
    <canvas id="hero-particles" aria-hidden="true"></canvas>

    <div class="hero-content">
        <div class="hero-badge" data-hero="badge">
            <span class="badge-dot"></span>
            <span>Available for collaboration</span>
        </div>
        <p class="hero-greeting" data-hero="greeting">Hi, I'm</p>
        <h1 class="hero-name" data-hero="name">Sharad Shinde.</h1>
        <p class="hero-role" data-hero="role">Staff Engineer building scalable systems</p>
        <p class="hero-desc" data-hero="desc">
            {years}+ years of architecting backend systems, microservices, and products
            that scale to millions of users. Based in Pune, India.
        </p>
        <div class="hero-ctas" data-hero="ctas">
            <a href="#work" class="cta cta-primary">View Work</a>
            <a href="#footer" class="cta cta-secondary">Get in Touch</a>
        </div>
    </div>

    <div class="hero-scroll" data-hero="scroll" aria-hidden="true">
        <span>scroll</span>
        <div class="scroll-line"></div>
    </div>
</section>

<script>
  import { gsap } from 'gsap';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion) {
    const tl = gsap.timeline({ delay: 0.2 });

    tl.from('[data-hero="greeting"]', { opacity: 0, y: 20, duration: 0.5, ease: 'power3.out' })
      .from('[data-hero="name"]', { clipPath: 'inset(0 100% 0 0)', duration: 0.8, ease: 'power3.out' }, '-=0.2')
      .from('[data-hero="role"]', { opacity: 0, y: 20, duration: 0.5, ease: 'power3.out' }, '-=0.3')
      .from('[data-hero="badge"]', { opacity: 0, x: -20, duration: 0.4, ease: 'power3.out' }, '-=0.2')
      .from('[data-hero="desc"]', { opacity: 0, y: 15, duration: 0.5, ease: 'power3.out' }, '-=0.2')
      .from('[data-hero="ctas"]', { opacity: 0, y: 15, duration: 0.4, ease: 'power3.out' }, '-=0.2')
      .from('[data-hero="scroll"]', { opacity: 0, duration: 0.4, ease: 'power3.out' }, '-=0.1');
  }

  // Fade out scroll indicator on scroll
  const scrollIndicator = document.querySelector('.hero-scroll') as HTMLElement;
  if (scrollIndicator) {
    window.addEventListener('scroll', () => {
      scrollIndicator.style.opacity = window.scrollY > 100 ? '0' : '1';
    }, { passive: true });
  }
</script>

<style lang="scss">
  .hero {
    position: relative;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: var(--header-height) 0 var(--space-10);
    overflow: hidden;
  }

  .hero-gradient {
    position: absolute;
    top: -20%;
    right: -10%;
    width: 60%;
    height: 60%;
    background: radial-gradient(ellipse, var(--color-accent-glow) 0%, transparent 70%);
    filter: blur(80px);
    pointer-events: none;
  }

  #hero-particles {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  .hero-content {
    position: relative;
    z-index: 1;
  }

  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-2) var(--space-4);
    background: var(--color-surface-1);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-full);
    font-size: var(--text-sm);
    color: var(--color-text-secondary);
    margin-bottom: var(--space-7);
    backdrop-filter: blur(8px);
  }

  .badge-dot {
    width: 8px;
    height: 8px;
    background: #22c55e;
    border-radius: 50%;
    animation: pulse-dot 2s ease-in-out infinite;
  }

  @keyframes pulse-dot {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }

  .hero-greeting {
    font-family: var(--font-body);
    font-size: var(--text-lg);
    color: var(--color-text-secondary);
    font-weight: var(--weight-medium);
    margin-bottom: var(--space-2);
  }

  .hero-name {
    font-family: var(--font-serif);
    font-size: var(--text-6xl);
    font-weight: var(--weight-normal);
    color: var(--color-text);
    letter-spacing: -0.02em;
    line-height: 1.1;
    margin-bottom: var(--space-4);
    clip-path: inset(0 0 0 0);
  }

  .hero-role {
    font-family: var(--font-display);
    font-size: var(--text-xl);
    font-weight: var(--weight-medium);
    color: var(--color-accent);
    margin-bottom: var(--space-5);
    @media (min-width: 768px) {
      font-size: var(--text-2xl);
    }
  }

  .hero-desc {
    font-size: var(--text-base);
    color: var(--color-text-secondary);
    max-width: 560px;
    line-height: var(--leading-relaxed);
    margin-bottom: var(--space-8);
    @media (min-width: 768px) {
      font-size: var(--text-lg);
    }
  }

  .hero-ctas {
    display: flex;
    gap: var(--space-4);
    flex-wrap: wrap;
  }

  .cta {
    display: inline-flex;
    align-items: center;
    padding: var(--space-3) var(--space-6);
    font-size: var(--text-sm);
    font-weight: var(--weight-semibold);
    border-radius: var(--radius-full);
    text-decoration: none;
    transition: all var(--duration-normal) var(--ease-out);
  }

  .cta-primary {
    background: var(--color-accent);
    color: #09090b;
    &:hover {
      background: var(--color-accent-hover);
      color: #09090b;
      box-shadow: 0 0 24px var(--color-accent-glow);
    }
  }

  .cta-secondary {
    background: var(--color-surface-1);
    color: var(--color-text);
    border: 1px solid var(--color-border);
    backdrop-filter: blur(8px);
    &:hover {
      background: var(--color-surface-2);
      border-color: var(--color-border-hover);
    }
  }

  .hero-scroll {
    position: absolute;
    bottom: var(--space-8);
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-2);
    transition: opacity 0.3s var(--ease-out);

    span {
      font-size: var(--text-xs);
      color: var(--color-text-tertiary);
      text-transform: uppercase;
      letter-spacing: 0.15em;
    }

    .scroll-line {
      width: 1px;
      height: 32px;
      background: linear-gradient(to bottom, var(--color-text-tertiary), transparent);
      animation: scroll-bounce 2s ease-in-out infinite;
    }
  }

  @keyframes scroll-bounce {
    0%, 100% { transform: translateY(0); opacity: 1; }
    50% { transform: translateY(8px); opacity: 0.4; }
  }

  @media (max-width: 480px) {
    .hero { padding: var(--header-height) 0 var(--space-7); }
    .hero-name { font-size: 2.25rem; }
  }
</style>
```

**Step 2: Verify hero in dev**

```bash
npm run dev
```

Check: full viewport hero, Instrument Serif name, entrance animation sequence, scroll indicator, mesh gradient glow.

**Step 3: Commit**

```bash
git add src/components/Intro.astro
git commit -m "feat: redesign hero section with GSAP entrance sequence"
```

---

## Task 10: Create Canvas Particle Field

**Files:**
- Create: `src/scripts/particles.ts`
- Modify: `src/components/Intro.astro` (add particle script import)

**Step 1: Create the particle system**

Create `src/scripts/particles.ts`:

```typescript
export function initParticles(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let animId: number;
  let mouseX = -1000, mouseY = -1000;
  const PARTICLE_COUNT = 70;
  const LINE_DISTANCE = 120;
  const MOUSE_RADIUS = 100;

  interface Particle {
    x: number; y: number;
    vx: number; vy: number;
    size: number;
  }

  let particles: Particle[] = [];
  let w = 0, h = 0;

  function resize() {
    const rect = canvas.getBoundingClientRect();
    w = canvas.width = rect.width * devicePixelRatio;
    h = canvas.height = rect.height * devicePixelRatio;
    ctx!.scale(devicePixelRatio, devicePixelRatio);
  }

  function createParticles() {
    const rect = canvas.getBoundingClientRect();
    particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * rect.width,
      y: Math.random() * rect.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 1.5 + 1,
    }));
  }

  function draw() {
    const rect = canvas.getBoundingClientRect();
    const rw = rect.width, rh = rect.height;
    ctx!.clearRect(0, 0, rw, rh);

    for (const p of particles) {
      // Mouse repulsion
      const dx = p.x - mouseX, dy = p.y - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < MOUSE_RADIUS && dist > 0) {
        const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS * 0.5;
        p.vx += (dx / dist) * force;
        p.vy += (dy / dist) * force;
      }

      // Dampen velocity
      p.vx *= 0.99;
      p.vy *= 0.99;
      p.x += p.vx;
      p.y += p.vy;

      // Wrap around edges
      if (p.x < 0) p.x = rw;
      if (p.x > rw) p.x = 0;
      if (p.y < 0) p.y = rh;
      if (p.y > rh) p.y = 0;

      // Draw particle
      ctx!.beginPath();
      ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx!.fillStyle = 'rgba(113, 113, 122, 0.3)';
      ctx!.fill();
    }

    // Draw connecting lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < LINE_DISTANCE) {
          ctx!.beginPath();
          ctx!.moveTo(particles[i].x, particles[i].y);
          ctx!.lineTo(particles[j].x, particles[j].y);
          ctx!.strokeStyle = `rgba(113, 113, 122, ${0.08 * (1 - dist / LINE_DISTANCE)})`;
          ctx!.lineWidth = 0.5;
          ctx!.stroke();
        }
      }
    }

    animId = requestAnimationFrame(draw);
  }

  // IntersectionObserver to pause when not visible
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      animId = requestAnimationFrame(draw);
    } else {
      cancelAnimationFrame(animId);
    }
  }, { threshold: 0 });

  resize();
  createParticles();
  observer.observe(canvas);

  canvas.closest('section')?.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = (e as MouseEvent).clientX - rect.left;
    mouseY = (e as MouseEvent).clientY - rect.top;
  });

  window.addEventListener('resize', () => {
    resize();
    createParticles();
  });

  return () => {
    cancelAnimationFrame(animId);
    observer.disconnect();
  };
}
```

**Step 2: Import and init in Intro.astro**

Add to the existing `<script>` block in `Intro.astro`, after the GSAP hero timeline:

```typescript
import { initParticles } from '../scripts/particles';

const canvas = document.getElementById('hero-particles') as HTMLCanvasElement;
if (canvas && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  initParticles(canvas);
}
```

**Step 3: Verify particles in dev**

```bash
npm run dev
```

Check: subtle dots with connecting lines, mouse repulsion works, particles pause when scrolled away.

**Step 4: Commit**

```bash
git add src/scripts/particles.ts src/components/Intro.astro
git commit -m "feat: add canvas particle field to hero section"
```

---

## Task 11: Redesign Skills Section — Bento Grid

**Files:**
- Modify: `src/components/Skills.astro` (new layout)
- Modify: `src/components/SkillItem.astro` (glassmorphism card with glow)
- Modify: `src/data/site.json` (add `size` field to primary skills for bento sizing)

**Step 1: Update site.json skills data**

Add a `"size": "large"` field to the first 3 "comfortable" skills (the primary ones) to drive bento sizing:

```json
"skills": {
  "comfortable": [
    { "name": "Node.js", "icon": "nodejs", "size": "large", "desc": "Backend & APIs" },
    { "name": "TypeScript", "icon": "typescript", "size": "large", "desc": "Type-safe code" },
    { "name": "JavaScript", "icon": "javascript", "size": "large", "desc": "Frontend & Full-stack" },
    { "name": "Angular", "icon": "angularjs" },
    { "name": "HTML5", "icon": "html5" },
    { "name": "CSS3", "icon": "css3" },
    { "name": "Git", "icon": "git" },
    { "name": "MySQL", "icon": "mysql" },
    { "name": "MongoDB", "icon": "mongodb" }
  ],
  "mastering": [
    { "name": "Python", "icon": "python" },
    { "name": "Ruby", "icon": "ruby" },
    { "name": "Go", "icon": "go" }
  ]
}
```

**Step 2: Rewrite Skills.astro**

```astro
---
import site from "../data/site.json";
import SkillItem from './SkillItem.astro';
const { skills } = site;
const allSkills = [...skills.comfortable, ...skills.mastering];
---
<section id="skills" aria-label="Technical skills">
    <h2 data-reveal="heading">What I Work With</h2>

    <div class="bento-grid" data-reveal="cards">
        {allSkills.map((item) => (
            <SkillItem item={item} />
        ))}
    </div>
</section>
<style lang="scss">
  #skills {
    padding: var(--space-14) 0;
  }

  h2 {
    font-family: var(--font-display);
    margin-bottom: var(--space-10);
  }

  .bento-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--space-4);

    @media (max-width: 768px) {
      grid-template-columns: repeat(3, 1fr);
    }
    @media (max-width: 480px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
```

**Step 3: Rewrite SkillItem.astro with glassmorphism and glow**

```astro
---
import TechIcon from './icons/TechIcon.astro';
const { item } = Astro.props;
const isLarge = item.size === 'large';
---
<div class:list={['skill-card', { 'skill-card--large': isLarge }]} tabindex="0" role="img" aria-label={item.name}>
    <div class="skill-icon">
        <TechIcon name={item.icon} />
    </div>
    <span class="skill-name">{item.name}</span>
    {item.desc && <span class="skill-desc">{item.desc}</span>}
    <div class="skill-glow" aria-hidden="true"></div>
</div>

<script>
  // Mouse-tracking glow effect on cards
  document.querySelectorAll('.skill-card').forEach((card) => {
    const glow = card.querySelector('.skill-glow') as HTMLElement;
    card.addEventListener('mousemove', (e) => {
      const rect = (card as HTMLElement).getBoundingClientRect();
      const x = (e as MouseEvent).clientX - rect.left;
      const y = (e as MouseEvent).clientY - rect.top;
      glow.style.background = `radial-gradient(circle at ${x}px ${y}px, var(--color-accent-glow), transparent 60%)`;
      glow.style.opacity = '1';
    });
    card.addEventListener('mouseleave', () => {
      glow.style.opacity = '0';
    });
  });
</script>

<style lang="scss">
  .skill-card {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--space-3);
    padding: var(--space-6) var(--space-4);
    background: var(--color-surface-1);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    backdrop-filter: blur(12px);
    overflow: hidden;
    transition: border-color var(--duration-normal) var(--ease-out),
                transform var(--duration-normal) var(--ease-spring);

    &:hover, &:focus-visible {
      border-color: var(--color-border-hover);
      transform: translateY(-4px);

      .skill-icon { transform: scale(1.1); }
      .skill-name { color: var(--color-text); }
    }

    &--large {
      grid-column: span 2;
      padding: var(--space-8) var(--space-6);
      @media (max-width: 480px) { grid-column: span 2; }
    }
  }

  .skill-glow {
    position: absolute;
    inset: 0;
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
    border-radius: inherit;
  }

  .skill-icon {
    position: relative;
    z-index: 1;
    transition: transform var(--duration-normal) var(--ease-spring);
  }

  .skill-name {
    position: relative;
    z-index: 1;
    font-size: var(--text-sm);
    color: var(--color-text-secondary);
    font-weight: var(--weight-medium);
    text-align: center;
    transition: color var(--duration-fast) var(--ease-out);
  }

  .skill-desc {
    position: relative;
    z-index: 1;
    font-size: var(--text-xs);
    color: var(--color-text-tertiary);
    text-align: center;
  }
</style>
```

**Step 4: Verify bento grid in dev**

```bash
npm run dev
```

Check: 4-column grid, large cards span 2 columns, mouse-tracking glow on hover, glassmorphism cards.

**Step 5: Commit**

```bash
git add src/components/Skills.astro src/components/SkillItem.astro src/data/site.json
git commit -m "feat: redesign skills section with bento grid and glassmorphism"
```

---

## Task 12: Redesign Work Section — Asymmetric Grid

**Files:**
- Modify: `src/components/Work.astro`
- Modify: `src/components/WorkItem.astro`

**Step 1: Rewrite Work.astro with alternating layout**

```astro
---
import WorkItem from './WorkItem.astro';
import site from "../data/site.json";
const { work } = site;
---
<section id="work" aria-label="Projects">
    <h2 data-reveal="heading">Selected Work</h2>
    <div class="work-grid">
        {work.map((item, i) => (
            <WorkItem item={item} featured={i % 3 === 0} />
        ))}
    </div>
</section>
<style lang="scss">
  #work {
    padding: var(--space-14) 0;
  }

  h2 {
    font-family: var(--font-display);
    margin-bottom: var(--space-10);
  }

  .work-grid {
    display: grid;
    gap: var(--space-6);

    @media (min-width: 600px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  // Featured items span full width
  :global(.work-card--featured) {
    @media (min-width: 600px) {
      grid-column: 1 / -1;
    }
  }
</style>
```

**Step 2: Rewrite WorkItem.astro**

```astro
---
const { item, featured = false } = Astro.props;
---
<article class:list={['work-card', { 'work-card--featured': featured }]} data-reveal="fade">
    <a href={item.link} target="_blank" rel="noopener noreferrer" class="work-card-link">
        <div class="work-card-image">
            <img src={item.image} alt={item.title} loading="lazy" decoding="async">
            <div class="work-card-overlay">
                <span class="overlay-label">View Project
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
                </span>
            </div>
        </div>
        <div class="work-card-content">
            <div class="work-card-header">
                <h3 class="work-card-title">{item.title}</h3>
                <svg class="work-card-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
            </div>
            <p class="work-card-desc">{item.description}</p>
            {item.tech && item.tech.length > 0 &&
                <div class="work-card-tags">
                    {item.tech.map(tech => (
                        <span class="tag">{tech}</span>
                    ))}
                </div>
            }
        </div>
    </a>
    {item.info && <p class="work-card-info">{item.info}</p>}
</article>
<style lang="scss">
  .work-card {
    background: var(--color-surface-1);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    overflow: hidden;
    transition: border-color var(--duration-normal) var(--ease-out),
                box-shadow var(--duration-normal) var(--ease-out);

    &:hover {
      border-color: var(--color-border-hover);
      box-shadow: var(--shadow-lg);

      .work-card-image img { transform: scale(1.03); }
      .work-card-overlay { opacity: 1; }
      .work-card-arrow { transform: translate(2px, -2px); }
    }
  }

  .work-card-link {
    text-decoration: none;
    color: inherit;
    display: block;
  }

  .work-card-image {
    position: relative;
    overflow: hidden;
    aspect-ratio: 16 / 10;
    background: var(--color-bg-subtle);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform var(--duration-slow) var(--ease-out);
    }
  }

  .work-card-overlay {
    position: absolute;
    inset: 0;
    background: rgba(9, 9, 11, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity var(--duration-normal) var(--ease-out);
  }

  .overlay-label {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-2) var(--space-5);
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: var(--radius-full);
    color: #fff;
    font-size: var(--text-sm);
    font-weight: var(--weight-medium);
  }

  .work-card-content {
    padding: var(--space-5) var(--space-6);
  }

  .work-card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--space-2);
  }

  .work-card-title {
    font-family: var(--font-display);
    font-size: var(--text-lg);
    font-weight: var(--weight-semibold);
    margin-bottom: 0;
  }

  .work-card-arrow {
    color: var(--color-text-tertiary);
    transition: transform var(--duration-fast) var(--ease-out),
                color var(--duration-fast) var(--ease-out);
    flex-shrink: 0;
  }

  .work-card:hover .work-card-arrow { color: var(--color-accent); }

  .work-card-desc {
    font-size: var(--text-sm);
    color: var(--color-text-secondary);
    line-height: var(--leading-relaxed);
    margin-bottom: var(--space-4);
  }

  .work-card-tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
  }

  .tag {
    padding: var(--space-1) var(--space-3);
    background: var(--color-accent-subtle);
    color: var(--color-accent);
    font-size: var(--text-xs);
    font-weight: var(--weight-medium);
    border-radius: var(--radius-full);
    border: 1px solid rgba(129, 140, 248, 0.2);
  }

  .work-card-info {
    padding: 0 var(--space-6) var(--space-5);
    font-size: var(--text-sm);
    color: var(--color-text-tertiary);
    font-style: italic;
    margin-bottom: 0;
  }
</style>
```

**Step 3: Verify in dev**

Check: featured projects span full width, hover reveals overlay label, arrow animates on hover, glassmorphism tag pills use indigo.

**Step 4: Commit**

```bash
git add src/components/Work.astro src/components/WorkItem.astro
git commit -m "feat: redesign work section with asymmetric grid and hover overlays"
```

---

## Task 13: Redesign Journey Section — Scroll-Driven Timeline

**Files:**
- Modify: `src/components/Journey.astro`

**Step 1: Rewrite Journey.astro**

Key changes:
- Alternating left/right cards on desktop
- Timeline line draws via GSAP `scrub: true`
- Glassmorphism cards
- Scroll-driven animation

```astro
---
import site from "../data/site.json";
const { journey } = site;
const sortedYears = Object.keys(journey).sort((a, b) => Number(b) - Number(a));

// Flatten to an array of entries with year for alternating layout
const entries: Array<{ year: string; title: string; description: string; isFirst: boolean }> = [];
sortedYears.forEach((year) => {
    journey[year].forEach((item, i) => {
        entries.push({ year, title: item.title, description: item.description, isFirst: i === 0 });
    });
});
---
<section id="journey" aria-label="Career journey">
    <h2 data-reveal="heading">The Journey</h2>
    <div class="timeline" id="timeline">
        <div class="timeline-line" id="timeline-line" aria-hidden="true"></div>
        {entries.map((entry, i) => (
            <div class:list={['timeline-entry', i % 2 === 0 ? 'timeline-entry--right' : 'timeline-entry--left']} data-reveal="fade">
                <div class="timeline-dot" aria-hidden="true"></div>
                {entry.isFirst && <span class="timeline-year">{entry.year}</span>}
                <div class="timeline-card">
                    <h3 class="timeline-title">{entry.title}</h3>
                    <p class="timeline-desc">{entry.description}</p>
                </div>
            </div>
        ))}
    </div>
</section>

<script>
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  gsap.registerPlugin(ScrollTrigger);

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const line = document.getElementById('timeline-line');
    if (line) {
      gsap.fromTo(line,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '#timeline',
            start: 'top 60%',
            end: 'bottom 40%',
            scrub: true,
          },
        }
      );
    }
  }
</script>

<style lang="scss">
  #journey {
    padding: var(--space-14) 0;
  }

  h2 {
    font-family: var(--font-display);
    margin-bottom: var(--space-10);
  }

  .timeline {
    position: relative;
    max-width: 800px;
    margin: 0 auto;
  }

  .timeline-line {
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(to bottom, var(--color-accent), var(--color-border) 30%, var(--color-border) 70%, transparent);
    transform-origin: top;
    transform: scaleY(0);

    @media (max-width: 768px) {
      left: 16px;
    }
  }

  .timeline-entry {
    position: relative;
    display: flex;
    align-items: flex-start;
    margin-bottom: var(--space-8);
    width: 50%;

    &--right {
      margin-left: 50%;
      padding-left: var(--space-8);
    }

    &--left {
      flex-direction: row-reverse;
      padding-right: var(--space-8);
      text-align: right;
    }

    @media (max-width: 768px) {
      width: 100%;
      margin-left: 0;
      padding-left: var(--space-10);
      padding-right: 0;
      flex-direction: row;
      text-align: left;

      &--left {
        flex-direction: row;
        padding-right: 0;
        padding-left: var(--space-10);
        text-align: left;
      }
    }
  }

  .timeline-dot {
    position: absolute;
    left: calc(-4px - var(--space-8) + 4px);
    top: var(--space-5);
    width: 10px;
    height: 10px;
    background: var(--color-bg);
    border: 2px solid var(--color-accent);
    border-radius: 50%;
    z-index: 2;

    .timeline-entry--right & { left: calc(-1 * var(--space-8) - 1px); }
    .timeline-entry--left & { right: calc(-1 * var(--space-8) - 1px); left: auto; }

    @media (max-width: 768px) {
      left: 12px !important;
      right: auto !important;
    }
  }

  .timeline-year {
    position: absolute;
    top: var(--space-4);
    display: inline-flex;
    padding: var(--space-1) var(--space-4);
    background: var(--color-accent-subtle);
    color: var(--color-accent);
    font-size: var(--text-sm);
    font-weight: var(--weight-bold);
    border-radius: var(--radius-full);
    border: 1px solid rgba(129, 140, 248, 0.2);
    white-space: nowrap;

    .timeline-entry--right & { left: calc(-1 * var(--space-8) - 60px); }
    .timeline-entry--left & { right: calc(-1 * var(--space-8) - 60px); left: auto; }

    @media (max-width: 768px) {
      position: relative;
      top: 0;
      left: 0 !important;
      right: auto !important;
      margin-bottom: var(--space-3);
    }
  }

  .timeline-card {
    padding: var(--space-5);
    background: var(--color-surface-1);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    backdrop-filter: blur(12px);
    transition: border-color var(--duration-normal) var(--ease-out);
    width: 100%;

    &:hover { border-color: var(--color-border-hover); }
  }

  .timeline-title {
    font-family: var(--font-display);
    font-size: var(--text-base);
    font-weight: var(--weight-semibold);
    margin-bottom: var(--space-2);
  }

  .timeline-desc {
    font-size: var(--text-sm);
    color: var(--color-text-secondary);
    line-height: var(--leading-relaxed);
    margin-bottom: 0;
  }
</style>
```

**Step 2: Verify timeline in dev**

Check: alternating left/right cards, timeline line draws on scroll, year badges positioned, glassmorphism cards. Mobile: linear left-aligned.

**Step 3: Commit**

```bash
git add src/components/Journey.astro
git commit -m "feat: redesign journey timeline with scroll-driven line drawing"
```

---

## Task 14: Redesign Footer / CTA

**Files:**
- Modify: `src/components/Footer.astro`

**Step 1: Rewrite Footer.astro**

Bold "Let's build something together" CTA with mesh gradient, magnetic social icons, gradient divider.

```astro
---
import site from "../data/site.json";
const { socials, author, resume } = site;
---
<footer id="footer" aria-label="Contact">
    <div class="footer-gradient" aria-hidden="true"></div>

    <div class="footer-cta" data-reveal="heading">
        <h2>Let's build something<br>together.</h2>
    </div>

    <p class="footer-desc" data-reveal="text">
        I'm currently available for freelance projects and full-time opportunities.
        Let's chat about what we can create.
    </p>

    <div class="footer-contact" data-reveal="fade">
        <a href="mailto:shindesharad71@gmail.com" class="footer-email">
            shindesharad71@gmail.com
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </a>
    </div>

    <div class="footer-links" data-reveal="fade">
        <a href={resume} target="_blank" rel="noopener noreferrer" class="footer-link-item">Resume</a>
        {socials.map((social) => (
            <a
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                class="footer-link-item"
                aria-label={social.title}
            >
                {social.title}
            </a>
        ))}
    </div>

    <div class="footer-divider" aria-hidden="true"></div>

    <div class="footer-bottom">
        <p>&copy; {new Date().getFullYear()} {author}</p>
        <p>Built with Astro</p>
    </div>
</footer>
<style lang="scss">
  footer {
    position: relative;
    padding: var(--space-14) 0 var(--space-10);
    overflow: hidden;
  }

  .footer-gradient {
    position: absolute;
    top: -40%;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    height: 60%;
    background: radial-gradient(ellipse, var(--color-accent-glow) 0%, transparent 70%);
    filter: blur(100px);
    pointer-events: none;
  }

  .footer-cta {
    position: relative;
    margin-bottom: var(--space-6);

    h2 {
      font-family: var(--font-serif);
      font-size: var(--text-5xl);
      font-weight: var(--weight-normal);
      letter-spacing: -0.02em;
      line-height: 1.15;
      @media (min-width: 768px) { font-size: var(--text-6xl); }
    }
  }

  .footer-desc {
    position: relative;
    font-size: var(--text-lg);
    color: var(--color-text-secondary);
    max-width: 480px;
    line-height: var(--leading-relaxed);
    margin-bottom: var(--space-8);
  }

  .footer-contact {
    position: relative;
    margin-bottom: var(--space-8);
  }

  .footer-email {
    display: inline-flex;
    align-items: center;
    gap: var(--space-3);
    font-size: var(--text-xl);
    font-weight: var(--weight-semibold);
    color: var(--color-accent);
    text-decoration: none;
    transition: gap var(--duration-fast) var(--ease-out),
                color var(--duration-fast) var(--ease-out);
    @media (min-width: 768px) { font-size: var(--text-2xl); }

    &:hover {
      color: var(--color-accent-hover);
      gap: var(--space-4);
    }
  }

  .footer-links {
    position: relative;
    display: flex;
    gap: var(--space-3);
    flex-wrap: wrap;
    margin-bottom: var(--space-10);
  }

  .footer-link-item {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: var(--space-3) var(--space-5);
    background: var(--color-surface-1);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-full);
    color: var(--color-text-secondary);
    font-size: var(--text-sm);
    font-weight: var(--weight-medium);
    text-decoration: none;
    backdrop-filter: blur(8px);
    transition: all var(--duration-normal) var(--ease-out);

    &:hover {
      color: var(--color-text);
      background: var(--color-surface-2);
      border-color: var(--color-border-hover);
      transform: translateY(-2px);
    }
  }

  .footer-divider {
    height: 1px;
    background: linear-gradient(to right, transparent, var(--color-border), transparent);
    margin-bottom: var(--space-6);
  }

  .footer-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;

    p {
      font-size: var(--text-sm);
      color: var(--color-text-tertiary);
      margin-bottom: 0;
    }
  }

  @media (max-width: 600px) {
    footer { text-align: center; }
    .footer-desc { margin-left: auto; margin-right: auto; }
    .footer-links { justify-content: center; }
    .footer-bottom { flex-direction: column; gap: var(--space-2); }
  }
</style>
```

**Step 2: Verify in dev**

Check: bold serif headline, mesh gradient glow, email link with arrow animation, pill-shaped social/resume links, gradient divider.

**Step 3: Commit**

```bash
git add src/components/Footer.astro
git commit -m "feat: redesign footer with bold CTA and mesh gradient"
```

---

## Task 15: Add Magnetic Button Interactions

**Files:**
- Create: `src/scripts/magnetic.ts`
- Modify: `src/pages/index.astro` (import magnetic script)

**Step 1: Create magnetic effect script**

Create `src/scripts/magnetic.ts`:

```typescript
export function initMagnetic() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if ('ontouchstart' in window) return;

  const elements = document.querySelectorAll('.cta, .footer-link-item, .social-link, .nav-link');

  elements.forEach((el) => {
    const htmlEl = el as HTMLElement;

    htmlEl.addEventListener('mousemove', (e) => {
      const rect = htmlEl.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const distance = Math.sqrt(x * x + y * y);
      const maxDistance = 50;

      if (distance < maxDistance) {
        const scale = 0.3;
        htmlEl.style.transform = `translate(${x * scale}px, ${y * scale}px)`;
      }
    });

    htmlEl.addEventListener('mouseleave', () => {
      htmlEl.style.transform = '';
      htmlEl.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
      setTimeout(() => { htmlEl.style.transition = ''; }, 500);
    });
  });
}
```

**Step 2: Import in `index.astro`**

Add a new `<script>` block:

```html
<script>
  import { initMagnetic } from '../scripts/magnetic';
  initMagnetic();
</script>
```

**Step 3: Verify in dev**

Hover CTA buttons and nav links — they should subtly follow the cursor.

**Step 4: Commit**

```bash
git add src/scripts/magnetic.ts src/pages/index.astro
git commit -m "feat: add magnetic button interactions"
```

---

## Task 16: Update `index.astro` Layout for New Design

**Files:**
- Modify: `src/pages/index.astro` (update layout styles)

**Step 1: Update the main element styles**

The hero now handles its own full-viewport height, so `main` should not add padding-top for it. The hero sits before `main` or the sections handle their own spacing.

Update the `<style>` block:

```scss
main {
  width: 100%;
  max-width: var(--max-width);
  margin: 0 auto;
  padding-left: var(--space-6);
  padding-right: var(--space-6);

  @media (max-width: 768px) {
    padding-left: var(--space-5);
    padding-right: var(--space-5);
  }
}
```

Remove `padding-top: calc(var(--header-height) + ...)` since the hero handles its own top padding.

**Step 2: Verify all sections render correctly**

```bash
npm run dev
```

Full page check: hero → skills → work → journey → footer. All sections should have generous spacing and proper alignment within the 1200px max-width.

**Step 3: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: update page layout for new section spacing"
```

---

## Task 17: Accessibility & Reduced Motion Audit

**Files:**
- Modify: `src/styles/global.scss` (update reduced motion block)
- Review: all components for ARIA compliance

**Step 1: Update reduced motion styles in `global.scss`**

Replace the existing `@media (prefers-reduced-motion)` block with:

```scss
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

GSAP and Lenis already check `prefers-reduced-motion` and disable themselves. The custom cursor also checks. This CSS catches any remaining CSS animations.

**Step 2: Verify reduced motion**

In browser DevTools → Rendering → Emulate CSS media → `prefers-reduced-motion: reduce`. Page should work with no animations — all content visible, no GSAP, no Lenis, no cursor.

**Step 3: Verify keyboard navigation**

Tab through the entire page — all interactive elements should have visible `:focus-visible` outlines.

**Step 4: Commit**

```bash
git add src/styles/global.scss
git commit -m "feat: update accessibility and reduced motion support"
```

---

## Task 18: Final Build Verification & Polish

**Files:** All

**Step 1: Production build**

```bash
npm run build
```

Expected: Clean build, no errors.

**Step 2: Preview production build**

```bash
npm run preview
```

Open browser, test full page flow:
- [ ] Hero entrance sequence plays
- [ ] Smooth scroll works
- [ ] Custom cursor follows mouse
- [ ] Skills bento grid renders correctly
- [ ] Work cards hover effects work
- [ ] Journey timeline line draws on scroll
- [ ] Footer mesh gradient visible
- [ ] Magnetic buttons work
- [ ] Mobile responsive (resize to 375px)
- [ ] Reduced motion mode works

**Step 3: Final commit**

```bash
git add -A
git commit -m "feat: portfolio premium redesign complete"
```

---

## Summary of Changes

| Component | Before | After |
|-----------|--------|-------|
| **Palette** | Navy #0a0f1e + amber #fca311 | Charcoal #09090b + indigo #818cf8 |
| **Fonts** | Inter only | Instrument Serif + Sora + Inter |
| **Max width** | 960px | 1200px |
| **Scroll** | Native | Lenis smooth scroll |
| **Animations** | IntersectionObserver fade | GSAP ScrollTrigger (clip-path, stagger, scrub) |
| **Cursor** | Native | Custom dot with context states |
| **Hero** | Standard intro | 100vh + particles + GSAP entrance |
| **Skills** | Uniform grid | Bento grid with glow |
| **Work** | 2-column grid | Asymmetric + hover overlay |
| **Journey** | Left-aligned timeline | Alternating + scroll-drawn line |
| **Footer** | Standard contact | Bold serif CTA + mesh gradient |
| **Interactions** | Hover scale | Magnetic + glassmorphism + glow |

**New Dependencies:**
- `gsap` (~24KB gzipped)
- `lenis` (~8KB gzipped)
- Total added JS: ~32KB gzipped
