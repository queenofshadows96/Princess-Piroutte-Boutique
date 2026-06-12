import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { AdminLogoutButton } from "./AdminLogoutButton";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Protect all admin pages
  if (!user) {
    redirect("/login");
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#FFF5F7",
        padding: "40px",
        paddingTop: "20px",
        fontFamily: "'Times New Roman', serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <h1
          style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: "48px",
            color: "#D4AF37",
            margin: 0,
          }}
        >
          Princess Pirouette Admin ✨
        </h1>

        <AdminLogoutButton />
      </div>

      {/* Content */}
      <div
        style={{
          background: "white",
          border: "2px solid #D4AF37",
          borderRadius: "12px",
          padding: "30px",
          boxShadow: "0 0 12px rgba(212,175,55,0.25)",
        }}
      >
        {children}
      </div>
    </div>
  );
}
