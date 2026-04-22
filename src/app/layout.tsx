import type { Metadata } from 'next'
import { Great_Vibes, Playfair_Display } from 'next/font/google'
// import './globals.css'
import { cn } from "@/lib/utils";

const greatVibes = Great_Vibes({ 
  subsets: ['latin'],
  weight: '400',
  variable: '--font-great-vibes'
})

const playfairDisplay = Playfair_Display({ 
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-playfair'
})

export const metadata: Metadata = {
  title: 'Princess Pirouette Boutique',
  description: 'A princess ballet boutique',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        greatVibes.variable,
        playfairDisplay.variable
      )}>
        {children}
      </body>
    </html>
  )
}