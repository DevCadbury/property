"use client";

import AgentLayout from "@/components/AgentLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useCRM } from "@/context/CRMContext";
import { useState } from "react";

const typeColors: Record<string, string> = {
  viewing: "#2D4F3C",
  call: "#1E4A5F",
  meeting: "#A67C52",
  "open-house": "#7c3aed",
  task: "#059669",
};

const typeOptions = ["viewing", "call", "meeting", "open-house", "task"];

function AgentCalendarContent() {
  const { appointments, addAppointment, updateAppointment, deleteAppointment } = useCRM();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string>("all");

  const getDaysInWeek = () => {
    const start = new Date(currentDate);
    start.setDate(start.getDate() - start.getDay());
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      return d;
    });
  };

  const days = getDaysInWeek();
  const timeSlots = Array.from({ length: 12 }, (_, i) => i + 8);

  const filteredAppointments = filterType === "all" 
    ? appointments 
    : appointments.filter(a => a.type === filterType);

  const getAppointmentsForDay = (date: Date) => {
    return filteredAppointments.filter(apt => {
      const aptDate = new Date(apt.date);
      return aptDate.toDateString() === date.toDateString();
    });
  };

  const prevWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const nextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const handleAddEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    addAppointment({
      title: formData.get("title") as string,
      type: formData.get("type") as any,
      date: formData.get("date") as string,
      time: formData.get("time") as string,
      duration: parseInt(formData.get("duration") as string),
      leadName: formData.get("leadName") as string || undefined,
      propertyTitle: formData.get("propertyTitle") as string || undefined,
      location: formData.get("location") as string || undefined,
      notes: formData.get("notes") as string || undefined,
      status: "scheduled",
    });
    setShowAddEvent(false);
  };

  const selectedAppointment = appointments.find(a => a.id === selectedEvent);

  return (
    <AgentLayout>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: 600, color: "#1f2937", margin: "0 0 8px" }}>Calendar</h1>
          <p style={{ color: "#6b7280", margin: 0, fontSize: "14px" }}>{appointments.filter(a => a.status === "scheduled").length} upcoming appointments</p>
        </div>
        <button 
          onClick={() => setShowAddEvent(true)}
          style={{ padding: "10px 20px", background: "#2D4F3C", color: "#fff", border: "none", borderRadius: "8px", fontSize: "14px", fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14" /></svg>
          Add Event
        </button>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
        {["all", ...typeOptions].map(type => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            style={{
              padding: "6px 14px",
              border: "none",
              borderRadius: "6px",
              fontSize: "13px",
              cursor: "pointer",
              background: filterType === type ? "#2D4F3C" : "#f3f4f6",
              color: filterType === type ? "#fff" : "#6b7280",
            }}
          >
            {type === "all" ? "All" : type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Controls */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <button onClick={prevWeek} style={{ padding: "8px", background: "#fff", border: "1px solid #e5e7eb", borderRadius: "6px", cursor: "pointer" }}>
            <svg style={{ width: "20px", height: "20px", color: "#6b7280" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span style={{ fontSize: "18px", fontWeight: 600, color: "#1f2937" }}>
            {days[0].toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </span>
          <button onClick={nextWeek} style={{ padding: "8px", background: "#fff", border: "1px solid #e5e7eb", borderRadius: "6px", cursor: "pointer" }}>
            <svg style={{ width: "20px", height: "20px", color: "#6b7280" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <button onClick={() => setCurrentDate(new Date())} style={{ padding: "8px 16px", background: "#fff", border: "1px solid #e5e7eb", borderRadius: "6px", fontSize: "14px", cursor: "pointer" }}>Today</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "24px" }}>
        {/* Calendar Grid */}
        <div style={{ background: "#fff", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", overflow: "hidden" }}>
          {/* Header */}
          <div style={{ display: "grid", gridTemplateColumns: "60px repeat(7, 1fr)", borderBottom: "1px solid #e5e7eb", background: "#f9fafb" }}>
            <div style={{ padding: "16px", background: "#f9fafb" }}></div>
            {days.map((day, i) => {
              const isToday = day.toDateString() === new Date().toDateString();
              return (
                <div key={i} style={{ padding: "16px", textAlign: "center", borderLeft: "1px solid #f3f4f6" }}>
                  <div style={{ fontSize: "12px", color: "#6b7280" }}>{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][i]}</div>
                  <div style={{ 
                    fontSize: "20px", 
                    fontWeight: 600, 
                    marginTop: "4px",
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: isToday ? "#2D4F3C" : "transparent",
                    color: isToday ? "#fff" : "#1f2937",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>{day.getDate()}</div>
                </div>
              );
            })}
          </div>

          {/* Time Slots */}
          <div style={{ maxHeight: "500px", overflow: "auto" }}>
            {timeSlots.map(time => (
              <div key={time} style={{ display: "grid", gridTemplateColumns: "60px repeat(7, 1fr)", borderBottom: "1px solid #f3f4f6", minHeight: "60px" }}>
                <div style={{ padding: "8px 12px", fontSize: "12px", color: "#9ca3af", textAlign: "right", background: "#f9fafb" }}>
                  {time > 12 ? time - 12 : time} {time >= 12 ? "PM" : "AM"}
                </div>
                {days.map((day, dayIndex) => {
                  const dayAppointments = getAppointmentsForDay(day).filter(apt => {
                    const aptHour = parseInt(apt.time.split(":")[0]);
                    return aptHour === time;
                  });
                  return (
                    <div key={dayIndex} style={{ padding: "4px", borderLeft: "1px solid #f3f4f6", position: "relative" }}>
                      {dayAppointments.map(apt => (
                        <div
                          key={apt.id}
                          onClick={() => setSelectedEvent(apt.id)}
                          style={{ 
                            padding: "6px 8px", 
                            background: typeColors[apt.type], 
                            color: "#fff", 
                            borderRadius: "4px", 
                            fontSize: "11px", 
                            marginBottom: "4px", 
                            cursor: "pointer",
                            border: selectedEvent === apt.id ? "2px solid #1f2937" : "none",
                          }}
                        >
                          <div style={{ fontWeight: 500 }}>{apt.title}</div>
                          <div style={{ opacity: 0.8 }}>{apt.time}</div>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Event Details */}
          {selectedAppointment && (
            <div style={{ background: "#fff", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", padding: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#1f2937", margin: 0 }}>Event Details</h3>
                <button onClick={() => setSelectedEvent(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "#6b7280" }}>✕</button>
              </div>
              <div style={{ marginBottom: "12px" }}>
                <span style={{ display: "inline-block", padding: "4px 10px", background: typeColors[selectedAppointment.type], color: "#fff", borderRadius: "12px", fontSize: "12px" }}>
                  {selectedAppointment.type}
                </span>
              </div>
              <h4 style={{ fontSize: "15px", fontWeight: 600, color: "#1f2937", margin: "0 0 8px" }}>{selectedAppointment.title}</h4>
              <div style={{ fontSize: "14px", color: "#6b7280", marginBottom: "4px" }}>
                📅 {new Date(selectedAppointment.date).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
              </div>
              <div style={{ fontSize: "14px", color: "#6b7280", marginBottom: "4px" }}>
                🕐 {selectedAppointment.time} ({selectedAppointment.duration} min)
              </div>
              {selectedAppointment.leadName && (
                <div style={{ fontSize: "14px", color: "#6b7280", marginBottom: "4px" }}>👤 {selectedAppointment.leadName}</div>
              )}
              {selectedAppointment.location && (
                <div style={{ fontSize: "14px", color: "#6b7280", marginBottom: "4px" }}>📍 {selectedAppointment.location}</div>
              )}
              {selectedAppointment.notes && (
                <div style={{ fontSize: "13px", color: "#4b5563", marginTop: "12px", padding: "12px", background: "#f9fafb", borderRadius: "6px" }}>
                  {selectedAppointment.notes}
                </div>
              )}
              <div style={{ display: "flex", gap: "8px", marginTop: "16px" }}>
                <button 
                  onClick={() => updateAppointment(selectedAppointment.id, { status: "completed" })}
                  style={{ flex: 1, padding: "10px", background: "#059669", color: "#fff", border: "none", borderRadius: "6px", fontSize: "13px", cursor: "pointer" }}
                >
                  ✓ Complete
                </button>
                <button 
                  onClick={() => { if (confirm("Cancel this event?")) { deleteAppointment(selectedAppointment.id); setSelectedEvent(null); } }}
                  style={{ flex: 1, padding: "10px", background: "#fff", color: "#dc2626", border: "1px solid #fecaca", borderRadius: "6px", fontSize: "13px", cursor: "pointer" }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Today's Schedule */}
          <div style={{ background: "#fff", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", padding: "20px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#1f2937", margin: "0 0 16px" }}>Today&apos;s Schedule</h3>
            {appointments.filter(a => {
              const today = new Date().toDateString();
              return new Date(a.date).toDateString() === today && a.status === "scheduled";
            }).length === 0 ? (
              <p style={{ fontSize: "14px", color: "#6b7280", textAlign: "center", padding: "20px" }}>No events today</p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {appointments.filter(a => {
                  const today = new Date().toDateString();
                  return new Date(a.date).toDateString() === today && a.status === "scheduled";
                }).map(apt => (
                  <div 
                    key={apt.id}
                    onClick={() => setSelectedEvent(apt.id)}
                    style={{ padding: "12px", background: "#f9fafb", borderRadius: "8px", borderLeft: `3px solid ${typeColors[apt.type]}`, cursor: "pointer" }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                      <span style={{ fontWeight: 500, color: "#1f2937", fontSize: "13px" }}>{apt.title}</span>
                      <span style={{ fontSize: "12px", color: "#6b7280" }}>{apt.time}</span>
                    </div>
                    <div style={{ fontSize: "12px", color: "#6b7280" }}>{apt.leadName || apt.propertyTitle}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* This Week Summary */}
          <div style={{ background: "#fff", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", padding: "20px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#1f2937", margin: "0 0 16px" }}>This Week</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {typeOptions.map(type => {
                const count = appointments.filter(a => {
                  const weekStart = new Date();
                  weekStart.setDate(weekStart.getDate() - weekStart.getDay());
                  const weekEnd = new Date(weekStart);
                  weekEnd.setDate(weekEnd.getDate() + 7);
                  const aptDate = new Date(a.date);
                  return a.type === type && aptDate >= weekStart && aptDate < weekEnd;
                }).length;
                return (
                  <div key={type} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div style={{ width: "12px", height: "12px", borderRadius: "3px", background: typeColors[type] }}></div>
                      <span style={{ fontSize: "13px", color: "#4b5563", textTransform: "capitalize" }}>{type}</span>
                    </div>
                    <span style={{ fontSize: "14px", fontWeight: 600, color: "#1f2937" }}>{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Add Event Modal */}
      {showAddEvent && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ background: "#fff", borderRadius: "12px", padding: "24px", width: "480px", maxHeight: "90vh", overflow: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h2 style={{ fontSize: "20px", fontWeight: 600, margin: 0 }}>Add New Event</h2>
              <button onClick={() => setShowAddEvent(false)} style={{ background: "none", border: "none", fontSize: "24px", cursor: "pointer", color: "#6b7280" }}>✕</button>
            </div>
            <form onSubmit={handleAddEvent}>
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "14px", fontWeight: 500, marginBottom: "8px" }}>Event Title *</label>
                <input name="title" required placeholder="e.g., Property Viewing - Client Name" style={{ width: "100%", padding: "12px", border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "14px" }} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: 500, marginBottom: "8px" }}>Type *</label>
                  <select name="type" required style={{ width: "100%", padding: "12px", border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "14px" }}>
                    {typeOptions.map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: 500, marginBottom: "8px" }}>Duration (min)</label>
                  <select name="duration" style={{ width: "100%", padding: "12px", border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "14px" }}>
                    <option value="15">15 min</option>
                    <option value="30">30 min</option>
                    <option value="60" selected>1 hour</option>
                    <option value="90">1.5 hours</option>
                    <option value="120">2 hours</option>
                  </select>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: 500, marginBottom: "8px" }}>Date *</label>
                  <input name="date" type="date" required defaultValue={new Date().toISOString().split('T')[0]} style={{ width: "100%", padding: "12px", border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "14px" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: 500, marginBottom: "8px" }}>Time *</label>
                  <input name="time" type="time" required defaultValue="10:00" style={{ width: "100%", padding: "12px", border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "14px" }} />
                </div>
              </div>
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "14px", fontWeight: 500, marginBottom: "8px" }}>Lead Name</label>
                <input name="leadName" placeholder="Optional" style={{ width: "100%", padding: "12px", border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "14px" }} />
              </div>
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "14px", fontWeight: 500, marginBottom: "8px" }}>Property</label>
                <input name="propertyTitle" placeholder="Optional" style={{ width: "100%", padding: "12px", border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "14px" }} />
              </div>
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "14px", fontWeight: 500, marginBottom: "8px" }}>Location</label>
                <input name="location" placeholder="Optional" style={{ width: "100%", padding: "12px", border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "14px" }} />
              </div>
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontSize: "14px", fontWeight: 500, marginBottom: "8px" }}>Notes</label>
                <textarea name="notes" rows={3} placeholder="Optional" style={{ width: "100%", padding: "12px", border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "14px" }} />
              </div>
              <button type="submit" style={{ width: "100%", padding: "14px", background: "#2D4F3C", color: "#fff", border: "none", borderRadius: "8px", fontSize: "15px", fontWeight: 500, cursor: "pointer" }}>Create Event</button>
            </form>
          </div>
        </div>
      )}
    </AgentLayout>
  );
}

export default function AgentCalendarPage() {
  return (
    <ProtectedRoute allowedRoles={["agent", "admin"]}>
      <AgentCalendarContent />
    </ProtectedRoute>
  );
}