"use server";

import { checkSubmission } from "@/lib/form-guards";
import { sendNotification } from "@/lib/email";
import { contactMessageEmail } from "@/lib/email-templates";
import { site } from "@/lib/site";
import {
  contactSchema,
  readFields,
  toFieldErrors,
  type FormState,
} from "@/lib/validation";

const FIELDS = ["name", "email", "subject", "message"] as const;

/** Server Action for the contact form. Same pipeline as the join form. */
export async function submitContactMessage(
  _previous: FormState,
  formData: FormData,
): Promise<FormState> {
  const values = readFields(formData, FIELDS);

  const guard = await checkSubmission(formData, "contact");
  if (!guard.pass) {
    if (guard.reason === "honeypot") {
      return {
        status: "success",
        values: { name: values.name, email: values.email },
      };
    }
    const minutes = Math.max(1, Math.ceil(guard.retryAfterSeconds / 60));
    return {
      status: "error",
      message: `Too many messages from your connection. Please try again in about ${minutes} minute${minutes === 1 ? "" : "s"}.`,
      values,
    };
  }

  const parsed = contactSchema.safeParse(values);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please check the highlighted fields and try again.",
      fieldErrors: toFieldErrors(parsed.error),
      values,
    };
  }

  const sent = await sendNotification(contactMessageEmail(parsed.data));
  if (!sent.ok) {
    return {
      status: "error",
      message: `We could not send your message just now. Please try again in a few minutes, or email us at ${site.email}.`,
      values,
    };
  }

  return {
    status: "success",
    values: { name: parsed.data.name, email: parsed.data.email },
  };
}
