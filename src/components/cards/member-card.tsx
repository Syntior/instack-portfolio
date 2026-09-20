import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { levels } from "@/data/levels";
import type { Member } from "@/data/members";

/** "Ada Lovelace" → "AL". Used when a member has no photo yet. */
function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

export function MemberCard({ member }: { member: Member }) {
  const level = levels.find((item) => item.level === member.level);

  return (
    <figure className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card">
      <div className="relative aspect-[4/5] w-full bg-muted">
        {member.photo ? (
          <Image
            src={member.photo}
            alt={member.photoAlt ?? `Photo of ${member.name}`}
            fill
            sizes="(min-width: 1024px) 264px, (min-width: 768px) 33vw, 50vw"
            className="object-cover"
          />
        ) : (
          <span
            aria-hidden="true"
            className="absolute inset-0 grid place-items-center font-mono text-3xl text-muted-foreground"
          >
            {initials(member.name)}
          </span>
        )}
      </div>

      <figcaption className="flex flex-1 flex-col gap-1 p-4">
        <span className="font-semibold tracking-tight">{member.name}</span>
        <span className="font-mono text-xs tracking-wide text-muted-foreground uppercase">
          {level?.name} · {member.area}
        </span>
        {member.github ? (
          <a
            href={`https://github.com/${member.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex w-fit items-center gap-1 rounded-sm font-mono text-xs text-primary underline-offset-4 hover:underline"
          >
            @{member.github}
            <ArrowUpRight className="size-3" aria-hidden="true" />
            <span className="sr-only"> (GitHub profile, opens in a new tab)</span>
          </a>
        ) : null}
      </figcaption>
    </figure>
  );
}
