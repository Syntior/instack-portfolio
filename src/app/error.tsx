"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/layout/section-heading";

/**
 * Error boundary for everything under the root layout. `retry` (stable since
 * Next.js 16.3) re-fetches and re-renders the failed segment.
 */
export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="py-24 md:py-36">
      <Eyebrow>Something went wrong</Eyebrow>
      <h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
        We hit an unexpected error
      </h1>
      <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
        Sorry about that. You can try again, and if it keeps happening, please
        let us know through the contact page.
      </p>
      <div className="mt-9">
        <Button size="lg" onClick={() => retry()}>
          Try again
        </Button>
      </div>
    </Container>
  );
}
