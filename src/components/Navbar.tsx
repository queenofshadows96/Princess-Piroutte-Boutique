"use client"

import Link from 'next/link'
import { Button } from '@/components/ui/button'

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Shop', href: '/shop' },
  { name: 'Sizing Guide', href: '/sizing-guide' },
  { name: 'FAQ', href: '/faq' },
  { name: 'About', href: '/about' },
  { name: 'Our Values', href: '/values' },
  { name: 'Contact', href: '/contact' },
]

export function Navbar() {
  return (
    <nav className="bg-pink-50 border-b border-gold-200 px-4 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-great-vibes text-gold-600">
          Princess Pirouette Boutique
        </Link>
        <div className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-gray-700 hover:text-gold-600 transition-colors font-playfair"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <Button variant="outline" className="md:hidden">
          Menu
        </Button>
      </div>
    </nav>
  )
}