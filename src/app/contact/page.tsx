"use client";

import { motion } from "framer-motion";
import { Great_Vibes, Playfair_Display } from "next/font/google";
import { useState } from "react";
import emailjs from "@emailjs/browser";

const magnolia = Great_Vibes({ subsets: ["latin"], weight: ["400"] });
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "700"], style: ["italic"] });

const cardStyle = {
  backgroundColor: "rgba(255, 255, 255, 0.92)",
  border: "2px solid #B8860B",
};

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await emailjs.send(
        "service_jrq8yjl",
        "template_svqon5v",
        {
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
        },
        "zgdvRJeC2Ft5Gcfab"
      );
      setSubmitted(true);
    } catch (err) {
      setError("Something went wrong. Please try again or email us directly at royals@princesspirouetteboutique.com");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative z-10 py-20 px-6 min-h-screen">
      <div className="max-w-3xl mx-auto space-y-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1
            className={`${magnolia.className} text-5xl md:text-6xl mb-4`}
            style={{ color: "#D4AF37" }}
          >
            Contact Us
          </h1>
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="p-8 rounded-3xl shadow-md text-center"
          style={cardStyle}
        >
          <h2
            className={`${playfair.className} italic text-2xl md:text-3xl font-bold mb-4`}
            style={{ color: "#D4AF37" }}
          >
            We Would Love to Hear From You
          </h2>
          <p className="text-base md:text-lg leading-loose" style={{ color: "#C09090" }}>
            Whether you have a question about sizing, a custom order request, or just want to say hello — we are here for you.
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="p-8 rounded-3xl shadow-md"
          style={cardStyle}
        >
          {submitted ? (
            <div className="text-center py-10">
              <h2
                className={`${playfair.className} italic text-2xl font-bold mb-4`}
                style={{ color: "#D4AF37" }}
              >
                Thank You, Princess!
              </h2>
              <p style={{ color: "#C09090" }}>
                Your message has been received. We will be in touch with you shortly!
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <h2
                className={`${playfair.className} italic text-2xl md:text-3xl font-bold mb-6`}
                style={{ color: "#D4AF37" }}
              >
                Send Us a Message
              </h2>

              <div>
                <label className="block text-sm font-bold mb-2" style={{ color: "#B8860B" }}>Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-xl outline-none transition-all duration-200"
                  style={{ border: "1.5px solid #B8860B", backgroundColor: "rgba(255,245,247,0.5)", color: "#8B5A6A" }}
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2" style={{ color: "#B8860B" }}>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-xl outline-none transition-all duration-200"
                  style={{ border: "1.5px solid #B8860B", backgroundColor: "rgba(255,245,247,0.5)", color: "#8B5A6A" }}
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2" style={{ color: "#B8860B" }}>Subject</label>
                <select
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl outline-none transition-all duration-200"
                  style={{ border: "1.5px solid #B8860B", backgroundColor: "rgba(255,245,247,0.5)", color: "#8B5A6A" }}
                >
                  <option value="">Select a subject...</option>
                  <option value="sizing">Sizing Question</option>
                  <option value="order">Order Inquiry</option>
                  <option value="custom">Custom Order Request</option>
                  <option value="return">Return or Exchange</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2" style={{ color: "#B8860B" }}>Your Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us how we can help..."
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl outline-none transition-all duration-200 resize-none"
                  style={{ border: "1.5px solid #B8860B", backgroundColor: "rgba(255,245,247,0.5)", color: "#8B5A6A" }}
                />
              </div>

              {error && <p className="text-sm text-center" style={{ color: "#C09090" }}>{error}</p>}

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full py-4 rounded-full font-bold text-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                style={{ backgroundColor: "#FFD1DC", color: "#D4AF37", border: "2px solid #B8860B", opacity: loading ? 0.7 : 1 }}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </div>
          )}
        </motion.section>
      </div>
    </main>
  );
}
