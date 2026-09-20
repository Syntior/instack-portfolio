Project: InStackDev — a coding community transitioning into a software company.
Build a professional, modern portfolio/marketing website using Next.js (App Router) + TypeScript + Tailwind CSS, as a fullstack app.

TECH STACK
- Next.js 14+ (App Router, Server Components)
- TypeScript
- Tailwind CSS
- shadcn/ui for UI primitives
- Framer Motion for subtle animations
- MDX or a simple content collection for a future blog/updates section
- Resend (or Nodemailer) for contact/join form email delivery
- Deploy target: Vercel

BRAND & POSITIONING
- Name: InStackDev
- Tagline (use this, or propose 2-3 alternatives): "Turning contributors into a software company — one project at a time."
- Tone: professional but community-first — not corporate-stiff, not hobbyist-casual. Serious developers building real things together.
- Visual direction: dark-mode-first, developer-tool aesthetic (terminal/code accents used sparingly), clean typography, generous whitespace. Avoid generic stock-photo SaaS look and gradient-blob clichés.

SITEMAP
1. Home — hero (tagline + one-line vision), what InStackDev is (community → company), highlights of the growth path, featured projects preview, CTA to join.
2. About / Vision — the long-term vision: community starts with learning/mentorship, moves through real projects, into products and client work, eventually a structured software company. Show the growth model as a visual flow: Community → Projects → Products/Clients → Revenue → Company.
3. How It Works — the Developer Growth Levels as a 5-step path:
   - Level 1: Learner — Git, GitHub, coding standards, small tasks
   - Level 2: Contributor — independent features, PRs, code review, bug fixing, testing
   - Level 3: Production Contributor — production features, Docker, CI/CD, databases, deployment
   - Level 4: Core Developer — feature ownership, architecture, mentoring juniors
   - Level 5: Lead / Core Team — project ownership, technical leadership, future company leadership
   Also explain the Ownership Principle (contributors own modules/features, not just tickets) and the Project Selection Principle (every project is chosen because it teaches real skills AND could become a product or client solution).
4. Projects — portfolio grid of real/example projects (use clearly-marked placeholder cards if none exist yet), each with: name, one-line description, tech stack tags, status (Community Project / Client Project / Product), link to repo or case study.
5. Community — what contributors get (mentorship, real production exposure, Git/GitHub workflow, testing, CI/CD, portfolio-worthy experience), plus a short "What We Expect" section (professionalism, collaboration, ownership).
6. Join / Become a Contributor — an application form: Name, Email, GitHub username, Area of interest (Full-Stack / Frontend / Backend / Mobile / QA / UI-UX / DevOps), and a short "why do you want to join" field. On submit: send a notification email and show a confirmation message mentioning next steps (review of the Contributor Agreement, starting level assignment).
7. Contact — simple contact form + links to the GitHub org, email, and any social presence.

CONTENT RULES — IMPORTANT
- Do NOT publish specific revenue-split percentages, contributor pool weights, or any compensation figures — that material is internal-only. Where compensation comes up at all (e.g. an FAQ), keep it general: "Community phase is unpaid learning; paid opportunities open up as projects move into commercial phases" — no numbers.
- Do not promise guaranteed jobs, payment, or equity anywhere on the public site.
- Use plain, professional English throughout.

FUNCTIONAL REQUIREMENTS
- Fully responsive, accessible (semantic HTML, alt text, keyboard navigation)
- Dark mode default, with a light mode toggle
- SEO: metadata, Open Graph tags, sitemap.xml, robots.txt
- Contact and Join forms: client + server-side validation, submit via a Next.js API route or Server Action, email notification on submission
- Subtle entrance animations on scroll (Framer Motion) — tasteful, not excessive
- Optimized images (next/image) and fonts (next/font)
- GitHub org link (github.com/InStackDev) in header and footer

DESIGN DIRECTION
- Color palette: dark background, one strong accent color, high-contrast text
- Typography: clean sans-serif for body (e.g. Inter), optional monospace accent (e.g. JetBrains Mono) for labels/tags only
- Component style: card-based layout for Levels and Projects, timeline/step visual for the Growth Model

DELIVERABLE
A working Next.js app covering all pages above, clean component structure, clearly-marked placeholder content where real content isn't available yet, and a README explaining how to run and deploy it.