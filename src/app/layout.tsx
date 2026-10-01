import type { Metadata, Viewport } from "next";
import { Archivo, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

const siteUrl = "https://ibd-lekuka.vercel.app/";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "LEKUKA e-Invoicing Awareness Session | Infinity Business Dynamics",
  description:
    "Understand Lekuka e-Invoicing requirements and learn how Infinity Business Dynamics can help businesses prepare, integrate and manage their existing systems for compliance.",
  keywords: [
    "Lekuka e-Invoicing",
    "Revenue Services Lesotho",
    "RSL",
    "IBD",
    "Infinity Business Dynamics",
    "e-Invoicing Lesotho",
    "ERP integration",
    "Motheo POS",
    "tax compliance Lesotho",
  ],
  authors: [{ name: "Infinity Business Dynamics" }],
  creator: "Infinity Business Dynamics",
  publisher: "Infinity Business Dynamics",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "LEKUKA e-Invoicing | IBD",
    title: "LEKUKA e-Invoicing | IBD",
    description:
      "Virtual awareness session on Lekuka e-Invoicing. Understand the requirements and prepare your business with Infinity Business Dynamics.",
    url: siteUrl,
    images: [
      {
        url: "/images/lekuka-awareness-poster.jpg",
        width: 928,
        height: 1152,
        alt: "LEKUKA e-Invoicing virtual awareness session poster",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LEKUKA e-Invoicing | IBD",
    description:
      "Virtual awareness session on Lekuka e-Invoicing. Understand the requirements and prepare your business.",
    images: ["/images/lekuka-awareness-poster.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0B1736",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${archivo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
