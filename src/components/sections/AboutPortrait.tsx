import Image from "next/image";
import { cn } from "@/lib/utils";

export interface AboutPortraitProps {
  src: string;
  alt: string;
  className?: string;
}

/**
 * Editorial 3D bust for the About column. No card chrome — the figure sits
 * in the page with a teal bloom and a bottom fade into the section.
 */
export function AboutPortrait({ src, alt, className }: AboutPortraitProps) {
  return (
    <figure
      className={cn(
        "relative w-full max-w-xs sm:max-w-sm",
        className,
      )}
    >
      <div
        aria-hidden
        className="absolute top-1/4 left-1/2 size-3/4 -translate-x-1/2 rounded-full bg-accent/30 blur-3xl"
      />
      <div className="relative overflow-hidden rounded-3xl">
        <Image
          src={src}
          alt={alt}
          width={1024}
          height={1219}
          sizes="(min-width: 1024px) 24rem, (min-width: 640px) 20rem, 70vw"
          className="h-auto w-full"
        />
      </div>
    </figure>
  );
}
