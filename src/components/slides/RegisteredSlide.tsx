"use client";

import Image from "next/image";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { Slide } from "@/components/presentation/SlideFrame";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import type { ContentOf } from "@/data/slides";

interface RegisteredSlideProps {
  content: ContentOf<"registered">;
  title: string;
  eyebrow: string;
  hasScreenshot: boolean;
}

function ScreenshotFallback({ models }: { models: ContentOf<"registered">["models"] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-[0_30px_60px_-45px_rgba(15,27,51,0.75)]">
      <div className="flex items-center gap-3 border-b border-line-soft bg-mist px-4 py-2.5">
        <span aria-hidden="true" className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-ibd-red/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#f5b800]/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-lekuka/70" />
        </span>
        <span className="truncate font-sans text-[11px] font-medium text-muted">
          RSL platform · registered models · manufacturer filter
        </span>
        <span className="ml-auto rounded-full bg-lekuka-soft px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-lekuka-deep">
          {models.length} records
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-left">
          <caption className="sr-only">
            IBD registered models from the supplied RSL platform screenshot
          </caption>
          <thead>
            <tr className="border-b border-line-soft bg-[#fafbfd] text-[10px] uppercase tracking-[0.14em] text-muted">
              <th scope="col" className="px-4 py-2.5 font-semibold">
                ID
              </th>
              <th scope="col" className="px-4 py-2.5 font-semibold">
                Model
              </th>
              <th scope="col" className="px-4 py-2.5 font-semibold">
                Version
              </th>
              <th scope="col" className="px-4 py-2.5 font-semibold">
                Status
              </th>
              <th scope="col" className="px-4 py-2.5 font-semibold">
                Device
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line-soft text-[13px]">
            {models.map((model) => (
              <tr key={model.id} className="hover:bg-mist/70">
                <td className="px-4 py-2.5 font-display font-bold tabular-nums text-ibd-blue">
                  {model.id}
                </td>
                <td className="px-4 py-2.5 font-semibold tracking-tight text-ink">
                  {model.name}
                </td>
                <td className="px-4 py-2.5 tabular-nums text-muted">{model.version}</td>
                <td className="px-4 py-2.5">
                  <span className="rounded-full bg-lekuka-soft px-2 py-0.5 text-[11px] font-bold text-lekuka-deep">
                    {model.status}
                  </span>
                </td>
                <td className="px-4 py-2.5 text-muted">{model.device}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="border-t border-line-soft bg-mist/60 px-4 py-2.5 text-[11px] leading-relaxed text-muted">
        <span className="font-semibold text-ink">Manufacturer:</span>{" "}
        {models[0].manufacturer} · <span className="font-semibold text-ink">Category:</span>{" "}
        {models[0].category}
      </div>
    </div>
  );
}

export function RegisteredSlide({
  content,
  title,
  eyebrow,
  hasScreenshot,
}: RegisteredSlideProps) {
  return (
    <Slide
      theme="mist"
      eyebrow={eyebrow}
      title={title}
      subtitle={content.lead}
      note={content.disclaimer}
    >
      <div className="grid gap-5 lg:grid-cols-[1.25fr_1fr] lg:gap-6">
        <div className="min-w-0">
          <div className="relative">
            {hasScreenshot ? (
              <Image
                src={content.image}
                alt="Screenshot of the RSL platform listing IBD registered models"
                width={1600}
                height={1000}
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="h-auto w-full rounded-2xl border border-line bg-white object-top shadow-[0_30px_60px_-45px_rgba(15,27,51,0.75)]"
              />
            ) : (
              <ScreenshotFallback models={content.models} />
            )}
          </div>
          <p className="mt-2.5 flex items-center gap-2 text-[11px] font-medium italic text-muted">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-ibd-red" />
            {content.annotation}
          </p>
        </div>

        <div className="flex min-w-0 flex-col gap-3">
          <div className="flex items-baseline justify-between gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-muted">
              Registered models
            </p>
            <p className="font-display text-2xl font-extrabold text-ibd-blue">
              <AnimatedNumber value={content.models.length} />
            </p>
          </div>

          <RevealGroup className="flex flex-col gap-2.5" step={0.07}>
            {content.models.map((model) => (
              <RevealItem key={model.id} y={12}>
                <article className="card-light rounded-xl px-4 py-3">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display min-w-0 break-all text-[13.5px] font-bold tracking-tight text-ink">
                      {model.name}
                    </h3>
                    <span className="shrink-0 rounded-md bg-ibd-blue-soft px-2 py-0.5 font-display text-[11px] font-bold tabular-nums text-ibd-blue">
                      ID {model.id}
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    <span className="rounded-md bg-lekuka-soft px-2 py-0.5 text-[10.5px] font-semibold text-lekuka-deep">
                      {model.status}
                    </span>
                    <span className="rounded-md bg-mist px-2 py-0.5 text-[10.5px] font-semibold text-muted">
                      Version {model.version}
                    </span>
                    <span className="rounded-md bg-mist px-2 py-0.5 text-[10.5px] font-semibold text-muted">
                      {model.device}
                    </span>
                  </div>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </Slide>
  );
}
