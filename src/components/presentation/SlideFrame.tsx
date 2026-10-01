import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { BasothoBand, GridSheen, MountainRidge } from "@/components/decor/Decor";

export type SlideTheme = "dark" | "light" | "mist" | "green";

const PAD_X =
  "px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-24";

function SlideDecor({ theme }: { theme: SlideTheme }) {
  const dark = theme === "dark" || theme === "green";
  return (
    <>
      {dark ? <GridSheen className="pointer-events-none absolute inset-0" /> : null}
      <MountainRidge
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[26%] w-full"
        opacity={dark ? 0.55 : 0.07}
      />
      <BasothoBand
        className={`pointer-events-none absolute inset-x-0 bottom-0 h-6 ${
          dark ? "text-white/12" : "text-ibd-blue/10"
        }`}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-[-8%] h-72 w-72 rounded-full blur-3xl"
        style={{
          background: dark
            ? "rgba(237,28,36,0.18)"
            : "rgba(7,138,88,0.10)",
        }}
      />
    </>
  );
}

interface SlideProps {
  theme: SlideTheme;
  eyebrow?: string;
  title?: string;
  subtitle?: ReactNode;
  children: ReactNode;
  note?: string;
  headerAlign?: "left" | "center";
  titleSize?: "display" | "default";
  bodyClassName?: string;
}

export function Slide({
  theme,
  eyebrow,
  title,
  subtitle,
  children,
  note,
  headerAlign = "left",
  titleSize = "default",
  bodyClassName,
}: SlideProps) {
  const dark = theme === "dark" || theme === "green";
  const align = headerAlign === "center" ? "text-center items-center" : "text-left items-start";

  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const colRef = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState<{ scale: number; height: number | null }>({
    scale: 1,
    height: null,
  });

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const scroll = scrollRef.current;
    const col = colRef.current;
    if (!section || !scroll || !col) return;

    let raf = 0;
    const compute = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const natural = col.offsetHeight;
        if (!natural) return;
        const cs = getComputedStyle(scroll);
        const avail =
          scroll.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
        if (avail <= 0) return;
        const fits = window.innerWidth >= 1024;
        const scale = fits ? Math.min(1, avail / natural) : 1;
        const height = natural * scale;
        setFit((prev) => {
          if (
            prev.height !== null &&
            Math.abs(prev.scale - scale) < 0.003 &&
            Math.abs(prev.height - height) < 1
          ) {
            return prev;
          }
          return { scale, height };
        });
      });
    };

    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(col);
    ro.observe(section);
    window.addEventListener("resize", compute);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", compute);
    };
  }, [children]);

  return (
    <section
      ref={sectionRef}
      className={`slide-surface slide-surface--${theme} relative h-full w-full`}
      aria-label={title ?? "Slide"}
    >
      <SlideDecor theme={theme} />

      <div
        ref={scrollRef}
        className="deck-scroll relative z-10 flex h-full w-full flex-col overflow-y-auto"
      >
        <div
          ref={boxRef}
          className="my-auto w-full shrink-0 overflow-hidden"
          style={{
            height: fit.height ?? undefined,
          }}
        >
        <div
          ref={colRef}
          className={`flex w-full flex-col ${PAD_X}`}
          style={{
            transform: fit.scale < 1 ? `scale(${fit.scale})` : undefined,
            transformOrigin: "top center",
          }}
        >
          {eyebrow || title || subtitle ? (
            <header className={`flex shrink-0 flex-col pt-6 sm:pt-8 lg:pt-10 ${align}`}>
              {eyebrow ? (
                <div
                  className={`flex items-center gap-3 ${
                    headerAlign === "center" ? "justify-center" : ""
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`h-px w-6 sm:w-8 ${
                      theme === "green" ? "bg-lekuka-bright" : "bg-ibd-red"
                    }`}
                  />
                  <span
                    className={`text-[10px] font-semibold uppercase tracking-[0.28em] sm:text-[11px] ${
                      dark ? "text-white/75" : "text-ibd-red"
                    }`}
                  >
                    {eyebrow}
                  </span>
                </div>
              ) : null}

              {title ? (
                <h2
                  className={`font-display mt-3 max-w-[22ch] text-balance font-extrabold leading-[1.03] tracking-[-0.02em] ${
                    headerAlign === "center" ? "max-w-[26ch]" : ""
                  } ${
                    titleSize === "display"
                      ? "text-[clamp(2rem,4.4vw,3.6rem)]"
                      : "text-[clamp(1.5rem,3vw,2.75rem)]"
                  }`}
                >
                  {title}
                </h2>
              ) : null}

              {subtitle ? (
                <p
                  className={`mt-3 max-w-[70ch] text-[clamp(0.95rem,1.15vw,1.2rem)] leading-relaxed ${
                    dark ? "text-white/70" : "text-muted"
                  }`}
                >
                  {subtitle}
                </p>
              ) : null}
            </header>
          ) : null}

          <div
            className={`deck-body pt-5 pb-4 sm:pt-6 lg:pt-7 ${bodyClassName ?? ""}`}
          >
            {children}
          </div>

          {note ? (
            <p
              className={`shrink-0 border-t py-3 text-[11px] leading-snug sm:text-xs ${
                dark ? "border-white/10 text-white/45" : "border-line-soft text-muted/85"
              }`}
            >
              <span className="mr-1.5 font-semibold uppercase tracking-[0.16em]">
                Note
              </span>
              {note}
            </p>
          ) : null}
        </div>
      </div>
      </div>
    </section>
  );
}
