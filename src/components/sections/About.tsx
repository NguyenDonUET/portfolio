import { useTranslations } from "next-intl";
import { portfolioData } from "@/data/portfolioData";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { AboutPortrait } from "@/components/sections/AboutPortrait";

export function About() {
  const { personal } = portfolioData;
  const t = useTranslations("about");
  const tp = useTranslations("personal");

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="py-20 sm:py-28"
    >
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-16">
          <div>
            <Reveal>
              <SectionHeader
                id="about-heading"
                eyebrow={t("eyebrow")}
                title={t("title")}
                description={tp("bio")}
                className="mb-6 max-w-xl lg:mb-8"
              />
            </Reveal>
            <Reveal delay={0.08}>
              <p className="max-w-xl text-base leading-relaxed text-muted">
                {t("p1")}
              </p>
            </Reveal>
          </div>

          <Reveal
            delay={0.12}
            className="flex justify-center lg:justify-end"
          >
            <AboutPortrait src={personal.aboutAvatarUrl} alt={personal.name} />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
