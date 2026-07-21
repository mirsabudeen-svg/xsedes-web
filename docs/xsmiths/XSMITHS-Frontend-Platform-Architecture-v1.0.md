# XSMITHS Frontend Platform Architecture

**Version 1.0 · Engineering Constitution**

Status: Canonical  
Audience: Frontend architects, engineers, creative technologists, platform teams, AI agents  
Constitutional inputs:

- *XSMITHS Brand Bible*
- *XSMITHS Creative Direction Bible*
- *XSMITHS Design System v1.0*
- *XSMITHS Information Architecture v1.0*
- Binding XSMITHS Website Development Plan and PRD

This document defines the software platform from which XSMITHS digital experiences are built. It does not define pages or production UI. It defines boundaries, responsibilities, contracts, and operating rules.

The current production application is Next.js 15 on Cloudflare Workers through OpenNext. The requested target stack includes Vercel. These are reconciled through a hosting-neutral application core:

- **Current canonical production path:** Cloudflare Workers + OpenNext, because `www.xsedes.com/xsmiths` is already bound to the parent XSEDES deployment.
- **Supported future deployment path:** Vercel, without changing domain, content, component, or feature architecture.
- **Rule:** platform-specific capabilities stay behind adapters. Product code never imports a hosting vendor directly.

---

## Document map

1. Architecture philosophy
2. Project structure
3. Component architecture
4. Design system integration
5. Content architecture
6. Routing strategy
7. Layout system
8. Rendering strategy
9. Performance strategy
10. Animation architecture
11. Three.js architecture
12. Accessibility
13. State management
14. API architecture
15. Security
16. Testing
17. Developer experience
18. Deployment
19. Scalability
20. Engineering principles
21. Code standards

---

# PART 1 — Architecture philosophy

## 1.1 Platform, not site

The platform is a set of stable contracts:

- content enters through typed repositories;
- routes compose content through layouts;
- Server Components render the default experience;
- client islands add only the interaction that requires a browser;
- motion and 3D remain isolated subsystems;
- hosting, CMS, analytics, search, CRM, and authentication sit behind adapters.

The first website is one consumer of these contracts. Future kiosks, microsites, documentation, portals, and installations reuse the same content and design primitives without inheriting marketing-page assumptions.

## 1.2 Engineering supports the brand

The Creative Direction Bible says technology should disappear. The frontend architecture enforces that by minimizing client JavaScript, eliminating visible loading machinery, preventing layout shift, and treating interaction as progressive enhancement.

The Design System says one idea per room. The software system mirrors this:

- one feature owns one domain;
- one component has one responsibility;
- one motion controller owns one element;
- one content repository owns one content type;
- one route layout owns one spatial mode.

The Information Architecture says wonder precedes explanation. Routes and content schemas preserve that sequence. Technology detail cannot leak into threshold components simply because data is available.

## 1.3 Architecture qualities

| Quality | Architectural expression |
|---|---|
| Minimal | Server-first; small dependency surface; no speculative infrastructure |
| Composable | Features expose typed public APIs; pages compose rather than implement |
| Scalable | Content repositories and route patterns handle 10 or 10,000 records |
| Maintainable | Ownership boundaries; no cross-feature internals |
| Predictable | Explicit rendering, caching, error, and state rules |
| Observable | Structured logs, Web Vitals, error boundaries, traceable form/API requests |
| Accessible | Semantics and focus management are platform requirements |
| Performant | Static by default; client and 3D budgets enforced in CI |
| Future-ready | Provider adapters; localization-ready schemas; multi-surface content |

## 1.4 Core decisions

1. **App Router only.** No Pages Router.
2. **React Server Components by default.** `"use client"` marks the smallest possible leaf.
3. **One repository and one deployment for `www.xsedes.com/xsmiths`** until organizational ownership creates a demonstrated need for extraction.
4. **Typed content repositories, not JSX copy.**
5. **Static generation by default** for products, services, pages, journal, and case studies.
6. **CMS is a provider, not the domain model.**
7. **GSAP owns scroll and scene choreography. Motion owns local UI transitions. CSS owns simple state transitions. Three.js owns rendered scenes.**
8. **No global client state library by default.**
9. **No client data library by default.**
10. **Infrastructure-specific code is isolated under `platform/`.**

---

# PART 2 — Project structure

## 2.1 Target repository structure

```text
src/
├── app/
│   ├── (xsedes)/                    # Parent-site route group
│   ├── xsmiths/
│   │   ├── (marketing)/             # Home, about, services, contact
│   │   ├── products/
│   │   │   └── [slug]/
│   │   ├── industries/              # Future
│   │   ├── projects/                # Future, proof-gated
│   │   ├── journal/                 # Future
│   │   ├── technology/              # Future
│   │   ├── knowledge/               # Future
│   │   ├── (immersive)/             # Full-bleed scene routes
│   │   ├── layout.tsx
│   │   ├── loading.tsx
│   │   ├── error.tsx
│   │   ├── not-found.tsx
│   │   └── sitemap.ts
│   ├── api/                          # Public HTTP boundaries only
│   ├── robots.ts
│   └── layout.tsx
│
├── components/
│   ├── primitives/                  # Brand-neutral, semantic building blocks
│   ├── layout/                      # Page shells, containers, spatial grids
│   ├── content/                     # Renderers for typed content blocks
│   └── xsmiths/                     # Venture-specific visual composition
│
├── features/
│   ├── contact/
│   ├── products/
│   ├── services/
│   ├── journal/
│   ├── projects/
│   ├── search/
│   ├── analytics/
│   ├── consent/
│   └── portal/                      # Future authenticated product
│
├── content/
│   ├── models/                      # Canonical domain schemas
│   ├── repositories/                # Read contracts
│   ├── sources/
│   │   ├── local/
│   │   ├── mdx/
│   │   └── cms/
│   ├── navigation/
│   └── xsmiths/
│
├── design-system/
│   ├── tokens/
│   ├── styles/
│   ├── icons/
│   └── contracts/
│
├── motion/
│   ├── tokens/
│   ├── gsap/
│   ├── ui/
│   ├── reduced-motion/
│   └── types.ts
│
├── three/
│   ├── canvas/
│   ├── scenes/
│   ├── objects/
│   ├── materials/
│   ├── shaders/
│   ├── lighting/
│   ├── loaders/
│   ├── performance/
│   └── fallbacks/
│
├── platform/
│   ├── hosting/
│   │   ├── cloudflare/
│   │   └── vercel/
│   ├── cms/
│   ├── analytics/
│   ├── search/
│   ├── email/
│   ├── storage/
│   ├── flags/
│   └── observability/
│
├── lib/
│   ├── validation/
│   ├── security/
│   ├── seo/
│   ├── media/
│   └── utils/
│
├── hooks/                            # Browser-only reusable behaviour
├── providers/                        # Minimal cross-tree React providers
├── config/                           # Validated, environment-aware config
└── types/                            # Truly cross-domain types only

content/
├── journal/                          # MDX source when local
├── projects/
├── knowledge/
└── proposals/

public/
├── xsmiths/
│   ├── brand/
│   ├── images/
│   ├── video/
│   ├── models/
│   └── fallbacks/
└── fonts/                            # Only if next/font/local requires

tests/
├── integration/
├── accessibility/
├── performance/
└── fixtures/

e2e/
storybook/
scripts/
docs/xsmiths/
```

