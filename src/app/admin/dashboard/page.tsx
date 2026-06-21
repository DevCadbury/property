"use client";

import { useAuth } from "@/context/AuthContext";
import { useCRM } from "@/context/CRMContext";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

const adminNavItems = [
  { href: "/admin/dashboard", label: "Overview", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { href: "/admin/agents", label: "Agents", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
  { href: "/admin/listings", label: "All Listings", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
  { href: "/admin/leads", label: "Leads Pipeline", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
  { href: "/admin/users", label: "Users", icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" },
  { href: "/admin/reports", label: "Reports", icon: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
];

function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div style={{ minHeight: "100vh", background: "#f1f3f5", display: "flex" }}>
      {/* Sidebar */}
      <aside style={{ 
        width: sidebarOpen ? "260px" : "72px", 
        background: "#1f2937", 
        color: "#fff", 
        display: "flex", 
        flexDirection: "column",
        transition: "width 0.2s",
        position: "fixed",
        height: "100vh",
        zIndex: 100,
      }}>
        <div style={{ padding: "20px", borderBottom: "1px solid #374151" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "36px", height: "36px", background: "#dc2626", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "18px" }}>P</div>
            {sidebarOpen && <span style={{ fontWeight: 600, fontSize: "18px" }}>Pacific Edge Admin</span>}
          </div>
        </div>

        {sidebarOpen && user && (
          <div style={{ padding: "16px 20px", borderBottom: "1px solid #374151" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <img src={user.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80"} alt="" style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover" }} />
              <div>
                <div style={{ fontWeight: 500, fontSize: "14px" }}>{user.firstName} {user.lastName}</div>
                <div style={{ fontSize: "12px", color: "#dc2626" }}>Admin</div>
              </div>
            </div>
          </div>
        )}

        <nav style={{ flex: 1, padding: "16px 12px", overflow: "auto" }}>
          {adminNavItems.map(item => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px 16px",
                  borderRadius: "8px",
                  color: isActive ? "#fff" : "#9ca3af",
                  background: isActive ? "#dc2626" : "transparent",
                  textDecoration: "none",
                  marginBottom: "4px",
                  fontSize: "14px",
                  fontWeight: isActive ? 500 : 400,
                }}
              >
                <svg style={{ width: "20px", height: "20px", flexShrink: 0 }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                </svg>
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div style={{ padding: "16px", borderTop: "1px solid #374151" }}>
          <Link href="/agent/dashboard" style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", color: "#9ca3af", textDecoration: "none", fontSize: "14px", marginBottom: "8px" }}>
            <svg style={{ width: "20px", height: "20px" }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            {sidebarOpen && <span>Agent View</span>}
          </Link>
          <button
            onClick={() => { logout(); router.push("/"); }}
            style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", width: "100%", background: "transparent", border: "none", color: "#9ca3af", cursor: "pointer", fontSize: "14px", borderRadius: "8px" }}
          >
            <svg style={{ width: "20px", height: "20px" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            {sidebarOpen && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      <main style={{ flex: 1, marginLeft: sidebarOpen ? "260px" : "72px", transition: "margin-left 0.2s" }}>
        <header style={{ background: "#fff", padding: "16px 32px", borderBottom: "1px solid #e5e5e5", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: "none", border: "none", cursor: "pointer", padding: "8px" }}>
            <svg style={{ width: "24px", height: "24px", color: "#6b7280" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Link href="/" style={{ color: "#6b7280", fontSize: "14px", textDecoration: "none" }}>View Website</Link>
            <span style={{ padding: "4px 10px", background: "#fef3c7", color: "#d97706", borderRadius: "12px", fontSize: "12px" }}>Admin Mode</span>
          </div>
        </header>
        <div style={{ padding: "32px" }}>
          {children}
        </div>
      </main>
    </div>
  );
}

function AdminDashboardContent() {
  const { leads, appointments } = useCRM();

  const totalPipeline = leads.reduce((acc, l) => {
    if (l.budget && (l.status === "qualified" || l.status === "negotiating")) {
      const match = l.budget.match(/[\d,]+/);
      if (match) acc += parseInt(match[0].replace(/,/g, "")) * 1000;
    }
    return acc;
  }, 0);

  const stats = [
    { label: "Total Leads", value: leads.length, color: "#3b82f6", icon: "👥" },
    { label: "Active Listings", value: 8, color: "#10b981", icon: "🏠" },
    { label: "Pipeline Value", value: `$${(totalPipeline / 1000000).toFixed(1)}M`, color: "#8b5cf6", icon: "💰" },
    { label: "Appointments Today", value: appointments.filter(a => new Date(a.date).toDateString() === new Date().toDateString()).length, color: "#f59e0b", icon: "📅" },
    { label: "Agents Active", value: 4, color: "#2D4F3C", icon: "👤" },
    { label: "Conversion Rate", value: "24%", color: "#059669", icon: "📈" },
  ];

  return (
    <div>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: 600, color: "#1f2937", margin: "0 0 8px" }}>Admin Dashboard</h1>
        <p style={{ color: "#6b7280", margin: 0 }}>Platform overview and management</p>
      </div>

      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "16px", marginBottom: "32px" }}>
        {stats.map((stat, i) => (
          <div key={i} style={{ background: "#fff", borderRadius: "12px", padding: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
            <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "8px" }}>{stat.label}</div>
            <div style={{ fontSize: "28px", fontWeight: 700, color: stat.color }}>{stat.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px" }}>
        {/* Recent Leads */}
        <div style={{ background: "#fff", borderRadius: "12px", padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#1f2937", margin: 0 }}>Recent Leads</h3>
            <Link href="/admin/leads" style={{ color: "#1E4A5F", fontSize: "14px", textDecoration: "none" }}>View All →</Link>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                <th style={{ padding: "12px", textAlign: "left", fontSize: "12px", fontWeight: 600, color: "#6b7280" }}>NAME</th>
                <th style={{ padding: "12px", textAlign: "left", fontSize: "12px", fontWeight: 600, color: "#6b7280" }}>TYPE</th>
                <th style={{ padding: "12px", textAlign: "left", fontSize: "12px", fontWeight: 600, color: "#6b7280" }}>STATUS</th>
                <th style={{ padding: "12px", textAlign: "left", fontSize: "12px", fontWeight: 600, color: "#6b7280" }}>AGENT</th>
              </tr>
            </thead>
            <tbody>
              {leads.slice(0, 6).map(lead => (
                <tr key={lead.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                  <td style={{ padding: "12px" }}>
                    <div style={{ fontWeight: 500, color: "#1f2937" }}>{lead.firstName} {lead.lastName}</div>
                    <div style={{ fontSize: "12px", color: "#6b7280" }}>{lead.email}</div>
                  </td>
                  <td style={{ padding: "12px", textTransform: "capitalize", fontSize: "13px" }}>{lead.interest}</td>
                  <td style={{ padding: "12px" }}>
                    <span style={{ padding: "4px 8px", borderRadius: "12px", fontSize: "11px", background: lead.status === "new" ? "#fef3c7" : "#dbeafe", color: lead.status === "new" ? "#d97706" : "#2563eb" }}>
                      {lead.status}
                    </span>
                  </td>
                  <td style={{ padding: "12px", fontSize: "13px", color: "#6b7280" }}>{lead.assignedAgentId ? "Sophie Chen" : "Unassigned"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Quick Actions */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ background: "#fff", borderRadius: "12px", padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
            <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#1f2937", margin: "0 0 20px" }}>Quick Actions</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <Link href="/admin/agents" style={{ padding: "12px", background: "#2D4F3C", color: "#fff", borderRadius: "8px", textDecoration: "none", fontSize: "14px", fontWeight: 500, textAlign: "center" }}>Manage Agents</Link>
              <Link href="/admin/listings" style={{ padding: "12px", background: "#fff", color: "#1f2937", border: "1px solid #e5e7eb", borderRadius: "8px", textDecoration: "none", fontSize: "14px", fontWeight: 500, textAlign: "center" }}>View All Listings</Link>
              <Link href="/admin/reports" style={{ padding: "12px", background: "#fff", color: "#1f2937", border: "1px solid #e5e7eb", borderRadius: "8px", textDecoration: "none", fontSize: "14px", fontWeight: 500, textAlign: "center" }}>Generate Report</Link>
            </div>
          </div>

          <div style={{ background: "#fff", borderRadius: "12px", padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
            <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#1f2937", margin: "0 0 20px" }}>Platform Health</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "14px", color: "#6b7280" }}>Website Uptime</span>
                <span style={{ fontSize: "14px", fontWeight: 600, color: "#059669" }}>99.9%</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "14px", color: "#6b7280" }}>Active Users</span>
                <span style={{ fontSize: "14px", fontWeight: 600, color: "#1f2937" }}>156</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "14px", color: "#6b7280" }}>Open Tickets</span>
                <span style={{ fontSize: "14px", fontWeight: 600, color: "#d97706" }}>3</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <AdminLayout>
      <AdminDashboardContent />
    </AdminLayout>
  );
}