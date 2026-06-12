"use client";

import { supabase } from "@/lib/supabase/client";

export function AdminLogoutButton() {
  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = "/login"; // your new login route
  }

  return (
    <button
      onClick={handleLogout}
      style={{
        padding: "10px 18px",
        backgroundColor: "#D4AF37",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        fontSize: "16px",
      }}
    >
      Logout
    </button>
  );
}
