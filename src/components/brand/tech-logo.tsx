import Image from "next/image";
import { cn } from "@/lib/utils";
import { technologySlug, type Technology } from "@/data/technologies";

/**
 * A technology's logo: the official mark from `public/images/tech/<slug>.svg`
 * (Devicon, MIT licence), or a neutral icon for entries without one (AI,
 * Machine Learning, Power BI). Decorative, since the name is always shown
 * next to it. Size it with `className`, e.g. `size-6`.
 */
export function TechLogo({
  technology,
  className,
}: {
  technology: Technology;
  className?: string;
}) {
  const Icon = technology.icon;

  if (Icon) {
    return (
      <span
        aria-hidden="true"
        className={cn(
          "inline-flex shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary",
          className,
        )}
      >
        <Icon className="size-[65%]" />
      </span>
    );
  }

  return (
    <Image
      src={`/images/tech/${technologySlug(technology)}.svg`}
      alt=""
      width={64}
      height={64}
      unoptimized
      className={cn("shrink-0 object-contain", className)}
    />
  );
}
