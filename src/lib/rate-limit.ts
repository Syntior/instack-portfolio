import "server-only";

/**
 * A small in-memory sliding-window rate limiter.
 *
 * This is deliberately simple and BEST-EFFORT: on serverless platforms such as
 * Vercel each instance keeps its own memory, so the limit is per instance, not
 * global. It stops casual repeat submissions and basic scripts. For stronger
 * protection, swap this for a shared store (for example Upstash Redis) behind
 * the same `rateLimit` signature.
 */

type Bucket = number[];

const buckets = new Map<string, Bucket>();

export function rateLimit(
  key: string,
  { limit, windowMs }: { limit: number; windowMs: number },
): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  const recent = (buckets.get(key) ?? []).filter((t) => now - t < windowMs);

  if (recent.length >= limit) {
    const retryAfterMs = windowMs - (now - recent[0]);
    buckets.set(key, recent);
    return { allowed: false, retryAfterSeconds: Math.ceil(retryAfterMs / 1000) };
  }

  recent.push(now);
  buckets.set(key, recent);

  // Opportunistic cleanup so the map cannot grow without bound.
  if (buckets.size > 5000) {
    for (const [k, times] of buckets) {
      if (times.every((t) => now - t >= windowMs)) buckets.delete(k);
    }
  }

  return { allowed: true, retryAfterSeconds: 0 };
}
