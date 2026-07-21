# XSMITHS Information Architecture

**Version 1.0 · Master Reference**

Status: Canonical  
Audience: Information architects, UX writers, content strategists, SEO, product designers, frontend engineers, sales, AI agents  
Constitutional inputs (immutable):  
- *XSMITHS Creative Direction Bible*  
- *XSMITHS Design System v1.0*  
- Binding website sources: Positioning, Brand Foundation, Website Development Plan, PRD  

This document does not design screens. It defines how curiosity is sequenced, how information earns the right to appear, and how every future surface — web, kiosk, deck, proposal — inherits the same narrative grammar.

**Scope note:** Part 4 defines both the **v1 binding sitemap** (what ships now) and the **ecosystem target architecture** (what the system must support without redesign). v1 must not invent pages that violate Proof Standard or the Development Plan.

---

## Document map

| Part | Subject |
|------|---------|
| 1 | Information philosophy |
| 2 | Narrative architecture |
| 3 | Visitor personas |
| 4 | Website structure (v1 + ecosystem) |
| 5 | Content hierarchy |
| 6 | Navigation philosophy |
| 7 | Homepage story (scene-by-scene) |
| 8 | Page storytelling frameworks |
| 9 | Content system |
| 10 | Content density |
| 11 | Editorial language |
| 12 | Case study framework |
| 13 | Product storytelling |
| 14 | Industry storytelling |
| 15 | Journal strategy |
| 16 | SEO philosophy |
| 17 | Search experience |
| 18 | Calls to action |
| 19 | Future expansion |
| 20 | Information governance |

---

# PART 1 — Information philosophy

## 1.1 What IA means for XSMITHS

Information architecture at XSMITHS is not the arrangement of pages. It is the **choreography of recognition**: deciding when a visitor knows enough to feel wonder, when wonder should deepen into understanding, and when understanding should open into conversation — without forcing them to “browse a company.”

IA answers one question per moment:

> *What does this person need to feel next — and what is the least information that produces that feeling?*

## 1.2 Why conventional websites fail here

Conventional sites optimize for inventory:

- Nav dumps every department.
- Homepages summarize the company before the visitor has entered the experience.
- Products open with specs.
- Case studies open with logos and numbers.
- CTAs interrupt mid-curiosity.

That pattern serves **procurement**. XSMITHS serves **participation**. A procurement site rewards completeness. An experience-engineering brand rewards *earned completeness* — information that arrives after the visitor has a reason to care.

When IA is inventory-first, the Magician archetype collapses into a catalog. Wonder cannot compete with a megamenu.

## 1.3 Why storytelling outranks navigation

Navigation is a map for people who already know the territory. Most first-time visitors to XSMITHS do not know which product family they need — they know a *problem with a space* (static lobby, flat exhibit, unattended robot risk, agency handoff failure).

Storytelling is the path that turns an undefined need into a named capability. Navigation remains available — but secondary — as the escape hatch for experts who already know where they are going.

**Principle:** Story guides the majority. Navigation serves the minority with intent.

## 1.4 How information becomes experience

Information becomes experience when three conditions hold:

1. **Threshold before claim** — The visitor enters a state (darkness, pause, presence) before reading a proposition.
2. **Effect before mechanism** — They see/feel a response before they learn how it works.
3. **Room before corridor** — Each idea gets a complete beat; the next idea waits for a designed pause.

IA’s job is to enforce those conditions as structure, so designers and writers cannot accidentally reverse them under deadline pressure.

---

# PART 2 — Narrative architecture

## 2.1 Canonical visitor journey

```
Arrival
  ↓
Curiosity
  ↓
Recognition
  ↓
Wonder
  ↓
Discovery
  ↓
Understanding
  ↓
Confidence
  ↓
Trust
  ↓
Conversation
```

This sequence maps to the Creative Direction Bible’s emotional journey, refined for *information* (what the mind does) rather than only *feeling* (what the body does).

## 2.2 Stage definitions

| Stage | Psychological job | Information allowed | Information forbidden |
|-------|-------------------|---------------------|------------------------|
| **Arrival** | Register threshold; leave previous context | Brand name, tagline, one pitch line, venture attribution | Menu of everything, stats, feature grids above the fold |
| **Curiosity** | Notice difference without naming it | Belief fragments; incomplete revelation | Full explanations, “why choose us” |
| **Recognition** | Realize “this is for people who make spaces respond” | Partner statement; engineering vs event production | Competitive tables, agency-bashing |
| **Wonder** | Experience the effect of the idea | Philosophy lines; ambient effect language | Specs, process diagrams |
| **Discovery** | Test the system by exploring families | Product ecosystem as gallery of doors | Deep feature lists on first contact |
| **Understanding** | Map desire to a named capability | Family detail: focus, contexts, short description | Fake proof, invented SKUs |
| **Confidence** | Believe delivery is real craft | Services mapped to X-Consult / X-Lab / X-Build / X-Ops | Hype, unverified scale |
| **Trust** | Believe reliability and partnership | Story, mission, promise, manifesto; ops commitment | “Industry-leading,” client counts |
| **Conversation** | Take a low-friction next step | Contact path; optional family context | Booking widgets, quote calculators |

## 2.3 Why this sequence exists

