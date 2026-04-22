"use client";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product | Princess Pirouette Boutique",
  description: "View product details.",
};

export default function ProductPage({ params }: { params: { id: string } }) {
  return (
    <main style={{ backgroundColor: "#FFF5F7", minHeight: "100vh", paddingTop: "100px" }}>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div
            className="rounded-lg overflow-hidden border-2"
            style={{
              borderColor: "#B8860B",
              backgroundColor: "#FFD1DC",
              height: "500px",
            }}
          />

          {/* Product Details */}
          <div>
            <h1
              className="text-4xl font-magnolia mb-4"
              style={{ color: "#D4AF37" }}
            >
              Princess Tutu Collection
            </h1>

            <p
              className="text-2xl font-playfair italic font-bold mb-6"
              style={{ color: "#D4AF37" }}
            >
              $XX.XX
            </p>

            <p className="text-lg mb-8" style={{ color: "#C09090" }}>
              A magical tutu perfect for every young ballerina. Made with premium materials and
              expert craftsmanship to ensure comfort and durability.
            </p>

            {/* Size selector */}
            <div className="mb-6">
              <label className="block font-playfair italic mb-2" style={{ color: "#B8860B" }}>
                Size
              </label>
              <select
                className="w-full p-2 border-2 rounded"
                style={{ borderColor: "#B8860B" }}
              >
                <option>Select Size</option>
                <option>XS (2-4)</option>
                <option>S (4-6)</option>
                <option>M (6-8)</option>
                <option>L (8-10)</option>
                <option>XL (10-12)</option>
              </select>
            </div>

            {/* Quantity selector */}
            <div className="mb-6">
              <label className="block font-playfair italic mb-2" style={{ color: "#B8860B" }}>
                Quantity
              </label>
              <input
                type="number"
                min="1"
                defaultValue="1"
                className="w-full p-2 border-2 rounded"
                style={{ borderColor: "#B8860B" }}
              />
            </div>

            {/* Add to cart button */}
            <button
              className="w-full py-3 rounded-lg font-playfair italic font-bold text-white transition-all mb-4"
              style={{ backgroundColor: "#D4AF37" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#B8860B")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#D4AF37")}
            >
              Add to Cart
            </button>

            {/* Product details */}
            <div className="border-t-2 pt-6" style={{ borderColor: "#FFD1DC" }}>
              <h3 className="font-playfair italic font-bold mb-4" style={{ color: "#B8860B" }}>
                Product Details
              </h3>
              <ul style={{ color: "#C09090" }}>
                <li className="mb-2">• Premium ballet-quality material</li>
                <li className="mb-2">• Sustainable and eco-friendly</li>
                <li className="mb-2">• Perfect fit and comfort</li>
                <li className="mb-2">• Available in multiple colors</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
