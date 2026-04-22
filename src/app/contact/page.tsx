"use client";

import { useState } from "react";
import { Metadata } from "next";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });

        // Reset success message after 5 seconds
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        console.error("Failed to send email");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ backgroundColor: "#FFF5F7", minHeight: "100vh", paddingTop: "100px" }}>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1
          className="text-5xl font-magnolia mb-12 text-center"
          style={{ color: "#D4AF37" }}
        >
          Contact Us
        </h1>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-playfair italic font-bold mb-6" style={{ color: "#B8860B" }}>
              Get in Touch
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="font-playfair italic font-bold mb-2" style={{ color: "#D4AF37" }}>
                  Email
                </h3>
                <p style={{ color: "#C09090" }}>
                  <a
                    href="mailto:support@princesspirouette.com"
                    className="hover:underline"
                  >
                    support@princesspirouette.com
                  </a>
                </p>
              </div>

              <div>
                <h3 className="font-playfair italic font-bold mb-2" style={{ color: "#D4AF37" }}>
                  Phone
                </h3>
                <p style={{ color: "#C09090" }}>
                  <a href="tel:+1-800-TUTUS-01" className="hover:underline">
                    +1-800-TUTUS-01
                  </a>
                </p>
              </div>

              <div>
                <h3 className="font-playfair italic font-bold mb-2" style={{ color: "#D4AF37" }}>
                  Hours
                </h3>
                <p style={{ color: "#C09090" }}>
                  Monday - Friday: 9 AM - 6 PM EST
                  <br />
                  Saturday: 10 AM - 4 PM EST
                  <br />
                  Sunday: Closed
                </p>
              </div>

              <div className="p-6 rounded-lg border-2 bg-white" style={{ borderColor: "#B8860B" }}>
                <p style={{ color: "#C09090" }}>
                  We'd love to hear from you! Whether you have questions, feedback, or just want to
                  say hello, don't hesitate to reach out.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <form
              onSubmit={handleSubmit}
              className="space-y-6 p-8 rounded-lg border-2 bg-white"
              style={{ borderColor: "#B8860B" }}
            >
              {submitted && (
                <div
                  className="p-4 rounded-lg text-white font-playfair"
                  style={{ backgroundColor: "#D4AF37" }}
                >
                  Thank you! We'll get back to you soon.
                </div>
              )}

              <div>
                <label className="block font-playfair italic font-bold mb-2" style={{ color: "#B8860B" }}>
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border-2 rounded"
                  style={{ borderColor: "#B8860B" }}
                />
              </div>

              <div>
                <label className="block font-playfair italic font-bold mb-2" style={{ color: "#B8860B" }}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border-2 rounded"
                  style={{ borderColor: "#B8860B" }}
                />
              </div>

              <div>
                <label className="block font-playfair italic font-bold mb-2" style={{ color: "#B8860B" }}>
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border-2 rounded"
                  style={{ borderColor: "#B8860B" }}
                />
              </div>

              <div>
                <label className="block font-playfair italic font-bold mb-2" style={{ color: "#B8860B" }}>
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full p-3 border-2 rounded resize-none"
                  style={{ borderColor: "#B8860B" }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg font-playfair italic font-bold text-white transition-all disabled:opacity-50"
                style={{ backgroundColor: "#D4AF37" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#B8860B")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#D4AF37")}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
