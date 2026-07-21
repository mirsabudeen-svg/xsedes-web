# XSMITHS Design System

**Version 1.0 · Master Reference**

Status: Canonical  
Audience: Product designers, UX architects, frontend engineers, motion designers, 3D artists, photographers, marketing, AI agents  
Constitution: *XSMITHS Creative Direction Bible* (all decisions trace back to it)  
Scope: Digital surfaces, motion, photography, illustration, presentations, and physical-digital touchpoints  

This document translates brand philosophy into enforceable system rules. It removes subjective decision-making. If a choice is not covered here, default to the Creative Direction Bible, then escalate — do not invent.

---

## Document map

| Part | Subject |
|------|---------|
| 1 | Design principles |
| 2 | Design tokens |
| 3 | Colour system |
| 4 | Typography |
| 5 | Grid system |
| 6 | Spacing language |
| 7 | Components |
| 8 | Interaction language |
| 9 | Motion system |
| 10 | 3D philosophy |
| 11 | Photography system |
| 12 | Illustration system |
| 13 | Iconography |
| 14 | Responsive design |
| 15 | Accessibility |
| 16 | Do's and don'ts (100 rules) |

**Implementation note:** Token names use the `xs-` prefix in code (`--xs-accent`, etc.). Parent XSEDES repo tokens (`--ink`, `--accent`, `--text`) remain valid aliases during migration; new XSMITHS work should prefer `xs-*` semantics defined here.

---

# PART 1 — Design principles

These principles derive directly from the Creative Direction Bible. They govern every token, component, and motion decision below.

### P1 — Technology disappears; emotion remains
Remove any element that draws attention to machinery before attention to feeling. If a visitor notices the interface, the experience failed at that moment.

### P2 — Wonder before explanation
Show effect first. Mechanism second — only when requested or on dedicated deep-dive surfaces (spec sheets, ops docs), never in first contact.

### P3 — Darkness is legibility infrastructure
Black canvas is not mood. It is the controlled environment in which light, motion, and response remain readable — equivalent to a lab's dark field.

### P4 — Motion is proof of intelligence
Stillness communicates nothing about responsiveness. Motion must be purposeful, slow, and weighted — never decorative jitter.

### P5 — One idea per room
Each section, screen, or gallery holds a single conceptual unit. Two competing ideas require two rooms (sections), not one crowded layout.

### P6 — The accent is a scalpel
`#4EF2D3` marks the one thing that matters in a composition. It is never a theme colour applied broadly.

### P7 — Silence is designed
Whitespace, stillness, and pause are active decisions — not loading gaps or empty layout failure.

### P8 — Weight follows importance
Typography scale, motion duration, and spatial footprint correlate with hierarchy. Important elements are larger, slower, and given more air — never louder through decoration.

### P9 — Respond; do not request
Default interaction model: the system notices and acts. User-initiated controls are fallback, not hero.

### P10 — Threshold, not billboard
Entrances announce transition. They do not summarize the entire experience before the visitor has stepped inside.

### P11 — Craftsmanship holds the magic
Every visible moment of wonder must imply invisible reliability. Visual language must never suggest fragility or demo-only quality.

### P12 — Editorial restraint
One strong image. Short copy. Generous margin. Caption discipline over paragraph density.

### P13 — Material honesty
Surfaces suggest real materials (steel, glass, concrete, fog) through light behaviour — never through skeuomorphic texture overlays or fake depth.

### P14 — Structure as ornament
Hairlines, corner marks, and grid lines replace drop shadows and card chrome. Structure is the decoration.

### P15 — Design for the room, not the screen
Even digital deliverables follow spatial sequencing: threshold → corridor → gallery → installation.

### P16 — Confidence is quiet
No urgency typography, no countdown aesthetics, no bounce easing, no "look at me" loops.

### P17 — The visitor's story is the product
Every showcase must be retellable in first person: "I walked in and it did this."

### P18 — Single focal point per view
At any viewport state, one emotional centre. Secondary elements support; they do not compete.

### P19 — Timeless over trendy
Reject glassmorphism trends, neon cyberpunk, gradient meshes, and SaaS-dashboard patterns regardless of current market fashion.

### P20 — Accessibility is craft, not compliance checkbox
Contrast, motion reduction, and keyboard paths are part of engineering excellence — the same standard applied to on-site installations.

---

# PART 2 — Design tokens

Tokens are the contract between design and engineering. All values are canonical; do not introduce ad-hoc literals in components.

## 2.1 Spacing scale

Base unit: **4px**. All spacing snaps to the scale.

| Token | Value | Use |
|-------|-------|-----|
| `xs-space-0` | 0 | Reset |
| `xs-space-1` | 4px | Hairline gaps, icon padding |
| `xs-space-2` | 8px | Tight inline groups |
| `xs-space-3` | 12px | Label-to-field |
| `xs-space-4` | 16px | Compact component padding |
| `xs-space-5` | 20px | — |
| `xs-space-6` | 24px | Card internal padding (minimum) |
| `xs-space-8` | 32px | Philosophy line gap |
| `xs-space-10` | 40px | Section sub-blocks |
| `xs-space-12` | 48px | Service column gap |
| `xs-space-14` | 56px | Section label margin |
| `xs-space-16` | 64px | — |
| `xs-space-20` | 80px | Footer padding |
| `xs-space-24` | 96px | — |
| `xs-space-30` | 120px | **Standard section vertical padding** |
| `xs-space-40` | 160px | Major section break |
| `xs-space-50` | 200px | Hero breathing |
| `xs-space-60` | 240px | Installation-scale pause |