- **Wonder before Understanding** protects the Magician: explanation too early kills the effect.
- **Confidence before Trust** separates *capability* (we can build it) from *character* (we stand behind it).
- **Trust before Conversation** ensures the CTA is a continuation of belief, not a conversion interrupt.
- **Recognition early** protects brand doctrine: agencies must feel safe before they explore products.

---

# PART 3 — Visitor personas

Personas are decision instruments — not marketing fiction. Each includes content and navigation preferences so IA can serve them without fracturing into twelve websites.

Shared across all personas:

- Need to feel XSMITHS is a **partner**, not a competitor to producers.
- Need **stage-honest** claims (no invented proof).
- Prefer **experience-first** language over feature dumps.

---

### P01 — Museum / Visitor Centre Director

| Dimension | Detail |
|-----------|--------|
| **Goals** | Exhibits visitors participate in; systems that survive continuous public use; accountable ops after opening. |
| **Pain points** | Vendor patchwork; demos that fail in week two; unclear ownership. |
| **Decision drivers** | Reliability unattended; educational clarity; visitor engagement quality. |
| **Objections** | “Too experimental”; maintenance burden; unclear who operates. |
| **Success metrics** | Dwell / interaction quality; uptime; staff confidence. |
| **Content needs** | INTERACT, SPACES, AI HUMAN, SENSORIUM; Operations pillar; philosophy of participation. |
| **Nav preference** | Products → family → Contact; About for institutional validation. |

### P02 — Creative / Event Agency Producer

| Dimension | Detail |
|-----------|--------|
| **Goals** | Technical partner who makes interactive moments work on the day; fewer vendors. |
| **Pain points** | Fear of competitor entering the account; last-mile failure; coordination overhead. |
| **Decision drivers** | Explicit partner stance; STAGE / INTERACT / PLAY; X-Ops reliability. |
| **Objections** | “Will they take my client?”; timeline risk. |
| **Success metrics** | On-day reliability; single accountable team. |
| **Content needs** | Partner statement on Home + About; Services; STAGE, INTERACT, CONNECT. |
| **Nav preference** | Home (partner line) → Services → Contact. Products as optional deep dive. |

### P03 — Brand Manager (Corporate / Retail)

| Dimension | Detail |
|-----------|--------|
| **Goals** | Lobby / flagship / showroom that engages; brand-right experience without becoming an event company. |
| **Pain points** | Pretty renders that don’t operate; unclear ownership after install. |
| **Decision drivers** | AI HUMAN, SPACES, ROBOTICS; Brand promise (stand behind running systems). |
| **Objections** | CapEx vs novelty; IT/security; brand risk. |
| **Success metrics** | Guest engagement; brand consistency; ops stability. |
| **Content needs** | SPACES, AI HUMAN; Services; Contact with optional family. |
| **Nav preference** | Products gallery → family → Contact. |

### P04 — Architect / Spatial Designer

| Dimension | Detail |
|-----------|--------|
| **Goals** | Integrate interactive systems into architecture; honest collaboration with tech. |
| **Pain points** | Tech bolted on after design; no spatial planning language. |
| **Decision drivers** | Strategy & Design pillar; SPACES; philosophy of whole-space response. |
| **Objections** | Aesthetic conflict; late-stage tech. |
| **Success metrics** | Seamless integration; design integrity preserved. |
| **Content needs** | Philosophy; Services (X-Consult/X-Lab); SPACES / IMMERSION. |
| **Nav preference** | About / Philosophy → Services → Products. |

### P05 — Retail Developer / Landlord

| Dimension | Detail |
|-----------|--------|
| **Goals** | Differentiate space; footfall quality; durable installs. |
| **Pain points** | Novelty that ages badly; maintenance. |
| **Decision drivers** | PLAY, INTERACT, CONNECT; Operations. |
| **Objections** | Cost vs footfall; durability. |
| **Content needs** | Product contexts (Retail); Ops; Contact. |
| **Nav preference** | Products → Contact. |

### P06 — Event Producer (Venue-side)

| Dimension | Detail |
|-----------|--------|
| **Goals** | Reveal systems, stages, temporary interactive moments that work. |
| **Pain points** | Same as agency; venue constraints. |
| **Decision drivers** | STAGE, INTERACT; X-Build / X-Ops. |
| **Content needs** | Partner stance; STAGE; Services. |
| **Nav preference** | Home → Services → Contact. |

### P07 — Government / Civic / Public Space

| Dimension | Detail |
|-----------|--------|
| **Goals** | Inclusive public engagement; accountable procurement language. |
| **Pain points** | Opaque vendors; accessibility; longevity. |
| **Decision drivers** | Proof Standard honesty; Ops; accessibility; SPACES / INTERACT. |
| **Objections** | Risk, transparency, maintenance. |
| **Content needs** | Clear capabilities without hype; Services; Contact. |
| **Nav preference** | About → Services → Contact; Products as evidence of range. |

### P08 — Hospitality

| Dimension | Detail |
|-----------|--------|
| **Goals** | Lobby/guest journey that feels personal; systems that run unattended. |
| **Pain points** | Gimmicks; staff training burden. |
| **Decision drivers** | AI HUMAN, ROBOTICS, SENSORIUM; reliability. |
| **Content needs** | Family contexts; Brand promise; Ops. |
| **Nav preference** | Products → Contact. |

