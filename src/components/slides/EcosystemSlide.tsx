"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Slide } from "@/components/presentation/SlideFrame";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import type { ContentOf } from "@/data/slides";

function Connector({ label }: { label: string }) {
  const reduce = useReducedMotion();
  return (
    <div className="flex w-full flex-col items-center py-1" aria-hidden="true">
      <span className="relative block h-9 w-px bg-gradient-to-b from-lekuka-bright/80 to-white/30">
        {reduce ? null : (
          <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-lekuka-bright flow-dot-v" />
        )}
      </span>
      <span className="my-1 text-[9.5px] font-semibold uppercase tracking-[0.22em] text-white/40">
        {label}
      </span>
      <span className="block h-6 w-px bg-white/25" />
    </div>
  );
}

interface EcosystemSlideProps {
  content: ContentOf<"ecosystem">;
  title: string;
  eyebrow: string;
}

export function EcosystemSlide({ content, title, eyebrow }: EcosystemSlideProps) {
  return (
    <Slide
      theme="dark"
      eyebrow={eyebrow}
      title={title}
      subtitle={content.lead}
      note={content.note}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center">
        <Reveal delay={0.05}>
          <div className="rounded-2xl border border-lekuka/40 bg-lekuka/15 px-6 py-3.5 text-center backdrop-blur">
            <p className="text-[9.5px] font-bold uppercase tracking-[0.26em] text-lekuka-bright">
              Compliance environment
            </p>
            <p className="font-display mt-1 text-lg font-extrabold tracking-tight text-white sm:text-xl">
              {content.top}
            </p>
          </div>
        </Reveal>

        <Connector label="Compliance submission & responses" />

        <Reveal delay={0.2}>
          <div className="rounded-2xl border border-white/25 bg-white/10 px-6 py-3.5 text-center backdrop-blur">
            <p className="text-[9.5px] font-bold uppercase tracking-[0.26em] text-white/50">
              Keep · Connect · Comply
            </p>
            <p className="font-display mt-1 text-lg font-extrabold tracking-tight text-white sm:text-xl">
              {content.centre}
            </p>
          </div>
        </Reveal>

        <Connector label="Mapping, validation & control" />

        <RevealGroup className="grid w-full gap-3 sm:grid-cols-3 sm:gap-4" step={0.12}>
          {content.tiers.map((tier) => (
            <RevealItem key={tier.title} className="h-full">
              <div className="glass h-full rounded-2xl p-4 sm:p-5">
                <p className="text-[9.5px] font-bold uppercase tracking-[0.24em] text-lekuka-bright">
                  {tier.title}
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {tier.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-lg border border-white/12 bg-white/8 px-2.5 py-1.5 text-[12.5px] font-medium text-white/85"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mt-6 grid gap-2 rounded-2xl border border-white/12 bg-white/6 p-4 text-center backdrop-blur sm:grid-cols-3 sm:gap-4 sm:p-5"
      >
        <p className="font-display text-[15px] font-bold text-white">
          Keep what works.
        </p>
        <p className="font-display text-[15px] font-bold text-lekuka-bright">
          Connect what needs to connect.
        </p>
        <p className="font-display text-[15px] font-bold text-white">
          Make compliance part of the workflow.
        </p>
      </motion.div>
    </Slide>
  );
}
