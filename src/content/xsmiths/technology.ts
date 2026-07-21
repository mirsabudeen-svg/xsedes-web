// Technology — mechanism deep-dive (IA §8.10). Sits AFTER wonder in the
// journey; never the front door. Describes how systems are structured.
// No performance claims, no invented deployments.

export const technologyContent = {
  title: "How a space learns to respond",
  lede: "Every XSMITHS system — from a single talking installation to a whole responsive building — is engineered as four layers. The visitor only ever meets the last one.",
  layers: [
    {
      number: "01",
      name: "Sense",
      role: "The room notices",
      detail:
        "Presence, position, gesture, touch, and identity — captured by sensors engineered into the architecture, not bolted onto it. Cameras, depth sensors, NFC touchpoints, pressure surfaces, and microphones, selected for the venue and its privacy constraints.",
      families: ["interact", "connect"],
    },
    {
      number: "02",
      name: "Decide",
      role: "The system thinks",
      detail:
        "Software decides what happens next: AI models for conversation and recognition, show control logic for sequencing, and rules that keep behavior useful rather than novel. This is where an experience gets its judgment.",
      families: ["ai-human", "play"],
    },
    {
      number: "03",
      name: "Respond",
      role: "The space answers",
      detail:
        "Media surfaces, projection, lighting, sound, scent, kinetic elements, and robotics move with intent. The response layer is tuned so the visitor experiences a room that cared enough to answer — not a stack of output devices.",
      families: ["immersion", "sensorium", "stage", "robotics"],
    },
    {
      number: "04",
      name: "Operate",
      role: "The system endures",
      detail:
        "Commissioning, monitoring, remote support, and maintenance keep the experience running unattended, in public, for as long as the space needs it. Operation is designed in from the first day — not added after handover.",
      families: ["spaces"],
    },
  ],
  integrationTitle: "One system, one owner",
  integration:
    "The four layers are engineered together by one team, through the studio's method — strategy and design through X-Consult and X-Lab, engineering and fabrication through X-Build, operation through X-Ops. That is what prevents an interactive project from becoming a collection of vendors' parts.",
} as const
