import "server-only";
import { Resend } from "resend";

export type EmailMessage = {
  subject: string;
  text: string;
  html: string;
  /** Set to the visitor's address so "Reply" goes to them, not to us. */
  replyTo?: string;
};

export type SendResult =
  | { ok: true; delivered: boolean }
  | { ok: false; reason: "not-configured" | "send-failed" };

/**
 * Sends a notification email to the InStackDev team through Resend.
 *
 * Configuration (see `.env.example`):
 *   RESEND_API_KEY       Resend API key
 *   NOTIFICATION_TO      Comma-separated recipient(s) for submissions
 *   EMAIL_FROM           Verified sender, e.g. "InStackDev <noreply@yourdomain.com>"
 *   EMAIL_DRY_RUN=true   Log instead of sending (any environment)
 *
 * With no configuration, development logs the message to the terminal so the
 * forms are usable straight after cloning. Production does NOT do this: a
 * silently dropped application is worse than an error the visitor can see.
 */
export async function sendNotification(message: EmailMessage): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const recipients = (process.env.NOTIFICATION_TO ?? "")
    .split(",")
    .map((address) => address.trim())
    .filter(Boolean);
  // `||`, not `??`: a blank `EMAIL_FROM=` in .env is an empty string, which must
  // fall back to the default too.
  const from = process.env.EMAIL_FROM || "InStackDev <onboarding@resend.dev>";

  const configured = Boolean(apiKey) && recipients.length > 0;
  const dryRun =
    process.env.EMAIL_DRY_RUN === "true" ||
    (!configured && process.env.NODE_ENV !== "production");

  if (dryRun) {
    console.info(
      `[email:dry-run] ${message.subject}\n` +
        (message.replyTo ? `Reply-To: ${message.replyTo}\n` : "") +
        `\n${message.text}\n`,
    );
    return { ok: true, delivered: false };
  }

  if (!apiKey || recipients.length === 0) {
    console.error(
      "[email] RESEND_API_KEY and NOTIFICATION_TO must be set to deliver form submissions.",
    );
    return { ok: false, reason: "not-configured" };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: recipients,
      subject: message.subject,
      text: message.text,
      html: message.html,
      replyTo: message.replyTo,
    });

    if (error) {
      console.error("[email] Resend rejected the message:", error);
      return { ok: false, reason: "send-failed" };
    }
    return { ok: true, delivered: true };
  } catch (error) {
    console.error("[email] Failed to send:", error);
    return { ok: false, reason: "send-failed" };
  }
}
