"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ReturnsFilters() {
  const router = useRouter();
  const params = useSearchParams();

  const [search, setSearch] = useState(params.get("search") || "");
  const [status, setStatus] = useState(params.get("status") || "");
  const [date, setDate] = useState(params.get("date") || "");

  function applyFilters() {
    const query = new URLSearchParams();

    if (search) query.set("search", search);
    if (status) query.set("status", status);
    if (date) query.set("date", date);

    router.push(`/admin/returns?${query.toString()}`);
  }

  function handleSearchKey(e) {
    if (e.key === "Enter") applyFilters();
  }

  return (
    <div
      style={{
        marginBottom: "20px",
        display: "flex",
        gap: "12px",
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      {/* Search */}
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleSearchKey}
        placeholder="Search return ID, order ID, or email"
        style={{
          padding: "10px",
          border: "2px solid #D4AF37",
          borderRadius: "8px",
          flex: "1",
        }}
      />

      {/* Status Filter */}
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        style={{
          padding: "10px",
          border: "2px solid #D4AF37",
          borderRadius: "8px",
        }}
      >
        <option value="">All Statuses</option>
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
        <option value="rejected">Rejected</option>
      </select>

      {/* Date Filter */}
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        style={{
          padding: "10px",
          border: "2px solid #D4AF37",
          borderRadius: "8px",
        }}
      />

      {/* APPLY BUTTON */}
      <button
        onClick={applyFilters}
        style={{
          padding: "10px 18px",
          backgroundColor: "#D4AF37",
          color: "white",
          borderRadius: "8px",
          fontWeight: "bold",
          border: "none",
          cursor: "pointer",
          fontFamily: "'Times New Roman', serif",
        }}
      >
        Apply Filters
      </button>
    </div>
  );
}