### P09 — Experience Centre / Brand Museum Lead

| Dimension | Detail |
|-----------|--------|
| **Goals** | Permanent interactive environment; end-to-end accountability. |
| **Pain points** | Multi-vendor collapse; no Evolve stage. |
| **Decision drivers** | SPACES; full Method alignment; Ops/Evolve. |
| **Content needs** | About story; Services; SPACES; Contact. |
| **Nav preference** | About → Products/SPACES → Services → Contact. |

### P10 — Education / Learning Environment

| Dimension | Detail |
|-----------|--------|
| **Goals** | Participatory learning environments (not KONSTRUKT — that’s a separate venture). |
| **Pain points** | Edtech that ignores space; fragile installs. |
| **Decision drivers** | INTERACT, PLAY, IMMERSION; Human-Centred Engineering value. |
| **Content needs** | Family contexts; philosophy of participation. |
| **Nav preference** | Products → About → Contact. |

### P11 — Entertainment / Live Experience

| Dimension | Detail |
|-----------|--------|
| **Goals** | Kinetic/reveal/immersive moments that are reliable. |
| **Pain points** | Show control complexity; one-night risk. |
| **Decision drivers** | STAGE, IMMERSION, INTERACT; X-Ops. |
| **Content needs** | Partner stance; STAGE; Services. |
| **Nav preference** | Home → Products/STAGE → Services → Contact. |

### Persona content rule

Do **not** create eleven separate websites. Create:

1. **Universal spine** (Home → Products → Services → About → Contact).  
2. **Persona lenses** via family contexts, elevator-pitch variants in About/Contact framing, and (future) Industry rooms that filter the same spine.

---

# PART 4 — Website structure

## 4.1 Binding v1 sitemap (ships now)

Aligned to Website Development Plan / PRD. Do not invent additional public pages in v1.

```
/xsmiths/                          Home
/xsmiths/about                     Story, Philosophy, Manifesto
/xsmiths/products                  Product ecosystem overview
/xsmiths/products/[slug]           9 family rooms (ai-human … spaces)
/xsmiths/services                  Strategy & Design / Engineering & Fabrication / Operations
/xsmiths/contact                   Enquiry
/xsmiths/brand                     Optional — deferred (public / internal / omit)
```

**Primary nav (v1):** Products · Services · About · Contact  
*(Home via wordmark)*

**Footer:** Full sitemap links + “A Venture of XSEDES” → parent.

## 4.2 Why each v1 page exists

| Page | Why it exists | Narrative stage |
|------|---------------|-----------------|
| **Home** | Threshold + belief + capability doors + services strip + partner + invitation | Arrival → Wonder → Discovery → Confidence → Conversation seed |
| **Products** | Gallery of nine families; PhotoShap clarification | Discovery |
| **Products/[slug]** | One family room; contexts; no fake proof | Understanding |
| **Services** | Map delivery to XSEDES divisions — doctrine requirement | Confidence |
| **About** | Partner doctrine, mission, philosophy, manifesto | Recognition → Trust |
| **Contact** | Conversation without booking theatre | Conversation |

## 4.3 What must never become a page (v1)

| Forbidden page type | Why |
|---------------------|-----|
| Case studies / logo wall | Proof Standard — no verified public proof yet |
| Pricing / calculator | Not a transactional brand |
| Fake “500+ deployments” | Third-party brochure numbers are not XSMITHS’s |
| Separate “AI” marketing page | AI is embedded in families, not a hype pillar |
| Event production offerings | Competes with agencies — doctrine violation |
| PhotoShap as 10th family | Separate venture — partnership language only |
| CMS blog in v1 | Content lives in typed data + Brand Bible |
| Careers (unless parent already routes it) | Out of XSMITHS venture scope for v1 unless owned |

## 4.4 Ecosystem target architecture (future-ready)

The long-term information ecosystem — pages appear only when governance + Proof Standard allow:

```
/xsmiths/
├── /                         Threshold (Home)
├── /experience               Optional future: immersive manifesto experience
├── /products                 Capability gallery
│   └── /[family]             Family rooms (01–09+)
├── /industries               Persona lenses (filter, don’t duplicate)
│   └── /[industry]
├── /services                 Delivery model
├── /technology               Mechanism deep-dive (post-wonder surfaces)
├── /studio                   Method + craft culture (Evolve narrative)
├── /projects                 Proof rooms (only with verified data)
│   └── /[project]
├── /journal                  Editorial (Part 15)
│   └── /[slug]
├── /insights                 Pillar essays / whitepapers
├── /about                    Trust & doctrine
├── /careers                  If/when hiring surface owned by venture
├── /contact                  Conversation
└── /brand                    Asset library (access-controlled if needed)
```

**Rule:** Future pages **extend** the narrative spine. They do not replace Home’s threshold role or Products’ gallery role.

## 4.5 Ecosystem page existence criteria

A new page type may be added only if:

1. It serves a distinct narrative stage not already served, **or**  
2. It serves a distinct audience job (e.g. verified project proof), **and**  
3. Content is stage-honest and owned, **and**  
4. It can be navigated as a “room” under Design System Part 5 (one idea per room).

---

# PART 5 — Content hierarchy

## 5.1 What deserves which surface

