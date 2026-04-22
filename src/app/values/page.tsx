"use client";

import { Metadata } from "next";
import CrownIcon from "@/components/CrownIcon";

export const metadata: Metadata = {
  title: "Our Values | Princess Pirouette Boutique",
  description: "Learn about the values that drive Princess Pirouette.",
};

const valuesList = [
  {
    title: "Passion for Dance",
    description:
      "Every piece is crafted with love for ballet and the joy it brings to young dancers. We celebrate the artistry, dedication, and magic of dance.",
  },
  {
    title: "Quality & Comfort",
    description:
      "Premium materials and expert tailoring ensure comfort during every pirouette. We never compromise on quality because our dancers deserve the best.",
  },
  {
    title: "Magical Experience",
    description:
      "Transform your little one into a princess ballerina with our enchanting collection. We believe in making dreams come true, one tutu at a time.",
  },
  {
    title: "Sustainability",
    description:
      "We are committed to protecting our planet. Our eco-friendly practices and sustainable materials ensure a beautiful future for all dancers.",
  },
  {
    title: "Inclusivity",
    description:
      "Ballet is for everyone. We celebrate dancers of all backgrounds, body types, and abilities in our inclusive and welcoming community.",
  },
  {
    title: "Customer Care",
    description:
      "Your satisfaction is our priority. We provide exceptional customer service and support because every customer is part of the Princess Pirouette family.",
  },
];

export default function ValuesPage() {
  return (
    <main style={{ backgroundColor: "#FFF5F7", minHeight: "100vh", paddingTop: "100px" }}>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1
          className="text-5xl font-magnolia mb-12 text-center"
          style={{ color: "#D4AF37" }}
        >
          Our Values
        </h1>

        <p
          className="text-xl text-center mb-16 max-w-3xl mx-auto"
          style={{ color: "#C09090" }}
        >
          At Princess Pirouette Boutique, our values guide everything we do. From the products we
          create to the relationships we build with our community, we are driven by a passion for
          excellence and a commitment to making a positive impact.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {valuesList.map((value, index) => (
            <div
              key={index}
              className="p-8 rounded-lg border-2 bg-white hover:shadow-lg transition-shadow"
              style={{ borderColor: "#B8860B" }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="rounded-full p-3 flex-shrink-0" style={{ backgroundColor: "#FFD1DC" }}>
                  <CrownIcon width={24} height={24} color="#D4AF37" />
                </div>
                <h2 className="text-2xl font-playfair italic font-bold" style={{ color: "#B8860B" }}>
                  {value.title}
                </h2>
              </div>
              <p style={{ color: "#C09090", lineHeight: "1.8" }}>
                {value.description}
              </p>
            </div>
          ))}
        </div>

        <section className="p-8 rounded-lg border-2 bg-white" style={{ borderColor: "#B8860B" }}>
          <h2 className="text-3xl font-playfair italic font-bold mb-6 text-center" style={{ color: "#B8860B" }}>
            Join Our Community
          </h2>
          <p style={{ color: "#C09090", lineHeight: "1.8", marginBottom: "1.5rem" }}>
            We invite you to be part of the Princess Pirouette family. Whether you're a young dancer
            just starting your journey or an experienced performer, we celebrate your passion and
            support your dreams. Together, we create a community where every dancer feels magical,
            supported, and inspired.
          </p>
          <div className="text-center">
            <a
              href="/shop"
              className="inline-block px-6 py-3 rounded-lg font-playfair italic font-semibold text-white transition-all"
              style={{ backgroundColor: "#D4AF37" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#B8860B")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#D4AF37")}
            >
              Explore Our Collection
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
