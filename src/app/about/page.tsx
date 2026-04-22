import { Metadata } from "next";
import { motion } from "framer-motion";

export const metadata: Metadata = {
  title: "About | Princess Pirouette Boutique",
  description: "Learn about our mission and story.",
};

export default function AboutPage() {
  return (
    <main style={{ backgroundColor: "#FFF5F7", minHeight: "100vh", paddingTop: "100px" }}>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1
          className="text-5xl font-magnolia mb-12 text-center"
          style={{ color: "#D4AF37" }}
        >
          About Princess Pirouette
        </h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-3xl font-playfair italic font-bold mb-4" style={{ color: "#B8860B" }}>
              Our Story
            </h2>
            <p style={{ color: "#C09090", lineHeight: "1.8" }}>
              Princess Pirouette Boutique was founded with a simple dream: to celebrate the magic of
              ballet and empower young dancers with beautiful, comfortable, and sustainable apparel.
              Every piece in our collection is crafted with love, care, and attention to detail.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-playfair italic font-bold mb-4" style={{ color: "#B8860B" }}>
              Our Mission
            </h2>
            <p style={{ color: "#C09090", lineHeight: "1.8" }}>
              We believe that every little princess deserves to feel magical on and off the stage.
              Our mission is to provide high-quality ballet wear that combines style, comfort, and
              sustainability. We are committed to supporting young dancers in their journey as they
              discover their passion for dance.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-playfair italic font-bold mb-4" style={{ color: "#B8860B" }}>
              Sustainability
            </h2>
            <p style={{ color: "#C09090", lineHeight: "1.8" }}>
              We are dedicated to creating apparel that is both beautiful and environmentally
              responsible. Our materials are sourced ethically, and our production processes minimize
              waste and environmental impact. By choosing Princess Pirouette, you're supporting a
              sustainable future for dancers and our planet.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-playfair italic font-bold mb-4" style={{ color: "#B8860B" }}>
              Why Choose Us?
            </h2>
            <ul style={{ color: "#C09090", lineHeight: "1.8" }}>
              <li className="mb-3">✨ Premium quality materials designed for dancers</li>
              <li className="mb-3">✨ Sustainable and eco-friendly production</li>
              <li className="mb-3">✨ Expert craftsmanship in every piece</li>
              <li className="mb-3">✨ Beautiful designs that make you feel magical</li>
              <li className="mb-3">✨ Customer support that truly cares</li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