## 2.2 Folder responsibilities

### `app/`

Routing, metadata, layouts, route-level loading/error boundaries, and composition only. Business rules do not live in pages.

### `components/`

Reusable presentation units. Components do not fetch from external providers and do not know CMS schemas.

### `features/`

Vertical domain ownership. A feature may contain its components, server operations, validation, tests, and public contract. Other features import only through that public contract.

### `content/`

Canonical content models and read repositories. This prevents local TypeScript, MDX, and a future CMS from becoming three incompatible systems.

### `design-system/`

Machine-readable implementation of Design System v1.0. Tokens are source, not documentation copies scattered through CSS.

### `motion/`

Single authority for timing, easing, reduced-motion behavior, and library ownership.

### `three/`

3D runtime boundary. Three.js code never leaks into ordinary content components.

### `platform/`

Vendor adapters. Cloudflare, Vercel, CMS, search, email, and analytics implementations satisfy internal contracts.

### `lib/`

Small, stateless, domain-agnostic utilities. `lib/` is not a dumping ground.

### `hooks/`

Reusable browser behavior only. Server data access is never a hook.

### `providers/`

Providers with genuine subtree scope: reduced motion, consent, or authenticated portal state. A provider must justify every consumer it forces to hydrate.

---

# PART 3 — Component architecture

## 3.1 Component tiers

| Tier | Responsibility | May import |
|---|---|---|
| Primitive | Semantic HTML + design tokens | Tokens, icons |
| Layout | Spatial composition | Primitives |
| Content | Render typed content blocks | Primitives, layout |
| Feature | Domain interaction and orchestration | Feature internals, components, repositories |
| Page composition | Arrange features for one route | Feature public APIs |
| Interactive island | Browser state, pointer, media controls | Primitives, feature types |
| Motion | Apply approved movement | Motion contracts, target components |
| 3D | Own scene lifecycle | `three/` only |
| CMS adapter | Convert provider data to domain models | Platform CMS SDK, content models |

## 3.2 Ownership rules

- The component that renders content does not own the content source.
- Pages never import a CMS SDK.
- Primitives never import features.
- Features never import another feature’s internal file.
- Motion wrappers never contain editorial copy.
- 3D scenes receive serializable scene configuration, not page components.
- Client Components receive the minimum serializable props required to behave.

## 3.3 Server/client boundary

Use a Client Component only when it needs:

- browser events;
- local interactive state;
- lifecycle effects;
- browser APIs;
- pointer/touch input;
- GSAP or Three.js;
- a client-only third-party SDK.

Do not mark a route, layout, or content renderer as client merely because one child is interactive. Nest the client child inside the Server Component.

## 3.4 Composition over variants

Prefer explicit composition:

- a section shell composed with a label, title, body, and media slot;
- a product cell composed from product data;
- an immersive layout composed with a fallback and an optional scene.

Avoid components with dozens of booleans that encode multiple unrelated experiences.

## 3.5 Public feature API

Each feature exposes:

- canonical domain types;
- one or more Server Component entry points;
- optional client islands;
- server operations;
- validation schemas;
- tests.

Internal adapters and helper components remain private.

---

# PART 4 — Design system integration

## 4.1 Token pipeline

The canonical source is structured token data under `design-system/tokens/`. Generated outputs:

1. CSS custom properties with `--xs-*` names;
2. Tailwind v4 theme mappings;
3. TypeScript token names for motion and non-CSS systems;
4. Storybook documentation;
5. optional Figma Tokens export.

Generated files are not manually edited.

## 4.2 Semantic token layers

| Layer | Example | Stability |
|---|---|---|
| Foundation | raw spacing step, opacity | Highly stable |
| Semantic | `surface-canvas`, `text-secondary` | Stable contract |
| Component | `button-primary-bg` | Introduced only when necessary |

Components consume semantic or component tokens, never foundation values directly when meaning exists.

## 4.3 Typography

- Barlow loaded once through `next/font`.
- Instrument Serif loaded only in the XSMITHS layout boundary.
- Font variables exposed through tokens.
- No external font stylesheet request.
- No component-level font-family literals.

## 4.4 Colour

- `#4EF2D3` remains the only accent.
- Hex values exist only in token source and approved assets.
- State cannot depend on colour alone.
- XSEDES parent aliases may exist during migration; XSMITHS components consume `--xs-*`.

## 4.5 Spacing and layout

- Tailwind arbitrary values are prohibited for governed properties.
- Exceptions require a named token added first.
- Layout components encode architectural, editorial, gallery, immersive, and asymmetric grids.

## 4.6 Icons

- Icons live in one registry.
- Stroke, size, accessibility, and animation rules are enforced at the primitive.
- Raw inline SVG may exist only inside the icon registry.

