"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import { MOCK_LISTINGS } from "@/data/mock";

function SavedContent() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const savedListingIds = ["listing-001", "listing-003", "listing-005", "listing-007"];
  const savedListings = MOCK_LISTINGS.filter(l => savedListingIds.includes(l.id));

  return (
    <div style={{ minHeight: "100vh", background: "#f8f7f5" }}>
      <header style={{ background: "#fff", borderBottom: "1px solid #e5e5e5", padding: "16px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#2D4F3C", margin: 0 }}>Pacific Edge</h1>
        </Link>
        <nav style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <Link href="/dashboard" style={{ color: "#666", textDecoration: "none" }}>Dashboard</Link>
          <Link href="/listings" style={{ color: "#666", textDecoration: "none" }}>Browse</Link>
          <Link href="/saved" style={{ color: "#2D4F3C", fontWeight: 500, textDecoration: "none" }}>Saved</Link>
          <button onClick={() => { logout(); window.location.href = "/"; }} style={{ background: "none", border: "none", color: "#666", cursor: "pointer", fontSize: "14px" }}>Sign Out</button>
        </nav>
      </header>

      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px" }}>
        <h2 style={{ fontSize: "28px", fontWeight: 600, color: "#1f2937", margin: "0 0 8px" }}>Saved Listings</h2>
        <p style={{ color: "#6b7280", margin: "0 0 32px" }}>{savedListings.length} properties saved</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "24px" }}>
          {savedListings.map(listing => (
            <div key={listing.id} style={{ background: "#fff", borderRadius: "12px", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
              <div style={{ position: "relative" }}>
                <img src={listing.images[0]} alt={listing.title} style={{ width: "100%", height: "240px", objectFit: "cover" }} />
                <button style={{ position: "absolute", top: "16px", right: "16px", background: "#fff", border: "none", borderRadius: "50%", width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#dc2626" stroke="#dc2626" strokeWidth="1">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </button>
              </div>
              <div style={{ padding: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                  <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#1f2937", margin: 0 }}>{listing.title}</h3>
                  <span style={{ padding: "4px 10px", borderRadius: "12px", fontSize: "12px", background: listing.status === "for-sale" ? "#d1fae5" : "#dbeafe", color: listing.status === "for-sale" ? "#065f46" : "#1e40af" }}>{listing.status === "for-sale" ? "Sale" : "Rent"}</span>
                </div>
                <p style={{ fontSize: "14px", color: "#6b7280", margin: "0 0 16px" }}>{listing.address}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", gap: "16px", fontSize: "14px", color: "#6b7280" }}>
                    <span>{listing.beds} beds</span>
                    <span>{listing.baths} baths</span>
                    <span>{listing.sqft.toLocaleString()} sqft</span>
                  </div>
                  <span style={{ fontSize: "20px", fontWeight: 700, color: "#2D4F3C" }}>${listing.price.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {savedListings.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 20px", background: "#fff", borderRadius: "12px" }}>
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5" style={{ margin: "0 auto 20px" }}>
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#1f2937", margin: "0 0 8px" }}>No saved listings</h3>
            <p style={{ color: "#6b7280", margin: "0 0 20px" }}>Start browsing to save properties you like</p>
            <Link href="/listings" style={{ display: "inline-block", padding: "12px 24px", background: "#2D4F3C", color: "#fff", borderRadius: "8px", textDecoration: "none" }}>Browse Listings</Link>
          </div>
        )}
      </main>
    </div>
  );
}

export default function SavedPage() {
  return (
    <ProtectedRoute allowedRoles={["buyer", "renter", "seller"]}>
      <SavedContent />
    </ProtectedRoute>
  );
}