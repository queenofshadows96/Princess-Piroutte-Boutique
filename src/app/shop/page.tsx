import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop | Princess Pirouette Boutique",
  description: "Explore our magical ballet and dancewear collection.",
};

export default function ShopPage() {
  return (
    <main style={{ backgroundColor: "#FFF5F7", minHeight: "100vh", paddingTop: "100px" }}>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1
          className="text-5xl font-magnolia mb-12 text-center"
          style={{ color: "#D4AF37" }}
        >
          Shop Our Collection
        </h1>

        <p className="text-center mb-8" style={{ color: "#C09090" }}>
          Discover our enchanting collection of ballet wear, tutus, and accessories.
        </p>

        {/* Placeholder for products - will be populated from Supabase */}
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="bg-white rounded-lg overflow-hidden border-2 hover:shadow-lg transition-shadow"
              style={{ borderColor: "#B8860B" }}
            >
              <div
                className="w-full h-64"
                style={{ backgroundColor: "#FFD1DC" }}
              />
              <div className="p-4">
                <h3 className="text-xl font-playfair italic mb-2" style={{ color: "#B8860B" }}>
                  Product {item}
                </h3>
                <p className="text-sm mb-4" style={{ color: "#C09090" }}>
                  Premium ballet wear for young dancers
                </p>
                <div className="flex justify-between items-center">
                  <span className="font-playfair italic font-bold" style={{ color: "#D4AF37" }}>
                    $XX.XX
                  </span>
                  <button
                    className="px-4 py-2 rounded text-white font-semibold transition-all"
                    style={{ backgroundColor: "#D4AF37" }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#B8860B")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#D4AF37")}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
