"use client";

import { Slide } from "@/components/presentation/SlideFrame";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { getIcon } from "@/components/icons";
import type { ContentOf } from "@/data/slides";

export function WelcomeSlide({
  content,
  title,
  eyebrow,
}: {
  content: ContentOf<"welcome">;
  title: string;
  eyebrow: string;
}) {
  return (
    <Slide theme="light" eyebrow={eyebrow} title={title}>
      <RevealGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {content.points.map((point, i) => {
          const Icon = getIcon(point.icon);
          return (
            <RevealItem key={point.title}>
              <article className="card-light group relative h-full overflow-hidden rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-30px_rgba(15,27,51,0.5)] sm:p-6">
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-ibd-red transition-transform duration-300 group-hover:scale-x-100"
                  style={{ transformOrigin: "left" }}
                />
                <div className="flex items-start gap-4">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ibd-blue-soft text-ibd-blue transition-colors duration-300 group-hover:bg-ibd-blue group-hover:text-white">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-display text-[11px] font-bold uppercase tracking-[0.22em] text-muted/70">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="font-display mt-1 text-base font-bold leading-snug text-ink sm:text-lg">
                      {point.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">
                      {point.body}
                    </p>
                  </div>
                </div>
              </article>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </Slide>
  );
}
