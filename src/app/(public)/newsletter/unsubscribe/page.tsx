"use client";

import { useEffect, useState } from "react";

export default function UnsubscribePage() {
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    const url = new URL(window.location.href);
    const token = url.searchParams.get("token");

    if (!token) {
      setStatus("error");
      setMessage("Invalid unsubscribe link.");
      return;
    }

    const unsubscribe = async () => {
      try {
        const res = await fetch("/api/newsletter/unsubscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        const data = await res.json();

        if (data.success) {
          setStatus("success");
          setMessage("You have been unsubscribed from our newsletter.");
        } else {
          setStatus("error");
          setMessage(data.message || "Unable to unsubscribe.");
        }
      } catch (err) {
        setStatus("error");
        setMessage("Unexpected error. Please try again later.");
      }
    };

    unsubscribe();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF5F7] px-6">
      <div className="max-w-md w-full bg-white border border-[#B8860B] rounded-xl p-8 shadow-lg text-center">
        {status === "loading" && (
          <p className="text-lg text-gray-700">Processing your request…</p>
        )}

        {status === "success" && (
          <>
            <h1 className="text-2xl font-semibold text-[#B8860B] mb-4">
              You’re Unsubscribed ✨
            </h1>
            <p className="text-gray-700 mb-6">{message}</p>
            <p className="text-sm text-gray-500">
              You will no longer receive magical updates from Princess
              Pirouette Boutique.
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <h1 className="text-2xl font-semibold text-red-600 mb-4">
              Oops…
            </h1>
            <p className="text-gray-700 mb-6">{message}</p>
            <p className="text-sm text-gray-500">
              If you believe this is a mistake, you may try again or contact
              support.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
