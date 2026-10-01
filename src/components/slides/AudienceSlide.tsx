"use client";

import { Slide } from "@/components/presentation/SlideFrame";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { getIcon } from "@/components/icons";
import type { ContentOf } from "@/data/slides";

export function AudienceSlide({
  content,
  title,
  eyebrow,
}: {
  content: ContentOf<"audience">;
  title: string;
  eyebrow: string;
}) {
  return (
    <Slide
      theme="dark"
      eyebrow={eyebrow}
      title={title}
      subtitle={content.lead}
      note={content.note}
    >
      <RevealGroup
        className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 xl:grid-cols-4"
        step={0.05}
      >
        {content.segments.map((segment) => {
          const Icon = getIcon(segment.icon);
          return (
            <RevealItem key={segment.label} className="h-full">
              <article className="glass group flex h-full flex-col justify-between gap-4 rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1 hover:border-white/25 sm:p-5">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-lekuka-bright transition-colors duration-300 group-hover:bg-lekuka group-hover:text-white">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="font-display text-sm font-semibold leading-snug text-white sm:text-[15px]">
                  {segment.label}
                </h3>
              </article>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </Slide>
  );
}
