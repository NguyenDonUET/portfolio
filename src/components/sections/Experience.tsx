import { useLocale, useTranslations } from "next-intl";
import { portfolioData } from "@/data/portfolioData";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";

function formatRange(
  startDate: string,
  endDate: string,
  locale: string,
  presentLabel: string,
): string {
  const format = (value: string) => {
    if (value === "Present") return presentLabel;
    const [year, month] = value.split("-");
    const date = new Date(Number(year), Number(month) - 1);
    return date.toLocaleDateString(locale, { month: "short", year: "numeric" });
  };
  return `${format(startDate)} — ${format(endDate)}`;
}

export function Experience() {
  const t = useTranslations("experience");
  const locale = useLocale();

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="py-20 sm:py-28"
    >
      <Container>
        <Reveal>
          <SectionHeader
            id="experience-heading"
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
          />
        </Reveal>
        <StaggerGroup
          as="ol"
          className="relative space-y-10 border-l border-border pl-6 sm:pl-8"
        >
          {portfolioData.experience.map((job) => {
            const item = `items.${job.id}` as const;
            const bullets = t.raw(`${item}.description`) as string[];
            return (
            <StaggerItem as="li" key={job.id} className="relative">
              <span
                aria-hidden
                className="absolute top-1.5 -left-[1.55rem] size-2.5 rounded-full bg-accent sm:-left-[2.05rem]"
              />
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <h3 className="font-display text-xl tracking-tight text-foreground">
                  {t(`${item}.role`)}
                </h3>
                <p className="text-sm text-muted">
                  {formatRange(job.startDate, job.endDate, locale, t("present"))}
                </p>
              </div>
              <p className="mt-1 text-sm font-medium text-accent">
                {job.company} · {t(`${item}.location`)}
              </p>
              <ul className="mt-4 space-y-2">
                {bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="text-sm leading-relaxed text-muted before:mr-2 before:text-accent before:content-['–']"
                  >
                    {bullet}
                  </li>
                ))}
              </ul>
              <ul className="mt-4 flex flex-wrap gap-2">
                {job.techStack.map((tech) => (
                  <li key={tech}>
                    <Badge variant="secondary">{tech}</Badge>
                  </li>
                ))}
              </ul>
            </StaggerItem>
            );
          })}
        </StaggerGroup>
      </Container>
    </section>
  );
}
