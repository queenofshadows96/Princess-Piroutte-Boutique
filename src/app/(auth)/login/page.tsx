"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError("Invalid email or password.");
      return;
    }

    // IMPORTANT: SSR layout will now detect the session correctly
    window.location.href = "/admin";
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#FFF5F7",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px",
        fontFamily: "'Times New Roman', serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "white",
          border: "2px solid #D4AF37",
          borderRadius: "12px",
          padding: "30px",
          boxShadow: "0 0 12px rgba(212,175,55,0.25)",
        }}
      >
        <h1
          style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: "42px",
            color: "#D4AF37",
            textAlign: "center",
            marginBottom: "10px",
          }}
        >
          Admin Login
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#444",
            marginBottom: "25px",
            fontSize: "16px",
          }}
        >
          Welcome back, Royal Keeper ✨
        </p>

        <form onSubmit={handleLogin}>
          <label style={{ display: "block", marginBottom: "8px", color: "#444" }}>
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #D4AF37",
              borderRadius: "6px",
              marginBottom: "16px",
            }}
          />

          <label style={{ display: "block", marginBottom: "8px", color: "#444" }}>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #D4AF37",
              borderRadius: "6px",
              marginBottom: "16px",
            }}
          />

          {error && (
            <p style={{ color: "red", marginBottom: "12px", textAlign: "center" }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#D4AF37",
              color: "white",
              border: "none",
              borderRadius: "6px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
