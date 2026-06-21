"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Bed, Bath, Maximize2, CalendarDays, Share2, Heart, Phone, Mail, MessageSquare, ChevronRight, Building2, Car, Dog, Check } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ImageGallery } from "@/components/ui/image-gallery";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/data/mock";

const RENTAL = {
  id: "rent-001",
  title: "Luxury Rental in Yorkville",
  address: "150 Bloor St W, Unit 1205",
  city: "Vancouver",
  neighborhood: "Yorkville",
  state: "BC",
  price: 4500,
  beds: 2,
  baths: 2,
  sqft: 1200,
  propertyType: "condo",
  leaseTerm: "12 months",
  available: "Immediate",
  furnished: "Unfurnished",
  pets: "Cats OK",
  images: [
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
  ],
  description: "Stunning luxury rental in the heart of Yorkville with modern finishes, floor-to-ceiling windows, and breathtaking city views. Building amenities include 24-hour concierge, fitness center, rooftop terrace, and underground parking.",
  features: ["Doorman Building", "Gym & Pool", "Rooftop Terrace", "Pet Friendly", "In-Suite Laundry", "Central AC", "Hardwood Floors", "Stainless Appliances"],
  agent: { name: "Sophie Chen", phone: "+1 (604) 555-0142", email: "sophie.chen@pacificedge.ca" },
};

export default function RentDetailPage() {
  const [saved, setSaved] = useState(false);

  return (
    <>
      <SiteHeader />

      <main className="min-h-screen bg-background">
        {/* Breadcrumb */}
        <div className="bg-muted/50 border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-10 py-3">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <a href="/" className="hover:text-foreground">Home</a>
              <ChevronRight className="w-4 h-4" />
              <a href="/rent" className="hover:text-foreground">Rent</a>
              <ChevronRight className="w-4 h-4" />
              <span className="text-foreground">{RENTAL.title}</span>
            </nav>
          </div>
        </div>

        {/* Gallery */}
        <div className="bg-muted">
          <div className="max-w-7xl mx-auto px-4 md:px-10 py-6">
            <ImageGallery images={RENTAL.images} title={RENTAL.title} />
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {RENTAL.neighborhood}, {RENTAL.city}, {RENTAL.state}
                    </p>
                    <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">
                      {RENTAL.title}
                    </h1>
                    <p className="text-muted-foreground mt-1">{RENTAL.address}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setSaved(!saved)} className="p-3 rounded-lg border border-border hover:border-forest transition-colors">
                      <Heart className={`w-5 h-5 ${saved ? "fill-red-500 text-red-500" : "text-foreground"}`} />
                    </button>
                    <button className="p-3 rounded-lg border border-border hover:border-forest transition-colors">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Key Stats */}
                <div className="flex flex-wrap items-center gap-6 py-4 border-y border-border">
                  <div className="flex items-center gap-2">
                    <Bed className="w-5 h-5 text-forest" />
                    <span className="font-semibold">{RENTAL.beds}</span>
                    <span className="text-muted-foreground">Beds</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bath className="w-5 h-5 text-forest" />
                    <span className="font-semibold">{RENTAL.baths}</span>
                    <span className="text-muted-foreground">Baths</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Maximize2 className="w-5 h-5 text-forest" />
                    <span className="font-semibold">{RENTAL.sqft.toLocaleString()}</span>
                    <span className="text-muted-foreground">sqft</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-forest" />
                    <span className="font-semibold">{RENTAL.propertyType}</span>
                  </div>
                </div>
              </div>

              {/* Rental Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Rent", value: `${formatPrice(RENTAL.price)}/mo` },
                  { label: "Lease Term", value: RENTAL.leaseTerm },
                  { label: "Available", value: RENTAL.available },
                  { label: "Pets", value: RENTAL.pets, icon: Dog },
                ].map((item, i) => (
                  <div key={i} className="p-4 rounded-lg bg-muted/50 text-center">
                    {item.icon && <item.icon className="w-5 h-5 text-forest mx-auto mb-2" />}
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                    <p className="font-semibold text-foreground">{item.value}</p>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div>
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">About This Rental</h2>
                <p className="text-muted-foreground leading-relaxed">{RENTAL.description}</p>
              </div>

              {/* Features */}
              <div>
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">Features & Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {RENTAL.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                      <Check className="w-4 h-4 text-forest" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Price */}
              <div className="p-6 rounded-lg border border-border bg-card">
                <p className="text-3xl font-bold text-foreground">{formatPrice(RENTAL.price)}<span className="text-lg font-normal text-muted-foreground">/month</span></p>
                <p className="text-sm text-muted-foreground mt-1">Plus utilities</p>
              </div>

              {/* Contact Card */}
              <div className="p-6 rounded-lg border border-border bg-card sticky top-24">
                <h3 className="font-semibold text-lg mb-4">Contact Agent</h3>
                <p className="text-sm text-muted-foreground mb-4">{RENTAL.agent.name} is available to show this property</p>
                
                <div className="space-y-3">
                  <a href={`tel:${RENTAL.agent.phone}`} className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-forest text-white font-semibold hover:bg-forest-light">
                    <Phone className="w-4 h-4" /> Call Agent
                  </a>
                  <a href={`mailto:${RENTAL.agent.email}`} className="flex items-center justify-center gap-2 w-full py-3 rounded-lg border-2 border-forest text-forest font-semibold hover:bg-forest hover:text-white">
                    <Mail className="w-4 h-4" /> Email
                  </a>
                  <button className="flex items-center justify-center gap-2 w-full py-3 rounded-lg border border-border text-foreground font-semibold hover:border-forest">
                    <MessageSquare className="w-4 h-4" /> Request Info
                  </button>
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