// scripts/agents/lib.mjs
// Shared plumbing for GitHub Actions admin agents. No Next.js imports.
// Skills/brands come from the generated bundle (run generate-skills first).

import { SKILLS, BRAND_OVERLAYS } from "./generated-skills.mjs";

const API_URL = "https://api.anthropic.com/v1/messages";
const MODEL = "claude-sonnet-4-6";
const GITHUB_API = "https://api.github.com";

export const BRANDS = [
  "xsedes",
  "photoshap",
  "velos",
  "konstrukt",
  "bobbs-kitchen",
  "deed",
];

export function isBrand(x) {
  return BRANDS.includes(x);
}

export function requireEnv(names) {
  const missing = names.filter((n) => {
    const v = process.env[n];
    return v === undefined || String(v).trim() === "";
  });
  if (missing.length) {
    throw new Error(`Missing environment variable(s): ${missing.join(", ")}`);
  }
}

export function loadSkill(name) {
  const text = SKILLS[name];
  if (!text) {
    throw new Error(`Unknown skill "${name}" — run scripts/generate-skills.mjs`);
  }
  return text;
}

export function loadBrandOverlay(brand) {
  const text = BRAND_OVERLAYS[brand];
  if (text) return text;
  return `# Brand overlay missing for "${brand}"\nOperate as XSEDES master brand. Do not invent ${brand}-specific claims; describe it only as a venture incubated inside XSEDES.`;
}

export async function runAgent({ skill, messages, maxTokens }) {
  requireEnv(["ANTHROPIC_API_KEY"]);
  const system = loadSkill(skill);
  return callAnthropic(system, messages, maxTokens ?? 1024);
}

export async function runBrandAgent({ skill, brand, messages, maxTokens }) {
  requireEnv(["ANTHROPIC_API_KEY"]);
  const system = `${loadSkill(skill)}\n\n---\n\n# ACTIVE BRAND OVERLAY\n\n${loadBrandOverlay(brand)}`;
  return callAnthropic(system, messages, maxTokens ?? 2048);
}

async function callAnthropic(system, messages, maxTokens) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: maxTokens,
      system,
      messages,
    }),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Anthropic API ${res.status}: ${detail.slice(0, 300)}`);
  }
  const data = await res.json();
  return data.content
    .filter((b) => b.type === "text" && typeof b.text === "string")
    .map((b) => b.text)
    .join("\n")
    .trim();
}

/** Strip optional markdown fences and parse JSON. Throws on failure. */
export function parseAgentJson(raw, label = "Agent") {
  const cleaned = raw.replace(/^```(json)?|```$/g, "").trim();
  try {
    return JSON.parse(cleaned);
  } catch {
    throw new Error(`${label} returned unparseable output — try rephrasing.`);
  }
}

function ghHeaders() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error("GITHUB_TOKEN is not set");
  return {
    authorization: `Bearer ${token}`,
    accept: "application/vnd.github+json",
    "content-type": "application/json",
    "x-github-api-version": "2022-11-28",
  };
}

function repo() {
  const r = process.env.GITHUB_REPO;
  if (!r || !r.includes("/")) throw new Error("GITHUB_REPO must be owner/name");
  return r;
}

async function gh(path, init) {
  const res = await fetch(`${GITHUB_API}${path}`, {
    ...init,
    headers: ghHeaders(),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`GitHub ${res.status} on ${path}: ${detail.slice(0, 300)}`);
  }
  return res.json();
}

export async function getFile(path, ref = "main") {
  const data = await gh(
    `/repos/${repo()}/contents/${encodeURIComponent(path)}?ref=${ref}`,
  );
  return {
    sha: data.sha,
    text: Buffer.from(data.content, "base64").toString("utf8"),
  };
}

export async function openContentPr({ title, body, files }) {
  const r = repo();
  const baseBranch = process.env.GITHUB_DEFAULT_BRANCH || "main";

  const mainRef = await gh(`/repos/${r}/git/ref/heads/${baseBranch}`);
  const baseSha = mainRef.object.sha;

  const branch = `content-agent/${Date.now()}`;
  await gh(`/repos/${r}/git/refs`, {
    method: "POST",
    body: JSON.stringify({ ref: `refs/heads/${branch}`, sha: baseSha }),
  });

  for (const file of files) {
    let sha;
    try {
      sha = (await getFile(file.path, branch)).sha;
    } catch {
      sha = undefined;
    }
    await gh(`/repos/${r}/contents/${encodeURIComponent(file.path)}`, {
      method: "PUT",
      body: JSON.stringify({
        message: `content: update ${file.path} (content agent)`,
        content: Buffer.from(file.content, "utf8").toString("base64"),
        branch,
        ...(sha ? { sha } : {}),
      }),
    });
  }

  const pr = await gh(`/repos/${r}/pulls`, {
    method: "POST",
    body: JSON.stringify({
      title,
      body: `${body}\n\n---\n_Opened automatically by the XSEDES Content Manager agent. Review before merging._`,
      head: branch,
      base: baseBranch,
    }),
  });

  return pr.html_url;
}

export function fail(message, code = 1) {
  console.error(message);
  process.exit(code);
}
