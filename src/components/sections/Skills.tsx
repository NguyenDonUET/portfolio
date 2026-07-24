import {
  Accessibility,
  Activity,
  Atom,
  BookOpen,
  Boxes,
  Braces,
  FileCode2,
  FlaskConical,
  Gauge,
  GitBranch,
  Globe,
  Layout,
  Palette,
  Sparkles,
  SwatchBook,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { portfolioData } from "@/data/portfolioData";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const skillIcons: Record<string, LucideIcon> = {
  FileCode2,
  Atom,
  Globe,
  Braces,
  Layout,
  Palette,
  SwatchBook,
  BookOpen,
  Sparkles,
  Accessibility,
  Gauge,
  Boxes,
  FlaskConical,
  GitBranch,
  Activity,
};

/** One distinct color theme per skill category (heading + badge). */
const categoryThemes = [
  {
    heading: "text-teal-600 dark:text-teal-400",
    badge:
      "border-teal-500/20 bg-teal-500/10 text-teal-700 hover:bg-teal-500/15 dark:border-teal-400/25 dark:text-teal-300",
  },
  {
    heading: "text-sky-600 dark:text-sky-400",
    badge:
      "border-sky-500/20 bg-sky-500/10 text-sky-700 hover:bg-sky-500/15 dark:border-sky-400/25 dark:text-sky-300",
  },
  {
    heading: "text-amber-600 dark:text-amber-400",
    badge:
      "border-amber-500/25 bg-amber-500/10 text-amber-700 hover:bg-amber-500/15 dark:border-amber-400/25 dark:text-amber-300",
  },
] as const;

export function Skills() {
  const t = useTranslations("skills");

  return (
    <section id="skills" aria-labelledby="skills-heading" className="py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeader
            id="skills-heading"
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
          />
        </Reveal>
        <StaggerGroup className="grid gap-10 md:grid-cols-3">
          {portfolioData.skills.map((category, index) => {
            const theme =
              categoryThemes[index % categoryThemes.length] ??
              categoryThemes[0];
            return (
              <StaggerItem key={category.id}>
                <h3
                  className={cn(
                    "mb-4 text-sm font-medium tracking-wide uppercase",
                    theme.heading,
                  )}
                >
                  {t(`categories.${category.id}`)}
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => {
                    const Icon = skillIcons[skill.iconName];
                    return (
                      <li key={skill.name}>
                        <Badge
                          className={cn(
                            "has-data-[icon=inline-start]:pl-1.5",
                            theme.badge,
                          )}
                        >
                          {Icon ? (
                            <Icon data-icon="inline-start" aria-hidden />
                          ) : null}
                          {skill.name}
                        </Badge>
                      </li>
                    );
                  })}
                </ul>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </Container>
    </section>
  );
}
