"use client";

interface SlideCounterProps {
  index: number;
  total: number;
  label?: string;
  dark?: boolean;
}

export function SlideCounter({
  index,
  total,
  label,
  dark = false,
}: SlideCounterProps) {
  const current = String(index + 1).padStart(2, "0");
  const totalPadded = String(total).padStart(2, "0");

  return (
    <div className="flex min-w-0 items-baseline gap-3">
      <p
        className={`font-display text-lg font-extrabold tabular-nums tracking-tight sm:text-xl ${
          dark ? "text-white" : "text-ink"
        }`}
        aria-live="polite"
      >
        {current}
        <span
          className={`ml-1 text-xs font-semibold tabular-nums sm:text-sm ${
            dark ? "text-white/45" : "text-muted"
          }`}
        >
          / {totalPadded}
        </span>
      </p>
      {label ? (
        <span
          className={`hidden truncate text-xs font-medium uppercase tracking-[0.18em] sm:inline ${
            dark ? "text-white/45" : "text-muted"
          }`}
        >
          {label}
        </span>
      ) : null}
    </div>
  );
}
