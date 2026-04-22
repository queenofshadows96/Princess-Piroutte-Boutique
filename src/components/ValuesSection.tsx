"use client"

import { motion } from 'framer-motion'
import { Heart, Star, Crown } from 'lucide-react'

const values = [
  {
    icon: Heart,
    title: 'Passion for Dance',
    description: 'Every piece is crafted with love for ballet and the joy it brings to young dancers.'
  },
  {
    icon: Star,
    title: 'Quality & Comfort',
    description: 'Premium materials and expert tailoring ensure comfort during every pirouette.'
  },
  {
    icon: Crown,
    title: 'Magical Experience',
    description: 'Transform your little one into a princess ballerina with our enchanting collection.'
  }
]

export function ValuesSection() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-great-vibes text-gold-600 text-center mb-16"
        >
          Our Values
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="text-center"
            >
              <div className="bg-pink-100 rounded-t-full pt-12 pb-8 px-6 relative">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gold-600 rounded-full p-4">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-playfair font-bold text-gray-800 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 font-playfair">
                  {value.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}