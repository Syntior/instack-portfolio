import { z } from "zod";

/**
 * Validation shared by the browser and the server. The client uses it for
 * instant feedback; the server runs the same schemas again and is the source
 * of truth, since anything sent from a browser can be forged.
 */

/** Name of the hidden honeypot input. Real visitors never see or fill it. */
export const HONEYPOT_FIELD = "hp_website";

export const interestAreas = [
  { value: "full-stack", label: "Full-Stack" },
  { value: "frontend", label: "Frontend" },
  { value: "backend", label: "Backend" },
  { value: "mobile", label: "Mobile" },
  { value: "qa", label: "QA" },
  { value: "ui-ux", label: "UI/UX" },
  { value: "devops", label: "DevOps" },
] as const;

const interestValues = interestAreas.map((area) => area.value) as [
  (typeof interestAreas)[number]["value"],
  ...(typeof interestAreas)[number]["value"][],
];

export function interestLabel(value: string): string {
  return interestAreas.find((area) => area.value === value)?.label ?? value;
}

/**
 * Accepts "octocat", "@octocat" or a pasted profile URL and returns the bare
 * username, so applicants do not trip over formatting.
 */
export function normalizeGithubUsername(input: string): string {
  return input
    .trim()
    .replace(/^https?:\/\/(www\.)?github\.com\//i, "")
    .replace(/^@/, "")
    .replace(/\/+$/, "");
}

// GitHub usernames: 1–39 chars, alphanumeric or single hyphens, and cannot
// start or end with a hyphen.
const GITHUB_USERNAME = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;

const name = z
  .string()
  .min(2, "Please enter your name.")
  .max(100, "Please keep your name under 100 characters.");

const email = z
  .email("Enter a valid email address.")
  .max(254, "That email address is too long.");

export const joinSchema = z.object({
  name,
  email,
  github: z
    .string()
    .transform(normalizeGithubUsername)
    .pipe(
      z
        .string()
        .regex(GITHUB_USERNAME, "Enter a valid GitHub username, for example octocat."),
    ),
  area: z.enum(interestValues, "Choose an area of interest."),
  motivation: z
    .string()
    .min(20, "Tell us a little more, at least 20 characters.")
    .max(1500, "Please keep this under 1,500 characters."),
});

export const contactSchema = z.object({
  name,
  email,
  subject: z.string().max(150, "Please keep the subject under 150 characters."),
  message: z
    .string()
    .min(10, "Please write a short message, at least 10 characters.")
    .max(3000, "Please keep your message under 3,000 characters."),
});

export type JoinInput = z.infer<typeof joinSchema>;
export type ContactInput = z.infer<typeof contactSchema>;

/** What a form action returns to `useActionState`. */
export type FormState = {
  status: "idle" | "success" | "error";
  /** Form-level message: a failure reason or the confirmation text. */
  message?: string;
  /** Per-field messages, keyed by field name. */
  fieldErrors?: Record<string, string>;
  /**
   * The values that were submitted. React resets uncontrolled inputs after a
   * form action, so these are fed back in as `defaultValue`s to keep what the
   * visitor typed when validation fails.
   */
  values?: Record<string, string>;
};

export const initialFormState: FormState = { status: "idle" };

/** Reads the named fields from FormData as trimmed strings. */
export function readFields<K extends string>(
  formData: FormData,
  keys: readonly K[],
): Record<K, string> {
  const out = {} as Record<K, string>;
  for (const key of keys) {
    const value = formData.get(key);
    out[key] = typeof value === "string" ? value.trim() : "";
  }
  return out;
}

/** Collapses zod's issues into one message per field (the first one wins). */
export function toFieldErrors(error: z.ZodError): Record<string, string> {
  const flat = z.flattenError(error).fieldErrors as Record<
    string,
    string[] | undefined
  >;
  const out: Record<string, string> = {};
  for (const [field, messages] of Object.entries(flat)) {
    if (messages && messages.length > 0) out[field] = messages[0];
  }
  return out;
}
