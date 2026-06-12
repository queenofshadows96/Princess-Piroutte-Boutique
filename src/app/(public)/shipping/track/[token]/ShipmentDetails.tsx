"use client";
import { useEffect, useState } from "react";

export function ShipmentDetails({ shipments }: { shipments: any[] }) {
  const [estimates, setEstimates] = useState<Record<string, string | null>>({});

  useEffect(() => {
    async function fetchEstimates() {
      const results: Record<string, string | null> = {};
      for (const s of shipments) {
        if (!s.tracking_number) continue;
        try {
          const res = await fetch(`/api/usps/track?number=${s.tracking_number}`);
          const json = await res.json();
          results[s.id] = json.estimatedDelivery || null;
        } catch {
          results[s.id] = null;
        }
      }
      setEstimates(results);
    }
    fetchEstimates();
  }, [shipments]);

  return (
    <div className="mb-10">
      <h2 className="text-2xl text-[#D4AF37] mb-2">Shipment Details</h2>

      {shipments.length === 0 && (
        <p className="text-gray-600 italic">Your order has not shipped yet.</p>
      )}

      {shipments.map((s) => {
        const estimate = estimates[s.id];
        const trackingUrl = s.tracking_number
          ? `https://tools.usps.com/go/TrackConfirmAction?tLabels=${s.tracking_number}`
          : null;

        return (
          <div
            key={s.id}
            className="border border-pink-200 bg-pink-50 rounded-lg p-4 mb-4"
          >
            <p>
              <strong>Tracking Number:</strong>{" "}
              {s.tracking_number || "Not assigned yet"}
            </p>
            <p>
              <strong>Carrier:</strong> USPS
            </p>
            <p>
              <strong>Status:</strong> {s.status}
            </p>

            {s.shipped_at && (
              <p>
                <strong>Shipped At:</strong>{" "}
                {new Date(s.shipped_at).toLocaleString()}
              </p>
            )}

            {estimate ? (
              <p>
                <strong>Estimated Delivery:</strong>{" "}
                {new Date(estimate).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            ) : s.status?.toLowerCase() === "delivered" ? (
              <p className="text-[#D4AF37] font-semibold">
                ✨ This order has been delivered according to USPS ✨
              </p>
            ) : (
              <p className="text-gray-500 italic">Pending Delivery Estimate</p>
            )}

            {trackingUrl && (
              <div className="mt-4 text-center">
                <a
                  href={trackingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#D4AF37] text-white px-5 py-2 rounded-md font-serif text-lg shadow-md hover:shadow-lg hover:bg-[#c19b2e] transition"
                >
                  ✨ View USPS Tracking ✨
                </a>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
