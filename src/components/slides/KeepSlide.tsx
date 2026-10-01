"use client";

import { Check, Plus } from "lucide-react";
import { Slide } from "@/components/presentation/SlideFrame";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import type { ContentOf } from "@/data/slides";

interface KeepSlideProps {
  content: ContentOf<"keep">;
  eyebrow: string;
}

export function KeepSlide({ content, eyebrow }: KeepSlideProps) {
  return (
    <Slide theme="green" eyebrow={eyebrow} title={content.question}>
      <div className="flex flex-col justify-between gap-8">
        <div className="space-y-7">
          <Reveal delay={0.05}>
            <p className="font-display text-[clamp(2.4rem,6vw,5rem)] font-extrabold leading-[0.92] tracking-[-0.03em] text-white">
              {content.answer}
            </p>
          </Reveal>

          <RevealGroup
            className="flex flex-col items-stretch gap-3 lg:flex-row lg:items-center lg:gap-4"
            step={0.12}
          >
            {content.equation.map((part, i) => (
              <div key={part} className="contents">
                <RevealItem className="min-w-0 flex-1">
                  <div className="glass flex items-center gap-3 rounded-2xl px-4 py-4 sm:px-5">
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-lekuka-bright/20 text-lekuka-bright">
                      <Check className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="font-display text-[15px] font-bold leading-snug text-white sm:text-lg">
                      {part}
                    </span>
                  </div>
                </RevealItem>
                {i < content.equation.length - 1 ? (
                  <RevealItem>
                    <span className="flex items-center justify-center py-1 lg:px-1">
                      <Plus className="h-5 w-5 text-white/50" aria-hidden="true" />
                    </span>
                  </RevealItem>
                ) : null}
              </div>
            ))}
          </RevealGroup>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <Reveal delay={0.35}>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-white/45">
                Examples of environments IBD works with
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {content.examples.map((example) => (
                  <li
                    key={example}
                    className="rounded-full border border-white/15 bg-white/8 px-3.5 py-1.5 text-[13px] font-medium text-white/85 backdrop-blur"
                  >
                    {example}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.45}>
            <div className="rounded-2xl border border-white/15 bg-[#04371f]/60 p-5 backdrop-blur">
              <p className="font-display text-[clamp(1rem,1.5vw,1.3rem)] font-semibold leading-snug text-white">
                {content.message}
              </p>
              <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-lekuka-bright px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[#04371f]">
                {content.emphasis}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </Slide>
  );
}
