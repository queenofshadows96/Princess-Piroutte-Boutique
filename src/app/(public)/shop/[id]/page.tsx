"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Great_Vibes, Playfair_Display } from "next/font/google";
import { useCart } from "@/context/CartContext";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

import ProductGalleryClient from "./ProductGalleryClient";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const magnolia = Great_Vibes({ subsets: ["latin"], weight: ["400"] });
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["italic"],
});

interface ProductColorImage {
  id: string;
  image_url: string;
  sort_order: number | null;
}

interface ProductColor {
  id: string;
  color_name: string;
  product_color_images_color_id_fkey: ProductColorImage[] | null;
}

interface Size {
  id: string;
  name: string;
  sort_order: number;
}

interface ProductVariant {
  id: string;
  color_id: string | null;
  size_id: string;
  inventory: number;
  sizes: Size | null;
}

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  product_colors: ProductColor[] | null;
  product_variants: ProductVariant[] | null;
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const [selectedColorId, setSelectedColorId] = useState<string | null>(null);
  const [selectedSizeId, setSelectedSizeId] = useState<string | null>(null);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);

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
            product_color_images_color_id_fkey (
              id,
              image_url,
              sort_order
            )
          ),
          product_variants (
            id,
            color_id,
            size_id,
            inventory,
            sizes (
              id,
              name,
              sort_order
            )
          )
        `
        )
        .eq("id", id)
        .single();

      if (!error && data) {
        const normalized: Product = {
          ...data,
          product_colors: data.product_colors ?? [],
          product_variants: data.product_variants ?? [],
        };
        setProduct(normalized);

        if (normalized.product_colors.length > 0) {
          setSelectedColorId(normalized.product_colors[0].id);
        }
      }

      setLoading(false);
    }

    fetchProduct();
  }, [id]);

  const currentColor: ProductColor | null = useMemo(() => {
    if (!product?.product_colors?.length) return null;
    return (
      product.product_colors.find((c) => c.id === selectedColorId) ??
      product.product_colors[0]
    );
  }, [product, selectedColorId]);

  const sizesForCurrentColor = useMemo(() => {
    if (!product?.product_variants) return [];

    const variantsForColor = product.product_variants.filter((v) =>
      currentColor ? v.color_id === currentColor.id : true
    );

    const map = new Map<string, ProductVariant>();

    for (const v of variantsForColor) {
      if (!v.sizes) continue;

      if (!map.has(v.size_id)) {
        map.set(v.size_id, v);
      } else {
        const existing = map.get(v.size_id)!;
        if (v.inventory > existing.inventory) {
          map.set(v.size_id, v);
        }
      }
    }

    return Array.from(map.values()).sort((a, b) => {
      const orderA = a.sizes?.sort_order ?? 9999;
      const orderB = b.sizes?.sort_order ?? 9999;

      if (orderA !== orderB) return orderA - orderB;

      return (a.sizes?.name ?? "").localeCompare(b.sizes?.name ?? "");
    });
  }, [product, currentColor]);

  const handleAddToCart = () => {
    if (!product) return;

    if (!selectedSizeId) {
      alert("Please select a size first!");
      return;
    }

    const variant = sizesForCurrentColor.find(
      (v) => v.size_id === selectedSizeId
    );

    if (!variant?.sizes) {
      alert("Please select a valid size!");
      return;
    }

    if (variant.inventory <= 0) {
      alert("That size is sold out.");
      return;
    }

    // ⭐ FINAL FIX — ADD colorId
    addToCart({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      size: variant.sizes.name,
      colorId: selectedColorId!, // ⭐ REQUIRED
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
              style={{
                backgroundColor: "#FFD1DC",
                color: "#D4AF37",
                border: "2px solid #B8860B",
              }}
            >
              Back to Shop
            </button>
          </Link>
        </div>
      </main>
    );
  }

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
              style={{
                backgroundColor: "#FFD1DC",
                color: "#D4AF37",
                border: "2px solid #B8860B",
              }}
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
          >
            <ProductGalleryClient
              product={product}
              selectedColorId={selectedColorId}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <span
              className="text-xs font-bold px-4 py-1 rounded-full"
              style={{
                backgroundColor: "#FFD1DC",
                color: "#B8860B",
                border: "1px solid #B8860B",
              }}
            >
              {product.category}
            </span>

            <h1
              className={`${magnolia.className} text-4xl md:text-5xl`}
              style={{ color: "#D4AF37" }}
            >
              {product.name}
            </h1>

            <p
              className={`${magnolia.className} text-3xl`}
              style={{ color: "#B8860B" }}
            >
              ${product.price}
            </p>

            {product.product_colors?.length > 0 && (
              <div>
                <p
                  className={`${playfair.className} italic font-bold mb-3`}
                  style={{ color: "#D4AF37" }}
                >
                  Select Color
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.product_colors.map((color) => (
                    <button
                      key={color.id}
                      type="button"
                      onClick={() => {
                        setSelectedColorId(color.id);
                        setSelectedSizeId(null);
                      }}
                      className="px-4 py-2 rounded-full text-sm font-bold transition-all hover:-translate-y-1"
                      style={{
                        backgroundColor:
                          selectedColorId === color.id ? "#D4AF37" : "#FFD1DC",
                        color:
                          selectedColorId === color.id ? "#fff" : "#8B4565",
                        border: "1px solid #B8860B",
                      }}
                    >
                      {color.color_name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <p
                className={`${playfair.className} italic font-bold mb-3`}
                style={{ color: "#D4AF37" }}
              >
                Select Size
              </p>
              <div className="flex flex-wrap gap-2">
                {sizesForCurrentColor.length > 0 ? (
                  sizesForCurrentColor.map((variant) => {
                    const sizeName = variant.sizes?.name ?? "";
                    const isSoldOut = variant.inventory <= 0;
                    const isSelected = selectedSizeId === variant.size_id;

                    return (
                      <button
                        key={variant.id}
                        type="button"
                        onClick={() => {
                          if (!isSoldOut) setSelectedSizeId(variant.size_id);
                        }}
                        disabled={isSoldOut}
                        className="px-4 py-2 rounded-full text-sm font-bold transition-all hover:-translate-y-1 disabled:cursor-not-allowed"
                        style={{
                          backgroundColor: isSelected
                            ? "#D4AF37"
                            : "#FFD1DC",
                          color: isSelected ? "#fff" : "#8B4565",
                          border: "1px solid #B8860B",
                          opacity: isSoldOut ? 0.5 : 1,
                        }}
                      >
                        {sizeName}
                        {isSoldOut && " (Sold out)"}
                      </button>
                    );
                  })
                ) : (
                  <p className="text-xs" style={{ color: "#C09090" }}>
                    Sizes coming soon.
                  </p>
                )}
              </div>

              <Link href="/sizing-guide">
                <p
                  className="text-xs mt-2 underline cursor-pointer"
                  style={{ color: "#C09090" }}
                >
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
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.92)",
                border: "2px solid #B8860B",
              }}
            >
              <h2
                className={`${playfair.className} italic text-xl font-bold mb-4`}
                style={{ color: "#D4AF37" }}
              >
                About This Piece
              </h2>
              <p
                className="text-sm leading-loose whitespace-pre-line"
                style={{
                  color: "#C09090",
                  fontFamily: "'Times New Roman', serif",
                }}
              >
                {product.description}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
