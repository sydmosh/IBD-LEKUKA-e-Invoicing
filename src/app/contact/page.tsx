import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  Globe,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { SiteFooter } from "@/components/shared/SiteFooter";
import { company, event } from "@/data/company";

export const metadata: Metadata = {
  title: "Contact · LEKUKA e-Invoicing Awareness Session | IBD",
  description:
    "Contact Infinity Business Dynamics in Maseru, Lesotho to discuss Lekuka e-Invoicing assessment, integration and support.",
};

const actions = [
  {
    label: "Request a Lekuka Assessment",
    href: `${company.mailto}?subject=Lekuka%20Assessment%20Request`,
    primary: true,
  },
  {
    label: "Discuss Integration",
    href: `${company.mailto}?subject=Integration%20Discussion`,
    primary: false,
  },
  {
    label: "Request a Demo",
    href: company.motheoDemo,
    primary: false,
  },
  { label: "WhatsApp IBD", href: company.whatsapp, primary: false },
];

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="border-b border-line bg-gradient-to-b from-white to-mist">
          <div className="mx-auto max-w-[1200px] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-8 bg-ibd-red" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-ibd-red">
                Next steps
              </span>
            </div>
            <h1 className="font-display mt-4 max-w-[18ch] text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-[1.03] tracking-[-0.02em] text-ink">
              Is your business ready for Lekuka?
            </h1>
            <p className="mt-5 max-w-[66ch] text-[17px] leading-relaxed text-muted">
              Know your current system, assess your invoicing process, prepare your
              data, confirm your integration path, test before going live — and have
              support available.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {actions.map((action) => (
                <a
                  key={action.label}
                  href={action.href}
                  target={action.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    action.href.startsWith("http") ? "noopener noreferrer" : undefined
                  }
                  className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition ${
                    action.primary
                      ? "bg-ibd-red text-white shadow-[0_20px_40px_-24px_rgba(237,28,36,0.95)] hover:bg-[#d8161d]"
                      : "border border-line bg-white text-ink hover:border-ibd-blue/40 hover:text-ibd-blue"
                  }`}
                >
                  {action.label}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1200px] px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-5 lg:grid-cols-[1.1fr_1fr]">
            <div className="card-light rounded-3xl p-7 sm:p-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-muted">
                Infinity Business Dynamics
              </p>
              <ul className="mt-5 space-y-4 text-[15px]">
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-ibd-red" aria-hidden="true" />
                  <span className="text-muted">
                    {company.addressLines.map((line) => (
                      <span key={line} className="block text-ink">
                        {line}
                      </span>
                    ))}
                  </span>
                </li>
                <li className="flex gap-3">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-ibd-red" aria-hidden="true" />
                  <a
                    href={company.mailto}
                    className="font-medium text-ink transition hover:text-ibd-red"
                  >
                    {company.email}
                  </a>
                </li>
                <li className="flex gap-3">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-ibd-red" aria-hidden="true" />
                  <a
                    href={`tel:${company.phone.replace(/\s/g, "")}`}
                    className="font-medium text-ink transition hover:text-ibd-red"
                  >
                    {company.phone}
                  </a>
                </li>
                <li className="flex gap-3">
                  <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-ibd-red" aria-hidden="true" />
                  <a
                    href={company.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-ink transition hover:text-ibd-red"
                  >
                    Message IBD on WhatsApp
                  </a>
                </li>
                <li className="flex gap-3">
                  <Globe className="mt-0.5 h-5 w-5 shrink-0 text-ibd-red" aria-hidden="true" />
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-ink transition hover:text-ibd-red"
                  >
                    {company.websiteLabel}
                  </a>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-5">
              <div className="rounded-3xl border border-lekuka/30 bg-lekuka-soft/70 p-7">
                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-lekuka-deep">
                  {event.eyebrow}
                </p>
                <h2 className="font-display mt-3 text-2xl font-extrabold leading-tight text-ink">
                  {event.title} {event.titleSuffix}
                </h2>
                <p className="font-display mt-2 text-base font-semibold text-lekuka-deep">
                  {event.theme[0]} {event.theme[1]}
                </p>
                <ul className="mt-4 space-y-2 text-sm text-ink/80">
                  <li className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-lekuka" aria-hidden="true" />
                    {event.date}
                  </li>
                  <li className="flex items-center gap-2">
                    <Clock3 className="h-4 w-4 text-lekuka" aria-hidden="true" />
                    {event.time}
                  </li>
                </ul>
                <Link
                  href="/"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-ibd-blue px-5 py-3 text-sm font-semibold text-white transition hover:bg-ibd-blue/90"
                >
                  Go to the presentation
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>

              <div className="rounded-3xl border border-line bg-white p-7">
                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-muted">
                  Before you contact us
                </p>
                <ol className="mt-4 space-y-2.5 text-sm text-muted">
                  <li>
                    <span className="font-display mr-2 font-bold text-ibd-blue">01</span>
                    Know the system you use today
                  </li>
                  <li>
                    <span className="font-display mr-2 font-bold text-ibd-blue">02</span>
                    Note how invoices are issued
                  </li>
                  <li>
                    <span className="font-display mr-2 font-bold text-ibd-blue">03</span>
                    Have a recent sample invoice handy
                  </li>
                </ol>
                <p className="mt-4 text-xs leading-relaxed text-muted">
                  Specific requirements remain subject to applicable RSL requirements.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
