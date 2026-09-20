"use client";

import { submitJoinApplication } from "@/actions/join";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { NativeSelect } from "@/components/ui/native-select";
import { Field } from "@/components/forms/field";
import { FormError, FormSuccess } from "@/components/forms/form-status";
import { Honeypot } from "@/components/forms/honeypot";
import { SubmitButton } from "@/components/forms/submit-button";
import { useValidatedForm } from "@/components/forms/use-validated-form";
import { interestAreas, joinSchema } from "@/lib/validation";

/** The three steps after applying. No timelines or outcomes are promised. */
const nextSteps = [
  "We review your application.",
  "We share the Contributor Agreement so you can read through it.",
  "We assign your starting level, so you know exactly where to begin.",
];

export function JoinForm() {
  const { state, formAction, pending, formRef, errors, onSubmit, onChange } =
    useValidatedForm(submitJoinApplication, joinSchema);

  if (state.status === "success") {
    const firstName = state.values?.name?.split(" ")[0];
    return (
      <FormSuccess
        title={firstName ? `Thanks, ${firstName}. Your application is in.` : "Thanks. Your application is in."}
      >
        <p>
          {state.values?.email ? (
            <>
              We will write to you at{" "}
              <strong className="font-medium text-foreground">
                {state.values.email}
              </strong>
              . Here is what happens next:
            </>
          ) : (
            "Here is what happens next:"
          )}
        </p>
        <ol className="space-y-3">
          {nextSteps.map((step, index) => (
            <li key={step} className="flex gap-3">
              <span
                aria-hidden="true"
                className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border border-border font-mono text-xs text-primary"
              >
                {index + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
        <p className="text-sm">
          Applying does not guarantee a place, a role or payment. It is the
          first step in getting to know each other.
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
      aria-label="Contributor application"
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

      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          name="github"
          label="GitHub username"
          required
          hint="For example: octocat"
          error={errors.github}
        >
          {(control) => (
            <Input
              {...control}
              type="text"
              autoComplete="off"
              autoCapitalize="none"
              spellCheck={false}
              maxLength={100}
              defaultValue={values.github}
            />
          )}
        </Field>

        <Field
          name="area"
          label="Area of interest"
          required
          error={errors.area}
        >
          {(control) => (
            <NativeSelect {...control} defaultValue={values.area ?? ""}>
              <option value="" disabled>
                Select an area…
              </option>
              {interestAreas.map((area) => (
                <option key={area.value} value={area.value}>
                  {area.label}
                </option>
              ))}
            </NativeSelect>
          )}
        </Field>
      </div>

      <Field
        name="motivation"
        label="Why do you want to join?"
        required
        hint="A few sentences on what you want to learn and build."
        error={errors.motivation}
      >
        {(control) => (
          <Textarea
            {...control}
            rows={5}
            maxLength={1500}
            defaultValue={values.motivation}
          />
        )}
      </Field>

      <Honeypot />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
        <SubmitButton pending={pending} idleLabel="Submit application" />
        <p className="text-xs text-muted-foreground">
          Fields marked <span className="text-primary">*</span> are required.
        </p>
      </div>
    </form>
  );
}
