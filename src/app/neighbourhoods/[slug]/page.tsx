"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Home, Users, TrendingUp, ArrowLeft, ArrowRight, Bed, Bath, Maximize2, Star, Phone, Mail } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { MOCK_NEIGHBORHOODS, MOCK_LISTINGS, MOCK_AGENTS, formatPrice } from "@/data/mock";
import { Badge } from "@/components/ui/badge";

export default function NeighbourhoodDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const neighbourhood = MOCK_NEIGHBORHOODS[0]; // Demo data
  const areaListings = MOCK_LISTINGS.slice(0, 3);
  const areaAgents = MOCK_AGENTS.slice(0, 2);

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
              <a href="/neighbourhoods" className="hover:text-foreground">Neighbourhoods</a>
              <ArrowRight className="w-4 h-4" />
              <span className="text-foreground">{neighbourhood.name}</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <div className="relative h-80 md:h-96 bg-muted">
          <img
            src={neighbourhood.image}
            alt={neighbourhood.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-8 left-6 md:left-10 text-white">
            <p className="text-sm mb-2">{neighbourhood.city}, BC</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold">{neighbourhood.name}</h1>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Overview */}
              <section>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">About {neighbourhood.name}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {neighbourhood.description}
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  {neighbourhood.name} offers a unique blend of {neighbourhood.highlights.join(", ")}. 
                  The area is known for its excellent schools, local amenities, and strong sense of community.
                </p>
              </section>

              {/* Lifestyle */}
              <section>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">Lifestyle & Highlights</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {neighbourhood.highlights.map((highlight, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 rounded-lg border border-border bg-card">
                      <div className="w-2 h-2 rounded-full bg-forest" />
                      <span className="text-foreground">{highlight}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Market Stats */}
              <section className="grid md:grid-cols-3 gap-4">
                <div className="p-6 rounded-lg border border-border bg-card text-center">
                  <TrendingUp className="w-8 h-8 text-forest mx-auto mb-2" />
                  <p className="text-2xl font-bold text-foreground">${(neighbourhood.avgPrice / 1000000).toFixed(1)}M</p>
                  <p className="text-sm text-muted-foreground">Average Price</p>
                </div>
                <div className="p-6 rounded-lg border border-border bg-card text-center">
                  <Home className="w-8 h-8 text-forest mx-auto mb-2" />
                  <p className="text-2xl font-bold text-foreground">{neighbourhood.listingCount}</p>
                  <p className="text-sm text-muted-foreground">Active Listings</p>
                </div>
                <div className="p-6 rounded-lg border border-border bg-card text-center">
                  <Users className="w-8 h-8 text-forest mx-auto mb-2" />
                  <p className="text-2xl font-bold text-foreground">High</p>
                  <p className="text-sm text-muted-foreground">Demand Level</p>
                </div>
              </section>

              {/* Listings in Area */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display text-2xl font-bold text-foreground">Properties in {neighbourhood.name}</h2>
                  <a href={`/listings?area=${neighbourhood.slug}`} className="text-forest font-semibold hover:underline">
                    View All →
                  </a>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {areaListings.map((listing) => (
                    <a
                      key={listing.id}
                      href={`/listings/${listing.slug}`}
                      className="group rounded-lg border border-border bg-card overflow-hidden hover:border-copper transition-all"
                    >
                      <div className="aspect-[16/10] overflow-hidden bg-muted">
                        <img
                          src={listing.images[0]}
                          alt={listing.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-4">
                        <p className="text-xs text-muted-foreground">{listing.neighborhood}</p>
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
              {/* Agents in Area */}
              <div className="p-6 rounded-lg border border-border bg-card">
                <h3 className="font-semibold text-foreground mb-4">Local Experts</h3>
                <div className="space-y-4">
                  {areaAgents.map((agent) => (
                    <div key={agent.id} className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
                        <img src={agent.avatar} alt={agent.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-foreground">{agent.name}</p>
                        <p className="text-xs text-muted-foreground">{agent.title}</p>
                      </div>
                      <a href={`/agents/${agent.slug}`} className="text-forest text-sm hover:underline">Profile</a>
                    </div>
                  ))}
                </div>
                <a href="/agents" className="block mt-4 text-center text-sm text-forest font-medium hover:underline">
                  View All Agents →
                </a>
              </div>

              {/* Map Placeholder */}
              <div className="aspect-square rounded-lg border border-border bg-muted flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">Map Integration</p>
                  <p className="text-sm text-muted-foreground">49.2827° N, 123.1207° W</p>
                </div>
              </div>

              {/* CTA */}
              <div className="p-6 rounded-lg border border-border bg-card">
                <h3 className="font-semibold text-foreground mb-2">Interested in {neighbourhood.name}?</h3>
                <p className="text-sm text-muted-foreground mb-4">Let us help you find your perfect home in this neighbourhood.</p>
                <a href="/contact" className="block w-full text-center py-3 bg-forest text-white font-semibold rounded-lg hover:bg-forest-light">
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}