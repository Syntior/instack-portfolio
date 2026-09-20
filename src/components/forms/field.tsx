"use client";

import { useId } from "react";
import { Label } from "@/components/ui/label";

/** Props to spread onto the control (input, textarea, select) inside a Field. */
export type FieldControlProps = {
  id: string;
  name: string;
  required: boolean;
  "aria-invalid": true | undefined;
  "aria-describedby": string | undefined;
};

type FieldProps = {
  name: string;
  label: string;
  required?: boolean;
  /** Helper text shown under the control. */
  hint?: string;
  /** Validation message. Its presence marks the control invalid. */
  error?: string;
  children: (control: FieldControlProps) => React.ReactNode;
};

/**
 * Label + control + hint + error, wired together for assistive tech:
 * the label is bound with htmlFor, and hint/error are linked through
 * aria-describedby so they are read out when the control is focused.
 */
export function Field({
  name,
  label,
  required = false,
  hint,
  error,
  children,
}: FieldProps) {
  const uid = useId();
  const id = `${uid}-${name}`;
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {label}
        {required ? (
          <span aria-hidden="true" className="text-primary">
            *
          </span>
        ) : (
          <span className="font-normal text-muted-foreground">(optional)</span>
        )}
      </Label>

      {children({
        id,
        name,
        required,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": describedBy,
      })}

      {hint ? (
        <p id={hintId} className="text-xs text-muted-foreground">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="text-sm font-medium text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}
