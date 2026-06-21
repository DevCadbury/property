"use client";

import AgentLayout from "@/components/AgentLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useCRM } from "@/context/CRMContext";
import { useState } from "react";
import Link from "next/link";

const statusColors: Record<string, { bg: string; text: string }> = {
  new: { bg: "#fef3c7", text: "#d97706" },
  contacted: { bg: "#dbeafe", text: "#2563eb" },
  qualified: { bg: "#ecfdf5", text: "#059669" },
  negotiating: { bg: "#fce7f3", text: "#db2777" },
  closed_won: { bg: "#d1fae5", text: "#065f46" },
  closed_lost: { bg: "#f3f4f6", text: "#6b7280" },
};

const sourceLabels: Record<string, string> = {
  website: "Website",
  valuation_form: "Valuation Form",
  contact_page: "Contact Page",
  listing_inquiry: "Listing Inquiry",
  referral: "Referral",
  open_house: "Open House",
};

const statusOptions = ["new", "contacted", "qualified", "negotiating", "closed_won", "closed_lost"];
const sourceOptions = ["website", "valuation_form", "contact_page", "listing_inquiry", "referral", "open_house"];
const interestOptions = ["buy", "rent", "sell"];

function AgentLeadsContent() {
  const { leads, addLead, updateLead, deleteLead } = useCRM();
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLead, setSelectedLead] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteText, setNoteText] = useState("");

  const filteredLeads = leads.filter(lead => {
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
    const matchesSearch = lead.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lead.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const selectedLeadData = leads.find(l => l.id === selectedLead);

  const handleAddLead = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    addLead({
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      status: formData.get("status") as any,
      source: formData.get("source") as any,
      interest: formData.get("interest") as any,
      propertyInterest: formData.get("propertyInterest") as string || undefined,
      budget: formData.get("budget") as string || undefined,
      notes: formData.get("notes") as string || "",
      tags: [],
      assignedAgentId: "agent-001",
    });
    setShowAddModal(false);
  };

  const handleStatusChange = (leadId: string, newStatus: string) => {
    updateLead(leadId, { status: newStatus as any });
  };

  const handleAddNote = () => {
    if (selectedLeadData && noteText.trim()) {
      const updatedNotes = selectedLeadData.notes + "\n" + new Date().toLocaleDateString() + ": " + noteText;
      updateLead(selectedLeadData.id, { notes: updatedNotes });
      setNoteText("");
      setShowNoteModal(false);
    }
  };

  return (
    <AgentLayout>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: 600, color: "#1f2937", margin: "0 0 8px" }}>Leads</h1>
          <p style={{ color: "#6b7280", margin: 0, fontSize: "14px" }}>Manage your leads and track their progress • {leads.length} total</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          style={{ padding: "10px 20px", background: "#2D4F3C", color: "#fff", border: "none", borderRadius: "8px", fontSize: "14px", fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14" /></svg>
          Add New Lead
        </button>
      </div>

      {/* Stats Bar */}
      <div style={{ display: "flex", gap: "16px", marginBottom: "24px", padding: "16px", background: "#fff", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
        {statusOptions.map(status => {
          const count = leads.filter(l => l.status === status).length;
          return (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              style={{ 
                padding: "8px 16px", 
                border: "none", 
                borderRadius: "6px", 
                fontSize: "13px", 
                cursor: "pointer",
                background: statusFilter === status ? "#2D4F3C" : "#f3f4f6",
                color: statusFilter === status ? "#fff" : "#6b7280",
              }}
            >
              {status.replace("_", " ")} ({count})
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
          All ({leads.length})
        </button>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: "16px", marginBottom: "24px" }}>
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ flex: 1, padding: "12px 16px", border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "14px" }}
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: selectedLead ? "1fr 420px" : "1fr", gap: "24px" }}>
        {/* Leads Table */}
        <div style={{ background: "#fff", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f9fafb", borderBottom: "1px solid #e5e7eb" }}>
                <th style={{ padding: "14px 16px", textAlign: "left", fontSize: "12px", fontWeight: 600, color: "#6b7280" }}>NAME</th>
                <th style={{ padding: "14px", textAlign: "left", fontSize: "12px", fontWeight: 600, color: "#6b7280" }}>CONTACT</th>
                <th style={{ padding: "14px", textAlign: "left", fontSize: "12px", fontWeight: 600, color: "#6b7280" }}>INTEREST</th>
                <th style={{ padding: "14px", textAlign: "left", fontSize: "12px", fontWeight: 600, color: "#6b7280" }}>STATUS</th>
                <th style={{ padding: "14px", textAlign: "left", fontSize: "12px", fontWeight: 600, color: "#6b7280" }}>SOURCE</th>
                <th style={{ padding: "14px", textAlign: "left", fontSize: "12px", fontWeight: 600, color: "#6b7280" }}>CREATED</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map(lead => (
                <tr
                  key={lead.id}
                  onClick={() => setSelectedLead(lead.id)}
                  style={{ cursor: "pointer", background: selectedLead === lead.id ? "#f0fdf4" : "#fff", borderBottom: "1px solid #f3f4f6" }}
                >
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#e5e7eb", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: 600, color: "#6b7280" }}>
                        {lead.firstName[0]}{lead.lastName[0]}
                      </div>
                      <div>
                        <div style={{ fontWeight: 500, color: "#1f2937", fontSize: "14px" }}>{lead.firstName} {lead.lastName}</div>
                        <div style={{ fontSize: "12px", color: "#6b7280" }}>{lead.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "14px", fontSize: "13px", color: "#4b5563" }}>{lead.phone}</td>
                  <td style={{ padding: "14px", textTransform: "capitalize", fontSize: "13px", color: "#4b5563" }}>{lead.interest}</td>
                  <td style={{ padding: "14px" }}>
                    <select
                      value={lead.status}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                      style={{ padding: "6px 10px", borderRadius: "6px", fontSize: "12px", border: "none", background: statusColors[lead.status].bg, color: statusColors[lead.status].text, fontWeight: 500, cursor: "pointer" }}
                    >
                      {statusOptions.map(s => <option key={s} value={s}>{s.replace("_", " ")}</option>)}
                    </select>
                  </td>
                  <td style={{ padding: "14px", fontSize: "13px", color: "#4b5563" }}>{sourceLabels[lead.source]}</td>
                  <td style={{ padding: "14px", fontSize: "13px", color: "#6b7280" }}>
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredLeads.length === 0 && (
            <div style={{ padding: "40px", textAlign: "center", color: "#6b7280" }}>
              No leads found matching your criteria
            </div>
          )}
        </div>

        {/* Lead Detail Panel */}
        {selectedLeadData && (
          <div style={{ background: "#fff", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", height: "fit-content", position: "sticky", top: "100px" }}>
            <div style={{ padding: "20px", borderBottom: "1px solid #f3f4f6", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <h3 style={{ fontSize: "20px", fontWeight: 600, color: "#1f2937", margin: "0 0 8px" }}>
                  {selectedLeadData.firstName} {selectedLeadData.lastName}
                </h3>
                <span style={{ display: "inline-block", padding: "4px 10px", borderRadius: "12px", fontSize: "12px", background: statusColors[selectedLeadData.status].bg, color: statusColors[selectedLeadData.status].text }}>
                  {selectedLeadData.status.replace("_", " ")}
                </span>
              </div>
              <button onClick={() => setSelectedLead(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "#6b7280", fontSize: "18px" }}>✕</button>
            </div>

            <div style={{ padding: "20px" }}>
              {/* Contact Info */}
              <div style={{ marginBottom: "20px" }}>
                <label style={{ fontSize: "11px", fontWeight: 600, color: "#6b7280", display: "block", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Contact Information</label>
                <div style={{ fontSize: "14px", color: "#1f2937", marginBottom: "4px" }}>{selectedLeadData.email}</div>
                <div style={{ fontSize: "14px", color: "#1f2937" }}>{selectedLeadData.phone}</div>
              </div>

              {/* Interest */}
              <div style={{ marginBottom: "20px" }}>
                <label style={{ fontSize: "11px", fontWeight: 600, color: "#6b7280", display: "block", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Interest</label>
                <div style={{ fontSize: "14px", color: "#1f2937", textTransform: "capitalize" }}>{selectedLeadData.interest}</div>
                {selectedLeadData.propertyInterest && <div style={{ fontSize: "13px", color: "#6b7280", marginTop: "4px" }}>Property: {selectedLeadData.propertyInterest}</div>}
                {selectedLeadData.budget && <div style={{ fontSize: "13px", color: "#6b7280" }}>Budget: {selectedLeadData.budget}</div>}
              </div>

              {/* Source */}
              <div style={{ marginBottom: "20px" }}>
                <label style={{ fontSize: "11px", fontWeight: 600, color: "#6b7280", display: "block", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Source</label>
                <div style={{ fontSize: "14px", color: "#1f2937" }}>{sourceLabels[selectedLeadData.source]}</div>
              </div>

              {/* Notes */}
              <div style={{ marginBottom: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                  <label style={{ fontSize: "11px", fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.5px" }}>Notes</label>
                  <button onClick={() => setShowNoteModal(true)} style={{ fontSize: "12px", color: "#1E4A5F", background: "none", border: "none", cursor: "pointer" }}>+ Add Note</button>
                </div>
                <div style={{ fontSize: "13px", color: "#4b5563", whiteSpace: "pre-wrap", background: "#f9fafb", padding: "12px", borderRadius: "6px" }}>
                  {selectedLeadData.notes || "No notes yet"}
                </div>
              </div>

              {/* Tags */}
              {selectedLeadData.tags.length > 0 && (
                <div style={{ marginBottom: "20px" }}>
                  <label style={{ fontSize: "11px", fontWeight: 600, color: "#6b7280", display: "block", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Tags</label>
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    {selectedLeadData.tags.map(tag => (
                      <span key={tag} style={{ padding: "4px 10px", background: "#f3f4f6", borderRadius: "12px", fontSize: "12px", color: "#4b5563" }}>{tag}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
                <button style={{ flex: 1, padding: "12px", background: "#2D4F3C", color: "#fff", border: "none", borderRadius: "8px", fontSize: "14px", fontWeight: 500, cursor: "pointer" }}>📞 Call</button>
                <button style={{ flex: 1, padding: "12px", background: "#fff", color: "#1f2937", border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "14px", fontWeight: 500, cursor: "pointer" }}>✉️ Email</button>
                <button 
                  onClick={() => { if (confirm("Delete this lead?")) deleteLead(selectedLeadData.id); setSelectedLead(null); }}
                  style={{ flex: 1, padding: "12px", background: "#fff", color: "#dc2626", border: "1px solid #fecaca", borderRadius: "8px", fontSize: "14px", fontWeight: 500, cursor: "pointer" }}
                >🗑️</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Lead Modal */}
      {showAddModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ background: "#fff", borderRadius: "12px", padding: "24px", width: "500px", maxHeight: "90vh", overflow: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h2 style={{ fontSize: "20px", fontWeight: 600, margin: 0 }}>Add New Lead</h2>
              <button onClick={() => setShowAddModal(false)} style={{ background: "none", border: "none", fontSize: "24px", cursor: "pointer", color: "#6b7280" }}>✕</button>
            </div>
            <form onSubmit={handleAddLead}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                <input name="firstName" placeholder="First Name" required style={{ padding: "12px", border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "14px" }} />
                <input name="lastName" placeholder="Last Name" required style={{ padding: "12px", border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "14px" }} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                <input name="email" type="email" placeholder="Email" required style={{ padding: "12px", border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "14px" }} />
                <input name="phone" placeholder="Phone" required style={{ padding: "12px", border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "14px" }} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                <select name="interest" required style={{ padding: "12px", border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "14px" }}>
                  {interestOptions.map(o => <option key={o} value={o}>{o.charAt(0).toUpperCase() + o.slice(1)}</option>)}
                </select>
                <select name="status" required style={{ padding: "12px", border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "14px" }}>
                  {statusOptions.map(o => <option key={o} value={o}>{o.replace("_", " ")}</option>)}
                </select>
                <select name="source" required style={{ padding: "12px", border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "14px" }}>
                  {sourceOptions.map(o => <option key={o} value={o}>{sourceLabels[o]}</option>)}
                </select>
              </div>
              <input name="propertyInterest" placeholder="Property Interest (optional)" style={{ width: "100%", padding: "12px", border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "14px", marginBottom: "16px" }} />
              <input name="budget" placeholder="Budget (e.g. $500K - $1M)" style={{ width: "100%", padding: "12px", border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "14px", marginBottom: "16px" }} />
              <textarea name="notes" placeholder="Notes..." rows={3} style={{ width: "100%", padding: "12px", border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "14px", marginBottom: "20px" }} />
              <button type="submit" style={{ width: "100%", padding: "14px", background: "#2D4F3C", color: "#fff", border: "none", borderRadius: "8px", fontSize: "15px", fontWeight: 500, cursor: "pointer" }}>Create Lead</button>
            </form>
          </div>
        </div>
      )}

      {/* Add Note Modal */}
      {showNoteModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ background: "#fff", borderRadius: "12px", padding: "24px", width: "400px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: 600, margin: "0 0 16px" }}>Add Note</h3>
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Enter your note..."
              rows={4}
              style={{ width: "100%", padding: "12px", border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "14px", marginBottom: "16px" }}
            />
            <div style={{ display: "flex", gap: "12px" }}>
              <button onClick={() => setShowNoteModal(false)} style={{ flex: 1, padding: "12px", background: "#fff", color: "#1f2937", border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "14px", cursor: "pointer" }}>Cancel</button>
              <button onClick={handleAddNote} style={{ flex: 1, padding: "12px", background: "#2D4F3C", color: "#fff", border: "none", borderRadius: "8px", fontSize: "14px", fontWeight: 500, cursor: "pointer" }}>Save Note</button>
            </div>
          </div>
        </div>
      )}
    </AgentLayout>
  );
}

export default function AgentLeadsPage() {
  return (
    <ProtectedRoute allowedRoles={["agent", "admin"]}>
      <AgentLeadsContent />
    </ProtectedRoute>
  );
}