import type { Metadata } from "next";
import { PresentationShell } from "@/components/presentation/PresentationShell";
import { getAssetFlags } from "@/data/assets";

export const metadata: Metadata = {
  title: "Present · LEKUKA e-Invoicing Awareness Session | IBD",
  description:
    "Full-screen presentation mode for the LEKUKA e-Invoicing virtual awareness session by Infinity Business Dynamics.",
  robots: { index: false, follow: true },
};

export default function PresentPage() {
  return <PresentationShell initialPresenting assetFlags={getAssetFlags()} />;
}
