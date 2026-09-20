import {
  BriefcaseBusiness,
  FlaskConical,
  GitPullRequest,
  Handshake,
  Rocket,
  ShieldCheck,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";

export type Benefit = {
  title: string;
  description: string;
  icon: LucideIcon;
};

/** What contributors get. Experience and learning only, never promises of pay. */
export const benefits: Benefit[] = [
  {
    title: "Mentorship",
    description:
      "Learn from more experienced developers who review your work and help you grow.",
    icon: Users,
  },
  {
    title: "Real production exposure",
    description:
      "Work on software built to production standards, not tutorial exercises.",
    icon: Rocket,
  },
  {
    title: "Git and GitHub workflow",
    description:
      "Branches, pull requests and reviews: the workflow professional teams use every day.",
    icon: GitPullRequest,
  },
  {
    title: "Testing",
    description:
      "Learn to write and maintain the tests that keep real projects reliable.",
    icon: FlaskConical,
  },
  {
    title: "CI/CD",
    description:
      "Automated checks and deployments become part of your everyday routine.",
    icon: Workflow,
  },
  {
    title: "Portfolio-worthy experience",
    description:
      "A public record of real contributions that you can point to and explain.",
    icon: BriefcaseBusiness,
  },
];

export type Expectation = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const expectations: Expectation[] = [
  {
    title: "Professionalism",
    description:
      "Communicate clearly, keep your commitments, and treat everyone with respect.",
    icon: ShieldCheck,
  },
  {
    title: "Collaboration",
    description:
      "Share what you know, review each other's work, and ask for help early.",
    icon: Handshake,
  },
  {
    title: "Ownership",
    description:
      "Take responsibility for your modules and features, and see them through.",
    icon: Users,
  },
];
