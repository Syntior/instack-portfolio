"use client";

import { useEffect, useRef } from "react";
import { CircleAlert, CircleCheck } from "lucide-react";

/** Form-level error banner. `role="alert"` makes screen readers announce it. */
export function FormError({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="flex items-start gap-3 rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm"
    >
      <CircleAlert
        className="mt-0.5 size-4 shrink-0 text-destructive"
        aria-hidden="true"
      />
      <p>{message}</p>
    </div>
  );
}

type FormSuccessProps = {
  title: string;
  children: React.ReactNode;
};

/**
 * Confirmation panel shown in place of a form after a successful submit.
 * Focus moves to its heading so keyboard and screen-reader users land on the
 * confirmation instead of on a button that has just disappeared.
 */
export function FormSuccess({ title, children }: FormSuccessProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
      <CircleCheck className="size-8 text-primary" aria-hidden="true" />
      <h2
        ref={headingRef}
        tabIndex={-1}
        className="mt-4 text-2xl font-semibold tracking-tight outline-none"
      >
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-muted-foreground">{children}</div>
    </div>
  );
}
