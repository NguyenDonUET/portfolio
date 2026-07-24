"use client";

import type { LucideIcon } from "lucide-react";
import { AtSign, FolderGit2, Link2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { SocialLinks } from "@/types/portfolio";

interface SocialItem {
  key: keyof SocialLinks;
  label: string;
  icon: LucideIcon;
}

const SOCIALS: SocialItem[] = [
  { key: "github", label: "GitHub", icon: FolderGit2 },
  { key: "linkedin", label: "LinkedIn", icon: Link2 },
  { key: "twitter", label: "Twitter", icon: AtSign },
];

interface HeroSocialsProps {
  links: SocialLinks;
  className?: string;
}

/**
 * Social links rendered as shadcn ghost icon buttons with tooltips.
 * Links use `buttonVariants` on an anchor (per Base UI guidance) rather than
 * the Button component, which would force `role="button"`.
 */
export function HeroSocials({ links, className }: HeroSocialsProps) {
  return (
    <ul className={cn("flex items-center gap-1", className)}>
      {SOCIALS.map(({ key, label, icon: Icon }) => (
        <li key={key}>
          <Tooltip>
            <TooltipTrigger
              render={
                <a
                  href={links[key]}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon-lg" }),
                    "text-muted-foreground hover:text-foreground",
                  )}
                />
              }
            >
              <Icon />
            </TooltipTrigger>
            <TooltipContent>{label}</TooltipContent>
          </Tooltip>
        </li>
      ))}
    </ul>
  );
}
