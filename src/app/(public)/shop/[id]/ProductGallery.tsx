"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";

export default function ProductGallery({ images }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-64 bg-[#fff8fc] border border-[#f7dce9] rounded-xl flex items-center justify-center text-[#e89ac7]">
        No images available
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      {/* MAIN SWIPER */}
      <Swiper
        modules={[Navigation, Pagination, Thumbs]}
        thumbs={{ swiper: thumbsSwiper }}
        pagination={{ clickable: true }}
        navigation
        className="rounded-3xl overflow-hidden border border-[#B8860B]"
      >
        {images.map((img) => (
          <SwiperSlide key={img.id}>
            {/* 4:5 Aspect Ratio Container */}
            <div className="w-full aspect-[4/5] bg-white flex items-center justify-center">
              <img
                src={img.image_url}
                className="object-contain w-full h-full"
                alt=""
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* THUMBNAILS */}
      <Swiper
        onSwiper={setThumbsSwiper}
        modules={[Thumbs]}
        slidesPerView={5}
        spaceBetween={10}
        watchSlidesProgress
        className="rounded-xl"
      >
        {images.map((img) => (
          <SwiperSlide key={img.id}>
            <div className="w-full h-20 bg-white flex items-center justify-center rounded-lg border border-[#f7dce9] cursor-pointer">
              <img
                src={img.image_url}
                className="object-contain w-full h-full"
                alt=""
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
