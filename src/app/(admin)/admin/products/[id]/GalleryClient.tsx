"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import ImageGallery from "./ImageGallery";
import { reorderImages, deleteImage } from "./actions";

export default function GalleryClient({ productId, colorId, colorName, images }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // ⭐ Handle drag‑and‑drop reorder
  const handleReorder = (newOrder) => {
    const formData = new FormData();
    formData.append("color_id", colorId.toString());
    formData.append("product_id", productId.toString());
    formData.append("order", JSON.stringify(newOrder));

    startTransition(async () => {
      await reorderImages(formData);
      router.refresh(); // ⭐ refresh AFTER server action finishes
    });
  };

  // ⭐ Handle delete
  const handleDelete = (imageId) => {
    const formData = new FormData();
    formData.append("image_id", imageId.toString());
    formData.append("product_id", productId.toString());

    startTransition(async () => {
      await deleteImage(formData);
      router.refresh(); // ⭐ refresh AFTER server action finishes
    });
  };

  return (
    <ImageGallery
      images={images}
      colorName={colorName}
      onReorder={handleReorder}
      onDelete={handleDelete}
      disabled={isPending}
    />
  );
}
