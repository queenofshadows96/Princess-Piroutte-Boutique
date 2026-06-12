import Link from "next/link";
import { headers } from "next/headers";
import AdminBackButtons from "../../AdminBackButtons";
import OrdersFilters from "./OrdersFilters";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminOrdersPage({ searchParams }) {
  const host = headers().get("host");
  const protocol = host?.includes("localhost") ? "http" : "https";

  const query = new URLSearchParams(searchParams).toString();

  const res = await fetch(`${protocol}://${host}/api/admin/orders?${query}`, {
    cache: "no-store",
  });

  const { orders } = await res.json();

  return (
    <main className="px-6 min-h-screen">
      <div className="max-w-5xl mx-auto">

        <AdminBackButtons />

        <h1
          className="text-4xl mb-10 text-center"
          style={{
            color: "#D4AF37",
            fontFamily: "'Great Vibes', cursive",
          }}
        >
          All Customer Orders
        </h1>

        {/* ⭐ SEARCH + FILTERS */}
        <OrdersFilters />

        <div className="overflow-x-auto rounded-3xl shadow-md">
          <table
            className="w-full"
            style={{
              backgroundColor: "rgba(255,255,255,0.92)",
              border: "2px solid #B8860B",
              fontFamily: "'Times New Roman', serif",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "rgba(212,175,55,0.15)" }}>
                <th className="p-4 text-left text-[#B8860B]">Order ID</th>
                <th className="p-4 text-left text-[#B8860B]">Customer</th>
                <th className="p-4 text-left text-[#B8860B]">Items</th>
                <th className="p-4 text-left text-[#B8860B]">Total</th>
                <th className="p-4 text-left text-[#B8860B]">Status</th>
                <th className="p-4 text-left text-[#B8860B]">Tracking</th>
                <th className="p-4 text-left text-[#B8860B]">Date</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-[#fff8e6]"
                  style={{
                    borderBottom: "1px solid rgba(184,134,11,0.2)",
                    color: "#C09090",
                  }}
                >
                  <td className="p-4 text-[#B8860B] font-bold">
                    <Link href={`/admin/orders/${order.id}`}>
                      {order.id}
                    </Link>
                  </td>

                  <td className="p-4">
                    <Link href={`/admin/orders/${order.id}`}>
                      {order.customer_name}
                      <br />
                      <span style={{ fontSize: "0.85rem", opacity: 0.7 }}>
                        {order.customer_email}
                      </span>
                    </Link>
                  </td>

                  <td className="p-4">{order.order_items?.length || 0}</td>

                  <td className="p-4">${order.total?.toFixed(2)}</td>

                  <td className="p-4">
                    <span
                      style={{
                        backgroundColor: "#D4AF37",
                        color: "white",
                        padding: "4px 10px",
                        borderRadius: "8px",
                        fontWeight: "bold",
                        fontSize: "0.85rem",
                      }}
                    >
                      {order.status.toUpperCase()}
                    </span>
                  </td>

                  <td className="p-4">
                    {order.tracking_number ? (
                      <span
                        style={{
                          backgroundColor: "#D4AF37",
                          color: "white",
                          padding: "4px 10px",
                          borderRadius: "8px",
                          fontWeight: "bold",
                          fontSize: "0.85rem",
                        }}
                      >
                        {order.tracking_number}
                      </span>
                    ) : (
                      <span style={{ opacity: 0.6 }}>No tracking yet</span>
                    )}
                  </td>

                  {/* ⭐ FIXED DATE DISPLAY */}
                  <td className="p-4">
                    {order.created_at.split("T")[0]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
