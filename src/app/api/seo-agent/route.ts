// src/app/api/seo-agent/route.ts
// Agent 5: SEO Optimizer — audits a page of the deployed site in a
// brand's context and returns a prioritised fix list. Report-only by
// design: apply "content-manager" fixes via the Content Manager agent,
// "developer" fixes via Cursor. Admin-only.
// POST { brand, path } → { status, report }

import { NextResponse } from "next/server";
import { runBrandAgent, isBrand } from "@/lib/agents/brands";
import { envUnavailable, missingEnv } from "@/lib/agents/env";

export const runtime = "nodejs";
export const maxDuration = 60;

function authorized(req: Request): boolean {
  const secret = process.env.ADMIN_SECRET;
  return !!secret && req.headers.get("authorization") === `Bearer ${secret}`;
}

/** Strip scripts/styles and compress the HTML we send for review. */
function distill(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<svg[\s\S]*?<\/svg>/gi, "<svg…/>")
    .replace(/\s+/g, " ")
    .slice(0, 60_000);
}

export async function POST(req: Request) {
  const missing = missingEnv(["ANTHROPIC_API_KEY", "ADMIN_SECRET", "SITE_URL"]);
  if (missing.length) return envUnavailable(missing);

  if (!authorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await req.json()) as { brand?: string; path?: string };
    const brand = (body.brand ?? "xsedes").toLowerCase().trim();
    const pagePath = (body.path ?? "/").trim();

    if (!isBrand(brand)) {
      return NextResponse.json({ error: `Unknown brand "${brand}".` }, { status: 400 });
    }
    if (!pagePath.startsWith("/") || pagePath.includes("..")) {
      return NextResponse.json({ error: "path must be a site-relative path like /ventures/velos" }, { status: 400 });
    }

    const base =
      process.env.SITE_URL ??
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null);
    if (!base) {
      return NextResponse.json(
        { error: "Set SITE_URL env var to your deployed site URL." },
        { status: 503 },
      );
    }

    const pageRes = await fetch(`${base}${pagePath}`, {
      headers: { "user-agent": "xsedes-seo-agent" },
    });
    if (!pageRes.ok) {
      return NextResponse.json(
        { error: `Could not fetch ${pagePath} (${pageRes.status}).` },
        { status: 502 },
      );
    }
    const html = distill(await pageRes.text());

    const raw = await runBrandAgent({
      skill: "seo-optimizer",
      brand,
      maxTokens: 4000,
      messages: [
        {
          role: "user",
          content: `Audit this page.\nURL path: ${pagePath}\nBrand context: ${brand}\n\nPAGE HTML (scripts/styles stripped):\n${html}`,
        },
      ],
    });

    let report: unknown;
    try {
      report = JSON.parse(raw.replace(/^```(json)?|```$/g, "").trim());
    } catch {
      return NextResponse.json(
        { status: "error", reason: "Optimizer returned unparseable output." },
        { status: 502 },
      );
    }

    return NextResponse.json({ status: "ok", brand, path: pagePath, report });
  } catch (err) {
    console.error("[seo-agent:error]", err);
    return NextResponse.json(
      { status: "error", reason: "SEO agent failed — check Vercel logs." },
      { status: 500 },
    );
  }
}
