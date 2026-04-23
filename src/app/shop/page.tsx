"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Great_Vibes } from "next/font/google";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/context/CartContext";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const magnolia = Great_Vibes({ subsets: ["latin"], weight: ["400"] });

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

const floatStyles = [
  { animationDelay: "0s", animationDuration: "4s" },
  { animationDelay: "0.8s", animationDuration: "4.5s" },
  { animationDelay: "1.6s", animationDuration: "5s" },
];

const gradients = [
  "from-[#FFD1DC] to-[#E8B4C8]",
  "from-[#FADADD] to-[#FFD1DC]",
  "from-[#D4E8F0] to-[#C8D4E8]",
];

export default function Shop() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [addedIds, setAddedIds] = useState<Set<number>>(new Set());
  const [selectedSizes, setSelectedSizes] = useState<Record<number, string>>({});

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase.from("products").select("*");
      if (!error && data) setProducts(data);
      setLoading(false);
    }
    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    const size = selectedSizes[product.id];
    if (!size) {
      alert("Please select a size first!");
      return;
    }
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      size,
      emoji: "🩰",
      gradient: gradients[product.id % gradients.length],
    });
    setAddedIds((prev) => new Set(prev).add(product.id));
    setTimeout(() => {
      setAddedIds((prev) => {
        const next = new Set(prev);
        next.delete(product.id);
        return next;
      });
    }, 1600);
  };

  return (
    <main className="relative z-10 py-20 px-6 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1
            className={`${magnolia.className} text-4xl md:text-5xl font-bold mb-4`}
            style={{ color: "#D4AF37" }}
          >
            Our Collection
          </h1>
          <p className="text-lg" style={{ color: "#C09090", fontFamily: "'Times New Roman', serif" }}>
            Discover our most enchanting pieces, crafted for your inner princess
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center py-20">
            <p className={`${magnolia.className} text-2xl`} style={{ color: "#D4AF37" }}>
              Loading magic...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product, index) => {
              const added = addedIds.has(product.id);
              const sizes = product.size.split(",");
              return (
                <Link href={`/shop/${product.id}`} key={product.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.15 }}
                    whileHover={{
                      scale: 1.04,
                      boxShadow: "0 20px 40px rgba(212,175,55,0.15), 0 8px 20px rgba(0,0,0,0.10)",
                    }}
                    className="float-card"
                    style={floatStyles[index % floatStyles.length]}
                  >
                    <Card
                      className="overflow-hidden rounded-3xl border-0 ring-0 cursor-pointer"
                      style={{ backgroundColor: "#FFFDF5", border: "2px solid #B8860B" }}
                    >
                      <div
                        className={`bg-gradient-to-br ${gradients[index % gradients.length]} h-56 flex items-center justify-center relative`}
                      >
                        {product.image_url && product.image_url !== "placeholder" ? (
                          <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-7xl filter drop-shadow-lg">🩰</span>
                        )}
                        <div className="absolute top-4 right-4">
                          <Badge
                            className="text-white text-xs font-semibold px-3 py-1 rounded-full"
                            style={{ backgroundColor: "#D4AF37" }}
                          >
                            {product.category}
                          </Badge>
                        </div>
                      </div>

                      <CardContent className="p-6">
                        <h3
                          className={`${magnolia.className} text-xl font-bold mb-2`}
                          style={{ color: "#D4AF37" }}
                        >
                          {product.name}
                        </h3>
                        <p className="text-sm leading-relaxed mb-4" style={{ color: "#C09090" }}>
                          {product.description.slice(0, 120)}...
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {sizes.map((size) => (
                            <button
                              key={size}
                              onClick={(e) => {
                                e.preventDefault();
                                setSelectedSizes((prev) => ({ ...prev, [product.id]: size }));
                              }}
                              className="px-3 py-1 rounded-full text-xs font-bold transition-all hover:-translate-y-1"
                              style={{
                                backgroundColor: selectedSizes[product.id] === size ? "#D4AF37" : "#FFD1DC",
                                color: selectedSizes[product.id] === size ? "#fff" : "#8B4565",
                                border: "1px solid #B8860B",
                              }}
                            >
                              {size}
                            </button>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <span
                            className={`${magnolia.className} text-2xl font-bold`}
                            style={{ color: "#D4AF37" }}
                          >
                            ${product.price}
                          </span>
                          <AnimatePresence mode="wait">
                            <motion.button
                              key={added ? "added" : "idle"}
                              initial={{ opacity: 0, scale: 0.85 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.85 }}
                              transition={{ duration: 0.18 }}
                              onClick={(e) => handleAddToCart(product, e)}
                              disabled={added}
                              className="rounded-full font-semibold px-5 py-2 text-sm transition-all"
                              style={{
                                backgroundColor: added ? "#D4AF37" : "#FFD1DC",
                                color: added ? "#fff" : "#8B4565",
                                cursor: added ? "default" : "pointer",
                              }}
                            >
                              {added ? "Added ✓" : "Add to Cart"}
                            </motion.button>
                          </AnimatePresence>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
