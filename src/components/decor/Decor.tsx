import type { CSSProperties } from "react";

/** Layered Maloti / Drakensberg ridge silhouette — used at the base of dark slides. */
export function MountainRidge({
  className,
  opacity = 1,
}: {
  className?: string;
  opacity?: number;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
      className={className}
      style={{ opacity }}
    >
      <defs>
        <linearGradient id="ridge-far" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#173063" />
          <stop offset="100%" stopColor="#0d1a3d" />
        </linearGradient>
        <linearGradient id="ridge-mid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0f5f47" />
          <stop offset="100%" stopColor="#0a2a3f" />
        </linearGradient>
        <linearGradient id="ridge-near" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#081226" />
          <stop offset="100%" stopColor="#050b19" />
        </linearGradient>
      </defs>
      <path
        fill="url(#ridge-far)"
        d="M0 214c46-10 78-38 118-56 44-20 76-8 116-24 42-17 62-58 108-66 44-8 74 22 116 18 40-4 62-40 104-46 44-6 70 26 112 30 40 4 66-24 106-30 44-7 74 25 116 34 40 8 70-12 108-26 40-15 78-16 118-6 40 10 76 34 118 40v108H0z"
      />
      <path
        fill="url(#ridge-mid)"
        opacity="0.85"
        d="M0 250c56-6 92-44 148-52 52-8 84 18 132 12 46-6 70-44 116-52 48-8 78 24 124 30 44 6 74-20 116-26 46-7 76 26 122 36 42 9 74-8 112-22 40-15 74-18 112-10 40 8 76 30 118 38 40 8 78 2 110 10v86H0z"
      />
      <path
        fill="url(#ridge-near)"
        d="M0 288c64-4 104-34 164-38 56-4 88 18 140 16 50-2 78-30 126-34 50-4 80 24 130 30 46 6 78-12 122-18 48-7 78 22 126 32 44 9 78 0 118-8 42-8 80-6 122 2 40 8 78 24 112 34v56H0z"
      />
    </svg>
  );
}

/** Basotho blanket inspired diamond band — subtle corporate texture, never decorative noise. */
export function BasothoBand({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      style={style}
      width="100%"
      height="100%"
      preserveAspectRatio="none"
      viewBox="0 0 240 40"
    >
      <defs>
        <pattern
          id="basotho-diamonds"
          x="0"
          y="0"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M20 3 37 20 20 37 3 20Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <path d="M20 12 28 20 20 28 12 20Z" fill="currentColor" opacity="0.55" />
          <path d="M0 0 6 6M40 0 34 6M0 40 6 34M40 40 34 34" stroke="currentColor" strokeWidth="1.2" />
        </pattern>
      </defs>
      <rect width="240" height="40" fill="url(#basotho-diamonds)" />
    </svg>
  );
}

/** Quiet grid used behind dark slide content. */
export function GridSheen({ className }: { className?: string }) {
  return <div aria-hidden="true" className={`grid-sheen ${className ?? ""}`} />;
}
