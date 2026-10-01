import Image from "next/image";
import Link from "next/link";
import { company, event } from "@/data/company";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto grid max-w-[1200px] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <Image
            src="/logo-ibd-white.png"
            alt="Infinity Business Dynamics"
            width={1080}
            height={278}
            className="h-9 w-auto"
          />
          <p className="mt-4 max-w-[46ch] text-sm leading-relaxed text-muted">
            Infinity Business Dynamics (IBD) is an ICT, finance, tax-compliance,
            business-intelligence and systems-integration company operating from
            Lesotho and serving Southern Africa. {company.partnerBadge}.
          </p>
          <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-lekuka-soft px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-lekuka-deep">
            {company.partnerBadge}
          </p>
        </div>

        <nav aria-label="Presentation">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted">
            This session
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/" className="font-medium text-ink transition hover:text-ibd-red">
                Presentation deck
              </Link>
            </li>
            <li>
              <Link href="/present" className="font-medium text-ink transition hover:text-ibd-red">
                Full-screen presentation
              </Link>
            </li>
            <li>
              <Link href="/services" className="font-medium text-ink transition hover:text-ibd-red">
                Services
              </Link>
            </li>
            <li>
              <Link href="/contact" className="font-medium text-ink transition hover:text-ibd-red">
                Contact IBD
              </Link>
            </li>
          </ul>
          <p className="mt-4 text-sm text-muted">
            {event.date}
            <br />
            {event.time}
          </p>
        </nav>

        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted">
            Contact
          </p>
          <address className="mt-3 space-y-2 text-sm not-italic text-muted">
            {company.addressLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
            <a
              href={company.mailto}
              className="block font-medium text-ink transition hover:text-ibd-red"
            >
              {company.email}
            </a>
            <a
              href={`tel:${company.phone.replace(/\s/g, "")}`}
              className="block font-medium text-ink transition hover:text-ibd-red"
            >
              {company.phone}
            </a>
            <a
              href={company.website}
              target="_blank"
              rel="noopener noreferrer"
              className="block font-medium text-ink transition hover:text-ibd-red"
            >
              {company.websiteLabel}
            </a>
          </address>
        </div>
      </div>

      <div className="border-t border-line-soft py-4 text-center text-xs text-muted">
        © 2026 {company.name}. All rights reserved.
      </div>
    </footer>
  );
}
