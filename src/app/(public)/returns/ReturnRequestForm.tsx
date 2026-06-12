"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Great_Vibes, Playfair_Display } from "next/font/google";

const magnolia = Great_Vibes({ subsets: ["latin"], weight: ["400"] });
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["italic"],
});

const cardStyle = {
  backgroundColor: "rgba(255, 255, 255, 0.92)",
  border: "2px solid #B8860B",
};

export default function ReturnRequestForm() {
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    let uploadedUrls: string[] = [];

    // Upload photos one by one
    if (photos.length > 0) {
      const formData = new FormData();
      photos.forEach((file) => formData.append("photos", file));

      const uploadRes = await fetch("/api/returns/upload-photos", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadRes.json();
      if (uploadData.error) {
        setMessage("Photo upload failed.");
        setLoading(false);
        return;
      }

      uploadedUrls = uploadData.urls;
    }

    // Create return request
    const res = await fetch("/api/returns/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        order_id: Number(orderId),
        customer_email: email,
        reason,
        details,
        photo_urls: uploadedUrls,
      }),
    });

    const data = await res.json();

    if (data.error) {
      setMessage(data.error);
    } else {
      setMessage("Your return request has been submitted!");
      setOrderId("");
      setEmail("");
      setReason("");
      setDetails("");
      setPhotos([]);
    }

    setLoading(false);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="p-8 rounded-3xl shadow-md mt-20"
      style={cardStyle}
    >
      <h2
        className={`${playfair.className} italic text-3xl font-bold mb-6 text-center`}
        style={{ color: "#D4AF37" }}
      >
        Start a Return
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Order ID */}
        <div>
          <label
            className="block mb-2 text-lg"
            style={{ color: "#C09090", fontFamily: "'Times New Roman', serif" }}
          >
            Order ID
          </label>
          <input
            type="number"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            required
            className="w-full p-3 rounded-lg border"
            style={{ borderColor: "#D4AF37" }}
          />
        </div>

        {/* Email */}
        <div>
          <label
            className="block mb-2 text-lg"
            style={{ color: "#C09090", fontFamily: "'Times New Roman', serif" }}
          >
            Email Used on Order
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 rounded-lg border"
            style={{ borderColor: "#D4AF37" }}
          />
        </div>

        {/* Reason */}
        <div>
          <label
            className="block mb-2 text-lg"
            style={{ color: "#C09090", fontFamily: "'Times New Roman', serif" }}
          >
            Reason for Return
          </label>
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
            className="w-full p-3 rounded-lg border bg-white"
            style={{ borderColor: "#D4AF37" }}
          >
            <option value="">Select a reason</option>
            <option value="wrong_size">Wrong size</option>
            <option value="damaged">Item arrived damaged</option>
            <option value="not_as_expected">Not as expected</option>
            <option value="changed_mind">Changed my mind</option>
          </select>
        </div>

        {/* Details */}
        <div>
          <label
            className="block mb-2 text-lg"
            style={{ color: "#C09090", fontFamily: "'Times New Roman', serif" }}
          >
            Additional Details (optional)
          </label>
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="w-full p-3 rounded-lg border"
            style={{ borderColor: "#D4AF37" }}
            rows={4}
          />
        </div>

        {/* ⭐ Custom Multi-Photo Uploader */}
        <div>
          <label
            className="block mb-2 text-lg"
            style={{ color: "#C09090", fontFamily: "'Times New Roman', serif" }}
          >
            Upload Photos (optional)
          </label>

          <div className="space-y-4">

            {/* Add Photo Button */}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (!e.target.files) return;
                const file = e.target.files[0];
                if (file) setPhotos((prev) => [...prev, file]);
              }}
              className="w-full"
            />

            {/* Thumbnails */}
            <div className="flex flex-wrap gap-4">
              {photos.map((file, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(file)}
                    alt="preview"
                    className="w-24 h-24 object-cover rounded-lg border"
                    style={{ borderColor: "#D4AF37" }}
                  />

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() =>
                      setPhotos((prev) => prev.filter((_, i) => i !== index))
                    }
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full p-3 rounded-lg text-white text-lg"
          style={{ backgroundColor: "#D4AF37" }}
        >
          {loading ? "Submitting..." : "Submit Return Request"}
        </button>

        {message && (
          <p
            className="text-center mt-4 text-lg"
            style={{ color: "#C09090", fontFamily: "'Times New Roman', serif" }}
          >
            {message}
          </p>
        )}
      </form>
    </motion.section>
  );
}
