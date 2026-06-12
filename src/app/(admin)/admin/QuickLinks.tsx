"use client";

import Link from "next/link";

export default function QuickLinks() {
  const items = [
    { label: "View Orders", href: "/admin/orders" },
    { label: "Manage Products", href: "/admin/products" },
    { label: "Customer List", href: "/admin/customers" },
    { label: "Broadcast Emails", href: "/admin/broadcast" },
    { label: "Settings", href: "/admin/settings" },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: "20px",
      }}
    >
      {items.map((item, i) => (
        <Link key={i} href={item.href} style={{ textDecoration: "none" }}>
          <div
            style={{
              background: "white",
              border: "2px solid #D4AF37",
              borderRadius: "12px",
              padding: "20px",
              boxShadow: "0 0 10px rgba(212,175,55,0.15)",
              transition: "transform 0.2s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = "scale(1.03)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = "scale(1)";
            }}
          >
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "22px",
                color: "#D4AF37",
                marginBottom: "10px",
              }}
            >
              {item.label}
            </div>
            <p
              style={{
                fontFamily: "'Times New Roman', serif",
                color: "#444",
                fontSize: "16px",
              }}
            >
              Open {item.label.toLowerCase()} section →
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
