/* ═══════════════════════════════════════════════════════════════════════════
   CRM Mock Data System
   Structured for future backend integration
   Contains: users, leads, messages, appointments, notifications
══════════════════════════════════════════════════════════════════════════ */

/* ─── User Types ─────────────────────────────────────────────────────────── */
export type UserRole = "buyer" | "renter" | "seller" | "agent" | "admin";

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
  preferences?: {
    savedSearches?: SavedSearch[];
    notifications: boolean;
    emailAlerts: boolean;
  };
}

export interface SavedSearch {
  id: string;
  name: string;
  filters: {
    location?: string;
    priceMin?: number;
    priceMax?: number;
    beds?: number;
    baths?: number;
    propertyType?: string;
  };
  createdAt: string;
  alertsEnabled: boolean;
}

export const MOCK_USERS: UserProfile[] = [
  {
    id: "user-001",
    email: "john.smith@email.com",
    firstName: "John",
    lastName: "Smith",
    phone: "+1 (604) 555-0123",
    role: "buyer",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    createdAt: "2025-06-15T10:00:00Z",
    preferences: {
      savedSearches: [
        { id: "search-1", name: "Kitsilano 2BR", filters: { location: "Kitsilano", beds: 2 }, createdAt: "2026-03-01", alertsEnabled: true },
        { id: "search-2", name: "Under $1M condos", filters: { priceMax: 1000000, propertyType: "condo" }, createdAt: "2026-03-10", alertsEnabled: false },
      ],
      notifications: true,
      emailAlerts: true,
    },
  },
  {
    id: "agent-001",
    email: "sophie.chen@pacificedge.ca",
    firstName: "Sophie",
    lastName: "Chen",
    phone: "+1 (604) 555-0142",
    role: "agent",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80",
    createdAt: "2020-01-10T08:00:00Z",
    preferences: { notifications: true, emailAlerts: true },
  },
  {
    id: "agent-002",
    email: "marcus.reyes@pacificedge.ca",
    firstName: "Marcus",
    lastName: "Reyes",
    phone: "+1 (604) 555-0278",
    role: "agent",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&q=80",
    createdAt: "2021-03-15T08:00:00Z",
  },
  {
    id: "admin-001",
    email: "admin@pacificedge.ca",
    firstName: "Admin",
    lastName: "User",
    phone: "+1 (604) 555-0001",
    role: "admin",
    createdAt: "2019-01-01T08:00:00Z",
  },
];

/* ─── Lead Types ─────────────────────────────────────────────────────────── */
export type LeadStatus = "new" | "contacted" | "qualified" | "negotiating" | "closed_won" | "closed_lost";
export type LeadSource = "website" | "valuation_form" | "contact_page" | "listing_inquiry" | "referral" | "open_house";

export interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: LeadStatus;
  source: LeadSource;
  interest: "buy" | "rent" | "sell";
  assignedAgentId?: string;
  propertyInterest?: string;
  budget?: string;
  notes: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface LeadActivity {
  id: string;
  leadId: string;
  type: "note" | "status_change" | "email_sent" | "call_made" | "meeting_scheduled" | "offer_submitted";
  description: string;
  createdAt: string;
  createdBy: string;
}

export const MOCK_LEADS: Lead[] = [
  {
    id: "lead-001",
    firstName: "Michael",
    lastName: "Johnson",
    email: "michael.j@email.com",
    phone: "+1 (604) 555-0456",
    status: "new",
    source: "listing_inquiry",
    interest: "buy",
    propertyInterest: "Coal Harbour Penthouse",
    budget: "$2M - $4M",
    notes: "Looking for waterfront properties. Pre-approved for $3.5M.",
    tags: ["waterfront", "premium"],
    assignedAgentId: "agent-001",
    createdAt: "2026-04-25T14:30:00Z",
    updatedAt: "2026-04-25T14:30:00Z",
  },
  {
    id: "lead-002",
    firstName: "Sarah",
    lastName: "Williams",
    email: "sarah.w@email.com",
    phone: "+1 (778) 555-0789",
    status: "contacted",
    source: "valuation_form",
    interest: "sell",
    notes: "Interested in selling her downtown condo.估值 requested.",
    tags: ["seller", " downtown"],
    assignedAgentId: "agent-001",
    createdAt: "2026-04-20T10:15:00Z",
    updatedAt: "2026-04-22T09:00:00Z",
  },
  {
    id: "lead-003",
    firstName: "David",
    lastName: "Lee",
    email: "david.lee@email.com",
    phone: "+1 (604) 555-0321",
    status: "qualified",
    source: "website",
    interest: "rent",
    propertyInterest: "2BR in Yaletown",
    budget: "$3,000 - $4,500",
    notes: "Relocating from Toronto. Needs rental for June 1.",
    tags: ["relocation", "urgent"],
    assignedAgentId: "agent-002",
    createdAt: "2026-04-15T16:45:00Z",
    updatedAt: "2026-04-24T11:30:00Z",
  },
  {
    id: "lead-004",
    firstName: "Emily",
    lastName: "Brown",
    email: "emily.b@email.com",
    phone: "+1 (250) 555-0654",
    status: "negotiating",
    source: "open_house",
    interest: "buy",
    propertyInterest: "Victoria Waterfront",
    budget: "$1.5M - $2M",
    notes: "Attended open house. Very interested in the Victoria property.",
    tags: ["open-house", "victoria"],
    assignedAgentId: "agent-003",
    createdAt: "2026-04-10T13:20:00Z",
    updatedAt: "2026-04-28T15:00:00Z",
  },
  {
    id: "lead-005",
    firstName: "Robert",
    lastName: "Taylor",
    email: "r.taylor@email.com",
    phone: "+1 (604) 555-0987",
    status: "closed_won",
    source: "referral",
    interest: "buy",
    notes: "Purchased property in Kitsilano. Referral from past client.",
    tags: ["referral", "closed"],
    assignedAgentId: "agent-001",
    createdAt: "2026-03-01T09:00:00Z",
    updatedAt: "2026-04-15T14:00:00Z",
  },
];

