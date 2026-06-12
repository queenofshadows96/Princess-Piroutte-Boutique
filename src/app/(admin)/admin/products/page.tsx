import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import AdminBackButtons from "../../AdminBackButtons";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const supabase = createClient();

  const { data: products, error } = await supabase
    .from("products")
    .select("id, name, category, created_at")
    .order("created_at", { ascending: false });

  return (
    <main className="px-6 min-h-screen">
      <div className="max-w-5xl mx-auto">

        <AdminBackButtons />

        {/* PAGE TITLE — MATCHES ORDERS DASHBOARD */}
        <h1
          className="text-4xl mb-10 text-center"
          style={{
            color: "#D4AF37",
            fontFamily: "'Great Vibes', cursive",
          }}
        >
          All Products ✨
        </h1>

        {/* CARD CONTAINER — SAME AS ORDERS */}
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
                <th className="p-4 text-left text-[#B8860B]">Name</th>
                <th className="p-4 text-left text-[#B8860B]">Category</th>
                <th className="p-4 text-left text-[#B8860B]">Created</th>
                <th className="p-4 text-right text-[#B8860B]">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products?.map((p) => (
                <tr
                  key={p.id}
                  className="hover:bg-[#fff8e6]"
                  style={{
                    borderBottom: "1px solid rgba(184,134,11,0.2)",
                    color: "#C09090",
                  }}
                >
                  <td className="p-4 text-[#B8860B] font-bold">
                    {p.name || "Untitled"}
                  </td>

                  <td className="p-4">{p.category || "—"}</td>

                  <td className="p-4">
                    {p.created_at
                      ? new Date(p.created_at).toLocaleDateString()
                      : "—"}
                  </td>

                  <td className="p-4 text-right">
                    <Link
                      href={`/admin/products/${p.id}`}
                      className="text-[#B8860B] font-bold hover:opacity-80"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}

              {(!products || products.length === 0) && (
                <tr>
                  <td className="p-6 text-center text-[#C09090]" colSpan={4}>
                    No products yet. Add one to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ADD PRODUCT BUTTON — MATCHES YOUR STYLE */}
        <div className="text-center mt-8">
          <Link
            href="/admin/products/new"
            className="inline-block px-6 py-3 rounded-xl"
            style={{
              backgroundColor: "#D4AF37",
              color: "white",
              fontFamily: "'Times New Roman', serif",
              fontWeight: "bold",
              border: "2px solid #B8860B",
            }}
          >
            Add New Product
          </Link>
        </div>
      </div>
    </main>
  );
}