| Surface | Deserves | Does not deserve |
|---------|----------|------------------|
| **Homepage** | Threshold, 5 beliefs (short), 9 family doors, 3 service pillars, partner line, invitation | Full manifesto, specs, case stats, long About |
| **Category** (`/products`) | Family names + one-line focus + PhotoShap note | Feature matrices |
| **Subpage** (family) | Numbered name, paragraph, contexts, partner reminder, path to Contact | SKU catalogs, unverified claims |
| **Article / Journal** (future) | One thesis; editorial length | Product dump |
| **Case study** (future) | Challenge → Outcome with verified facts | Inflated metrics |
| **Download** (future) | Capability statement PDF; brand assets | Speculative pitch decks as “proof” |
| **Interactive experience** | Home threshold / future Experience room | Decorative WebGL behind body copy |
| **Video** | Effect-first showreel; project film when real | Talking-head “about us” as hero |
| **3D demonstration** | One metaphor scene max per page (Design System Part 10) | Nav decoration |

## 5.2 Hierarchy reasoning

- **Homepage earns curiosity**, not completeness.  
- **Category earns orientation**.  
- **Subpage earns understanding**.  
- **Proof surfaces earn trust** — and therefore wait until real.  
- **Mechanism surfaces** (`/technology`) sit *after* wonder in the journey — never as the front door.

---

# PART 6 — Navigation philosophy

## 6.1 Invisible navigation

Navigation should feel like museum wayfinding: present when you look for it, never louder than the work.

## 6.2 Layers

| Layer | Contents | Behaviour |
|-------|----------|-----------|
| **Primary** | Products, Services, About, Contact | Sticky; wordmark = Home; active = accent |
| **Secondary** | Within Products: back to overview; family-to-family optional | Contextual only |
| **Contextual** | “Start a conversation” on family pages; division labels on Services | Appears where stage = Understanding/Confidence |
| **Footer** | Full map + venture lock + parent link | Always; CTA line except on Contact |
| **Breadcrumbs** | `Products / AI HUMAN` on family pages (future polish) | Text, quiet; not chrome-heavy |
| **In-page** | Section labels `§ NN · NAME` | Orientation without competing with primary nav |
| **Progress** | Optional scroll progress — only if silent and non-gimmicky | Prefer none in v1 |

## 6.3 When navigation should disappear

| Context | Nav treatment |
|---------|---------------|
| Immersive threshold (hero) | Nav remains sticky but visually quiet — does not compete with reticle |
| Future full-bleed Experience room | May hide primary nav until exit affordance |
| Modal / lightbox | Trap focus; hide background nav interaction |
| Kiosk attract loop | No web nav; physical/UI attract pattern |

Nav never “auto-hides on scroll” in a way that reduces confidence (Design System §7.2).

---

# PART 7 — Homepage story

Narrative design only — scenes, not wireframes. Aligns with Design System homepage pacing and Creative Bible.

### Scene 01 — Threshold

| Dimension | Spec |
|-----------|------|
| **Goal** | Separate visitor from previous context; announce XSMITHS. |
| **Emotion** | Arrival → early Curiosity. |
| **Story** | A space is about to notice you. |
| **Content** | Wordmark; tagline *Engineering Interactive Experiences*; one elevator pitch; “A Venture of XSEDES.” |
| **Media** | Black canvas; reticle; optional atmosphere — not a collage. |
| **Interaction** | None required; presence is enough. |
| **CTA** | None in hero (threshold, not billboard). |
| **Transition** | Scroll corridor into Belief. |

### Scene 02 — Belief

| Dimension | Spec |
|-----------|------|
| **Goal** | State philosophy as constraints, not slogans. |
| **Emotion** | Curiosity → Wonder. |
| **Story** | Five laws of how XSMITHS engineers experience. |
| **Content** | Five short lines (Philosophy.md); Instrument Serif on emphasis words only. |
| **Media** | Typographic installation. |
| **Interaction** | Scroll reveal once. |
| **CTA** | Partner statement under beliefs (Recognition seed). |
| **Transition** | Into Capability doors. |

### Scene 03 — Capability (Product ecosystem)

| Dimension | Spec |
|-----------|------|
| **Goal** | Offer nine doors without forcing choice paralysis via detail. |
| **Emotion** | Wonder → Discovery. |
| **Story** | The portfolio is a gallery of ways spaces respond. |
| **Content** | 01–09 name + one-line focus; links to family rooms. |
| **Media** | Gallery grid (Design System). |
| **Interaction** | Hover/focus as attention; click enters room. |
| **CTA** | Implicit: enter a family. |
| **Transition** | Into delivery model. |

### Scene 04 — Experience delivery (Services)

| Dimension | Spec |
|-----------|------|
| **Goal** | Prove craft has an operating system. |
| **Emotion** | Discovery → Confidence. |
| **Story** | Strategy & Design / Engineering & Fabrication / Operations via XSEDES divisions. |
| **Content** | Three pillars + division labels + short capability lists. |
| **Media** | Accent top rules; no cards-with-shadows. |
| **Interaction** | Link to `/services`. |
| **CTA** | Soft — explore services. |
| **Transition** | Into invitation. |

### Scene 05 — Invitation

