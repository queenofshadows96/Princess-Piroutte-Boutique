"use client";

import { motion } from "framer-motion";
import { Great_Vibes, Playfair_Display } from "next/font/google";
import { useState } from "react";

const magnolia = Great_Vibes({ subsets: ["latin"], weight: ["400"] });
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "700"], style: ["italic"] });

const cardStyle = {
  backgroundColor: "rgba(255, 255, 255, 0.92)",
  border: "2px solid #B8860B",
};

const faqs = [
  {
    question: "What sizes do you carry?",
    answer: "We carry sizes XS through XL. Please visit our Sizing Guide page for detailed measurements to find your perfect fit!",
  },
  {
    question: "Will you be adding more leotard designs or other products?",
    answer: "Yes, we are currently working on more designs and hope to expand our product line! Stay tuned for updates!",
  },
  {
    question: "What are your leotards made of?",
    answer: "Our leotards are made with professional-grade 210 GSM Recycled Matte Nylon/Lycra, with a bamboo crotch lining — thicker and more supportive than standard streetwear, providing a sculpted feel while being gentle on the earth.",
  },
  {
    question: "Are your products sustainable?",
    answer: "Yes! We are committed to mindful luxury. We use premium recycled and organic fibers, that are GRS and OEKO-TEX certified. Even our packaging is compostible.",
  },
  {
    question: "How long does shipping take?",
    answer: "Production Time takes 4-6 weeks. Standard US shipping takes 3-7 business days. You will receive a tracking number once your order has shipped.",
  },
  {
    question: "Why is there a wait for my order?",
    answer: "To ensure every Princess Pirouette leotard meets our standards for quality and sustainability, we operate on a small-batch craftsmanship model. By producing in smaller quantities rather than mass-market volumes, we eliminate overproduction and focus on using premium, recycled materials. We appreciate your patience in helping us keep the dance world a little more magical—and a lot more sustainable!",
  },
  {
    question: "What is your return policy?",
    answer: "We accept returns within 30 days of purchase for unworn, unwashed items with tags and hygiene liners still attached. Please contact us to initiate a return.",
  },
  {
    question: "Can I exchange for a different size?",
    answer: "Absolutely! Contact us within 30 days and we will arrange an exchange for the correct size.",
  },
  {
    question: "Do you offer custom orders?",
    answer: "Not at the monment, but we plan to in the future! Stay tuned for updates on custom options and collaborations.",
  },
  {
    question: "How do I care for my leotard?",
    answer: "Hand wash in cold water with a gentle detergent and lay flat to dry — never put in the dryer.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
            Frequently Asked Questions
          </h1>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-3xl shadow-md overflow-hidden"
              style={cardStyle}
            >
              <button
                className="w-full text-left px-8 py-6 flex justify-between items-center"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span
                  className={`${playfair.className} italic text-lg font-bold`}
                  style={{ color: "#D4AF37" }}
                >
                  {faq.question}
                </span>
                <span style={{ color: "#B8860B", fontSize: "1.5rem" }}>
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>
              {openIndex === index && (
                <div className="px-8 pb-6">
                  <p className="text-base leading-loose" style={{ color: "#C09090", fontFamily: "'Times New Roman', serif" }}>
                    {faq.answer}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
