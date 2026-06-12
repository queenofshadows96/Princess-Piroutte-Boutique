import { createClient } from "@/lib/supabase/server";
import QuickLinks from "./QuickLinks";

export default async function AdminDashboard() {
  const supabase = createClient();

  // ⭐ TOTAL ORDERS
  const { count: totalOrders } = await supabase
    .from("orders")
    .select("*", { count: "exact", head: true });

  // ⭐ ORDERS TODAY
  const today = new Date().toISOString().split("T")[0];
  const { count: ordersToday } = await supabase
    .from("orders")
    .select("*", { count: "exact", head: true })
    .gte("created_at", `${today}T00:00:00`)
    .lte("created_at", `${today}T23:59:59`);

  // ⭐ TOTAL PRODUCTS
  const { count: totalProducts } = await supabase
    .from("products")
    .select("*", { count: "exact", head: true });

  // ⭐ REVENUE TODAY
  const { data: revenueRowsToday } = await supabase
    .from("orders")
    .select("total")
    .gte("created_at", `${today}T00:00:00`)
    .lte("created_at", `${today}T23:59:59`);

  const revenueToday =
    revenueRowsToday?.reduce((sum, row) => sum + (row.total || 0), 0) || 0;

  // ⭐ TOTAL REVENUE (ALL TIME)
  const { data: allRevenueRows } = await supabase
    .from("orders")
    .select("total");

  const totalRevenue =
    allRevenueRows?.reduce((sum, row) => sum + (row.total || 0), 0) || 0;

  // ⭐ Stats Array (now includes Total Revenue)
  const stats = [
    { label: "Orders Today", value: ordersToday ?? 0 },
    { label: "Total Orders", value: totalOrders ?? 0 },
    { label: "Products", value: totalProducts ?? 0 },
    { label: "Revenue Today", value: `$${revenueToday.toFixed(2)}` },
    { label: "Total Revenue", value: `$${totalRevenue.toFixed(2)}` }, // ⭐ NEW
  ];

  return (
    <div>
      {/* Header */}
      <h2
        style={{
          fontFamily: "'Great Vibes', cursive",
          fontSize: "42px",
          color: "#D4AF37",
          marginBottom: "10px",
          textAlign: "center",
        }}
      >
        Welcome Back, Royal Keeper ✨
      </h2>

      <p
        style={{
          textAlign: "center",
          color: "#444",
          fontSize: "17px",
          marginBottom: "30px",
          fontFamily: "'Times New Roman', serif",
        }}
      >
        Here’s your boutique overview for today.
      </p>

      {/* Stats Section */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          marginBottom: "40px",
        }}
      >
        {stats.map((stat, i) => (
          <div
            key={i}
            style={{
              background: "white",
              border: "2px solid #D4AF37",
              borderRadius: "12px",
              padding: "20px",
              textAlign: "center",
              boxShadow: "0 0 10px rgba(212,175,55,0.15)",
            }}
          >
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "20px",
                color: "#D4AF37",
                marginBottom: "8px",
              }}
            >
              {stat.label}
            </div>
            <div
              style={{
                fontSize: "28px",
                fontWeight: "bold",
                color: "#444",
                fontFamily: "'Times New Roman', serif",
              }}
            >
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Links */}
      <h3
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "26px",
          color: "#D4AF37",
          marginBottom: "20px",
        }}
      >
        Quick Access
      </h3>

      <QuickLinks />
    </div>
  );
}
