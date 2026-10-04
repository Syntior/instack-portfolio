import { CtaSection } from "@/components/sections/cta-section";
import { joinHref, site } from "@/lib/site";

type JoinCtaProps = {
  title?: string;
  description?: string;
};

/**
 * Closing call to action for the community pages. The primary button goes to
 * the join form on the Community page. Do not render this on the Community
 * page itself, where the form is already on screen.
 */
export function JoinCta({
  title = `Join ${site.community.name}.`,
  description = "Learn on real projects, get feedback from experienced developers, and build experience you can point to. Tell us about yourself and we will be in touch about next steps.",
}: JoinCtaProps) {
  return (
    <CtaSection
      eyebrow="Join the community"
      title={title}
      description={description}
      primary={{ href: joinHref, label: "Join community" }}
      secondary={{ href: "/community/how-it-works", label: "How it works" }}
    />
  );
}