## 4.7 Component documentation

Storybook documents:

- purpose;
- allowed composition;
- all states;
- keyboard behavior;
- reduced-motion behavior;
- responsive behavior;
- prohibited uses.

Storybook is development documentation, not a second design system.

---

# PART 5 — Content architecture

## 5.1 Canonical domain models

The domain model is independent of storage. Required models include:

- `ProductFamily`
- `ServicePillar`
- `Page`
- `JournalEntry`
- `Project`
- `Industry`
- `KnowledgeDocument`
- `MediaAsset`
- `NavigationNode`
- `SEORecord`
- `ProofRecord`

Every publishable model includes IA governance metadata:

- stable ID;
- slug;
- title;
- summary;
- content type;
- narrative stage;
- owner;
- proof status;
- canonical source;
- locale;
- version;
- publication state;
- created/updated/review dates;
- relationships.

## 5.2 Content repository contracts

Application code reads through repository contracts such as:

- list products;
- get product by slug;
- list journal entries;
- get related content;
- get navigation tree;
- get SEO record.

The active provider may be local TypeScript, MDX, or CMS. Return types remain identical.

## 5.3 Storage by content type

| Content | Initial source | Future source | Rendering |
|---|---|---|---|
| Products | Typed TypeScript | CMS structured records | RSC, static |
| Services | Typed TypeScript | CMS structured records | RSC, static |
| Foundation/About | Typed blocks or MDX | CMS structured page | RSC, static |
| Journal | MDX + frontmatter | Headless CMS | RSC, ISR |
| Case studies | MDX, proof-gated | CMS workflow | RSC, ISR |
| Knowledge base | MDX content collection | Docs CMS/search index | RSC, ISR |
| Proposals | Private structured records | CMS/portal | Authenticated SSR |

## 5.4 MDX

MDX is used for editorial content requiring:

- headings;
- prose;
- approved content embeds;
- diagrams;
- media;
- citations.

MDX cannot import arbitrary React components. It receives an allowlisted component map. This prevents content authors from creating ungoverned UI.

## 5.5 Content collections

A build-time collection validates:

- frontmatter schema;
- unique slugs;
- relationships;
- proof status;
- required SEO fields;
- dates and ownership;
- allowed embeds.

Invalid content fails CI before deployment.

## 5.6 CMS integration

The CMS is introduced only when non-technical editing frequency justifies it. The CMS adapter:

- maps provider documents to domain models;
- validates at the boundary;
- converts rich text to approved content blocks;
- never exports provider-native objects into pages;
- supports preview/draft mode without weakening production cache rules.

## 5.7 Versioning

- Content changes are versioned in Git when local.
- CMS records retain revision history and approval state.
- Public URLs remain stable.
- Archived content receives explicit lifecycle behavior: retained, redirected, or removed with documented reason.

---

# PART 6 — Routing strategy

## 6.1 Canonical route root

XSMITHS remains under:

`www.xsedes.com/xsmiths`

This preserves parent authority and avoids path proxy complexity.

## 6.2 Route architecture

### Current v1

- `/xsmiths`
- `/xsmiths/about`
- `/xsmiths/products`
- `/xsmiths/products/[slug]`
- `/xsmiths/services`
- `/xsmiths/contact`

### Future ecosystem

- `/xsmiths/studio`
- `/xsmiths/industries/[slug]`
- `/xsmiths/technology/[slug]`
- `/xsmiths/projects/[slug]`
- `/xsmiths/journal/[slug]`
- `/xsmiths/knowledge/[...segments]`
- `/xsmiths/proposals/[token]`
- `/xsmiths/portal/*`

Routes are added only when Information Architecture governance permits the content type.

## 6.3 Dynamic routes

Dynamic routes resolve through domain repositories and:

- generate static params for bounded public collections;
- return `notFound()` for unknown or unpublished records;
- generate metadata from the same domain record;
- never query the CMS from a Client Component.

## 6.4 Route groups

Route groups separate layout behavior without changing URLs:

- `(marketing)` — public narrative pages;
- `(editorial)` — journal/projects;
- `(docs)` — knowledge base;
- `(immersive)` — chromeless scene experiences;
- `(portal)` — authenticated application.

## 6.5 Microsites

Proposal or campaign microsites default to nested routes under XSMITHS. Extraction into a separate deployment requires:

- independent ownership;
- independent release cadence;
- clear domain need;
- demonstrated inability to share the platform.

Visual distinctiveness alone is not a reason to fork architecture.

## 6.6 Localization readiness

- Default locale remains English.
- Domain models include `locale` and translation relationships from day one.
- URLs may later adopt `/xsmiths/{locale}/...` or domain-level locale routing.
- Slugs are locale-aware but stable IDs are not.
- Locale routing is not enabled until translation workflow and human review exist.

---

# PART 7 — Layout system

## 7.1 Root layout

Owns:

- document language;
- global fonts;
- base metadata;
- skip link;
- global error boundary;
- parent-level observability;
- no venture-specific chrome.

## 7.2 XSMITHS layout

Owns:

- XSMITHS font accent;
- XSMITHS tokens;
- venture navigation/footer;
- XSMITHS metadata defaults;
- consent/analytics boundary if required;
- chromeless isolation from XSEDES mission-control UI.

## 7.3 Marketing layout

For Home, About, Products, Services, Contact. Uses architectural pacing and XSMITHS navigation.

## 7.4 Editorial layout

For Journal and Insights. Owns:

- reading-width content;
- article metadata;
- table of contents;
- citations;
- related content;
- no marketing CTA interruptions mid-article.

## 7.5 Case study layout

Proof-gated. Encodes the IA sequence:

Challenge → Insight → Concept → Engineering → Build → Interaction → Outcome → Future.

## 7.6 Landing-page layout

For product or proposal pages. Must still use the domain model and design tokens; cannot introduce an isolated mini design system.

## 7.7 Documentation layout

For knowledge base and developer portal:

- persistent tree navigation;
- search;
- article outline;
- version badge;
- technical density appropriate to the audience.

