"use client";

import { useState, useEffect } from "react";
import AdminBackButtons from "../../AdminBackButtons";
import Editor from "./Editor";

export default function BroadcastPage() {
  const [subject, setSubject] = useState("");
  const [contentHtml, setContentHtml] = useState("");
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);

  // ⭐ Test email UI state
  const [testEmail, setTestEmail] = useState("");
  const [showTestInput, setShowTestInput] = useState(false);

  const [loadingDraft, setLoadingDraft] = useState(true);

  /* -----------------------------
        LOAD SAVED DRAFT
  ------------------------------ */
  useEffect(() => {
    async function loadDraft() {
      try {
        const res = await fetch("/api/newsletter/broadcast/load-draft");
        const data = await res.json();

        setSubject(data.subject || "");
        setContentHtml(data.contentHtml || "");
      } catch (err) {
        console.error("Failed to load draft:", err);
      }
      setLoadingDraft(false);
    }
    loadDraft();
  }, []);

  /* -----------------------------
        AUTO-SAVE EVERY 10s
  ------------------------------ */
  useEffect(() => {
    if (!subject && !contentHtml) return;

    const interval = setInterval(() => {
      fetch("/api/newsletter/broadcast/save-draft", {
        method: "POST",
        body: JSON.stringify({ subject, contentHtml }),
      });
    }, 10000);

    return () => clearInterval(interval);
  }, [subject, contentHtml]);

  /* -----------------------------
        MANUAL SAVE DRAFT
  ------------------------------ */
  async function saveDraft() {
    if (!subject.trim() && !contentHtml.trim()) {
      setStatus("Nothing to save.");
      return;
    }

    setStatus("Saving draft...");
    try {
      const res = await fetch("/api/newsletter/broadcast/save-draft", {
        method: "POST",
        body: JSON.stringify({ subject, contentHtml }),
      });

      if (res.ok) {
        setStatus("✨ Draft saved!");
      } else {
        setStatus("❌ Save failed.");
      }
    } catch {
      setStatus("❌ Error saving draft.");
    }
  }

  /* -----------------------------
        SEND BROADCAST
  ------------------------------ */
  async function sendBroadcast() {
    if (!subject.trim() || !contentHtml.trim()) {
      setStatus("Please enter a subject and content.");
      return;
    }

    const confirmSend = window.confirm(
      "Are you sure you want to send this broadcast to ALL subscribers? ✨"
    );
    if (!confirmSend) return;

    setSending(true);
    setStatus("Sending broadcast...");

    try {
      const res = await fetch("/api/newsletter/broadcast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject,
          contentHtml, // ⭐ FIXED
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Broadcast failed");

      setStatus("✨ Broadcast sent successfully!");
    } catch (err) {
      console.error(err);
      setStatus("❌ Error sending broadcast.");
    } finally {
      setSending(false);
    }
  }

  /* -----------------------------
        SEND TEST EMAIL
  ------------------------------ */
  async function sendTest() {
    if (!testEmail.trim()) {
      setStatus("Enter a test email.");
      return;
    }

    setStatus("Sending test email...");

    try {
      const res = await fetch("/api/newsletter/broadcast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject,
          contentHtml, // ⭐ FIXED
          testEmail,   // ⭐ triggers test mode
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Test email failed");

      setStatus("✨ Test email sent!");

      // ⭐ Reset test email UI
      setTestEmail("");
      setShowTestInput(false);
    } catch (err) {
      console.error(err);
      setStatus("❌ Error sending test email.");
    }
  }

  return (
    <div>
      <AdminBackButtons />

      <h1 className="text-3xl font-bold mb-4">Broadcast Newsletter ✨</h1>

      {loadingDraft ? (
        <p>Loading draft...</p>
      ) : (
        <>
          {/* SUBJECT */}
          <input
            type="text"
            placeholder="Email Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full p-2 border mb-4"
          />

          {/* EDITOR */}
          <Editor value={contentHtml} onChange={setContentHtml} />

          {/* ACTION BUTTONS */}
          <div className="flex gap-4 mt-4">
            <button
              onClick={saveDraft}
              className="px-4 py-2 bg-yellow-500 text-white rounded"
            >
              Save Draft
            </button>

            <button
              onClick={sendBroadcast}
              disabled={sending}
              className="px-4 py-2 bg-pink-600 text-white rounded"
            >
              {sending ? "Sending..." : "Send Broadcast"}
            </button>
          </div>

          {/* TEST EMAIL SECTION */}
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Send Test Email</h3>

            {!showTestInput && (
              <button
                onClick={() => setShowTestInput(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Enter Test Email
              </button>
            )}

            {showTestInput && (
              <div>
                <input
                  type="email"
                  placeholder="Test email address"
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                  className="w-full p-2 border mb-2"
                />

                <button
                  onClick={sendTest}
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Send Test
                </button>
              </div>
            )}
          </div>

          {/* STATUS MESSAGE */}
          {status && <p className="mt-4">{status}</p>}
        </>
      )}
    </div>
  );
}
