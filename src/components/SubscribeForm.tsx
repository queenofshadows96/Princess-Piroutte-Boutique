"use client";
import { useState } from "react";

export default function SubscribeForm({ variant = "footer" }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error || "Something went wrong.");
        return;
      }

      setStatus("success");
      setMessage("You're officially on the Royal List! ✨");
      setEmail("");

      // ⭐ GA4 Newsletter Signup Event
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "newsletter_signup", {
          method: variant, // "footer" or "homepage" etc.
          email_domain: email.split("@")[1] || "",
        });
      }

    } catch (err) {
      setStatus("error");
      setMessage("Unexpected error — please try again.");
    }
  };

  return (
    <>
      <style jsx>{`
        @keyframes shimmer {
          0% {
            left: -100%;
          }
          100% {
            left: 100%;
          }
        }
      `}</style>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <input
          type="email"
          required
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: "10px 12px",
            borderRadius: "10px",
            border: "1px solid #B8860B",
            fontSize: "14px",
            fontFamily: "Georgia, serif",
            outline: "none",
          }}
        />

        <button
          type="submit"
          disabled={status === "loading"}
          style={{
            padding: "10px 20px",
            borderRadius: "9999px",
            border: "1px solid #B8860B",
            cursor: "pointer",
            fontSize: "17px",
            fontWeight: 600,
            letterSpacing: "0.2px",
            fontFamily: "Playfair Display, serif",
            color: "#D4AF37",
            background: `
              radial-gradient(circle at center,
              rgba(255, 255, 255, 0.95),
              rgba(255, 209, 220, 0.95))
            `,
            boxShadow: "0 0 8px rgba(255, 209, 220, 0.35)",
            transition: "0.3s ease",
            position: "relative",
            overflow: "hidden",
            alignSelf: "center",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => {
            const btn = e.currentTarget;
            btn.style.boxShadow = "0 0 14px rgba(255, 209, 220, 0.55)";
            const shimmer = btn.querySelector(".shimmer");
            shimmer.style.animation = "shimmer 1.8s forwards";
          }}
          onMouseLeave={(e) => {
            const btn = e.currentTarget;
            btn.style.boxShadow = "0 0 8px rgba(255, 209, 220, 0.35)";
            const shimmer = btn.querySelector(".shimmer");
            shimmer.style.animation = "none";
          }}
        >
          <span
            className="shimmer"
            style={{
              position: "absolute",
              top: 0,
              left: "-100%",
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(120deg, transparent, rgba(255,255,255,0.6), transparent)",
              transform: "skewX(-20deg)",
              pointerEvents: "none",
            }}
          ></span>

          {status === "loading" ? "Joining..." : "Join the Magic ✨"}
        </button>

        {status !== "idle" && (
          <p
            style={{
              marginTop: "6px",
              textAlign: "center",
              color: status === "success" ? "#4CAF50" : "#D9534F",
              fontFamily: "Georgia, serif",
              fontSize: "13px",
            }}
          >
            {message}
          </p>
        )}
      </form>
    </>
  );
}
