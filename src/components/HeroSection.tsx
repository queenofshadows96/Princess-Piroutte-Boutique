"use client"

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

export function HeroSection() {
  return (
    <section className="relative py-20 px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-5xl md:text-7xl font-great-vibes text-gold-600 mb-6">
          Princess Pirouette Boutique
        </h1>
        <p className="text-xl md:text-2xl font-playfair text-gray-700 mb-8 max-w-2xl mx-auto">
          Enchanting ballet wear for little princesses who dream of dancing on stage
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-gold-600 hover:bg-gold-700 text-white">
            Shop Now
          </Button>
          <Button size="lg" variant="outline" className="border-gold-600 text-gold-600 hover:bg-gold-50">
            Learn More
          </Button>
        </div>
      </motion.div>
    </section>
  )
}