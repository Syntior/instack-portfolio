import { BrainCircuit, ChartColumn, Sparkles, type LucideIcon } from "lucide-react";
import { serviceAnchor } from "@/data/company";

/**
 * Technologies the team works with. Each one gets its own page at
 * /technologies/<slug> and a link in the Technologies mega menu.
 *
 * Keep the copy factual: what the technology is and what we build with it.
 * No client names, headcounts or timelines unless they are real.
 */
export type Technology = {
  /** Short name used in menus and lists, e.g. "AWS". */
  name: string;
  /** Full name used in the page heading, e.g. "Amazon Web Services". */
  fullName?: string;
  category: string;
  summary: string;
  /** Three things we build with it, shown as a list on the page. */
  uses: [string, string, string];
  /**
   * Shown instead of a logo file when there is no official logo to use.
   * Otherwise the logo is `public/images/tech/<slug>.svg` (from Devicon, MIT).
   */
  icon?: LucideIcon;
};

export const technologies: Technology[] = [
  {
    name: ".NET",
    category: "Back-end framework",
    summary:
      "Microsoft's platform for fast, strongly typed web APIs, services and business applications.",
    uses: [
      "ASP.NET Core web APIs and back-end services",
      "Business applications and internal tools",
      "Modernising legacy .NET Framework systems",
    ],
  },
  {
    name: "AI",
    fullName: "Artificial Intelligence",
    icon: Sparkles,
    category: "AI and data",
    summary:
      "Practical AI features built into real products, using large language models and the data you already have.",
    uses: [
      "Assistants and chat over your own documents",
      "Automating repetitive text and data tasks",
      "Search, classification and recommendations",
    ],
  },
  {
    name: "Angular",
    category: "Front-end framework",
    summary:
      "Google's full-featured TypeScript framework for large, structured single-page applications.",
    uses: [
      "Enterprise dashboards and admin panels",
      "Complex forms and data-heavy interfaces",
      "Upgrades from AngularJS and older Angular versions",
    ],
  },
  {
    name: "AWS",
    fullName: "Amazon Web Services",
    category: "Cloud platform",
    summary:
      "The most widely used cloud platform, for hosting, storage, databases and serverless back ends.",
    uses: [
      "Cloud architecture and deployment",
      "Serverless back ends with Lambda and API Gateway",
      "Migrations from on-premise servers to AWS",
    ],
  },
  {
    name: "C#",
    category: "Programming language",
    summary:
      "A modern, strongly typed language for .NET services, desktop software and games.",
    uses: [
      "Back-end services and web APIs",
      "Windows desktop applications",
      "Integrations with Microsoft systems",
    ],
  },
  {
    name: "C++",
    category: "Programming language",
    summary:
      "A high-performance language for software where speed and control over hardware matter.",
    uses: [
      "Performance-critical modules and libraries",
      "Desktop and cross-platform applications",
      "Maintenance and modernisation of existing C++ code",
    ],
  },
  {
    name: "Django",
    category: "Back-end framework",
    summary:
      "Python's batteries-included web framework, built for secure, data-driven applications.",
    uses: [
      "Web applications with built-in admin",
      "REST APIs with Django REST Framework",
      "Data and reporting platforms",
    ],
  },
  {
    name: "Golang",
    fullName: "Go",
    category: "Programming language",
    summary:
      "Google's simple, fast language for network services, tooling and cloud infrastructure.",
    uses: [
      "High-throughput APIs and microservices",
      "Command-line tools and automation",
      "Cloud-native and container tooling",
    ],
  },
  {
    name: "Google Cloud",
    category: "Cloud platform",
    summary:
      "Google's cloud platform, strong in data, analytics, containers and machine learning.",
    uses: [
      "Cloud Run and GKE deployments",
      "BigQuery data pipelines and analytics",
      "Firebase back ends for web and mobile apps",
    ],
  },
  {
    name: "Java",
    category: "Programming language",
    summary:
      "A proven language for large, long-lived business systems and Android development.",
    uses: [
      "Spring Boot services and APIs",
      "Enterprise system integrations",
      "Modernising older Java applications",
    ],
  },
  {
    name: "JavaScript",
    category: "Programming language",
    summary:
      "The language of the web, running in every browser and, with Node.js, on the server.",
    uses: [
      "Interactive websites and web applications",
      "Full-stack apps with Node.js",
      "Browser extensions and widgets",
    ],
  },
  {
    name: "Kotlin",
    category: "Programming language",
    summary:
      "A modern, concise language and Google's recommended choice for Android apps.",
    uses: [
      "Native Android applications",
      "Kotlin back-end services",
      "Migrating Android apps from Java to Kotlin",
    ],
  },
  {
    name: "Machine Learning",
    icon: BrainCircuit,
    category: "AI and data",
    summary:
      "Models that learn from your data to predict, classify and spot patterns.",
    uses: [
      "Prediction and forecasting models",
      "Classification and anomaly detection",
      "Putting trained models into production",
    ],
  },
  {
    name: "Microsoft Azure",
    category: "Cloud platform",
    summary:
      "Microsoft's cloud platform, a natural fit for teams already using .NET and Microsoft 365.",
    uses: [
      "Azure App Service and Functions deployments",
      "Azure SQL and Cosmos DB data layers",
      "Identity and access with Microsoft Entra ID",
    ],
  },
  {
    name: "NestJS",
    category: "Back-end framework",
    summary:
      "A structured TypeScript framework for Node.js, built for APIs that stay maintainable as they grow.",
    uses: [
      "REST and GraphQL APIs with a clear module structure",
      "Microservices and background job processing",
      "Typed back ends shared with TypeScript front ends",
    ],
  },
  {
    name: "Next.js",
    category: "Front-end framework",
    summary:
      "The React framework for fast, search-friendly web applications, with server rendering built in.",
    uses: [
      "Marketing sites and web apps that rank and load fast",
      "Full-stack products with server components and API routes",
      "Dashboards and customer portals",
    ],
  },
  {
    name: "Node.js",
    category: "Back-end runtime",
    summary:
      "JavaScript on the server, well suited to fast APIs and real-time applications.",
    uses: [
      "REST and GraphQL APIs",
      "Real-time features with WebSockets",
      "Full-stack TypeScript applications",
    ],
  },
  {
    name: "PHP",
    category: "Programming language",
    summary:
      "The language behind a large share of the web, including WordPress and Laravel.",
    uses: [
      "Laravel web applications and APIs",
      "WordPress themes, plugins and sites",
      "Maintenance and upgrades of existing PHP code",
    ],
  },
  {
    name: "Power BI",
    icon: ChartColumn,
    category: "Business intelligence",
    summary:
      "Microsoft's business intelligence tool for interactive reports and dashboards.",
    uses: [
      "Reports and dashboards from your data",
      "Data models and connections to your sources",
      "Embedding reports into your own apps",
    ],
  },
  {
    name: "Python",
    category: "Programming language",
    summary:
      "A readable, versatile language for web back ends, automation, data and AI.",
    uses: [
      "Web back ends with Django and FastAPI",
      "Data processing and automation scripts",
      "AI and machine learning work",
    ],
  },
  {
    name: "React",
    category: "Front-end library",
    summary:
      "The most popular library for building fast, component-based user interfaces.",
    uses: [
      "Web applications with React and Next.js",
      "Design systems and component libraries",
      "Fast, accessible, responsive front ends",
    ],
  },
  {
    name: "Ruby",
    category: "Programming language",
    summary:
      "A productive language best known for Ruby on Rails and fast product development.",
    uses: [
      "Ruby on Rails web applications",
      "APIs and background job systems",
      "Upgrades of existing Rails apps",
    ],
  },
  {
    name: "Salesforce",
    category: "CRM platform",
    summary:
      "The leading CRM platform, customised and extended to fit how your team sells and serves.",
    uses: [
      "Salesforce customisation and automation",
      "Integrations with your other systems",
      "Custom apps on the Salesforce platform",
    ],
  },
  {
    name: "TypeScript",
    category: "Programming language",
    summary:
      "JavaScript with types, so large codebases stay safe to change. Our default for web work.",
    uses: [
      "Typed front ends and back ends",
      "Shared types across client and server",
      "Migrating JavaScript projects to TypeScript",
    ],
  },
  {
    name: "Vue.js",
    category: "Front-end framework",
    summary:
      "An approachable, flexible framework for interactive interfaces, from widgets to full apps.",
    uses: [
      "Single-page applications with Vue and Nuxt",
      "Adding interactivity to existing sites",
      "Upgrades from Vue 2 to Vue 3",
    ],
  },
  {
    name: "Xamarin",
    category: "Mobile framework",
    summary:
      "Microsoft's C# framework for cross-platform mobile apps, now succeeded by .NET MAUI.",
    uses: [
      "Maintenance of existing Xamarin apps",
      "Migrating Xamarin apps to .NET MAUI",
      "Cross-platform iOS and Android apps in C#",
    ],
  },
];

/** URL slug for a technology, e.g. "aws", "dot-net", "c-sharp". */
export function technologySlug(technology: Technology) {
  return serviceAnchor(technology.name);
}

export function getTechnology(slug: string) {
  return technologies.find((technology) => technologySlug(technology) === slug);
}
