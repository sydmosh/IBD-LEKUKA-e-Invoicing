import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Building2, MapPin, ShieldCheck, Sparkles } from "lucide-react";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { SiteFooter } from "@/components/shared/SiteFooter";
import { company, event } from "@/data/company";

export const metadata: Metadata = {
  title: "About IBD · LEKUKA e-Invoicing Awareness Session",
  description:
    "Infinity Business Dynamics is an ICT, finance, tax-compliance, business-intelligence and systems-integration company operating from Lesotho and serving Southern Africa.",
};

const pillars = [
  {
    icon: Sparkles,
    title: "Technology + Finance",
    body: "ICT combined with accounting, tax and business-intelligence expertise under one roof.",
  },
  {
    icon: ShieldCheck,
    title: company.partnerBadge,
    body: "Official Revenue Services Lesotho certified Lekuka partner for e-invoicing compliance.",
  },
  {
    icon: Building2,
    title: "Southern Africa focus",
    body: "Operating from Maseru, Lesotho and supporting organisations across the region.",
  },
];

const stats: [string, string][] = [
  ["500+", "Clients served"],
  ["15+", "Years of excellence"],
  ["99.9%", "System uptime"],
  ["8", "Countries supported"],
];

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="border-b border-line bg-gradient-to-b from-white to-mist">
          <div className="mx-auto max-w-[1200px] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-8 bg-ibd-red" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-ibd-red">
                About the organiser
              </span>
            </div>
            <h1 className="font-display mt-4 max-w-[18ch] text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-[1.03] tracking-[-0.02em] text-ink">
              Infinity Business Dynamics
            </h1>
            <p className="mt-5 max-w-[68ch] text-[17px] leading-relaxed text-muted">
              IBD is an ICT, finance, tax-compliance, business-intelligence and
              systems-integration company operating from Lesotho and serving Southern
              Africa — and an RSL Certified Lekuka Partner.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full bg-ibd-blue px-5 py-3 text-sm font-semibold text-white transition hover:bg-ibd-blue/90"
              >
                Open the presentation
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-5 py-3 text-sm font-semibold text-ink transition hover:border-ibd-blue/40 hover:text-ibd-blue"
              >
                Visit {company.websiteLabel}
              </a>
            </div>

            <dl className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {stats.map(([value, label]) => (
                <div
                  key={label}
                  className="card-light rounded-2xl p-5"
                >
                  <dt className="sr-only">{label}</dt>
                  <dd>
                    <span className="font-display block text-3xl font-extrabold tabular-nums text-ibd-blue">
                      {value}
                    </span>
                    <span className="mt-1 block text-[13px] font-medium text-muted">
                      {label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="mx-auto max-w-[1200px] px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-5 md:grid-cols-3">
            {pillars.map((pillar) => (
              <article key={pillar.title} className="card-light rounded-2xl p-6">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-ibd-blue-soft text-ibd-blue">
                  <pillar.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h2 className="font-display mt-4 text-lg font-bold text-ink">
                  {pillar.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">{pillar.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-t border-line bg-white">
          <div className="mx-auto grid max-w-[1200px] gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_1fr] lg:items-center lg:px-8">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-ibd-red">
                The session
              </span>
              <h2 className="font-display mt-3 text-[clamp(1.5rem,3vw,2.4rem)] font-extrabold leading-tight text-ink">
                {event.title} {event.titleSuffix} — {event.eyebrow}
              </h2>
              <p className="font-display mt-3 text-lg font-semibold text-lekuka">
                {event.theme[0]} {event.theme[1]}
              </p>
              <p className="mt-4 flex items-center gap-2 text-sm text-muted">
                <MapPin className="h-4 w-4 text-ibd-red" aria-hidden="true" />
                {event.date} · {event.time} · Virtual
              </p>
              <Link
                href="/"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-ibd-red px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#d8161d]"
              >
                View the presentation
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="relative overflow-hidden rounded-3xl border border-line bg-mist p-6">
              <Image
                src="/images/ibd-integrations-poster.jpg"
                alt="IBD unifies your business systems with Lekuka — event poster"
                width={922}
                height={1152}
                className="mx-auto h-auto w-full max-w-[320px] rounded-2xl shadow-xl ring-1 ring-black/5"
              />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
