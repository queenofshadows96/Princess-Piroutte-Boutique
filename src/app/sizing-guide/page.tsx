"use client";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sizing Guide | Princess Pirouette Boutique",
  description: "Find the perfect size for your little dancer.",
};

export default function SizingGuidePage() {
  return (
    <main style={{ backgroundColor: "#FFF5F7", minHeight: "100vh", paddingTop: "100px" }}>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1
          className="text-5xl font-magnolia mb-12 text-center"
          style={{ color: "#D4AF37" }}
        >
          Sizing Guide
        </h1>

        <section className="mb-12">
          <h2 className="text-3xl font-playfair italic font-bold mb-6" style={{ color: "#B8860B" }}>
            How to Measure
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 rounded-lg border-2 bg-white" style={{ borderColor: "#B8860B" }}>
              <h3 className="font-playfair italic font-bold mb-3" style={{ color: "#D4AF37" }}>
                Chest
              </h3>
              <p style={{ color: "#C09090" }}>
                Measure around the fullest part of the chest, keeping the measuring tape parallel to the ground.
              </p>
            </div>
            <div className="p-6 rounded-lg border-2 bg-white" style={{ borderColor: "#B8860B" }}>
              <h3 className="font-playfair italic font-bold mb-3" style={{ color: "#D4AF37" }}>
                Waist
              </h3>
              <p style={{ color: "#C09090" }}>
                Measure around the natural waistline, keeping the tape snug but not tight.
              </p>
            </div>
            <div className="p-6 rounded-lg border-2 bg-white" style={{ borderColor: "#B8860B" }}>
              <h3 className="font-playfair italic font-bold mb-3" style={{ color: "#D4AF37" }}>
                Length
              </h3>
              <p style={{ color: "#C09090" }}>
                Measure from the shoulder to the desired hem length, typically to the knee for tutus.
              </p>
            </div>
            <div className="p-6 rounded-lg border-2 bg-white" style={{ borderColor: "#B8860B" }}>
              <h3 className="font-playfair italic font-bold mb-3" style={{ color: "#D4AF37" }}>
                Inseam
              </h3>
              <p style={{ color: "#C09090" }}>
                Measure from the inner thigh to the ankle for pants and leggings.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-playfair italic font-bold mb-6" style={{ color: "#B8860B" }}>
            Size Chart
          </h2>
          <div className="overflow-x-auto border-2 rounded-lg" style={{ borderColor: "#B8860B" }}>
            <table className="w-full bg-white">
              <thead>
                <tr style={{ backgroundColor: "#FFD1DC" }}>
                  <th className="px-4 py-3 text-left font-playfair italic font-bold" style={{ color: "#B8860B" }}>
                    Size
                  </th>
                  <th className="px-4 py-3 text-left font-playfair italic font-bold" style={{ color: "#B8860B" }}>
                    Age
                  </th>
                  <th className="px-4 py-3 text-left font-playfair italic font-bold" style={{ color: "#B8860B" }}>
                    Chest (in)
                  </th>
                  <th className="px-4 py-3 text-left font-playfair italic font-bold" style={{ color: "#B8860B" }}>
                    Waist (in)
                  </th>
                  <th className="px-4 py-3 text-left font-playfair italic font-bold" style={{ color: "#B8860B" }}>
                    Length (in)
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { size: "XS", age: "2-4", chest: "20-22", waist: "19-21", length: "12-14" },
                  { size: "S", age: "4-6", chest: "22-24", waist: "21-23", length: "14-16" },
                  { size: "M", age: "6-8", chest: "24-26", waist: "23-25", length: "16-18" },
                  { size: "L", age: "8-10", chest: "26-28", waist: "25-27", length: "18-20" },
                  { size: "XL", age: "10-12", chest: "28-30", waist: "27-29", length: "20-22" },
                ].map((row) => (
                  <tr key={row.size} style={{ borderBottom: "1px solid #FFD1DC" }}>
                    <td className="px-4 py-3 font-playfair italic font-bold" style={{ color: "#D4AF37" }}>
                      {row.size}
                    </td>
                    <td className="px-4 py-3" style={{ color: "#C09090" }}>
                      {row.age}
                    </td>
                    <td className="px-4 py-3" style={{ color: "#C09090" }}>
                      {row.chest}
                    </td>
                    <td className="px-4 py-3" style={{ color: "#C09090" }}>
                      {row.waist}
                    </td>
                    <td className="px-4 py-3" style={{ color: "#C09090" }}>
                      {row.length}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-12 p-6 rounded-lg border-2 bg-white" style={{ borderColor: "#B8860B" }}>
          <h2 className="text-2xl font-playfair italic font-bold mb-4" style={{ color: "#B8860B" }}>
            Need Help Finding Your Size?
          </h2>
          <p style={{ color: "#C09090", marginBottom: "1rem" }}>
            If you're unsure about sizing, our customer support team is here to help! Contact us for personalized
            recommendations.
          </p>
          <a
            href="/contact"
            className="inline-block px-6 py-2 rounded-lg font-playfair italic font-semibold text-white transition-all"
            style={{ backgroundColor: "#D4AF37" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#B8860B")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#D4AF37")}
          >
            Contact Support
          </a>
        </section>
      </div>
    </main>
  );
}
