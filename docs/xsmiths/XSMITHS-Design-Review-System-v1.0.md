# XSMITHS Design Review System

**Version 1.0 · Quality and Approval Constitution**

Status: Canonical  
Authority: Executive Design Review  
Applies to: digital products, websites, motion, components, typography, interactions, photography, illustration, video, 3D, navigation, layouts, proposals, presentations, campaigns, products, and physical installations

Constitutional references:

- XSMITHS Brand Bible
- XSMITHS Creative Direction Bible
- XSMITHS Design System v1.0
- XSMITHS Information Architecture v1.0
- XSMITHS Frontend Platform Architecture v1.0
- XSMITHS Website Development Plan and PRD

Repository note: separate canonical files titled *Motion System*, *Product Strategy*, and *Engineering Principles* are not currently present under `docs/xsmiths/`. Until they are added, motion is governed by Design System Part 9 and Frontend Architecture Part 10; product and engineering decisions are governed by the Brand Bible, PRD, IA, and Frontend Architecture. Reviewers must not invent missing doctrine.

---

## 0. Review mandate

The purpose of review is not to reward effort, taste, novelty, or technical complexity.

Review asks:

1. Does this deserve to exist?
2. Does it create a memory worth keeping?
3. Is it unmistakably XSMITHS?
4. Is every decision necessary?
5. Can the experience remain true under real operating conditions?

Functional correctness is the floor. Visual polish is not evidence of quality. Novelty is not evidence of originality. Complexity is not evidence of craft.

Approval is granted only when the work protects the future of the brand.

---

# PART 1 — Governance model

## 1.1 Review authority

Executive Design Review may:

- approve;
- approve with conditions;
- return for revision;
- reject;
- halt release;
- require removal rather than improvement;
- require post-launch validation before assigning a final quality level.

Deadlines, sunk cost, stakeholder enthusiasm, or implementation difficulty do not lower constitutional standards.

## 1.2 Burden of proof

The creator must prove:

- why the artifact exists;
- what human response it is designed to produce;
- which constitutional rule supports each exception;
- that accessibility and performance remain intact;
- that claims and evidence are verified;
- that simpler approaches were considered.

The reviewer is not responsible for rescuing an undefined premise.

## 1.3 Review evidence

No artifact is reviewed from explanation alone. Required evidence depends on medium:

| Medium | Minimum evidence |
|---|---|
| Page / product | Real responsive prototype, keyboard path, reduced-motion state, representative content |
| Motion | Recorded timing, live interaction, reduced-motion equivalent |
| Component | All states, responsive behavior, accessibility semantics |
| Photography | Contact sheet, crop system, final grade, usage context |
| Video | Full cut with sound-off review, captions, poster frame |
| 3D / shader | Live target-device build, fallback, frame-time evidence |
| Proposal / deck | Full narrative sequence, not isolated hero slides |
| Physical installation | Scale model/prototype, operational scenario, failure state, maintenance plan |

## 1.4 Review outcome

| Outcome | Meaning |
|---|---|
| **Approved** | All gates pass; release permitted |
| **Approved with conditions** | Non-constitutional refinements remain; owner and date recorded |
| **Revision required** | Direction can be preserved, but quality is insufficient |
| **Rejected** | Premise or expression conflicts with the constitution |
| **Release blocked** | Hard gate failure; no discretionary override |

---

# PART 2 — Quality gates

Gates are sequential. Failure at an earlier gate stops review at later gates.

## Gate 0 — Right to exist

The artifact must answer:

- Who is it for?
- What changes for that person?
- Why is this medium necessary?
- Why does XSMITHS need to make it?
- What should be remembered afterward?

**Pass:** A precise human purpose exists.  
**Fail:** The artifact exists because a competitor has one, a template included it, or a stakeholder requested “something impressive.”

## Gate 1 — Constitutional integrity

Required:

- XSMITHS remains a venture of XSEDES, not a fifth division.
- XSMITHS engineers experiences; it does not produce events.
- Partner-not-competitor positioning remains explicit where agency trust matters.
- Product families and service pillars use canonical names.
- Claims meet Proof Standard.
- Single accent remains `#4EF2D3`.

Any violation blocks release.

## Gate 2 — Narrative integrity

Required:

- the artifact has one emotional centre;
- information follows the IA narrative stage;
- effect precedes mechanism;
- the visitor is guided rather than confronted with inventory;
- the ending resolves into trust, understanding, or conversation.

## Gate 3 — System integrity

Required:

- design tokens are used;
- typography follows roles;
- layout uses an approved spatial mode;
- content follows canonical models;
- components follow documented states;
- no local mini design system has emerged.

## Gate 4 — Interaction and motion integrity

Required:

- every interaction changes meaning, state, or understanding;
- motion has a named purpose;
- one animation system owns each element;
- reduced motion preserves meaning;
- stillness remains available;
- no idle spectacle competes with content.

