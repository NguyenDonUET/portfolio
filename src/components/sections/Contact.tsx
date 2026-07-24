import { useTranslations } from "next-intl";
import { AtSign, FolderGit2, Link2, Mail } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";

export function Contact() {
  const { personal } = portfolioData;
  const t = useTranslations("contact");

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-20 sm:py-28"
    >
      <Container narrow>
        <Reveal>
          <SectionHeader
            id="contact-heading"
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
            align="center"
            className="mb-8"
          />
        </Reveal>
        <StaggerGroup className="flex flex-col items-center gap-6 text-center">
          <StaggerItem>
            <a
              href={`mailto:${personal.email}`}
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-base font-medium text-accent-foreground shadow-sm shadow-accent/20 transition-colors hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <Mail className="size-4" aria-hidden />
              {personal.email}
            </a>
          </StaggerItem>
          <StaggerItem>
            <ul className="flex items-center gap-3">
            <li>
              <a
                href={personal.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex size-11 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:border-accent hover:text-accent"
                aria-label="GitHub"
              >
                <FolderGit2 className="size-5" />
              </a>
            </li>
            <li>
              <a
                href={personal.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex size-11 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:border-accent hover:text-accent"
                aria-label="LinkedIn"
              >
                <Link2 className="size-5" />
              </a>
            </li>
            <li>
              <a
                href={personal.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex size-11 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:border-accent hover:text-accent"
                aria-label="Twitter"
              >
                <AtSign className="size-5" />
              </a>
            </li>
            </ul>
          </StaggerItem>
        </StaggerGroup>
      </Container>
    </section>
  );
}
