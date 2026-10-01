"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { NotebookPen, X } from "lucide-react";

interface SpeakerNotesProps {
  open: boolean;
  title: string;
  notes: string;
  onClose: () => void;
}

export function SpeakerNotes({ open, title, notes, onClose }: SpeakerNotesProps) {
  const reduce = useReducedMotion();

  return (
    <AnimatePresence>
      {open ? (
        <motion.aside
          key="speaker-notes"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: reduce ? 0.15 : 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-x-0 bottom-0 z-50 max-h-[55%] overflow-hidden border-t border-white/12 bg-[#08101f]/96 shadow-[0_-24px_60px_-30px_rgba(0,0,0,0.9)] backdrop-blur-xl"
          aria-label="Speaker notes"
        >
          <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-3 sm:px-8">
            <div className="flex min-w-0 items-center gap-3">
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-lekuka/20 text-lekuka">
                <NotebookPen className="h-4 w-4" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/45">
                  Speaker notes
                </p>
                <p className="truncate font-display text-sm font-semibold text-white sm:text-base">
                  {title}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close speaker notes"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-white/35 hover:text-white"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div className="deck-scroll max-h-[38vh] overflow-y-auto px-5 py-4 sm:px-8 sm:py-5">
            <p className="max-w-[110ch] whitespace-pre-line text-sm leading-relaxed text-white/75">
              {notes.trim()}
            </p>
          </div>

          <div className="border-t border-white/10 px-5 py-2 text-[11px] text-white/35 sm:px-8">
            Press{" "}
            <kbd className="rounded border border-white/20 px-1.5 py-0.5 font-sans text-[10px] text-white/60">
              N
            </kbd>{" "}
            to hide ·{" "}
            <kbd className="rounded border border-white/20 px-1.5 py-0.5 font-sans text-[10px] text-white/60">
              Esc
            </kbd>{" "}
            to close
          </div>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}
