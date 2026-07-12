import type { NextConfig } from "next";
import path from "path";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

initOpenNextCloudflareForDev();

const nextConfig: NextConfig = {
  // Pin tracing to this app root (avoids picking up a parent lockfile).
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
