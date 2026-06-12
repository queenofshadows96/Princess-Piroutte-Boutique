"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function FulfillmentOrderDetails({ params }: { params: { id: string } }) {
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  async function loadOrder() {
    const res = await fetch(`/api/fulfillment/orders/${params.id}`, {
      cache: "no-store",
    });
    const json = await res.json();
    setOrder(json.order || null);
    setLoading(false);
  }

  useEffect(() => {
    loadOrder();
  }, [params.id]);

  if (loading) {
    return (
      <main className="py-20 px-6">
        <p>Loading order…</p>
      </main>
    );
  }

  if (!order) {
    return (
      <main className="py-20 px-6">
        <p>Order not found.</p>
      </main>
    );
  }

  const items = order.items || [];
  const shipments = order.shipments || [];

  // Parse shipping address
  let shipping = null;
  try {
    shipping = order.shipping_address ? JSON.parse(order.shipping_address) : null;
  } catch {}

  // -----------------------------
  // ⭐ CREATE SHIPMENT
  // -----------------------------
  async function createShipment() {
    const res = await fetch(`/api/fulfillment/shipments/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ order_id: order.id }),
    });

    const json = await res.json();
    if (json.success) {
      loadOrder();
    } else {
      alert("Failed to create shipment");
    }
  }

  return (
    <main className="py-20 px-6 space-y-10 bg-pink-50 min-h-screen">
      <Link
        href="/fulfillment/orders"
        className="inline-block px-4 py-2 bg-pink-200 text-gray-800 rounded-lg shadow hover:bg-pink-300 transition"
      >
        ← Back to Orders
      </Link>

      <h1 className="text-4xl font-bold text-gray-800">
        Order #{order.id}
      </h1>

      {/* CUSTOMER INFO */}
      <section className="p-6 bg-white border rounded-lg space-y-3 shadow-sm">
        <h2 className="text-xl font-semibold">Customer</h2>

        <p><strong>Name:</strong> {order.customer_name}</p>
        <p><strong>Email:</strong> {order.customer_email}</p>

        {shipping && (
          <div>
            <p><strong>Address:</strong></p>
            <p>
              {shipping.line1}<br />
              {shipping.line2 && <>{shipping.line2}<br /></>}
              {shipping.city}, {shipping.state} {shipping.postal_code}<br />
              {shipping.country}
            </p>
          </div>
        )}

        {/* GIFT MESSAGE */}
        {order.gift_message && (
          <div className="mt-4 p-4 rounded-lg bg-pink-50 border border-pink-200">
            <h3 className="font-semibold text-sm text-pink-700">Gift Message</h3>
            <p className="text-sm mt-1 italic text-gray-700">
              "{order.gift_message}"
            </p>
          </div>
        )}

        {/* HIDE PRICES BADGE */}
        {order.hide_prices && (
          <div className="mt-3 inline-block px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700 border border-yellow-300">
            Prices Hidden for Gift Order
          </div>
        )}
      </section>

      {/* ITEMS */}
      <section className="p-6 bg-white border rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-3">Items</h2>

        <div className="space-y-3">
          {items.map((item: any, i: number) => {
            const product = item.products;
            const color = item.product_colors;
            const image = color?.product_color_images?.[0]?.image_url;

            return (
              <div key={i} className="flex gap-4 border p-3 rounded bg-pink-50">
                <Image
                  src={
                    image ||
                    "https://ohfiglvuvulucoolkchs.supabase.co/storage/v1/object/public/Assets/placeholder.png"
                  }
                  alt={product?.name || "Product"}
                  width={80}
                  height={80}
                  className="rounded-lg object-cover"
                />

                <div>
                  <p><strong>Product:</strong> {product?.name}</p>
                  <p><strong>Color:</strong> {color?.color_name}</p>
                  <p><strong>Size:</strong> {item.size}</p>
                  <p><strong>Qty:</strong> {item.quantity}</p>

                  {order.hide_prices ? (
                    <p>
                      <strong>Price:</strong>{" "}
                      <span className="italic text-gray-500">Hidden</span>
                    </p>
                  ) : (
                    <p><strong>Price:</strong> ${item.price}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ORDER STATUS */}
      <section className="p-6 bg-white border rounded-lg space-y-4 shadow-sm">
        <h2 className="text-xl font-semibold">Order Status</h2>

        <p><strong>Order Status:</strong> {order.status}</p>

        {order.refund_status && (
          <p><strong>Refund Status:</strong> {order.refund_status}</p>
        )}

        {order.return_status && (
          <p><strong>Return Status:</strong> {order.return_status}</p>
        )}

        <p><strong>Created:</strong> {new Date(order.created_at).toLocaleString()}</p>

        {/* ⭐ CREATE SHIPMENT BUTTON */}
        {order.status !== "cancelled" && (
          <button
            onClick={createShipment}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500"
          >
            {shipments.length === 0
              ? "Create Shipment"
              : "Create Another Shipment"}
          </button>
        )}
      </section>

      {/* SHIPMENTS */}
      <section className="p-6 bg-white border rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-3">Shipments</h2>

        {shipments.length === 0 && (
          <p className="text-gray-700">No shipments yet.</p>
        )}

        {shipments.length > 0 && (
          <div className="space-y-4">
            {shipments.map((s: any) => (
              <div key={s.id} className="border p-4 rounded bg-gray-50">
                <p><strong>Shipment ID:</strong> {s.id}</p>
                <p><strong>Status:</strong> {s.status}</p>
                <p><strong>Carrier:</strong> {s.carrier || "—"}</p>
                <p><strong>Tracking:</strong> {s.tracking_number || "—"}</p>

                <Link
                  href={`/fulfillment/shipments/${s.id}`}
                  className="inline-block mt-2 text-blue-600 underline"
                >
                  View Shipment
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
