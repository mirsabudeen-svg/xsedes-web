// Five philosophy beliefs — verbatim from Brand Bible Philosophy.md.

export type PhilosophyBelief = {
  number: string
  line: string
  emphasis: string
  detail: string
  /** Journal essay for the long-form version of this belief (IA §8.2). */
  journalSlug?: string
}

export const philosophyBeliefs: readonly PhilosophyBelief[] = [
  {
    number: "01",
    line: "Technology should disappear.",
    emphasis: "disappear",
    detail:
      "The AI, the sensors, the show control system — none of it should be what a visitor notices. The moment someone is thinking about the machinery instead of the experience, the engineering has failed.",
    journalSlug: "technology-should-disappear",
  },
  {
    number: "02",
    line: "Emotion should remain.",
    emphasis: "remain",
    detail:
      "What a visitor remembers is a feeling, not a spec sheet. Every family in the product ecosystem is evaluated on the emotional response it produces — curiosity, delight, recognition, wonder — not on its technical novelty.",
  },
  {
    number: "03",
    line: "Experiences should think.",
    emphasis: "think",
    detail:
      "An interactive system should behave differently depending on who's in front of it and what they're doing, within the bounds of what's actually useful.",
  },
  {
    number: "04",
    line: "Spaces should respond.",
    emphasis: "respond",
    detail:
      "The ambition is for a whole space — walls, floors, lighting, sound — to behave as one responsive system, not a collection of independently interactive objects.",
  },
  {
    number: "05",
    line: "People should participate.",
    emphasis: "participate",
    detail:
      "The measure of a successful installation is not foot traffic past it, but engagement with it.",
    journalSlug: "participation-is-the-measure",
  },
] as const
