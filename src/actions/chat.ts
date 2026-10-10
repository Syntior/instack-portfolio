"use server";

import { checkSubmission } from "@/lib/form-guards";
import { sendNotification } from "@/lib/email";
import { contactMessageEmail } from "@/lib/email-templates";
import { site } from "@/lib/site";
import { contactSchema, readFields } from "@/lib/validation";

const FIELDS = ["name", "email", "subject", "message"] as const;

export type ChatLeadResult = { ok: true } | { ok: false; message: string };

/**
 * Server Action for the chat widget. The bot collects the same fields as the
 * contact form, so it reuses the contact schema, guards and email template.
 */
export async function sendChatLead(formData: FormData): Promise<ChatLeadResult> {
  const guard = await checkSubmission(formData, "chat");
  if (!guard.pass) {
    if (guard.reason === "honeypot") return { ok: true };
    const minutes = Math.max(1, Math.ceil(guard.retryAfterSeconds / 60));
    return {
      ok: false,
      message: `Too many messages from your connection. Please try again in about ${minutes} minute${minutes === 1 ? "" : "s"}.`,
    };
  }

  const parsed = contactSchema.safeParse(readFields(formData, FIELDS));
  if (!parsed.success) {
    return {
      ok: false,
      message: "Some details look incomplete. Please start the chat again.",
    };
  }

  const sent = await sendNotification(contactMessageEmail(parsed.data));
  if (!sent.ok) {
    return {
      ok: false,
      message: `I could not send that just now. Please try again in a few minutes, or email us at ${site.email}.`,
    };
  }

  return { ok: true };
}
