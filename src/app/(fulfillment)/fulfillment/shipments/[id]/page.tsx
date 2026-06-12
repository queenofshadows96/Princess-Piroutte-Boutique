"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function FulfillmentShipmentDetails({ params }) {
  const [shipment, setShipment] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadShipment() {
    const res = await fetch(`/api/fulfillment/shipments/${params.id}`, {
      cache: "no-store",
    });
    const json = await res.json();
    setShipment(json.shipment || null);
    setLoading(false);
  }

  async function updateStatus(newStatus) {
    const res = await fetch(`/api/fulfillment/shipments/${shipment.id}/status`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });

    const json = await res.json();
    if (json.success) loadShipment();
  }

  async function saveTracking() {
    const res = await fetch(`/api/fulfillment/shipments/${shipment.id}/status`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        carrier: shipment.carrier,
        tracking_number: shipment.tracking_number,
      }),
    });

    const json = await res.json();
    if (json.success) loadShipment();
  }

  function copy(text) {
    navigator.clipboard.writeText(text);
  }

  useEffect(() => {
    loadShipment();
  }, [params.id]);

  if (loading) {
    return (
      <main className="py-20 px-6">
        <p>Loading shipment…</p>
      </main>
    );
  }

  if (!shipment) {
    return (
      <main className="py-20 px-6">
        <p>Shipment not found.</p>
      </main>
    );
  }

  const order = shipment.orders;
  const assignedItems = shipment.shipment_items || [];

  // Parse shipping address
  let shipping = null;
  try {
    shipping = order?.shipping_address ? JSON.parse(order.shipping_address) : null;
  } catch {}

  const fullAddress = shipping
    ? `${shipping.line1}
${shipping.line2 ? shipping.line2 + "\n" : ""}${shipping.city}, ${shipping.state} ${shipping.postal_code}
${shipping.country}`
    : "";

  const trackingLink = shipment.tracking_number
    ? `https://tools.usps.com/go/TrackConfirmAction?tLabels=${shipment.tracking_number}`
    : "";

  return (
    <main className="py-20 px-6 space-y-10 bg-pink-50 min-h-screen">
      {/* NAVIGATION */}
      <div className="flex gap-4">
        <Link
          href="/fulfillment/shipments"
          className="px-4 py-2 bg-pink-200 text-gray-800 rounded-lg shadow hover:bg-pink-300 transition"
        >
          ← Back to Shipments
        </Link>

        <Link
          href={`/fulfillment/orders/${shipment.order_id}`}
          className="px-4 py-2 bg-pink-200 text-gray-800 rounded-lg shadow hover:bg-pink-300 transition"
        >
          ← Back to Order #{shipment.order_id}
        </Link>
      </div>

      <h1 className="text-4xl font-bold text-gray-800">
        Shipment #{shipment.id}
      </h1>

      {/* SHIPMENT INFO */}
      <section className="p-6 bg-white border rounded-lg space-y-4 shadow-sm">
        <h2 className="text-xl font-semibold">Shipment Info</h2>

        <p><strong>Order ID:</strong> {shipment.order_id}</p>

        {/* Editable Tracking + Carrier */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Carrier</label>
          <input
            type="text"
            value={shipment.carrier || ""}
            onChange={(e) =>
              setShipment({ ...shipment, carrier: e.target.value })
            }
            className="w-full border rounded px-3 py-2"
            placeholder="USPS, UPS, FedEx…"
          />

          <label className="block text-sm font-medium mt-3">Tracking Number</label>
          <input
            type="text"
            value={shipment.tracking_number || ""}
            onChange={(e) =>
              setShipment({ ...shipment, tracking_number: e.target.value })
            }
            className="w-full border rounded px-3 py-2"
            placeholder="Enter tracking number"
          />

          <button
            onClick={saveTracking}
            className="mt-3 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500"
          >
            Save Tracking Info
          </button>
        </div>

        <p><strong>Status:</strong> {shipment.status}</p>

        <p>
          <strong>Shipped:</strong>{" "}
          {shipment.shipped_at ? new Date(shipment.shipped_at).toLocaleString() : "—"}
        </p>

        {shipment.delivered_at && (
          <p>
            <strong>Delivered:</strong>{" "}
            {new Date(shipment.delivered_at).toLocaleString()}
          </p>
        )}

        {/* ACTION BUTTONS */}
        <div className="flex flex-wrap gap-4 mt-4">
          <button
            onClick={() => window.open("https://www.pirateship.com", "_blank")}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500"
          >
            Open PirateShip
          </button>

          {shipping && (
            <button
              onClick={() => copy(fullAddress)}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
            >
              Copy Address
            </button>
          )}

          {shipment.tracking_number && (
            <button
              onClick={() => copy(trackingLink)}
              className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-600"
            >
              Copy Tracking Link
            </button>
          )}

          {shipment.status === "pending" && (
            <button
              onClick={() => updateStatus("shipped")}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
            >
              Mark as Shipped
            </button>
          )}

          {shipment.status === "shipped" && !shipment.delivered_at && (
            <button
              onClick={() => updateStatus("delivered")}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500"
            >
              Mark as Delivered
            </button>
          )}
        </div>
      </section>

      {/* ITEMS ASSIGNED TO THIS SHIPMENT */}
      <section className="p-6 bg-white border rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-3">Items in This Shipment</h2>

        {assignedItems.length === 0 && (
          <p className="text-gray-700 italic">
            No items assigned to this shipment yet.
          </p>
        )}

        {assignedItems.length > 0 && (
          <div className="space-y-3">
            {assignedItems.map((si, i) => {
              const item = si.order_items;
              const product = item?.products;
              const color = item?.product_colors;
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
                    <p><strong>Qty in Shipment:</strong> {si.quantity}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
