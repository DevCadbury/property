"use client";

import AgentLayout from "@/components/AgentLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useCRM } from "@/context/CRMContext";
import { useState, useRef, useEffect } from "react";

const quickReplies = [
  "Thank you for your interest! I'd be happy to schedule a viewing.",
  "Let me get you more details about this property.",
  "I can meet you this weekend. What time works best?",
  "I'll send you the floor plan and additional photos.",
  "Would you like to do a virtual tour?",
  "Let me check the availability for you.",
];

const templateResponses = [
  { label: "Schedule Viewing", template: "I'd love to show you this property. What days/times work best for you?" },
  { label: "Property Details", template: "Here's the information you requested about the property. Let me know if you have any questions!" },
  { label: "Follow Up", template: "Just following up on our previous conversation. Are you still interested in this property?" },
  { label: "Availability Check", template: "Let me check the property's availability and get back to you within the hour." },
];

function AgentMessagesContent() {
  const { conversations, messages, addMessage } = useCRM();
  const [selectedConv, setSelectedConv] = useState<string | null>(conversations[0]?.id || null);
  const [replyText, setReplyText] = useState("");
  const [showNewConv, setShowNewConv] = useState(false);
  const [newConvEmail, setNewConvEmail] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeConv = conversations.find(c => c.id === selectedConv);
  const convMessages = messages.filter(m => m.conversationId === selectedConv);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [convMessages]);

  const handleSend = () => {
    if (replyText.trim() && selectedConv) {
      addMessage(selectedConv, replyText, true);
      setReplyText("");
    }
  };

  const handleQuickReply = (text: string) => {
    setReplyText(text);
  };

  const totalUnread = conversations.reduce((a, c) => a + c.unread, 0);

  return (
    <AgentLayout>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: 600, color: "#1f2937", margin: "0 0 8px" }}>Messages</h1>
          <p style={{ color: "#6b7280", margin: 0, fontSize: "14px" }}>{conversations.length} conversations • {totalUnread} unread</p>
        </div>
        <button 
          onClick={() => setShowNewConv(true)}
          style={{ padding: "10px 20px", background: "#2D4F3C", color: "#fff", border: "none", borderRadius: "8px", fontSize: "14px", fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14" /></svg>
          New Conversation
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: "24px", height: "calc(100vh - 240px)" }}>
        {/* Conversations List */}
        <div style={{ background: "#fff", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "16px", borderBottom: "1px solid #f3f4f6" }}>
            <input
              type="text"
              placeholder="Search conversations..."
              style={{ width: "100%", padding: "10px 14px", border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "14px" }}
            />
          </div>
          <div style={{ flex: 1, overflow: "auto" }}>
            {conversations.map(conv => (
              <div
                key={conv.id}
                onClick={() => setSelectedConv(conv.id)}
                style={{ 
                  padding: "16px", 
                  borderBottom: "1px solid #f3f4f6", 
                  cursor: "pointer", 
                  background: selectedConv === conv.id ? "#f0fdf4" : "#fff",
                  borderLeft: conv.unread > 0 ? "3px solid #2D4F3C" : "3px solid transparent",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                  <span style={{ fontWeight: 500, color: "#1f2937", fontSize: "14px" }}>{conv.leadName}</span>
                  {conv.unread > 0 && (
                    <span style={{ background: "#dc2626", color: "#fff", fontSize: "11px", padding: "2px 8px", borderRadius: "10px", fontWeight: 500 }}>{conv.unread}</span>
                  )}
                </div>
                <p style={{ fontSize: "13px", color: "#6b7280", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{conv.lastMessage}</p>
                <span style={{ fontSize: "11px", color: "#9ca3af", marginTop: "6px", display: "block" }}>{new Date(conv.lastMessageAt).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Message Thread */}
        <div style={{ background: "#fff", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", display: "flex", flexDirection: "column" }}>
          {activeConv ? (
            <>
              {/* Header */}
              <div style={{ padding: "20px", borderBottom: "1px solid #f3f4f6", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#1f2937", margin: "0" }}>{activeConv.leadName}</h3>
                  <p style={{ fontSize: "13px", color: "#6b7280", margin: "4px 0 0" }}>Active conversation</p>
                </div>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button style={{ padding: "8px 12px", background: "#fff", border: "1px solid #e5e7eb", borderRadius: "6px", fontSize: "13px", cursor: "pointer" }}>📞</button>
                  <button style={{ padding: "8px 12px", background: "#fff", border: "1px solid #e5e7eb", borderRadius: "6px", fontSize: "13px", cursor: "pointer" }}>📹</button>
                  <button style={{ padding: "8px 12px", background: "#fff", border: "1px solid #e5e7eb", borderRadius: "6px", fontSize: "13px", cursor: "pointer" }}>⋮</button>
                </div>
              </div>

              {/* Messages */}
              <div style={{ flex: 1, padding: "20px", overflow: "auto", display: "flex", flexDirection: "column", gap: "16px" }}>
                {convMessages.map(msg => (
                  <div key={msg.id} style={{ display: "flex", flexDirection: "column", alignItems: msg.isFromAgent ? "flex-end" : "flex-start" }}>
                    <div style={{ maxWidth: "70%", padding: "12px 16px", borderRadius: "12px", background: msg.isFromAgent ? "#2D4F3C" : "#f3f4f6", color: msg.isFromAgent ? "#fff" : "#1f2937" }}>
                      {msg.content}
                    </div>
                    <span style={{ fontSize: "11px", color: "#9ca3af", marginTop: "4px" }}>
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Replies */}
              <div style={{ padding: "12px 20px", borderTop: "1px solid #f3f4f6", background: "#f9fafb" }}>
                <div style={{ fontSize: "11px", color: "#6b7280", marginBottom: "8px" }}>Quick replies:</div>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {quickReplies.slice(0, 4).map((reply, i) => (
                    <button
                      key={i}
                      onClick={() => handleQuickReply(reply)}
                      style={{ padding: "6px 12px", background: "#fff", border: "1px solid #e5e7eb", borderRadius: "16px", fontSize: "12px", color: "#4b5563", cursor: "pointer", maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                    >
                      {reply.slice(0, 25)}...
                    </button>
                  ))}
                </div>
              </div>

              {/* Reply Input */}
              <div style={{ padding: "20px", borderTop: "1px solid #f3f4f6", display: "flex", gap: "12px" }}>
                <button style={{ padding: "12px", background: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px", cursor: "pointer" }}>📎</button>
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Type your message..."
                  style={{ flex: 1, padding: "12px 16px", border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "14px" }}
                />
                <button 
                  onClick={handleSend}
                  disabled={!replyText.trim()}
                  style={{ padding: "12px 24px", background: replyText.trim() ? "#2D4F3C" : "#9ca3af", color: "#fff", border: "none", borderRadius: "8px", fontSize: "14px", fontWeight: 500, cursor: replyText.trim() ? "pointer" : "not-allowed" }}
                >
                  Send
                </button>
              </div>
            </>
          ) : (
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: "#6b7280" }}>
              Select a conversation to view messages
            </div>
          )}
        </div>
      </div>

      {/* New Conversation Modal */}
      {showNewConv && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ background: "#fff", borderRadius: "12px", padding: "24px", width: "400px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h2 style={{ fontSize: "20px", fontWeight: 600, margin: 0 }}>New Conversation</h2>
              <button onClick={() => setShowNewConv(false)} style={{ background: "none", border: "none", fontSize: "24px", cursor: "pointer", color: "#6b7280" }}>✕</button>
            </div>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontSize: "14px", fontWeight: 500, marginBottom: "8px" }}>Lead Email</label>
              <input
                type="email"
                value={newConvEmail}
                onChange={(e) => setNewConvEmail(e.target.value)}
                placeholder="lead@email.com"
                style={{ width: "100%", padding: "12px", border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "14px" }}
              />
            </div>
            <button 
              onClick={() => { alert("Conversation created!"); setShowNewConv(false); }}
              style={{ width: "100%", padding: "14px", background: "#2D4F3C", color: "#fff", border: "none", borderRadius: "8px", fontSize: "15px", fontWeight: 500, cursor: "pointer" }}
            >
              Start Conversation
            </button>
          </div>
        </div>
      )}
    </AgentLayout>
  );
}

export default function AgentMessagesPage() {
  return (
    <ProtectedRoute allowedRoles={["agent", "admin"]}>
      <AgentMessagesContent />
    </ProtectedRoute>
  );
}