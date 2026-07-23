import type { Metadata } from "next";
import Nav from "./_components/Nav";
import Hero from "./_components/Hero";
import Ticker from "./_components/Ticker";
import MenuBoard from "./_components/MenuBoard";
import HowWeCook from "./_components/HowWeCook";
import CookTeaser from "./_components/CookTeaser";
import FreshPress from "./_components/FreshPress";
import Kitchen from "./_components/Kitchen";
import SiteFooter from "./_components/SiteFooter";

export const metadata: Metadata = {
  title: "BOBB's Kitchen — Made from your words",
  description:
    "Kerala's first AI apparel kitchen. Talk to the cook, watch your story get printed, wear it home. Kannur.",
  openGraph: {
    title: "BOBB's Kitchen — Made from your words",
    description:
      "Talk to the machine. Wear the result. Kannur's AI apparel kitchen on wheels.",
    images: ["/bobb/van-lets-cook.png"],
  },
};

export default function BobbPage() {
  return (
    <div className="bg-void text-bone">
      <Nav />
      <main>
        <Hero />
        <Ticker />
        <MenuBoard />
        <HowWeCook />
        <CookTeaser />
        <FreshPress />
        <Kitchen />
      </main>
      <SiteFooter />
    </div>
  );
}
