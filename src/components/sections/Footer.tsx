import { useTranslations } from "next-intl";
import { portfolioData } from "@/data/portfolioData";
import { Container } from "@/components/ui/Container";

export function Footer() {
  const year = new Date().getFullYear();
  const { personal } = portfolioData;
  const t = useTranslations("footer");
  const tp = useTranslations("personal");

  return (
    <footer className="border-t border-border py-10">
      <Container className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="text-sm text-muted">
          © {year} {personal.name}. {t("builtWith")}
        </p>
        <p className="text-sm text-muted">{tp("location")}</p>
      </Container>
    </footer>
  );
}
