# Portfolio V4 — Premium Redesign ("Vercel Studio")

**Date**: 2026-03-14
**Approach**: Structural redesign with polished premium aesthetic
**Inspiration**: Linear, Vercel, Raycast — deep charcoal, glassmorphism, immersive motion
**Stack**: Astro 5 + SCSS + GSAP + Lenis (no Three.js, canvas particles instead)

---

## 1. Design Foundation

### Color Palette

Deep charcoal ecosystem replacing the current dark navy + amber.

| Token | Value | Purpose |
|-------|-------|---------|
| `--color-bg` | `#09090b` | Page background (zinc-950) |
| `--color-bg-subtle` | `#18181b` | Elevated background (zinc-900) |
| `--color-surface-1` | `rgba(255,255,255,0.03)` | Cards, panels |
| `--color-surface-2` | `rgba(255,255,255,0.06)` | Hover states |
| `--color-surface-3` | `rgba(255,255,255,0.09)` | Selected/focused |
| `--color-border` | `rgba(255,255,255,0.06)` | Subtle dividers |
| `--color-border-hover` | `rgba(255,255,255,0.12)` | Interactive borders |
| `--color-text` | `#fafafa` | Primary text |
| `--color-text-secondary` | `#a1a1aa` | Secondary (zinc-400) |
| `--color-text-tertiary` | `#71717a` | Muted (zinc-500) |
| `--color-accent` | `#818cf8` | Primary accent — indigo-400 |
| `--color-accent-hover` | `#a5b4fc` | Accent hover — indigo-300 |
| `--color-accent-glow` | `rgba(129,140,248,0.15)` | Glow effects |
| `--color-accent-subtle` | `rgba(129,140,248,0.08)` | Accent backgrounds |

Mesh gradient accents: subtle radial gradients using accent at 8-10% opacity behind sections.

Glassmorphism: `background: rgba(255,255,255,0.03)`, `backdrop-filter: blur(12px)`, `border: 1px solid rgba(255,255,255,0.06)`.

### Typography

| Use | Font | Weights |
|-----|------|---------|
| Display | Instrument Serif | 400 |
| Headings | Sora | 500, 600 |
| Body | Inter | 400, 500 |
| Mono | JetBrains Mono | 400 |

Hero headline at `--text-6xl` (4rem) with `clamp()` fluid sizing.

### Layout

- Max width: 1200px (up from 960px)
- Section padding: 120-160px vertical
- Grid: CSS Grid with named areas for bento layouts
- Spacing: 8pt grid (keep existing)
- Breakpoints: 480px, 768px, 1024px (keep existing)

---

## 2. Motion System & Global Interactions

### Smooth Scroll — Lenis (~8KB gzipped)

- `lerp: 0.1` (slightly damped)
- Integrates with GSAP ScrollTrigger
- Respects `prefers-reduced-motion`

### GSAP ScrollTrigger Reveal System

| Element | Animation | Trigger |
|---------|-----------|---------|
| Section headings | Clip-path reveal (bottom→top) + Y offset | Viewport 80% |
| Body text | Fade + translateY(30px), 0.1s stagger/line | Viewport 70% |
| Cards/grid | Scale 0.95→1 + fade, 0.08s stagger | Viewport 60% |
| Images | Clip-path reveal + parallax offset | On enter |
| Decorative | Parallax 0.3-0.5x speed | Continuous |

Easing: `power3.out` (entrances), `power2.inOut` (transitions). No bounce/spring.

### Custom Cursor

| Context | State |
|---------|-------|
| Default | 8px dot, `mix-blend-mode: difference` |
| Links/buttons | Expands to ~40px circle with border |
| Project cards | Expands + "View" text |
| Text | Thin vertical bar |

GPU-accelerated `transform`, mouse follow with `lerp: 0.15`. Hidden on touch.

### Magnetic Interactions

Buttons/links pull toward cursor within ~50px. Scaled translate within bounding box, spring back on leave (`power3.out`). Applied to: CTA buttons, social links, nav items.

### Glassmorphism Cards

Base recipe + gradient border that shifts on hover. Mouse-tracking radial glow inside card on hover.

### Timing Tokens

| Token | Value | Use |
|-------|-------|-----|
| `--duration-fast` | `200ms` | Hover, cursor |
| `--duration-normal` | `400ms` | Reveals |
| `--duration-slow` | `700ms` | Section entrances |
| `--duration-hero` | `1200ms` | Hero sequence |
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | Most animations |
| `--ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` | Transitions |

---

## 3. Hero Section (100vh)

### Content

- "Hi, I'm" — Inter, secondary text
- "Sharad Bhadait." — Instrument Serif, ~4rem, primary text
- Tagline — Sora, ~1.25rem, secondary text
- Availability badge — green pulse dot (keep existing)
- Two CTA buttons — glassmorphism style
- Scroll indicator at bottom center

