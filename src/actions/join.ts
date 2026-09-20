"use server";

import { checkSubmission } from "@/lib/form-guards";
import { sendNotification } from "@/lib/email";
import { joinApplicationEmail } from "@/lib/email-templates";
import { site } from "@/lib/site";
import {
  joinSchema,
  readFields,
  toFieldErrors,
  type FormState,
} from "@/lib/validation";

const FIELDS = ["name", "email", "github", "area", "motivation"] as const;

/**
 * Server Action for the contributor application form.
 *
 * Order matters: cheap abuse checks first, then validation (the source of
 * truth, whatever the browser already checked), then the email.
 */
export async function submitJoinApplication(
  _previous: FormState,
  formData: FormData,
): Promise<FormState> {
  const values = readFields(formData, FIELDS);

  const guard = await checkSubmission(formData, "join");
  if (!guard.pass) {
    if (guard.reason === "honeypot") {
      // Look successful to the bot; send nothing.
      return {
        status: "success",
        values: { name: values.name, email: values.email },
      };
    }
    const minutes = Math.max(1, Math.ceil(guard.retryAfterSeconds / 60));
    return {
      status: "error",
      message: `Too many submissions from your connection. Please try again in about ${minutes} minute${minutes === 1 ? "" : "s"}.`,
      values,
    };
  }

  const parsed = joinSchema.safeParse(values);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please check the highlighted fields and try again.",
      fieldErrors: toFieldErrors(parsed.error),
      values,
    };
  }

  const sent = await sendNotification(joinApplicationEmail(parsed.data));
  if (!sent.ok) {
    return {
      status: "error",
      message: `We could not send your application just now. Please try again in a few minutes, or email us at ${site.email}.`,
      values,
    };
  }

  return {
    status: "success",
    values: { name: parsed.data.name, email: parsed.data.email },
  };
}
