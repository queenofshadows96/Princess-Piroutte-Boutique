"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function FulfillmentShipmentsList() {
  const searchParams = useSearchParams();

  const [page, setPage] = useState(0);
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters from URL
  const status = searchParams.get("status") || "all";

  useEffect(() => {
    setLoading(true);

    fetch(`/api/fulfillment/shipments?page=${page}&status=${status}`)
      .then((res) => res.json())
      .then((res) => {
        setShipments(res.data || []);
        setLoading(false);
      });
  }, [page, status]);

  if (loading) {
    return (
      <main className="py-20 px-6">
        <p className="text-gray-700">Loading shipments…</p>
      </main>
    );
  }

  return (
    <main className="py-20 px-6 bg-pink-50 min-h-screen space-y-10">
      <Link
        href="/fulfillment"
        className="inline-block px-4 py-2 bg-pink-200 text-gray-800 rounded-lg shadow hover:bg-pink-300 transition"
      >
        ← Back to Dashboard
      </Link>

      <h1 className="text-4xl font-bold text-gray-800">Shipments</h1>

      {/* FILTERS */}
      <div className="flex flex-wrap gap-3 bg-white p-4 rounded-xl shadow-sm">
        <Link
          href="/fulfillment/shipments?status=pending"
          className={`px-4 py-2 rounded-lg border transition ${
            status === "pending"
              ? "bg-pink-600 text-white shadow-md shadow-pink-300"
              : "bg-pink-100 text-gray-700 hover:bg-pink-200"
          }`}
        >
          Pending
        </Link>

        <Link
          href="/fulfillment/shipments?status=shipped"
          className={`px-4 py-2 rounded-lg border transition ${
            status === "shipped"
              ? "bg-pink-600 text-white shadow-md shadow-pink-300"
              : "bg-pink-100 text-gray-700 hover:bg-pink-200"
          }`}
        >
          Shipped
        </Link>

        <Link
          href="/fulfillment/shipments?status=delivered"
          className={`px-4 py-2 rounded-lg border transition ${
            status === "delivered"
              ? "bg-pink-600 text-white shadow-md shadow-pink-300"
              : "bg-pink-100 text-gray-700 hover:bg-pink-200"
          }`}
        >
          Delivered
        </Link>

        <Link
          href="/fulfillment/shipments"
          className={`px-4 py-2 rounded-lg border transition ${
            status === "all"
              ? "bg-pink-600 text-white shadow-md shadow-pink-300"
              : "bg-pink-100 text-gray-700 hover:bg-pink-200"
          }`}
        >
          All
        </Link>
      </div>

      {/* SHIPMENTS LIST */}
      <div className="space-y-6">
        {shipments.map((s: any) => {
          const order = s.orders;

          // Parse shipping address
          let shipping = null;
          try {
            shipping = order?.shipping_address
              ? JSON.parse(order.shipping_address)
              : null;
          } catch {}

          return (
            <div
              key={s.id}
              className="p-5 rounded-xl border bg-white shadow-sm hover:shadow-md transition"
            >
              <p className="text-lg font-semibold text-gray-800">
                Shipment #{s.id}
              </p>

              <p className="text-gray-700">
                <strong>Order:</strong> #{order?.id}
              </p>

              <p className="text-gray-700">
                <strong>Customer:</strong> {order?.customer_name}
              </p>

              {shipping && (
                <p className="text-gray-700">
                  <strong>Ship To:</strong> {shipping.city}, {shipping.state}
                </p>
              )}

              <p className="text-gray-700">
                <strong>Carrier:</strong> {s.carrier || "—"}
              </p>

              <p className="text-gray-700">
                <strong>Tracking:</strong> {s.tracking_number || "—"}
              </p>

              <p className="text-gray-700">
                <strong>Status:</strong> {s.status}
              </p>

              <p className="text-gray-700">
                <strong>Shipped:</strong>{" "}
                {s.shipped_at ? new Date(s.shipped_at).toLocaleString() : "—"}
              </p>

              {s.delivered_at && (
                <p className="text-gray-700">
                  <strong>Delivered:</strong>{" "}
                  {new Date(s.delivered_at).toLocaleString()}
                </p>
              )}

              <div className="flex gap-3 mt-4">
                <Link
                  href={`/fulfillment/shipments/${s.id}`}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
                >
                  View Shipment
                </Link>

                <Link
                  href={`/fulfillment/orders/${s.order_id}`}
                  className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
                >
                  View Order
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-between mt-6">
        <button
          disabled={page === 0}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 bg-pink-300 rounded disabled:opacity-40"
        >
          Previous
        </button>

        <button
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-pink-600 text-white rounded"
        >
          Next
        </button>
      </div>
    </main>
  );
}
