"use client";

import { useState, useEffect, } from "react";
import { motion } from "framer-motion";
import { Great_Vibes, Playfair_Display } from "next/font/google";
import { useCart } from "@/context/CartContext";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const magnolia = Great_Vibes({ subsets: ["latin"], weight: ["400"] });
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "700"], style: ["italic"] });

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image_url: string;
  stock: number;
  size: string;
  category: string;
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const id = params.id;
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("");
  const [added, setAdded] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();
      if (!error && data) setProduct(data);
      setLoading(false);
    }
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    if (!selectedSize) {
      alert("Please select a size first!");
      return;
    }
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      emoji: "🩰",
      gradient: "from-[#FFD1DC] to-[#E8B4C8]",
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  if (loading) {
    return (
      <main className="relative z-10 py-20 px-6 min-h-screen flex items-center justify-center">
        <p className={`${magnolia.className} text-2xl`} style={{ color: "#D4AF37" }}>
          Loading magic...
        </p>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="relative z-10 py-20 px-6 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className={`${magnolia.className} text-2xl mb-4`} style={{ color: "#D4AF37" }}>
            Product not found
          </p>
          <Link href="/shop">
            <button
              className="px-8 py-3 rounded-full font-bold transition-all hover:-translate-y-1"
              style={{ backgroundColor: "#FFD1DC", color: "#D4AF37", border: "2px solid #B8860B" }}
            >
              Back to Shop
            </button>
          </Link>
        </div>
      </main>
    );
  }

  const sizes = product.size.split(",");

  return (
    <main className="relative z-10 py-20 px-6 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link href="/shop">
            <button
              className="px-6 py-2 rounded-full text-sm font-bold transition-all hover:-translate-y-1"
              style={{ backgroundColor: "#FFD1DC", color: "#D4AF37", border: "2px solid #B8860B" }}
            >
              Back to Shop
            </button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="rounded-3xl overflow-hidden"
            style={{ border: "2px solid #B8860B" }}
          >
            {product.image_url && product.image_url !== "placeholder" ? (
              <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
            ) : (
              <div className="h-96 flex items-center justify-center bg-gradient-to-br from-[#FFD1DC] to-[#E8B4C8]">
                <span className="text-9xl">🩰</span>
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <span
              className="text-xs font-bold px-4 py-1 rounded-full"
              style={{ backgroundColor: "#FFD1DC", color: "#B8860B", border: "1px solid #B8860B" }}
            >
              {product.category}
            </span>

            <h1 className={`${magnolia.className} text-4xl md:text-5xl`} style={{ color: "#D4AF37" }}>
              {product.name}
            </h1>

            <p className={`${magnolia.className} text-3xl`} style={{ color: "#B8860B" }}>
              ${product.price}
            </p>

            <div>
              <p className={`${playfair.className} italic font-bold mb-3`} style={{ color: "#D4AF37" }}>
                Select Size
              </p>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className="px-4 py-2 rounded-full text-sm font-bold transition-all hover:-translate-y-1"
                    style={{
                      backgroundColor: selectedSize === size ? "#D4AF37" : "#FFD1DC",
                      color: selectedSize === size ? "#fff" : "#8B4565",
                      border: "1px solid #B8860B",
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <Link href="/sizing-guide">
                <p className="text-xs mt-2 underline cursor-pointer" style={{ color: "#C09090" }}>
                  View Sizing Guide
                </p>
              </Link>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={added}
              className="w-full py-4 rounded-full font-bold text-lg transition-all hover:-translate-y-1 hover:shadow-xl"
              style={{
                backgroundColor: added ? "#D4AF37" : "#FFD1DC",
                color: added ? "#fff" : "#8B4565",
                border: "2px solid #B8860B",
              }}
            >
              {added ? "Added to Cart ✓" : "Add to Cart"}
            </button>

            <div
              className="p-6 rounded-3xl"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.92)", border: "2px solid #B8860B" }}
            >
              <h2
                className={`${playfair.className} italic text-xl font-bold mb-4`}
                style={{ color: "#D4AF37" }}
              >
                About This Piece
              </h2>
              <p className="text-sm leading-loose whitespace-pre-line" style={{ color: "#C09090" }}>
                {product.description}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
