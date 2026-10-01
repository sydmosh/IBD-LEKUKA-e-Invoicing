import type { Slide } from "@/data/slides";
import { CoverSlide } from "@/components/slides/CoverSlide";
import { WelcomeSlide } from "@/components/slides/WelcomeSlide";
import { BeforeAfterSlide } from "@/components/slides/BeforeAfterSlide";
import { IntroSlide } from "@/components/slides/IntroSlide";
import { AudienceSlide } from "@/components/slides/AudienceSlide";
import { PathfinderSlide } from "@/components/slides/PathfinderSlide";
import { ApproachSlide } from "@/components/slides/ApproachSlide";
import { KeepSlide } from "@/components/slides/KeepSlide";
import { MotheoSlide } from "@/components/slides/MotheoSlide";
import { PathwaySlide } from "@/components/slides/PathwaySlide";
import { EcosystemSlide } from "@/components/slides/EcosystemSlide";
import { RegisteredSlide } from "@/components/slides/RegisteredSlide";
import { DataPrepSlide } from "@/components/slides/DataPrepSlide";
import { FaqSlide } from "@/components/slides/FaqSlide";
import { RoadmapSlide } from "@/components/slides/RoadmapSlide";
import { ServicesSlide } from "@/components/slides/ServicesSlide";
import { QuestionsSlide } from "@/components/slides/QuestionsSlide";
import { ClosingSlide } from "@/components/slides/ClosingSlide";
import type { AssetFlags } from "@/data/assets";

interface SlideRendererProps {
  slide: Slide;
  assetFlags: AssetFlags;
}

export function SlideRenderer({ slide, assetFlags }: SlideRendererProps) {
  const shared = { title: slide.title, eyebrow: slide.eyebrow };

  switch (slide.type) {
    case "cover":
      return <CoverSlide content={slide.content} />;
    case "welcome":
      return <WelcomeSlide content={slide.content} {...shared} />;
    case "beforeAfter":
      return <BeforeAfterSlide content={slide.content} {...shared} />;
    case "intro":
      return <IntroSlide content={slide.content} {...shared} />;
    case "audience":
      return <AudienceSlide content={slide.content} {...shared} />;
    case "pathfinder":
      return <PathfinderSlide content={slide.content} {...shared} />;
    case "approach":
      return <ApproachSlide content={slide.content} {...shared} />;
    case "keep":
      return <KeepSlide content={slide.content} eyebrow={slide.eyebrow} />;
    case "motheo":
      return <MotheoSlide content={slide.content} {...shared} />;
    case "pathway":
      return <PathwaySlide content={slide.content} {...shared} />;
    case "ecosystem":
      return <EcosystemSlide content={slide.content} {...shared} />;
    case "registered":
      return (
        <RegisteredSlide
          content={slide.content}
          {...shared}
          hasScreenshot={assetFlags.hasRslScreenshot}
        />
      );
    case "dataPrep":
      return <DataPrepSlide content={slide.content} {...shared} />;
    case "faq":
      return <FaqSlide content={slide.content} {...shared} />;
    case "roadmap":
      return <RoadmapSlide content={slide.content} {...shared} />;
    case "services":
      return <ServicesSlide content={slide.content} {...shared} />;
    case "questions":
      return <QuestionsSlide content={slide.content} eyebrow={slide.eyebrow} />;
    case "closing":
      return <ClosingSlide content={slide.content} eyebrow={slide.eyebrow} />;
    default:
      return null;
  }
}