## Gate 5 — Inclusive and operational integrity

Required:

- WCAG 2.2 AA minimum;
- full keyboard path;
- readable contrast and type;
- tested error/failure states;
- media controls and captions;
- performance budgets met;
- installation or application remains reliable outside the ideal demo.

## Gate 6 — Release integrity

Required:

- real content, not placeholders;
- verified metadata and canonical URLs;
- visual regression reviewed;
- performance measured on production build;
- analytics exclude personal data;
- owner and review date recorded;
- rollback/fallback available.

## Gate 7 — Memory validation

Applied after release or prototype testing:

- Can people describe the central moment without prompts?
- Do they remember what changed because they were present?
- Do agencies understand partner-not-competitor?
- Can they name an appropriate next step?
- Did the technology recede behind the experience?

Masterpiece status cannot be assigned before this gate.

---

# PART 3 — Weighted scorecard

Each dimension receives a score from 0–5. Weighted results total 100.

| Dimension | Weight | 0 | 3 | 5 |
|---|---:|---|---|---|
| Brand integrity | 12 | Contradicts doctrine | Recognizable but generic | Unmistakably XSMITHS |
| Emotional impact | 11 | Indifferent | Interesting | Produces presence and durable wonder |
| Creative originality | 8 | Template/copy | Competent synthesis | New expression rooted in truth |
| Narrative quality | 10 | Inventory | Understandable sequence | Deliberate emotional progression |
| Interaction quality | 8 | Decorative/frictional | Functional | Meaningful response to human presence |
| Motion quality | 7 | Distracting | Controlled | Weighted, silent, purposeful |
| Architectural thinking | 8 | Flat stack | Structured layout | Memorable sequence of rooms |
| Typography | 6 | Decorative/inconsistent | Clear hierarchy | Type becomes spatial architecture |
| Whitespace and pacing | 6 | Crowded/empty by accident | Adequate | Silence actively shapes attention |
| Technology disappearance | 6 | Mechanism dominates | Mostly unobtrusive | Effect is felt before system is noticed |
| Accessibility | 8 | Exclusionary | AA on primary path | Inclusive by construction |
| Performance and reliability | 5 | Compromised | Meets baseline | Beauty and speed reinforce each other |
| Future proofing | 5 | Trend-bound | Durable enough | Credible in 2035 |

## 3.1 Score calculation

For each dimension:

`weighted score = (dimension score ÷ 5) × weight`

Round only the final total.

## 3.2 Score caps

Regardless of total:

- constitutional failure: **Rejected**
- accessibility failure on a primary task: maximum **Bronze**, release blocked
- unverified public claim: **Rejected**
- no reduced-motion mode for significant motion: maximum **Bronze**, release blocked
- performance budget breach without approved rationale: maximum **Silver**, release blocked
- generic/template expression: maximum **Silver**
- no tested failure/fallback state: maximum **Silver**
- missing Memory Validation: maximum **Platinum**

---

# PART 4 — Review levels

## Rejected — below 60 or any constitutional failure

The work should not ship. Repairing polish cannot correct a false premise, brand contradiction, exclusionary interaction, or unverified claim.

## Bronze — 60–69

**Meaning:** Functional and recognizable, but ordinary.

Bronze:

- meets basic utility;
- follows some tokens;
- communicates the offer;
- does not yet create presence or memory;
- may still feel like a competent agency website.

Bronze is not a launch target. It is an internal prototype threshold.

## Silver — 70–79

**Meaning:** Coherent, disciplined, and usable.

Silver:

- follows the system;
- has a clear narrative;
- avoids major clichés;
- is accessible and performant;
- remains emotionally conservative or predictable.

Silver may support internal tools or low-risk operational surfaces. It is insufficient for a flagship expression.

## Gold — 80–89

**Meaning:** Strong XSMITHS work.

Gold:

- feels brand-specific;
- creates curiosity;
- has meaningful interaction;
- demonstrates spatial pacing;
- maintains craft across states and breakpoints;
- will remain credible beyond current trends.

Gold is the minimum public-launch standard.

## Platinum — 90–95

**Meaning:** Exceptional and reference-worthy.

Platinum:

- creates wonder without spectacle;
- carries one unmistakable emotional centre;
- resolves brand, narrative, interaction, accessibility, and engineering as one system;
- contains no visible compromise between beauty and performance;
- teaches future teams something about XSMITHS.

Platinum is the target for flagship moments.

## Masterpiece — 96–100

**Meaning:** Culturally durable work.

Masterpiece:

- cannot be mistaken for another brand;
- introduces a new but inevitable-feeling expression;
- remains simple enough to be remembered;
- is retold by visitors in the first person;
- survives real use and repeat exposure;
- changes the internal standard for future work.

Masterpiece is observed, not declared. It requires Gate 7 evidence after real human exposure.