| Dimension | Spec |
|-----------|------|
| **Goal** | Open Conversation without hard sell. |
| **Emotion** | Confidence → Conversation seed. |
| **Story** | “Let’s build a space that *responds*.” |
| **Content** | Footer CTA line + venture lock + sitemap. |
| **Media** | Typographic. |
| **Interaction** | Links. |
| **CTA** | Contact via nav/footer — language per Part 18. |

### Scenes intentionally *not* on v1 Home

| Deferred scene | Why deferred |
|----------------|--------------|
| Proof / Projects | No verified public proof |
| Industries | Future filter layer |
| Technology | Mechanism before wonder if placed early |
| Studio / Journal | Not in v1 sitemap |

---

# PART 8 — Page storytelling frameworks

Every page uses a narrative arc. Copywriters fill slots; they do not invent new arcs.

## 8.1 Universal page arc

```
Threshold → Question → Discovery → Understanding → Proof* → Conversation
```

\*Proof only when verified content exists; otherwise skip or replace with **Doctrine** (partner stance / reliability promise).

## 8.2 About

```
Threshold (why we exist)
  → Question (why spaces stay static / handoffs fail)
  → Discovery (engineering vs event production — mandatory)
  → Understanding (mission + brand promise)
  → Doctrine (full philosophy with elaboration)
  → Manifesto (verbatim closing room)
  → Conversation (soft link to Contact)
```

## 8.3 Products overview

```
Threshold (ecosystem framed as gallery)
  → Clarification (PhotoShap partnership note)
  → Discovery (nine doors)
  → Conversation (optional)
```

## 8.4 Product family

```
Threshold (number + name)
  → Question (implied by focus line)
  → Discovery (one paragraph — purpose, not features)
  → Understanding (contexts as applications)
  → Doctrine (partner reminder)
  → Conversation (Contact)
```

## 8.5 Services

```
Threshold (how we deliver)
  → Understanding (three pillars × division mapping)
  → Confidence (capabilities lists)
  → Conversation
```

## 8.6 Contact

```
Threshold (start a conversation)
  → Understanding (one-liner + what to tell us)
  → Action (form)
  → Trust (no fake booking theatre)
```

## 8.7 Future: Industries

```
Threshold (industry-specific elevator)
  → Recognition (partner stance if agency-heavy)
  → Discovery (relevant families only)
  → Confidence (services)
  → Conversation
```

## 8.8 Future: Projects

```
Threshold (effect)
  → Challenge → Insight → Concept → Engineering → Build → Interaction → Outcome → Future
  (see Part 12)
```

## 8.9 Future: Journal

```
Threshold (thesis)
  → Argument
  → Evidence / observation
  → Implication for experience engineering
  → Related rooms (internal links)
```

## 8.10 Future: Technology

```
Threshold (one system metaphor)
  → Discovery (layers)
  → Understanding (integration with Method / divisions)
  → Conversation (for technical buyers)
```

**Rule:** Technology pages never replace Home. They are side galleries for people already in Understanding.

---

# PART 9 — Content system

Content types are reusable slots. Purpose + constraints — not finished copy.

| Type | Purpose | Length | Hierarchy | Tone | Visual treatment |
|------|---------|--------|-----------|------|------------------|
| **Hero** | Threshold | 1 name + 1 tagline + ≤40 words pitch | Dominant | Calm, declarative | Immersive black + reticle |
| **Manifesto** | Trust / meaning | Verbatim Brand Bible block | Closing room | Elevated but precise | Differentiated surface |
| **Editorial** | Story / About | 2–4 paragraphs per section | Sequential | Engineering-led | Editorial grid |
| **Feature** | Capability highlight | 1 headline + ≤2 sentences | Secondary | Descriptive | Single focal |
| **Product** | Family door / room | Name + focus + 1 paragraph + contexts | Gallery → detail | Experience-first | Gallery cell / family page |
| **Technology** | Mechanism | Short sections; diagrams | Below wonder | Technical clarity | Blueprint illustration |
| **Quote** | Human voice | ≤40 words | Accent only | Sincere | Rare; Instrument optional |
| **Statistic** | Proof | **v1: forbidden** unless verified | — | — | — |
| **Diagram** | System understanding | Labels sparse | Supporting | Neutral | Hairline blueprint |
| **Gallery** | Multiple peers | Equal weight cells | Parallel | — | 1px gap grid |
| **Timeline** | Method stages | 8 Method stages if used | Process | Precise | Horizontal/vertical hairline |
| **Process** | Delivery | 3 service pillars | Confidence | Operational | Accent top rule columns |
| **FAQ** | Objection handling | Short Q/A | Low | Plain | Avoid dumping on Home |
| **CTA** | Invitation | 1 line or button label | Terminal | Non-urgent | Accent sparingly |

---

# PART 10 — Content density

## 10.1 Quantity rules

| Location | Max text |
|----------|----------|
| **Above the fold (Home)** | Brand + tagline + ≤40-word pitch + venture line |
| **Within a section** | 1 headline + 1 short support **or** a list of short lines (philosophy) |
| **Per paragraph** | 2–4 sentences; prefer 1 idea |
| **Per page (marketing)** | Enough for one narrative arc; if > ~800 words, split rooms |
| **Per product family page** | 1 paragraph description + contexts list — no essay |
| **Per project (future)** | Effect-first; mechanism in later beats; verified outcomes only |
| **Per case study (future)** | Cap vanity metrics; prioritize interaction outcome |