This layout is explanatory by purpose and therefore does not use the marketing threshold sequence.

## 7.8 Immersive layout

For full-bleed scenes:

- no standard navigation during the scene;
- explicit exit;
- static fallback;
- reduced-motion mode;
- media and 3D budgets;
- preserved semantic content outside the canvas.

## 7.9 Portal layout

Future authenticated product shell. It may use higher information density but retains XSMITHS tokens and accessibility. It must not reuse marketing motion where operational speed matters.

---

# PART 8 — Rendering strategy

## 8.1 Default decision tree

1. Can the route be built from public content? **Static generation.**
2. Does content change independently of deployments? **ISR or tagged revalidation.**
3. Is content request-specific or authenticated? **SSR/RSC at request time.**
4. Is only a subtree request-specific? **Static/cached shell with Suspense boundary.**
5. Does behavior require browser APIs? **Client island only.**

## 8.2 Server Components

Use for:

- page composition;
- content rendering;
- CMS/repository reads;
- metadata;
- SEO structured data;
- media selection;
- authenticated server reads.

Benefits: smaller client bundle, protected secrets, direct data access, stable HTML semantics.

## 8.3 Client Components

Use for:

- navigation active state when server route context cannot express it;
- form interaction;
- media controls;
- search input behavior;
- GSAP/Lenis;
- Three.js;
- local portal interactions.

Client boundaries stay leaf-level and receive small serializable props.

## 8.4 Static generation

Static by default:

- marketing pages;
- product families;
- services;
- industries;
- published projects;
- public knowledge documents.

Use `generateStaticParams` for bounded collections. A collection’s size alone does not require SSR; large collections may use on-demand generation and ISR.

## 8.5 ISR and cache invalidation

Use semantic cache tags:

- `product:{id}`
- `journal:{id}`
- `project:{id}`
- `navigation:xsmiths`

CMS webhooks invalidate affected tags rather than purging the whole site. Next.js version-specific cache APIs are isolated in the content/infrastructure layer so migration from Next.js 15 conventions to later Cache Components does not touch feature code.

## 8.6 Streaming and Suspense

Use Suspense only around genuinely independent or dynamic subtrees. Fallbacks must preserve layout dimensions and should resemble quiet structural placeholders, not spinners.

Do not stream primary threshold copy or navigation; these are part of the static shell.

## 8.7 Server Actions

Use for UI-bound mutations:

- authenticated portal preferences;
- CMS preview controls;
- low-complexity form operations tied to one React interface.

Treat every Server Action as a public endpoint:

- authenticate;
- authorize;
- validate;
- rate limit where necessary;
- return typed results;
- never trust hidden fields.

## 8.8 Route Handlers

Use for:

- public contact endpoints;
- webhooks;
- search APIs;
- newsletter provider callbacks;
- external integrations;
- AI proxy services;
- machine-to-machine APIs.

Route Handlers speak Web Request/Response and remain independent of React.

## 8.9 Runtime

- **Node-compatible runtime is default.**
- Edge runtime is selected only after measured latency need and dependency compatibility review.
- Platform-specific runtime exports stay in hosting adapters.
- Static routes remain CDN-delivered regardless of compute runtime.

---

# PART 9 — Performance strategy

## 9.1 Budgets

| Metric | Target |
|---|---|
| Lighthouse | 90+ all categories; 95+ accessibility |
| LCP | < 2.5s p75 mobile |
| INP | < 200ms p75 |
| CLS | < 0.1 |
| Landing JS | < 300KB gzipped total; XSMITHS target < 180KB without 3D |
| Route client JS | No increase without budget review |
| Fonts | Two families; only required weights/subsets |

## 9.2 Images

- `next/image` for raster content.
- Correct `sizes` for every responsive image.
- LCP image priority/preload only when verified as LCP.
- AVIF/WebP generated through the active hosting adapter.
- Asset dimensions required in content metadata.
- Approved blur/static placeholder; never layout-unknown media.

## 9.3 Video

- Poster image always.
- Autoplay only muted and in viewport.
- Pause when hidden or offscreen.
- Adaptive streaming for long-form/showreels.
- Separate mobile rendition.
- Video never blocks route hydration.

## 9.4 Fonts

- `next/font` or `next/font/local`.
- Barlow loaded at root.
- Instrument Serif scoped to XSMITHS.
- Avoid loading weights not used.
- Font fallback metrics tuned to prevent CLS.

## 9.5 Code splitting

- Dynamic import 3D, editors, search clients, and heavy media controllers.
- Split by feature boundary, not arbitrary component count.
- Avoid barrel exports for heavy client modules.
- Analytics loads after critical rendering.

## 9.6 Animation

- Transform and opacity only for routine motion.
- Avoid layout-triggering properties in continuous animation.
- Scroll listeners passive and centralized.
- One observer/controller may serve many reveal targets.
- Animation work pauses on hidden tabs.

## 9.7 3D

- Lazy-loaded behind static fallback.
- Pixel ratio capped at 2.
- Adaptive quality based on device capability and frame time.
- Geometry/material reuse.
- Compressed models and textures.
- Scene disposed on unmount.

## 9.8 Continuous measurement

CI gates:

- bundle-size diff;
- Lighthouse CI on key routes;
- visual regression;
- axe checks;
- production Web Vitals monitoring.

Performance regressions require explicit approval, not silent budget expansion.

---

# PART 10 — Animation architecture

## 10.1 Ownership matrix

| System | Owns | Must not own |
|---|---|---|
| CSS transitions | Hover, focus, simple colour/opacity state | Scroll scenes |
| Motion | Local component presence, dialog/UI transitions | Long scroll choreography |
| GSAP + ScrollTrigger | Section reveals, timeline choreography, pinned narrative scenes | Form state and ordinary hover |
| Lenis | Optional scroll feel at application shell | Accessibility semantics or scroll-jacking |
| Three.js/R3F | Motion inside rendered scene | DOM typography animation |

## 10.2 One element, one owner

No element is controlled by more than one animation system. Ownership is declared in the component or motion wrapper.

## 10.3 Shared motion contract

