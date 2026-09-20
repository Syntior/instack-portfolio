import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

type FeatureCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
};

/** Icon, title and one-line description. Used for benefits and expectations. */
export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <Card className="h-full gap-4 p-6">
      <span
        aria-hidden="true"
        className="grid size-10 place-items-center rounded-lg border border-border bg-muted text-primary"
      >
        <Icon className="size-5" />
      </span>
      <div>
        <h3 className="text-base font-semibold tracking-tight">{title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </Card>
  );
}
