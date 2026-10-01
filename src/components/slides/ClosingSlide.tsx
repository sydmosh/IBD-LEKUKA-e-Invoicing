"use client";

import { ArrowRight, Check } from "lucide-react";
import { Slide } from "@/components/presentation/SlideFrame";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ContactBlock } from "@/components/shared/ContactBlock";
import type { ContentOf } from "@/data/slides";
import { company } from "@/data/company";

interface ClosingSlideProps {
  content: ContentOf<"closing">;
  eyebrow: string;
}

export function ClosingSlide({ content, eyebrow }: ClosingSlideProps) {
  return (
    <Slide
      theme="green"
      eyebrow={eyebrow}
      title={content.lead ? "Is Your Business Ready for Lekuka?" : ""}
      titleSize="display"
      subtitle={content.lead}
    >
      <div className="flex flex-col gap-5">
        <RevealGroup className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3" step={0.07}>
          {content.steps.map((step, i) => (
            <RevealItem key={step} className="h-full">
              <div className="glass flex h-full items-start gap-3.5 rounded-2xl p-4 transition-colors duration-300 hover:border-white/30 sm:p-5">
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-lekuka-bright text-[#04371f]">
                  <Check className="h-4.5 w-4.5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="font-display text-[10px] font-bold uppercase tracking-[0.24em] text-white/45">
                    Step {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="font-display mt-0.5 text-[15px] font-bold leading-snug text-white">
                    {step}
                  </p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <div className="rounded-2xl border border-white/15 bg-white/8 p-5 backdrop-blur sm:p-6">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <ContactBlock tone="dark" />

            <div className="flex flex-col items-start gap-4 lg:items-end">
              <p className="inline-flex items-center gap-2 rounded-full bg-lekuka-bright px-4 py-2 text-[12px] font-extrabold uppercase tracking-[0.14em] text-[#04371f]">
                {content.signature.join(" + ")}
              </p>
              <a
                href={`${company.mailto}?subject=Lekuka%20Assessment%20Request`}
                className="inline-flex items-center gap-2 rounded-full bg-ibd-red px-6 py-3 text-sm font-bold text-white shadow-[0_22px_45px_-25px_rgba(237,28,36,1)] transition hover:-translate-y-0.5 hover:bg-[#d8161d]"
              >
                Request a Lekuka Assessment
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </Slide>
  );
}
