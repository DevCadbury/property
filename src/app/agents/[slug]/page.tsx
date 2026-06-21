"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Phone, Mail, MapPin, CalendarDays, Award, Languages, CheckCircle, ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { MOCK_AGENTS, MOCK_LISTINGS, formatPrice } from "@/data/mock";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Agent } from "@/types";

export default function AgentProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const agent: Agent = MOCK_AGENTS[0]; // In real app, fetch by slug
  const agentListings = MOCK_LISTINGS.slice(0, 3);

  return (
    <>
      <SiteHeader />

      <main className="min-h-screen bg-background">
        {/* Breadcrumb */}
        <div className="bg-muted/50 border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-10 py-3">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <a href="/" className="hover:text-foreground">Home</a>
              <ArrowRight className="w-4 h-4" />
              <a href="/agents" className="hover:text-foreground">Agents</a>
              <ArrowRight className="w-4 h-4" />
              <span className="text-foreground">{agent.name}</span>
            </nav>
          </div>
        </div>

        {/* Profile Header */}
        <div className="bg-forest text-primary-foreground py-16">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-primary-foreground/20 shrink-0">
                <img src={agent.avatar} alt={agent.name} className="w-full h-full object-cover" />
              </div>
              <div className="text-center md:text-left">
                <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">{agent.name}</h1>
                <p className="text-xl text-primary-foreground/80 mb-3">{agent.title}</p>
                <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                  <Star className="w-5 h-5 fill-ocean text-ocean" />
                  <span className="font-semibold">{agent.rating}</span>
                  <span className="text-primary-foreground/70">({agent.reviewCount} reviews)</span>
                </div>
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  {agent.specialties.map((spec, i) => (
                    <Badge key={i} className="bg-primary-foreground/20 text-primary-foreground">{spec}</Badge>
                  ))}
                </div>
              </div>
              <div className="md:ml-auto flex flex-col gap-3">
                <a href={`tel:${agent.phone}`} className="flex items-center justify-center gap-2 px-6 py-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                  <Phone className="w-5 h-5" /> Call
                </a>
                <a href={`mailto:${agent.email}`} className="flex items-center justify-center gap-2 px-6 py-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                  <Mail className="w-5 h-5" /> Email
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* About */}
              <section>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">About {agent.name.split(' ')[0]}</h2>
                <div className="prose prose-muted max-w-none">
                  <p className="text-muted-foreground leading-relaxed mb-4">{agent.bio}</p>
                  <p className="text-muted-foreground leading-relaxed">
                    With {agent.yearsActive} years of experience in the BC real estate market, {agent.name.split(' ')[0]} has built a reputation for exceptional client service and results. 
                    Having completed over {agent.listingsSold} transactions, they bring deep local knowledge and a proven track record to every deal.
                  </p>
                </div>
              </section>

              {/* Stats */}
              <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Transactions", value: agent.listingsSold.toString() },
                  { label: "Years Experience", value: agent.yearsActive.toString() },
                  { label: "Rating", value: agent.rating.toString() },
                  { label: "Reviews", value: agent.reviewCount.toString() },
                ].map((stat, i) => (
                  <div key={i} className="text-center p-4 rounded-lg bg-muted/50">
                    <p className="text-2xl font-bold text-forest">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </section>

              {/* Specialties & Languages */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 rounded-lg border border-border bg-card">
                  <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-forest" /> Specialties
                  </h3>
                  <ul className="space-y-2">
                    {agent.specialties.map((spec, i) => (
                      <li key={i} className="flex items-center gap-2 text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-forest" /> {spec}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-6 rounded-lg border border-border bg-card">
                  <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Languages className="w-5 h-5 text-forest" /> Languages
                  </h3>
                  <ul className="space-y-2">
                    {(agent.languages || []).map((lang, i) => (
                      <li key={i} className="flex items-center gap-2 text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-forest" /> {lang}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Listings */}
              <section>
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">Current Listings</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {agentListings.map((listing) => (
                    <a key={listing.id} href={`/listings/${listing.slug}`} className="group rounded-lg border border-border bg-card overflow-hidden hover:border-copper transition-colors">
                      <div className="aspect-[16/10] overflow-hidden bg-muted">
                        <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <div className="p-4">
                        <p className="text-xs text-muted-foreground uppercase">{listing.neighborhood}</p>
                        <h3 className="font-semibold text-foreground group-hover:text-forest">{listing.title}</h3>
                        <p className="text-lg font-bold text-foreground mt-2">{formatPrice(listing.price)}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Card */}
              <div className="p-6 rounded-lg border border-border bg-card sticky top-24">
                <h3 className="font-semibold text-lg text-foreground mb-4">Contact {agent.name.split(' ')[0]}</h3>
                <div className="space-y-4">
                  <a href={`tel:${agent.phone}`} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                    <Phone className="w-5 h-5 text-forest" />
                    <div>
                      <p className="text-xs text-muted-foreground">Phone</p>
                      <p className="font-medium text-foreground">{agent.phone}</p>
                    </div>
                  </a>
                  <a href={`mailto:${agent.email}`} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                    <Mail className="w-5 h-5 text-forest" />
                    <div>
                      <p className="text-xs text-muted-foreground">Email</p>
                      <p className="font-medium text-foreground">{agent.email}</p>
                    </div>
                  </a>
                </div>
                <Button className="w-full mt-4 bg-forest hover:bg-forest-light">
                  Request Consultation
                </Button>
              </div>

              {/* Office Info */}
              <div className="p-6 rounded-lg border border-border bg-card">
                <h3 className="font-semibold text-foreground mb-4">Office</h3>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-forest shrink-0 mt-1" />
                  <div>
                    <p className="font-medium text-foreground">Vancouver HQ</p>
                    <p className="text-sm text-muted-foreground">1055 West Georgia Street<br />Suite 2400, Vancouver BC</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}