const base = "http://localhost:3001/xsmiths/contact"
const html = await fetch(base).then((r) => r.text())
const cssMatch = html.match(/href="(\/_next\/static\/[^"]+\.css)"/)
if (!cssMatch) {
  console.error("No CSS link found")
  process.exit(1)
}
const cssUrl = `http://localhost:3001${cssMatch[1]}`
const css = await fetch(cssUrl).then((r) => r.text())
console.log("CSS URL:", cssUrl)
console.log("Has .min-h-11:", css.includes(".min-h-11"))
console.log("Has min-height:2.75rem:", css.includes("min-height:2.75rem"))
