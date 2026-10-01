"use client";

import { ArrowDown, ArrowRight, Minus } from "lucide-react";
import { Slide } from "@/components/presentation/SlideFrame";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import type { ContentOf } from "@/data/slides";

interface FlowPanelProps {
  label: string;
  steps: string[];
  tone: "quiet" | "accent";
}

function FlowPanel({ label, steps, tone }: FlowPanelProps) {
  const accent = tone === "accent";

  return (
    <div
      className={`relative flex h-full flex-col rounded-2xl border p-5 sm:p-6 ${
        accent
          ? "border-lekuka/30 bg-white shadow-[0_28px_60px_-40px_rgba(7,138,88,0.7)]"
          : "border-line-soft bg-white/70"
      }`}
    >
      <div className="mb-4 flex items-center justify-between">
        <span
          className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.24em] ${
            accent
              ? "bg-lekuka-soft text-lekuka-deep"
              : "bg-ibd-blue-soft text-ibd-blue"
          }`}
        >
          {label}
        </span>
        <span className="font-display text-[11px] font-bold tabular-nums text-muted/60">
          {steps.length} steps
        </span>
      </div>

      <RevealGroup className="flex flex-1 flex-col" step={0.07}>
        {steps.map((step, i) => (
          <div key={step} className="contents">
            <RevealItem y={10}>
              <div
                className={`flex items-center gap-3 rounded-xl border px-4 py-3 ${
                  accent
                    ? "border-lekuka/25 bg-lekuka-soft/60"
                    : "border-line-soft bg-white"
                }`}
              >
                <span
                  className={`font-display text-[11px] font-extrabold tabular-nums ${
                    accent ? "text-lekuka" : "text-muted/70"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`font-display text-sm font-semibold sm:text-[15px] ${
                    accent ? "text-ink" : "text-ink/75"
                  }`}
                >
                  {step}
                </span>
              </div>
            </RevealItem>

            {i < steps.length - 1 ? (
              <RevealItem y={4}>
                <div className="flex items-center justify-center py-1.5">
                  <ArrowDown
                    className={`h-4 w-4 ${accent ? "text-lekuka" : "text-muted/45"}`}
                    aria-hidden="true"
                  />
                </div>
              </RevealItem>
            ) : null}
          </div>
        ))}
      </RevealGroup>
    </div>
  );
}

export function BeforeAfterSlide({
  content,
  title,
  eyebrow,
}: {
  content: ContentOf<"beforeAfter">;
  title: string;
  eyebrow: string;
}) {
  return (
    <Slide theme="mist" eyebrow={eyebrow} title={title} note={content.note}>
      <div className="grid gap-5 lg:grid-cols-[1fr_auto_1.15fr] lg:items-stretch lg:gap-6">
        <FlowPanel label={content.beforeTitle} steps={content.before} tone="quiet" />

        <div className="flex items-center justify-center py-1 lg:px-1">
          <span className="inline-flex h-11 w-11 rotate-90 items-center justify-center rounded-full border border-line bg-white text-ibd-blue shadow-sm lg:rotate-0">
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </span>
        </div>

        <FlowPanel label={content.afterTitle} steps={content.after} tone="accent" />
      </div>

      <div className="mt-5 flex items-start gap-3 rounded-2xl border border-line-soft bg-white px-5 py-4">
        <Minus className="mt-0.5 h-4 w-4 shrink-0 text-ibd-red" aria-hidden="true" />
        <p className="font-display text-[15px] font-semibold leading-snug text-ink sm:text-base">
          {content.takeaway}
        </p>
      </div>
    </Slide>
  );
}
