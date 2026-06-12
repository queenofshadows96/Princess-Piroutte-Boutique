"use client";

import { useEffect, useState } from "react";

export default function PackingSlipPage({ params }) {
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

  useEffect(() => {
    loadShipment();
  }, [params.id]);

  if (loading) {
    return <main className="p-10">Loading packing slip…</main>;
  }

  if (!shipment) {
    return <main className="p-10">Shipment not found.</main>;
  }

  const order = shipment.orders;
  const items = order?.order_items || [];

  // Parse shipping address
  let shipping = null;
  try {
    shipping = order?.shipping_address ? JSON.parse(order.shipping_address) : null;
  } catch {}

  return (
    <main className="p-10 bg-white text-black">
      {/* HEADER */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold">Princess Pirouette Boutique</h1>
        <p className="text-lg mt-2">Packing Slip</p>
      </div>

      {/* ORDER + SHIPMENT INFO */}
      <div className="mb-8">
        <p><strong>Order #:</strong> {order.id}</p>
        <p><strong>Shipment #:</strong> {shipment.id}</p>
        <p><strong>Customer:</strong> {order.customer_name}</p>
        <p><strong>Email:</strong> {order.customer_email}</p>

        {shipping && (
          <div className="mt-3">
            <p><strong>Ship To:</strong></p>
            <p>
              {shipping.line1}<br />
              {shipping.line2 && <>{shipping.line2}<br /></>}
              {shipping.city}, {shipping.state} {shipping.postal_code}<br />
              {shipping.country}
            </p>
          </div>
        )}
      </div>

      {/* ITEMS */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Items</h2>

        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Product</th>
              <th className="text-left py-2">Color</th>
              <th className="text-left py-2">Size</th>
              <th className="text-left py-2">Qty</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item, i) => {
              const product = item.products;
              const color = item.product_colors;

              return (
                <tr key={i} className="border-b">
                  <td className="py-2">{product?.name}</td>
                  <td className="py-2">{color?.color_name}</td>
                  <td className="py-2">{item.size}</td>
                  <td className="py-2">{item.quantity}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* FOOTER */}
      <div className="mt-16 text-center text-gray-600">
        <p>Thank you for shopping with Princess Pirouette Boutique!</p>
        <p>Your order made our day ✨</p>
      </div>

      {/* PRINT AUTOMATICALLY */}
      <script>
        {`setTimeout(() => { window.print(); }, 500);`}
      </script>
    </main>
  );
}
