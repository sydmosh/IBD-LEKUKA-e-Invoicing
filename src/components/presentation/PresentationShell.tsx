"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Keyboard,
  Maximize2,
  Minimize2,
  NotebookPen,
  Presentation,
} from "lucide-react";

import { slides } from "@/data/slides";
import type { AssetFlags } from "@/data/assets";
import { event } from "@/data/company";

import { SlideRenderer } from "./SlideRenderer";
import { ProgressBar } from "./ProgressBar";
import { SlideCounter } from "./SlideCounter";
import { SlideNavigation } from "./SlideNavigation";
import { SpeakerNotes } from "./SpeakerNotes";
import { KeyboardHelp } from "./KeyboardHelp";

const total = slides.length;

interface PresentationShellProps {
  initialPresenting?: boolean;
  assetFlags: AssetFlags;
}

export function PresentationShell({
  initialPresenting = false,
  assetFlags,
}: PresentationShellProps) {
  const reduce = useReducedMotion();
  const router = useRouter();
  const pathname = usePathname();

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [notesOpen, setNotesOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [presenting, setPresenting] = useState(initialPresenting);

  const indexRef = useRef(0);
  const presentingRef = useRef(initialPresenting);
  const fsEnteredRef = useRef(false);
  const touchRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    presentingRef.current = presenting;
  }, [presenting]);

  const goTo = useCallback((next: number) => {
    const clamped = Math.max(0, Math.min(total - 1, next));
    if (clamped === indexRef.current) return;
    setDirection(clamped > indexRef.current ? 1 : -1);
    indexRef.current = clamped;
    setIndex(clamped);
  }, []);

  const next = useCallback(() => goTo(indexRef.current + 1), [goTo]);
  const prev = useCallback(() => goTo(indexRef.current - 1), [goTo]);

  const enterPresentation = useCallback(async () => {
    setPresenting(true);
    try {
      if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
        fsEnteredRef.current = true;
      }
    } catch {
      /* fullscreen is optional */
    }
  }, []);

  const exitPresentation = useCallback(async () => {
    setPresenting(false);
    try {
      if (document.fullscreenElement && document.exitFullscreen) {
        await document.exitFullscreen();
      }
    } catch {
      /* ignore */
    }
    fsEnteredRef.current = false;
    if (pathname === "/present") router.push("/");
  }, [pathname, router]);

  const togglePresentation = useCallback(() => {
    if (presentingRef.current) void exitPresentation();
    else void enterPresentation();
  }, [enterPresentation, exitPresentation]);

  useEffect(() => {
    const onFullscreenChange = () => {
      if (!document.fullscreenElement && fsEnteredRef.current) {
        fsEnteredRef.current = false;
        setPresenting(false);
        if (window.location.pathname === "/present") router.push("/");
      }
    };
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, [router]);

  useEffect(() => {
    const onKeyDown = (event_: KeyboardEvent) => {
      const target = event_.target as HTMLElement | null;
      const tag = target?.tagName?.toLowerCase();
      const isField =
        tag === "input" ||
        tag === "textarea" ||
        tag === "select" ||
        Boolean(target?.isContentEditable);
      const isInteractive = Boolean(
        target?.closest?.("a, button, [role='button'], [role='checkbox'], [role='tab'], [role='switch']")
      );

      const scroller = target?.closest?.(".deck-scroll") as HTMLElement | null;
      const canScroll = (dir: 1 | -1) => {
        if (!scroller) return false;
        const room = scroller.scrollHeight - scroller.clientHeight;
        if (room < 4) return false;
        return dir === 1
          ? scroller.scrollTop < room - 2
          : scroller.scrollTop > 2;
      };

      switch (event_.key) {
        case "ArrowRight":
        case "PageDown":
          if (isField) return;
          event_.preventDefault();
          next();
          break;
        case "ArrowDown":
          if (isField || canScroll(1)) return;
          event_.preventDefault();
          next();
          break;
        case " ":
          if (isField || isInteractive) return;
          event_.preventDefault();
          next();
          break;
        case "ArrowLeft":
        case "PageUp":
          if (isField) return;
          event_.preventDefault();
          prev();
          break;
        case "ArrowUp":
          if (isField || canScroll(-1)) return;
          event_.preventDefault();
          prev();
          break;
        case "Home":
          if (isField) return;
          event_.preventDefault();
          goTo(0);
          break;
        case "End":
          if (isField) return;
          event_.preventDefault();
          goTo(total - 1);
          break;
        case "n":
        case "N":
          if (isField) return;
          setNotesOpen((open) => !open);
          break;
        case "f":
        case "F":
          if (isField || isInteractive) return;
          togglePresentation();
          break;
        case "?":
          setHelpOpen((open) => !open);
          break;
        case "Escape":
          if (helpOpen) setHelpOpen(false);
          else if (notesOpen) setNotesOpen(false);
          else if (presentingRef.current) void exitPresentation();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goTo, next, prev, helpOpen, notesOpen, togglePresentation, exitPresentation]);

  const onTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchRef.current;
    touchRef.current = null;
    if (!start) return;
    const touch = e.changedTouches[0];
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    if (Math.abs(dx) > 64 && Math.abs(dx) > Math.abs(dy) * 1.4) {
      if (dx < 0) next();
      else prev();
    }
  };

  const slide = slides[index];
  const chromeDark = presenting;

  const enter = reduce
    ? { opacity: 0 }
    : { opacity: 0, x: direction > 0 ? 56 : -56 };
  const center = { opacity: 1, x: 0 };
  const exit = reduce
    ? { opacity: 0 }
    : { opacity: 0, x: direction > 0 ? -56 : 56 };

  return (
    <div className="flex h-[100dvh] flex-col overflow-hidden bg-mist">
      {presenting ? null : (
        <header className="relative z-30 shrink-0 border-b border-line bg-white/90 backdrop-blur">
          <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 py-2.5 sm:px-6 lg:px-10">
            <Link
              href="/"
              className="flex min-w-0 items-center gap-3"
              aria-label="Infinity Business Dynamics — presentation home"
            >
              <Image
                src="/logo-ibd-white.png"
                alt="Infinity Business Dynamics"
                width={1080}
                height={278}
                className="h-7 w-auto sm:h-8"
              />
              <span className="hidden truncate text-[11px] font-semibold uppercase tracking-[0.2em] text-muted md:inline">
                {event.title} {event.titleSuffix} · {event.eyebrow}
              </span>
            </Link>

            <nav
              aria-label="Site"
              className="flex items-center gap-1 sm:gap-2"
            >
              <Link
                href="/about"
                className="hidden rounded-full px-3 py-1.5 text-[13px] font-semibold text-muted transition hover:bg-mist hover:text-ink sm:inline-block"
              >
                About
              </Link>
              <Link
                href="/services"
                className="hidden rounded-full px-3 py-1.5 text-[13px] font-semibold text-muted transition hover:bg-mist hover:text-ink sm:inline-block"
              >
                Services
              </Link>
              <Link
                href="/contact"
                className="hidden rounded-full px-3 py-1.5 text-[13px] font-semibold text-muted transition hover:bg-mist hover:text-ink sm:inline-block"
              >
                Contact
              </Link>
              <button
                type="button"
                onClick={() => void enterPresentation()}
                className="inline-flex items-center gap-2 rounded-full bg-ibd-blue px-3.5 py-2 text-[13px] font-semibold text-white transition hover:bg-ibd-blue/90 sm:px-4"
              >
                <Presentation className="h-4 w-4" aria-hidden="true" />
                Present
              </button>
            </nav>
          </div>
        </header>
      )}

      <main
        className="relative min-h-0 flex-1"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        aria-label="Presentation slides"
      >
        <ProgressBar index={index} total={total} dark={chromeDark} />

        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.div
            key={slide.id}
            custom={direction}
            initial={enter}
            animate={center}
            exit={exit}
            transition={{
              duration: reduce ? 0.15 : 0.42,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute inset-0"
          >
            <SlideRenderer slide={slide} assetFlags={assetFlags} />
          </motion.div>
        </AnimatePresence>

        <SpeakerNotes
          open={notesOpen}
          title={`${String(index + 1).padStart(2, "0")} · ${slide.title}`}
          notes={slide.speakerNotes}
          onClose={() => setNotesOpen(false)}
        />

        <KeyboardHelp open={helpOpen} onClose={() => setHelpOpen(false)} />
      </main>

      <footer
        className={`relative z-30 shrink-0 border-t transition-colors ${
          chromeDark
            ? "border-white/10 bg-[#080f22]/95 backdrop-blur"
            : "border-line bg-white/90 backdrop-blur"
        }`}
      >
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-2.5 sm:px-6 lg:px-10">
          <SlideCounter
            index={index}
            total={total}
            label={slide.eyebrow}
            dark={chromeDark}
          />

          <div className="order-3 w-full sm:order-none sm:w-auto">
            <SlideNavigation
              index={index}
              total={total}
              dark={chromeDark}
              onPrev={prev}
              onNext={next}
              onSelect={goTo}
            />
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setNotesOpen((open) => !open)}
              aria-pressed={notesOpen}
              aria-label="Toggle speaker notes"
              title="Speaker notes (N)"
              className={`inline-flex h-9 items-center gap-2 rounded-full border px-3 text-[12px] font-semibold transition ${
                chromeDark
                  ? "border-white/15 text-white/75 hover:border-white/35 hover:text-white"
                  : "border-line text-muted hover:border-ibd-blue/40 hover:text-ibd-blue"
              } ${notesOpen ? (chromeDark ? "bg-white/12" : "bg-ibd-blue-soft text-ibd-blue") : ""}`}
            >
              <NotebookPen className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">Notes</span>
            </button>

            <button
              type="button"
              onClick={() => setHelpOpen(true)}
              aria-label="Show keyboard shortcuts"
              title="Keyboard shortcuts (?)"
              className={`inline-flex h-9 w-9 items-center justify-center rounded-full border transition ${
                chromeDark
                  ? "border-white/15 text-white/75 hover:border-white/35 hover:text-white"
                  : "border-line text-muted hover:border-ibd-blue/40 hover:text-ibd-blue"
              }`}
            >
              <Keyboard className="h-4 w-4" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={togglePresentation}
              aria-label={presenting ? "Exit presentation mode" : "Enter presentation mode"}
              title={presenting ? "Exit presentation (Esc)" : "Present (F)"}
              className={`inline-flex h-9 items-center gap-2 rounded-full border px-3 text-[12px] font-semibold transition ${
                chromeDark
                  ? "border-white/15 text-white/75 hover:border-white/35 hover:text-white"
                  : "border-line text-muted hover:border-ibd-blue/40 hover:text-ibd-blue"
              }`}
            >
              {presenting ? (
                <Minimize2 className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Maximize2 className="h-4 w-4" aria-hidden="true" />
              )}
              <span className="hidden sm:inline">
                {presenting ? "Exit" : "Fullscreen"}
              </span>
            </button>
          </div>
        </div>

        {presenting ? null : (
          <div className="mx-auto hidden max-w-[1600px] px-6 pb-2 text-[11px] text-muted lg:block lg:px-10">
            <span className="rounded border border-line bg-mist px-1.5 py-0.5">←</span>{" "}
            <span className="rounded border border-line bg-mist px-1.5 py-0.5">→</span>{" "}
            navigate ·{" "}
            <span className="rounded border border-line bg-mist px-1.5 py-0.5">N</span>{" "}
            speaker notes ·{" "}
            <span className="rounded border border-line bg-mist px-1.5 py-0.5">F</span>{" "}
            fullscreen ·{" "}
            <span className="rounded border border-line bg-mist px-1.5 py-0.5">?</span>{" "}
            all shortcuts
          </div>
        )}
      </footer>
    </div>
  );
}