**Why:** Architectural pacing requires jumps large enough to register as "new room," not incremental scroll increments.

## 2.2 Sizing scale

| Token | Value | Use |
|-------|-------|-----|
| `xs-size-icon-sm` | 16px | Inline icons |
| `xs-size-icon-md` | 20px | Navigation |
| `xs-size-icon-lg` | 24px | Feature icons |
| `xs-size-touch-min` | 44px | Minimum touch target (WCAG) |
| `xs-size-reticle` | 48px | Corner bracket arm |
| `xs-size-nav-height` | 72px | Sticky nav |
| `xs-size-hero-min` | 92vh | Hero minimum height |
| `xs-size-content-narrow` | 560px | Forms, single column |
| `xs-size-content-reading` | 620px | Hero pitch, lede |
| `xs-size-content-standard` | 900px | Philosophy list |
| `xs-size-content-wide` | 1100px | Product grid max |
| `xs-size-content-full` | 1440px | Page max content |

## 2.3 Radius

XSMITHS uses **zero radius** as default. Rounded corners signal consumer software; XSMITHS signals engineered structure.

| Token | Value | Use |
|-------|-------|-----|
| `xs-radius-none` | 0 | **Default** — buttons, inputs, cards |
| `xs-radius-sm` | 2px | Exception: focus ring offset only |
| `xs-radius-full` | 9999px | Status dots only (live indicator) |

**Why:** Corner marks and hairlines define shape — not border-radius.

## 2.4 Shadows

**Drop shadows are prohibited** on XSMITHS surfaces (see Part 16). Depth is communicated through:

| Token | Value | Use |
|-------|-------|-----|
| `xs-depth-hairline` | 1px solid `xs-border-default` | Surface separation |
| `xs-depth-hairline-strong` | 1px solid `xs-border-strong` | Active borders |
| `xs-depth-accent` | 2px solid `xs-accent-primary` | Service pillar top rule |
| `xs-depth-inset` | inset 0 0 0 1px rgba(255,255,255,0.06) | Subtle containment |

## 2.5 Opacity

| Token | Value | Use |
|-------|-------|-----|
| `xs-opacity-disabled` | 0.38 | Disabled controls |
| `xs-opacity-muted` | 0.55 | Secondary body (`dim`) |
| `xs-opacity-subtle` | 0.32 | Tertiary (`faint`) |
| `xs-opacity-nav` | 0.85 | Nav link default |
| `xs-opacity-overlay` | 0.90 | Sticky nav backdrop |
| `xs-opacity-glass` | 0.028 | Glass surface fill |
| `xs-opacity-hover-surface` | 0.03 | Grid cell hover |

## 2.6 Blur

| Token | Value | Use |
|-------|-------|-----|
| `xs-blur-nav` | 6px | Sticky navigation backdrop |
| `xs-blur-reveal` | 6px | Motion reveal initial state |
| `xs-blur-none` | 0 | Reduced motion fallback |

**Why:** Blur in motion implies emergence into focus — not frosted-glass UI chrome.

## 2.7 Elevation (z-index)

| Token | Value | Layer |
|-------|-------|-------|
| `xs-z-base` | 0 | Content |
| `xs-z-raised` | 10 | Sticky section labels |
| `xs-z-nav` | 20 | XSMITHS navigation |
| `xs-z-overlay` | 40 | Modals, lightboxes |
| `xs-z-toast` | 50 | Form feedback |
| `xs-z-skip` | 100 | Skip link |

No arbitrary z-index values. If a new layer is needed, update this table.

## 2.8 Animation duration

| Token | Value | Use |
|-------|-------|-----|
| `xs-duration-instant` | 0ms | Reduced motion |
| `xs-duration-fast` | 200ms | Hover colour only |
| `xs-duration-ui` | 250ms | Grid cell background |
| `xs-duration-mechanical` | 550ms | UI transitions |
| `xs-duration-standard` | 900ms | Hero fade-up, reveals |
| `xs-duration-slow` | 1200ms | Section choreography |
| `xs-duration-glacial` | 1800ms | Installation-scale holds |

**Why:** Durations below 400ms feel anxious; above 1200ms feel broken unless held intentionally.

## 2.9 Animation curves

| Token | Value | Use |
|-------|-------|-----|
| `xs-ease-mechanical` | `cubic-bezier(0.22, 0.61, 0.2, 1)` | **Default** — all motion |
| `xs-ease-enter` | same as mechanical | Reveals |
| `xs-ease-exit` | same as mechanical | Exits (never bounce) |

**Prohibited:** spring, elastic, bounce, overshoot easings.

## 2.10 Typography scale tokens

See Part 4 for semantic roles. Numeric tokens:

| Token | Size (clamp desktop) | Weight |
|-------|----------------------|--------|
| `xs-type-display-xl` | clamp(56px, 10vw, 128px) | 700 |
| `xs-type-display-lg` | clamp(40px, 6vw, 86px) | 700 |
| `xs-type-heading-xl` | clamp(36px, 5vw, 64px) | 700 |
| `xs-type-heading-lg` | clamp(30px, 4.2vw, 56px) | 700 |
| `xs-type-heading-md` | clamp(24px, 3vw, 36px) | 600 |
| `xs-type-title` | 22px | 600 |
| `xs-type-body-lg` | 18px | 300 |
| `xs-type-body` | 16–17px | 300–400 |
| `xs-type-body-sm` | 14–15px | 300 |
| `xs-type-caption` | 12–13px | 400–500 |
| `xs-type-label` | 11–12px | 600, uppercase |
| `xs-type-micro` | 9–10px | 600–700, uppercase |

