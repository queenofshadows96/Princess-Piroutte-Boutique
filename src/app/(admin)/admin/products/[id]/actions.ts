"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

//
// ---------------------------------------------------------
// UPDATE PRODUCT
// ---------------------------------------------------------
export async function updateProduct(formData: FormData) {
  const supabase = createClient();

  const id = formData.get("id")!.toString();
  const name = (formData.get("name") || "").toString().trim();
  const category = (formData.get("category") || "").toString().trim();
  const description = (formData.get("description") || "").toString().trim();
  const priceStr = (formData.get("price") || "").toString().trim();
  const price = parseFloat(priceStr);

  await supabase
    .from("products")
    .update({ name, category, description, price })
    .eq("id", id);

  revalidatePath(`/admin/products/${id}`);
}

//
// ---------------------------------------------------------
// ADD COLOR
// ---------------------------------------------------------
export async function addColor(formData: FormData) {
  const supabase = createClient();

  const productId = formData.get("product_id")!.toString();
  const colorName = (formData.get("color_name") || "").toString().trim();

  await supabase.from("product_colors").insert({
    product_id: productId,
    color_name: colorName,
  });

  revalidatePath(`/admin/products/${productId}`);
}

//
// ---------------------------------------------------------
// DELETE COLOR
// ---------------------------------------------------------
export async function deleteColor(formData: FormData) {
  const supabase = createClient();

  const productId = formData.get("product_id")!.toString();
  const colorId = formData.get("color_id")!.toString();

  await supabase.from("product_colors").delete().eq("id", colorId);

  revalidatePath(`/admin/products/${productId}`);
}

//
// ---------------------------------------------------------
// UPLOAD IMAGES
// ---------------------------------------------------------
export async function uploadImages(formData: FormData) {
  const supabase = createClient();
  const sharp = (await import("sharp")).default;

  const productId = formData.get("product_id")!.toString();
  const colorId = formData.get("color_id")!.toString();
  const files = formData.getAll("images") as File[];

  const bucket = "product-images";

  for (const file of files) {
    const safeName = file.name.replace(/\s+/g, "-").toLowerCase();
    const baseName = `${Date.now()}-${safeName}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const originalBuffer = buffer;
    const largeBuffer = await sharp(buffer).resize(1200).toBuffer();
    const mediumBuffer = await sharp(buffer).resize(800).toBuffer();
    const thumbBuffer = await sharp(buffer).resize(200).toBuffer();

    const originalPath = `${productId}/${colorId}/original/${baseName}`;
    const largePath = `${productId}/${colorId}/large/${baseName}`;
    const mediumPath = `${productId}/${colorId}/medium/${baseName}`;
    const thumbPath = `${productId}/${colorId}/thumb/${baseName}`;

    const uploads = [
      { path: originalPath, data: originalBuffer },
      { path: largePath, data: largeBuffer },
      { path: mediumPath, data: mediumBuffer },
      { path: thumbPath, data: thumbBuffer },
    ];

    for (const u of uploads) {
      await supabase.storage.from(bucket).upload(u.path, u.data, {
        contentType: file.type,
        upsert: false,
      });
    }

    const { data: publicData } = supabase.storage
      .from(bucket)
      .getPublicUrl(originalPath);

    await supabase.from("product_color_images").insert({
      color_id: colorId,
      image_url: publicData.publicUrl,
      sort_order: 0,
    });
  }

  revalidatePath(`/admin/products/${productId}`);
}

//
// ---------------------------------------------------------
// ⭐ DELETE IMAGE — FIXED + NO REDIRECT ⭐
// ---------------------------------------------------------
export async function deleteImage(formData: FormData) {
  const supabase = createClient();

  const productId = formData.get("product_id")!.toString();
  const imageId = formData.get("image_id")!.toString();

  // 1. Fetch the image row
  const { data: imageRow } = await supabase
    .from("product_color_images")
    .select("image_url")
    .eq("id", imageId)
    .single();

  if (imageRow?.image_url) {
    const bucket = "product-images";

    // Extract the storage path from the public URL
    const fullUrl = imageRow.image_url;
    const prefix = `/object/public/${bucket}/`;
    const idx = fullUrl.indexOf(prefix);

    if (idx !== -1) {
      const relativePath = fullUrl.substring(idx + prefix.length);

      // Example: 1/2/original/123.jpg
      const parts = relativePath.split("/");
      const baseName = parts.pop(); // 123.jpg
      const folder = parts.slice(0, 2).join("/"); // productId/colorId

      const paths = [
        `${folder}/original/${baseName}`,
        `${folder}/large/${baseName}`,
        `${folder}/medium/${baseName}`,
        `${folder}/thumb/${baseName}`,
      ];

      await supabase.storage.from(bucket).remove(paths);
    }
  }

  // 2. Delete DB row
  await supabase.from("product_color_images").delete().eq("id", imageId);

  // 3. Revalidate
  revalidatePath(`/admin/products/${productId}`);
}

//
// ---------------------------------------------------------
// SAVE VARIANTS
// ---------------------------------------------------------
export async function saveVariants(formData: FormData) {
  const supabase = createClient();

  const productId = formData.get("product_id")!.toString();

  const { data: product } = await supabase
    .from("products")
    .select("price")
    .eq("id", productId)
    .single();

  const [{ data: colors }, { data: sizes }] = await Promise.all([
    supabase.from("product_colors").select("id").eq("product_id", productId),
    supabase.from("sizes").select("id").order("sort_order", { ascending: true }),
  ]);

  await supabase.from("product_variants").delete().eq("product_id", productId);

  const newVariants: any[] = [];

  for (const color of colors!) {
    for (const size of sizes!) {
      const inventoryKey = `inventory-${color.id}-${size.id}`;
      const inventoryStr = (formData.get(inventoryKey) || "").toString().trim();
      const inventory = parseInt(inventoryStr || "0", 10);

      newVariants.push({
        product_id: productId,
        color_id: color.id,
        size_id: size.id,
        inventory,
        price: product.price,
      });
    }
  }

  if (newVariants.length > 0) {
    await supabase.from("product_variants").insert(newVariants);
  }

  revalidatePath(`/admin/products/${productId}`);
}

//
// ---------------------------------------------------------
// ⭐ REORDER IMAGES — FIXED ⭐
// ---------------------------------------------------------
export async function reorderImages(formData: FormData) {
  const supabase = createClient();

  const updates = JSON.parse(formData.get("order") as string);
  const productId = formData.get("product_id")?.toString() || null;

  const { error } = await supabase
    .from("product_color_images")
    .upsert(updates);

  if (error) {
    console.error("Reorder error:", error);
    throw new Error("Failed to reorder images");
  }

  if (productId) {
    revalidatePath(`/admin/products/${productId}`);
  }
}
