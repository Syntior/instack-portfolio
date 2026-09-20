import "server-only";
import { headers } from "next/headers";
import { rateLimit } from "@/lib/rate-limit";
import { HONEYPOT_FIELD } from "@/lib/validation";

export type GuardResult =
  | { pass: true }
  /** A bot filled the honeypot. Pretend it worked so it learns nothing. */
  | { pass: false; reason: "honeypot" }
  | { pass: false; reason: "rate-limited"; retryAfterSeconds: number };

async function clientAddress(): Promise<string> {
  const h = await headers();
  // On Vercel the first entry of x-forwarded-for is the client address.
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
}

/** Anti-abuse checks run before any validation or email work. */
export async function checkSubmission(
  formData: FormData,
  formName: string,
): Promise<GuardResult> {
  const trap = formData.get(HONEYPOT_FIELD);
  if (typeof trap === "string" && trap.trim() !== "") {
    return { pass: false, reason: "honeypot" };
  }

  const ip = await clientAddress();
  const { allowed, retryAfterSeconds } = rateLimit(`${formName}:${ip}`, {
    limit: 5,
    windowMs: 10 * 60 * 1000,
  });
  if (!allowed) return { pass: false, reason: "rate-limited", retryAfterSeconds };

  return { pass: true };
}