## 2.11 Container widths

| Token | Value |
|-------|-------|
| `xs-container-page` | 100% |
| `xs-container-pad` | 5% horizontal (min 28px, max 110px) |
| `xs-container-narrow` | 560px |
| `xs-container-reading` | 620px |
| `xs-container-standard` | 900px |
| `xs-container-wide` | 1100px |

## 2.12 Breakpoints

| Token | Min width | Context |
|-------|-----------|---------|
| `xs-bp-sm` | 480px | Large phone |
| `xs-bp-md` | 768px | Tablet portrait |
| `xs-bp-lg` | 1024px | Tablet landscape / small laptop |
| `xs-bp-xl` | 1280px | Desktop |
| `xs-bp-2xl` | 1536px | Large display |
| `xs-bp-3xl` | 1920px | Presentation / ultrawide |

**Mobile-first.** Default layouts are single-column; grid complexity increases at `md` and `lg`.

## 2.13 Grid

| Token | Value |
|-------|-------|
| `xs-grid-columns` | 12 |
| `xs-grid-gutter` | 1px (hairline gap grid) or 48px (editorial) |
| `xs-grid-margin` | `xs-container-pad` |

---

# PART 3 — Colour system

Colours communicate purpose. Decorative colour is prohibited.

## 3.1 Primary

| Token | Hex / value | Purpose |
|-------|-------------|---------|
| `xs-accent-primary` | `#4EF2D3` | Signal teal — **the only chromatic accent** |
| `xs-accent-primary-muted` | `rgba(78, 242, 211, 0.30)` | Focus rings, borders on dark |
| `xs-accent-primary-subtle` | `rgba(78, 242, 211, 0.12)` | Hover backgrounds (rare) |

**When to use:** Section labels (one element), taglines, active nav, service top rules, reticle brackets, CTA fill, philosophy emphasis words, focus outlines.

**When not to use:** Body text, long paragraphs, large background fills, decorative gradients, icon fills en masse.

## 3.2 Neutral text

| Token | Value | Purpose |
|-------|-------|---------|
| `xs-text-primary` | `#EDF2F0` | Primary reading text |
| `xs-text-secondary` | `rgba(237, 242, 240, 0.55)` | Body, descriptions (`dim`) |
| `xs-text-tertiary` | `rgba(237, 242, 240, 0.32)` | Labels, meta (`faint`) |
| `xs-text-inverse` | `#000000` | Text on accent-filled buttons |

## 3.3 Surface

| Token | Value | Purpose |
|-------|-------|---------|
| `xs-surface-canvas` | `#000000` | Page background — pure black |
| `xs-surface-raised` | `#141414` | Hover grid cell (`gray-3` equivalent) |
| `xs-surface-sunken` | `#0A0A0A` | Manifesto block, inset panels |
| `xs-surface-glass` | `rgba(255, 255, 255, 0.028)` | Low-opacity glass only |

## 3.4 Interaction

| Token | Value | Purpose |
|-------|-------|---------|
| `xs-border-default` | `rgba(255, 255, 255, 0.09)` | Hairlines, grid gaps |
| `xs-border-strong` | `rgba(255, 255, 255, 0.16)` | Corner marks, input default |
| `xs-border-accent` | `rgba(78, 242, 211, 0.30)` | Input focus, active card |
| `xs-border-hover` | `rgba(78, 242, 211, 1)` | Nav hover, CTA outline hover |

## 3.5 State

| Token | Purpose |
|-------|---------|
| `xs-state-hover-text` | Text shifts to accent |
| `xs-state-hover-surface` | `rgba(255,255,255,0.03)` |
| `xs-state-active-surface` | Accent fill with inverse text |
| `xs-state-focus-ring` | 2px `xs-accent-primary`, 2–4px offset |
| `xs-state-disabled-opacity` | 0.38 |

## 3.6 Semantic (functional only)

| Token | Value | Use |
|-------|-------|-----|
| `xs-semantic-success` | `#4EF2D3` | Form success (reuse accent — no second green) |
| `xs-semantic-error` | `#EDF2F0` | Error text (not red — avoids alarm aesthetic) |
| `xs-semantic-warning` | `rgba(237, 242, 240, 0.55)` | Inline warnings |

**Why no red:** Error states use copy clarity + `role="alert"`, not colour panic. If stronger error signalling is required, use border emphasis — still not red.

## 3.7 Overlay

| Token | Value | Use |
|-------|-------|-----|
| `xs-overlay-scrim` | `rgba(0, 0, 0, 0.85)` | Modal backdrop |
| `xs-overlay-nav` | `rgba(0, 0, 0, 0.90)` | Sticky nav |

## 3.8 Glass

Glass is **restricted**. Maximum fill opacity: 0.028. Always paired with backdrop-blur ≤ 6px. Never stack glass on glass.

## 3.9 Depth

Depth is achieved through **border, spacing, and motion** — not shadow stacks or gradient vignettes.

## 3.10 Background rules

- Canvas is always `#000000` for digital brand surfaces.
- Light theme is a **P2** capability (light lockup exists for print/exception); default is dark.
- No background images behind body text without scrim ≥ 0.85 opacity.
- Grid texture (when used) is hairline at ≤ 0.09 opacity — structural, not decorative.

---

# PART 4 — Typography

## 4.1 Typefaces

