import type { Metadata } from "next";
import { Great_Vibes, Playfair_Display } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import FloatingBackground from "@/components/FloatingBackground";

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-great-vibes",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Princess Pirouette Boutique",
  description: "Magical and Sustainable Apparel for your Inner Little Princess",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${greatVibes.variable} ${playfairDisplay.variable} min-h-screen antialiased`}>
        <CartProvider>
          <FloatingBackground />
          <Navbar />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}