All systems consume:

- duration tokens;
- mechanical easing;
- reduced-motion preference;
- visibility lifecycle;
- scene weight category.

## 10.4 GSAP

- Client-only.
- `gsap.context()` scopes selectors.
- Every timeline and ScrollTrigger is killed on cleanup.
- Use matchMedia for responsive and reduced-motion variants.
- No motion copy duplicated inside the controller.

## 10.5 Motion

Use for component-level transitions where React lifecycle is the source of truth: modal enter/exit, local disclosure, route-level crossfade if approved.

## 10.6 CSS

Use for deterministic state transitions under 250ms. CSS is the lowest-cost motion layer and should be preferred for hover/focus.

## 10.7 Lenis

Justified only if user testing confirms improved pacing without harming:

- keyboard navigation;
- anchor links;
- reduced motion;
- screen readers;
- touch behavior.

Native scroll is the fallback and remains acceptable.

---

# PART 11 — Three.js architecture

## 11.1 Scene boundary

Each scene consists of:

- a serializable scene manifest;
- a Canvas shell;
- loaders;
- scene objects;
- lighting;
- performance governor;
- fallback asset;
- optional semantic description.

Routes import a scene entry point, not individual shaders or objects.

## 11.2 Asset pipeline

- Source models retained outside deploy artifacts.
- Runtime models use GLB with geometry compression when beneficial.
- Textures sized to actual display need and compressed.
- Asset manifest records size, dimensions, license, fallback, and owner.
- CI rejects assets above budget without waiver.

## 11.3 Loading

- Static poster renders first.
- 3D loads after viewport proximity and capability check.
- Progress UI is quiet and structural.
- Failure retains poster; route remains usable.

## 11.4 Lighting

Scene-specific lighting composes approved presets. Accent light indicates system response, never ambient decoration.

## 11.5 Materials and shaders

- Shared materials are factories with explicit disposal.
- Shader uniforms use typed contracts.
- Shaders live beside tests/examples and declare performance class.
- No shader is introduced without a fallback.

## 11.6 Frame loop

- Render on demand where scenes are static.
- Pause on hidden tab.
- Reduce/stop animation when out of viewport.
- Adaptive DPR and quality use measured frame time, not device-name guesses.

## 11.7 Accessibility

Canvas is never the only carrier of meaning. Every scene has:

- semantic adjacent content;
- static fallback;
- reduced-motion version;
- keyboard-operable controls if interactive;
- concise accessible description.

---

# PART 12 — Accessibility architecture

## 12.1 Baseline

WCAG 2.2 AA minimum. Accessibility failures block release.

## 12.2 Semantic foundation

Primitives encode:

- landmarks;
- heading order;
- lists;
- buttons versus links;
- labels and descriptions;
- status and alert regions.

Feature teams do not recreate semantics ad hoc.

## 12.3 Keyboard

- Skip link at root.
- Logical DOM order equals visual order.
- Focus enters and exits overlays predictably.
- Escape dismisses temporary layers.
- No hover-only functionality.
- Product cells are one tab stop each.

## 12.4 Focus management

- Visible 2px accent focus ring.
- Route navigation focuses the new page’s main heading or main landmark when necessary.
- Modal/lightbox traps and restores focus.
- Error summary focuses after failed form submission when multiple errors exist.

## 12.5 Reduced motion

A single platform hook and server-safe CSS media query drive:

- GSAP matchMedia;
- Motion variants;
- Three.js scene mode;
- video autoplay;
- scroll behavior.

Reduced motion is not implemented separately by each feature.

## 12.6 Screen readers

- Decorative reticles and atmosphere are hidden.
- Dynamic status uses appropriate live regions.
- Canvas descriptions remain concise.
- Repeated navigation is consistently labelled.

## 12.7 Forms

- Server-side validation authoritative.
- Client validation enhances immediacy.
- Errors connect to fields.
- Success is announced.
- Honeypots are hidden from assistive technology.

## 12.8 Automated and manual checks

Automated axe tests supplement, never replace:

- keyboard walkthrough;
- VoiceOver/NVDA smoke tests;
- zoom to 200–400%;
- reduced-motion review;
- high-contrast review.

---

# PART 13 — State management

## 13.1 Placement hierarchy

State belongs in the narrowest durable location that represents its truth.

| State type | Home |
|---|---|
| Content and business truth | Server/CMS/database |
| Navigation, filters, pagination | URL search params |
| Authentication/session | Secure HTTP-only cookie + server |
| Form submission | Server Action/route + local pending state |
| Local disclosure/modal | React state |
| Cross-tree stable UI preference | Context, if few consumers |
| Persistent non-sensitive preference | Versioned local storage |
| Complex high-frequency client workflow | Zustand, only with decision record |
| Remote client cache | React Query, only for app-like client workflows |

## 13.2 React state

Default for local transient interaction. Never copy server props into state without an editing or optimistic requirement.

## 13.3 URL

Search, filters, selected collection, pagination, and shareable view state live in the URL. This enables deep links, browser history, and server rendering.

## 13.4 Context

Use only for stable cross-tree concerns:

- reduced-motion runtime;
- consent;
- portal session presentation;
- scene orchestration within one immersive experience.

Avoid all-purpose application contexts.

## 13.5 Zustand

Not installed by default. Introduce when:

- state spans unrelated subtrees;
- updates are frequent;
- Context would trigger broad rerenders;
- the state remains browser-local;
- URL/server are wrong owners.

Likely future use: complex kiosk scene state or portal workspace UI. Not marketing pages.

## 13.6 React Query

Not installed by default. Server Components and Server Actions cover public content. Introduce for future portal screens requiring:

- long-lived client sessions;
- background refetch;
- optimistic remote mutation;
- offline/reconnect behavior.

---

# PART 14 — API architecture

## 14.1 Boundary types

| Need | Mechanism |
|---|---|
| Render public content | Server Component → repository |
| UI mutation | Server Action |
| External/public HTTP | Route Handler |
| Provider webhook | Route Handler |
| Durable background work | Platform queue/workflow adapter |
| Client portal API | Route Handler or typed service boundary |