---

# PART 5 — One hundred review questions

Every review uses the relevant questions. Flagship work uses all 100.

## Brand integrity — Q01–Q10

1. **Q01:** Could this artifact belong to another agency or technology company if the logo were removed?
2. **Q02:** Does it position XSMITHS as an Experience Engineering venture of XSEDES?
3. **Q03:** Does it preserve the distinction between engineering experiences and producing events?
4. **Q04:** Will an agency understand that XSMITHS is a partner rather than a competitor?
5. **Q05:** Are all product families, divisions, ventures, and service pillars named canonically?
6. **Q06:** Are all public claims verified, stage-honest, and free from borrowed proof?
7. **Q07:** Is `#4EF2D3` used as signal rather than decoration?
8. **Q08:** Does the work express Wonder, Interaction, Emotion, Light, Space, Storytelling, Movement, and Participation rather than merely inheriting XSEDES precision?
9. **Q09:** Does every exception have a constitutional reason?
10. **Q10:** Does the work strengthen the future brand rather than consume it for a short-term campaign?

## Emotional impact — Q11–Q18

11. **Q11:** What should the visitor feel in the first five seconds?
12. **Q12:** Is curiosity created before explanation begins?
13. **Q13:** Is there a moment when the visitor realizes the system has noticed them?
14. **Q14:** Does wonder come from recognition and consequence rather than visual excess?
15. **Q15:** Is the emotional centre singular and legible?
16. **Q16:** Is enough silence present for the central moment to register?
17. **Q17:** Does the experience move from wonder toward confidence rather than ending at spectacle?
18. **Q18:** What exact memory should remain one week later?

## Creative originality — Q19–Q25

19. **Q19:** Is the idea rooted in XSMITHS truth or borrowed from current interface fashion?
20. **Q20:** Does the form arise from the content, space, or interaction?
21. **Q21:** Is novelty carrying weak meaning?
22. **Q22:** Has the simplest truthful expression been explored?
23. **Q23:** Does the work introduce a reusable principle rather than a one-off trick?
24. **Q24:** Are references understood as principles rather than copied surfaces?
25. **Q25:** Will the work still feel intentional after its visual technique becomes common?

## Narrative quality — Q26–Q34

26. **Q26:** What narrative stage does this artifact own?
27. **Q27:** Does the sequence follow Arrival → Curiosity → Recognition → Wonder → Discovery → Understanding → Confidence → Trust → Conversation where relevant?
28. **Q28:** Does effect appear before mechanism?
29. **Q29:** Does each section or scene contain one idea?
30. **Q30:** Are transitions meaningful corridors rather than filler?
31. **Q31:** Is information revealed only when the visitor has a reason to care?
32. **Q32:** Is the visitor the subject of the story rather than XSMITHS?
33. **Q33:** Does the ending resolve the premise introduced at the threshold?
34. **Q34:** Can the experience be retold coherently without describing the interface?

## Interaction quality — Q35–Q42

35. **Q35:** What real human signal causes each response?
36. **Q36:** Does the system respond before demanding input where possible?
37. **Q37:** Does every interaction change meaning, state, orientation, or understanding?
38. **Q38:** Are interactions discoverable without instructional clutter?
39. **Q39:** Is feedback immediate enough to establish causality?
40. **Q40:** Does repeated interaction build confidence rather than reveal fragility?
41. **Q41:** Are touch, pointer, keyboard, and assistive paths equivalent in outcome?
42. **Q42:** Would removing an interaction improve the experience?

## Motion quality — Q43–Q50

43. **Q43:** Why does each moving element move?
44. **Q44:** Does motion express weight, gravity, momentum, or attention?
45. **Q45:** Is the mechanical easing used consistently?
46. **Q46:** Is stillness held long enough to read as confidence?
47. **Q47:** Does one system own each animated element?
48. **Q48:** Does choreography guide attention without performing for attention?
49. **Q49:** Does reduced motion preserve hierarchy, meaning, and completion?
50. **Q50:** Would the experience remain compelling if all nonessential motion were removed?

## Architectural thinking — Q51–Q58

51. **Q51:** Does the experience have a threshold?
52. **Q52:** Are there recognizable rooms, corridors, galleries, and installations?
53. **Q53:** Does spatial scale correspond to conceptual importance?
54. **Q54:** Is navigation wayfinding rather than interface furniture?
55. **Q55:** Does the visitor understand where they are without constant chrome?
56. **Q56:** Are full-bleed moments rare enough to retain weight?
57. **Q57:** Does the sequence create a bodily sense of approach, entry, pause, and exit?
58. **Q58:** Would the architecture remain coherent if translated into a physical space?

## Typography and language — Q59–Q66

