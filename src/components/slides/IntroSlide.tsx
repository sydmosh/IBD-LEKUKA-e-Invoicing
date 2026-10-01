"use client";

import { Lightbulb } from "lucide-react";
import { Slide } from "@/components/presentation/SlideFrame";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { getIcon } from "@/components/icons";
import type { ContentOf } from "@/data/slides";

export function IntroSlide({
  content,
  title,
  eyebrow,
}: {
  content: ContentOf<"intro">;
  title: string;
  eyebrow: string;
}) {
  return (
    <Slide theme="light" eyebrow={eyebrow} title={title} note={content.note}>
      <div className="grid gap-5 lg:grid-cols-[1.05fr_1fr] lg:gap-7">
        <div className="flex flex-col gap-5">
          <RevealGroup className="rounded-2xl border border-ibd-blue/15 bg-gradient-to-br from-ibd-blue to-[#0d1f47] p-5 text-white shadow-[0_30px_60px_-40px_rgba(20,46,99,0.9)] sm:p-6">
            <RevealItem>
              <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-white/50">
                In one sentence
              </p>
              <p className="font-display mt-2 text-[clamp(1.05rem,1.7vw,1.5rem)] font-semibold leading-snug">
                {content.definition}
              </p>
            </RevealItem>

            <ul className="mt-5 space-y-3 border-t border-white/10 pt-4">
              {content.body.map((line) => (
                <RevealItem key={line} y={10}>
                  <li className="flex gap-3 text-sm leading-relaxed text-white/75">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-lekuka-bright"
                    />
                    {line}
                  </li>
                </RevealItem>
              ))}
            </ul>
          </RevealGroup>

          <RevealGroup className="rounded-2xl border border-lekuka/30 bg-lekuka-soft/70 p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-lekuka text-white">
                <Lightbulb className="h-4 w-4" aria-hidden="true" />
              </span>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-lekuka-deep">
                  Key idea
                </p>
                <p className="font-display mt-1.5 text-[clamp(1rem,1.5vw,1.35rem)] font-bold leading-snug text-ink">
                  “{content.keyIdea}”
                </p>
              </div>
            </div>
          </RevealGroup>
        </div>

        <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          {content.facets.map((facet) => {
            const Icon = getIcon(facet.icon);
            return (
              <RevealItem key={facet.title} className="h-full">
                <article className="card-light h-full rounded-2xl p-5 transition-shadow duration-300 hover:shadow-[0_24px_50px_-32px_rgba(15,27,51,0.55)] sm:p-6">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-ibd-red-soft text-ibd-red">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="font-display mt-4 text-base font-bold text-ink sm:text-lg">
                    {facet.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{facet.body}</p>
                </article>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </Slide>
  );
}
