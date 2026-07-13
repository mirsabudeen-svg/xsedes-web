import Hero from "@/components/sections/Hero"
import Positioning from "@/components/sections/Positioning"
import StageSection from "@/components/sections/StageSection"
import { divisions } from "@/content/divisions"

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Positioning />
      {divisions.map((division) => (
        <StageSection key={division.id} division={division} />
      ))}
    </main>
  )
}