59. **Q59:** Does typography establish hierarchy before content is read?
60. **Q60:** Does large type function as architecture rather than decoration?
61. **Q61:** Is Barlow carrying the engineered voice correctly?
62. **Q62:** Is Instrument Serif rare enough to remain human and sincere?
63. **Q63:** Are labels, headings, body, captions, and actions using their defined roles?
64. **Q64:** Are line length, rhythm, tracking, and casing appropriate to the content mode?
65. **Q65:** Is the copy doing work the experience cannot do itself?
66. **Q66:** Can any sentence, label, or word be removed without loss?

## Whitespace and visual discipline — Q67–Q73

67. **Q67:** Is negative space actively directing attention?
68. **Q68:** Does the composition breathe at every breakpoint?
69. **Q69:** Are hairlines and corner marks structural rather than decorative?
70. **Q70:** Is there one dominant focal point per view?
71. **Q71:** Is density appropriate to the narrative stage?
72. **Q72:** Are pauses long enough for the previous idea to land?
73. **Q73:** Has decoration been mistaken for atmosphere?

## Technology and media — Q74–Q81

74. **Q74:** Does the visitor notice the effect before the technology?
75. **Q75:** Is 3D, video, sound, AI, or a shader necessary to the meaning?
76. **Q76:** Does every media element have a static or semantic fallback?
77. **Q77:** Does sound occur as consequence rather than ambient decoration?
78. **Q78:** Is photography capturing attention and response rather than staged promotion?
79. **Q79:** Are diagrams explaining systems only after wonder has been established?
80. **Q80:** Does the chosen medium remain reliable in the actual operating environment?
81. **Q81:** Is complexity hidden without hiding essential control or consent?

## Accessibility and human factors — Q82–Q89

82. **Q82:** Can every primary task be completed by keyboard?
83. **Q83:** Is focus visible, ordered, and restored correctly?
84. **Q84:** Does contrast meet WCAG 2.2 AA in every state?
85. **Q85:** Does reduced motion avoid vestibular triggers while preserving meaning?
86. **Q86:** Are text, targets, timing, and error recovery humane under stress?
87. **Q87:** Is meaning available without colour, sound, motion, or vision alone?
88. **Q88:** Have real assistive technologies and zoom states been tested?
89. **Q89:** Does inclusion feel native rather than appended?

## Performance and reliability — Q90–Q95

90. **Q90:** Does the artifact meet agreed LCP, INP, CLS, and JavaScript budgets?
91. **Q91:** Does beauty survive slow networks and mid-tier devices?
92. **Q92:** Are media and 3D deferred until they are needed?
93. **Q93:** Does the experience fail quietly and remain usable?
94. **Q94:** Are unattended, repeated, and long-duration states tested?
95. **Q95:** Is operational reliability visible through behavior rather than claimed in copy?

## Future proofing and governance — Q96–Q100

96. **Q96:** Is the idea tied to a durable human truth rather than a contemporary visual trend?
97. **Q97:** Does it extend the system instead of forking it?
98. **Q98:** Are new tokens, components, content types, and exceptions documented?
99. **Q99:** Can future teams understand why each non-obvious decision exists?
100. **Q100:** Will this still feel credible, calm, and necessary in 2035?

---

# PART 6 — One hundred failure conditions

A failure condition is evidence that approval cannot yet be granted. Conditions marked **BLOCKER** stop release immediately.

## Brand and truth — F01–F15

1. **F01 · BLOCKER:** XSMITHS is described as an event organiser or event management company.
2. **F02 · BLOCKER:** Agency partnership is undermined or XSMITHS appears to compete for event ownership.
3. **F03 · BLOCKER:** XSMITHS is presented as a fifth XSEDES division.
4. **F04 · BLOCKER:** Unverified clients, installations, outcomes, dates, or statistics are published.
5. **F05 · BLOCKER:** A target, pilot, render, or proposal is represented as completed proof.
6. **F06:** Product families, ventures, divisions, or service pillars use noncanonical names.
7. **F07:** PhotoShap is absorbed as an XSMITHS product family.
8. **F08:** Tagline or positioning contradicts the approved source.
9. **F09:** Multiple accent colours are introduced.
10. **F10:** Accent is used as decorative wash rather than signal.
11. **F11:** Hype language substitutes for evidence.
12. **F12:** Generic “AI-powered” language appears without real AI behavior.
13. **F13:** Parent XSEDES identity overwhelms XSMITHS emotional distinction.
14. **F14:** XSEDES affiliation disappears entirely.
15. **F15:** A short-term campaign creates a competing sub-brand system.

## Premise and originality — F16–F25

16. **F16:** The artifact exists only because competitors have one.
17. **F17:** A template determines the structure before the narrative is known.
18. **F18:** A reference is copied at surface level.
19. **F19:** Trend language is mistaken for creative direction.
20. **F20:** Novelty has no relationship to human participation.
21. **F21:** Technical complexity is used to justify a weak idea.
22. **F22:** The concept cannot be stated without describing visual style.
23. **F23:** The work contains no XSMITHS-specific principle.
24. **F24:** The same result could be achieved by replacing the logo.
25. **F25:** The artifact adds volume but no new understanding.