| Role | Family | Source | Why |
|------|--------|--------|-----|
| **Primary** | Barlow | Google / self-hosted | Mechanical, engineered, readable at all scales. Shared infrastructure with XSEDES but used with different rhythm and warmth here. |
| **Accent** | Instrument Serif | Google / self-hosted | **Italic only.** Human voice breaking through the mechanical system — max once per composition moment. |
| **Prohibited on web** | Chakra Petch, IBM Plex, serif body faces | — | Deck/PDF system only. Never on live XSMITHS surfaces. |

## 4.2 Semantic roles

### Display
- **Role:** Hero wordmark, architectural facade type.
- **Token:** `xs-type-display-xl`, `xs-type-display-lg`
- **Weight:** 700
- **Tracking:** 0.04em – 0.12em (wide for XSMITHS wordmark)
- **Case:** Uppercase for brand name; sentence case prohibited in display sizes.

### Heading
- **Role:** Section titles, page H1.
- **Token:** `xs-type-heading-xl` through `md`
- **Weight:** 700 (H1), 600 (H2)
- **Case:** Uppercase for page titles; sentence case for in-section headings only when inside long-form about content.

### Title
- **Role:** Card titles, product family names.
- **Token:** `xs-type-title`
- **Weight:** 600
- **Tracking:** 0.06em

### Body
- **Role:** Descriptions, manifesto (long-form).
- **Token:** `xs-type-body`, `body-lg`, `body-sm`
- **Weight:** 300 (light) for descriptions; 400 for manifesto paragraphs.
- **Max width:** 62–68ch

### Caption
- **Role:** Supporting lines under titles.
- **Token:** `xs-type-caption`
- **Colour:** `xs-text-secondary` only — never accent.

### Label
- **Role:** Section labels (`§ 01 · PHILOSOPHY`), form labels, division tags.
- **Token:** `xs-type-label`, `xs-type-micro`
- **Case:** Uppercase always.
- **Tracking:** 0.18em – 0.28em
- **Prefix rule:** Section labels use `§ NN · NAME` format with accent hairline before text.

### Button
- **Role:** CTA labels.
- **Token:** `xs-type-micro` or label scale.
- **Weight:** 700
- **Case:** Uppercase
- **Tracking:** 0.22em – 0.26em

### Code / technical annotation
- **Role:** Spec references, API labels (rare on marketing site).
- **Family:** Barlow 500, not monospace — unless literal code blocks.
- **Monospace:** system-ui monospace for code blocks only.

### Editorial accent (Instrument Serif)
- **Role:** Single emphasized word in philosophy lines, footer CTA accent.
- **Style:** Italic only.
- **Colour:** `xs-accent-primary`
- **Frequency:** Maximum one accent word per visible block.

### Architectural typography
- Large-scale type treated as spatial element: occupies vertical rhythm equivalent to a wall. Used sparingly — hero, manifesto closing line.

## 4.3 Line height

| Role | Line height |
|------|-------------|
| Display | 0.95 – 1.05 (tight — architectural) |
| Heading | 1.04 – 1.10 |
| Body | 1.6 – 1.75 (relaxed — editorial) |
| Label | 1.2 |

## 4.4 Tracking reference

Wide tracking is a **label and tagline** device, not a body device. Body text uses default or slightly positive tracking only.

## 4.5 Maximum line lengths

| Content type | Max width |
|--------------|-----------|
| Hero pitch | 620px / ~42ch |
| Body paragraph | 68ch |
| Philosophy line | 900px container |
| Form labels | 100% of field |

## 4.6 Reading rhythm

Alternate **dense moment** (single large line) with **rest** (paragraph of light weight body). Never three dense blocks sequentially without a corridor (spacing-30+) between them.

---

# PART 5 — Grid system

XSMITHS does not use generic Bootstrap layouts. Five layout modes correspond to spatial archetypes from the Creative Direction Bible.

## 5.1 Architectural grid (default)

- 12 columns, fluid margin `xs-container-pad`.
- Content aligns to column edges; hairline grid visible only when it encodes structure (product matrix).
- **Use:** Most pages, services, about.

## 5.2 Editorial grid

- Asymmetric: 7/5 or 8/4 column splits.
- Large left margin negative space; text block offset from centre.
- **Use:** Story sections, manifesto, long-form about.
- **Why:** Editorial calm — Monocle/Kinfolk discipline without their pastel palette.

## 5.3 Gallery grid

- 3×3 product family matrix with 1px hairline gaps (`gap-px` + border).
- Cells equal height minimum 200px.
- **Use:** Product ecosystem overview, homepage preview.
- **Why:** Museum wall of exhibits — one work per cell.

## 5.4 Immersive grid

- Full-bleed single column, 92vh hero, reticle brackets at 5% inset.
- Content centred; horizontal padding only.
- **Use:** Hero, installation previews, showreel embeds.
- **Why:** Threshold room — visitor at the door.

## 5.5 Asymmetrical grid

- Intentional off-centre focal point (60/40 vertical or horizontal split).
- **Use:** Case study hero (when approved), feature moments.
- **Why:** Prevents template symmetry that reads as corporate.

## 5.6 When to use which

| Content | Layout mode |
|---------|-------------|
| Homepage hero | Immersive |
| Philosophy list | Architectural (narrow 900px) |
| Product grid | Gallery |
| About story | Editorial |
| Contact form | Architectural (narrow 560px) |
| Services pillars | Architectural 3-col |

---

# PART 6 — Spacing language

## 6.1 Visual rhythm

