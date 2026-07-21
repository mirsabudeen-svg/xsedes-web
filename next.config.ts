import type { NextConfig } from "next";
import path from "path";
import createMDX from "@next/mdx";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

initOpenNextCloudflareForDev();

const nextConfig: NextConfig = {
  // Pin tracing to this app root (avoids picking up a parent lockfile).
  outputFileTracingRoot: path.join(__dirname),
  // MDX bodies are imported as components (journal, future knowledge base).
  pageExtensions: ["ts", "tsx", "mdx"],
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
