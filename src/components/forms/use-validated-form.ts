"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import type { z } from "zod";
import {
  initialFormState,
  toFieldErrors,
  type FormState,
} from "@/lib/validation";

type FormAction = (previous: FormState, formData: FormData) => Promise<FormState>;
type Errors = Record<string, string>;

function focusFirstInvalid(form: HTMLFormElement | null) {
  form?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
}

/**
 * Shared behavior for the Join and Contact forms.
 *
 * - Runs the same zod schema the server uses, so most mistakes are caught
 *   instantly. When it fails, the submit is cancelled and errors are shown.
 * - When it passes, the browser submits normally and the Server Action runs
 *   (and validates again, since that is the check that counts).
 * - Because `onSubmit` only cancels on failure, the form still works as a
 *   plain HTML form post if JavaScript has not loaded.
 * - Moves focus to the first invalid field so keyboard and screen-reader
 *   users land on what needs fixing.
 * - Clears a field's error as soon as the visitor edits that field.
 */
export function useValidatedForm(action: FormAction, schema: z.ZodType) {
  const [state, formAction, pending] = useActionState(action, initialFormState);
  const [clientErrors, setClientErrors] = useState<Errors | null>(null);
  const [edited, setEdited] = useState<ReadonlySet<string>>(new Set());
  const formRef = useRef<HTMLFormElement>(null);

  // Client-side errors win; otherwise show whatever the server reported.
  const rawErrors = clientErrors ?? state.fieldErrors ?? {};
  const errors: Errors = Object.fromEntries(
    Object.entries(rawErrors).filter(([field]) => !edited.has(field)),
  );

  useEffect(() => {
    if (clientErrors) focusFirstInvalid(formRef.current);
  }, [clientErrors]);

  useEffect(() => {
    if (state.status === "error" && state.fieldErrors) {
      focusFirstInvalid(formRef.current);
    }
  }, [state]);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    setEdited(new Set());

    const data = new FormData(event.currentTarget);
    const values: Record<string, string> = {};
    for (const [key, value] of data.entries()) {
      if (typeof value === "string") values[key] = value.trim();
    }

    const result = schema.safeParse(values);
    if (!result.success) {
      event.preventDefault();
      setClientErrors(toFieldErrors(result.error));
      return;
    }
    setClientErrors(null);
  }

  // Change events bubble up from the individual fields to the <form>.
  function onChange(event: React.FormEvent<HTMLFormElement>) {
    const target = event.target;
    if (
      !(
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement
      )
    ) {
      return;
    }
    const field = target.name;
    if (field && rawErrors[field]) {
      setEdited((previous) => new Set(previous).add(field));
    }
  }

  return { state, formAction, pending, formRef, errors, onSubmit, onChange };
}
