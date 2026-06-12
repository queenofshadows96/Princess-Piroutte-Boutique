import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import AdminBackButtons from "../../../AdminBackButtons";

export const dynamic = "force-dynamic";

export default function NewProductPage() {
  async function saveProduct(formData: FormData) {
    "use server";

    const supabase = createClient();

    const name = formData.get("name") as string;
    const category = formData.get("category") as string;
    const description = formData.get("description") as string;

    const { data, error } = await supabase
      .from("products")
      .insert({
        name,
        category,
        description,
      })
      .select("id")
      .single();

    if (error) {
      console.error(error);
      throw new Error("Failed to save product");
    }

    redirect(`/admin/products/${data.id}`);
  }

  return (
    <main className="px-6 min-h-screen">
      <div className="max-w-4xl mx-auto">

        <AdminBackButtons />

        <h1
          className="text-4xl mb-10 text-center"
          style={{
            color: "#D4AF37",
            fontFamily: "'Great Vibes', cursive",
          }}
        >
          Add New Product ✨
        </h1>

        <form
          action={saveProduct}
          className="rounded-3xl shadow-md p-8"
          style={{
            backgroundColor: "rgba(255,255,255,0.92)",
            border: "2px solid #B8860B",
            fontFamily: "'Times New Roman', serif",
          }}
        >
          {/* NAME */}
          <div className="mb-6">
            <label className="block mb-2 text-[#B8860B] font-bold">
              Product Name
            </label>
            <input
              name="name"
              type="text"
              className="w-full p-3 rounded-lg border"
              style={{ borderColor: "#B8860B" }}
              placeholder="Lavender Dream Leotard"
              required
            />
          </div>

          {/* CATEGORY */}
          <div className="mb-6">
            <label className="block mb-2 text-[#B8860B] font-bold">
              Category
            </label>
            <input
              name="category"
              type="text"
              className="w-full p-3 rounded-lg border"
              style={{ borderColor: "#B8860B" }}
              placeholder="Leotard, Tutu, Skirt..."
            />
          </div>

          {/* DESCRIPTION */}
          <div className="mb-6">
            <label className="block mb-2 text-[#B8860B] font-bold">
              Product Details
            </label>
            <textarea
              name="description"
              className="w-full p-3 rounded-lg border min-h-[140px]"
              style={{ borderColor: "#B8860B" }}
              placeholder="Soft buttery fabric, perfect for class and stage..."
            />
          </div>

          {/* SAVE BUTTON */}
          <div className="text-center mt-8">
            <button
              type="submit"
              className="px-8 py-3 rounded-xl"
              style={{
                backgroundColor: "#D4AF37",
                color: "white",
                fontWeight: "bold",
                border: "2px solid #B8860B",
              }}
            >
              Save Product
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
