"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const { items, clearCart } = useCart();

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "United States",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckout = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            id: item.id,          // <-- REQUIRED for product_id
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
        alert("Something went wrong starting checkout.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Checkout failed.");
    }

    setLoading(false);
  };

  return (
    <main className="max-w-3xl mx-auto py-20 px-6">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="space-y-4 mb-10">
        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />
        <input
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />
        <input
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />
        <input
          name="state"
          placeholder="State"
          value={form.state}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />
        <input
          name="zip"
          placeholder="ZIP Code"
          value={form.zip}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />
      </div>

      <button
        onClick={handleCheckout}
        disabled={loading}
        className="w-full bg-pink-300 text-purple-900 font-bold py-3 rounded-lg hover:bg-pink-400 transition"
      >
        {loading ? "Processing..." : "Complete Order"}
      </button>
    </main>
  );
}