## 14.2 Validation

Every external boundary validates input and output with a schema library only when schema complexity justifies the dependency. Validation schemas live with features, not in a global schema dump.

## 14.3 REST

Default external API style. Resource-oriented routes, standard HTTP semantics, structured errors, request IDs.

## 14.4 GraphQL

Not justified initially. Add only if multiple independent clients require flexible graph traversal that REST/repositories cannot serve cleanly. CMS GraphQL may be consumed inside its adapter without making GraphQL the application architecture.

## 14.5 Contact

Pipeline:

request → bot protection → validation → rate limit → classification metadata → email/CRM adapter → structured result.

Frontend never calls the email provider directly.

## 14.6 Search

- Build-time index for small local collections.
- Hosted search adapter only when scale/latency requires.
- Search records are derived from canonical domain models.

## 14.7 Analytics

- First-party Web Vitals and privacy-respecting page/event analytics.
- Event names follow feature taxonomy.
- No raw personal form content in analytics.

## 14.8 Future AI services

- Server-side proxy only.
- Provider keys never reach browser.
- Prompts loaded from governed skill files, not duplicated in route handlers.
- Input/output limits, safety, observability, and cost controls required.
- AI output never bypasses proof or editorial approval.

## 14.9 CRM/ERP

Adapters map XSMITHS domain events to provider payloads. Provider identifiers do not become primary domain IDs.

---

# PART 15 — Security

## 15.1 Security headers

Baseline:

- strict Content Security Policy;
- HSTS;
- `X-Content-Type-Options: nosniff`;
- `Referrer-Policy`;
- `Permissions-Policy`;
- clickjacking protection through `frame-ancestors`;
- cross-origin policies appropriate to 3D/media assets.

CSP is tested against Next.js, analytics, fonts, video, and Three.js. It is not weakened globally for one integration.

## 15.2 Secrets

- Server-only environment variables.
- Environment validation at startup/build.
- `.env.example` contains names only.
- No secrets in `NEXT_PUBLIC_*`.
- Provider-specific secrets consumed only by adapters.

## 15.3 Authentication readiness

Public marketing routes require no auth. Future portal/proposals use a managed identity provider behind `platform/auth`, secure sessions, server-side authorization, and role/tenant checks on every mutation.

Authentication does not equal authorization.

## 15.4 Rate limiting

Apply to:

- contact;
- newsletter;
- search abuse;
- AI endpoints;
- auth actions;
- webhooks where provider signing is insufficient.

Rate-limit storage is platform-adapted; no process-memory counters.

## 15.5 Forms and bots

Layered defense:

1. honeypot;
2. timing/behavior signal;
3. platform rate limit;
4. Turnstile or equivalent only when abuse warrants;
5. server validation;
6. safe provider error handling.

## 15.6 Webhooks

- Verify signatures against raw request body.
- Reject replay when provider supports timestamps/nonces.
- Idempotency keys prevent duplicate processing.
- Return quickly; move expensive work to queue/workflow.

## 15.7 Content security

- MDX component allowlist.
- Sanitized rich text.
- No arbitrary script embeds from CMS.
- Media domains allowlisted.

---

# PART 16 — Testing

## 16.1 Test pyramid

| Layer | Tool | Focus |
|---|---|---|
| Static | TypeScript, ESLint, brand-lint, Biome | Contracts, doctrine, syntax |
| Unit | Vitest | Pure functions, schemas, repositories, token generation |
| Component | Storybook + Vitest/browser testing | States, semantics, interaction |
| Integration | Vitest | Feature + adapter contracts |
| E2E | Playwright | Critical journeys |
| Accessibility | axe + manual | WCAG and keyboard |
| Visual | Storybook/Playwright snapshots | Design-system drift |
| Performance | Lighthouse CI, bundle budgets | Web Vitals and JS |

## 16.2 Unit tests

Required for:

- content schema validation;
- route metadata generation;
- related-content logic;
- form validation;
- adapter mapping;
- motion preference decisions;
- token generation.

## 16.3 Integration tests

Use provider fakes against internal contracts. Verify that swapping local content for CMS does not alter domain output.

## 16.4 E2E journeys

Minimum:

- Home → product → contact;
- keyboard navigation;
- reduced-motion path;
- form success/error;
- unknown product 404;
- metadata/canonical path;
- future: journal search, portal auth.

## 16.5 Visual regression

Capture:

- major breakpoints;
- default/hover/focus/error states;
- reduced-motion static states;
- dark canvas rendering;
- font fallback and loaded font.

Do not snapshot volatile 3D frames. Snapshot fallback and deterministic scene checkpoints.

## 16.6 Performance testing

Run against production builds, not dev server. Track regressions by route and feature.

---

# PART 17 — Developer experience

## 17.1 Tool responsibilities

| Tool | Responsibility |
|---|---|
| TypeScript strict | Type safety |
| ESLint | React/Next correctness and architectural rules |
| Biome | Fast formatting and generic lint where adopted |
| Prettier | Not used concurrently with Biome for the same files |
| brand-lint | XSEDES/XSMITHS doctrine |
| Vitest | Unit/integration |
| Playwright | E2E |
| Storybook | Component contract documentation |

**Decision:** choose **Biome or Prettier as formatter**, not both. Existing code may migrate incrementally; CI has one formatting authority.

## 17.2 Git

- protected `main`;
- feature branches;
- agents open PRs, never merge;
- no direct production edits;
- one concern per PR;
- generated assets identified clearly.

## 17.3 Branch naming

- `feat/xsmiths-journal`
- `fix/contact-validation`
- `refactor/content-repository`
- `docs/xsmiths-platform`

## 17.4 Commit convention

Conventional form:

`type(scope): imperative description`

Examples of scopes: `xsmiths`, `content`, `motion`, `three`, `platform`, `a11y`.

## 17.5 PR template

Every PR states:

1. what was wrong or needed;
2. what changed;
3. how it was verified;
4. accessibility impact;
5. performance impact;
6. screenshots for visual changes;
7. proof/brand review for content changes.