Rhythm unit: **120px vertical section padding** (`xs-space-30`) as default beat. Double beat (240px) before manifesto or major narrative turns. Half beat (56–64px) inside sections between related elements.

## 6.2 Breathing room

If two elements feel like they are competing, increase space — never add a divider first. Dividers (hairlines) mark **topic change**, not proximity failure.

## 6.3 Negative space

Negative space is **active composition**. Minimum 40% of any hero viewport should be empty canvas. Product grid cells must have internal padding ≥ 36px so content does not touch hairlines.

## 6.4 Content density

| Surface | Density |
|---------|---------|
| Hero | Sparse (≤ 4 text elements) |
| Product cell | Medium (number, name, one line) |
| About / manifesto | Medium-low |
| Form | Medium |
| Footer | Low |

## 6.5 Section spacing

Every section: `border-b border-hairline` except page end. Section label → content gap: 56px (`xs-space-14`).

## 6.6 Page pacing

Sequence: **Threshold (hero) → Belief (philosophy) → Catalogue (products) → Capability (services) → Trust (about/partner line) → Action (contact).**

Do not reorder without UX rationale tied to emotional journey (Part 1 Creative Bible §5).

---

# PART 7 — Components

Components are defined by **purpose, behaviour, and states** — not pixel mockups.

## 7.1 Buttons

**Purpose:** Commit to a single action — contact, submit, navigate to conversation.

**Variants:**
| Variant | Appearance | Use |
|---------|------------|-----|
| Primary | Accent fill, inverse text | One per viewport maximum |
| Secondary | Accent border, transparent fill | Alternate actions |
| Text | No border, accent on hover | Tertiary navigation |

**Behaviour:** 200ms colour transition. No scale on hover. No shadow.

**Motion:** None on idle. Disabled: 0.38 opacity.

**Spacing:** Padding 14px × 34px (label buttons); min-height 44px touch.

**Accessibility:** Focus ring mandatory; `aria-disabled` when inactive.

## 7.2 Navigation

**Purpose:** Orient within XSMITHS mini-site without XSEDES chrome.

**Structure:** Sticky top bar, logo left, links right (desktop), contact escape (mobile).

**Behaviour:** Active route = accent colour. Hover = accent, no underline.

**Motion:** Backdrop blur 6px on scroll. No hide-on-scroll animation (reduces confidence).

**Accessibility:** `nav` landmark; current page `aria-current="page"`.

## 7.3 Cards (product family cell)

**Purpose:** Entry point to one product family — one idea per card.

**Behaviour:** Hover = surface raise (3% white) + title accent. No lift transform.

**Spacing:** Min-height 200px; padding 36px × 28px.

**States:** Default, hover, focus-visible (outline on entire cell).

## 7.4 Media / video

**Purpose:** Show effect, not explain mechanism.

**Behaviour:** Autoplay muted only when in viewport; pause when hidden. No autoplay with sound.

**Motion:** Fade-in when entering viewport — 900ms.

**Accessibility:** Play/pause control always available; respects reduced motion (poster frame static).

## 7.5 Galleries

**Purpose:** Museum wall — equal weight per item unless one featured item is explicitly declared.

**Layout:** Gallery grid (Part 5.3). No masonry — masonry implies Pinterest, not museum.

## 7.6 Carousels

**Use sparingly.** Default to static grid. Carousels only when horizontal space is genuinely insufficient AND content is peer items (not sequential narrative).

**Behaviour:** Drag + arrow keys. No auto-advance.

## 7.7 Modals / lightboxes

**Purpose:** Deep-dive media or detail without leaving spatial context.

**Scrim:** `xs-overlay-scrim`. Focus trap. Escape closes.

**Motion:** Scrim fade 550ms; content fade-up 900ms.

## 7.8 Footers

**Purpose:** Sitemap, venture attribution, final CTA line.

**Structure:** Optional CTA line → link row → "A Venture of XSEDES".

**Behaviour:** CTA hidden on contact page (redundant).

## 7.9 Forms

**Purpose:** Start conversation — not lead-scoring UI.

**Fields:** Name, organization, email, optional product family select, message.

**Behaviour:** POST to shared `/api/contact`; division tagged `XSMITHS`.

**Validation:** Inline on submit; errors in primary text colour with `role="alert"`.

**Spacing:** 20px between fields; labels above fields (not floating).

## 7.10 Inputs

**Appearance:** 1px hairline border, transparent background, no radius.

**Focus:** Border → accent. No glow box-shadow.

**Placeholder:** Tertiary text opacity — never accent.

## 7.11 Search

**Not in v1.** If added: single hairline field, no magnifying-glass-as-decoration-only icon without function.

## 7.12 Pagination

**Not preferred.** Product families fit one overview. If pagination added: text links, not rounded pill buttons.

## 7.13 Project showcases / case studies

**Status:** Blocked until Proof Standard data exists. Component spec reserved:

- Editorial layout, one hero image, caption-only metadata.
- No client logo wall. No stat counters.

## 7.14 Interactive galleries

**Purpose:** Demonstrate responsiveness metaphor in digital space.

**Behaviour:** Mouse position may modulate subtle light position — never gimmicky parallax > 8px shift.

## 7.15 Technology diagrams

**Purpose:** Explain system architecture to technical buyers.

**Style:** Hairline blueprint — white lines on black, accent for signal path only. See Part 12.

## 7.16 Reticle brackets

**Purpose:** Visual motif — "something is about to respond."

**Spec:** 48px arms, 2px accent stroke, inset 5% from hero edges. Decorative only — no interaction.

**Accessibility:** `aria-hidden="true"`.

