"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase, type Product } from "@/lib/supabase";
import { useCart } from "@/context/CartContext";

export default function ProductPage({ params }: { params: { id: string } }) {
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [added, setAdded] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", params.id)
        .single();

      if (error || !data) {
        setNotFound(true);
      } else {
        setProduct(data);
        const sizes = data.size
          ? data.size.split(",").map((s: string) => s.trim()).filter(Boolean)
          : [];
        if (sizes.length > 0) setSelectedSize(sizes[0]);
      }
      setLoading(false);
    }
    fetchProduct();
  }, [params.id]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({
      id: String(product.id),
      name: product.name,
      price: product.price,
      size: selectedSize || "One Size",
      image_url: product.image_url ?? undefined,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  const sizes = product?.size
    ? product.size.split(",").map((s) => s.trim()).filter(Boolean)
    : [];

  if (loading) {
    return (
      <main style={{ backgroundColor: "#FFF5F7", minHeight: "100vh", paddingTop: "100px" }}>
        <div className="max-w-4xl mx-auto px-4 py-12 animate-pulse">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="rounded-lg" style={{ backgroundColor: "#FFD1DC", height: "500px" }} />
            <div className="space-y-4">
              <div className="h-10 rounded" style={{ backgroundColor: "#FFD1DC", width: "70%" }} />
              <div className="h-6 rounded" style={{ backgroundColor: "#FFD1DC", width: "30%" }} />
              <div className="h-20 rounded" style={{ backgroundColor: "#FFD1DC" }} />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (notFound || !product) {
    return (
      <main style={{ backgroundColor: "#FFF5F7", minHeight: "100vh", paddingTop: "100px" }}>
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <p className="font-playfair italic text-xl mb-4" style={{ color: "#B8860B" }}>
            Product not found
          </p>
          <Link href="/shop" className="font-playfair italic underline" style={{ color: "#D4AF37" }}>
            Back to Shop
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main style={{ backgroundColor: "#FFF5F7", minHeight: "100vh", paddingTop: "100px" }}>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link
          href="/shop"
          className="inline-block mb-8 font-playfair italic text-sm underline"
          style={{ color: "#B8860B" }}
        >
          ← Back to Shop
        </Link>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div
            className="rounded-lg overflow-hidden border-2 relative"
            style={{ borderColor: "#B8860B", height: "500px" }}
          >
            {product.image_url && product.image_url !== "placeholder" ? (
              <Image
                src={product.image_url}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center"
                style={{ backgroundColor: "#FFD1DC" }}
              >
                <span
                  className="font-magnolia text-2xl"
                  style={{ color: "#B8860B", opacity: 0.5 }}
                >
                  Princess Pirouette
                </span>
              </div>
            )}
          </div>

          {/* Product Details */}
          <div>
            {product.category && (
              <p
                className="text-xs font-playfair uppercase tracking-widest mb-2"
                style={{ color: "#D4AF37" }}
              >
                {product.category}
              </p>
            )}

            <h1
              className="text-4xl font-magnolia mb-4"
              style={{ color: "#D4AF37" }}
            >
              {product.name}
            </h1>

            <p
              className="text-2xl font-playfair italic font-bold mb-6"
              style={{ color: "#D4AF37" }}
            >
              ${Number(product.price).toFixed(2)}
            </p>

            <p className="text-lg mb-8" style={{ color: "#C09090" }}>
              {product.description}
            </p>

            {/* Size selector */}
            {sizes.length > 0 && (
              <div className="mb-6">
                <label
                  className="block font-playfair italic mb-3"
                  style={{ color: "#B8860B" }}
                >
                  Size
                </label>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className="px-4 py-2 rounded border-2 font-playfair italic text-sm font-semibold transition-all duration-150"
                      style={{
                        borderColor: "#B8860B",
                        backgroundColor: selectedSize === size ? "#B8860B" : "white",
                        color: selectedSize === size ? "white" : "#B8860B",
                      }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Add to cart */}
            <button
              onClick={handleAddToCart}
              className="w-full py-3 rounded-lg font-playfair italic font-bold text-white transition-all mb-4"
              style={{ backgroundColor: added ? "#B8860B" : "#D4AF37" }}
              onMouseEnter={(e) => {
                if (!added) e.currentTarget.style.backgroundColor = "#B8860B";
              }}
              onMouseLeave={(e) => {
                if (!added) e.currentTarget.style.backgroundColor = "#D4AF37";
              }}
            >
              {added ? "Added to Cart!" : "Add to Cart"}
            </button>

            {/* Product details */}
            <div className="border-t-2 pt-6" style={{ borderColor: "#FFD1DC" }}>
              <h3
                className="font-playfair italic font-bold mb-4"
                style={{ color: "#B8860B" }}
              >
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