## 17.6 Code review

Review in this order:

1. constitutional alignment;
2. accessibility/security;
3. architecture boundaries;
4. rendering/performance;
5. correctness/tests;
6. implementation style.

## 17.7 Onboarding

Required reading:

1. Brand Bible;
2. Creative Direction Bible;
3. Design System;
4. Information Architecture;
5. this handbook;
6. repository `AGENTS.md`.

First contribution should be a small tested change through the full PR pipeline.

---

# PART 18 — Deployment

## 18.1 Deployment abstraction

Application code targets Next.js standards. Hosting adapters handle:

- image delivery differences;
- caching invalidation;
- edge key/value;
- logs/traces;
- feature flags;
- queues/workflows;
- environment metadata.

## 18.2 Current Cloudflare path

Current repository uses OpenNext and a Worker bound to:

- `www.xsedes.com/*`
- `xsedes.com/*`

Cloudflare rules:

- use generated binding types;
- secrets stay in Worker secrets/environment;
- no request state in module globals;
- structured logs;
- every promise awaited, returned, voided, or delegated to platform background execution;
- bindings preferred over calling Cloudflare REST from the Worker.

## 18.3 Supported Vercel path

Vercel support includes:

- preview deployment per PR;
- production deployment from protected main;
- immutable artifact promotion;
- environment separation;
- function/runtime logs;
- Web Vitals and observability;
- feature flag adapter.

Vercel-only APIs may be used only inside `platform/hosting/vercel`.

## 18.4 Environments

| Environment | Purpose | Data |
|---|---|---|
| Local | Development | Local/fake providers |
| Test | Automated CI | Deterministic fixtures |
| Preview | PR validation | Non-production integrations |
| Staging | Release candidate, optional | Production-like, isolated |
| Production | Public | Production providers |

No production secrets or customer data in previews.

## 18.5 Release pipeline

1. install with frozen lockfile;
2. generate governed artifacts;
3. typecheck;
4. lint + brand-lint;
5. unit/integration;
6. build;
7. preview deploy;
8. Playwright + accessibility + visual + Lighthouse;
9. human review;
10. promote same tested artifact where platform supports;
11. post-deploy smoke + error scan.

## 18.6 Monitoring

Required signals:

- route errors;
- function errors/latency;
- contact delivery failures;
- Web Vitals;
- 404 trends;
- content webhook failures;
- 3D fallback rate;
- deployment health.

Logs are structured and contain request/correlation IDs, not sensitive form bodies.

## 18.7 Feature flags

Flags are for release risk, not permanent product architecture. Every flag has:

- owner;
- purpose;
- default;
- environment scope;
- expiration/removal date.

Public content must remain crawlable and deterministic unless experimentation is explicitly approved.

---

# PART 19 — Scalability

## 19.1 Ten to one hundred products

No architectural change:

- typed repository;
- dynamic route;
- static params or on-demand generation;
- filter/search introduced when discovery requires.

The gallery UI may evolve; the model and route remain.

## 19.2 One thousand journal articles

- paginated repository queries;
- ISR;
- search index;
- topic relationships;
- build avoids eagerly generating every article when unnecessary;
- content collection validates incrementally.

## 19.3 Five hundred case studies

- same project model;
- proof workflow required;
- collection/index pages become query-driven;
- media stored in object storage/CDN;
- related-project graph derived from taxonomy.

## 19.4 Multiple ventures

Ventures share:

- foundation tokens;
- platform adapters;
- content contracts;
- testing and deployment tooling.

They do not automatically share:

- emotional layouts;
- navigation;
- typography accents;
- motion choreography;
- editorial voice.

Multi-brand support is configuration plus scoped layouts, not conditionals scattered through components.

## 19.5 Microsites

Microsites compose domain models and layout contracts in route groups. Separate repositories are a governance decision, not a design preference.

## 19.6 Internationalization

Locale-aware repositories, metadata, slugs, search indexing, and review state allow later localization without rewriting routes or models.

## 19.7 Customer portal

The future portal adds:

- auth adapter;
- tenant/role model;
- dynamic server rendering;
- client data layer if justified;
- denser portal layout;
- audit logging.

It does not require replacing the public platform.

---

# PART 20 — Fifty engineering principles

1. Technology should disappear from the visitor’s attention.
2. Server Components are the default.
3. Client Components are the smallest possible interactive leaves.
4. Every page is composed; pages do not implement domains.
5. Every component has one responsibility.
6. Every feature owns its domain.
7. Features expose public contracts, not internal paths.
8. Never duplicate governed components.
9. Never hardcode colours.
10. Never hardcode governed spacing, typography, or motion values.
11. Every design token has one canonical source.
12. Every dependency earns its place.
13. Native platform capability wins when it meets the requirement.
14. No state library without a written state-ownership case.
15. No client cache library for server-renderable public content.
16. Content never lives in route handlers or JSX components.
17. CMS schemas never become application domain models.
18. Provider SDKs stay behind adapters.
19. Hosting vendor APIs stay under `platform/`.
20. Static generation is the public-content default.
21. Dynamic rendering is a deliberate consequence, never an accident.
22. Suspense boundaries correspond to independent data or runtime needs.
23. Never create an async waterfall when work can begin in parallel.
24. URLs own shareable state.
25. The server owns business truth.
26. React state owns local transient interaction.
27. Secure cookies own sessions.
28. Local storage holds only versioned, non-sensitive preferences.
29. Every animation has one owner.
30. Never mix GSAP and Motion on the same element.
31. Never animate layout unexpectedly.
32. Always respect reduced motion.
33. Animation pauses when invisible.
34. 3D always has a static fallback.
35. 3D never carries the only meaning.
36. Every geometry, material, texture, and renderer is disposed.
37. Media never causes layout shift.
38. Every interactive target is keyboard accessible.
39. Every focus state is visible.
40. Accessibility failures block release.
41. Every external input is validated on the server.
42. Every mutation authenticates and authorizes where applicable.
43. Secrets never reach the browser.
44. Public APIs are rate-limited according to risk.
45. Logs are structured and exclude sensitive payloads.
46. Performance budgets are release constraints.
47. Tests protect contracts, not implementation trivia.
48. Preview artifacts are verified before production.
49. Agents open PRs; they never merge or bypass review.
50. When the architecture does not require a new abstraction, do not create one.

