"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

export default function UploadImagesForm({ productId, colorId, uploadImages }) {
  const [warningShown, setWarningShown] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files || []);

    for (const file of files) {
      const img = new Image();
      img.src = URL.createObjectURL(file);

      await new Promise((resolve) => {
        img.onload = () => {
          const ratio = img.width / img.height;

          if (ratio < 0.78 || ratio > 0.82) {
            if (!warningShown) {
              alert(
                `⚠️ Image "${file.name}" is not 4:5 ratio.\n\n` +
                  `Detected ratio: ${ratio.toFixed(2)}\n` +
                  `Recommended: 4:5 (e.g., 1200×1500)\n\n` +
                  `Your image will still upload, but it may appear inconsistent.`
              );
              setWarningShown(true);
            }
          }

          resolve();
        };
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    startTransition(async () => {
      await uploadImages(formData);   // ⭐ WAIT INSIDE TRANSITION
      router.refresh();               // ⭐ REFRESH AFTER ACTION COMPLETES
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="flex flex-col sm:flex-row gap-3 items-start mb-4"
    >
      <input type="hidden" name="product_id" value={productId} />
      <input type="hidden" name="color_id" value={colorId} />

      <input
        type="file"
        name="images"
        multiple
        accept="image/*"
        onChange={handleFileChange}
        className="text-sm"
        style={{ color: "#C09090" }}
      />

      <button
        type="submit"
        disabled={isPending}
        className="px-4 py-2 rounded-xl text-sm"
        style={{
          backgroundColor: "#D4AF37",
          color: "white",
          fontWeight: "bold",
          border: "2px solid #B8860B",
        }}
      >
        {isPending ? "Uploading..." : "Upload Images"}
      </button>
    </form>
  );
}
