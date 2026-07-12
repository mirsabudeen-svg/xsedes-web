// src/app/api/concierge/route.ts
// Agent 1: Site Concierge — answers visitor questions on the website.
// POST { messages: [{role, content}, ...] } → { reply: string }

import { NextResponse } from "next/server";
import { runAgent, type ChatMessage } from "@/lib/agents/anthropic";
import { envUnavailable, missingEnv } from "@/lib/agents/env";

export const runtime = "nodejs";
export const maxDuration = 30;

const MAX_TURNS = 20; // keep context bounded
const MAX_CHARS = 2000; // per user message

// Naive in-memory rate limit (per serverless instance) — good enough to
// blunt abuse on a marketing site; upgrade to Upstash/KV for production
// scale.
const hits = new Map<string, { n: number; t: number }>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const rec = hits.get(ip);
  if (!rec || now - rec.t > 60_000) {
    hits.set(ip, { n: 1, t: now });
    return false;
  }
  rec.n += 1;
  return rec.n > 15; // 15 messages / minute / IP
}

export async function POST(req: Request) {
  const missing = missingEnv(["ANTHROPIC_API_KEY"]);
  if (missing.length) return envUnavailable(missing);

  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
    if (rateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many messages — please slow down." },
        { status: 429 },
      );
    }

    const body = (await req.json()) as { messages?: ChatMessage[] };
    const incoming = Array.isArray(body.messages) ? body.messages : [];

    const messages: ChatMessage[] = incoming
      .filter(
        (m) =>
          (m.role === "user" || m.role === "assistant") &&
          typeof m.content === "string" &&
          m.content.trim().length > 0,
      )
      .slice(-MAX_TURNS)
      .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }));

    if (messages.length === 0 || messages[messages.length - 1].role !== "user") {
      return NextResponse.json({ error: "No user message." }, { status: 400 });
    }

    const reply = await runAgent({
      skill: "site-concierge",
      messages,
      maxTokens: 600,
    });

    // Lightweight lead logging: if the exchange looks like a lead,
    // surface it in Workers logs. Extend to email/WhatsApp/CRM later.
    const lastUser = messages[messages.length - 1].content.toLowerCase();
    if (/@|\bphone\b|\bwhatsapp\b|\bcontact\b|\bpartner\b/.test(lastUser)) {
      console.log("[concierge:lead]", JSON.stringify(messages.slice(-4)));
    }

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("[concierge:error]", err);
    return NextResponse.json(
      { error: "The concierge is briefly offline — please use the contact link." },
      { status: 500 },
    );
  }
}
