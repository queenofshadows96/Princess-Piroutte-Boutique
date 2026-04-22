import { HeroSection } from "@/components/HeroSection";
import { ValuesSection } from "@/components/ValuesSection";

export default function Home() {
  return (
    <main style={{ backgroundColor: "#FFF5F7" }}>
      <HeroSection />
      <ValuesSection />
    </main>
  );
}