"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Keyboard, X } from "lucide-react";

const shortcuts: [string, string][] = [
  ["→  ↓  Space", "Next slide"],
  ["←  ↑", "Previous slide"],
  ["Home", "First slide"],
  ["End", "Last slide"],
  ["N", "Show / hide speaker notes"],
  ["F", "Enter / exit presentation mode"],
  ["Esc", "Close panel or exit presentation"],
  ["?", "Open this shortcut list"],
];

interface KeyboardHelpProps {
  open: boolean;
  onClose: () => void;
}

export function KeyboardHelp({ open, onClose }: KeyboardHelpProps) {
  const reduce = useReducedMotion();

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="absolute inset-0 z-[60] flex items-center justify-center bg-[#050b19]/70 px-5 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0.1 : 0.2 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Keyboard shortcuts"
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: reduce ? 0.1 : 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-line-soft px-6 py-4">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-ibd-blue text-white">
                  <Keyboard className="h-4 w-4" aria-hidden="true" />
                </span>
                <h2 className="font-display text-base font-bold text-ink">
                  Presentation shortcuts
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close keyboard shortcuts"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted transition hover:bg-mist hover:text-ink"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            <dl className="divide-y divide-line-soft px-6 py-2">
              {shortcuts.map(([keys, action]) => (
                <div key={keys} className="flex items-center justify-between gap-6 py-3">
                  <dt className="font-display text-[13px] font-semibold text-ink">
                    <kbd className="rounded-md border border-line bg-mist px-2 py-1">
                      {keys}
                    </kbd>
                  </dt>
                  <dd className="text-right text-sm text-muted">{action}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