## Narrative — F26–F38

26. **F26:** The opening behaves as a billboard rather than threshold.
27. **F27:** Navigation exposes the whole inventory before curiosity forms.
28. **F28:** Mechanism is explained before effect is experienced.
29. **F29:** Multiple narrative stages compete in one section.
30. **F30:** The visitor is treated as audience rather than participant.
31. **F31:** The narrative has no emotional centre.
32. **F32:** Sections can be reordered without changing meaning.
33. **F33:** Transitions exist only as visual filler.
34. **F34:** The sequence ends without confidence, trust, or invitation.
35. **F35:** Copy explains what interaction should demonstrate.
36. **F36:** A case study starts with logo, awards, or vanity metrics rather than challenge/effect.
37. **F37:** Product storytelling begins with specifications.
38. **F38:** The visitor must understand internal organizational structure before understanding value.

## Layout, typography, and visual language — F39–F53

39. **F39:** Two focal points compete within one viewport.
40. **F40:** Long paragraphs are centred.
41. **F41:** Body text exceeds readable line length.
42. **F42:** Type scale does not communicate hierarchy without colour.
43. **F43:** Instrument Serif is used as body or decorative texture.
44. **F44:** Typography is animated for spectacle.
45. **F45:** Whitespace is filled because it “looks empty.”
46. **F46:** Spacing does not follow tokens.
47. **F47:** Drop shadows replace structure.
48. **F48:** Rounded SaaS cards appear without constitutional exception.
49. **F49:** Glassmorphism is used broadly.
50. **F50:** Hairlines or grids are decorative noise.
51. **F51:** Masonry or dashboard layout replaces the museum/gallery model.
52. **F52:** Photography depicts staged people pointing, posing, or celebrating technology.
53. **F53:** Generic AI brains, neural networks, holograms, or particle heads appear.

## Interaction and motion — F54–F69

54. **F54:** An interaction exists only to demonstrate that interaction is possible.
55. **F55:** Hover reveals essential information with no touch/keyboard equivalent.
56. **F56:** A control is visually hidden until after the user needs it.
57. **F57:** Feedback arrives too late to establish cause and effect.
58. **F58:** Auto-advancing carousels move without consent.
59. **F59:** Custom cursor trails distract from content.
60. **F60:** Scroll is hijacked or trapped.
61. **F61:** Bounce, spring, or elastic easing appears.
62. **F62:** Multiple animation systems control one element.
63. **F63:** Idle animation competes for attention.
64. **F64:** Motion lacks a reduced-motion equivalent.
65. **F65:** Reduced motion removes content or completion feedback.
66. **F66:** Motion triggers layout shift.
67. **F67:** Sound autoplays or functions as ambient decoration without consent.
68. **F68:** Navigation hides unpredictably.
69. **F69:** Interaction fails after repetition or long idle periods.

## Technology, accessibility, and performance — F70–F88

70. **F70:** 3D or video blocks the primary content.
71. **F71:** WebGL carries meaning unavailable elsewhere.
72. **F72:** No static fallback exists.
73. **F73:** Media continues when hidden or offscreen.
74. **F74:** Device pixel ratio or asset size is unbounded.
75. **F75:** Geometry, materials, textures, or observers leak after unmount.
76. **F76 · BLOCKER:** Primary tasks cannot be completed by keyboard.
77. **F77 · BLOCKER:** Focus is invisible or trapped incorrectly.
78. **F78 · BLOCKER:** Required contrast fails WCAG 2.2 AA.
79. **F79:** Meaning depends on colour alone.
80. **F80:** Captions, transcripts, labels, or descriptions are absent.
81. **F81:** Touch targets are below minimum size.
82. **F82:** Error states blame the user or provide no recovery.
83. **F83:** Loading causes layout shift or content reordering.
84. **F84:** Lighthouse or Web Vitals budget fails without approved rationale.
85. **F85:** Client JavaScript grows without budget review.
86. **F86:** The ideal demo path is tested but failure states are not.
87. **F87:** Personal data appears in analytics or logs.
88. **F88:** Security, privacy, or consent controls are hidden for aesthetic reasons.

## Governance and longevity — F89–F100

89. **F89:** Values are hardcoded instead of tokenized.
90. **F90:** Copy is duplicated across components.
91. **F91:** A new component duplicates an existing responsibility.
92. **F92:** A provider dependency leaks into domain/UI contracts.
93. **F93:** An exception is undocumented.
94. **F94:** No owner or review date exists.
95. **F95:** Placeholder content reaches release review.
96. **F96:** The artifact cannot be rolled back or degraded gracefully.
97. **F97:** Visual regression evidence is absent.
98. **F98:** Only one breakpoint or ideal environment is reviewed.
99. **F99:** The work depends on a current trend to communicate relevance.
100. **F100:** The team argues deadline or effort as a reason to lower standards.

