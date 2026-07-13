import Hero from "@/components/sections/Hero"
import Positioning from "@/components/sections/Positioning"
import StageSection from "@/components/sections/StageSection"
import Ventures from "@/components/sections/Ventures"
import Final from "@/components/sections/Final"
import Footer from "@/components/sections/Footer"
import { divisions } from "@/content/divisions"

export default function HomePage() {
  return (
    <>
      <main>
        <Hero />
        <Positioning />
        {divisions.map((division) => (
          <StageSection key={division.id} division={division} />
        ))}
        <Ventures />
        <Final />
      </main>
      <Footer />
    </>
  )
}
