import Link from "next/link";
import { headers } from "next/headers";
import AdminBackButtons from "../../AdminBackButtons";
import ReturnsFilters from "./ReturnsFilters";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminReturnsPage({ searchParams }) {
  const host = headers().get("host");
  const protocol = host?.includes("localhost") ? "http" : "https";

  const query = new URLSearchParams(searchParams).toString();

  const res = await fetch(`${protocol}://${host}/api/admin/returns?${query}`, {
    cache: "no-store",
  });

  const { returns } = await res.json();

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
          All Return Requests
        </h1>

        <ReturnsFilters />

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
                <th className="p-4 text-left text-[#B8860B]">Return ID</th>
                <th className="p-4 text-left text-[#B8860B]">Order ID</th>
                <th className="p-4 text-left text-[#B8860B]">Email</th>
                <th className="p-4 text-left text-[#B8860B]">Status</th>
                <th className="p-4 text-left text-[#B8860B]">Date</th>
              </tr>
            </thead>

            <tbody>
              {returns.map((r) => (
                <tr
                  key={r.id}
                  className="hover:bg-[#fff8e6]"
                  style={{
                    borderBottom: "1px solid rgba(184,134,11,0.2)",
                    color: "#C09090",
                  }}
                >
                  {/* ⭐ Clickable ID cell (same as Orders) */}
                  <td className="p-4 text-[#B8860B] font-bold">
                    <Link href={`/admin/returns/${r.id}`}>
                      {r.id}
                    </Link>
                  </td>

                  {/* ⭐ Optional: make customer email clickable too */}
                  <td className="p-4">
                    <Link href={`/admin/returns/${r.id}`}>
                      {r.order_id}
                    </Link>
                  </td>

                  <td className="p-4 break-words">{r.customer_email}</td>

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
                      {r.status.toUpperCase()}
                    </span>
                  </td>

                  <td className="p-4">
                    {r.created_at.split("T")[0]}
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
