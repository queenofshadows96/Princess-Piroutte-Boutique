// app/(admin)/admin/products/[id]/page.tsx
export const dynamic = "force-dynamic";

import { createClient } from "@/lib/supabase/server";
import PriceInput from "../components/PriceInput";
import UploadImagesForm from "./UploadImagesForm";
import { unstable_noStore as noStore } from "next/cache";

import {
  updateProduct,
  addColor,
  deleteColor,
  uploadImages,
  deleteImage,
  saveVariants,
} from "./actions";

import GalleryClient from "./GalleryClient";

type PageProps = {
  params: { id: string };
};

export default async function EditProductPage({ params }: PageProps) {
  noStore();

  const productId = Number(params.id);
  const supabase = createClient();

  // FIRST: load product + colors
  const [{ data: product }, { data: colors }] = await Promise.all([
    supabase
      .from("products")
      .select("id, name, category, description, price, created_at")
      .eq("id", productId)
      .single(),

    supabase
      .from("product_colors")
      .select("id, color_name, created_at")
      .eq("product_id", productId)
      .order("created_at", { ascending: true }),
  ]);

  if (!product) {
    return (
      <main className="px-6 min-h-screen">
        <div className="max-w-5xl mx-auto">
          <p className="mt-10 text-center" style={{ color: "#C09090" }}>
            Product not found.
          </p>
        </div>
      </main>
    );
  }

  // Build list of color IDs for image query
  const colorIds = colors?.map((c) => c.id) ?? [];

  // SECOND: load sizes, variants, and images
  const [{ data: sizes }, { data: variants }, { data: images }] =
    await Promise.all([
      supabase
        .from("sizes")
        .select("id, name, sort_order")
        .order("sort_order", { ascending: true }),

      supabase
        .from("product_variants")
        .select("id, product_id, color_id, size_id, inventory")
        .eq("product_id", productId),

      // ⭐ FIXED QUERY — filter by color_id, NOT product_id
      supabase
        .from("product_color_images")
        .select("id, color_id, image_url, sort_order")
        .in("color_id", colorIds)
        .order("sort_order", { ascending: true }),
    ]);

  // Map images by color
  const imagesByColor = new Map<string, typeof images>();
  (images || []).forEach((img) => {
    const key = img.color_id as string;
    if (!imagesByColor.has(key)) imagesByColor.set(key, []);
    imagesByColor.get(key)!.push(img);
  });

  // Variant helpers
  const variantKey = (colorId: string, sizeId: string) =>
    `${colorId}__${sizeId}`;

  const variantMap = new Map<string, (typeof variants)[number]>();
  (variants || []).forEach((v) => {
    variantMap.set(variantKey(v.color_id as string, v.size_id as string), v);
  });

  return (
    <main className="px-6 min-h-screen">
      <div className="max-w-5xl mx-auto">

        {/* BACK LINKS */}
        <div style={{ marginBottom: "20px", display: "flex", gap: "12px" }}>
          <a
            href="/admin/products"
            style={{
              padding: "10px 16px",
              backgroundColor: "#FFF5F7",
              border: "2px solid #D4AF37",
              borderRadius: "8px",
              color: "#444",
              fontFamily: "'Times New Roman', serif",
            }}
          >
            ← All Products
          </a>

          <a
            href="/admin"
            style={{
              padding: "10px 16px",
              backgroundColor: "#D4AF37",
              borderRadius: "8px",
              color: "white",
              textDecoration: "none",
              fontFamily: "'Times New Roman', serif",
            }}
          >
            ← Dashboard
          </a>
        </div>

        <h1
          className="text-4xl mb-10 text-center"
          style={{
            color: "#D4AF37",
            fontFamily: "'Great Vibes', cursive",
          }}
        >
          Edit Product ✨
        </h1>

        {/* PRODUCT INFO FORM */}
        <form
          action={updateProduct}
          className="rounded-3xl shadow-md p-8 mb-10"
          style={{
            backgroundColor: "rgba(255,255,255,0.92)",
            border: "2px solid #B8860B",
            fontFamily: "'Times New Roman', serif",
          }}
        >
          <input type="hidden" name="id" value={product.id} />

          <h2
            className="text-2xl mb-6 text-center"
            style={{
              color: "#D4AF37",
              fontFamily: "'Great Vibes', cursive",
            }}
          >
            Product Information
          </h2>

          {/* NAME */}
          <div className="mb-6">
            <label className="block mb-2 text-[#B8860B] font-bold">
              Product Name
            </label>
            <input
              name="name"
              type="text"
              defaultValue={product.name ?? ""}
              className="w-full p-3 rounded-lg border"
              style={{ borderColor: "#B8860B", backgroundColor: "white" }}
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
              defaultValue={product.category ?? ""}
              className="w-full p-3 rounded-lg border"
              style={{ borderColor: "#B8860B", backgroundColor: "white" }}
            />
          </div>

          {/* PRICE */}
          <div className="mb-6">
            <label className="block mb-2 text-[#B8860B] font-bold">Price</label>
            <PriceInput defaultValue={product.price ?? 0} />
          </div>

          {/* DESCRIPTION */}
          <div className="mb-6">
            <label className="block mb-2 text-[#B8860B] font-bold">
              Product Details
            </label>
            <textarea
              name="description"
              defaultValue={product.description ?? ""}
              className="w-full p-3 rounded-lg border min-h-[140px]"
              style={{ borderColor: "#B8860B", backgroundColor: "white" }}
            />
          </div>

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
              Save Product Info
            </button>
          </div>
        </form>

        {/* COLORS SECTION */}
        <section
          className="rounded-3xl shadow-md p-8 mb-10"
          style={{
            backgroundColor: "rgba(255,255,255,0.92)",
            border: "2px solid #B8860B",
            fontFamily: "'Times New Roman', serif",
          }}
        >
          <h2
            className="text-2xl mb-6 text-center"
            style={{
              color: "#D4AF37",
              fontFamily: "'Great Vibes', cursive",
            }}
          >
            Colors 🎨
          </h2>

          {/* ADD COLOR */}
          <form action={addColor} className="flex flex-col sm:flex-row gap-4 mb-8">
            <input type="hidden" name="product_id" value={product.id} />
            <input
              name="color_name"
              type="text"
              className="flex-1 p-3 rounded-lg border"
              style={{ borderColor: "#B8860B", backgroundColor: "white" }}
              placeholder="Blush Pink, Ivory, Lilac..."
              required
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-xl"
              style={{
                backgroundColor: "#D4AF37",
                color: "white",
                fontWeight: "bold",
                border: "2px solid #B8860B",
              }}
            >
              Add Color
            </button>
          </form>

          {/* LIST COLORS */}
          {colors && colors.length > 0 ? (
            <div className="space-y-6">
              {colors.map((color) => {
                const colorImages = imagesByColor.get(color.id as string) || [];
                return (
                  <div
                    key={color.id}
                    className="rounded-2xl p-5"
                    style={{
                      border: "1px solid rgba(184,134,11,0.4)",
                      backgroundColor: "rgba(255,248,230,0.4)",
                    }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <p
                        className="text-lg"
                        style={{ color: "#C09090", fontWeight: 600 }}
                      >
                        {color.color_name}
                      </p>

                      {/* DELETE COLOR */}
                      <form action={deleteColor}>
                        <input type="hidden" name="product_id" value={product.id} />
                        <input type="hidden" name="color_id" value={color.id} />
                        <button
                          type="submit"
                          className="px-4 py-2 rounded-xl text-sm"
                          style={{
                            backgroundColor: "white",
                            color: "#C09090",
                            border: "1px solid rgba(184,134,11,0.6)",
                          }}
                        >
                          Delete Color
                        </button>
                      </form>
                    </div>

                    {/* UPLOAD IMAGES */}
                    <UploadImagesForm
                      productId={product.id}
                      colorId={color.id}
                      uploadImages={uploadImages}
                    />

                    {/* GALLERY */}
                    <GalleryClient
                      key={JSON.stringify(colorImages)}
                      productId={product.id}
                      colorId={color.id}
                      colorName={color.color_name}
                      images={colorImages}
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <p style={{ color: "#C09090" }}>No colors added yet.</p>
          )}
        </section>

        {/* SIZES + VARIANTS */}
        <section
          className="rounded-3xl shadow-md p-8 mb-10"
          style={{
            backgroundColor: "rgba(255,255,255,0.92)",
            border: "2px solid #B8860B",
            fontFamily: "'Times New Roman', serif",
          }}
        >
          <h2
            className="text-2xl mb-6 text-center"
            style={{
              color: "#D4AF37",
              fontFamily: "'Great Vibes', cursive",
            }}
          >
            Sizes & Inventory 📦
          </h2>

          {(!colors || colors.length === 0) ||
          (!sizes || sizes.length === 0) ? (
            <p style={{ color: "#C09090" }}>
              Add at least one color and define sizes to manage inventory.
            </p>
          ) : (
            <form action={saveVariants}>
              <input type="hidden" name="product_id" value={product.id} />

              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr>
                      <th className="px-3 py-2 text-left" />
                      {sizes!.map((size) => (
                        <th
                          key={size.id}
                          className="px-3 py-2 text-center"
                          style={{ color: "#B8860B", fontWeight: 700 }}
                        >
                          {size.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {colors!.map((color) => (
                      <tr key={color.id}>
                        <td
                          className="px-3 py-3 align-top"
                          style={{ color: "#C09090", fontWeight: 600 }}
                        >
                          {color.color_name}
                        </td>
                        {sizes!.map((size) => {
                          const key = `${color.id}__${size.id}`;
                          const existing = variantMap.get(key);

                          return (
                            <td key={size.id} className="px-3 py-3 align-top">
                              <input
                                type="number"
                                name={`inventory-${color.id}-${size.id}`}
                                defaultValue={existing ? existing.inventory : ""}
                                placeholder="0"
                                className="w-full p-2 rounded-lg border text-xs"
                                style={{
                                  borderColor: "#B8860B",
                                  backgroundColor: "white",
                                }}
                              />
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

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
                  Save Inventory
                </button>
              </div>
            </form>
          )}
        </section>
      </div>
    </main>
  );
}
