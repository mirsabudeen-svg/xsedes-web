import type { MetadataRoute } from "next"
import {
  getPublishedCaseStudies,
  industryLenses,
  journalEntries,
  productFamilies,
  xsmithsSite,
} from "@/content/xsmiths"

const ORIGIN = xsmithsSite.siteOrigin

/** Parent XSEDES marketing routes. */
const parentPaths = [
  "/",
  "/about",
  "/work",
  "/brands",
  "/careers",
  "/contact",
  "/divisions/x-consult",
  "/divisions/x-lab",
  "/divisions/x-build",
  "/divisions/x-ops",
  "/photoshap",
  "/velos",
  "/konstrukt",
  "/bobbs-kitchen",
  "/deed",
]

/** XSMITHS static rooms. Projects appears only via verified entries below. */
const xsmithsPaths = [
  "/xsmiths",
  "/xsmiths/about",
  "/xsmiths/products",
  "/xsmiths/services",
  "/xsmiths/industries",
  "/xsmiths/technology",
  "/xsmiths/studio",
  "/xsmiths/journal",
  "/xsmiths/contact",
]

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [
    ...parentPaths.map((path) => ({ url: `${ORIGIN}${path}` })),
    ...xsmithsPaths.map((path) => ({ url: `${ORIGIN}${path}` })),
    ...productFamilies.map((family) => ({
      url: `${ORIGIN}/xsmiths/products/${family.slug}`,
    })),
    ...industryLenses.map((lens) => ({
      url: `${ORIGIN}/xsmiths/industries/${lens.slug}`,
    })),
    ...journalEntries.map((entry) => ({
      url: `${ORIGIN}/xsmiths/journal/${entry.slug}`,
      lastModified: entry.publishedAt,
    })),
    ...getPublishedCaseStudies().map((study) => ({
      url: `${ORIGIN}/xsmiths/projects/${study.slug}`,
    })),
  ]
  return entries
}