---

# PART 8 — Interaction language

## 8.1 Hover

- Text links: colour → accent, 200ms.
- Cards: background subtle raise, title accent.
- Buttons: primary inverts or solidifies — no scale.
- Never hover-trigger layout shift affecting siblings.

## 8.2 Scroll

- Default: native scroll. Lenis (if used on parent site) must respect XSMITHS reduced-motion.
- Scroll-triggered reveals: once per element, not re-triggering on scroll up.
- No scroll-jacking. No full-page snap unless installation preview explicitly requires it.

## 8.3 Mouse

- Cursor: default system cursor. No custom cursor trails.
- Interactive galleries: cursor may shift to indicate draggable — system cursors only.

## 8.4 Touch

- Minimum target 44×44px.
- Hover states have `:active` / `:focus-visible` equivalents.
- No hover-only information.

## 8.5 Keyboard

- Tab order follows visual order.
- Skip link to `#main-content` (inherited from parent layout).
- Escape closes overlays.
- Product grid: each cell is one tab stop.

## 8.6 Focus states

- 2px accent outline, 2–4px offset.
- Never `outline: none` without replacement.

## 8.7 Page transitions

- Between XSMITHS routes: optional 300ms opacity crossfade — or instant (prefer instant for confidence).
- No slide transitions between pages (implies mobile app, not architecture).

## 8.8 Scene transitions

- Between sections on same page: scroll reveal only — no hard cuts.

## 8.9 Loading

- No spinners with branded animation. Prefer skeleton hairlines or static content with progressive enhancement.
- Form: text state "Sending…" — no animated loader.

## 8.10 Idle

- No ambient animation loops on idle. Motion requires scroll trigger or user action.

## 8.11 Microinteractions

- Allowed: focus ring, hover colour, reveal on scroll.
- Prohibited: button pulse loops, shaking CTAs, parallax on every layer.

## 8.12 Interaction hierarchy

1. Primary: form submit, main CTA.
2. Secondary: nav links, product cells.
3. Tertiary: footer links, back links.
4. Ambient: none — if it moves without category 1–3 trigger, remove it.

---

# PART 9 — Motion system

## 9.1 Categories

| Category | Duration | Properties | Use |
|----------|----------|------------|-----|
| **Reveal** | 900ms | opacity, y (18–26px), blur (6→0) | Section entrance |
| **UI** | 200–250ms | colour, background | Hover |
| **Mechanical** | 550ms | opacity, border | Modals, nav |
| **Hold** | 1200ms+ | opacity static | Installation moments |

## 9.2 Reveal pattern (canonical)

```
initial: opacity 0, translateY 18px, blur 6px
animate: opacity 1, translateY 0, blur 0
easing: xs-ease-mechanical
stagger: 150ms between siblings (max 5 items)
```

## 9.3 Scroll choreography

- Trigger: element 15% in viewport.
- Once: true.
- Stagger philosophy lines 0ms / 0 / 0 — reveal as group, not cascade (they are one poem).

## 9.4 Layer transitions

- Background static. Foreground text reveals. Never animate background separately from content (causes seasickness).

## 9.5 Typography animation

- Words do not animate individually except hero tagline (optional).
- Instrument Serif accent words: never animate independently — animate parent line.

## 9.6 Reduced motion

When `prefers-reduced-motion: reduce`:
- All durations → 0ms or opacity-only 200ms.
- Blur removed from reveals.
- GSAP ScrollTrigger: `invalidateOnRefresh: false`; use `prefers-reduced-motion` media query wrapper.

## 9.7 GSAP implementation notes (for engineers)

- Use GSAP + ScrollTrigger for section reveals — not CSS transitions on same element as Framer Motion.
- Framer Motion permitted on XSMITHS homepage hero only if isolated — do not mix on one element.
- Always `gsap.context()` + cleanup on unmount.
- Pause timelines when tab hidden.

---

# PART 10 — 3D philosophy

## 10.1 When to use

- **Hero installation preview** — one scene maximum per page.
- **Product family metaphor** — abstract geometry representing responsiveness (not literal product renders).
- **Showreel integration** — video preferred over realtime 3D for reliability.

## 10.2 When not to use

- Navigation backgrounds.
- Loading indicators.
- Decorative particle fields behind text.
- Any scene that drops below 30fps on mid-tier laptop.
- Mobile: static poster unless asset is < 50KB equivalent procedural.

## 10.3 Technical direction

| Tool | Use |
|------|-----|
| React Three Fiber | Preferred for React integration |
| Three.js | Direct when R3F overhead unnecessary |
| Spline | Block-in only — export to gltf for production |
| Shaders | Fog, subtle light falloff — not flashy distortion |

## 10.4 Lighting

- Single directional key + ambient low. Accent colour `#4EF2D3` as light source only when conceptually "system responding."

## 10.5 Fog

- Allowed to imply depth in 3D scenes — density low. Metaphor links to Creative Bible material language (presence without object).

## 10.6 Particles

- Maximum 500 visible; pause when tab hidden; dispose on unmount.
- Never particle fields behind body copy.

## 10.7 Glass / reflection

- Physical accuracy secondary to legibility. Reflections ≤ 0.3 intensity.

## 10.8 Performance budget

- 3D chunk lazy-loaded below fold.
- Pixel ratio cap: 2.
- LCP target: 3D never blocks LCP element.

---

# PART 11 — Photography system

## 11.1 Composition

- Single subject per frame.
- 40%+ negative space.
- Human implied (hand, silhouette) preferred over full posed portrait.