export const MOCK_LEAD_ACTIVITIES: LeadActivity[] = [
  { id: "act-001", leadId: "lead-001", type: "note", description: "Initial inquiry received via property page", createdAt: "2026-04-25T14:30:00Z", createdBy: "system" },
  { id: "act-002", leadId: "lead-002", type: "status_change", description: "Status changed from new to contacted", createdAt: "2026-04-22T09:00:00Z", createdBy: "agent-001" },
  { id: "act-003", leadId: "lead-002", type: "note", description: "Left voicemail, will follow up tomorrow", createdAt: "2026-04-22T10:30:00Z", createdBy: "agent-001" },
  { id: "act-004", leadId: "lead-003", type: "email_sent", description: "Sent rental listings matching criteria", createdAt: "2026-04-18T11:00:00Z", createdBy: "agent-002" },
  { id: "act-005", leadId: "lead-004", type: "meeting_scheduled", description: "Viewing scheduled for April 30", createdAt: "2026-04-28T15:00:00Z", createdBy: "agent-003" },
  { id: "act-006", leadId: "lead-005", type: "offer_submitted", description: "Offer accepted, closing May 15", createdAt: "2026-04-15T14:00:00Z", createdBy: "agent-001" },
];

/* ─── Messages / Communications ─────────────────────────────────────────── */
export interface Conversation {
  id: string;
  leadId: string;
  leadName: string;
  lastMessage: string;
  lastMessageAt: string;
  unread: number;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  isFromAgent: boolean;
}

export const MOCK_CONVERSATIONS: Conversation[] = [
  { id: "conv-001", leadId: "lead-001", leadName: "Michael Johnson", lastMessage: "I'd like to schedule a viewing for this weekend.", lastMessageAt: "2026-04-28T14:30:00Z", unread: 2 },
  { id: "conv-002", leadId: "lead-002", leadName: "Sarah Williams", lastMessage: "Thank you for the valuation report!", lastMessageAt: "2026-04-27T09:15:00Z", unread: 0 },
  { id: "conv-003", leadId: "lead-003", leadName: "David Lee", lastMessage: "Are there any new listings in Yaletown?", lastMessageAt: "2026-04-26T16:45:00Z", unread: 1 },
];

export const MOCK_MESSAGES: Message[] = [
  { id: "msg-001", conversationId: "conv-001", senderId: "lead-001", senderName: "Michael Johnson", content: "Hi, I'm interested in the Coal Harbour penthouse. Is it available for viewing this weekend?", timestamp: "2026-04-28T14:00:00Z", isFromAgent: false },
  { id: "msg-002", conversationId: "conv-001", senderId: "agent-001", senderName: "Sophie Chen", content: "Hello Michael! Yes, I can arrange a viewing. Would Saturday at 2pm work for you?", timestamp: "2026-04-28T14:15:00Z", isFromAgent: true },
  { id: "msg-003", conversationId: "conv-001", senderId: "lead-001", senderName: "Michael Johnson", content: "I'd like to schedule a viewing for this weekend.", timestamp: "2026-04-28T14:30:00Z", isFromAgent: false },
];

/* ─── Appointments / Calendar ───────────────────────────────────────────── */
export type AppointmentStatus = "scheduled" | "completed" | "cancelled";

export interface Appointment {
  id: string;
  title: string;
  type: "viewing" | "call" | "meeting" | "open-house" | "task";
  leadId?: string;
  leadName?: string;
  propertyId?: string;
  propertyTitle?: string;
  date: string;
  time: string;
  duration: number; // minutes
  location?: string;
  notes?: string;
  status: AppointmentStatus;
  createdAt: string;
}

