import type { PortfolioData } from "@/types/portfolio";

/**
 * Language-neutral portfolio structure (ids, urls, icons, ordering, flags).
 * Translatable text is keyed by these ids in `messages/en.json` & `messages/vi.json`.
 */
export const portfolioData: PortfolioData = {
  personal: {
    name: "Don Nguyen",
    email: "alex.rivera@example.com",
    avatarUrl: "/avatar-3d.png",
    aboutAvatarUrl: "/about-frame.png",
    socialLinks: {
      github: "https://github.com/alexrivera",
      linkedin: "https://linkedin.com/in/alexrivera",
      twitter: "https://twitter.com/alexrivera",
    },
  },
  navigation: [
    { href: "#about" },
    { href: "#projects" },
    { href: "#experience" },
    { href: "#skills" },
    { href: "#contact" },
  ],
  projects: [
    {
      id: "proj-01",
      slug: "component-library",
      tags: ["React", "TypeScript", "Storybook", "Tailwind", "a11y"],
      featured: true,
      liveUrl: "https://example.com/nova",
      repoUrl: "https://github.com/alexrivera/nova-ds",
      image: "/projects/nova-ds.jpg",
    },
    {
      id: "proj-02",
      slug: "analytics-dashboard",
      tags: ["Next.js", "React", "TanStack Query", "Recharts"],
      featured: true,
      liveUrl: "https://example.com/pulse",
      repoUrl: "https://github.com/alexrivera/pulse-analytics",
      image: "/projects/pulse.jpg",
    },
    {
      id: "proj-03",
      slug: "marketing-site",
      tags: ["Next.js", "TypeScript", "Tailwind", "SEO"],
      featured: true,
      liveUrl: "https://example.com/commerce",
      repoUrl: "https://github.com/alexrivera/commerce-edge",
      image: "/projects/commerce.jpg",
    },
    {
      id: "proj-06",
      slug: "lumen-markets",
      tags: ["Next.js", "TypeScript", "Multi-tenant", "Stripe", "Tailwind"],
      featured: true,
      liveUrl: "https://example.com/lumen",
      repoUrl: "https://github.com/alexrivera/lumen-markets",
      image: "/projects/lumen.jpg",
    },
    {
      id: "proj-04",
      slug: "task-board",
      tags: ["React", "TypeScript", "Zustand", "Framer Motion"],
      featured: false,
      liveUrl: "https://example.com/flowboard",
      repoUrl: "https://github.com/alexrivera/flowboard",
      image: "/projects/flowboard.jpg",
    },
    {
      id: "proj-05",
      slug: "docs-site",
      tags: ["Next.js", "MDX", "Search", "TypeScript"],
      featured: false,
      liveUrl: "https://example.com/aperture",
      repoUrl: "https://github.com/alexrivera/aperture-docs",
      image: "/projects/aperture.jpg",
    },
  ],
  experience: [
    {
      id: "exp-01",
      company: "Northwind Labs",
      startDate: "2023-06",
      endDate: "Present",
      techStack: ["Next.js", "React", "TypeScript", "Tailwind", "TanStack Query"],
    },
    {
      id: "exp-02",
      company: "Brightline Media",
      startDate: "2021-08",
      endDate: "2023-05",
      techStack: ["React", "TypeScript", "Next.js", "CSS Modules", "Jest"],
    },
  ],
  skills: [
    {
      id: "languages",
      skills: [
        { name: "TypeScript", level: 5, iconName: "FileCode2" },
        { name: "React", level: 5, iconName: "Atom" },
        { name: "Next.js", level: 5, iconName: "Globe" },
        { name: "JavaScript", level: 5, iconName: "Braces" },
        { name: "HTML / CSS", level: 5, iconName: "Layout" },
      ],
    },
    {
      id: "ui",
      skills: [
        { name: "Tailwind CSS", level: 5, iconName: "Palette" },
        { name: "Design Tokens", level: 4, iconName: "SwatchBook" },
        { name: "Storybook", level: 4, iconName: "BookOpen" },
        { name: "Framer Motion", level: 4, iconName: "Sparkles" },
        { name: "Accessibility (WCAG)", level: 4, iconName: "Accessibility" },
      ],
    },
    {
      id: "performance",
      skills: [
        { name: "Core Web Vitals", level: 5, iconName: "Gauge" },
        { name: "Webpack / Turbopack", level: 4, iconName: "Boxes" },
        { name: "Vitest / Playwright", level: 4, iconName: "FlaskConical" },
        { name: "CI / CD", level: 3, iconName: "GitBranch" },
        { name: "Observability", level: 3, iconName: "Activity" },
      ],
    },
  ],
};
