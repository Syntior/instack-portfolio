"use client";

import { submitContactMessage } from "@/actions/contact";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field } from "@/components/forms/field";
import { FormError, FormSuccess } from "@/components/forms/form-status";
import { Honeypot } from "@/components/forms/honeypot";
import { SubmitButton } from "@/components/forms/submit-button";
import { useValidatedForm } from "@/components/forms/use-validated-form";
import { contactSchema } from "@/lib/validation";

export function ContactForm() {
  const { state, formAction, pending, formRef, errors, onSubmit, onChange } =
    useValidatedForm(submitContactMessage, contactSchema);

  if (state.status === "success") {
    const firstName = state.values?.name?.split(" ")[0];
    return (
      <FormSuccess
        title={firstName ? `Thanks, ${firstName}. Message sent.` : "Thanks. Message sent."}
      >
        <p>
          {state.values?.email ? (
            <>
              We will reply to{" "}
              <strong className="font-medium text-foreground">
                {state.values.email}
              </strong>{" "}
              as soon as we can.
            </>
          ) : (
            "We will reply as soon as we can."
          )}
        </p>
      </FormSuccess>
    );
  }

  const values = state.values ?? {};

  return (
    <form
      ref={formRef}
      action={formAction}
      onSubmit={onSubmit}
      onChange={onChange}
      noValidate
      aria-label="Contact form"
      className="relative space-y-6"
    >
      {state.status === "error" && state.message ? (
        <FormError message={state.message} />
      ) : null}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field name="name" label="Name" required error={errors.name}>
          {(control) => (
            <Input
              {...control}
              type="text"
              autoComplete="name"
              maxLength={100}
              defaultValue={values.name}
            />
          )}
        </Field>

        <Field name="email" label="Email" required error={errors.email}>
          {(control) => (
            <Input
              {...control}
              type="email"
              autoComplete="email"
              maxLength={254}
              defaultValue={values.email}
            />
          )}
        </Field>
      </div>

      <Field name="subject" label="Subject" error={errors.subject}>
        {(control) => (
          <Input
            {...control}
            type="text"
            maxLength={150}
            defaultValue={values.subject}
          />
        )}
      </Field>

      <Field name="message" label="Message" required error={errors.message}>
        {(control) => (
          <Textarea
            {...control}
            rows={6}
            maxLength={3000}
            defaultValue={values.message}
          />
        )}
      </Field>

      <Honeypot />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
        <SubmitButton pending={pending} idleLabel="Send message" />
        <p className="text-xs text-muted-foreground">
          Fields marked <span className="text-primary">*</span> are required.
        </p>
      </div>
    </form>
  );
}
