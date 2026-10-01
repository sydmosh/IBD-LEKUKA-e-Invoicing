"use client";

import Image from "next/image";
import { Globe, Mail, MapPin, Phone } from "lucide-react";
import { company } from "@/data/company";

export function ContactBlock({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const dark = tone === "dark";
  const line = dark ? "text-white/65" : "text-muted";
  const strong = dark ? "text-white" : "text-ink";

  return (
    <div className="flex flex-col gap-4">
      <Image
        src={dark ? "/logo-ibd-dark.png" : "/logo-ibd-white.png"}
        alt="Infinity Business Dynamics"
        width={1080}
        height={278}
        className="h-9 w-auto sm:h-10"
      />

      <div className="grid gap-3 text-sm sm:grid-cols-2">
        <p className={`flex gap-2.5 ${line}`}>
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-lekuka-bright" aria-hidden="true" />
          <span>
            <span className={`block font-semibold ${strong}`}>{company.name}</span>
            {company.addressLines.map((lineText) => (
              <span key={lineText} className="block">
                {lineText}
              </span>
            ))}
          </span>
        </p>

        <div className="flex flex-col gap-2">
          <a
            href={company.mailto}
            className={`flex items-center gap-2.5 transition-colors hover:text-lekuka-bright ${line}`}
          >
            <Mail className="h-4 w-4 shrink-0 text-lekuka-bright" aria-hidden="true" />
            <span className="font-medium">{company.email}</span>
          </a>
          <a
            href={`tel:${company.phone.replace(/\s/g, "")}`}
            className={`flex items-center gap-2.5 transition-colors hover:text-lekuka-bright ${line}`}
          >
            <Phone className="h-4 w-4 shrink-0 text-lekuka-bright" aria-hidden="true" />
            <span className="font-medium">{company.phone}</span>
          </a>
          <a
            href={company.website}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2.5 transition-colors hover:text-lekuka-bright ${line}`}
          >
            <Globe className="h-4 w-4 shrink-0 text-lekuka-bright" aria-hidden="true" />
            <span className="font-medium">{company.websiteLabel}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
