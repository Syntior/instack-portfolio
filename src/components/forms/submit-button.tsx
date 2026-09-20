import { Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

type SubmitButtonProps = {
  pending: boolean;
  idleLabel: string;
  pendingLabel?: string;
};

/** Submit button that disables itself and shows progress while sending. */
export function SubmitButton({
  pending,
  idleLabel,
  pendingLabel = "Sending…",
}: SubmitButtonProps) {
  return (
    <Button type="submit" size="lg" disabled={pending} aria-disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="animate-spin" aria-hidden="true" data-icon="inline-start" />
          {pendingLabel}
        </>
      ) : (
        <>
          {idleLabel}
          <Send aria-hidden="true" data-icon="inline-end" />
        </>
      )}
    </Button>
  );
}
