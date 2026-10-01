"use client";

import { Slide } from "@/components/presentation/SlideFrame";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import type { ContentOf } from "@/data/slides";

interface RoadmapSlideProps {
  content: ContentOf<"roadmap">;
  title: string;
  eyebrow: string;
}

export function RoadmapSlide({ content, title, eyebrow }: RoadmapSlideProps) {
  return (
    <Slide
      theme="dark"
      eyebrow={eyebrow}
      title={title}
      subtitle={content.lead}
      note={content.note}
    >
      <div className="flex flex-col gap-5">
        <Reveal delay={0.05}>
          <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-lekuka/35 bg-lekuka/12 px-4 py-3 backdrop-blur">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-3xl font-extrabold leading-none text-lekuka-bright sm:text-4xl">
                <AnimatedNumber value={5} />
              </span>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/60">
                day pathway
              </span>
            </div>
            <p className="text-[12.5px] font-semibold leading-snug text-white/85 sm:text-sm">
              {content.label}
            </p>
          </div>
        </Reveal>

        <div className="relative">
          <span
            aria-hidden="true"
            className="absolute left-[27px] top-4 bottom-4 w-px bg-gradient-to-b from-lekuka-bright/70 via-white/15 to-transparent lg:left-0 lg:right-0 lg:top-[26px] lg:bottom-auto lg:h-px lg:w-auto lg:bg-gradient-to-r"
          />

          <RevealGroup
            className="grid gap-3 pl-16 lg:grid-cols-5 lg:gap-4 lg:pl-0"
            step={0.09}
          >
            {content.days.map((day, i) => (
              <RevealItem key={day.day} className="relative">
                <div className="flex gap-4 lg:flex-col lg:gap-3.5">
                  <span className="absolute -left-16 top-1 flex h-[54px] w-[54px] items-center justify-center rounded-2xl border border-white/15 bg-[#0b1736] shadow-[0_0_0_6px_rgba(11,23,54,1)] lg:static lg:h-auto lg:w-auto lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none">
                    <span className="text-center">
                      <span className="block font-display text-[10px] font-bold uppercase tracking-[0.18em] text-lekuka-bright">
                        {day.day.split(" ")[0]}
                      </span>
                      <span className="block font-display text-lg font-extrabold leading-none text-white lg:mt-1 lg:text-2xl">
                        {day.day.split(" ")[1]}
                      </span>
                    </span>
                  </span>

                  <div className="glass min-w-0 flex-1 rounded-2xl p-4 transition-colors duration-300 hover:border-white/25">
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/45 lg:hidden">
                      {day.day}
                    </p>
                    <h3 className="font-display mt-1 text-[15px] font-bold leading-snug text-white lg:mt-0">
                      {day.title}
                    </h3>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-white/65">
                      {day.body}
                    </p>
                    <span
                      aria-hidden="true"
                      className="mt-3 block h-px w-full bg-gradient-to-r from-lekuka-bright/60 to-transparent"
                    />
                    <p className="font-display mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/35">
                      {String(i + 1).padStart(2, "0")} / {String(content.days.length).padStart(2, "0")}
                    </p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </Slide>
  );
}