---

# PART 7 — One hundred excellence indicators

An excellence indicator is observable evidence that the work exceeds compliance and advances the brand.

## Brand and meaning — E01–E15

1. **E01:** The artifact is recognizable as XSMITHS without a logo.
2. **E02:** Wonder and engineering feel inseparable.
3. **E03:** Agency audiences immediately describe XSMITHS as a partner.
4. **E04:** XSEDES affiliation creates confidence without dominating expression.
5. **E05:** Claims are modest, precise, and more credible because of restraint.
6. **E06:** Product/service naming is exact and effortless.
7. **E07:** The single accent marks the central signal and nothing else.
8. **E08:** The visitor understands that reliability is part of wonder.
9. **E09:** The work embodies “Technology should disappear. Emotion should remain.”
10. **E10:** Brand principles remain visible in failure and empty states.
11. **E11:** The artifact strengthens a reusable XSMITHS language.
12. **E12:** No decision depends on hype.
13. **E13:** The work feels international without becoming culturally anonymous.
14. **E14:** Parent and venture identities feel related but emotionally distinct.
15. **E15:** The central premise remains true across digital and physical media.

## Emotional and narrative quality — E16–E30

16. **E16:** Curiosity forms before the visitor reads a claim.
17. **E17:** The system visibly acknowledges human presence.
18. **E18:** Wonder emerges from a precise consequence.
19. **E19:** The experience contains a memorable pause.
20. **E20:** The emotional centre can be described in one sentence.
21. **E21:** The visitor becomes participant rather than spectator.
22. **E22:** Each room changes what the visitor is ready to understand next.
23. **E23:** Transitions feel inevitable.
24. **E24:** Effect and explanation are separated deliberately.
25. **E25:** Confidence grows through repeated reliable behavior.
26. **E26:** The ending resolves the opening.
27. **E27:** The visitor can retell the experience in first person.
28. **E28:** The story remains coherent without voiceover or explanatory copy.
29. **E29:** The invitation to act feels like continuation, not conversion.
30. **E30:** A week later, people remember the response rather than the interface.

## Originality and spatial design — E31–E45

31. **E31:** The idea feels new and retrospectively obvious.
32. **E32:** References are transformed into XSMITHS principles.
33. **E33:** The concept could not be produced by changing a template theme.
34. **E34:** Simplicity is the result of deep reduction.
35. **E35:** The work introduces one reusable creative rule.
36. **E36:** Threshold, corridor, gallery, installation, and exit are legible.
37. **E37:** Scale communicates importance before content is read.
38. **E38:** Full-bleed space is reserved for one meaningful moment.
39. **E39:** Navigation behaves as quiet wayfinding.
40. **E40:** The composition could translate into physical architecture.
41. **E41:** Negative space holds attention rather than merely surrounding content.
42. **E42:** Material references are felt through light and behavior, not texture overlays.
43. **E43:** Structure itself provides visual character.
44. **E44:** The experience avoids every named anti-pattern without feeling austere.
45. **E45:** The work teaches the next project how to be better.

## Typography and content — E46–E57

46. **E46:** Typography establishes spatial hierarchy instantly.
47. **E47:** Architectural type creates a threshold.
48. **E48:** Body text feels editorial, calm, and readable.
49. **E49:** Instrument Serif appears once and changes the emotional temperature.
50. **E50:** Section labels orient without demanding attention.
51. **E51:** Every line earns its place.
52. **E52:** Copy clarifies only what the experience cannot express.
53. **E53:** Technical language is precise without becoming inaccessible.
54. **E54:** Captions reveal context rather than describe the obvious.
55. **E55:** Product stories begin with human experience.
56. **E56:** Case-study proof is specific and verifiable.
57. **E57:** Content density changes deliberately across narrative stages.

## Interaction and motion — E58–E72

58. **E58:** Interaction starts from a real human signal.
59. **E59:** The system responds before asking.
60. **E60:** Feedback makes causality unmistakable.
61. **E61:** Controls remain calm, clear, and available.
62. **E62:** Repetition increases trust.
63. **E63:** Motion has perceptible weight.
64. **E64:** Motion begins gently and arrives decisively.
65. **E65:** Stillness is held with confidence.
66. **E66:** Choreography directs attention without becoming the subject.
67. **E67:** All motion systems share one timing language.
68. **E68:** Reduced motion feels authored rather than disabled.
69. **E69:** Keyboard, touch, and pointer interactions have equal dignity.
70. **E70:** Idle behavior respects attention.
71. **E71:** Sound communicates consequence and remains optional.
72. **E72:** Removing any remaining motion would reduce meaning.