## 10.2 Rhythms

| Rhythm | Definition |
|--------|------------|
| **Reading** | Body at 16–17px, ≤68ch, light weight — used in About/manifesto |
| **Scanning** | Labels, numbers, family names — used in Products/Services |
| **Pause** | `xs-space-30` corridors; silence between rooms |

**Rule:** After a scanning section (grid), insert a pause before the next reading section.

---

# PART 11 — Editorial language

Standards for writers — not sample copy.

## 11.1 Sentence length

- Prefer short declarative sentences in thresholds and CTAs.  
- Allow medium sentences in About.  
- Avoid clause-stacking that performs cleverness.

## 11.2 Paragraph rhythm

- Alternate short and medium.  
- Never three long paragraphs without a break (subhead, list, or corridor).

## 11.3 Headline philosophy

- Announce the **room**, not the marketing claim.  
- Uppercase architectural titles for page thresholds (Design System).  
- No question-mark clickbait.  
- No “Ultimate Guide to…”.

## 11.4 Subhead philosophy

- Clarify the question the section answers.  
- One line. Secondary colour. Never accent for long subheads.

## 11.5 Captions

- One line. Describe experience or material truth.  
- Never stock-photo clichés.

## 11.6 Pull quotes

- Rare. Only when a sentence can stand as an installation.  
- Prefer Brand Bible / manifesto lines over invented slogans.

## 11.7 Technical writing

- Precise nouns: sensors, show control, commissioning, unattended operation.  
- No “AI-powered” without a real AI component (Core Values / Integrity).

## 11.8 Thought leadership (future Journal)

- Argue from observation of space and participation.  
- Cite reality; mark unknowns `[VERIFY]`.  
- Never trend-chasing listicles.

## 11.9 Case studies (future)

- Effect → engineering → outcome.  
- No logo soup. No unverifiable ROI.

## 11.10 Whitepapers / Journal articles

- Pillar thesis → evidence → implications for agencies/venues.  
- Link back to product families and services — never orphan.

## 11.11 Forbidden editorial moves

- Hype lexicon (Design System / brand-lint).  
- Urgency commerce voice.  
- Explaining the wonder in the same beat as showing it.

---

# PART 12 — Case study framework

**Status:** Structure approved; **content gated** by Proof Standard.

```
Challenge
  ↓
Insight
  ↓
Concept
  ↓
Engineering
  ↓
Build
  ↓
Interaction
  ↓
Outcome
  ↓
Future
```

| Beat | Belongs | Never appears |
|------|---------|---------------|
| **Challenge** | Spatial/visitor problem; constraints | Blaming prior vendors by name |
| **Insight** | What had to be true about people in the space | Buzzword insights |
| **Concept** | Experience intent (emotion + participation) | Feature laundry list |
| **Engineering** | Systems choices; reliability constraints | Trade-secret oversharing *or* fake depth |
| **Build** | Fabrication / integration realities | Heroics without ops |
| **Interaction** | What visitors actually did | Staged stock reactions as proof |
| **Outcome** | Verified qualitative/quantitative results only | Invented stats; “500+” |
| **Future** | Evolve stage; what persists | Fake roadmap promises |

**Publication rule:** No case study page until Mirsab/owner signs verified facts.

---

# PART 13 — Product storytelling

Experience first. Specifications last (and often elsewhere).

```
Problem
  ↓
Experience
  ↓
Technology
  ↓
Applications
  ↓
Operation
  ↓
Integration
  ↓
Future
```

| Beat | v1 family page | Future deep page |
|------|----------------|------------------|
| Problem | Implied by focus | Explicit short |
| Experience | Description paragraph | Expanded scenarios |
| Technology | Minimal / omit if it explains too early | Diagrams |
| Applications | `contexts[]` | Industry links |
| Operation | Point to Services / X-Ops | Unattended reliability detail |
| Integration | Point to Services / X-Build | With other families / PhotoShap |
| Future | Omit unless real | Evolve narrative |

**Ordering rule:** If Technology appears before Experience, rewrite.

**Numbering:** Keep 01–09 from Positioning — structure encodes meaning (Development Plan).

---

# PART 14 — Industry storytelling

## 14.1 Universal layer (never changes)

- Tagline and venture attribution  
- Partner-not-competitor doctrine  
- Five philosophy beliefs  
- Nine family names + core focus lines  
- Three service pillars × divisions  
- Proof Standard  

## 14.2 Variable layer (industry rooms — future)

| Industry | Emphasize families | Tone adjustment | Objection to preempt |
|----------|--------------------|-----------------|----------------------|
| Museums | INTERACT, SPACES, AI HUMAN, SENSORIUM | Institutional calm | Durability, education |
| Retail | INTERACT, PLAY, CONNECT, IMMERSION | Commercial clarity | Footfall vs gimmick |
| Hospitality | AI HUMAN, ROBOTICS, SENSORIUM | Warm precision | Unattended ops |
| Corporate | AI HUMAN, SPACES, STAGE, CONNECT | Executive restraint | Brand risk, IT |
| Government | SPACES, INTERACT, CONNECT | Transparent, modest | Procurement risk |
| Education | INTERACT, PLAY, IMMERSION | Human-centred | Safety, maintenance |
| Entertainment | STAGE, IMMERSION, INTERACT | Live reliability | On-night failure |
| Healthcare | SENSORIUM, AI HUMAN, INTERACT | Careful, non-hype | Privacy, calm |
| Transport | AI HUMAN, CONNECT, INTERACT | Wayfinding clarity | Throughput, robustness |

