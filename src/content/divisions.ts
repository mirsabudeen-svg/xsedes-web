// Division copy extracted from agents/skills/site-concierge.md
// (Answer building blocks). Order is canonical and must not change.

export type Division = {
  id: "x-consult" | "x-lab" | "x-build" | "x-ops";
  name: "X-Consult" | "X-Lab" | "X-Build" | "X-Ops";
  functions: string;
  outcome: string;
};

export const divisions: readonly Division[] = [
  {
    id: "x-consult",
    name: "X-Consult",
    functions: "strategy, event-tech consulting, feasibility, solution architecture",
    outcome: "problems become executable plans",
  },
  {
    id: "x-lab",
    name: "X-Lab",
    functions: "product innovation, industrial design, AI research, rapid prototyping",
    outcome: "ideas become products",
  },
  {
    id: "x-build",
    name: "X-Build",
    functions:
      "mechanical/electronics/robotics engineering, fabrication, software, installation",
    outcome: "designs become real-world solutions",
  },
  {
    id: "x-ops",
    name: "X-Ops",
    functions:
      "technical operations, rentals, deployment, maintenance, monitoring, training",
    outcome: "technology performs reliably at scale",
  },
] as const;