## 11.2 Cropping

- No tight face crops for stock-feel.
- Environmental crop — show space first.

## 11.3 Perspective

- Eye-level or slight below — visitor POV, not drone hype.

## 11.4 Lens feeling

- 35mm–50mm equivalent field of view. No ultra-wide distortion.

## 11.5 Lighting

- Motivated: light appears from installation, not studio strobe aesthetic.
- Directional side light preferred.

## 11.6 Mood

- Dark field, subject lit. Matches canvas system.

## 11.7 Subjects

- Spaces responding, people noticing — never people pointing at screens.

## 11.8 Motion blur

- Allowed in video only; photography static.

## 11.9 Colour grading

- Black point: true black. Highlights: neutral, not warm Instagram.
- Accent teal appears only from actual installation light — never added in post broadly.

---

# PART 12 — Illustration system

## 12.1 Blueprints

- Hairline white on black. 1px stroke. Accent for signal/data path.
- Used in technical sales decks and optional product detail diagrams.

## 12.2 Technical diagrams

- Box-and-line architecture. No isometric 3D clipart.
- Labels: Barlow micro uppercase.

## 12.3 Wireframes

- Internal documentation only — not public-facing.

## 12.4 Icons

- See Part 13.

## 12.5 Engineering graphics

- Exploded views, orthographic — monochrome + accent pin.

## 12.6 Data visualisation

- Hairline axes. No chartjunk. Accent highlights single data series only.

---

# PART 13 — Iconography

## 13.1 Style

- Stroke-based, geometric, no fill icons except status dots.
- Metaphor: technical drafting, not friendly blob icons.

## 13.2 Stroke

- 1.5px at 24px size; scales proportionally.

## 13.3 Corners

- Square caps and joins — not rounded bubbly caps.

## 13.4 Sizes

16 / 20 / 24px — snap to scale only.

## 13.5 Usage

- Icons support labels — never replace labels on primary nav.
- Accent colour on icons: prohibited except active state.

## 13.6 Animation

- Icons do not animate independently. Container may fade in.

---

# PART 14 — Responsive design

## 14.1 Desktop (1280px+)

- Full gallery 3-col, horizontal nav, reticle visible.

## 14.2 Laptop (1024–1279px)

- Gallery 3-col maintained with reduced padding.

## 14.3 Tablet (768–1023px)

- Gallery 2-col. Nav links may collapse to contact-only + menu pattern (hairline drawer, not hamburger animation).

## 14.4 Mobile (< 768px)

- Gallery 1-col. Hero display size clamp minimum respected.
- Philosophy lines: reduce gap, maintain large type.
- Touch targets enforced.

## 14.5 Large displays (1536px+)

- Content max-width caps at 1100px — canvas continues black.full bleed.

## 14.6 Portrait kiosks / interactive displays

- Single column immersive layout. Idle returns to attract loop (video, not WebGL).

## 14.7 LED walls

- Simplified palette only: black, white text, accent. No hairlines below 4px physical.

---

# PART 15 — Accessibility

## 15.1 WCAG target

**AA minimum** for all XSMITHS surfaces.

## 15.2 Contrast

| Pair | Ratio | Pass |
|------|-------|------|
| `#EDF2F0` on `#000000` | ~16:1 | Body ✓ |
| `#4EF2D3` on `#000000` | ~12:1 | Headings, UI ✓ |
| `#4EF2D3` on `#000000` small text | — | **Fail below 18px bold** — do not use accent for body |
| `rgba(237,242,240,0.55)` on `#000000` | ~7:1 | Secondary body ✓ |

## 15.3 Motion reduction

See Part 9.6. Non-negotiable.

## 15.4 Keyboard

Full operability without pointer. Focus order tested per release.

## 15.5 Typography accessibility

- Minimum body 16px on mobile.
- No justified text.
- Line length ≤ 68ch.

## 15.6 Accessible interactions

- All product cells: `<a>` or `<button>` with descriptive text — not div-onClick.
- Form errors: associated via `aria-describedby`.

---

# PART 16 — Do's and don'ts

100 immutable rules. Violations require design review approval.

### Structure & layout

1. Every page must have one emotional centre.
2. Every section holds one idea only.
3. Every interaction must have purpose.
4. Never allow two competing focal points in one viewport.
5. Never centre long paragraphs.
6. Never use full-width body text without max-width constraint.
7. Always use architectural section spacing (120px default).
8. Always separate sections with hairline, not margin alone.
9. Never stack three dense text blocks without a corridor break.
10. Always provide skip link target `#main-content`.

### Colour

11. Never use more than one accent colour.
12. Never use accent for body copy.
13. Never use accent as large background fill.
14. Never use red error panic colours.
15. Never use gradients for decoration.
16. Never use neon cyberpunk palettes.
17. Always use pure black `#000000` canvas.
18. Never introduce secondary brand colours without constitution amendment.
19. Always use opacity tokens — not ad-hoc rgba.
20. Never use colour as the only state differentiator.

### Typography

21. Never use Chakra Petch on web surfaces.
22. Never use Instrument Serif for body paragraphs.
23. Never use more than one italic accent word per block.
24. Always uppercase section labels.
25. Never use sentence case for hero wordmark.
26. Never go below 16px body on mobile.
27. Always cap line length at 68ch for body.
28. Never use justified text.
29. Always use weight contrast for hierarchy — not colour alone.
30. Never use more than two type sizes in one card.

### Components

