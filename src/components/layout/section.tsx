import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";

type SectionProps = React.ComponentProps<"section"> & {
  /** Adds a hairline divider above the section. */
  bordered?: boolean;
};

/** A vertically padded page section. Give it `aria-labelledby` when it has a heading. */
export function Section({
  className,
  children,
  bordered = false,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        "py-16 md:py-24",
        bordered && "border-t border-border",
        className,
      )}
      {...props}
    >
      <Container>{children}</Container>
    </section>
  );
}
