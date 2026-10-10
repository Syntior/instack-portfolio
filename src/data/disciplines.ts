import {
  AppWindow,
  CheckCheck,
  DatabaseZap,
  LayoutTemplate,
  Smartphone,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

/**
 * The disciplines shown as cards on the home page. Tags whose name matches a
 * technology in `data/technologies.ts` link to that technology's page.
 */
export type Discipline = {
  title: string;
  description: string;
  icon: LucideIcon;
  /** Background of the icon tile. A strong colour; the icon is white on it. */
  color: string;
  tags: string[];
};

export const disciplines: Discipline[] = [
  {
    title: "Front-end development",
    description:
      "Fast, accessible interfaces that work on every screen, built with modern frameworks.",
    icon: AppWindow,
    color: "#ea580c",
    tags: ["React", "Next.js", "TypeScript", "JavaScript", "Angular", "Vue.js"],
  },
  {
    title: "Back-end development",
    description:
      "APIs, databases and integrations that stay secure and reliable as your traffic grows.",
    icon: DatabaseZap,
    color: "#1f2937",
    tags: ["Node.js", "NestJS", "Python", ".NET", "Java", "Golang", "PHP"],
  },
  {
    title: "AI and machine learning",
    description:
      "AI features that hold up in production, from LLM assistants to data pipelines.",
    icon: Sparkles,
    color: "#1e3a8a",
    tags: ["AI", "Machine Learning", "Python", "LLMs"],
  },
  {
    title: "Mobile development",
    description:
      "iOS and Android apps with smooth performance, stable sessions and secure data handling.",
    icon: Smartphone,
    color: "#1d4ed8",
    tags: ["Kotlin", "Xamarin", "iOS", "Android"],
  },
  {
    title: "UX/UI design",
    description:
      "Clear user flows, reusable components and accessible layouts, designed before we build.",
    icon: LayoutTemplate,
    color: "#0f766e",
    tags: ["UX design", "UI design", "Design systems"],
  },
  {
    title: "QA and testing",
    description:
      "Manual and automated tests that check the core flows end to end before every release.",
    icon: CheckCheck,
    color: "#15803d",
    tags: ["Automated testing", "CI/CD", "Quality assurance"],
  },
];
