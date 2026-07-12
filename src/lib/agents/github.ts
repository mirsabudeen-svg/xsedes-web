// src/lib/agents/github.ts
// Minimal GitHub REST helper for the Content Manager agent.
// Creates a branch off main, commits updated content files, opens a PR.

const API = "https://api.github.com";

function headers() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error("GITHUB_TOKEN is not set");
  return {
    authorization: `Bearer ${token}`,
    accept: "application/vnd.github+json",
    "content-type": "application/json",
    "x-github-api-version": "2022-11-28",
  };
}

function repo(): string {
  const r = process.env.GITHUB_REPO;
  if (!r || !r.includes("/")) throw new Error("GITHUB_REPO must be owner/name");
  return r;
}

async function gh<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API}${path}`, { ...init, headers: headers() });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`GitHub ${res.status} on ${path}: ${detail.slice(0, 300)}`);
  }
  return (await res.json()) as T;
}

export async function getFile(path: string, ref = "main") {
  const data = await gh<{ content: string; sha: string; encoding: string }>(
    `/repos/${repo()}/contents/${encodeURIComponent(path)}?ref=${ref}`,
  );
  return {
    sha: data.sha,
    text: Buffer.from(data.content, "base64").toString("utf8"),
  };
}

export async function openContentPr(opts: {
  title: string;
  body: string;
  files: Array<{ path: string; content: string }>;
}): Promise<string> {
  const r = repo();

  // 1. base commit of main
  const mainRef = await gh<{ object: { sha: string } }>(
    `/repos/${r}/git/ref/heads/main`,
  );
  const baseSha = mainRef.object.sha;

  // 2. new branch
  const branch = `content-agent/${Date.now()}`;
  await gh(`/repos/${r}/git/refs`, {
    method: "POST",
    body: JSON.stringify({ ref: `refs/heads/${branch}`, sha: baseSha }),
  });

  // 3. commit each file to the branch (contents API updates one at a time)
  for (const file of opts.files) {
    let sha: string | undefined;
    try {
      sha = (await getFile(file.path, branch)).sha;
    } catch {
      sha = undefined; // file may be new — allowed only under src/content/
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

  // 4. open the PR
  const pr = await gh<{ html_url: string }>(`/repos/${r}/pulls`, {
    method: "POST",
    body: JSON.stringify({
      title: opts.title,
      body: `${opts.body}\n\n---\n_Opened automatically by the XSEDES Content Manager agent. Review before merging._`,
      head: branch,
      base: "main",
    }),
  });

  return pr.html_url;
}
