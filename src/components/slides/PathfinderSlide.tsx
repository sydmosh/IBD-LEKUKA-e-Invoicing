"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Compass,
  RotateCcw,
} from "lucide-react";
import { Slide } from "@/components/presentation/SlideFrame";
import type { ContentOf } from "@/data/slides";

interface PathfinderSlideProps {
  content: ContentOf<"pathfinder">;
  title: string;
  eyebrow: string;
}

export function PathfinderSlide({ content, title, eyebrow }: PathfinderSlideProps) {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [systemId, setSystemId] = useState<string | null>(null);
  const [methodId, setMethodId] = useState<string | null>(null);
  const [helpId, setHelpId] = useState<string | null>(null);

  const system = useMemo(
    () => content.systemOptions.find((s) => s.id === systemId) ?? null,
    [content.systemOptions, systemId]
  );
  const method = content.invoiceMethods.find((m) => m.id === methodId) ?? null;
  const help = content.helpAreas.find((h) => h.id === helpId) ?? null;

  const selection = [systemId, methodId, helpId][step];
  const canAdvance = Boolean(selection);
  const done = Boolean(helpId);

  const optionBase =
    "rounded-xl border px-3.5 py-2.5 text-left text-sm font-medium transition-all duration-200 sm:text-[15px]";

  const reset = () => {
    setStep(0);
    setSystemId(null);
    setMethodId(null);
    setHelpId(null);
  };

  const renderOptions = () => {
    if (step === 0) {
      return (
        <div className="flex flex-wrap gap-2.5" role="group" aria-label="System options">
          {content.systemOptions.map((option) => {
            const active = systemId === option.id;
            return (
              <button
                key={option.id}
                type="button"
                aria-pressed={active}
                onClick={() => setSystemId(option.id)}
                className={`${optionBase} ${
                  active
                    ? "border-ibd-blue bg-ibd-blue text-white shadow-[0_16px_30px_-20px_rgba(20,46,99,0.9)]"
                    : "border-line bg-white text-ink hover:border-ibd-blue/45 hover:bg-ibd-blue-soft/60"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      );
    }

    if (step === 1) {
      return (
        <div className="flex flex-wrap gap-2.5" role="group" aria-label="Invoice method options">
          {content.invoiceMethods.map((option) => {
            const active = methodId === option.id;
            return (
              <button
                key={option.id}
                type="button"
                aria-pressed={active}
                onClick={() => setMethodId(option.id)}
                className={`${optionBase} ${
                  active
                    ? "border-ibd-blue bg-ibd-blue text-white"
                    : "border-line bg-white text-ink hover:border-ibd-blue/45 hover:bg-ibd-blue-soft/60"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      );
    }

    return (
      <div className="flex flex-wrap gap-2.5" role="group" aria-label="Help areas">
        {content.helpAreas.map((option) => {
          const active = helpId === option.id;
          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={active}
              onClick={() => setHelpId(option.id)}
              className={`${optionBase} ${
                active
                  ? "border-lekuka bg-lekuka text-white"
                  : "border-line bg-white text-ink hover:border-lekuka/50 hover:bg-lekuka-soft/60"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <Slide theme="light" eyebrow={eyebrow} title={title} note={content.disclaimer}>
      <div className="grid gap-5 lg:grid-cols-[1.15fr_1fr] lg:gap-7">
        <div className="flex flex-col gap-5">
          <ol className="flex flex-wrap items-center gap-2" aria-label="Assessment steps">
            {content.steps.map((s, i) => {
              const active = i === step;
              const complete = i < step;
              return (
                <li key={s.key}>
                  <button
                    type="button"
                    onClick={() => setStep(i)}
                    aria-current={active ? "step" : undefined}
                    className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] transition ${
                      active
                        ? "border-ibd-blue bg-ibd-blue text-white"
                        : complete
                          ? "border-lekuka/40 bg-lekuka-soft text-lekuka-deep"
                          : "border-line bg-white text-muted"
                    }`}
                  >
                    <span
                      className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
                        active
                          ? "bg-white/20 text-white"
                          : complete
                            ? "bg-lekuka text-white"
                            : "bg-mist text-muted"
                      }`}
                    >
                      {complete ? "✓" : i + 1}
                    </span>
                    Step {i + 1}
                  </button>
                </li>
              );
            })}
          </ol>

          <div className="rounded-2xl border border-line-soft bg-white p-5 shadow-[0_24px_55px_-40px_rgba(15,27,51,0.6)] sm:p-6">
            <h3 className="font-display text-[clamp(1.05rem,1.6vw,1.4rem)] font-bold text-ink">
              {content.steps[step].question}
            </h3>
            <p className="mt-1 text-sm text-muted">{content.steps[step].hint}</p>

            <div className="mt-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
                  transition={{ duration: reduce ? 0.1 : 0.25 }}
                >
                  {renderOptions()}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-line-soft pt-4">
              <button
                type="button"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-ink transition hover:border-ibd-blue/40 hover:text-ibd-blue disabled:opacity-35"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Back
              </button>

              {step < 2 ? (
                <button
                  type="button"
                  onClick={() => canAdvance && setStep((s) => Math.min(2, s + 1))}
                  disabled={!canAdvance}
                  className="inline-flex items-center gap-2 rounded-full bg-ibd-blue px-5 py-2 text-sm font-semibold text-white transition hover:bg-ibd-blue/90 disabled:cursor-not-allowed disabled:opacity-35"
                >
                  Continue
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              ) : null}

              <button
                type="button"
                onClick={reset}
                className="ml-auto inline-flex items-center gap-2 text-sm font-semibold text-muted transition hover:text-ibd-red"
              >
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                Start over
              </button>
            </div>
          </div>
        </div>

        <div className="lg:sticky lg:top-0">
          <AnimatePresence mode="wait">
            {done ? (
              <motion.div
                key="result"
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduce ? 0.1 : 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="h-full rounded-2xl border border-lekuka/35 bg-gradient-to-br from-[#063a2a] to-[#0b1736] p-5 text-white shadow-[0_36px_70px_-45px_rgba(7,138,88,0.9)] sm:p-6"
              >
                <div className="flex items-center gap-2.5">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-lekuka text-white">
                    <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-lekuka-bright">
                    {content.resultTitle}
                  </p>
                </div>

                <p className="font-display mt-4 text-[clamp(1.05rem,1.6vw,1.4rem)] font-bold leading-snug">
                  {content.recommendations[helpId ?? "assessment"]}
                </p>

                <dl className="mt-5 space-y-2.5 border-t border-white/10 pt-4 text-sm">
                  <div className="flex gap-3">
                    <dt className="w-28 shrink-0 text-white/45">System</dt>
                    <dd className="font-medium text-white">{system?.label ?? "—"}</dd>
                  </div>
                  <div className="flex gap-3">
                    <dt className="w-28 shrink-0 text-white/45">Invoicing</dt>
                    <dd className="font-medium text-white">{method?.label ?? "—"}</dd>
                  </div>
                  <div className="flex gap-3">
                    <dt className="w-28 shrink-0 text-white/45">Focus</dt>
                    <dd className="font-medium text-white">{help?.label ?? "—"}</dd>
                  </div>
                </dl>

                <p className="mt-5 rounded-xl bg-white/8 p-3 text-xs leading-relaxed text-white/60">
                  IBD would validate these answers in a short discovery conversation
                  before recommending a compliance path. Specific requirements are
                  subject to applicable RSL requirements.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="starting"
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduce ? 0.1 : 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="card-light h-full rounded-2xl p-5 sm:p-6"
              >
                <div className="flex items-center gap-2.5">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-ibd-red-soft text-ibd-red">
                    <Compass className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-ibd-red">
                    Your starting point
                  </p>
                </div>

                <AnimatePresence mode="wait">
                  {system ? (
                    <motion.div
                      key={system.id}
                      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: reduce ? 0.1 : 0.28 }}
                    >
                      <h3 className="font-display mt-4 text-[clamp(1.1rem,1.7vw,1.5rem)] font-bold text-ink">
                        {system.label}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink/80 sm:text-[15px]">
                        {system.startingPoint}
                      </p>
                      <div className="mt-4 rounded-xl bg-mist p-4">
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
                          How IBD would approach it
                        </p>
                        <p className="mt-1.5 text-sm leading-relaxed text-muted">
                          {system.note}
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <p className="font-display mt-4 text-[clamp(1.1rem,1.7vw,1.5rem)] font-bold leading-snug text-ink">
                        Select the platform you use today.
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-muted">
                        Every business starts somewhere different. Choose an option to
                        see the assessment starting point IBD would use for that
                        environment — no system is assumed to integrate in the same way.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Slide>
  );
}
