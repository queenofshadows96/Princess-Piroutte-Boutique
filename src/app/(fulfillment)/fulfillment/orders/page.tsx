"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

type OrderRow = {
  id: number;
  customer_name: string;
  customer_email: string;
  status: string;
  refund_status: string | null;
  fulfillment_notes: string | null;
  gift_message: string | null;
  created_at: string;
  shipment_status: string | null; // "unfulfilled", "pending", "partial", "shipped", "delivered"
};

export default function FulfillmentOrdersList() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [page, setPage] = useState(0);
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [loading, setLoading] = useState(true);

  const shipment = searchParams.get("shipment");
  const orderStatus = searchParams.get("order_status");
  const notes = searchParams.get("notes") === "true";
  const gift = searchParams.get("gift") === "true";
  const search = searchParams.get("search") || "";
  const date = searchParams.get("date") || "";
  const sort = searchParams.get("sort") || "newest";

  useEffect(() => {
    setLoading(true);

    const params = new URLSearchParams(window.location.search);
    params.set("page", String(page));

    fetch(`/api/fulfillment/orders?${params.toString()}`)
      .then((res) => res.json())
      .then((res) => {
        setOrders(res.data || []);
        setLoading(false);
      });
  }, [page, shipment, orderStatus, notes, gift, search, date, sort]);

  const updateParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(window.location.search);

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === "") params.delete(key);
      else params.set(key, value);
    });

    params.delete("page");
    router.push(`/fulfillment/orders?${params.toString()}`);
    setPage(0);
  };

  if (loading) {
    return (
      <main className="py-20 px-6 bg-pink-50 min-h-screen">
        <p className="text-gray-700">Loading orders…</p>
      </main>
    );
  }

  return (
    <main className="py-20 px-6 bg-pink-50 min-h-screen space-y-10">
      {/* FIXED DASHBOARD LINK */}
      <Link
        href="/fulfillment/dashboard"
        className="inline-block px-4 py-2 bg-pink-200 text-gray-800 rounded-lg shadow hover:bg-pink-300 transition"
      >
        ← Back to Dashboard
      </Link>

      <h1 className="text-4xl font-bold text-gray-800">Orders</h1>

      {/* SEARCH + DATE + SORT */}
      <div className="space-y-2">
        <p className="text-sm font-semibold text-gray-700 tracking-wide uppercase">
          Search & Filters
        </p>

        <div className="flex flex-wrap gap-3">
          <input
            type="text"
            placeholder="Search by customer, order #, or date…"
            defaultValue={search}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                updateParams({ search: e.currentTarget.value || null });
              }
            }}
            className="flex-1 px-4 py-2 rounded-lg border bg-white shadow-sm focus:ring-2 focus:ring-pink-400"
          />

          <input
            type="date"
            defaultValue={date}
            onChange={(e) => updateParams({ date: e.target.value || null })}
            className="px-4 py-2 rounded-lg border bg-white shadow-sm focus:ring-2 focus:ring-pink-400"
          />

          {date && (
            <button
              onClick={() => updateParams({ date: null })}
              className="px-3 py-2 bg-pink-200 text-gray-800 rounded-lg shadow hover:bg-pink-300 transition"
            >
              Clear Date ✕
            </button>
          )}

          <select
            defaultValue={sort}
            onChange={(e) => updateParams({ sort: e.target.value })}
            className="px-4 py-2 rounded-lg border bg-white shadow-sm focus:ring-2 focus:ring-pink-400"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="customer_az">Customer A–Z</option>
            <option value="customer_za">Customer Z–A</option>
            <option value="status_az">Status A–Z</option>
            <option value="status_za">Status Z–A</option>
          </select>
        </div>
      </div>

      {/* FILTER BUTTONS */}
      <div className="space-y-2">
        <p className="text-sm font-semibold text-gray-700 tracking-wide uppercase">
          Filters
        </p>

        <div className="flex flex-wrap gap-3 bg-white p-4 rounded-xl shadow-sm">
          {/* ALL */}
          <button
            onClick={() =>
              updateParams({
                shipment: null,
                order_status: null,
                notes: null,
                gift: null,
              })
            }
            className={`px-4 py-2 rounded-lg border ${
              !shipment && !orderStatus && !notes && !gift
                ? "bg-pink-600 text-white"
                : "bg-pink-100 text-gray-700"
            }`}
          >
            All Orders
          </button>

          {/* UNFULFILLED */}
          <button
            onClick={() => updateParams({ shipment: "none", order_status: null })}
            className={`px-4 py-2 rounded-lg border ${
              shipment === "none" ? "bg-pink-600 text-white" : "bg-pink-100"
            }`}
          >
            Unfulfilled
          </button>

          {/* FULFILLED */}
          <button
            onClick={() => updateParams({ shipment: "fulfilled", order_status: null })}
            className={`px-4 py-2 rounded-lg border ${
              shipment === "fulfilled" ? "bg-pink-600 text-white" : "bg-pink-100"
            }`}
          >
            Fulfilled
          </button>

          {/* RETURNED */}
          <button
            onClick={() => updateParams({ order_status: "returned", shipment: null })}
            className={`px-4 py-2 rounded-lg border ${
              orderStatus === "returned" ? "bg-pink-600 text-white" : "bg-pink-100"
            }`}
          >
            Returned
          </button>

          {/* CANCELLED */}
          <button
            onClick={() => updateParams({ order_status: "cancelled", shipment: null })}
            className={`px-4 py-2 rounded-lg border ${
              orderStatus === "cancelled" ? "bg-pink-600 text-white" : "bg-pink-100"
            }`}
          >
            Cancelled
          </button>

          {/* NOTES */}
          <button
            onClick={() => updateParams({ notes: notes ? null : "true" })}
            className={`px-4 py-2 rounded-lg border ${
              notes ? "bg-pink-600 text-white" : "bg-pink-100"
            }`}
          >
            With Notes
          </button>

          {/* GIFT */}
          <button
            onClick={() => updateParams({ gift: gift ? null : "true" })}
            className={`px-4 py-2 rounded-lg border ${
              gift ? "bg-pink-600 text-white" : "bg-pink-100"
            }`}
          >
            Gift Messages
          </button>
        </div>
      </div>

      {/* EMPTY STATE */}
      {orders.length === 0 && (
        <div className="text-center text-gray-600 mt-20">
          <p className="text-lg">No orders found for this view.</p>
          <p className="text-sm opacity-70">Try adjusting your filters or search.</p>
        </div>
      )}

      {/* ORDER LIST */}
      <div className="space-y-4">
        {orders.map((order) => (
          <Link
            key={order.id}
            href={`/fulfillment/orders/${order.id}`}
            className="block p-4 rounded-lg border bg-white hover:bg-gray-100 transition shadow-sm"
          >
            <p><strong>Order ID:</strong> {order.id}</p>
            <p><strong>Customer:</strong> {order.customer_name}</p>

            <p><strong>Order Status:</strong> {order.status}</p>

            {order.refund_status && (
              <p><strong>Refund Status:</strong> {order.refund_status}</p>
            )}

            <p>
              <strong>Shipment Status:</strong>{" "}
              {order.shipment_status || "Unfulfilled"}
            </p>

            <p><strong>Notes:</strong> {order.fulfillment_notes ? "Yes" : "—"}</p>
            <p><strong>Gift Message:</strong> {order.gift_message ? "Yes" : "—"}</p>

            <p>
              <strong>Created:</strong>{" "}
              {new Date(order.created_at).toLocaleString()}
            </p>
          </Link>
        ))}
      </div>

      {/* PAGINATION */}
      {orders.length > 0 && (
        <div className="flex justify-between mt-10">
          {page > 0 ? (
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              className="px-4 py-2 bg-pink-300 rounded hover:bg-pink-400 transition"
            >
              Previous
            </button>
          ) : (
            <div />
          )}

          {orders.length === 25 ? (
            <button
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 transition"
            >
              Next
            </button>
          ) : (
            <div />
          )}
        </div>
      )}
    </main>
  );
}