## 14.3 How much changes

- **~70% universal spine**  
- **~30% lens** (examples, contexts order, elevator variant, objection handling)  

Never create contradictory positioning per industry.

---

# PART 15 — Journal strategy

**v1:** No Journal.  
**Future:** Editorial surface that compounds authority (Part 16).

## 15.1 Topic domains

| Domain | Purpose |
|--------|---------|
| Research | Observations from real deployments (when allowed) |
| Engineering | How reliability is designed |
| Thought leadership | Philosophy of participation / response |
| Behind the scenes | Craft — not hype reels |
| Innovation | New families/patterns only when real |
| Design philosophy | Ties to Creative Bible |
| Project diaries | Process truth |
| Technology | Mechanism after wonder |
| Future trends | Cautious; no false prophecy |

## 15.2 Publishing guidelines

1. One thesis per piece.  
2. Mark unverified claims `[VERIFY]` — do not publish until resolved.  
3. Link to ≥1 product family or services room.  
4. No competitor-bashing; partner stance when agencies appear.  
5. Visuals follow Photography System.  
6. Cadence: quality over schedule — empty calendar better than empty ideas.  
7. AI-assisted drafts allowed only under Part 20 AI policy.

---

# PART 16 — SEO philosophy

Not keyword stuffing. **Semantic authority.**

## 16.1 Entity model (knowledge graph)

Primary entity: **XSMITHS**  
Parent: **XSEDES**  
Type: Experience engineering venture  
Related entities: 9 product families; 3 service pillars; 4 divisions; PhotoShap (partner venture); industries as contexts  

## 16.2 Topic clusters

| Pillar page | Supporting nodes |
|-------------|------------------|
| `/xsmiths` | Brand entity home |
| `/xsmiths/products` | Cluster hub |
| `/xsmiths/products/{family}` | Entity pages (AI HUMAN, etc.) |
| `/xsmiths/services` | Delivery entity |
| `/xsmiths/about` | Doctrine / origin |
| Future `/industries/{x}` | Intent pages linking into families |
| Future `/journal/{slug}` | Supporting articles into pillars |

## 16.3 Internal linking rules

- Family → Products overview → Services → Contact  
- About → Home philosophy (conceptual)  
- Never orphan Journal pieces  
- PhotoShap mentioned with link to `/photoshap` when relevant — not absorbed  

## 16.4 Canonical hierarchy

- Family pages are canonical for family names.  
- Do not create duplicate “AI digital human” landing pages outside the family slug.  
- Parent XSEDES venture teaser may link into `/xsmiths` as canonical venture home.

## 16.5 Evergreen vs news

- Pillars are evergreen.  
- Journal may be dated.  
- Never let news rewrite pillar positioning.

## 16.6 How authority compounds

Year 1: clear entities + internal links.  
Year 2+: verified projects + journal deepen clusters.  
Year 3+: industry rooms + downloads.  
Authority grows by **consistent entities and honest proof**, not by publishing volume.

## 16.7 Metadata

- Titles from content data: `AI HUMAN — XSMITHS`  
- Descriptions from focus lines / pitch — no hype  
- OG image: approved wallpaper/dark asset  

---

# PART 17 — Search experience

Think **museum archive**, not ecommerce filters.

## 17.1 v1

- No site search required.  
- Discovery via Products gallery + nav.

## 17.2 Future archive model

| Mechanism | Behaviour |
|-----------|-----------|
| **Search** | Query against titles, focuses, contexts, journal theses — not raw body dump |
| **Filters** | Family, industry context, content type (project / article / diagram) |
| **Tags** | Controlled vocabulary (Part 20) — not freeform folksonomy |
| **Collections** | Curated sets: “Permanent spaces,” “Live stage,” “Unattended ops” |
| **Related** | Same family, same industry, same narrative stage |
| **Recently viewed** | Optional kiosk/web — privacy-respecting |
| **Suggested reading** | Journal ↔ family bidirectional |

**Anti-pattern:** Faceted SKU filters that turn experience engineering into a parts catalog.

---

# PART 18 — Calls to action

## 18.1 Philosophy

CTAs invite **continuation of curiosity into collaboration**. They never coerce.

## 18.2 Allowed invitation verbs

| Prefer | Avoid |
|--------|-------|
| Begin a conversation | Buy now |
| Explore the ecosystem | Get a demo (unless real demo exists) |
| Tell us about the space | Book a call (unless calendar is intentional) |
| Collaborate | Limited time |
| Engineer with us | Sign up free |
| Visit (physical/future) | Learn more (empty) |

## 18.3 CTA principles

1. One primary CTA intent per viewport.  
2. CTA appears after Trust/Confidence beats — or as quiet persistent Contact in nav.  
3. Family pages may contextualize: conversation *about* that family (form dropdown).  
4. Language matches Magician + Craftsman: calm, specific, non-urgent.  
5. Footer CTA line is poetic invitation; button/nav Contact is operational invitation — both allowed.

## 18.4 v1 CTA inventory

