// src/lib/agents/brands.ts
// Multi-brand registry. Every agent can operate as XSEDES (master) or
// any sub-brand by composing: base skill + brand overlay from the
// generated bundle. Add a new venture = add one markdown file + regenerate.

import { BRAND_OVERLAYS } from "./generated";
import { loadSkill, type ChatMessage } from "./anthropic";

export const BRANDS = [
  "xsedes",
  "photoshap",
  "velos",
  "konstrukt",
  "bobbs-kitchen",
  "deed",
] as const;
export type Brand = (typeof BRANDS)[number];

export function isBrand(x: string): x is Brand {
  return (BRANDS as readonly string[]).includes(x);
}

export async function loadBrandOverlay(brand: Brand): Promise<string> {
  const text = BRAND_OVERLAYS[brand as keyof typeof BRAND_OVERLAYS];
  if (text) return text;
  // Brand overlay not written yet — fall back to master with a notice
  // so agents don't invent brand facts.
  return `# Brand overlay missing for "${brand}"\nOperate as XSEDES master brand. Do not invent ${brand}-specific claims; describe it only as a venture incubated inside XSEDES.`;
}

/**
 * Run an agent skill in the voice/context of a specific brand.
 * The overlay is appended to the base skill, and overlays may tighten
 * but never loosen the master rules (stated in every overlay).
 */
export async function runBrandAgent(opts: {
  skill: string;
  brand: Brand;
  messages: ChatMessage[];
  maxTokens?: number;
}): Promise<string> {
  const [base, overlay] = await Promise.all([
    loadSkill(opts.skill),
    loadBrandOverlay(opts.brand),
  ]);
  return runComposed(`${base}\n\n---\n\n# ACTIVE BRAND OVERLAY\n\n${overlay}`, opts);
}

async function runComposed(
  system: string,
  opts: { messages: ChatMessage[]; maxTokens?: number },
): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY is not set");
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: opts.maxTokens ?? 2048,
      system,
      messages: opts.messages,
    }),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Anthropic API ${res.status}: ${detail.slice(0, 300)}`);
  }
  const data = (await res.json()) as {
    content: Array<{ type: string; text?: string }>;
  };
  return data.content
    .filter((b) => b.type === "text" && typeof b.text === "string")
    .map((b) => b.text)
    .join("\n")
    .trim();
}
