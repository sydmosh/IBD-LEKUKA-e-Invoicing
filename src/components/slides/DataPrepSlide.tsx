"use client";

import { useMemo, useState } from "react";
import { Check, RotateCcw } from "lucide-react";
import { Slide } from "@/components/presentation/SlideFrame";
import { getIcon } from "@/components/icons";
import type { ContentOf } from "@/data/slides";

interface DataPrepSlideProps {
  content: ContentOf<"dataPrep">;
  title: string;
  eyebrow: string;
}

export function DataPrepSlide({ content, title, eyebrow }: DataPrepSlideProps) {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const total = useMemo(
    () => content.groups.reduce((sum, group) => sum + group.items.length, 0),
    [content.groups]
  );
  const done = useMemo(
    () =>
      content.groups.reduce(
        (sum, group) =>
          sum +
          group.items.filter((_, i) => checked[`${group.key}::${i}`]).length,
        0
      ),
    [checked, content.groups]
  );

  const toggle = (key: string) =>
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));

  const pct = total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    <Slide
      theme="light"
      eyebrow={eyebrow}
      title={title}
      subtitle={content.lead}
      note={content.note}
    >
      <div className="mb-4 flex flex-wrap items-center gap-4 rounded-2xl border border-line-soft bg-white px-4 py-3">
        <div className="min-w-[180px] flex-1">
          <div className="flex items-baseline justify-between gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-muted">
              Your data readiness
            </p>
            <p className="font-display text-sm font-extrabold tabular-nums text-ibd-blue">
              {done} / {total}
            </p>
          </div>
          <div
            className="mt-2 h-2 w-full overflow-hidden rounded-full bg-mist"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={total}
            aria-valuenow={done}
            aria-label="Data readiness"
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-ibd-blue via-lekuka to-ibd-red transition-[width] duration-500 ease-out"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
        <button
          type="button"
          onClick={() => setChecked({})}
          className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-2 text-[13px] font-semibold text-muted transition hover:border-ibd-red/40 hover:text-ibd-red"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          Reset
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {content.groups.map((group) => {
          const Icon = getIcon(group.icon);
          const groupDone = group.items.filter((_, i) => checked[`${group.key}::${i}`]).length;
          const groupPct = Math.round((groupDone / group.items.length) * 100);

          return (
            <section
              key={group.key}
              className="card-light flex flex-col rounded-2xl p-4 sm:p-5"
              aria-label={group.title}
            >
              <header className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ibd-blue-soft text-ibd-blue">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-[15px] font-bold text-ink">
                    {group.title}
                  </h3>
                  <p className="text-[11px] font-medium tabular-nums text-muted">
                    {groupDone} of {group.items.length} reviewed
                  </p>
                </div>
                <span className="font-display text-lg font-extrabold tabular-nums text-ibd-blue/70">
                  {groupPct}%
                </span>
              </header>

              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-mist">
                <div
                  className="h-full rounded-full bg-lekuka transition-[width] duration-500 ease-out"
                  style={{ width: `${groupPct}%` }}
                />
              </div>

              <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
                {group.items.map((item, i) => {
                  const key = `${group.key}::${i}`;
                  const isChecked = Boolean(checked[key]);
                  return (
                    <li key={item}>
                      <button
                        type="button"
                        role="checkbox"
                        aria-checked={isChecked}
                        onClick={() => toggle(key)}
                        className={`flex w-full items-center gap-2.5 rounded-lg border px-2.5 py-2 text-left text-[13px] font-medium transition-all duration-200 ${
                          isChecked
                            ? "border-lekuka/40 bg-lekuka-soft text-lekuka-deep"
                            : "border-line-soft bg-white text-ink/85 hover:border-ibd-blue/35 hover:bg-ibd-blue-soft/50"
                        }`}
                      >
                        <span
                          aria-hidden="true"
                          className={`inline-flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded border transition-colors ${
                            isChecked
                              ? "border-lekuka bg-lekuka text-white"
                              : "border-line bg-mist"
                          }`}
                        >
                          {isChecked ? <Check className="h-3 w-3" /> : null}
                        </span>
                        <span className="leading-snug">{item}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>
    </Slide>
  );
}