export const MOCK_APPOINTMENTS: Appointment[] = [
  { id: "apt-001", title: "Property Viewing - Coal Harbour", type: "viewing", leadId: "lead-001", leadName: "Michael Johnson", propertyId: "listing-001", propertyTitle: "Coal Harbour Penthouse", date: "2026-05-03", time: "14:00", duration: 60, location: "1500 W Georgia St, Vancouver", status: "scheduled", createdAt: "2026-04-28T14:30:00Z" },
  { id: "apt-002", title: "Phone Consultation", type: "call", leadId: "lead-003", leadName: "David Lee", date: "2026-05-02", time: "10:00", duration: 30, status: "scheduled", createdAt: "2026-04-27T09:00:00Z" },
  { id: "apt-003", title: "Open House - Yorkville Condo", type: "open-house", propertyId: "listing-002", propertyTitle: "Yorkville Luxury Condo", date: "2026-05-04", time: "12:00", duration: 180, location: "55 Bloor St W, Toronto", status: "scheduled", createdAt: "2026-04-25T11:00:00Z" },
  { id: "apt-004", title: "Follow-up Call", type: "task", leadId: "lead-002", leadName: "Sarah Williams", date: "2026-05-01", time: "15:00", duration: 15, notes: "Discuss listing timeline", status: "scheduled", createdAt: "2026-04-28T10:00:00Z" },
  { id: "apt-005", title: "Property Viewing - Kitsilano", type: "viewing", leadId: "lead-004", leadName: "Emily Brown", propertyId: "listing-002", propertyTitle: "Kitsilano Family Home", date: "2026-04-30", time: "11:00", duration: 60, status: "completed", createdAt: "2026-04-25T14:00:00Z" },
];

/* ─── Notifications ─────────────────────────────────────────────────────────── */
export type NotificationType = "lead" | "message" | "appointment" | "listing" | "system";

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  actionUrl?: string;
  createdAt: string;
}

export const MOCK_NOTIFICATIONS: AppNotification[] = [
  { id: "notif-001", type: "lead", title: "New Lead", message: "Michael Johnson submitted an inquiry for Coal Harbour Penthouse", read: false, actionUrl: "/agent/leads/lead-001", createdAt: "2026-04-28T14:30:00Z" },
  { id: "notif-002", type: "message", title: "New Message", message: "David Lee sent you a message", read: false, actionUrl: "/agent/messages/conv-003", createdAt: "2026-04-26T16:45:00Z" },
  { id: "notif-003", type: "appointment", title: "Upcoming Viewing", message: "Property viewing with Emily Brown in 2 days", read: true, actionUrl: "/agent/calendar", createdAt: "2026-04-28T10:00:00Z" },
  { id: "notif-004", type: "listing", title: "New Listing Match", message: "New 2BR condo in Yaletown matches your saved search", read: true, createdAt: "2026-04-25T08:00:00Z" },
];

/* ─── Analytics (Mock) ────────────────────────────────────────────────────── */
export interface AgentStats {
  totalLeads: number;
  newLeads: number;
  contactedLeads: number;
  qualifiedLeads: number;
  conversionRate: number;
  activeListings: number;
  soldListings: number;
  totalViews: number;
  totalInquiries: number;
}

export const MOCK_AGENT_STATS: Record<string, AgentStats> = {
  "agent-001": {
    totalLeads: 24,
    newLeads: 5,
    contactedLeads: 12,
    qualifiedLeads: 4,
    conversionRate: 18,
    activeListings: 8,
    soldListings: 15,
    totalViews: 4520,
    totalInquiries: 89,
  },
  "agent-002": {
    totalLeads: 18,
    newLeads: 3,
    contactedLeads: 10,
    qualifiedLeads: 3,
    conversionRate: 15,
    activeListings: 6,
    soldListings: 12,
    totalViews: 3280,
    totalInquiries: 62,
  },
};

/* ─── Utility Functions ─────────────────────────────────────────────────────── */
export function getUserById(id: string): UserProfile | undefined {
  return MOCK_USERS.find(u => u.id === id);
}

export function getUserByEmail(email: string): UserProfile | undefined {
  return MOCK_USERS.find(u => u.email === email);
}

export function getLeadsByAgent(agentId: string): Lead[] {
  return MOCK_LEADS.filter(l => l.assignedAgentId === agentId);
}

export function getAppointmentsByAgent(agentId: string): Appointment[] {
  // For demo, just return all appointments
  return MOCK_APPOINTMENTS;
}

export function getConversationsByAgent(agentId: string): Conversation[] {
  // For demo, return all conversations
  return MOCK_CONVERSATIONS;
}

export function getNotificationsByUser(userId: string): AppNotification[] {
  return MOCK_NOTIFICATIONS;
}