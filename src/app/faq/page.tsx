"use client";

import { useState } from "react";
import { Metadata } from "next";

const faqs = [
  {
    question: "What sizes do you offer?",
    answer:
      "We offer sizes XS (2-4) through XL (10-12). Each product has a detailed size guide to help you find the perfect fit for your little dancer.",
  },
  {
    question: "Are your products sustainable?",
    answer:
      "Yes! We are committed to sustainability. Our materials are sourced ethically, and our production processes minimize environmental impact.",
  },
  {
    question: "How long does shipping take?",
    answer:
      "Standard shipping typically takes 5-7 business days. We offer expedited shipping options at checkout for faster delivery.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return policy. If you're not completely satisfied with your purchase, you can return it for a full refund.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Yes, we ship to select international locations. Shipping costs and delivery times vary by location.",
  },
  {
    question: "Can I customize my order?",
    answer:
      "We offer limited customization options including color choices. Please contact us for specific customization requests.",
  },
];

export default function FAQPage() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <main style={{ backgroundColor: "#FFF5F7", minHeight: "100vh", paddingTop: "100px" }}>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1
          className="text-5xl font-magnolia mb-12 text-center"
          style={{ color: "#D4AF37" }}
        >
          Frequently Asked Questions
        </h1>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-2 rounded-lg overflow-hidden"
              style={{ borderColor: "#B8860B" }}
            >
              <button
                className="w-full px-6 py-4 text-left font-playfair italic font-bold flex items-center justify-between transition-all"
                style={{
                  color: "#B8860B",
                  backgroundColor: expandedIndex === index ? "#FFD1DC" : "white",
                }}
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
              >
                <span>{faq.question}</span>
                <span className="text-2xl">
                  {expandedIndex === index ? "−" : "+"}
                </span>
              </button>

              {expandedIndex === index && (
                <div
                  className="px-6 py-4 border-t-2"
                  style={{
                    borderColor: "#B8860B",
                    backgroundColor: "white",
                    color: "#C09090",
                  }}
                >
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 rounded-lg border-2" style={{ borderColor: "#B8860B", backgroundColor: "white" }}>
          <h2 className="text-2xl font-playfair italic font-bold mb-4" style={{ color: "#B8860B" }}>
            Still have questions?
          </h2>
          <p style={{ color: "#C09090", marginBottom: "1rem" }}>
            Contact us at support@princesspirouette.com or visit our contact page.
          </p>
          <a
            href="/contact"
            className="inline-block px-6 py-2 rounded-lg font-playfair italic font-semibold text-white transition-all"
            style={{ backgroundColor: "#D4AF37" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#B8860B")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#D4AF37")}
          >
            Contact Us
          </a>
        </div>
      </div>
    </main>
  );
}
