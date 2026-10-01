"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Presentation } from "lucide-react";
import { event } from "@/data/company";

const links = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <Image
            src="/logo-ibd-white.png"
            alt="Infinity Business Dynamics"
            width={1080}
            height={278}
            className="h-8 w-auto"
          />
          <span className="hidden text-[11px] font-semibold uppercase tracking-[0.2em] text-muted lg:inline">
            {event.title} {event.titleSuffix}
          </span>
        </Link>

        <nav aria-label="Primary" className="flex items-center gap-1 sm:gap-2">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-full px-3 py-1.5 text-[13px] font-semibold transition ${
                  active
                    ? "bg-ibd-blue-soft text-ibd-blue"
                    : "text-muted hover:bg-mist hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-ibd-red px-3.5 py-2 text-[13px] font-semibold text-white transition hover:bg-[#d8161d]"
          >
            <Presentation className="h-4 w-4" aria-hidden="true" />
            View deck
          </Link>
        </nav>
      </div>
    </header>
  );
}
