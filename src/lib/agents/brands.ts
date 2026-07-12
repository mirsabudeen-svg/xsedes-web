// src/lib/agents/brands.ts
// Multi-brand registry. Every agent can operate as XSEDES (master) or
// any sub-brand by composing: base skill + brand overlay from
// agents/brands/{brand}.md. Add a new venture = add one markdown file.

import { promises as fs } from "fs";
import path from "path";
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

const brandCache = new Map<string, string>();

export async function loadBrandOverlay(brand: Brand): Promise<string> {
  const cached = brandCache.get(brand);
  if (cached) return cached;
  const filePath = path.join(process.cwd(), "agents", "brands", `${brand}.md`);
  try {
    const text = await fs.readFile(filePath, "utf8");
    brandCache.set(brand, text);
    return text;
  } catch {
    // Brand overlay not written yet — fall back to master with a notice
    // so agents don't invent brand facts.
    return `# Brand overlay missing for "${brand}"\nOperate as XSEDES master brand. Do not invent ${brand}-specific claims; describe it only as a venture incubated inside XSEDES.`;
  }
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
  // Compose via a one-off system: reuse runAgent's plumbing by passing a
  // synthetic skill through messages is wrong — instead runAgent accepts
  // a skill name; so we inline a tiny variant here.
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
