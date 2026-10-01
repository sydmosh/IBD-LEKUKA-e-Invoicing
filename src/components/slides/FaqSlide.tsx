"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { Slide } from "@/components/presentation/SlideFrame";
import type { ContentOf } from "@/data/slides";

interface FaqSlideProps {
  content: ContentOf<"faq">;
  title: string;
  eyebrow: string;
}

function AccordionItem({
  index,
  question,
  answer,
  open,
  onToggle,
}: {
  index: number;
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
}) {
  const reduce = useReducedMotion();
  const panelId = `faq-panel-${index}`;
  const buttonId = `faq-button-${index}`;

  return (
    <div
      className={`rounded-xl border transition-colors duration-200 ${
        open ? "border-ibd-blue/35 bg-white" : "border-line-soft bg-white/70"
      }`}
    >
      <h3>
        <button
          type="button"
          id={buttonId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full items-start gap-3 px-4 py-3 text-left"
        >
          <span className="font-display mt-0.5 shrink-0 text-[11px] font-extrabold tabular-nums text-ibd-red">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-display flex-1 text-[14px] font-semibold leading-snug text-ink sm:text-[15px]">
            {question}
          </span>
          <span
            aria-hidden="true"
            className={`mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-colors ${
              open ? "bg-ibd-blue text-white" : "bg-mist text-muted"
            }`}
          >
            {open ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0.12 : 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="border-t border-line-soft px-4 py-3 text-[13.5px] leading-relaxed text-muted">
              {answer}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function FaqSlide({ content, title, eyebrow }: FaqSlideProps) {
  const [open, setOpen] = useState<number[]>([0]);
  const toggle = (i: number) =>
    setOpen((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]));

  const midpoint = Math.ceil(content.items.length / 2);
  const columns = [
    content.items.slice(0, midpoint),
    content.items.slice(midpoint),
  ];
  let cursor = 0;

  return (
    <Slide theme="mist" eyebrow={eyebrow} title={title} subtitle={content.lead}>
      <div className="grid gap-3 lg:grid-cols-2 lg:gap-4">
        {columns.map((column, colIndex) => (
          <div key={colIndex} className="flex flex-col gap-2.5">
            {column.map((item) => {
              const index = cursor++;
              return (
                <AccordionItem
                  key={item.question}
                  index={index}
                  question={item.question}
                  answer={item.answer}
                  open={open.includes(index)}
                  onToggle={() => toggle(index)}
                />
              );
            })}
          </div>
        ))}
      </div>
    </Slide>
  );
}
