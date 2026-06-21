"use client";

import AgentLayout from "@/components/AgentLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useCRM } from "@/context/CRMContext";
import { MOCK_LISTINGS } from "@/data/mock";
import { useState } from "react";
import Link from "next/link";

const statusOptions = [
  { value: "for-sale", label: "For Sale", color: "#059669" },
  { value: "for-rent", label: "For Rent", color: "#2563eb" },
  { value: "pending", label: "Pending", color: "#d97706" },
  { value: "sold", label: "Sold", color: "#6b7280" },
];

function AgentListingsContent() {
  const { leads } = useCRM();
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "table">("table");
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const listings = MOCK_LISTINGS;

  const filteredListings = listings.filter(l => {
    const matchesStatus = statusFilter === "all" || l.status === statusFilter;
    const matchesSearch = l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         l.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleStatusChange = (id: string, newStatus: string) => {
    // Would update in real app
    alert(`Status updated to ${newStatus}`);
  };

  return (
    <AgentLayout>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: 600, color: "#1f2937", margin: "0 0 8px" }}>Listings</h1>
          <p style={{ color: "#6b7280", margin: 0, fontSize: "14px" }}>{listings.length} properties • {leads.filter(l => l.interest === "buy" || l.interest === "sell").length} active leads</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          style={{ padding: "10px 20px", background: "#2D4F3C", color: "#fff", border: "none", borderRadius: "8px", fontSize: "14px", fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14" /></svg>
          Add Listing
        </button>
      </div>

      {/* Stats Bar */}
      <div style={{ display: "flex", gap: "16px", marginBottom: "24px", padding: "16px", background: "#fff", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
        {statusOptions.map(opt => {
          const count = listings.filter(l => l.status === opt.value).length;
          return (
            <button
              key={opt.value}
              onClick={() => setStatusFilter(opt.value)}
              style={{ 
                padding: "8px 16px", 
                border: "none", 
                borderRadius: "6px", 
                fontSize: "13px", 
                cursor: "pointer",
                background: statusFilter === opt.value ? opt.color : "#f3f4f6",
                color: statusFilter === opt.value ? "#fff" : "#6b7280",
              }}
            >
              {opt.label} ({count})
            </button>
          );
        })}
        <button
          onClick={() => setStatusFilter("all")}
          style={{ 
            padding: "8px 16px", 
            border: "none", 
            borderRadius: "6px", 
            fontSize: "13px", 
            cursor: "pointer",
            background: statusFilter === "all" ? "#1f2937" : "#f3f4f6",
            color: statusFilter === "all" ? "#fff" : "#6b7280",
          }}
        >
          All ({listings.length})
        </button>
      </div>

      {/* Filters & View Toggle */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <input
          type="text"
          placeholder="Search listings..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ padding: "12px 16px", border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "14px", width: "300px" }}
        />
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={() => setViewMode("table")}
            style={{ padding: "8px 12px", background: viewMode === "table" ? "#f3f4f6" : "#fff", border: "1px solid #e5e7eb", borderRadius: "6px", cursor: "pointer" }}
          >
            <svg style={{ width: "18px", height: "18px", color: "#6b7280" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </button>
          <button
            onClick={() => setViewMode("grid")}
            style={{ padding: "8px 12px", background: viewMode === "grid" ? "#f3f4f6" : "#fff", border: "1px solid #e5e7eb", borderRadius: "6px", cursor: "pointer" }}
          >
            <svg style={{ width: "18px", height: "18px", color: "#6b7280" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Listings */}
      {viewMode === "table" ? (
        <div style={{ background: "#fff", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f9fafb", borderBottom: "1px solid #e5e7eb" }}>
                <th style={{ padding: "14px 16px", textAlign: "left", fontSize: "12px", fontWeight: 600, color: "#6b7280" }}>PROPERTY</th>
                <th style={{ padding: "14px", textAlign: "left", fontSize: "12px", fontWeight: 600, color: "#6b7280" }}>PRICE</th>
                <th style={{ padding: "14px", textAlign: "left", fontSize: "12px", fontWeight: 600, color: "#6b7280" }}>TYPE</th>
                <th style={{ padding: "14px", textAlign: "left", fontSize: "12px", fontWeight: 600, color: "#6b7280" }}>STATUS</th>
                <th style={{ padding: "14px", textAlign: "left", fontSize: "12px", fontWeight: 600, color: "#6b7280" }}>VIEWS</th>
                <th style={{ padding: "14px", textAlign: "left", fontSize: "12px", fontWeight: 600, color: "#6b7280" }}>INQUIRIES</th>
                <th style={{ padding: "14px", textAlign: "left", fontSize: "12px", fontWeight: 600, color: "#6b7280" }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredListings.map(listing => {
                const views = Math.floor(Math.random() * 500) + 50;
                const inquiries = Math.floor(Math.random() * 20) + 2;
                return (
                  <tr key={listing.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <img src={listing.images[0]} alt={listing.title} style={{ width: "60px", height: "45px", borderRadius: "6px", objectFit: "cover" }} />
                        <div>
                          <div style={{ fontWeight: 500, color: "#1f2937", fontSize: "14px" }}>{listing.title}</div>
                          <div style={{ fontSize: "12px", color: "#6b7280" }}>{listing.neighborhood}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "14px", fontWeight: 600, color: "#1f2937" }}>${listing.price.toLocaleString()}</td>
                    <td style={{ padding: "14px", fontSize: "14px", color: "#4b5563" }}>{listing.propertyType}</td>
                    <td style={{ padding: "14px" }}>
                      <select
                        value={listing.status}
                        onChange={(e) => handleStatusChange(listing.id, e.target.value)}
                        style={{ 
                          padding: "6px 10px", 
                          borderRadius: "6px", 
                          fontSize: "12px", 
                          border: "none", 
                          cursor: "pointer",
                          background: statusOptions.find(s => s.value === listing.status)?.color || "#f3f4f6",
                          color: "#fff",
                          fontWeight: 500,
                        }}
                      >
                        {statusOptions.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                      </select>
                    </td>
                    <td style={{ padding: "14px", fontSize: "14px", color: "#6b7280" }}>{views}</td>
                    <td style={{ padding: "14px", fontSize: "14px", color: "#6b7280" }}>{inquiries}</td>
                    <td style={{ padding: "14px" }}>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <Link href={`/listings/${listing.slug}`} style={{ color: "#1E4A5F", fontSize: "13px", textDecoration: "none" }}>View</Link>
                        <button style={{ color: "#6b7280", fontSize: "13px", background: "none", border: "none", cursor: "pointer" }}>Edit</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
          {filteredListings.map(listing => (
            <div key={listing.id} style={{ background: "#fff", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", overflow: "hidden" }}>
              <div style={{ position: "relative" }}>
                <img src={listing.images[0]} alt={listing.title} style={{ width: "100%", height: "200px", objectFit: "cover" }} />
                <span style={{ position: "absolute", top: "12px", left: "12px", padding: "4px 10px", background: statusOptions.find(s => s.value === listing.status)?.color || "#6b7280", color: "#fff", borderRadius: "12px", fontSize: "12px", fontWeight: 500 }}>
                  {statusOptions.find(s => s.value === listing.status)?.label}
                </span>
              </div>
              <div style={{ padding: "16px" }}>
                <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#1f2937", margin: "0 0 8px" }}>{listing.title}</h3>
                <p style={{ fontSize: "14px", color: "#6b7280", margin: "0 0 12px" }}>{listing.neighborhood}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "18px", fontWeight: 700, color: "#2D4F3C" }}>${listing.price.toLocaleString()}</span>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button style={{ padding: "6px 10px", background: "#f3f4f6", border: "none", borderRadius: "6px", fontSize: "12px", cursor: "pointer" }}>Edit</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Listing Modal (simplified) */}
      {showAddModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ background: "#fff", borderRadius: "12px", padding: "24px", width: "500px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h2 style={{ fontSize: "20px", fontWeight: 600, margin: 0 }}>Add New Listing</h2>
              <button onClick={() => setShowAddModal(false)} style={{ background: "none", border: "none", fontSize: "24px", cursor: "pointer", color: "#6b7280" }}>✕</button>
            </div>
            <p style={{ color: "#6b7280", marginBottom: "20px" }}>This would open a full listing creation wizard in production. For demo, redirect to list-property page.</p>
            <Link 
              href="/list-property"
              onClick={() => setShowAddModal(false)}
              style={{ display: "block", padding: "14px", background: "#2D4F3C", color: "#fff", border: "none", borderRadius: "8px", fontSize: "15px", fontWeight: 500, textAlign: "center", textDecoration: "none" }}
            >
              Go to Listing Wizard
            </Link>
          </div>
        </div>
      )}
    </AgentLayout>
  );
}

export default function AgentListingsPage() {
  return (
    <ProtectedRoute allowedRoles={["agent", "admin"]}>
      <AgentListingsContent />
    </ProtectedRoute>
  );
}