- Nav: Contact  
- Family: Start a conversation  
- Services: Talk to us about a project  
- Footer: typographic invitation + Contact link  
- Form submit: Send enquiry  

---

# PART 19 — Future expansion

IA must absorb new surfaces **without renaming the spine**.

| Future surface | How it attaches |
|----------------|-----------------|
| New product family | Add 10th door; keep numbering meaningful; update cluster hub |
| Microsite | Subpath under `/xsmiths/...` or venture rule; inherit narrative arc |
| Museum / kiosk | Same journey stages; nav simplified to Threshold → Gallery → Invitation |
| Customer dashboard | Post-conversation product — outside marketing spine; shared tokens only |
| Documentation / Dev portal | Mechanism cluster; linked from Technology; never becomes Home |
| Knowledge base | Archive model (Part 17) |
| Academy | Education collection; Human-Centred Engineering framing |
| Community | Governance-heavy; partner stance enforced |
| Digital Twin platform | Product-family or Technology room — experience-first storytelling |

**Non-negotiable:** Home remains Threshold. Products remains Gallery. Contact remains Conversation.

---

# PART 20 — Information governance

## 20.1 Naming conventions

| Object | Convention |
|--------|------------|
| Product families | UPPERCASE short names: `AI HUMAN`, `IMMERSION`, … |
| Slugs | kebab-case: `ai-human`, `immersion`, … |
| Service pillars | Title Case with &: `Strategy & Design` |
| Divisions | Hyphenated: `X-Consult`, `X-Lab`, `X-Build`, `X-Ops` |
| Section labels | `§ NN · NAME` |
| Routes | `/xsmiths/...` only for this venture |

## 20.2 Taxonomy

**Controlled vocabularies:**

- `productFamily` (9 + future)  
- `servicePillar` (3)  
- `industryContext` (museums, retail, …)  
- `narrativeStage` (arrival … conversation)  
- `contentType` (hero, product, editorial, …)  
- `proofStatus` (`none` \| `internal` \| `public-verified`)  

## 20.3 Metadata (minimum)

For every publishable node:

- `title`, `slug`, `summary`  
- `productFamily[]` / `servicePillar[]`  
- `industryContext[]`  
- `proofStatus`  
- `updatedAt`, `owner`  
- `canonSource` (Brand Bible path or content file)

## 20.4 Relationships

- Family *servedBy* Service pillars  
- Family *appearsIn* Industry contexts  
- Project *demonstrates* Family (future)  
- Article *supports* Pillar page  
- PhotoShap *partnersWith* XSMITHS (not child of)

## 20.5 Versioning & lifecycle

| State | Meaning |
|-------|---------|
| Draft | Not public |
| Review | Brand + Proof check |
| Published | Live |
| Refresh | Scheduled review |
| Archive | Retained URL policy; no silent delete of public pillars |

## 20.6 Approval workflow

1. Content author (human or AI-assisted)  
2. Brand doctrine check (partner stance, Proof Standard, no hype)  
3. Owner approval (XSMITHS ops / Mirsab as needed)  
4. Publish via PR to content files (v1) or CMS (future)

## 20.7 AI content policy

- AI may draft from Brand Bible + this IA + Design System.  
- AI may **not** invent clients, metrics, or case outcomes.  
- AI must flag gaps as open questions — not fill with plausible fiction.  
- Final publish always human-accountable.

## 20.8 Ownership

| Domain | Owner |
|--------|-------|
| Positioning / families | Brand / XSMITHS lead |
| Services mapping | Brand + XSEDES ops |
| Contact routing | Ops (inbox/CRM) |
| Projects proof | Project lead + brand |
| Journal | Editorial owner (named when Journal ships) |

## 20.9 Review cycles

| Content | Cycle |
|---------|-------|
| Pillar pages | Quarterly doctrine pass |
| Family descriptions | When offering changes |
| Homepage narrative | When Creative Bible updates |
| Case studies | Per project + annual audit |
| This IA document | On new page type or Proof Standard change |

---

# Appendix A — v1 content inventory (source of truth)

| Node | Source |
|------|--------|
| Tagline, pitch, families, services | `src/content/xsmiths.ts` ← Positioning / Elevator Pitch |
| Philosophy lines | Philosophy.md |
| About story / manifesto | Story.md, Mission.md, Brand Manifesto.md |
| Partner doctrine | Story + Positioning + Core Values |
| Design tokens / density | Design System v1.0 |
| Emotion / wonder rules | Creative Direction Bible |

---

# Appendix B — Decision log (IA)

| Decision | Rationale |
|----------|-----------|
| v1 sitemap stays 5 sections + 9 families | Binding Dev Plan/PRD |
| Industries/Journal/Projects deferred | Proof + content ownership |
| Home omits proof scene | Proof Standard |
| Story > megamenu | Exhibition model; Magician archetype |
| Contact is Conversation not booking | PRD non-goals |
| PhotoShap note on Products | Positioning doctrine |

---

# Document control

| Version | Date | Change |
|---------|------|--------|
| 1.0 | 2026-07-21 | Initial Information Architecture Constitution |

**Next review:** When first verified project is cleared for public proof, or when `/industries` or `/journal` is approved to ship.

---

*End of XSMITHS Information Architecture v1.0*

The architecture should disappear. The experience should remain.
