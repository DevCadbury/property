"use client";

import AgentLayout from "@/components/AgentLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { MOCK_LEADS, MOCK_APPOINTMENTS, MOCK_CONVERSATIONS, MOCK_AGENT_STATS } from "@/data/crm";
import Link from "next/link";
import { useState } from "react";

const salesforceTabs = [
  { id: "home", label: "Home", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { id: "leads", label: "Leads", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
  { id: "accounts", label: "Accounts", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
  { id: "opportunities", label: "Opportunities", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
  { id: "tasks", label: "Tasks", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" },
  { id: "reports", label: "Reports", icon: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
];

function AgentDashboardContent() {
  const stats = MOCK_AGENT_STATS["agent-001"] || { totalLeads: 0, newLeads: 0, conversionRate: 0, activeListings: 0, totalViews: 0, totalInquiries: 0 };
  const recentLeads = MOCK_LEADS.slice(0, 5);
  const upcomingAppointments = MOCK_APPOINTMENTS.filter(a => a.status === "scheduled").slice(0, 4);
  const [activeTab, setActiveTab] = useState("home");

  return (
    <AgentLayout>
      {/* Page Header with Salesforce-style tabs */}
      <div style={{ marginBottom: "24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <div>
            <h1 style={{ fontSize: "24px", fontWeight: 600, color: "#1f2937", margin: "0 0 4px" }}>Salesforce CRM</h1>
            <p style={{ color: "#6b7280", margin: 0, fontSize: "14px" }}>Welcome back, Sophie — here&apos;s your pipeline overview</p>
          </div>
          <div style={{ display: "flex", gap: "12px" }}>
            <button style={{ padding: "8px 16px", background: "#fff", border: "1px solid #e5e7eb", borderRadius: "6px", fontSize: "14px", color: "#374151", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              Search
            </button>
            <button style={{ padding: "8px 16px", background: "#2D4F3C", border: "none", borderRadius: "6px", fontSize: "14px", color: "#fff", fontWeight: 500, cursor: "pointer" }}>
              + New Lead
            </button>
          </div>
        </div>

        {/* Salesforce-style tab bar */}
        <div style={{ display: "flex", gap: "4px", background: "#f3f4f6", padding: "4px", borderRadius: "8px", width: "fit-content" }}>
          {salesforceTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: "8px 16px",
                border: "none",
                borderRadius: "6px",
                fontSize: "13px",
                fontWeight: 500,
                cursor: "pointer",
                background: activeTab === tab.id ? "#fff" : "transparent",
                color: activeTab === tab.id ? "#1f2937" : "#6b7280",
                boxShadow: activeTab === tab.id ? "0 1px 2px rgba(0,0,0,0.05)" : "none",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d={tab.icon} />
              </svg>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards - Salesforce Style */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "16px", marginBottom: "24px" }}>
        {[
          { label: "Total Pipeline", value: "$4.2M", change: "+12%", color: "#2D4F3C" },
          { label: "New Leads (This Month)", value: "24", change: "+5", color: "#1E4A5F" },
          { label: "Opportunities", value: "12", change: "3 closing", color: "#A67C52" },
          { label: "Win Rate", value: "32%", change: "+4%", color: "#059669" },
          { label: "Avg Deal Size", value: "$350K", change: "+$50K", color: "#7c3aed" },
          { label: "Tasks Due Today", value: "8", change: "2 overdue", color: "#dc2626" },
        ].map((kpi, i) => (
          <div key={i} style={{ background: "#fff", borderRadius: "8px", padding: "16px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", borderLeft: `4px solid ${kpi.color}` }}>
            <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "4px" }}>{kpi.label}</div>
            <div style={{ fontSize: "24px", fontWeight: 700, color: "#1f2937" }}>{kpi.value}</div>
            <div style={{ fontSize: "12px", color: kpi.change.includes("-") ? "#dc2626" : "#059669", marginTop: "4px" }}>{kpi.change}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px" }}>
        {/* Main Content Area */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Recent Leads Table */}
          <div style={{ background: "#fff", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", overflow: "hidden" }}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid #f3f4f6", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#1f2937", margin: 0 }}>Recent Leads</h3>
                <span style={{ background: "#fef3c7", color: "#d97706", fontSize: "11px", padding: "2px 8px", borderRadius: "10px" }}>5 new</span>
              </div>
              <Link href="/agent/leads" style={{ color: "#1E4A5F", fontSize: "13px", textDecoration: "none" }}>View All →</Link>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#f9fafb", borderBottom: "1px solid #e5e7eb" }}>
                  <th style={{ padding: "12px 20px", textAlign: "left", fontSize: "12px", fontWeight: 600, color: "#6b7280" }}>NAME</th>
                  <th style={{ padding: "12px", textAlign: "left", fontSize: "12px", fontWeight: 600, color: "#6b7280" }}>STATUS</th>
                  <th style={{ padding: "12px", textAlign: "left", fontSize: "12px", fontWeight: 600, color: "#6b7280" }}>SOURCE</th>
                  <th style={{ padding: "12px", textAlign: "left", fontSize: "12px", fontWeight: 600, color: "#6b7280" }}>CREATED</th>
                  <th style={{ padding: "12px", textAlign: "left", fontSize: "12px", fontWeight: 600, color: "#6b7280" }}>VALUE</th>
                </tr>
              </thead>
              <tbody>
                {recentLeads.map(lead => (
                  <tr key={lead.id} style={{ borderBottom: "1px solid #f3f4f6", cursor: "pointer" }}>
                    <td style={{ padding: "12px 20px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#e5e7eb", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 600, color: "#6b7280" }}>
                          {lead.firstName[0]}{lead.lastName[0]}
                        </div>
                        <div>
                          <div style={{ fontWeight: 500, color: "#1f2937", fontSize: "14px" }}>{lead.firstName} {lead.lastName}</div>
                          <div style={{ fontSize: "12px", color: "#6b7280" }}>{lead.email}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "12px" }}>
                      <span style={{ 
                        display: "inline-block", 
                        padding: "4px 10px", 
                        borderRadius: "12px", 
                        fontSize: "11px", 
                        fontWeight: 500,
                        background: lead.status === "new" ? "#fef3c7" : lead.status === "qualified" ? "#d1fae5" : "#e5e7eb",
                        color: lead.status === "new" ? "#d97706" : lead.status === "qualified" ? "#065f46" : "#4b5563"
                      }}>
                        {lead.status.replace("_", " ")}
                      </span>
                    </td>
                    <td style={{ padding: "12px", fontSize: "13px", color: "#4b5563" }}>{lead.source.replace("_", " ")}</td>
                    <td style={{ padding: "12px", fontSize: "13px", color: "#6b7280" }}>{new Date(lead.createdAt).toLocaleDateString()}</td>
                    <td style={{ padding: "12px", fontSize: "14px", fontWeight: 600, color: "#1f2937" }}>{lead.budget || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pipeline Visualization */}
          <div style={{ background: "#fff", borderRadius: "8px", padding: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#1f2937", margin: "0 0 20px" }}>Pipeline Stages</h3>
            <div style={{ display: "flex", gap: "16px", alignItems: "flex-end", height: "180px" }}>
              {[
                { stage: "New", count: 5, value: "$850K", color: "#3b82f6" },
                { stage: "Contacted", count: 8, value: "$1.2M", color: "#f59e0b" },
                { stage: "Qualified", count: 4, value: "$900K", color: "#8b5cf6" },
                { stage: "Negotiating", count: 3, value: "$650K", color: "#ec4899" },
                { stage: "Closed", count: 4, value: "$580K", color: "#10b981" },
              ].map((stage, i) => (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ width: "100%", background: "#f3f4f6", borderRadius: "8px 8px 0 0", height: `${(stage.count / 10) * 160}px`, position: "relative" }}>
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: stage.color, borderRadius: "8px 8px 0 0", height: `${(stage.count / 10) * 160}px`, opacity: 0.8 }}>
                      <div style={{ position: "absolute", bottom: "8px", left: "50%", transform: "translateX(-50%)", color: "#fff", fontSize: "12px", fontWeight: 600 }}>{stage.count}</div>
                    </div>
                  </div>
                  <div style={{ padding: "12px 8px", background: "#fff", border: "1px solid #e5e7eb", borderTop: "none", borderRadius: "0 0 8px 8px", width: "100%", textAlign: "center" }}>
                    <div style={{ fontSize: "13px", fontWeight: 600, color: "#1f2937" }}>{stage.stage}</div>
                    <div style={{ fontSize: "11px", color: "#6b7280" }}>{stage.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Upcoming Activities */}
          <div style={{ background: "#fff", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid #f3f4f6" }}>
              <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#1f2937", margin: 0 }}>Upcoming Activities</h3>
            </div>
            <div style={{ padding: "12px" }}>
              {upcomingAppointments.map((apt, i) => (
                <div key={i} style={{ padding: "12px", background: i === 0 ? "#fefce8" : "#f9fafb", borderRadius: "6px", marginBottom: "8px", borderLeft: "3px solid #2D4F3C" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                    <span style={{ fontWeight: 500, color: "#1f2937", fontSize: "13px" }}>{apt.title}</span>
                    <span style={{ fontSize: "11px", color: "#6b7280" }}>{apt.time}</span>
                  </div>
                  <div style={{ fontSize: "12px", color: "#6b7280" }}>{apt.leadName || apt.propertyTitle}</div>
                </div>
              ))}
            </div>
            <div style={{ padding: "12px 20px", borderTop: "1px solid #f3f4f6" }}>
              <Link href="/agent/calendar" style={{ color: "#1E4A5F", fontSize: "13px", textDecoration: "none" }}>View Calendar →</Link>
            </div>
          </div>

          {/* Messages */}
          <div style={{ background: "#fff", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid #f3f4f6", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#1f2937", margin: 0 }}>Recent Messages</h3>
              <span style={{ background: "#fee2e2", color: "#dc2626", fontSize: "11px", padding: "2px 8px", borderRadius: "10px" }}>{MOCK_CONVERSATIONS.reduce((a, c) => a + c.unread, 0)}</span>
            </div>
            <div style={{ padding: "12px" }}>
              {MOCK_CONVERSATIONS.map((conv, i) => (
                <div key={i} style={{ padding: "12px", borderBottom: i < MOCK_CONVERSATIONS.length - 1 ? "1px solid #f3f4f6" : "none", cursor: "pointer" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                    <span style={{ fontWeight: 500, color: "#1f2937", fontSize: "13px" }}>{conv.leadName}</span>
                    {conv.unread > 0 && <span style={{ background: "#dc2626", color: "#fff", fontSize: "10px", padding: "2px 6px", borderRadius: "8px" }}>{conv.unread}</span>}
                  </div>
                  <p style={{ fontSize: "12px", color: "#6b7280", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{conv.lastMessage}</p>
                </div>
              ))}
            </div>
            <div style={{ padding: "12px 20px", borderTop: "1px solid #f3f4f6" }}>
              <Link href="/agent/messages" style={{ color: "#1E4A5F", fontSize: "13px", textDecoration: "none" }}>View All Messages →</Link>
            </div>
          </div>

          {/* Quick Actions */}
          <div style={{ background: "#fff", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", padding: "16px" }}>
            <h3 style={{ fontSize: "14px", fontWeight: 600, color: "#1f2937", margin: "0 0 16px" }}>Quick Actions</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <button style={{ padding: "10px 12px", background: "#2D4F3C", color: "#fff", border: "none", borderRadius: "6px", fontSize: "13px", fontWeight: 500, cursor: "pointer", textAlign: "left" }}>+ Create New Lead</button>
              <button style={{ padding: "10px 12px", background: "#fff", color: "#1f2937", border: "1px solid #e5e7eb", borderRadius: "6px", fontSize: "13px", fontWeight: 500, cursor: "pointer", textAlign: "left" }}>📅 Log Call</button>
              <button style={{ padding: "10px 12px", background: "#fff", color: "#1f2937", border: "1px solid #e5e7eb", borderRadius: "6px", fontSize: "13px", fontWeight: 500, cursor: "pointer", textAlign: "left" }}>📧 Send Email</button>
              <button style={{ padding: "10px 12px", background: "#fff", color: "#1f2937", border: "1px solid #e5e7eb", borderRadius: "6px", fontSize: "13px", fontWeight: 500, cursor: "pointer", textAlign: "left" }}>🏠 Schedule Showing</button>
            </div>
          </div>
        </div>
      </div>
    </AgentLayout>
  );
}

export default function AgentDashboardPage() {
  return (
    <ProtectedRoute allowedRoles={["agent", "admin"]}>
      <AgentDashboardContent />
    </ProtectedRoute>
  );
}