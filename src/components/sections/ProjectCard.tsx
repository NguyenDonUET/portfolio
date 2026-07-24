"use client";

import { useTranslations } from "next-intl";
import { ArrowUpRight, Code2, ExternalLink } from "lucide-react";
import type { Project } from "@/types/portfolio";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/Card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const t = useTranslations("projects");
  const item = `items.${project.id}` as const;
  const title = t(`${item}.title`);
  const responsibilities = t.raw(
    `${item}.responsibilities`,
  ) as string[];

  return (
    <Dialog>
      <Card className="group relative isolate flex h-full flex-col gap-4 overflow-hidden transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:border-sky-400/30 hover:shadow-[0_18px_45px_-20px_rgba(56,189,248,0.22)] dark:hover:border-sky-400/50 dark:hover:shadow-[0_18px_55px_-18px_rgba(139,92,246,0.5)]">
        {/* Aurora wash: teal → sky → violet, fades in on hover */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-br from-teal-500/6 via-sky-500/5 to-violet-500/6 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-teal-400/15 dark:via-sky-400/15 dark:to-violet-500/20"
        />
        {/* Teal glow top-left */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-px -z-10 bg-[radial-gradient(120%_120%_at_0%_0%,rgba(45,212,191,0.08),transparent_55%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:bg-[radial-gradient(120%_120%_at_0%_0%,rgba(45,212,191,0.16),transparent_55%)]"
        />
        {/* Violet glow bottom-right */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-px -z-10 bg-[radial-gradient(120%_120%_at_100%_100%,rgba(139,92,246,0.08),transparent_55%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:bg-[radial-gradient(120%_120%_at_100%_100%,rgba(139,92,246,0.18),transparent_55%)]"
        />
        {/* Multi-hue top edge with faded ends */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-linear-to-r from-teal-400 via-sky-400 to-violet-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100 mask-[linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]"
        />

        {/* Stretched trigger: whole card opens the modal, links stay above it */}
        <DialogTrigger
          aria-label={t("viewDetailsFor", { title })}
          className="absolute inset-0 z-0 cursor-pointer rounded-xl focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        />

        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display bg-linear-to-r from-teal-500 via-sky-500 to-violet-500 bg-clip-text text-xl tracking-tight text-foreground/80 transition-colors duration-300 group-hover:text-transparent dark:from-teal-400 dark:via-sky-400 dark:to-violet-400">
            {title}
          </h3>
          {project.featured ? (
            <Badge className="relative z-10 shrink-0">{t("featured")}</Badge>
          ) : null}
        </div>
        <p className="text-sm leading-relaxed text-muted">
          {t(`${item}.shortDescription`)}
        </p>
        <ul className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li key={tag}>
              <Badge variant="secondary">{tag}</Badge>
            </li>
          ))}
        </ul>
        <div className="mt-auto flex items-center gap-4 pt-2 text-sm font-medium">
          <span className="inline-flex items-center gap-1.5 text-accent">
            {t("viewDetails")}
            <ArrowUpRight
              className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden
            />
          </span>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 inline-flex items-center gap-1.5 text-muted hover:text-foreground hover:underline"
          >
            {t("live")}
            <ExternalLink className="size-3.5" aria-hidden />
          </a>
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 inline-flex items-center gap-1.5 text-muted hover:text-foreground hover:underline"
          >
            {t("code")}
            <Code2 className="size-3.5" aria-hidden />
          </a>
        </div>
      </Card>

      <DialogContent className="max-h-[calc(100dvh-2rem)] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <DialogTitle>{title}</DialogTitle>
            {project.featured ? (
              <Badge className="shrink-0">{t("featured")}</Badge>
            ) : null}
          </div>
          <DialogDescription>{t(`${item}.fullDescription`)}</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3">
          <h4 className="text-sm font-semibold tracking-wide text-accent uppercase">
            {t("responsibilities")}
          </h4>
          <ul className="flex flex-col gap-3">
            {responsibilities.map((entry) => (
              <li
                key={entry}
                className="flex gap-3 text-base leading-relaxed text-foreground/85"
              >
                <span
                  aria-hidden
                  className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent"
                />
                {entry}
              </li>
            ))}
          </ul>
        </div>

        <ul className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li key={tag}>
              <Badge variant="secondary">{tag}</Badge>
            </li>
          ))}
        </ul>

        <DialogFooter className="gap-3 pt-1">
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-border px-5 text-base font-medium text-foreground transition-colors hover:bg-surface"
          >
            {t("viewCode")}
            <Code2 className="size-4.5" aria-hidden />
          </a>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/80"
          >
            {t("liveDemo")}
            <ExternalLink className="size-4.5" aria-hidden />
          </a>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
