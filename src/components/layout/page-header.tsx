import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/layout/section-heading";
import { Reveal } from "@/components/motion/reveal";

type PageHeaderProps = {
  eyebrow: string;
  /** The page's single <h1>. */
  title: React.ReactNode;
  description: React.ReactNode;
};

/** Standard intro block for inner pages. Renders the page's only <h1>. */
export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <header className="border-b border-border">
      <Container className="py-16 md:py-24">
        <Reveal immediate>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {description}
          </p>
        </Reveal>
      </Container>
    </header>
  );
}
