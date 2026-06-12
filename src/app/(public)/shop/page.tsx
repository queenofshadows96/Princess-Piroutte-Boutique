"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Great_Vibes } from "next/font/google";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const magnolia = Great_Vibes({ subsets: ["latin"], weight: ["400"] });

interface ProductColorImage {
  id: string;
  image_url: string;
  sort_order: number | null;
}

interface ProductColor {
  id: string;
  color_name: string;
  product_color_images: ProductColorImage[] | null;
}

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  product_colors: ProductColor[] | null;
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
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from("products")
        .select(
          `
          id,
          name,
          price,
          description,
          category,
          product_colors (
            id,
            color_name,
            product_color_images (
              id,
              image_url,
              sort_order
            )
          )
        `
        );

      if (!error && data) {
        const normalized = data.map((p) => ({
          ...p,
          product_colors: p.product_colors ?? [],
        }));
        setProducts(normalized);
      }

      setLoading(false);
    }

    fetchProducts();
  }, []);

  const getPrimaryImage = (product: Product) => {
    const firstColor = product.product_colors?.[0];
    if (!firstColor?.product_color_images?.length) return null;

    const sorted = [...firstColor.product_color_images].sort(
      (a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0)
    );

    return sorted[0].image_url;
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
          <p
            className="text-lg"
            style={{
              color: "#C09090",
              fontFamily: "'Times New Roman', serif",
            }}
          >
            Discover our most enchanting pieces, crafted for your inner princess
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center py-20">
            <p
              className={`${magnolia.className} text-2xl`}
              style={{ color: "#D4AF37" }}
            >
              Loading magic...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product, index) => {
              const primaryImage = getPrimaryImage(product);

              return (
                <Link href={`/shop/${product.id}`} key={product.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.15 }}
                    whileHover={{
                      scale: 1.04,
                      boxShadow:
                        "0 20px 40px rgba(212,175,55,0.15), 0 8px 20px rgba(0,0,0,0.10)",
                    }}
                    className="float-card"
                    style={floatStyles[index % floatStyles.length]}
                  >
                    <Card
                      className="overflow-hidden rounded-3xl border-0 ring-0 cursor-pointer"
                      style={{
                        backgroundColor: "#FFFDF5",
                        border: "2px solid #B8860B",
                      }}
                    >
                      <div
                        className={`bg-gradient-to-br ${
                          gradients[index % gradients.length]
                        } h-56 flex items-center justify-center relative`}
                      >
                        {primaryImage ? (
                          <img
                            src={primaryImage}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-7xl filter drop-shadow-lg">
                            🩰
                          </span>
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

                        <p
                          className="text-sm leading-relaxed mb-4"
                          style={{
                            color: "#C09090",
                            fontFamily: "'Times New Roman', serif",
                          }}
                        >
                          {product.description.slice(0, 120)}...
                        </p>

                        <div className="flex items-center justify-between">
                          <span
                            className={`${magnolia.className} text-2xl font-bold`}
                            style={{ color: "#D4AF37" }}
                          >
                            ${product.price}
                          </span>

                          <button
                            className="rounded-full font-semibold px-5 py-2 text-sm transition-all"
                            style={{
                              backgroundColor: "#FFD1DC",
                              color: "#8B4565",
                              border: "1px solid #B8860B",
                            }}
                          >
                            View
                          </button>
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
