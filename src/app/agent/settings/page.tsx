"use client";

import AgentLayout from "@/components/AgentLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

function AgentSettingsContent() {
  const { user, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    bio: "Dedicated real estate professional with 10+ years of experience in the Vancouver market. Specializing in luxury properties and waterfront homes.",
    specialties: "Luxury Homes, Waterfront, Condos, Investment Properties",
    areas: "Vancouver, West Vancouver, North Vancouver, Richmond",
    instagram: "@sophiechen_realtor",
    linkedin: "linkedin.com/in/sophiechen",
    notifications: {
      email: true,
      sms: true,
      newLeads: true,
      messages: true,
      appointments: true,
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleToggle = (key: string) => {
    setFormData({
      ...formData,
      notifications: { ...formData.notifications, [key]: !formData.notifications[key as keyof typeof formData.notifications] },
    });
  };

  return (
    <AgentLayout>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: 600, color: "#1f2937", margin: "0 0 8px" }}>Settings</h1>
        <p style={{ color: "#6b7280", margin: 0 }}>Manage your profile and preferences</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "24px" }}>
        {/* Main Settings */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Profile Info */}
          <div style={{ background: "#fff", borderRadius: "12px", padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
            <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#1f2937", margin: "0 0 20px" }}>Profile Information</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              <div>
                <label style={{ display: "block", fontSize: "14px", fontWeight: 500, color: "#374151", marginBottom: "8px" }}>First Name</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} style={{ width: "100%", padding: "10px 14px", border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "14px" }} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "14px", fontWeight: 500, color: "#374151", marginBottom: "8px" }}>Last Name</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} style={{ width: "100%", padding: "10px 14px", border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "14px" }} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "14px", fontWeight: 500, color: "#374151", marginBottom: "8px" }}>Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} style={{ width: "100%", padding: "10px 14px", border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "14px" }} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "14px", fontWeight: 500, color: "#374151", marginBottom: "8px" }}>Phone</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} style={{ width: "100%", padding: "10px 14px", border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "14px" }} />
              </div>
              <div style={{ gridColumn: "span 2" }}>
                <label style={{ display: "block", fontSize: "14px", fontWeight: 500, color: "#374151", marginBottom: "8px" }}>Bio</label>
                <textarea name="bio" value={formData.bio} onChange={handleChange} rows={4} style={{ width: "100%", padding: "10px 14px", border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "14px", resize: "vertical" }} />
              </div>
            </div>
          </div>

          {/* Professional Info */}
          <div style={{ background: "#fff", borderRadius: "12px", padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
            <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#1f2937", margin: "0 0 20px" }}>Professional Details</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div>
                <label style={{ display: "block", fontSize: "14px", fontWeight: 500, color: "#374151", marginBottom: "8px" }}>Specialties</label>
                <input type="text" name="specialties" value={formData.specialties} onChange={handleChange} style={{ width: "100%", padding: "10px 14px", border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "14px" }} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "14px", fontWeight: 500, color: "#374151", marginBottom: "8px" }}>Service Areas</label>
                <input type="text" name="areas" value={formData.areas} onChange={handleChange} style={{ width: "100%", padding: "10px 14px", border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "14px" }} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: 500, color: "#374151", marginBottom: "8px" }}>Instagram</label>
                  <input type="text" name="instagram" value={formData.instagram} onChange={handleChange} style={{ width: "100%", padding: "10px 14px", border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "14px" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: 500, color: "#374151", marginBottom: "8px" }}>LinkedIn</label>
                  <input type="text" name="linkedin" value={formData.linkedin} onChange={handleChange} style={{ width: "100%", padding: "10px 14px", border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "14px" }} />
                </div>
              </div>
            </div>
          </div>

          {/* Notification Preferences */}
          <div style={{ background: "#fff", borderRadius: "12px", padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
            <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#1f2937", margin: "0 0 20px" }}>Notification Preferences</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {[
                { key: "email", label: "Email notifications", desc: "Receive updates via email" },
                { key: "sms", label: "SMS notifications", desc: "Get text messages for urgent items" },
                { key: "newLeads", label: "New leads", desc: "Alert when new leads are assigned" },
                { key: "messages", label: "Messages", desc: "Notify on new messages" },
                { key: "appointments", label: "Appointments", desc: "Reminder for upcoming appointments" },
              ].map(item => (
                <div key={item.key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px", background: "#f9fafb", borderRadius: "8px" }}>
                  <div>
                    <div style={{ fontWeight: 500, color: "#1f2937", fontSize: "14px" }}>{item.label}</div>
                    <div style={{ fontSize: "13px", color: "#6b7280" }}>{item.desc}</div>
                  </div>
                  <button
                    onClick={() => handleToggle(item.key)}
                    style={{ width: "48px", height: "26px", borderRadius: "13px", border: "none", cursor: "pointer", background: formData.notifications[item.key as keyof typeof formData.notifications] ? "#2D4F3C" : "#e5e7eb", position: "relative", transition: "background 0.2s" }}
                  >
                    <span style={{ position: "absolute", top: "3px", left: formData.notifications[item.key as keyof typeof formData.notifications] ? "25px" : "3px", width: "20px", height: "20px", borderRadius: "50%", background: "#fff", transition: "left 0.2s" }}></span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button style={{ padding: "14px 28px", background: "#2D4F3C", color: "#fff", border: "none", borderRadius: "8px", fontSize: "15px", fontWeight: 500, cursor: "pointer", alignSelf: "flex-start" }}>
            Save Changes
          </button>
        </div>

        {/* Sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Profile Photo */}
          <div style={{ background: "#fff", borderRadius: "12px", padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", textAlign: "center" }}>
            <img src={user?.avatar || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80"} alt="" style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover", marginBottom: "16px" }} />
            <button style={{ padding: "10px 20px", background: "#fff", color: "#2D4F3C", border: "1px solid #2D4F3C", borderRadius: "8px", fontSize: "14px", cursor: "pointer" }}>Change Photo</button>
          </div>

          {/* Quick Stats */}
          <div style={{ background: "#fff", borderRadius: "12px", padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
            <h4 style={{ fontSize: "16px", fontWeight: 600, color: "#1f2937", margin: "0 0 16px" }}>Account Stats</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: "14px", color: "#6b7280" }}>Member since</span>
                <span style={{ fontSize: "14px", fontWeight: 500, color: "#1f2937" }}>Jan 2020</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: "14px", color: "#6b7280" }}>Total leads</span>
                <span style={{ fontSize: "14px", fontWeight: 500, color: "#1f2937" }}>24</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: "14px", color: "#6b7280" }}>Closed deals</span>
                <span style={{ fontSize: "14px", fontWeight: 500, color: "#1f2937" }}>15</span>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div style={{ background: "#fff", borderRadius: "12px", padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", border: "1px solid #fee2e2" }}>
            <h4 style={{ fontSize: "16px", fontWeight: 600, color: "#dc2626", margin: "0 0 16px" }}>Danger Zone</h4>
            <button style={{ width: "100%", padding: "10px", background: "#fff", color: "#dc2626", border: "1px solid #dc2626", borderRadius: "8px", fontSize: "14px", cursor: "pointer" }}>Deactivate Account</button>
          </div>
        </div>
      </div>
    </AgentLayout>
  );
}

export default function AgentSettingsPage() {
  return (
    <ProtectedRoute allowedRoles={["agent", "admin"]}>
      <AgentSettingsContent />
    </ProtectedRoute>
  );
}