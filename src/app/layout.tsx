import type { Metadata } from "next";
import { Great_Vibes, Playfair_Display } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { CartProvider } from "@/context/CartContext";
import CurtainReveal from "@/components/CurtainReveal";
import FloatingBackground from "@/components/FloatingBackground";

export const metadata: Metadata = {
  title: "Princess Pirouette Boutique",
  description:
    "Magical and Sustainable Apparel for your Inner Little Princess",
};

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-great-vibes",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-0Q5QZK3F4M"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-0Q5QZK3F4M');
          `}
        </Script>

        {/* ⭐ LOAD ALL EDITOR FONTS */}
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Great+Vibes&family=Dancing+Script:wght@400;700&family=Pacifico&family=Alex+Brush&family=Satisfy&family=Lobster&family=Pinyon+Script&display=swap"
          rel="stylesheet"
        />
      </head>

      <body
        className={`${greatVibes.variable} ${playfairDisplay.variable} min-h-screen antialiased`}
      >
        <CartProvider>
          <CurtainReveal />
          <FloatingBackground />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
