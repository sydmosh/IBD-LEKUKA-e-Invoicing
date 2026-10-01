"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface SlideNavigationProps {
  index: number;
  total: number;
  dark?: boolean;
  onPrev: () => void;
  onNext: () => void;
  onSelect?: (i: number) => void;
}

export function SlideNavigation({
  index,
  total,
  dark = false,
  onPrev,
  onNext,
  onSelect,
}: SlideNavigationProps) {
  const btnBase =
    "inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-35 sm:h-11 sm:w-11";
  const btnSkin = dark
    ? "border-white/15 bg-white/8 text-white hover:border-white/35 hover:bg-white/15"
    : "border-line bg-white text-ink hover:border-ibd-blue/40 hover:text-ibd-blue";

  return (
    <div className="flex items-center gap-3">
      <nav aria-label="Slide navigation" className="flex items-center gap-2">
        <button
          type="button"
          onClick={onPrev}
          disabled={index === 0}
          aria-label="Previous slide"
          className={`${btnBase} ${btnSkin}`}
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={index === total - 1}
          aria-label="Next slide"
          className={`${btnBase} ${btnSkin}`}
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </nav>

      {onSelect ? (
        <div
          className="hidden items-center gap-[3px] md:flex"
          role="tablist"
          aria-label="Jump to slide"
        >
          {Array.from({ length: total }).map((_, i) => {
            const active = i === index;
            return (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={active}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => onSelect(i)}
                className={`h-6 rounded-full px-[2px] transition-colors ${
                  dark ? "hover:bg-white/20" : "hover:bg-ibd-blue/15"
                }`}
              >
                <span
                  className={`block h-[3px] w-3 rounded-full transition-all duration-300 ${
                    active
                      ? dark
                        ? "w-6 bg-lekuka"
                        : "w-6 bg-ibd-red"
                      : dark
                        ? "bg-white/25"
                        : "bg-ibd-blue/25"
                  }`}
                />
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
