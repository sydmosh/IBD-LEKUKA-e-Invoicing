"use client";

import { Check } from "lucide-react";
import { Slide } from "@/components/presentation/SlideFrame";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { FlowChain } from "@/components/ui/FlowChain";
import type { ContentOf } from "@/data/slides";

interface PathwaySlideProps {
  content: ContentOf<"pathway">;
  title: string;
  eyebrow: string;
}

export function PathwaySlide({ content, title, eyebrow }: PathwaySlideProps) {
  return (
    <Slide
      theme="mist"
      eyebrow={eyebrow}
      title={title}
      subtitle={content.lead}
      note={content.note}
    >
      <div className="flex flex-col gap-5">
        <div className="rounded-2xl border border-line-soft bg-white p-4 shadow-[0_24px_55px_-45px_rgba(15,27,51,0.7)] sm:p-5">
          <div className="mb-3 flex items-center justify-between gap-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-muted">
              Integration pathway
            </p>
            <span className="rounded-full bg-ibd-blue-soft px-3 py-1 text-[11px] font-semibold text-ibd-blue">
              {content.label}
            </span>
          </div>
          <FlowChain nodes={content.flow} numbered />
        </div>

        <div className="rounded-2xl border border-line-soft bg-white p-4 sm:p-5">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-muted">
            {content.areasTitle}
          </p>
          <RevealGroup className="grid grid-cols-2 gap-2.5 sm:grid-cols-4" step={0.045}>
            {content.areas.map((area) => (
              <RevealItem key={area} className="h-full">
                <div className="flex h-full items-center gap-2.5 rounded-xl border border-line-soft bg-mist/70 px-3 py-2.5">
                  <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-lekuka text-white">
                    <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  <span className="text-[13px] font-medium leading-tight text-ink">
                    {area}
                  </span>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </Slide>
  );
}