---

# PART 21 — Code standards

## 21.1 Naming

| Item | Convention |
|---|---|
| Component file | `PascalCase.tsx` |
| Hook file | `useCamelCase.ts` |
| Utility/module | `kebab-case.ts` or existing repository convention, consistently |
| Route folder | kebab-case |
| Dynamic segment | `[slug]`, `[...segments]` |
| Test | `name.test.ts(x)` |
| Story | `Name.stories.tsx` |
| Types | `PascalCase` |
| Constants | `camelCase` for scoped; `UPPER_SNAKE_CASE` only true global constants |

## 21.2 Functions

- Prefer named `const` functions inside modules when repository convention requires.
- Event handlers begin with `handle`.
- Boolean names read as predicates: `isOpen`, `hasConsent`, `canPublish`.
- Server operations use verbs: `submitEnquiry`, `publishEntry`.
- Repository reads use `get`, `list`, or `find`.

## 21.3 Props and types

- Props are explicit named types.
- No `any`.
- Prefer discriminated unions for state variants.
- Do not expose provider-native types across adapter boundaries.
- Encode invariants where practical: publication state and proof status are not free strings.

## 21.4 Imports

Order:

1. framework/runtime;
2. external packages;
3. absolute internal imports;
4. relative local imports;
5. type-only imports where supported.

No deep imports across feature boundaries. Avoid barrels that pull large client dependency graphs.

## 21.5 Exports

- Default exports only where Next.js file conventions require or for one-component modules under established convention.
- Feature public APIs use explicit named exports.
- Do not export helpers “just in case.”

## 21.6 Hooks

- Hooks represent reusable browser behavior.
- Hooks never conditionally call other hooks.
- Effects synchronize with external systems; they do not derive ordinary state.
- Every effect that subscribes, animates, or allocates cleans up.

## 21.7 Utilities

A utility is:

- stateless;
- deterministic where possible;
- domain-neutral;
- tested if non-trivial.

Domain logic belongs in its feature or content model.

## 21.8 Comments

Comments explain **why** a constraint exists. They do not narrate obvious code.

## 21.9 Dependency admission

Before adding a package, document:

- unmet requirement;
- why native/installed tools cannot satisfy it;
- bundle/runtime cost;
- maintenance and security posture;
- exit strategy.

## 21.10 Dependency decisions for the target stack

| Dependency | Decision | Justification |
|---|---|---|
| Next.js / React | Required | App Router, RSC, routing, rendering |
| Tailwind v4 | Required | Token-consumer utility layer |
| GSAP | Required for choreographed scenes | Scroll/sequence authority |
| Motion | Allowed, scoped | Local UI presence transitions |
| Lenis | Conditional | Use only after accessibility/user testing |
| Three.js + R3F | Conditional feature | Immersive scenes only |
| MDX/content collection | Required when Journal/Knowledge ships | Typed editorial content |
| Zustand | Deferred | No current global client-state need |
| React Query | Deferred | No current client-remote-cache need |
| Storybook | Required before component platform expansion | Contract documentation/visual tests |
| Vitest | Required | Fast unit/integration tests |
| Playwright | Required | Cross-browser E2E |
| Biome/Prettier | Choose one formatter | Avoid conflicting authorities |

---

# Appendix A — Architecture decision records required

Create an ADR before:

- extracting XSMITHS into another repository;
- changing production host;
- adding a CMS;
- adding auth;
- adding Zustand or React Query;
- adding GraphQL;
- adding a second accent or design-system fork;
- adding a persistent client data layer;
- introducing a new animation runtime;
- exceeding performance budgets.

---

# Appendix B — Current-state migration priorities

1. Preserve working `/xsmiths` nested route and Cloudflare deployment.
2. Introduce `--xs-*` token aliases and remove arbitrary governed values.
3. Isolate the XSMITHS runtime shell completely: chromeless routing must also prevent parent MissionShell atmosphere, grid, smooth-scroll, and agent behavior from leaking into XSMITHS unless explicitly adopted.
4. Move XSMITHS content behind a repository contract and split the current single content module by canonical domain model.
5. Add an XSMITHS agent brand overlay and register it with governed content/SEO/concierge agents before those agents create XSMITHS material.
6. Add route-level error, not-found, loading, sitemap, robots, canonical metadata, and structured-data boundaries.
7. Establish the media pipeline: `next/image`, asset manifests, responsive renditions, video posters, and public asset budgets.
8. Add Vitest, Playwright, Storybook, accessibility, visual-regression, bundle, and Lighthouse gates.
9. Define motion ownership and remove mixed or duplicate animation responsibility; decide whether Lenis remains after accessibility testing.
10. Replace process-memory rate limiting with the hosting adapter before exposing higher-risk contact, concierge, search, or AI traffic.
11. Add analytics and observability contracts before collecting product events; exclude personal form content.
12. Add platform adapters before introducing any new provider.
13. Add CMS, i18n, search, 3D, and client-state/data libraries only when their governance triggers are met.

---

# Appendix C — Source guidance

This architecture follows stable Next.js 15 App Router boundaries:

- Server Components as the composition/data default;
- Client Components nested as interactive islands;
- App Router layouts, loading, error, and route handlers;
- `generateStaticParams` and route metadata for static collections;
- Suspense for independent dynamic subtrees;
- explicit route rendering/cache configuration.

Future Next.js cache APIs are treated as an infrastructure concern because they evolve across major versions. Feature and domain code must not depend directly on a specific cache generation.

---

# Document control

| Version | Date | Change |
|---|---|---|
| 1.0 | 2026-07-21 | Initial frontend platform architecture |

**Next review:** Before CMS adoption, authenticated portal work, separate microsite deployment, or Next.js major-version migration.

---

*End of XSMITHS Frontend Platform Architecture v1.0*
