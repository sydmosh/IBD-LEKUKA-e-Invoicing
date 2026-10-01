import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Cable,
  ClipboardCheck,
  Code2,
  Monitor,
  Settings,
  ShieldCheck,
} from "lucide-react";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { SiteFooter } from "@/components/shared/SiteFooter";
import { company } from "@/data/company";

export const metadata: Metadata = {
  title: "Services · LEKUKA e-Invoicing Awareness Session | IBD",
  description:
    "Lekuka compliance, Motheo POS, ERP integration, ICT services, managed services and data analytics from Infinity Business Dynamics.",
};

const services = [
  {
    icon: ShieldCheck,
    title: "Motheo POS",
    tag: "Product",
    body: "IBD's RSL Certified Lekuka platform: point of sale, inventory, invoicing, reporting and compliance in one system.",
    href: company.motheo,
    external: true,
  },
  {
    icon: ClipboardCheck,
    title: "Lekuka Compliance",
    tag: "Compliance",
    body: "Preparation, configuration and support for the Lekuka e-invoicing environment, subject to applicable RSL requirements.",
    href: company.website + "services/lekuka-compliance",
    external: true,
  },
  {
    icon: Cable,
    title: "ERP Integration",
    tag: "Integration",
    body: "Connecting existing ERP, accounting and POS platforms to the compliance workflow where technically appropriate.",
    href: company.website + "services/erp-integration",
    external: true,
  },
  {
    icon: Code2,
    title: "Custom Solutions",
    tag: "Bespoke",
    body: "Bespoke software and integrations tailored to your business processes and data model.",
    href: company.website + "services/custom-solutions",
    external: true,
  },
  {
    icon: Monitor,
    title: "ICT Services",
    tag: "ICT",
    body: "Business systems, web development and digital transformation for organisations in Lesotho and the region.",
    href: company.website + "services/ict-services",
    external: true,
  },
  {
    icon: Settings,
    title: "Managed Services",
    tag: "Managed",
    body: "Ongoing ICT management, cloud, security and database optimisation with a supported SLA.",
    href: company.website + "services/managed-services",
    external: true,
  },
  {
    icon: BarChart3,
    title: "Data Analytics",
    tag: "Intelligence",
    body: "Power BI dashboards, Excel models and executive reporting that turn operational data into decisions.",
    href: company.website + "services/data-analytics",
    external: true,
  },
];

export default function ServicesPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="border-b border-line bg-gradient-to-b from-white to-mist">
          <div className="mx-auto max-w-[1200px] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-8 bg-ibd-red" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-ibd-red">
                What IBD can do for you
              </span>
            </div>
            <h1 className="font-display mt-4 max-w-[20ch] text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-[1.03] tracking-[-0.02em] text-ink">
              Services across technology, finance and compliance
            </h1>
            <p className="mt-5 max-w-[68ch] text-[17px] leading-relaxed text-muted">
              From a first Lekuka assessment through integration, data preparation,
              testing and ongoing support — one accountable team.
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
                href={`${company.mailto}?subject=Service%20enquiry`}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-5 py-3 text-sm font-semibold text-ink transition hover:border-ibd-blue/40 hover:text-ibd-blue"
              >
                Email {company.email}
              </a>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1200px] px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.title}
                className="card-light group flex flex-col rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-ibd-blue/30 hover:shadow-[0_28px_55px_-35px_rgba(20,46,99,0.6)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-ibd-blue to-[#0d1f47] text-white">
                    <service.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="rounded-full bg-mist px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-muted">
                    {service.tag}
                  </span>
                </div>
                <h2 className="font-display mt-4 text-lg font-bold text-ink">
                  {service.title}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {service.body}
                </p>
                <a
                  href={service.href}
                  target={service.external ? "_blank" : undefined}
                  rel={service.external ? "noopener noreferrer" : undefined}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-ibd-blue transition group-hover:text-ibd-red"
                >
                  Learn more
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </article>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-5 rounded-3xl bg-gradient-to-r from-ibd-blue to-[#0d1f47] px-6 py-7 text-white sm:px-8">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-lekuka-bright">
                Technology + Finance + Tax Compliance + Business Intelligence
              </p>
              <p className="font-display mt-2 text-xl font-extrabold sm:text-2xl">
                = Infinity Business Dynamics
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-ibd-blue transition hover:bg-lekuka-soft"
            >
              Talk to IBD
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
