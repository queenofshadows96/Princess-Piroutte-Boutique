"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Great_Vibes } from "next/font/google";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { Minus, Plus, Trash2, Lock } from "lucide-react";

const magnolia = Great_Vibes({ subsets: ["latin"], weight: ["400"] });

const GOLD = "#C9A84C";
const GOLD_LIGHT = "rgba(201, 168, 76, 0.15)";
const GOLD_BORDER = "rgba(201, 168, 76, 0.35)";
const ROSE = "#D4AF37";

export default function Checkout() {
  const { items, totalItems, totalPrice, removeFromCart, updateQuantity } = useCart();

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const shipping = 0;
  const orderTotal = totalPrice;


  const set = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            size: item.size,
          })),
          customerEmail: form.email,
          customerName: form.name,
          shippingAddress: `${form.address}, ${form.city}, ${form.state} ${form.zip}, ${form.country}`,
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (totalItems === 0) {
    return (
      <main className="relative z-10 min-h-screen flex items-center justify-center px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-md"
        >
          <h1 className={`${magnolia.className} text-3xl font-bold mt-5 mb-3`} style={{ color: ROSE }}>
            Your Cart is Empty
          </h1>
          <p style={{ color: "#9A7A80" }}>
            Discover our enchanting collection and fill your cart with magic.
          </p>
          <Link href="/shop" className="mt-8 inline-block">
            <button
              className="rounded-full px-10 py-4 font-semibold mt-6 transition-all hover:-translate-y-1"
              style={{ backgroundColor: "#FFD1DC", color: "#8B4565", border: "2px solid #B8860B" }}
            >
              Shop the Collection
            </button>
          </Link>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="relative z-10 py-16 px-6 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h1 className={`${magnolia.className} text-4xl md:text-5xl font-bold mt-3`} style={{ color: ROSE }}>
            Complete Your Order
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start">
          <motion.form
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            onSubmit={handleSubmit}
            className="rounded-3xl p-8 md:p-10"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.95)", border: `1px solid ${GOLD_BORDER}` }}
          >
            <h2 className={`${magnolia.className} text-sm font-bold tracking-widest uppercase mb-5`} style={{ color: GOLD }}>
              Shipping Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-semibold tracking-widest uppercase mb-1.5" style={{ color: ROSE }}>Full Name</label>
                <input
                  type="text"
                  placeholder="Aurora Belle"
                  value={form.name}
                  onChange={set("name")}
                  required
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ backgroundColor: "rgba(255, 253, 245, 0.9)", border: `1px solid ${GOLD_BORDER}`, color: "#6B4A5A" }}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold tracking-widest uppercase mb-1.5" style={{ color: ROSE }}>Email Address</label>
                <input
                  type="email"
                  placeholder="aurora@pirouette.com"
                  value={form.email}
                  onChange={set("email")}
                  required
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ backgroundColor: "rgba(255, 253, 245, 0.9)", border: `1px solid ${GOLD_BORDER}`, color: "#6B4A5A" }}
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-xs font-semibold tracking-widest uppercase mb-1.5" style={{ color: ROSE }}>Street Address</label>
              <input
                type="text"
                placeholder="12 Enchanted Lane"
                value={form.address}
                onChange={set("address")}
                required
                className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                style={{ backgroundColor: "rgba(255, 253, 245, 0.9)", border: `1px solid ${GOLD_BORDER}`, color: "#6B4A5A" }}
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-xs font-semibold tracking-widest uppercase mb-1.5" style={{ color: ROSE }}>City</label>
                <input
                  type="text"
                  placeholder="Fairytale Falls"
                  value={form.city}
                  onChange={set("city")}
                  required
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ backgroundColor: "rgba(255, 253, 245, 0.9)", border: `1px solid ${GOLD_BORDER}`, color: "#6B4A5A" }}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold tracking-widest uppercase mb-1.5" style={{ color: ROSE }}>State</label>
                <input
                  type="text"
                  placeholder="AZ"
                  maxLength={2}
                  value={form.state}
                  onChange={set("state")}
                  required
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ backgroundColor: "rgba(255, 253, 245, 0.9)", border: `1px solid ${GOLD_BORDER}`, color: "#6B4A5A" }}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold tracking-widest uppercase mb-1.5" style={{ color: ROSE }}>ZIP Code</label>
                <input
                  type="text"
                  placeholder="85001"
                  maxLength={10}
                  value={form.zip}
                  onChange={set("zip")}
                  required
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ backgroundColor: "rgba(255, 253, 245, 0.9)", border: `1px solid ${GOLD_BORDER}`, color: "#6B4A5A" }}
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-xs font-semibold tracking-widest uppercase mb-1.5" style={{ color: ROSE }}>Country</label>
              <input
                type="text"
                placeholder="United States"
                value={form.country}
                onChange={set("country")}
                required
                className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                style={{ backgroundColor: "rgba(255, 253, 245, 0.9)", border: `1px solid ${GOLD_BORDER}`, color: "#6B4A5A" }}
              />
            </div>

            <p className="flex items-center gap-2 text-xs" style={{ color: "#B8A0A8" }}>
              <Lock size={12} />
              You will be redirected to Stripe&apos;s secure payment page
            </p>

            {error && <p className="text-sm text-center mt-4" style={{ color: "#C09090" }}>{error}</p>}
          </motion.form>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="lg:sticky lg:top-24 rounded-3xl p-8"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.95)", border: `1px solid ${GOLD_BORDER}` }}
          >
            <h2 className={`${magnolia.className} text-sm font-bold tracking-widest uppercase mb-5`} style={{ color: GOLD }}>
              Your Order
            </h2>

            <div className="space-y-4 mb-6">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex-1 min-w-0">
                        <p className={`${magnolia.className} text-sm font-bold leading-tight truncate`} style={{ color: ROSE }}>
                          {item.name}
                        </p>
                        <p className="text-xs mt-0.5" style={{ color: GOLD }}>
                          Size: {item.size} — ${item.price} each
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 rounded-full flex items-center justify-center"
                          style={{ border: `1px solid ${GOLD_BORDER}`, color: GOLD }}
                        >
                          <Minus size={10} />
                        </button>
                        <span className="text-sm font-bold w-5 text-center" style={{ color: ROSE }}>
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 rounded-full flex items-center justify-center"
                          style={{ border: `1px solid ${GOLD_BORDER}`, color: GOLD }}
                        >
                          <Plus size={10} />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="w-6 h-6 rounded-full flex items-center justify-center ml-1"
                          style={{ color: "#C09090" }}
                        >
                          <Trash2 size={11} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div
              className="rounded-2xl px-5 py-4 space-y-2.5"
              style={{ backgroundColor: GOLD_LIGHT, border: `1px solid ${GOLD_BORDER}` }}
            >
              <div className="flex justify-between text-sm" style={{ color: "#9A7A80" }}>
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm" style={{ color: "#9A7A80" }}>
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="h-px my-1" style={{ backgroundColor: GOLD_BORDER }} />
              <div className="flex justify-between font-bold">
                <span className={`${magnolia.className}`} style={{ color: ROSE }}>Total</span>
                <span className={`${magnolia.className} text-lg`} style={{ color: GOLD }}>${orderTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={(e) => {
                const form = document.querySelector("form");
                if (form) {
                  if (!form.checkValidity()) {
                    form.reportValidity();
                  } else {
                    form.requestSubmit();
                  }
                }
              }}
              disabled={loading}
              className="w-full mt-6 py-4 rounded-2xl font-bold text-base transition-all active:scale-[0.98]"
              style={{
                background: `linear-gradient(135deg, #D4A853 0%, #C9A84C 50%, #B8943E 100%)`,
                color: "#fff",
                boxShadow: "0 4px 16px rgba(201, 168, 76, 0.4)",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Redirecting..." : "Proceed to Payment"}
            </button>

            <p className="text-center text-xs mt-4" style={{ color: "#C09090" }}>
              Free returns within 30 days
            </p>
          </motion.div>
        </div>
      </div>
    </main>
  );
}