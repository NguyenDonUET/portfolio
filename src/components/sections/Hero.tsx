"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowDownRight, Mail } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import { Container } from "@/components/ui/Container";
import { AvatarTilt } from "@/components/ui/AvatarTilt";
import { HeroSocials } from "@/components/sections/HeroSocials";
import { HeroScrollCue } from "@/components/sections/HeroScrollCue";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/**
 * First-viewport composition: brand name, one headline, one supporting line, CTA group.
 * Client-only because Framer Motion requires browser APIs.
 */
export function Hero() {
  const { personal } = portfolioData;
  const t = useTranslations("hero");
  const tp = useTranslations("personal");

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative flex min-h-[calc(100dvh-4rem)] items-center overflow-hidden pt-12 pb-24"
    >
      {/* Atmospheric background plane — edge-to-edge, not a card */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/15 via-background to-background" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,transparent_49%,color-mix(in_oklab,var(--color-border)_60%,transparent)_50%,transparent_51%,transparent_100%)] bg-[size:64px_64px] opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      </div>

      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="flex flex-col"
          >
            <motion.div variants={item} className="mb-5">
              <Badge
                variant="secondary"
                className="gap-2 py-1 pl-2 text-xs font-medium tracking-wide"
              >
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-70" />
                  <span className="relative inline-flex size-2 rounded-full bg-primary" />
                </span>
                {t("availability")}
              </Badge>
            </motion.div>

            <motion.p
              variants={item}
              className="mb-4 text-sm font-medium tracking-[0.18em] text-accent uppercase"
            >
              {tp("title")}
            </motion.p>

            <motion.h1
              id="hero-heading"
              variants={item}
              className="font-display text-4xl leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl"
            >
              {personal.name}
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-xl"
            >
              {tp("bio")}
            </motion.p>

            <motion.div
              variants={item}
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
            >
              <Link
                href="#projects"
                className={cn(buttonVariants({ size: "lg" }), "h-11 px-6")}
              >
                {t("viewWork")}
                <ArrowDownRight data-icon="inline-end" aria-hidden />
              </Link>
              <Link
                href="#contact"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-11 px-6",
                )}
              >
                <Mail data-icon="inline-start" aria-hidden />
                {t("contactMe")}
              </Link>
            </motion.div>

            <motion.div
              variants={item}
              className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2"
            >
              <p className="text-sm text-muted">
                {t("basedIn", { location: tp("location") })}
              </p>
              <span aria-hidden className="text-border-strong">
                •
              </span>
              <HeroSocials links={personal.socialLinks} />
            </motion.div>
          </motion.div>

          <div className="order-first flex justify-center lg:order-last lg:justify-end">
            <AvatarTilt
              src={personal.avatarUrl}
              alt={personal.name}
              className="lg:max-w-md"
            />
          </div>
        </div>
      </Container>

      <HeroScrollCue />
    </section>
  );
}
