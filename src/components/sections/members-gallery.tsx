import { UserRound } from "lucide-react";
import { MemberCard } from "@/components/cards/member-card";
import { Reveal } from "@/components/motion/reveal";
import type { Member } from "@/data/members";

/**
 * Photo grid of community members. With no members yet it shows clearly marked
 * placeholder tiles (no invented people), and switches to real cards as soon as
 * `members` in src/data/members.ts has entries.
 */
export function MembersGallery({ members }: { members: Member[] }) {
  if (members.length === 0) return <PlaceholderGallery />;

  return (
    <ul
      role="list"
      className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4"
    >
      {members.map((member, index) => (
        <li key={member.name}>
          <Reveal delay={(index % 4) * 0.06} className="h-full">
            <MemberCard member={member} />
          </Reveal>
        </li>
      ))}
    </ul>
  );
}

function PlaceholderGallery() {
  return (
    <div className="mt-12">
      {/* Decorative stand-ins; the sentence below explains them. */}
      <ul
        aria-hidden="true"
        className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4"
      >
        {Array.from({ length: 4 }, (_, index) => (
          <li key={index}>
            <Reveal delay={index * 0.06} className="h-full">
              <div className="overflow-hidden rounded-xl border border-dashed border-border">
                <div className="grid aspect-[4/5] w-full place-items-center bg-[repeating-linear-gradient(135deg,transparent_0_10px,color-mix(in_oklab,var(--foreground)_5%,transparent)_10px_11px)] text-muted-foreground">
                  <UserRound className="size-10 opacity-60" />
                </div>
                <div className="space-y-2 border-t border-dashed border-border p-4">
                  <div className="h-3 w-2/3 rounded-full bg-muted" />
                  <div className="h-2.5 w-1/2 rounded-full bg-muted" />
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>

      <p className="mt-6 max-w-2xl rounded-lg border border-dashed border-border p-4 text-sm leading-relaxed text-muted-foreground">
        <span className="font-medium text-foreground">Placeholder:</span> photos
        of community members will appear here.
      </p>
    </div>
  );
}
