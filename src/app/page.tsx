import { PresentationShell } from "@/components/presentation/PresentationShell";
import { getAssetFlags } from "@/data/assets";

export default function HomePage() {
  return <PresentationShell assetFlags={getAssetFlags()} />;
}
