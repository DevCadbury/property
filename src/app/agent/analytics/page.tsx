"use client";

import AgentLayout from "@/components/AgentLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { MOCK_AGENT_STATS, MOCK_LEADS } from "@/data/crm";

const chartData = [
  { month: "Jan", leads: 4, deals: 1 },
  { month: "Feb", leads: 6, deals: 2 },
  { month: "Mar", leads: 8, deals: 3 },
  { month: "Apr", leads: 5, deals: 2 },
];

function AgentAnalyticsContent() {
  const stats = MOCK_AGENT_STATS["agent-001"] || { totalLeads: 0, newLeads: 0, conversionRate: 0, activeListings: 0, totalViews: 0, totalInquiries: 0 };

  const leadsBySource = MOCK_LEADS.reduce((acc, lead) => {
    acc[lead.source] = (acc[lead.source] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const sourceLabels: Record<string, string> = {
    website: "Website",
    valuation_form: "Valuation Form",
    contact_page: "Contact Page",
    listing_inquiry: "Listing Inquiry",
    referral: "Referral",
    open_house: "Open House",
  };

  return (
    <AgentLayout>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: 600, color: "#1f2937", margin: "0 0 8px" }}>Analytics</h1>
        <p style={{ color: "#6b7280", margin: 0 }}>Track your performance and metrics</p>
      </div>

      {/* Key Metrics */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", marginBottom: "32px" }}>
        <div style={{ background: "#fff", borderRadius: "12px", padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
          <div style={{ fontSize: "14px", color: "#6b7280", marginBottom: "8px" }}>Total Leads</div>
          <div style={{ fontSize: "36px", fontWeight: 700, color: "#1f2937" }}>{stats.totalLeads}</div>
          <div style={{ fontSize: "13px", color: "#059669", marginTop: "8px" }}>+12% from last month</div>
        </div>
        <div style={{ background: "#fff", borderRadius: "12px", padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
          <div style={{ fontSize: "14px", color: "#6b7280", marginBottom: "8px" }}>Conversion Rate</div>
          <div style={{ fontSize: "36px", fontWeight: 700, color: "#1f2937" }}>{stats.conversionRate}%</div>
          <div style={{ fontSize: "13px", color: "#059669", marginTop: "8px" }}>+3% from last month</div>
        </div>
        <div style={{ background: "#fff", borderRadius: "12px", padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
          <div style={{ fontSize: "14px", color: "#6b7280", marginBottom: "8px" }}>Active Listings</div>
          <div style={{ fontSize: "36px", fontWeight: 700, color: "#1f2937" }}>{stats.activeListings}</div>
          <div style={{ fontSize: "13px", color: "#6b7280", marginTop: "8px" }}>2 expiring soon</div>
        </div>
        <div style={{ background: "#fff", borderRadius: "12px", padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
          <div style={{ fontSize: "14px", color: "#6b7280", marginBottom: "8px" }}>Total Revenue</div>
          <div style={{ fontSize: "36px", fontWeight: 700, color: "#1f2937" }}>$2.4M</div>
          <div style={{ fontSize: "13px", color: "#059669", marginTop: "8px" }}>+18% from last month</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px" }}>
        {/* Leads Chart */}
        <div style={{ background: "#fff", borderRadius: "12px", padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
          <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#1f2937", margin: "0 0 20px" }}>Leads & Deals (2026)</h3>
          <div style={{ display: "flex", alignItems: "flex-end", gap: "32px", height: "200px", padding: "20px 0" }}>
            {chartData.map((item, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                <div style={{ width: "100%", display: "flex", gap: "8px", alignItems: "flex-end", height: "160px" }}>
                  <div style={{ flex: 1, background: "#2D4F3C", borderRadius: "4px 4px 0 0", height: `${(item.leads / 10) * 160}px` }}></div>
                  <div style={{ flex: 1, background: "#A67C52", borderRadius: "4px 4px 0 0", height: `${(item.deals / 5) * 160}px` }}></div>
                </div>
                <span style={{ fontSize: "13px", color: "#6b7280" }}>{item.month}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: "24px", marginTop: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "12px", height: "12px", background: "#2D4F3C", borderRadius: "2px" }}></div>
              <span style={{ fontSize: "13px", color: "#6b7280" }}>Leads</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "12px", height: "12px", background: "#A67C52", borderRadius: "2px" }}></div>
              <span style={{ fontSize: "13px", color: "#6b7280" }}>Deals</span>
            </div>
          </div>
        </div>

        {/* Leads by Source */}
        <div style={{ background: "#fff", borderRadius: "12px", padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
          <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#1f2937", margin: "0 0 20px" }}>Leads by Source</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {Object.entries(leadsBySource).map(([source, count]) => (
              <div key={source}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ fontSize: "14px", color: "#4b5563" }}>{sourceLabels[source]}</span>
                  <span style={{ fontSize: "14px", fontWeight: 600, color: "#1f2937" }}>{String(count)}</span>
                </div>
                <div style={{ width: "100%", height: "8px", background: "#f3f4f6", borderRadius: "4px", overflow: "hidden" }}>
                  <div style={{ width: `${(Number(count) / MOCK_LEADS.length) * 100}%`, height: "100%", background: "#2D4F3C", borderRadius: "4px" }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Table */}
      <div style={{ background: "#fff", borderRadius: "12px", padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", marginTop: "24px" }}>
        <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#1f2937", margin: "0 0 20px" }}>Listing Performance</h3>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
              <th style={{ padding: "12px", textAlign: "left", fontSize: "13px", fontWeight: 600, color: "#6b7280" }}>Listing</th>
              <th style={{ padding: "12px", textAlign: "left", fontSize: "13px", fontWeight: 600, color: "#6b7280" }}>Views</th>
              <th style={{ padding: "12px", textAlign: "left", fontSize: "13px", fontWeight: 600, color: "#6b7280" }}>Inquiries</th>
              <th style={{ padding: "12px", textAlign: "left", fontSize: "13px", fontWeight: 600, color: "#6b7280" }}>Showings</th>
              <th style={{ padding: "12px", textAlign: "left", fontSize: "13px", fontWeight: 600, color: "#6b7280" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_LEADS.slice(0, 5).map((lead, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #f3f4f6" }}>
                <td style={{ padding: "12px", fontSize: "14px", color: "#1f2937" }}>{lead.propertyInterest || "N/A"}</td>
                <td style={{ padding: "12px", fontSize: "14px", color: "#4b5563" }}>{Math.floor(Math.random() * 500) + 100}</td>
                <td style={{ padding: "12px", fontSize: "14px", color: "#4b5563" }}>{Math.floor(Math.random() * 20) + 5}</td>
                <td style={{ padding: "12px", fontSize: "14px", color: "#4b5563" }}>{Math.floor(Math.random() * 10) + 2}</td>
                <td style={{ padding: "12px" }}>
                  <span style={{ padding: "4px 10px", borderRadius: "12px", fontSize: "12px", background: "#ecfdf5", color: "#059669" }}>
                    Active
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AgentLayout>
  );
}

export default function AgentAnalyticsPage() {
  return (
    <ProtectedRoute allowedRoles={["agent", "admin"]}>
      <AgentAnalyticsContent />
    </ProtectedRoute>
  );
}