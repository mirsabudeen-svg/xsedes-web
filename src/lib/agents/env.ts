import { NextResponse } from "next/server";

/** Return names of required env vars that are unset or empty. */
export function missingEnv(names: readonly string[]): string[] {
  return names.filter((name) => {
    const value = process.env[name];
    return value === undefined || value.trim() === "";
  });
}

/** Clear 503 when agent routes are misconfigured. */
export function envUnavailable(missing: string[]) {
  return NextResponse.json(
    {
      error: `Service unavailable — missing environment variable(s): ${missing.join(", ")}`,
    },
    { status: 503 },
  );
}
