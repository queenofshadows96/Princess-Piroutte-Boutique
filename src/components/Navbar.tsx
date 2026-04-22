"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Great_Vibes, Playfair_Display } from "next/font/google";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import CrownIcon from "./CrownIcon";

const magnolia = Great_Vibes({ subsets: ["latin"], weight: ["400"] });
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400"], style: ["italic"] });

const links = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/sizing-guide", label: "Sizing Guide" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About" },
  { href: "/values", label: "Our Values" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { totalItems } = useCart();

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.92)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(255, 209, 220, 0.45)",
      }}
    >
      <Link
        href="/"
        className={`${magnolia.className} text-xl font-bold shrink-0 whitespace-nowrap flex items-center gap-2`}
        style={{ color: "#D4AF37" }}
      >
        <CrownIcon width={20} height={20} color="#D4AF37" />
        Princess Pirouette Boutique
      </Link>

      <div className="flex items-center gap-8 shrink-0">
        {links.map(({ href, label }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`${playfair.className} italic text-sm font-semibold transition-colors duration-200`}
              style={{
                color: "#B8860B",
                borderBottom: active ? "2px solid #FFD1DC" : "2px solid transparent",
                paddingBottom: "2px",
              }}
            >
              {label}
            </Link>
          );
        })}

        <Link
          href="/checkout"
          className="relative flex items-center transition-colors duration-200"
          style={{ color: "#B8860B" }}
          aria-label={`Cart — ${totalItems} item${totalItems !== 1 ? "s" : ""}`}
        >
          <ShoppingBag size={22} strokeWidth={1.8} />
          {totalItems > 0 && (
            <span
              className="absolute -top-2 -right-2 flex items-center justify-center rounded-full text-white font-bold"
              style={{
                backgroundColor: "#D4AF37",
                fontSize: "10px",
                width: "18px",
                height: "18px",
              }}
            >
              {totalItems > 9 ? "9+" : totalItems}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}
