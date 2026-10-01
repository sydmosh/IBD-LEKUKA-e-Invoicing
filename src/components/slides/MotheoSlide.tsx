"use client";

import { ArrowUpRight, BadgeCheck } from "lucide-react";
import { Slide } from "@/components/presentation/SlideFrame";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { getIcon } from "@/components/icons";
import { FlowChain } from "@/components/ui/FlowChain";
import type { ContentOf } from "@/data/slides";

interface MotheoSlideProps {
  content: ContentOf<"motheo">;
  title: string;
  eyebrow: string;
}

export function MotheoSlide({ content, title, eyebrow }: MotheoSlideProps) {
  return (
    <Slide theme="light" eyebrow={eyebrow} title={title} subtitle={content.lead} note={content.note}>
      <div className="flex flex-col gap-5">
        <RevealGroup className="flex flex-wrap items-center gap-3" step={0.04}>
          <RevealItem>
            <span className="inline-flex items-center gap-2 rounded-full border border-lekuka/30 bg-lekuka-soft px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-lekuka-deep">
              <BadgeCheck className="h-4 w-4" aria-hidden="true" />
              {content.badge}
            </span>
          </RevealItem>
          <RevealItem>
            <a
              href={content.ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-ibd-blue px-4 py-2 text-[13px] font-semibold text-white transition hover:bg-ibd-blue/90"
            >
              {content.ctaLabel}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </RevealItem>
        </RevealGroup>

        <RevealGroup
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4"
          step={0.05}
        >
          {content.modules.map((module) => {
            const Icon = getIcon(module.icon);
            return (
              <RevealItem key={module.label} className="h-full">
                <div className="card-light group flex h-full items-center gap-3 rounded-xl p-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-ibd-blue/30 sm:p-4">
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ibd-blue-soft text-ibd-blue transition-colors group-hover:bg-ibd-blue group-hover:text-white">
                    <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                  </span>
                  <span className="font-display text-sm font-semibold text-ink">
                    {module.label}
                  </span>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>

        <div className="rounded-2xl border border-line-soft bg-gradient-to-br from-mist to-white p-4 sm:p-5">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-muted">
            Transaction to compliance flow
          </p>
          <FlowChain nodes={content.flow.map((node) => ({ node }))} />
        </div>
      </div>
    </Slide>
  );
}
