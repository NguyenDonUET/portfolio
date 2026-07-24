import { useTranslations } from "next-intl";
import { portfolioData } from "@/data/portfolioData";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { ProjectCard } from "@/components/sections/ProjectCard";

export function Projects() {
  const t = useTranslations("projects");
  const featured = portfolioData.projects.filter((project) => project.featured);
  const rest = portfolioData.projects.filter((project) => !project.featured);
  const projects = [...featured, ...rest];

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="py-20 sm:py-28"
    >
      <Container>
        <Reveal>
          <SectionHeader
            id="projects-heading"
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
          />
        </Reveal>
        <StaggerGroup as="ul" className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <StaggerItem as="li" key={project.id}>
              <ProjectCard project={project} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
