import Hero from "@/components/sections/Hero"
import Positioning from "@/components/sections/Positioning"
import StageSection from "@/components/sections/StageSection"
import Ventures from "@/components/sections/Ventures"
import Final from "@/components/sections/Final"
import Footer from "@/components/sections/Footer"
import ScrollStack, { ScrollStackItem } from "@/components/ui/ScrollStack"
import { divisions } from "@/content/divisions"

export default function HomePage() {
  return (
    <>
      <main id="main-content" tabIndex={-1}>
        <Hero />

        {/* § 01 → § 05 — softened stack: longer glide, gentler scale, more runway */}
        <ScrollStack
          useWindowScroll
          itemDistance={160}
          itemScale={0.018}
          itemStackDistance={20}
          stackPosition="16%"
          scaleEndPosition="14%"
          baseScale={0.94}
          scaleDuration={0.65}
          rotationAmount={0}
          blurAmount={0}
        >
          <ScrollStackItem>
            <Positioning className="scroll-stack-section" />
          </ScrollStackItem>
          {divisions.map((division) => (
            <ScrollStackItem key={division.id}>
              <StageSection
                division={division}
                className="scroll-stack-section"
              />
            </ScrollStackItem>
          ))}
        </ScrollStack>

        <Ventures />
        <Final />
      </main>
      <Footer />
    </>
  )
}
