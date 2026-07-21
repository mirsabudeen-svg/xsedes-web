import type { MetadataRoute } from "next"
import { xsmithsSite } from "@/content/xsmiths"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${xsmithsSite.siteOrigin}/sitemap.xml`,
  }
}
