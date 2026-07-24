import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";

export function About() {
  const t = useTranslations("about");
  const tp = useTranslations("personal");

  return (
    <section id="about" aria-labelledby="about-heading" className="py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeader
            id="about-heading"
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={tp("bio")}
          />
        </Reveal>
        <StaggerGroup className="grid gap-8 sm:grid-cols-2">
          <StaggerItem>
            <p className="text-base leading-relaxed text-muted">{t("p1")}</p>
          </StaggerItem>
          <StaggerItem>
            <p className="text-base leading-relaxed text-muted">{t("p2")}</p>
          </StaggerItem>
        </StaggerGroup>
      </Container>
    </section>
  );
}