### Entrance Sequence (GSAP Timeline, ~1.2s)

1. 0ms: dark bg, particles fade in
2. 200ms: "Hi, I'm" fade + Y offset
3. 400ms: name clip-path reveal (left→right)
4. 700ms: tagline fade + Y(20px)
5. 900ms: badge slide from left
6. 1100ms: CTAs stagger fade
7. 1200ms: scroll indicator bounce begins

### Canvas Particle Field

- 60-80 dots (2-3px), muted color at 30% opacity
- Lines between dots within 120px
- Mouse repulsion within 100px radius
- Slow ambient drift (0.2-0.5px/frame)
- Pauses when not in viewport
- ~200 lines vanilla JS

### Mesh Gradient

Large accent radial gradient at 8-10% opacity, upper-right, slight mouse parallax (0.05x).

---

## 4. Skills Section — Bento Grid

### Layout

4-column CSS Grid with varied spans:
- Primary skills: 2-column span, taller cards
- Secondary skills: 1-column span, standard height
- Creates size-based hierarchy

### Cards

- Glassmorphism base
- Mouse-tracking radial glow on hover
- Monochrome icons → accent color on hover
- Entrance: scale(0.95)→1 + fade, 80ms stagger

### Responsive

- Desktop: 4-column with varied spans
- Tablet: 2-column, equal size
- Mobile: single column

---

## 5. Work Section — Asymmetric Project Grid

### Layout Pattern

Full-width → Two-up → Full-width → Two-up (alternating rhythm).

### Project Card

- Image: 16:10 aspect ratio, `overflow: hidden`, `border-radius: 16px`
- Title: Sora 500
- Description: Inter 400, text-secondary
- Tags: glassmorphism pill badges

### Hover Interaction

1. Image scales to 1.03
2. Dark overlay fades in (20% opacity)
3. "View Project →" label appears center
4. Custom cursor expands
5. Tags get subtle glow

### Entrance

- Cards: clip-path `inset(100% 0 0 0)` → `inset(0)` (curtain lift)
- Text: fades in with Y offset, 200ms after image
- Stagger: 150ms between cards in a row

### Responsive

- Desktop: alternating full/two-up
- Tablet & mobile: single column

---

## 6. Journey Section — Scroll-Driven Timeline

### Layout

Vertical alternating timeline: odd entries right, even entries left, connected by a center line.

### Scroll Animation (GSAP ScrollTrigger, scrub: true)

- Timeline line draws itself downward in sync with scroll
- Dot nodes scale from 0 as line reaches them
- Year labels clip-path reveal
- Cards slide in from their respective side + fade

### Cards

- Glassmorphism (same as skills)
- Year badge: accent pill
- Tech tags: small pills

### Responsive

- Desktop: alternating left/right
- Mobile: all cards right, line on left edge

---

## 7. Header

- Fixed, glassmorphism on scroll (`backdrop-filter: blur(16px)`, `rgba(9,9,11,0.8)`)
- "SB" monogram (Instrument Serif) instead of full name
- Nav links: text-secondary → text on hover, underline draws left→right
- Active section: accent dot next to link (scroll-spy)
- Mobile: hamburger → full-screen overlay, staggered link reveals
- Scroll: transparent at top, glassmorphism after 50px, hides on scroll-down, reappears on scroll-up

---

## 8. Footer / CTA

- "Let's build something together." — Instrument Serif, ~3rem
- Availability description — Inter, text-secondary
- Email link — large, accent-colored, magnetic hover, arrow animates
- Social icons — glassmorphism pill buttons, magnetic hover
- Gradient divider line
- Copyright row
- Mesh gradient accent glow behind CTA text
- Entrance: clip-path reveal on headline, stagger on email/socials

---

## 9. New Dependencies

| Package | Purpose | Size (gzipped) |
|---------|---------|-----------------|
| `gsap` | ScrollTrigger, timeline animations | ~24KB |
| `lenis` | Smooth scroll | ~8KB |

Total additional JS: ~32KB gzipped.

### Fonts (Google Fonts)

- Instrument Serif (400)
- Sora (500, 600)
- Inter (400, 500) — already loaded
- JetBrains Mono (400) — already loaded

---

## 10. Accessibility

- All animations respect `prefers-reduced-motion` — disable GSAP, Lenis, custom cursor
- Custom cursor supplements native cursor (doesn't replace)
- Keyboard navigation preserved with `:focus-visible` styles
- Skip link retained
- ARIA labels on all sections
- Color contrast: WCAG AA minimum on all text

---

## 11. Performance Strategy

- Astro island architecture: GSAP/Lenis hydrate only on client
- Canvas particles pause when out of viewport
- Images: WebP/AVIF, lazy loading, responsive srcset
- CSS code splitting (Astro default)
- Target: Lighthouse 90+ on all categories
