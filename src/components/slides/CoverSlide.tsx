"use client";

import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import { Slide } from "@/components/presentation/SlideFrame";
import { Reveal } from "@/components/ui/Reveal";
import type { ContentOf } from "@/data/slides";

export function CoverSlide({ content }: { content: ContentOf<"cover"> }) {
  return (
    <Slide theme="dark" bodyClassName="pt-2 sm:pt-4">
      <div className="flex h-full flex-col gap-8 lg:flex-row lg:items-center lg:gap-10 xl:gap-16">
        <div className="flex min-w-0 flex-1 flex-col justify-center gap-5 sm:gap-6">
          <Reveal delay={0.02}>
            <Image
              src="/logo-ibd-dark.png"
              alt="Infinity Business Dynamics"
              width={1080}
              height={278}
              priority
              className="h-9 w-auto sm:h-11 lg:h-12"
            />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-8 bg-ibd-red sm:w-12" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/70 sm:text-[11px]">
                {content.kicker}
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.18}>
            <h1 className="font-display leading-[0.88] tracking-[-0.035em]">
              <span className="block text-[clamp(2.8rem,7.5vw,6.5rem)] font-extrabold text-white">
                {content.titleMain}
              </span>
              <span className="mt-1 block text-[clamp(1.7rem,3.8vw,3.4rem)] font-semibold text-lekuka-bright">
                {content.titleSub}
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.26}>
            <p className="max-w-[26ch] font-display text-[clamp(1.05rem,1.8vw,1.7rem)] font-semibold leading-snug text-white">
              {content.themeLines[0]}
              <span className="block text-white/60">{content.themeLines[1]}</span>
            </p>
          </Reveal>

          <Reveal delay={0.34}>
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/80">
              <li className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full bg-ibd-red"
                />
                <span>Presented by {content.presenter}</span>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.42}>
            <div className="flex flex-wrap items-center gap-4">
              <div className="inline-flex items-center gap-4 rounded-2xl bg-white px-4 py-2.5 shadow-2xl shadow-black/40 ring-1 ring-white/25 sm:px-5">
                <Image
                  src="/images/lekuka.png"
                  alt="Lekuka e-Invoicing"
                  width={229}
                  height={74}
                  className="h-8 w-auto sm:h-9"
                />
              </div>

              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/75 backdrop-blur sm:text-[11px]">
                <ShieldCheck className="h-3.5 w-3.5 text-lekuka-bright" aria-hidden="true" />
                {content.badge}
              </span>
            </div>
          </Reveal>
        </div>

        <div className="relative flex shrink-0 items-center justify-center lg:w-[36%] xl:w-[34%]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-2 rounded-[2.5rem] bg-gradient-to-br from-lekuka/30 via-transparent to-ibd-red/25 blur-2xl"
          />
          <Reveal delay={0.22} y={26}>
            <div className="relative">
              <Image
                src={content.poster}
                alt="LEKUKA e-Invoicing virtual awareness session poster"
                width={928}
                height={1152}
                priority
                className="w-full max-w-[280px] rounded-2xl shadow-[0_50px_90px_-45px_rgba(0,0,0,0.95)] ring-1 ring-white/25 sm:max-w-[320px] lg:max-w-[360px] xl:max-w-[400px]"
              />
              <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-white/15 bg-[#08101f]/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60 backdrop-blur">
                Event poster
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </Slide>
  );
}
