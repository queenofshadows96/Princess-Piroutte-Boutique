// src/app/(admin)/admin/AdminBackButtons.tsx
"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminBackButtons() {
  const router = useRouter();

  return (
    <div style={{ marginBottom: "20px", display: "flex", gap: "12px" }}>
      {/* Back to previous page */}
      <button
        onClick={() => router.back()}
        style={{
          padding: "10px 16px",
          backgroundColor: "#FFF5F7",
          border: "2px solid #D4AF37",
          borderRadius: "8px",
          color: "#444",
          cursor: "pointer",
          fontFamily: "'Times New Roman', serif",
        }}
      >
        ← Back
      </button>

      {/* Back to dashboard */}
      <Link
        href="/admin"
        style={{
          padding: "10px 16px",
          backgroundColor: "#D4AF37",
          borderRadius: "8px",
          color: "white",
          textDecoration: "none",
          fontFamily: "'Times New Roman', serif",
        }}
      >
        ← Dashboard
      </Link>
    </div>
  );
}