## Photography, media, and technology — E73–E84

73. **E73:** Photography catches a person noticing rather than posing.
74. **E74:** Light appears motivated by the experience itself.
75. **E75:** Shadow describes space and attention.
76. **E76:** Video remains intelligible without sound.
77. **E77:** The poster frame is meaningful, not a loading compromise.
78. **E78:** 3D contributes something impossible in static media.
79. **E79:** The static fallback remains a complete experience.
80. **E80:** Technical diagrams arrive exactly when understanding requires them.
81. **E81:** AI is perceived through useful behavior rather than imagery.
82. **E82:** Complexity remains invisible without concealing agency or consent.
83. **E83:** The chosen medium survives actual venue/device conditions.
84. **E84:** Media enhances memory without dominating narrative.

## Accessibility, performance, and reliability — E85–E95

85. **E85:** Accessibility is evident in the system, not an added layer.
86. **E86:** Focus behavior reinforces spatial orientation.
87. **E87:** Screen-reader structure expresses the same hierarchy as visual layout.
88. **E88:** Zoom, high contrast, and reduced motion remain composed.
89. **E89:** Errors explain recovery calmly.
90. **E90:** The primary experience arrives quickly on ordinary devices.
91. **E91:** Media quality adapts without visible compromise.
92. **E92:** Animation and rendering pause when not useful.
93. **E93:** Failure degrades to a meaningful static state.
94. **E94:** Long-running and unattended states remain stable.
95. **E95:** Operational reliability makes the work feel more magical, not less.

## Longevity and governance — E96–E100

96. **E96:** The design is based on human attention, not platform fashion.
97. **E97:** New decisions extend documented tokens and patterns.
98. **E98:** Future teams can trace every exception to a reason.
99. **E99:** The artifact remains coherent across page, kiosk, deck, and installation.
100. **E100:** Real visitors remember and retell the central moment after time has passed.

---

# PART 8 — Acceptance criteria by artifact

## 8.1 Page or digital experience

Must:

- pass Gates 0–6;
- score Gold or higher for public launch;
- have one emotional centre;
- follow IA narrative sequence;
- include real responsive content;
- pass keyboard, screen reader, reduced-motion, and performance checks;
- contain no unverified proof;
- include fallback/error states;
- produce visual-regression evidence.

## 8.2 Component

Must:

- have a unique responsibility;
- use governed tokens;
- document purpose and prohibited use;
- include default, hover, focus, active, disabled, loading, error, and success states where relevant;
- expose semantic HTML;
- support keyboard and touch;
- include Storybook evidence when the component system is operational;
- avoid content ownership.

## 8.3 Motion

Must:

- state narrative purpose;
- identify motion owner;
- use approved easing/duration;
- preserve layout;
- stop when hidden;
- provide authored reduced-motion behavior;
- demonstrate target-device performance;
- remain compelling when paused.

## 8.4 3D scene or shader

Must:

- justify why static/video is insufficient;
- provide poster and semantic fallback;
- cap pixel ratio and asset budgets;
- adapt quality;
- pause when hidden;
- dispose resources;
- remain keyboard accessible if interactive;
- pass target-device frame-time testing.

## 8.5 Photography or video

Must:

- show real space, material, attention, or response;
- avoid staged technology celebration;
- follow negative-space and motivated-light rules;
- provide approved crops;
- include alt/caption/transcript/captions;
- avoid fabricated proof;
- remain legible in actual placement.

## 8.6 Proposal or presentation

Must:

- follow Threshold → Problem → Experience → Engineering → Operation → Conversation;
- use document typography system, not website typography;
- contain verified claims only;
- preserve partner-not-competitor;
- avoid feature dumping;
- include a clear owner and version;
- end with an invitation, not pressure.

## 8.7 Physical installation

Must:

- respond to real presence or participation;
- operate under venue constraints;
- include accessibility and non-digital participation paths;
- define idle, active, failure, reset, maintenance, and emergency states;
- survive repeated unattended use;
- document commissioning and X-Ops ownership;
- be tested at scale with representative people.

---

# PART 9 — Red flags

## 9.1 Corporate thinking

Symptoms:

- mission/value grids;
- leadership portraits before experience;
- procurement language as the front door;
- logo walls replacing proof.

Damage: It converts a venture about responsive space into an institution describing itself. Authority becomes distance.

## 9.2 Startup clichés

Symptoms:

- “move fast” urgency;
- oversized conversion CTAs;
- waitlists without purpose;
- launch-countdown language;
- novelty presented as maturity.

Damage: It communicates insecurity and short-term relevance. XSMITHS must feel already capable of standing behind a system for years.

## 9.3 SaaS design

Symptoms:

- rounded cards;
- dashboard grids;
- pill filters;
- gradient buttons;
- feature/pricing comparisons.

