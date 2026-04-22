"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase, type Product } from "@/lib/supabase";
import { useCart } from "@/context/CartContext";

function ProductSkeleton() {
  return (
    <div className="bg-white rounded-lg overflow-hidden border-2 animate-pulse" style={{ borderColor: "#B8860B" }}>
      <div className="w-full h-64" style={{ backgroundColor: "#FFD1DC", opacity: 0.5 }} />
      <div className="p-5 space-y-3">
        <div className="h-5 rounded" style={{ backgroundColor: "#FFD1DC", width: "70%" }} />
        <div className="h-4 rounded" style={{ backgroundColor: "#FFD1DC", width: "90%" }} />
        <div className="flex justify-between items-center pt-2">
          <div className="h-5 rounded" style={{ backgroundColor: "#FFD1DC", width: "25%" }} />
          <div className="h-9 rounded w-28" style={{ backgroundColor: "#FFD1DC" }} />
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const sizes = product.size
    ? product.size.split(",").map((s) => s.trim()).filter(Boolean)
    : [];

  const [selectedSize, setSelectedSize] = useState<string>(sizes[0] ?? "");

  const handleAddToCart = () => {
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

  return (
    <div
      className="bg-white rounded-lg overflow-hidden border-2 flex flex-col transition-shadow duration-300 hover:shadow-xl"
      style={{ borderColor: "#B8860B" }}
    >
      <Link href={`/shop/${product.id}`} className="block relative w-full h-64 overflow-hidden">
        {product.image_url && product.image_url !== "placeholder" ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: "#FFD1DC" }}>
            <span className="font-magnolia text-2xl" style={{ color: "#B8860B", opacity: 0.5 }}>
              Princess Pirouette
            </span>
          </div>
        )}
      </Link>

      <div className="p-5 flex flex-col flex-1">
        <Link href={`/shop/${product.id}`} className="block">
          <h3
            className="text-xl font-playfair italic font-bold mb-1 hover:underline"
            style={{ color: "#B8860B" }}
          >
            {product.name}
          </h3>
        </Link>

        {product.category && (
          <p className="text-xs font-playfair uppercase tracking-widest mb-2" style={{ color: "#D4AF37" }}>
            {product.category}
          </p>
        )}

        <p className="text-sm font-playfair mb-3 flex-1 line-clamp-2" style={{ color: "#C09090" }}>
          {product.description}
        </p>

        {/* Size selector */}
        {sizes.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className="px-2 py-1 rounded border font-playfair italic text-xs font-semibold transition-all duration-150"
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

        <div className="flex justify-between items-center mt-auto">
          <span className="text-lg font-playfair italic font-bold" style={{ color: "#D4AF37" }}>
            ${Number(product.price).toFixed(2)}
          </span>

          <button
            onClick={handleAddToCart}
            className="px-4 py-2 rounded font-playfair italic font-semibold text-sm text-white transition-all duration-200"
            style={{ backgroundColor: added ? "#B8860B" : "#D4AF37", minWidth: "110px" }}
            onMouseEnter={(e) => { if (!added) e.currentTarget.style.backgroundColor = "#B8860B"; }}
            onMouseLeave={(e) => { if (!added) e.currentTarget.style.backgroundColor = "#D4AF37"; }}
          >
            {added ? "Added!" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setProducts(data ?? []);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Could not load products.";
        setError(message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return (
    <main style={{ backgroundColor: "#FFF5F7", minHeight: "100vh", paddingTop: "100px" }}>
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1
          className="font-magnolia text-center mb-4"
          style={{ color: "#D4AF37", fontSize: "clamp(2.8rem, 7vw, 5rem)" }}
        >
          Shop Our Collection
        </h1>

        <p
          className="font-playfair italic text-center mb-14 text-lg"
          style={{ color: "#C09090" }}
        >
          Enchanting ballet wear crafted for every young princess.
        </p>

        {/* Loading */}
        {loading && (
          <div className="grid md:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => <ProductSkeleton key={i} />)}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div
            className="text-center py-20 border-2 rounded-lg bg-white"
            style={{ borderColor: "#B8860B" }}
          >
            <p className="font-playfair italic text-lg mb-2" style={{ color: "#B8860B" }}>
              Unable to load products
            </p>
            <p className="font-playfair text-sm" style={{ color: "#C09090" }}>
              {error}
            </p>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && products.length === 0 && (
          <div
            className="text-center py-20 border-2 rounded-lg bg-white"
            style={{ borderColor: "#B8860B" }}
          >
            <p className="font-playfair italic text-xl mb-2" style={{ color: "#B8860B" }}>
              Our collection is coming soon
            </p>
            <p className="font-playfair text-sm" style={{ color: "#C09090" }}>
              Check back shortly — something magical is on its way.
            </p>
          </div>
        )}

        {/* Products grid */}
        {!loading && !error && products.length > 0 && (
          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
