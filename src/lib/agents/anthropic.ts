// src/lib/agents/anthropic.ts
// Shared helper: loads agent skills from agents/skills/*.md and calls
// the Anthropic Messages API. Keep ALL agent behavior in the skill
// files — this module is plumbing only.

import { promises as fs } from "fs";
import path from "path";

const API_URL = "https://api.anthropic.com/v1/messages";
const MODEL = "claude-sonnet-4-6";

export type ChatMessage = { role: "user" | "assistant"; content: string };

const skillCache = new Map<string, string>();

export async function loadSkill(name: string): Promise<string> {
  const cached = skillCache.get(name);
  if (cached) return cached;
  const filePath = path.join(process.cwd(), "agents", "skills", `${name}.md`);
  const text = await fs.readFile(filePath, "utf8");
  skillCache.set(name, text);
  return text;
}

export async function runAgent(opts: {
  skill: string;
  messages: ChatMessage[];
  maxTokens?: number;
}): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY is not set");

  const system = await loadSkill(opts.skill);

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: opts.maxTokens ?? 1024,
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