Damage: It frames experience engineering as software inventory rather than spatial craft.

## 9.4 Over-animation

Symptoms:

- constant movement;
- multiple reveal styles;
- cursor trails;
- parallax on every layer;
- looping ambient objects.

Damage: Motion loses meaning. A system that reacts to everything communicates that nothing matters.

## 9.5 Generic AI imagery

Symptoms:

- glowing brains;
- neural networks;
- holographic faces;
- particle heads;
- blue-purple digital fog.

Damage: It advertises a category instead of demonstrating useful intelligence. The technology becomes visible and the effect disappears.

## 9.6 Neon cyberpunk

Symptoms:

- multiple luminous colours;
- scanlines;
- glitch type;
- dystopian city imagery.

Damage: It turns the future into costume. XSMITHS treats responsive systems as calm operational reality.

## 9.7 Glassmorphism abuse

Symptoms:

- every surface frosted;
- stacked translucent cards;
- blur used as decoration.

Damage: It replaces material honesty with generic operating-system fashion and weakens structural hierarchy.

## 9.8 Empty storytelling

Symptoms:

- poetic fragments without consequence;
- scenes that do not change understanding;
- showreels without human participation;
- manifesto language disconnected from product behavior.

Damage: Atmosphere becomes avoidance. Wonder requires cause, not vagueness.

## 9.9 Feature overload

Symptoms:

- all product details on Home;
- competing CTAs;
- every interaction enabled at once;
- technical lists before experience.

Damage: The visitor receives inventory before desire and cannot identify one emotional centre.

## 9.10 Template thinking

Symptoms:

- hero/features/testimonials/pricing/FAQ sequence;
- interchangeable card patterns;
- page structure chosen before narrative.

Damage: It proves the artifact was assembled rather than engineered for its human purpose.

---

# PART 10 — Review cadence

## 10.1 Concept review

Evidence: premise, audience, intended memory, constitutional references, rejected alternatives.  
Output: right-to-exist decision.

## 10.2 Narrative review

Evidence: sequence of rooms/scenes, information hierarchy, interaction moments, exit.  
Output: approved narrative spine.

## 10.3 System review

Evidence: token/component/content mapping, responsive model, states.  
Output: confirmation that no parallel design system is being created.

## 10.4 Experience review

Evidence: live prototype, real content, motion, interaction, media.  
Output: weighted score and revision priorities.

## 10.5 Production review

Evidence: accessibility, performance, failure states, browser/device testing, security/privacy.  
Output: release gate decision.

## 10.6 Post-launch review

Evidence: memory testing, behavior, errors, Web Vitals, operational feedback.  
Output: final quality level and lessons added to governance.

---

# PART 11 — Review report template

## Artifact

- Name:
- Type:
- Owner:
- Version:
- Review date:
- Intended audience:
- Intended memory:
- Narrative stage:

## Gate status

- Gate 0 — Right to exist:
- Gate 1 — Constitutional integrity:
- Gate 2 — Narrative integrity:
- Gate 3 — System integrity:
- Gate 4 — Interaction and motion:
- Gate 5 — Inclusive and operational:
- Gate 6 — Release:
- Gate 7 — Memory validation:

## Score

- Brand integrity /12:
- Emotional impact /11:
- Creative originality /8:
- Narrative quality /10:
- Interaction quality /8:
- Motion quality /7:
- Architectural thinking /8:
- Typography /6:
- Whitespace and pacing /6:
- Technology disappearance /6:
- Accessibility /8:
- Performance and reliability /5:
- Future proofing /5:
- **Total /100:**
- **Level:**

## Findings

- Constitutional blockers:
- Failure conditions triggered:
- Excellence indicators observed:
- What must be removed:
- What must be resolved:
- What should be protected:
- Decision:
- Owner and due date:

---

# PART 12 — Review language

Review statements must be precise.

Prefer:

- “This interaction has no informational consequence; remove it.”
- “The mechanism appears before the experience. Reverse the sequence.”
- “The two focal points compete. Select one.”
- “This claim is unverified and blocks release.”
- “The reduced-motion state removes meaning; redesign it.”
- “This could belong to any agency. Identify the XSMITHS-specific premise.”
- “The work meets function but not memory. It remains Silver.”

Avoid:

- “I don’t like it.”
- “Make it pop.”
- “It feels off.”
- “Can we add more?”
- “The client likes it.”
- “It is good enough for now.”

Criticism addresses the artifact and its consequence, never the creator.

---

# Document control

| Version | Date | Change |
|---|---|---|
| 1.0 | 2026-07-21 | Initial quality and approval constitution |

**Review system revision trigger:** constitutional change, first verified public case study, first permanent installation review, or evidence that a current indicator does not predict visitor memory.

---

*End of XSMITHS Design Review System v1.0*

The reviewer’s task is not to approve work. It is to protect what XSMITHS may still become.
