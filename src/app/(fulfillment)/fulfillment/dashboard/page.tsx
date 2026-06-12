"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function FulfillmentDashboard() {
  const [overview, setOverview] = useState<any>(null);
  const [unfulfilledOrders, setUnfulfilledOrders] = useState<any[]>([]);
  const [pendingShipments, setPendingShipments] = useState<any[]>([]);
  const [shippedNotDelivered, setShippedNotDelivered] = useState<any[]>([]);
  const [deliveredShipments, setDeliveredShipments] = useState<any[]>([]);
  const [missingProductData, setMissingProductData] = useState<any[]>([]);
  const [ordersWithNotes, setOrdersWithNotes] = useState<any[]>([]);
  const [ordersWithGiftMessages, setOrdersWithGiftMessages] = useState<any[]>([]);

  async function safeJson(res: Response) {
    try {
      return await res.json();
    } catch {
      return null;
    }
  }

  async function loadAll() {
    const [
      overviewRes,
      unfulfilledRes,
      pendingRes,
      shippedRes,
      deliveredRes,
      missingRes,
      notesRes,
      giftsRes,
    ] = await Promise.all([
      fetch("/api/fulfillment/dashboard/overview"),
      fetch("/api/fulfillment/dashboard/unfulfilled-orders"),
      fetch("/api/fulfillment/dashboard/pending-shipments"),
      fetch("/api/fulfillment/dashboard/shipped-not-delivered"),
      fetch("/api/fulfillment/dashboard/delivered-shipments"),
      fetch("/api/fulfillment/dashboard/missing-product-data"),
      fetch("/api/fulfillment/dashboard/orders-with-notes"),
      fetch("/api/fulfillment/dashboard/orders-with-gift-messages"),
    ]);

    setOverview(await safeJson(overviewRes));
    setUnfulfilledOrders((await safeJson(unfulfilledRes)) || []);
    setPendingShipments((await safeJson(pendingRes)) || []);
    setShippedNotDelivered((await safeJson(shippedRes)) || []);
    setDeliveredShipments((await safeJson(deliveredRes)) || []);
    setMissingProductData((await safeJson(missingRes)) || []);
    setOrdersWithNotes((await safeJson(notesRes)) || []);
    setOrdersWithGiftMessages((await safeJson(giftsRes)) || []);
  }

  useEffect(() => {
    loadAll();
  }, []);

  return (
    <main className="py-20 px-6 space-y-12 bg-pink-50 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800">Fulfillment Dashboard</h1>

      {/* OVERVIEW CARDS */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Overview</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {/* 0️⃣ Total Orders */}
          <DashboardCard label="Total Orders" value={overview?.total_orders} />

          {/* ⭐ Total Products */}
          <DashboardCard label="Total Products" value={overview?.total_products} />

          {/* 1️⃣ Unfulfilled */}
          <DashboardCard
            label="Unfulfilled Orders"
            value={overview?.unfulfilled_orders}
          />

          {/* 2️⃣ Gift Messages */}
          <DashboardCard
            label="Gift Messages"
            value={overview?.orders_with_gift_messages}
          />

          {/* 3️⃣ Orders With Notes */}
          <DashboardCard
            label="Orders w/ Notes"
            value={overview?.orders_with_notes}
          />

          {/* 4️⃣ Pending Shipments */}
          <DashboardCard
            label="Pending Shipments"
            value={overview?.pending_shipments}
          />

          {/* 5️⃣ Shipped */}
          <DashboardCard
            label="Shipped (Not Delivered)"
            value={overview?.shipped_not_delivered}
          />

          {/* 6️⃣ Delivered */}
          <DashboardCard
            label="Delivered"
            value={overview?.delivered ?? deliveredShipments.length}
          />

          {/* 7️⃣ Missing Product Data */}
          <DashboardCard
            label="Missing Product Data"
            value={overview?.missing_product_data}
          />
        </div>
      </section>

      {/* QUICK NAV BUTTONS */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <QuickNavCard
          title="Orders"
          description="View and manage all orders"
          href="/fulfillment/orders"
        />
        <QuickNavCard
          title="Shipments"
          description="View and manage shipments"
          href="/fulfillment/shipments"
        />
        <QuickNavCard
          title="Products"
          description="Manage product data & shipping info"
          href="/fulfillment/products"
        />
      </section>

      {/* 1️⃣ UNFULFILLED ORDERS */}
      <DashboardSection
        title="Unfulfilled Orders"
        items={unfulfilledOrders}
        viewAllHref="/fulfillment/orders?shipment=none"
      >
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Order ID</th>
              <th className="text-left py-2">Customer</th>
              <th className="text-left py-2">Notes</th>
              <th className="text-left py-2">Gift Message</th>
              <th className="text-left py-2">View</th>
            </tr>
          </thead>

          <tbody>
            {unfulfilledOrders.slice(0, 5).map((order: any) => (
              <tr key={order.id} className="border-b">
                <td className="py-2">{order.id}</td>
                <td className="py-2">{order.customer_name}</td>
                <td className="py-2">
                  {order.fulfillment_notes ? "Yes" : "—"}
                </td>
                <td className="py-2">{order.gift_message ? "Yes" : "—"}</td>
                <td className="py-2">
                  <Link
                    href={`/fulfillment/orders/${order.id}`}
                    className="text-blue-600 underline"
                  >
                    View Order
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DashboardSection>

      {/* 2️⃣ ORDERS WITH GIFT MESSAGES */}
      <DashboardSection
        title="Orders with Gift Messages"
        items={ordersWithGiftMessages}
        viewAllHref="/fulfillment/orders?gift=true"
      >
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Order ID</th>
              <th className="text-left py-2">Customer</th>
              <th className="text-left py-2">Gift Message</th>
              <th className="text-left py-2">View</th>
            </tr>
          </thead>

          <tbody>
            {ordersWithGiftMessages.slice(0, 5).map((o: any) => (
              <tr key={o.id} className="border-b">
                <td className="py-2">{o.id}</td>
                <td className="py-2">{o.customer_name}</td>
                <td className="py-2">{o.gift_message}</td>
                <td className="py-2">
                  <Link
                    href={`/fulfillment/orders/${o.id}`}
                    className="text-blue-600 underline"
                  >
                    View Order
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DashboardSection>

      {/* 3️⃣ ORDERS WITH NOTES */}
      <DashboardSection
        title="Orders with Fulfillment Notes"
        items={ordersWithNotes}
        viewAllHref="/fulfillment/orders?notes=true"
      >
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Order ID</th>
              <th className="text-left py-2">Customer</th>
              <th className="text-left py-2">Notes</th>
              <th className="text-left py-2">View</th>
            </tr>
          </thead>

          <tbody>
            {ordersWithNotes.slice(0, 5).map((o: any) => (
              <tr key={o.id} className="border-b">
                <td className="py-2">{o.id}</td>
                <td className="py-2">{o.customer_name}</td>
                <td className="py-2">{o.fulfillment_notes}</td>
                <td className="py-2">
                  <Link
                    href={`/fulfillment/orders/${o.id}`}
                    className="text-blue-600 underline"
                  >
                    View Order
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DashboardSection>

      {/* 4️⃣ PENDING SHIPMENTS */}
      <DashboardSection
        title="Pending Shipments"
        items={pendingShipments}
        viewAllHref="/fulfillment/shipments?status=pending"
      >
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Shipment ID</th>
              <th className="text-left py-2">Order ID</th>
              <th className="text-left py-2">Tracking</th>
              <th className="text-left py-2">Carrier</th>
              <th className="text-left py-2">View</th>
            </tr>
          </thead>

          <tbody>
            {pendingShipments.slice(0, 5).map((s: any) => (
              <tr key={s.id} className="border-b">
                <td className="py-2">{s.id}</td>
                <td className="py-2">{s.order_id}</td>
                <td className="py-2">{s.tracking_number || "—"}</td>
                <td className="py-2">{s.carrier || "—"}</td>
                <td className="py-2">
                  <Link
                    href={`/fulfillment/shipments/${s.id}`}
                    className="text-blue-600 underline"
                  >
                    View Shipment
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DashboardSection>

      {/* 5️⃣ SHIPPED NOT DELIVERED */}
      <DashboardSection
        title="Shipped (Not Delivered)"
        items={shippedNotDelivered}
        viewAllHref="/fulfillment/shipments?status=shipped"
      >
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Shipment ID</th>
              <th className="text-left py-2">Order ID</th>
              <th className="text-left py-2">Tracking</th>
              <th className="text-left py-2">Shipped At</th>
              <th className="text-left py-2">View</th>
            </tr>
          </thead>

          <tbody>
            {shippedNotDelivered.slice(0, 5).map((s: any) => (
              <tr key={s.id} className="border-b">
                <td className="py-2">{s.id}</td>
                <td className="py-2">{s.order_id}</td>
                <td className="py-2">{s.tracking_number}</td>
                <td className="py-2">
                  {s.shipped_at ? new Date(s.shipped_at).toLocaleString() : "—"}
                </td>
                <td className="py-2">
                  <Link
                    href={`/fulfillment/shipments/${s.id}`}
                    className="text-blue-600 underline"
                  >
                    View Shipment
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DashboardSection>

      {/* 6️⃣ DELIVERED SHIPMENTS */}
      <DashboardSection
        title="Delivered Shipments"
        items={deliveredShipments}
        viewAllHref="/fulfillment/shipments?status=delivered"
      >
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Shipment ID</th>
              <th className="text-left py-2">Order ID</th>
              <th className="text-left py-2">Tracking</th>
              <th className="text-left py-2">Delivered At</th>
              <th className="text-left py-2">View</th>
            </tr>
          </thead>

          <tbody>
            {deliveredShipments.slice(0, 5).map((s: any) => (
              <tr key={s.id} className="border-b">
                <td className="py-2">{s.id}</td>
                <td className="py-2">{s.order_id}</td>
                <td className="py-2">{s.tracking_number || "—"}</td>
                <td className="py-2">
                  {s.delivered_at
                    ? new Date(s.delivered_at).toLocaleString()
                    : s.status?.toLowerCase() === "delivered"
                    ? "Delivered by USPS"
                    : "—"}
                </td>
                <td className="py-2">
                  <Link
                    href={`/fulfillment/shipments/${s.id}`}
                    className="text-blue-600 underline"
                  >
                    View Shipment
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DashboardSection>

      {/* 7️⃣ MISSING PRODUCT DATA */}
      <DashboardSection
        title="Products Missing Weight/Dimensions"
        items={missingProductData}
        viewAllHref="/fulfillment/products?missing=true"
      >
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Product ID</th>
              <th className="text-left py-2">Name</th>
              <th className="text-left py-2">Missing Fields</th>
            </tr>
          </thead>

          <tbody>
            {missingProductData.slice(0, 5).map((p: any) => (
              <tr key={p.id} className="border-b">
                <td className="py-2">{p.id}</td>
                <td className="py-2">{p.name}</td>
                <td className="py-2">
                  {[
                    !p.weight_oz && "Weight",
                    !p.length_in && "Length",
                    !p.width_in && "Width",
                    !p.height_in && "Height",
                  ]
                    .filter(Boolean)
                    .join(", ")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DashboardSection>
    </main>
  );
}

function DashboardCard({ label, value }: { label: string; value: any }) {
  return (
    <div className="p-4 bg-white border rounded-lg shadow-sm text-center">
      <p className="text-sm text-gray-600">{label}</p>
      <p className="text-2xl font-bold text-gray-900">{value ?? "—"}</p>
    </div>
  );
}

function QuickNavCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="p-6 bg-white border rounded-lg shadow hover:shadow-md transition block"
    >
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      <p className="text-gray-600 mt-1">{description}</p>
      <p className="text-pink-600 font-semibold mt-3">Go →</p>
    </Link>
  );
}

function DashboardSection({
  title,
  items,
  viewAllHref,
  children,
}: {
  title: string;
  items: any[];
  viewAllHref: string;
  children: React.ReactNode;
}) {
  return (
    <section className="p-6 bg-white border rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-semibold">{title}</h2>
        <Link href={viewAllHref} className="text-pink-600 underline">
          View All
        </Link>
      </div>
      {items?.length === 0 ? (
        <p className="text-gray-500">No items found.</p>
      ) : (
        children
      )}
    </section>
  );
}
