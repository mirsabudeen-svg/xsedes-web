import { execSync } from "node:child_process"
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs"
import { join } from "node:path"

const base = process.env.LIGHTHOUSE_BASE ?? "http://localhost:3001"
const slugs = [
  "ai-human",
  "immersion",
  "interact",
  "connect",
  "play",
  "robotics",
  "sensorium",
  "stage",
  "spaces",
]

const pages = [
  { path: "/xsmiths", label: "Home" },
  { path: "/xsmiths/products", label: "Products" },
  ...slugs.map((slug) => ({
    path: `/xsmiths/products/${slug}`,
    label: `Products/${slug}`,
  })),
  { path: "/xsmiths/services", label: "Services" },
  { path: "/xsmiths/about", label: "About" },
  { path: "/xsmiths/contact", label: "Contact" },
]

const outDir = join(
  process.cwd(),
  process.env.LIGHTHOUSE_OUT ?? ".lighthouse-a11y",
)
mkdirSync(outDir, { recursive: true })

const results = []

for (const page of pages) {
  const url = `${base}${page.path}`
  const safe = page.path.replace(/\//g, "_").replace(/^_/, "")
  const outFile = join(outDir, `${safe}.json`)
  process.stdout.write(`Auditing ${page.label}... `)
  try {
    try {
      execSync(
        `npx --yes lighthouse "${url}" --quiet --chrome-flags="--headless --no-sandbox" --only-categories=accessibility --output=json --output-path="${outFile}"`,
        { stdio: "pipe", timeout: 120000 },
      )
    } catch {
      if (!existsSync(outFile)) throw new Error("Lighthouse produced no report")
    }
    const report = JSON.parse(readFileSync(outFile, "utf8"))
    const score = Math.round((report.categories?.accessibility?.score ?? 0) * 100)
    const refs = report.categories?.accessibility?.auditRefs ?? []
    const fails = refs
      .map((ref) => report.audits[ref.id])
      .filter((audit) => audit && audit.score !== null && audit.score < 1)
      .map((audit) => ({
        id: audit.id,
        title: audit.title,
        displayValue: audit.displayValue ?? "",
      }))
    results.push({ label: page.label, path: page.path, score, fails })
    console.log(score, fails.length ? fails.map((f) => f.id).join(", ") : "clean")
  } catch (err) {
    results.push({
      label: page.label,
      path: page.path,
      score: null,
      fails: [{ id: "RUN_ERROR", title: String(err.message ?? err) }],
    })
    console.log("FAILED")
  }
}

writeFileSync(join(outDir, "summary.json"), JSON.stringify(results, null, 2))
console.log("\n--- SUMMARY ---")
for (const r of results) {
  console.log(`${r.label} (${r.path}): ${r.score ?? "ERR"}`)
  for (const f of r.fails) {
    console.log(`  - ${f.id}: ${f.title}${f.displayValue ? ` (${f.displayValue})` : ""}`)
  }
}
