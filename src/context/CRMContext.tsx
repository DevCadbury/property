"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { MOCK_LEADS, MOCK_CONVERSATIONS, MOCK_MESSAGES, MOCK_APPOINTMENTS, type Lead, type Conversation, type Message, type Appointment, type LeadStatus, type LeadSource } from "@/data/crm";

interface CRMContextType {
  leads: Lead[];
  conversations: Conversation[];
  messages: Message[];
  appointments: Appointment[];
  addLead: (lead: Omit<Lead, "id" | "createdAt" | "updatedAt">) => void;
  updateLead: (id: string, updates: Partial<Lead>) => void;
  deleteLead: (id: string) => void;
  addMessage: (conversationId: string, content: string, isFromAgent: boolean) => void;
  addAppointment: (appointment: Omit<Appointment, "id" | "createdAt">) => void;
  updateAppointment: (id: string, updates: Partial<Appointment>) => void;
  deleteAppointment: (id: string) => void;
}

const CRMContext = createContext<CRMContextType | undefined>(undefined);

export function CRMProvider({ children }: { children: ReactNode }) {
  const [leads, setLeads] = useState<Lead[]>(MOCK_LEADS);
  const [conversations, setConversations] = useState<Conversation[]>(MOCK_CONVERSATIONS);
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const [appointments, setAppointments] = useState<Appointment[]>(MOCK_APPOINTMENTS);

  // Load from localStorage on mount
  useEffect(() => {
    const savedLeads = localStorage.getItem("crm_leads");
    const savedConversations = localStorage.getItem("crm_conversations");
    const savedMessages = localStorage.getItem("crm_messages");
    const savedAppointments = localStorage.getItem("crm_appointments");

    if (savedLeads) setLeads(JSON.parse(savedLeads));
    if (savedConversations) setConversations(JSON.parse(savedConversations));
    if (savedMessages) setMessages(JSON.parse(savedMessages));
    if (savedAppointments) setAppointments(JSON.parse(savedAppointments));
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem("crm_leads", JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    localStorage.setItem("crm_conversations", JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    localStorage.setItem("crm_messages", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem("crm_appointments", JSON.stringify(appointments));
  }, [appointments]);

  const addLead = (lead: Omit<Lead, "id" | "createdAt" | "updatedAt">) => {
    const newLead: Lead = {
      ...lead,
      id: `lead-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setLeads(prev => [newLead, ...prev]);
  };

  const updateLead = (id: string, updates: Partial<Lead>) => {
    setLeads(prev => prev.map(lead => 
      lead.id === id ? { ...lead, ...updates, updatedAt: new Date().toISOString() } : lead
    ));
  };

  const deleteLead = (id: string) => {
    setLeads(prev => prev.filter(lead => lead.id !== id));
  };

  const addMessage = (conversationId: string, content: string, isFromAgent: boolean) => {
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      conversationId,
      senderId: isFromAgent ? "agent-001" : "lead",
      senderName: isFromAgent ? "Sophie Chen" : "Lead",
      content,
      timestamp: new Date().toISOString(),
      isFromAgent,
    };
    setMessages(prev => [...prev, newMessage]);

    // Update conversation last message
    setConversations(prev => prev.map(conv => 
      conv.id === conversationId 
        ? { ...conv, lastMessage: content, lastMessageAt: new Date().toISOString() }
        : conv
    ));
  };

  const addAppointment = (appointment: Omit<Appointment, "id" | "createdAt">) => {
    const newAppointment: Appointment = {
      ...appointment,
      id: `apt-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setAppointments(prev => [...prev, newAppointment]);
  };

  const updateAppointment = (id: string, updates: Partial<Appointment>) => {
    setAppointments(prev => prev.map(apt => 
      apt.id === id ? { ...apt, ...updates } : apt
    ));
  };

  const deleteAppointment = (id: string) => {
    setAppointments(prev => prev.filter(apt => apt.id !== id));
  };

  return (
    <CRMContext.Provider value={{
      leads,
      conversations,
      messages,
      appointments,
      addLead,
      updateLead,
      deleteLead,
      addMessage,
      addAppointment,
      updateAppointment,
      deleteAppointment,
    }}>
      {children}
    </CRMContext.Provider>
  );
}

export function useCRM() {
  const context = useContext(CRMContext);
  if (context === undefined) {
    throw new Error("useCRM must be used within a CRMProvider");
  }
  return context;
}