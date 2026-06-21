"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import { MOCK_LISTINGS } from "@/data/mock";
import { useState } from "react";

const tabs = [
  { id: "overview", label: "Overview", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { id: "saved", label: "Saved Listings", icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" },
  { id: "searches", label: "Saved Searches", icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" },
  { id: "activity", label: "Activity", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
];

function DashboardContent() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  const savedListingIds = ["listing-001", "listing-003", "listing-005", "listing-007"];
  const savedListings = MOCK_LISTINGS.filter(l => savedListingIds.includes(l.id));
  const forSaleListings = savedListings.filter(l => l.status === "for-sale");
  const forRentListings = savedListings.filter(l => l.status === "for-rent");

  const recentActivity = [
    { id: 1, type: "view", title: "Viewed Yaletown Modern Loft", time: "2 hours ago", icon: "👁️" },
    { id: 2, type: "inquiry", title: "Inquired about Coal Harbour Penthouse", time: "1 day ago", icon: "💬" },
    { id: 3, type: "save", title: "Saved Kitsilano Family Home", time: "2 days ago", icon: "❤️" },
    { id: 4, type: "alert", title: "Price drop on Coal Harbour Penthouse", time: "3 days ago", icon: "📉" },
  ];

  const savedSearches = [
    { id: 1, name: "Kitsilano 2BR", criteria: "2 beds, $500K-$1M", alerts: 3, matches: 8 },
    { id: 2, name: "Downtown Condos", criteria: "1 bed, $400K-$800K", alerts: 1, matches: 12 },
  ];

  const notifications = [
    { id: 1, type: "price", message: "Coal Harbour Penthouse dropped $150K", time: "1h ago", unread: true },
    { id: 2, type: "match", message: "3 new listings match Kitsilano search", time: "5h ago", unread: true },
    { id: 3, type: "response", message: "Sophie Chen responded to your inquiry", time: "1d ago", unread: false },
    { id: 4, type: "alert", message: "New 2BR in Yaletown under $800K", time: "2d ago", unread: false },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#f0f2f5" }}>
      {/* Header */}
      <header style={{ background: "linear-gradient(135deg, #1f2937 0%, #374151 100%)", padding: "0" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 24px" }}>
            <Link href="/" style={{ textDecoration: "none" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ width: "40px", height: "40px", background: "#2D4F3C", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#fff", fontSize: "18px" }}>P</div>
                <span style={{ fontSize: "20px", fontWeight: 700, color: "#fff" }}>Pacific Edge</span>
              </div>
            </Link>
            <nav style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {["Browse", "Neighbourhoods", "Agents", "Blog"].map(item => (
                <Link 
                  key={item} 
                  href={item === "Browse" ? "/listings" : item === "Agents" ? "/agents" : item === "Neighbourhoods" ? "/neighbourhoods" : "/blog"}
                  style={{ padding: "8px 16px", color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: "14px", borderRadius: "6px", transition: "all 0.2s" }}
                >
                  {item}
                </Link>
              ))}
            </nav>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <Link href="/list-property" style={{ padding: "8px 16px", background: "#2D4F3C", color: "#fff", borderRadius: "6px", textDecoration: "none", fontSize: "14px", fontWeight: 500 }}>List Property</Link>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "8px 12px", background: "rgba(255,255,255,0.1)", borderRadius: "8px" }}>
                <img src={user?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80"} alt="" style={{ width: "32px", height: "32px", borderRadius: "50%", objectFit: "cover" }} />
                <span style={{ color: "#fff", fontSize: "14px", fontWeight: 500 }}>{user?.firstName}</span>
                <button 
                  onClick={() => { logout(); window.location.href = "/"; }}
                  style={{ background: "none", border: "none", color: "rgba(255,255,255,0.6)", cursor: "pointer", fontSize: "12px" }}
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: "1400px", margin: "0 auto", padding: "24px" }}>
        {/* Welcome Banner */}
        <div style={{ background: "linear-gradient(135deg, #2D4F3C 0%, #1E4A5F 100%)", borderRadius: "16px", padding: "32px", marginBottom: "24px", color: "#fff" }}>
          <h1 style={{ fontSize: "28px", fontWeight: 700, margin: "0 0 8px" }}>Welcome back, {user?.firstName}! 👋</h1>
          <p style={{ opacity: 0.9, margin: 0, fontSize: "16px" }}>Track your property search, saved listings, and inquiries all in one place.</p>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "4px", background: "#fff", padding: "6px", borderRadius: "12px", marginBottom: "24px", width: "fit-content", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 20px",
                border: "none",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: 500,
                cursor: "pointer",
                background: activeTab === tab.id ? "#2D4F3C" : "transparent",
                color: activeTab === tab.id ? "#fff" : "#6b7280",
                transition: "all 0.2s",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d={tab.icon} />
              </svg>
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "overview" && (
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px" }}>
            {/* Main Content */}
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {/* Stats Row */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
                {[
                  { label: "Saved Listings", value: savedListings.length, color: "#2D4F3C", icon: "🏠" },
                  { label: "Active Inquiries", value: 2, color: "#1E4A5F", icon: "💬" },
                  { label: "Saved Searches", value: savedSearches.length, color: "#A67C52", icon: "🔍" },
                  { label: "New Matches", value: 3, color: "#059669", icon: "✨" },
                ].map((stat, i) => (
                  <div key={i} style={{ background: "#fff", borderRadius: "12px", padding: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", borderLeft: `4px solid ${stat.color}` }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                      <span style={{ fontSize: "12px", color: "#6b7280" }}>{stat.label}</span>
                      <span style={{ fontSize: "20px" }}>{stat.icon}</span>
                    </div>
                    <div style={{ fontSize: "28px", fontWeight: 700, color: stat.color }}>{stat.value}</div>
                  </div>
                ))}
              </div>

              {/* Featured Listings */}
              <div style={{ background: "#fff", borderRadius: "12px", padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                  <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#1f2937", margin: 0 }}>Saved Listings</h3>
                  <Link href="/saved" style={{ color: "#1E4A5F", fontSize: "14px", textDecoration: "none", fontWeight: 500 }}>View all →</Link>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
                  {savedListings.slice(0, 4).map(listing => (
                    <Link 
                      key={listing.id} 
                      href={`/listings/${listing.slug}`}
                      style={{ textDecoration: "none", background: "#f9fafb", borderRadius: "10px", overflow: "hidden", transition: "transform 0.2s" }}
                    >
                      <div style={{ position: "relative" }}>
                        <img src={listing.images[0]} alt={listing.title} style={{ width: "100%", height: "140px", objectFit: "cover" }} />
                        <span style={{ position: "absolute", top: "10px", left: "10px", padding: "4px 10px", background: listing.status === "for-sale" ? "#059669" : "#2563eb", color: "#fff", borderRadius: "12px", fontSize: "11px", fontWeight: 500 }}>
                          {listing.status === "for-sale" ? "For Sale" : "For Rent"}
                        </span>
                      </div>
                      <div style={{ padding: "14px" }}>
                        <h4 style={{ fontSize: "14px", fontWeight: 600, color: "#1f2937", margin: "0 0 6px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{listing.title}</h4>
                        <p style={{ fontSize: "12px", color: "#6b7280", margin: "0 0 10px" }}>{listing.neighborhood}</p>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ fontSize: "16px", fontWeight: 700, color: "#2D4F3C" }}>${listing.price.toLocaleString()}</span>
                          <span style={{ fontSize: "12px", color: "#9ca3af" }}>{listing.beds}bd • {listing.baths}ba</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div style={{ background: "#fff", borderRadius: "12px", padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
                <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#1f2937", margin: "0 0 20px" }}>Recent Activity</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {recentActivity.map(activity => (
                    <div key={activity.id} style={{ display: "flex", alignItems: "center", gap: "14px", padding: "14px", background: "#f9fafb", borderRadius: "10px" }}>
                      <span style={{ fontSize: "20px" }}>{activity.icon}</span>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: "14px", color: "#1f2937", margin: "0 0 4px", fontWeight: 500 }}>{activity.title}</p>
                        <p style={{ fontSize: "12px", color: "#9ca3af", margin: 0 }}>{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {/* Notifications */}
              <div style={{ background: "#fff", borderRadius: "12px", padding: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                  <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#1f2937", margin: 0 }}>Notifications</h3>
                  <span style={{ background: "#fee2e2", color: "#dc2626", fontSize: "11px", padding: "2px 8px", borderRadius: "10px" }}>
                    {notifications.filter(n => n.unread).length} new
                  </span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {notifications.map(notif => (
                    <div 
                      key={notif.id} 
                      style={{ 
                        padding: "12px", 
                        background: notif.unread ? "#f0fdf4" : "#f9fafb", 
                        borderRadius: "8px", 
                        borderLeft: notif.unread ? "3px solid #059669" : "3px solid #e5e7eb",
                      }}
                    >
                      <p style={{ fontSize: "13px", color: "#1f2937", margin: "0 0 6px" }}>{notif.message}</p>
                      <span style={{ fontSize: "11px", color: "#9ca3af" }}>{notif.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div style={{ background: "#fff", borderRadius: "12px", padding: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
                <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#1f2937", margin: "0 0 16px" }}>Quick Actions</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <Link href="/listings" style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px", background: "#2D4F3C", color: "#fff", borderRadius: "8px", textDecoration: "none", fontSize: "14px", fontWeight: 500 }}>
                    <span>🔍</span> Browse New Listings
                  </Link>
                  <Link href="/sell/valuation" style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px", background: "#f8f7f5", color: "#1f2937", borderRadius: "8px", textDecoration: "none", fontSize: "14px", fontWeight: 500, border: "1px solid #e5e7eb" }}>
                    <span>🏷️</span> Get Home Valuation
                  </Link>
                  <Link href="/list-property" style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px", background: "#f8f7f5", color: "#1f2937", borderRadius: "8px", textDecoration: "none", fontSize: "14px", fontWeight: 500, border: "1px solid #e5e7eb" }}>
                    <span>🏠</span> List Your Property
                  </Link>
                  <Link href="/saved" style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px", background: "#f8f7f5", color: "#1f2937", borderRadius: "8px", textDecoration: "none", fontSize: "14px", fontWeight: 500, border: "1px solid #e5e7eb" }}>
                    <span>❤️</span> View Saved Properties
                  </Link>
                </div>
              </div>

              {/* Profile Summary */}
              <div style={{ background: "#fff", borderRadius: "12px", padding: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
                  <img src={user?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80"} alt="" style={{ width: "56px", height: "56px", borderRadius: "50%", objectFit: "cover" }} />
                  <div>
                    <h4 style={{ fontSize: "16px", fontWeight: 600, color: "#1f2937", margin: "0 0 4px" }}>{user?.firstName} {user?.lastName}</h4>
                    <p style={{ fontSize: "13px", color: "#6b7280", margin: 0 }}>{user?.email}</p>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", paddingTop: "16px", borderTop: "1px solid #f3f4f6" }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "20px", fontWeight: 700, color: "#2D4F3C" }}>{savedListings.length}</div>
                    <div style={{ fontSize: "12px", color: "#6b7280" }}>Saved</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "20px", fontWeight: 700, color: "#1E4A5F" }}>{savedSearches.length}</div>
                    <div style={{ fontSize: "12px", color: "#6b7280" }}>Searches</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "saved" && (
          <div style={{ background: "#fff", borderRadius: "12px", padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
            <h3 style={{ fontSize: "20px", fontWeight: 600, color: "#1f2937", margin: "0 0 24px" }}>All Saved Listings ({savedListings.length})</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
              {savedListings.map(listing => (
                <Link 
                  key={listing.id} 
                  href={`/listings/${listing.slug}`}
                  style={{ textDecoration: "none" }}
                >
                  <div style={{ background: "#f9fafb", borderRadius: "12px", overflow: "hidden", transition: "transform 0.2s", cursor: "pointer" }}>
                    <img src={listing.images[0]} alt={listing.title} style={{ width: "100%", height: "180px", objectFit: "cover" }} />
                    <div style={{ padding: "16px" }}>
                      <span style={{ display: "inline-block", padding: "4px 10px", background: listing.status === "for-sale" ? "#d1fae5" : "#dbeafe", color: listing.status === "for-sale" ? "#065f46" : "#1e40af", borderRadius: "12px", fontSize: "11px", marginBottom: "8px" }}>
                        {listing.status === "for-sale" ? "For Sale" : "For Rent"}
                      </span>
                      <h4 style={{ fontSize: "15px", fontWeight: 600, color: "#1f2937", margin: "0 0 8px" }}>{listing.title}</h4>
                      <p style={{ fontSize: "13px", color: "#6b7280", margin: "0 0 12px" }}>{listing.neighborhood}</p>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: "18px", fontWeight: 700, color: "#2D4F3C" }}>${listing.price.toLocaleString()}</span>
                        <span style={{ fontSize: "13px", color: "#9ca3af" }}>{listing.beds}bd • {listing.baths}ba • {listing.sqft.toLocaleString()}sqft</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {activeTab === "searches" && (
          <div style={{ background: "#fff", borderRadius: "12px", padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
              <h3 style={{ fontSize: "20px", fontWeight: 600, color: "#1f2937", margin: 0 }}>Saved Searches ({savedSearches.length})</h3>
              <button style={{ padding: "10px 20px", background: "#2D4F3C", color: "#fff", border: "none", borderRadius: "8px", fontSize: "14px", fontWeight: 500, cursor: "pointer" }}>+ New Search</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {savedSearches.map(search => (
                <div key={search.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px", background: "#f9fafb", borderRadius: "12px", border: "1px solid #e5e7eb" }}>
                  <div>
                    <h4 style={{ fontSize: "16px", fontWeight: 600, color: "#1f2937", margin: "0 0 8px" }}>{search.name}</h4>
                    <p style={{ fontSize: "14px", color: "#6b7280", margin: "0 0 8px" }}>{search.criteria}</p>
                    <div style={{ display: "flex", gap: "16px" }}>
                      <span style={{ fontSize: "13px", color: "#059669" }}>🔔 {search.alerts} alerts on</span>
                      <span style={{ fontSize: "13px", color: "#1E4A5F" }}>✨ {search.matches} new matches</span>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button style={{ padding: "8px 16px", background: "#fff", border: "1px solid #e5e7eb", borderRadius: "6px", fontSize: "13px", cursor: "pointer" }}>Edit</button>
                    <button style={{ padding: "8px 16px", background: "#2D4F3C", color: "#fff", border: "none", borderRadius: "6px", fontSize: "13px", fontWeight: 500, cursor: "pointer" }}>View Results</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "activity" && (
          <div style={{ background: "#fff", borderRadius: "12px", padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
            <h3 style={{ fontSize: "20px", fontWeight: 600, color: "#1f2937", margin: "0 0 24px" }}>Activity History</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {recentActivity.concat([
                { id: 5, type: "inquiry", title: "Scheduled viewing for Kitsilano Family Home", time: "4 days ago", icon: "📅" },
                { id: 6, type: "inquiry", title: "Contacted Marcus Reyes about Yaletown loft", time: "1 week ago", icon: "📧" },
              ]).map((activity, i) => (
                <div key={activity.id} style={{ display: "flex", alignItems: "center", gap: "16px", padding: "16px", background: "#f9fafb", borderRadius: "10px", borderLeft: "3px solid #2D4F3C" }}>
                  <span style={{ fontSize: "24px" }}>{activity.icon}</span>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: "15px", fontWeight: 500, color: "#1f2937", margin: "0 0 4px" }}>{activity.title}</p>
                    <p style={{ fontSize: "13px", color: "#9ca3af", margin: 0 }}>{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute allowedRoles={["buyer", "renter", "seller"]}>
      <DashboardContent />
    </ProtectedRoute>
  );
}