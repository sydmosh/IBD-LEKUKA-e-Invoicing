"use client";

import { ArrowUpRight } from "lucide-react";
import { Slide } from "@/components/presentation/SlideFrame";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ContactBlock } from "@/components/shared/ContactBlock";
import type { ContentOf } from "@/data/slides";

interface QuestionsSlideProps {
  content: ContentOf<"questions">;
  eyebrow: string;
}

export function QuestionsSlide({ content, eyebrow }: QuestionsSlideProps) {
  return (
    <Slide theme="dark" eyebrow={eyebrow} title={content.title} titleSize="display">
      <div className="flex h-full flex-col justify-between gap-6">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
          <div>
            <Reveal delay={0.08}>
              <p className="font-display text-[clamp(1.3rem,2.6vw,2.2rem)] font-bold leading-tight text-white">
                {content.sub}
              </p>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-3 max-w-[52ch] text-[15px] leading-relaxed text-white/65">
                {content.note}
              </p>
            </Reveal>

            <RevealGroup className="mt-6 flex flex-wrap gap-3" step={0.08}>
              {content.ctas.map((cta) => {
                const primary = cta.kind === "primary";
                const ghost = cta.kind === "ghost";
                return (
                  <RevealItem key={cta.label}>
                    <a
                      href={cta.href}
                      target={cta.href.startsWith("http") ? "_blank" : undefined}
                      rel={cta.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all duration-200 ${
                        primary
                          ? "bg-ibd-red text-white shadow-[0_20px_40px_-24px_rgba(237,28,36,0.95)] hover:-translate-y-0.5 hover:bg-[#d8161d]"
                          : ghost
                            ? "border border-white/20 text-white/80 hover:border-white/45 hover:text-white"
                            : "border border-white/15 bg-white/8 text-white backdrop-blur hover:border-white/35 hover:bg-white/14"
                      }`}
                    >
                      {cta.label}
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </RevealItem>
                );
              })}
            </RevealGroup>
          </div>

          <Reveal delay={0.3}>
            <div className="glass rounded-2xl p-5 sm:p-6">
              <ContactBlock tone="dark" />
            </div>
          </Reveal>
        </div>
      </div>
    </Slide>
  );
}
