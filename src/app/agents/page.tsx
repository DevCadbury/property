"use client";

import { motion } from "framer-motion";
import { Star, Phone, Mail, ArrowRight, Mountain, Building2 } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { MOCK_AGENTS } from "@/data/mock";

export default function AgentsPage() {
  return (
    <>
      <SiteHeader />

      <main className="min-h-screen bg-background">
        {/* Hero - BC Focused */}
        <div className="relative bg-[#1a365d] text-white py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <Mountain className="w-full h-full" />
          </div>
          <div className="relative max-w-7xl mx-auto px-6 md:px-10 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Building2 className="w-5 h-5 text-[#d4af37]" />
              <span className="text-[#d4af37] font-medium">BC's #1 Real Estate Team</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Our Team</h1>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto">
              Expert agents with deep knowledge of British Columbia&apos;s real estate market across Vancouver, Fraser Valley, Victoria & beyond
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {MOCK_AGENTS.map((agent, i) => (
              <motion.div 
                key={agent.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="rounded-lg border border-border bg-card overflow-hidden hover:border-[#a67c52] transition-colors"
              >
                <div className="aspect-square bg-muted overflow-hidden">
                  <img src={agent.avatar} alt={agent.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-semibold text-foreground">{agent.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{agent.title}</p>
                  <div className="flex items-center gap-1 mb-4">
                    <Star className="w-4 h-4 fill-[#d4af37] text-[#d4af37]" />
                    <span className="font-semibold text-foreground">{agent.rating}</span>
                    <span className="text-sm text-muted-foreground">({agent.reviewCount} reviews)</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {agent.specialties.slice(0, 3).map((spec, j) => (
                      <span key={j} className="text-xs px-2 py-1 bg-[#FAF8F5] rounded text-muted-foreground">{spec}</span>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <a href={`tel:${agent.phone}`} className="flex items-center gap-2 text-sm text-[#2D4F3C]">
                      <Phone className="w-4 h-4" /> {agent.phone}
                    </a>
                    <a href={`mailto:${agent.email}`} className="flex items-center gap-2 text-sm text-[#2D4F3C]">
                      <Mail className="w-4 h-4" /> {agent.email}
                    </a>
                  </div>
                  <a href={`/agents/${agent.slug}`} className="flex items-center justify-center gap-2 mt-4 w-full py-2 border border-[#2D4F3C] text-[#2D4F3C] rounded font-medium hover:bg-[#2D4F3C] hover:text-white transition-colors">
                    View Profile <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}