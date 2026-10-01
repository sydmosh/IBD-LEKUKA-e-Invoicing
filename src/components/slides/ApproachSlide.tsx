"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Slide } from "@/components/presentation/SlideFrame";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { getIcon } from "@/components/icons";
import type { ContentOf } from "@/data/slides";

interface ApproachSlideProps {
  content: ContentOf<"approach">;
  title: string;
  eyebrow: string;
}

export function ApproachSlide({ content, title, eyebrow }: ApproachSlideProps) {
  const reduce = useReducedMotion();

  return (
    <Slide theme="dark" eyebrow={eyebrow} title={title} subtitle={content.lead} note={content.note}>
      <div className="relative">
        <motion.span
          aria-hidden="true"
          className="absolute left-[25px] top-2 bottom-2 w-px bg-gradient-to-b from-lekuka/60 via-white/15 to-transparent lg:left-0 lg:right-0 lg:top-[26px] lg:bottom-auto lg:h-px lg:w-auto lg:bg-gradient-to-r"
          initial={reduce ? { opacity: 1 } : { opacity: 0, scaleY: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleY: 1, scaleX: 1 }}
          transition={{ duration: reduce ? 0 : 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "top left" }}
        />

        <RevealGroup
          className="relative grid gap-4 pl-14 lg:grid-cols-5 lg:gap-4 lg:pl-0"
          step={0.1}
        >
          {content.stages.map((stage, i) => {
            const Icon = getIcon(stage.icon);
            return (
              <RevealItem key={stage.key} className="relative">
                <div className="flex gap-4 lg:flex-col lg:gap-4">
                  <span className="absolute -left-14 top-0 flex h-[52px] w-[52px] items-center justify-center rounded-full border border-white/15 bg-[#0b1736] shadow-[0_0_0_6px_rgba(11,23,54,1)] lg:static lg:shadow-[0_0_0_6px_rgba(11,23,54,1)]">
                    <span className="font-display text-sm font-extrabold tabular-nums text-lekuka-bright">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </span>

                  <div className="glass min-w-0 flex-1 rounded-2xl p-4 transition-colors duration-300 hover:border-white/25 sm:p-5">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-lekuka-bright">
                      <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                    </span>
                    <h3 className="font-display mt-3 text-base font-bold uppercase tracking-[0.12em] text-white sm:text-[17px]">
                      {stage.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/65">
                      {stage.body}
                    </p>
                  </div>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </Slide>
  );
}
