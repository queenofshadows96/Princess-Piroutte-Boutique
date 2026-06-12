"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Great_Vibes, Playfair_Display } from "next/font/google";
import AdminBackButtons from "../../../AdminBackButtons";

const magnolia = Great_Vibes({ subsets: ["latin"], weight: ["400"] });
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["italic"],
});

const cardStyle = {
  backgroundColor: "rgba(255, 255, 255, 0.92)",
  border: "2px solid #B8860B",
};

export default function OrderDetailsPage() {
  const { id } = useParams();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const [override, setOverride] = useState(false);

  const [showShipModal, setShowShipModal] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState("");
  const [carrier, setCarrier] = useState("");

  async function refresh() {
    const res = await fetch(`/api/admin/orders/${id}`, { cache: "no-store" });
    const json = await res.json();
    setOrder(json.order || null);
  }

  async function updateOrder(payload: any) {
    const res = await fetch(
      `${window.location.origin}/api/admin/orders/${id}/update`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const json = await res.json();

    if (json.success) {
      setMsg("Order updated successfully");
      await refresh();
      setOverride(false);
      setTimeout(() => setMsg(""), 2000);
    } else {
      setMsg("Error updating order");
      setTimeout(() => setMsg(""), 2000);
    }
  }

  async function createShipment() {
    const res = await fetch(`/api/fulfillment/shipments/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        order_id: order.id,
        tracking_number: trackingNumber,
        carrier,
      }),
    });

    const json = await res.json();

    if (json.success) {
      setMsg("Shipment created successfully");
      setShowShipModal(false);
      setTrackingNumber("");
      setCarrier("");
      await refresh();
      setTimeout(() => setMsg(""), 2000);
    } else {
      setMsg("Error creating shipment");
      setTimeout(() => setMsg(""), 2000);
    }
  }

  useEffect(() => {
    refresh().then(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <main className="py-20 px-6 min-h-screen">
        <p style={{ color: "#C09090", fontFamily: "'Times New Roman', serif" }}>
          Loading order…
        </p>
      </main>
    );
  }

  if (!order) {
    return (
      <main className="py-20 px-6 min-h-screen">
        <p style={{ color: "#C09090", fontFamily: "'Times New Roman', serif" }}>
          Order not found.
        </p>
      </main>
    );
  }

  const address = order.shipping_address
    ? JSON.parse(order.shipping_address)
    : null;

  const formatDate = (value?: string | null) =>
    value ? new Date(value).toLocaleString() : "—";

  const isFulfilled = order.status === "fulfilled";
  const isShipped = order.status === "shipped";
  const isRefunded = order.status === "refunded";

  return (
    <main className="relative z-10 py-20 px-6 min-h-screen">
      <div className="max-w-3xl mx-auto space-y-16">

        <AdminBackButtons />

        {msg && (
          <div
            className="p-4 rounded-xl text-center"
            style={{
              backgroundColor: "rgba(255,209,220,0.4)",
              border: "1px solid #B8860B",
              color: "#B8860B",
              fontFamily: "'Times New Roman', serif",
            }}
          >
            {msg}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1
            className={`${magnolia.className} text-5xl md:text-6xl mb-4`}
            style={{ color: "#D4AF37" }}
          >
            Order #{order.id}
          </h1>
        </motion.div>

        {/* CUSTOMER INFO */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="p-8 rounded-3xl shadow-md"
          style={cardStyle}
        >
          <h2
            className={`${playfair.className} italic text-2xl md:text-3xl font-bold mb-4`}
            style={{ color: "#D4AF37" }}
          >
            Customer Information
          </h2>

          <p style={{ color: "#C09090", fontFamily: "'Times New Roman', serif" }}>
            <strong style={{ color: "#B8860B" }}>Name:</strong>{" "}
            {order.customer_name}
          </p>

          <p style={{ color: "#C09090", fontFamily: "'Times New Roman', serif" }}>
            <strong style={{ color: "#B8860B" }}>Email:</strong>{" "}
            {order.customer_email}
          </p>

          <p style={{ color: "#C09090", fontFamily: "'Times New Roman', serif" }}>
            <strong style={{ color: "#B8860B" }}>Address:</strong>{" "}
            {address
              ? `${address.line1}, ${address.city}, ${address.state} ${address.postal_code}, ${address.country}`
              : "N/A"}
          </p>

          {/* ⭐ GIFT MESSAGE */}
          {order.gift_message && (
            <div
              className="mt-4 p-4 rounded-xl"
              style={{
                backgroundColor: "rgba(255,209,220,0.25)",
                border: "1px solid rgba(184,134,11,0.3)",
              }}
            >
              <h3
                className="font-semibold text-sm"
                style={{ color: "#B8860B", fontFamily: "'Times New Roman', serif" }}
              >
                Gift Message
              </h3>
              <p
                className="italic mt-1"
                style={{ color: "#C09090", fontFamily: "'Times New Roman', serif" }}
              >
                "{order.gift_message}"
              </p>
            </div>
          )}

          {/* ⭐ HIDE PRICES BADGE */}
          {order.hide_prices && (
            <div
              className="mt-3 inline-block px-3 py-1 rounded-full text-xs font-semibold"
              style={{
                backgroundColor: "#FFF4C2",
                color: "#B8860B",
                border: "1px solid #E6C27A",
                fontFamily: "'Times New Roman', serif",
              }}
            >
              Prices Hidden for Gift Order
            </div>
          )}
        </motion.section>

        {/* ORDER SUMMARY */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="p-8 rounded-3xl shadow-md space-y-6"
          style={cardStyle}
        >
          <h2
            className={`${playfair.className} italic text-2xl md:text-3xl font-bold`}
            style={{ color: "#D4AF37" }}
          >
            Order Summary
          </h2>

          <div
            className="inline-block px-4 py-2 rounded-xl mb-4"
            style={{
              backgroundColor: "#D4AF37",
              color: "white",
              fontFamily: "'Times New Roman', serif",
              fontWeight: "bold",
            }}
          >
            Status: {order.status.toUpperCase()}
          </div>

          {override && (
            <div
              className="inline-block px-3 py-1 rounded-lg ml-3"
              style={{
                backgroundColor: "rgba(212,175,55,0.2)",
                border: "1px solid #D4AF37",
                color: "#B8860B",
                fontFamily: "'Times New Roman', serif",
              }}
            >
              Override Mode Active
            </div>
          )}

          <div
            className="space-y-1 pt-2"
            style={{
              fontFamily: "'Times New Roman', serif",
              color: "#C09090",
            }}
          >
            <p>
              <strong style={{ color: "#B8860B" }}>Fulfilled:</strong>{" "}
              {formatDate(order.fulfilled_at)}
            </p>
            <p>
              <strong style={{ color: "#B8860B" }}>Shipped:</strong>{" "}
              {formatDate(order.shipped_at)}
            </p>
            <p>
              <strong style={{ color: "#B8860B" }}>Refunded:</strong>{" "}
              {formatDate(order.refunded_at)}
            </p>
          </div>

          {/* TRACKING NUMBER */}
          <div className="space-y-2 pt-4">
            <label
              style={{ color: "#B8860B", fontFamily: "'Times New Roman', serif" }}
            >
              Tracking Number
            </label>
            <input
              className="p-2 rounded-lg border w-full"
              style={{ fontFamily: "'Times New Roman', serif" }}
              value={order.tracking_number || ""}
              onChange={(e) =>
                setOrder({ ...order, tracking_number: e.target.value })
              }
              onBlur={(e) => updateOrder({ tracking_number: e.target.value })}
            />
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-wrap gap-4 pt-4">

            {/* MARK FULFILLED */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              disabled={!override && (isFulfilled || isShipped || isRefunded)}
              onClick={() =>
                updateOrder({ action: "fulfill", status: "fulfilled" })
              }
              className="px-4 py-2 rounded-xl"
              style={{
                opacity:
                  !override && (isFulfilled || isShipped || isRefunded)
                    ? 0.5
                    : 1,
                border: "2px solid #B8860B",
                color: isFulfilled ? "white" : "#B8860B",
                backgroundColor: isFulfilled ? "#D4AF37" : "transparent",
                fontFamily: "'Times New Roman', serif",
              }}
            >
              Mark Fulfilled
            </motion.button>

            {/* MARK SHIPPED */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              disabled={!override && (isShipped || isRefunded)}
              onClick={() => setShowShipModal(true)}
              className="px-4 py-2 rounded-xl"
              style={{
                opacity: !override && (isShipped || isRefunded) ? 0.5 : 1,
                border: "2px solid #B8860B",
                color: isShipped ? "white" : "#B8860B",
                backgroundColor: isShipped ? "#D4AF37" : "transparent",
                fontFamily: "'Times New Roman', serif",
              }}
            >
              Mark Shipped
            </motion.button>

            {/* REFUND */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              disabled={!override && isRefunded}
              onClick={() =>
                updateOrder({ action: "refund", status: "refunded" })
              }
              className="px-4 py-2 rounded-xl"
              style={{
                opacity: !override && isRefunded ? 0.5 : 1,
                border: "2px solid #B8860B",
                color: isRefunded ? "white" : "#B8860B",
                backgroundColor: isRefunded ? "#D4AF37" : "transparent",
                fontFamily: "'Times New Roman', serif",
              }}
            >
              Mark Refunded
            </motion.button>
          </div>

          {!override && (
            <p
              onClick={() => setOverride(true)}
              style={{
                marginTop: "10px",
                color: "#B8860B",
                fontFamily: "'Times New Roman', serif",
                cursor: "pointer",
                textDecoration: "underline",
                fontSize: "0.9rem",
              }}
            >
              Need to correct this? Override status
            </p>
          )}
        </motion.section>

        {/* ITEMS */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="p-8 rounded-3xl shadow-md"
          style={cardStyle}
        >
          <h2
            className={`${playfair.className} italic text-2xl md:text-3xl font-bold mb-6`}
            style={{ color: "#D4AF37" }}
          >
            Items
          </h2>

          <ul className="space-y-4">
            {order.order_items.map((item: any) => (
              <li
                key={item.id}
                className="p-4 rounded-xl"
                style={{
                  backgroundColor: "rgba(255,209,220,0.15)",
                  border: "1px solid rgba(184,134,11,0.2)",
                  color: "#C09090",
                  fontFamily: "'Times New Roman', serif",
                }}
              >
                <strong style={{ color: "#B8860B" }}>
                  {item.products?.name}
                </strong>
                <br />
                Size: {item.size} — Qty: {item.quantity}
                <br />

                {/* ⭐ CONDITIONAL PRICE DISPLAY */}
                {order.hide_prices ? (
                  <span className="italic text-gray-500">
                    Price hidden for gift order
                  </span>
                ) : (
                  <span>Price: ${item.price}</span>
                )}
              </li>
            ))}
          </ul>
        </motion.section>
      </div>

      {/* SHIP MODAL */}
      {showShipModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-[400px] border border-[#D4AF37]">

            <h2
              className={`${playfair.className} text-2xl font-bold mb-4`}
              style={{ color: "#D4AF37" }}
            >
              Mark Order as Shipped
            </h2>

            <div className="space-y-4">

              <div>
                <label className="block mb-1" style={{ color: "#B8860B" }}>
                  Tracking Number
                </label>
                <input
                  className="w-full border rounded px-3 py-2"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                />
              </div>

              <div>
                <label className="block mb-1" style={{ color: "#B8860B" }}>
                  Carrier
                </label>
                <input
                  className="w-full border rounded px-3 py-2"
                  placeholder="USPS, UPS, FedEx..."
                  value={carrier}
                  onChange={(e) => setCarrier(e.target.value)}
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={() => setShowShipModal(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>

                <button
                  onClick={createShipment}
                  className="px-4 py-2 bg-[#D4AF37] text-white rounded shadow"
                >
                  Confirm Shipment
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </main>
  );
}
