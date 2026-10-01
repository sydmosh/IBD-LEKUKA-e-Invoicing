"use client";

import { Fragment } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import { Slide } from "@/components/presentation/SlideFrame";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { getIcon } from "@/components/icons";
import type { ContentOf } from "@/data/slides";

interface ServicesSlideProps {
  content: ContentOf<"services">;
  title: string;
  eyebrow: string;
}

export function ServicesSlide({ content, title, eyebrow }: ServicesSlideProps) {
  const reduce = useReducedMotion();

  return (
    <Slide theme="light" eyebrow={eyebrow} title={title} subtitle={content.lead}>
      <RevealGroup
        className="grid gap-3.5 sm:grid-cols-2 xl:grid-cols-3"
        step={0.06}
      >
        {content.cards.map((card) => {
          const Icon = getIcon(card.icon);
          return (
            <RevealItem key={card.title} className="h-full">
              <article className="card-light group h-full rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1 hover:border-ibd-blue/30 hover:shadow-[0_28px_55px_-35px_rgba(20,46,99,0.65)] sm:p-5">
                <div className="flex items-start gap-3.5">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-ibd-blue to-[#0d1f47] text-white transition-transform duration-300 group-hover:scale-105">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-[15px] font-bold uppercase tracking-[0.06em] text-ink">
                      {card.title}
                    </h3>
                    <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted">
                      {card.body}
                    </p>
                  </div>
                </div>
              </article>
            </RevealItem>
          );
        })}
      </RevealGroup>

      <motion.div
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: reduce ? 0 : 0.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mt-5 flex flex-wrap items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-ibd-blue to-[#0d1f47] px-5 py-4 shadow-[0_30px_60px_-40px_rgba(20,46,99,0.9)]"
      >
        {content.formula.map((part, i) => (
          <Fragment key={part}>
            {i > 0 ? (
              <Plus className="h-4 w-4 shrink-0 text-white/45" aria-hidden="true" />
            ) : null}
            <span className="rounded-full border border-white/15 bg-white/8 px-3.5 py-1.5 text-[12.5px] font-semibold text-white backdrop-blur">
              {part}
            </span>
          </Fragment>
        ))}
        <span className="font-display px-1 text-xl font-extrabold text-white/45">=</span>
        <span className="font-display rounded-full bg-lekuka-bright px-5 py-2 text-lg font-extrabold tracking-tight text-[#04371f]">
          {content.result}
        </span>
      </motion.div>
    </Slide>
  );
}
