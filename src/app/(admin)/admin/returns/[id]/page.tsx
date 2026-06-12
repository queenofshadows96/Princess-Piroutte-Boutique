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

export default function ReturnDetailsPage() {
  const { id } = useParams();
  const [ret, setRet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const [override, setOverride] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  // ⭐ NEW: Confirmation modal state
  const [confirmAction, setConfirmAction] = useState(null);

  async function refresh() {
    const res = await fetch(`/api/admin/returns/${id}`, { cache: "no-store" });
    const json = await res.json();
    setRet(json.return || null);
  }

  async function updateReturn(payload) {
    const res = await fetch(
      `${window.location.origin}/api/admin/returns/${id}/update`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const json = await res.json();

    if (json.success) {
      setMsg("Return updated successfully");

      // ⭐ AUTO‑REFUND WHEN APPROVED
      if (payload.status === "approved" && ret?.order_id) {
        try {
          const refundRes = await fetch(
            `${window.location.origin}/api/admin/returns/refund`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                return_id: id,
                order_id: ret.order_id,
              }),
            }
          );

          const refundJson = await refundRes.json();

          if (refundJson.success) {
            setMsg("Refund processed successfully");
          } else {
            setMsg(
              `Refund failed: ${refundJson.error || "Unknown refund error"}`
            );
          }
        } catch (err) {
          console.error("Refund error:", err);
          setMsg("Refund request failed");
        }
      }

      await refresh();
      setOverride(false);
      setTimeout(() => setMsg(""), 2000);
    } else {
      setMsg("Error updating return");
      setTimeout(() => setMsg(""), 2000);
    }
  }

  async function triggerRefund() {
    const res = await fetch(`/api/admin/returns/refund`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        return_id: ret.id,
        order_id: ret.order_id,
      }),
    });

    await res.json();
    await refresh();
  }

  useEffect(() => {
    refresh().then(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <main className="px-6 min-h-screen">
        <p style={{ color: "#C09090" }}>Loading return…</p>
      </main>
    );
  }

  if (!ret) {
    return (
      <main className="px-6 min-h-screen">
        <p style={{ color: "#C09090" }}>Return not found.</p>
      </main>
    );
  }

  // ⭐ LOCK BUTTONS unless override is active
  const locked =
    (ret.status === "approved" || ret.status === "rejected") && !override;

  const formatDate = (v) =>
    v ? new Date(v).toLocaleString() : "—";

  return (
    <main className="px-6 min-h-screen">
      <div className="max-w-3xl mx-auto space-y-12">

        {/* BACK BUTTONS */}
        <div className="pt-6">
          <AdminBackButtons />
        </div>

        {/* SUCCESS MESSAGE */}
        {msg && (
          <div
            className="p-4 rounded-xl text-center"
            style={{
              backgroundColor: "rgba(255,209,220,0.4)",
              border: "1px solid #B8860B",
              color: "#B8860B",
            }}
          >
            {msg}
          </div>
        )}

        {/* TITLE */}
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
            Return #{ret.id}
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

          <p style={{ color: "#C09090" }}>
            <strong style={{ color: "#B8860B" }}>Email:</strong>{" "}
            {ret.customer_email}
          </p>

          <p style={{ color: "#C09090" }}>
            <strong style={{ color: "#B8860B" }}>Order ID:</strong>{" "}
            {ret.order_id}
          </p>

          <p style={{ color: "#C09090" }}>
            <strong style={{ color: "#B8860B" }}>Submitted:</strong>{" "}
            {ret.created_at.split("T")[0]}
          </p>
        </motion.section>

        {/* RETURN SUMMARY */}
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
            Return Summary
          </h2>

          {/* STATUS BADGE */}
          <div
            className="inline-block px-4 py-2 rounded-xl mb-4"
            style={{
              backgroundColor: "#D4AF37",
              color: "white",
              fontWeight: "bold",
            }}
          >
            Status: {ret.status.toUpperCase()}
          </div>

          {/* OVERRIDE MODE */}
          {override && (
            <div
              className="inline-block px-3 py-1 rounded-lg ml-3"
              style={{
                backgroundColor: "rgba(212,175,55,0.2)",
                border: "1px solid #D4AF37",
                color: "#B8860B",
              }}
            >
              Override Mode Active
            </div>
          )}

          {/* REASON */}
          <p style={{ color: "#C09090" }}>
            <strong style={{ color: "#B8860B" }}>Reason:</strong>{" "}
            {ret.reason}
          </p>

          {/* DETAILS */}
          {ret.details && (
            <p style={{ color: "#C09090" }}>
              <strong style={{ color: "#B8860B" }}>Details:</strong>{" "}
              {ret.details}
            </p>
          )}

          {/* PHOTOS */}
          <div>
            <strong style={{ color: "#B8860B" }}>Photos:</strong>
            <div className="flex gap-2 flex-wrap mt-2">
              {ret.photo_urls?.map((url, i) => (
                <img
                  key={i}
                  src={url}
                  onClick={() => setModalImage(url)}
                  className="w-20 h-20 object-cover rounded border cursor-pointer hover:opacity-80"
                  style={{ borderColor: "#D4AF37" }}
                />
              ))}
            </div>
          </div>

          {/* REFUND INFO */}
          <div className="pt-4 space-y-2">
            <strong style={{ color: "#B8860B" }}>Refund Status:</strong>{" "}
            {ret.refund_status || "—"}

            {ret.refund_id && (
              <div>
                <a
                  href={`https://dashboard.stripe.com/test/refunds/${ret.refund_id}`}
                  target="_blank"
                  className="text-blue-600 underline"
                >
                  View in Stripe →
                </a>
              </div>
            )}

            <p>
              <strong style={{ color: "#B8860B" }}>Refunded At:</strong>{" "}
              {formatDate(ret.refunded_at)}
            </p>

            {ret.refund_error_message && (
              <p style={{ color: "#E53935" }}>
                <strong>Error:</strong> {ret.refund_error_message}
              </p>
            )}
          </div>

          {/* TIMELINE */}
          <div className="pt-4 space-y-1" style={{ color: "#C09090" }}>
            <p>
              <strong style={{ color: "#B8860B" }}>Submitted:</strong>{" "}
              {formatDate(ret.created_at)}
            </p>
            <p>
              <strong style={{ color: "#B8860B" }}>Approved:</strong>{" "}
              {formatDate(ret.approved_at)}
            </p>
            <p>
              <strong style={{ color: "#B8860B" }}>Refunded:</strong>{" "}
              {formatDate(ret.refunded_at)}
            </p>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-wrap gap-4 pt-4">
            {/* APPROVE */}
            <button
              disabled={locked}
              onClick={() => setConfirmAction("approve")}
              className="px-4 py-2 rounded-xl text-white"
              style={{
                backgroundColor: locked ? "#A9A9A9" : "#4CAF50",
                cursor: locked ? "not-allowed" : "pointer",
              }}
            >
              Approve
            </button>

            {/* REJECT */}
            <button
              disabled={locked}
              onClick={() => setConfirmAction("reject")}
              className="px-4 py-2 rounded-xl text-white"
              style={{
                backgroundColor: locked ? "#A9A9A9" : "#E53935",
                cursor: locked ? "not-allowed" : "pointer",
              }}
            >
              Reject
            </button>

            {/* DELETE */}
            <button
              disabled={locked}
              onClick={() => setConfirmAction("delete")}
              className="px-4 py-2 rounded-xl text-white"
              style={{
                backgroundColor: locked ? "#A9A9A9" : "#8B0000",
                cursor: locked ? "not-allowed" : "pointer",
              }}
            >
              Delete
            </button>

            {/* RETRY REFUND */}
            {ret.refund_status === "failed" && (
              <button
                disabled={locked}
                onClick={triggerRefund}
                className="px-4 py-2 rounded-xl text-white"
                style={{
                  backgroundColor: locked ? "#A9A9A9" : "#FF9800",
                  cursor: locked ? "not-allowed" : "pointer",
                }}
              >
                Retry Refund
              </button>
            )}

            {/* OVERRIDE */}
            {!override && (
              <p
                onClick={() => setOverride(true)}
                style={{
                  marginTop: "10px",
                  color: "#B8860B",
                  cursor: "pointer",
                  textDecoration: "underline",
                  fontSize: "0.9rem",
                }}
              >
                Override status
              </p>
            )}
          </div>
        </motion.section>
      </div>

      {/* ⭐ CONFIRMATION MODAL */}
      {confirmAction && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
        >
          <div
            className="bg-white p-8 rounded-2xl shadow-xl max-w-sm w-full text-center"
            style={{ border: "2px solid #D4AF37" }}
          >
            <h2
              className={`${playfair.className} text-2xl font-bold mb-4`}
              style={{ color: "#D4AF37" }}
            >
              Confirm {confirmAction}
            </h2>

            <p style={{ color: "#C09090" }} className="mb-6">
              Are you sure you want to {confirmAction} this return?
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  if (confirmAction === "approve") updateReturn({ status: "approved" });
                  if (confirmAction === "reject") updateReturn({ status: "rejected" });
                  if (confirmAction === "delete") updateReturn({ delete: true });
                  setConfirmAction(null);
                }}
                className="px-4 py-2 rounded-xl text-white"
                style={{ backgroundColor: "#4CAF50" }}
              >
                Yes, {confirmAction}
              </button>

              <button
                onClick={() => setConfirmAction(null)}
                className="px-4 py-2 rounded-xl text-white"
                style={{ backgroundColor: "#E53935" }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PHOTO MODAL */}
      {modalImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setModalImage(null)}
        >
          <img
            src={modalImage}
            className="max-w-[90%] max-h-[90%] rounded-lg border-4"
            style={{ borderColor: "#D4AF37" }}
          />
        </div>
      )}
    </main>
  );
}
