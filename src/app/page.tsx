import { Navbar } from '@/components/Navbar'
import { HeroSection } from '@/components/HeroSection'
import { ValuesSection } from '@/components/ValuesSection'
import { FloatingStars } from '@/components/FloatingStars'

export default function Home() {
  return (
    <div className="min-h-screen bg-pink-50 relative overflow-hidden">
      <FloatingStars />
      <Navbar />
      <main>
        <HeroSection />
        <ValuesSection />
      </main>
    </div>
  )
}