31. Never use drop shadows on cards or buttons.
32. Never use border-radius on default buttons/inputs.
33. Never use glassmorphism stacks.
34. Never use more than one primary CTA per viewport.
35. Always maintain 44px touch targets.
36. Never use icon-only buttons without aria-label.
37. Never use carousel auto-advance.
38. Never use modal without focus trap.
39. Always close modal on Escape.
40. Never use floating labels — labels above fields.

### Motion

41. Never animate everything.
42. Never use bounce or spring easing.
43. Never loop ambient animation on idle.
44. Always honour `prefers-reduced-motion`.
45. Never mix GSAP and Framer on the same element.
46. Always clean up GSAP on unmount.
47. Never exceed 900ms for UI hover transitions.
48. Always use mechanical easing curve.
49. Never parallax more than two layers.
50. Never use scroll-jacking.

### Imagery

51. Never use stock photography of posed reactions.
52. Never use AI-generated people without disclosure and approval.
53. Always prefer dark-field photography treatment.
54. Never overlay text on busy images without scrim.
55. Never use more than one hero image per page.
56. Always provide alt text describing the experience, not the stock title.
57. Never use client logos until Proof Standard cleared.
58. Never show unverified deployment statistics.
59. Never use illustration when photography of real work exists.
60. Always caption with restraint — one line.

### 3D & media

61. Never put WebGL behind readable text.
62. Never block LCP with 3D.
63. Always lazy-load 3D below fold.
64. Never exceed pixel ratio 2.
65. Always pause WebGL when tab hidden.
66. Never use particles behind copy.
67. Always provide static fallback poster.
68. Never autoplay video with sound.
69. Always provide play/pause for motion media.
70. Never use 3D when video suffices.

### Content & voice

71. Never explain wonder in the same breath as showing it.
72. Never use hype words (revolutionary, game-changing, world-class).
73. Never claim event production capability.
74. Always state partner-not-competitor where relevant.
75. Never invent statistics or client counts.
76. Never use "AI-powered" without real AI behind it.
77. Always adapt copy from Brand Bible — do not invent positioning.
78. Never use countdown urgency patterns.
79. Never use SaaS dashboard metaphor for marketing pages.
80. Always write in engineering-led voice — not startup bro.

### Brand relationship

81. Never mirror XSEDES layout verbatim — emotional language must differ.
82. Always show "A Venture of XSEDES" attribution.
83. Never use XSEDES mission-control chrome inside XSMITHS routes.
84. Always use XSMITHS own nav/footer within `/xsmiths/*`.
85. Never inherit XSEDES CardNav on XSMITHS pages.

### Grid & spacing

86. Never use Bootstrap default gutters without token mapping.
87. Always snap spacing to 4px grid.
88. Never use odd pixel values for padding.
89. Always use gallery grid for product families.
90. Never use masonry for product layout.

### Accessibility

91. Never remove focus outlines without replacement.
92. Always test keyboard path on new components.
93. Never rely on hover-only tooltips.
94. Always use semantic landmarks (`main`, `nav`, `footer`).
95. Never use div-click navigation for primary routes.

### Engineering handoff

96. Always use design tokens in code — no magic numbers in components.
97. Always document new tokens in this file before shipping.
98. Never ship component without states: default, hover, focus, disabled.
99. Always run brand-lint before merge.
100. When in doubt, remove — do not decorate.

---

# Appendix A — Token quick reference (CSS)

```css
:root {
  /* Colour */
  --xs-accent-primary: #4EF2D3;
  --xs-surface-canvas: #000000;
  --xs-text-primary: #EDF2F0;
  --xs-text-secondary: rgba(237, 242, 240, 0.55);
  --xs-text-tertiary: rgba(237, 242, 240, 0.32);
  --xs-border-default: rgba(255, 255, 255, 0.09);
  --xs-border-strong: rgba(255, 255, 255, 0.16);

  /* Motion */
  --xs-ease-mechanical: cubic-bezier(0.22, 0.61, 0.2, 1);
  --xs-duration-standard: 900ms;
  --xs-duration-ui: 250ms;

  /* Typography */
  --xs-font-primary: var(--font-barlow, 'Barlow', sans-serif);
  --xs-font-accent: var(--font-xsmiths-accent, 'Instrument Serif', serif);
}
```

---

# Appendix B — Figma library structure

1. **Tokens** — colour, type, spacing, motion styles  
2. **Grids** — architectural, editorial, gallery, immersive frames  
3. **Components** — nav, footer, cells, forms, labels, reticle  
4. **Patterns** — homepage sequence, product detail, about manifesto  
5. **Templates** — do not start from blank frames — start from patterns  

---

# Appendix C — Relationship to XSEDES parent system

| Aspect | XSEDES | XSMITHS |
|--------|--------|---------|
| Emotional register | Engineering, systems, enterprise | Wonder, interaction, participation |
| Accent | `#4EF2D3` (shared) | Same hex, scalpel usage stricter |
| Canvas | Black | Black |
| Typography web | Barlow | Barlow + Instrument Serif accent |
| Chrome | Mission control, CardNav | Self-contained nav/footer |
| Motion | Mechanical | Mechanical + slower holds |
| Proof | Enterprise credibility | Effect-first, no stats until verified |

Shared infrastructure is permitted. Shared emotional language is not.

---

# Document control

| Version | Date | Author | Change |
|---------|------|--------|--------|
| 1.0 | 2026-07-21 | XSMITHS Design Systems | Initial canonical release |

**Next review:** When first case study ships or light-theme ships (P2) — whichever comes first.

---

*End of XSMITHS Design System v1.0*
