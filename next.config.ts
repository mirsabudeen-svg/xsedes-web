import type { NextConfig } from "next";
import path from "path";

const agentIncludes = ["agents/skills/**", "agents/brands/**"];

const nextConfig: NextConfig = {
  // Pin tracing to this app root (avoids picking up a parent lockfile).
  outputFileTracingRoot: path.join(__dirname),
  outputFileTracingIncludes: {
    "/api/concierge": agentIncludes,
    "/api/content-agent": agentIncludes,
    "/api/blog-agent": agentIncludes,
    "/api/seo-agent": agentIncludes,
    "/api/social-agent": agentIncludes,
  },
};

export default nextConfig;
