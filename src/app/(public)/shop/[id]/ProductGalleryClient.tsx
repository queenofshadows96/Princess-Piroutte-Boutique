"use client";

import { useEffect, useState } from "react";
import ProductGallery from "./ProductGallery";

export default function ProductGalleryClient({ product, selectedColorId }) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (!product || !selectedColorId) return;

    const color = product.product_colors.find((c) => c.id === selectedColorId);
    if (!color) return;

    const sorted =
      color.product_color_images_color_id_fkey?.slice().sort((a, b) => {
        return (a.sort_order ?? 0) - (b.sort_order ?? 0);
      }) ?? [];

    setImages(sorted);
  }, [product, selectedColorId]);

  return <ProductGallery images={images} />;
}
