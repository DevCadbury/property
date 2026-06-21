"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  MapPin, Bed, Bath, Maximize2, CalendarDays, Share2, Heart, 
  Phone, Mail, MessageSquare, ChevronRight, Check, Map as MapIcon,
  Building2, Car, Waves, TreePine, Shield
} from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { MOCK_LISTINGS, MOCK_AGENTS, formatPrice, formatPriceFull } from "@/data/mock";
import { ImageGallery } from "@/components/ui/image-gallery";
import { MortgageCalculator } from "@/components/ui/mortgage-calculator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs-advanced";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Listing, Agent } from "@/types";

export default function PropertyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  
  // In real app, fetch by slug. For demo, use first listing.
  const listing: Listing = MOCK_LISTINGS[0];
  const agent: Agent = MOCK_AGENTS.find(a => a.id === listing.agentId) || MOCK_AGENTS[0];

  const handleSave = () => setSaved(!saved);

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
              <a href="/listings" className="hover:text-foreground">Listings</a>
              <ChevronRight className="w-4 h-4" />
              <span className="text-foreground">{listing.title}</span>
            </nav>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="bg-muted">
          <div className="max-w-7xl mx-auto px-4 md:px-10 py-6">
            <ImageGallery images={listing.images} title={listing.title} />
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Header */}
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground uppercase tracking-wide mb-2 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {listing.neighborhood}, {listing.city}, {listing.state} {listing.zipCode}
                    </p>
                    <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                      {listing.title}
                    </h1>
                    <p className="text-muted-foreground mt-1">{listing.address}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      className={cn(
                        "p-3 rounded-lg border border-border hover:border-forest transition-colors",
                        saved && "bg-red-50 border-red-200"
                      )}
                    >
                      <Heart className={cn("w-5 h-5", saved && "fill-red-500 text-red-500")} />
                    </button>
                    <button className="p-3 rounded-lg border border-border hover:border-forest transition-colors">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Price & Key Stats */}
                <div className="flex flex-wrap items-center gap-6 py-4 border-y border-border">
                  <div>
                    <p className="text-3xl font-bold text-foreground font-display">{formatPriceFull(listing.price)}</p>
                    {listing.pricePerSqft && (
                      <p className="text-sm text-muted-foreground">${listing.pricePerSqft.toLocaleString()}/sqft</p>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-foreground">
                    <div className="flex items-center gap-2">
                      <Bed className="w-5 h-5 text-forest" />
                      <span className="font-semibold">{listing.beds}</span>
                      <span className="text-muted-foreground">Beds</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Bath className="w-5 h-5 text-forest" />
                      <span className="font-semibold">{listing.baths}</span>
                      <span className="text-muted-foreground">Baths</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Maximize2 className="w-5 h-5 text-forest" />
                      <span className="font-semibold">{listing.sqft.toLocaleString()}</span>
                      <span className="text-muted-foreground">Sqft</span>
                    </div>
                  </div>
                  <div className="ml-auto flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarDays className="w-4 h-4" />
                    Listed {new Date(listing.listedAt).toLocaleDateString()}
                  </div>
                </div>
              </div>

              {/* Property Badges */}
              <div className="flex flex-wrap gap-2">
                {listing.propertyType && (
                  <Badge variant="outline" className="bg-muted/50">{listing.propertyType}</Badge>
                )}
                {listing.yearBuilt && (
                  <Badge variant="outline" className="bg-muted/50">Built {listing.yearBuilt}</Badge>
                )}
                {listing.parking && (
                  <Badge variant="outline" className="bg-muted/50">{listing.parking} Parking</Badge>
                )}
                {listing.lotSqft && (
                  <Badge variant="outline" className="bg-muted/50">Lot: {listing.lotSqft.toLocaleString()} sqft</Badge>
                )}
                {listing.badge && listing.badge !== "featured" && (
                  <Badge className="bg-forest text-primary-foreground">{listing.badge}</Badge>
                )}
              </div>

              {/* Tabs Section */}
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full justify-start border-b border-border rounded-none bg-transparent h-auto p-0">
                  <TabsTrigger value="overview" className="rounded-t-md">Overview</TabsTrigger>
                  <TabsTrigger value="features" className="rounded-t-md">Features</TabsTrigger>
                  <TabsTrigger value="location" className="rounded-t-md">Location</TabsTrigger>
                  <TabsTrigger value="calculator" className="rounded-t-md">Mortgage</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  {/* Description */}
                  <div>
                    <h2 className="font-display text-xl font-semibold mb-4">About This Property</h2>
                    <p className="text-muted-foreground leading-relaxed">{listing.description}</p>
                  </div>

                  {/* Property Details */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      { icon: Building2, label: "Property Type", value: listing.propertyType },
                      { icon: CalendarDays, label: "Year Built", value: listing.yearBuilt },
                      { icon: Maximize2, label: "Floor Area", value: `${listing.sqft.toLocaleString()} sqft` },
                      { icon: Car, label: "Parking", value: listing.parking ? `${listing.parking} spaces` : "None" },
                      { icon: Waves, label: "Waterfront", value: listing.lotSqft ? "No" : "No" },
                      { icon: TreePine, label: "Lot Size", value: listing.lotSqft ? `${listing.lotSqft.toLocaleString()} sqft` : "N/A" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                        <item.icon className="w-5 h-5 text-forest shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs text-muted-foreground">{item.label}</p>
                          <p className="text-sm font-medium text-foreground capitalize">{item.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="features" className="space-y-6">
                  <h2 className="font-display text-xl font-semibold">Property Features</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {listing.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg">
                        <Check className="w-4 h-4 text-forest shrink-0" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="location" className="space-y-6">
                  <h2 className="font-display text-xl font-semibold">Location</h2>
                  <div className="aspect-[16/9] bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <MapIcon className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">Map integration would go here</p>
                      <p className="text-sm text-muted-foreground">{listing.lat.toFixed(4)}, {listing.lng.toFixed(4)}</p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <h3 className="font-semibold mb-2">Nearby Amenities</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Schools within 2km</li>
                        <li>• Shopping centres nearby</li>
                        <li>• Public transit accessible</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <h3 className="font-semibold mb-2">Walk Score</h3>
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-forest">85</p>
                          <p className="text-xs text-muted-foreground">Walker's</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-forest">72</p>
                          <p className="text-xs text-muted-foreground">Transit</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-forest">45</p>
                          <p className="text-xs text-muted-foreground">Bike</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="calculator">
                  <MortgageCalculator price={listing.price} />
                </TabsContent>
              </Tabs>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Agent Card */}
              <div className="rounded-lg border border-border bg-card p-6 sticky top-24">
                <h3 className="font-semibold text-lg mb-4">Listed By</h3>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-muted">
                    <img src={agent.avatar} alt={agent.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{agent.name}</p>
                    <p className="text-sm text-muted-foreground">{agent.title}</p>
                    <p className="text-xs text-forest">★ {agent.rating} ({agent.reviewCount} reviews)</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <a href={`tel:${agent.phone}`} className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-forest text-primary-foreground font-semibold hover:bg-forest-light transition-colors">
                    <Phone className="w-4 h-4" />
                    Call Agent
                  </a>
                  <a href={`mailto:${agent.email}`} className="flex items-center justify-center gap-2 w-full py-3 rounded-lg border-2 border-forest text-forest font-semibold hover:bg-forest hover:text-primary-foreground transition-colors">
                    <Mail className="w-4 h-4" />
                    Email Agent
                  </a>
                  <button className="flex items-center justify-center gap-2 w-full py-3 rounded-lg border border-border text-foreground font-semibold hover:border-forest transition-colors">
                    <MessageSquare className="w-4 h-4" />
                    Request Info
                  </button>
                </div>

                {/* Schedule Tour */}
                <div className="mt-6 pt-6 border-t border-border">
                  <h4 className="font-semibold mb-3">Schedule a Tour</h4>
                  <div className="space-y-2">
                    <button className="w-full py-2 px-4 text-left text-sm border border-border rounded hover:border-forest transition-colors">
                      In-Person Tour
                    </button>
                    <button className="w-full py-2 px-4 text-left text-sm border border-border rounded hover:border-forest transition-colors">
                      Virtual Tour
                    </button>
                  </div>
                </div>
              </div>

              {/* Mortgage Quick Estimate */}
              <div className="rounded-lg border border-border bg-muted/30 p-6">
                <h3 className="font-semibold mb-2">Quick Estimate</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  With 20% down and 5.25% rate
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {formatPriceFull(Math.round(listing.price * 0.8 * 0.0056))}/mo
                </p>
                <p className="text-xs text-muted-foreground mt-1">Plus property tax</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* MLS Disclaimer - Footer */}
      <div className="bg-amber-50 border-t border-amber-200">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-4">
          <p className="text-sm text-amber-800 text-center">
            All listings are copyrighted by the Fraser Valley Real Estate Board and Vancouver Island Real Estate Board. 
            Data is deemed reliable but is not guaranteed and should be verified by the buyer.
          </p>
        </div>
      </div>

      <SiteFooter />
    </>
  );
}