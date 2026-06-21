"use client";

import { useAuth } from "@/context/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

interface AgentLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { href: "/agent/dashboard", label: "Dashboard", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { href: "/agent/leads", label: "Leads", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a4 4 0 11-8 0 4 4 0 018 0zM17 20a2 2 0 100-4 2 2 0 000 4z" },
  { href: "/agent/listings", label: "Listings", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
  { href: "/agent/messages", label: "Messages", icon: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" },
  { href: "/agent/calendar", label: "Calendar", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
  { href: "/agent/analytics", label: "Analytics", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
  { href: "/agent/settings", label: "Settings", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" },
];

export default function AgentLayout({ children }: AgentLayoutProps) {
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
        {/* Logo */}
        <div style={{ padding: "20px", borderBottom: "1px solid #374151" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "36px", height: "36px", background: "#2D4F3C", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "18px" }}>P</div>
            {sidebarOpen && <span style={{ fontWeight: 600, fontSize: "18px" }}>Pacific Edge</span>}
          </div>
        </div>

        {/* Agent Info */}
        {sidebarOpen && user && (
          <div style={{ padding: "16px 20px", borderBottom: "1px solid #374151" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <img src={user.avatar || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&q=80"} alt="" style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover" }} />
              <div>
                <div style={{ fontWeight: 500, fontSize: "14px" }}>{user.firstName} {user.lastName}</div>
                <div style={{ fontSize: "12px", color: "#9ca3af" }}>Agent</div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav style={{ flex: 1, padding: "16px 12px", overflow: "auto" }}>
          {navItems.map(item => {
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
                  background: isActive ? "#2D4F3C" : "transparent",
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

        {/* Bottom Actions */}
        <div style={{ padding: "16px", borderTop: "1px solid #374151" }}>
          <button
            onClick={() => { logout(); window.location.href = "/"; }}
            style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", width: "100%", background: "transparent", border: "none", color: "#9ca3af", cursor: "pointer", fontSize: "14px", borderRadius: "8px" }}
          >
            <svg style={{ width: "20px", height: "20px" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            {sidebarOpen && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, marginLeft: sidebarOpen ? "260px" : "72px", transition: "margin-left 0.2s" }}>
        {/* Top Bar */}
        <header style={{ background: "#fff", padding: "16px 32px", borderBottom: "1px solid #e5e5e5", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: "8px" }}
          >
            <svg style={{ width: "24px", height: "24px", color: "#6b7280" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Link href="/" style={{ color: "#6b7280", fontSize: "14px", textDecoration: "none" }}>View Website</Link>
            <div style={{ position: "relative" }}>
              <svg style={{ width: "20px", height: "20px", color: "#6b7280" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span style={{ position: "absolute", top: "-4px", right: "-4px", width: "16px", height: "16px", background: "#dc2626", borderRadius: "50%", fontSize: "10px", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>3</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div style={{ padding: "32px" }}>
          {children}
        </div>
      </main>
    </div>
  );
}