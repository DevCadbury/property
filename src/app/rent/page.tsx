"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, SlidersHorizontal, Grid3X3, List, Heart, Bed, Bath, Maximize2, ArrowRight, Mountain, Building2 } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { formatPrice } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Listing } from "@/types";

const RENTAL_LISTINGS: Listing[] = [
  {
    id: "rent-001",
    slug: "yorkville-luxury-rental",
    title: "Luxury Rental in Yorkville",
    address: "150 Bloor St W, Unit 1205",
    city: "Vancouver",
    neighborhood: "Yorkville",
    state: "BC",
    zipCode: "V6G 1A1",
    price: 4500,
    pricePerSqft: 3,
    beds: 2,
    baths: 2,
    sqft: 1200,
    propertyType: "condo",
    status: "for-rent",
    badge: "featured",
    images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80"],
    description: "Stunning luxury rental in the heart of Yorkville with modern finishes and city views.",
    features: ["Doorman", "Gym", "Rooftop Terrace", "Pet Friendly", "In-Suite Laundry"],
    agentId: "agent-001",
    lat: 49.2840,
    lng: -123.1200,
    yearBuilt: 2019,
    parking: 1,
    listedAt: "2026-03-01T08:00:00Z",
    daysOnMarket: 10,
  },
  {
    id: "rent-002",
    slug: "kitsilano-family-rental",
    title: "Spacious Family Home in Kits",
    address: "2850 W 22nd Ave",
    city: "Vancouver",
    neighborhood: "Kitsilano",
    state: "BC",
    zipCode: "V6L 1M9",
    price: 5800,
    pricePerSqft: 2,
    beds: 4,
    baths: 3,
    sqft: 2400,
    propertyType: "house",
    status: "for-rent",
    badge: "new",
    images: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80", "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80"],
    description: "Beautiful family home in sought-after Kitsilano with private yard.",
    features: ["Private Yard", "Garage", "Washer/Dryer", "Near Schools", "Close to Beach"],
    agentId: "agent-002",
    lat: 49.2550,
    lng: -123.1550,
    yearBuilt: 2015,
    parking: 2,
    listedAt: "2026-03-05T08:00:00Z",
    daysOnMarket: 5,
  },
  {
    id: "rent-003",
    slug: "downtown-studio-rental",
    title: "Modern Studio in Downtown",
    address: "1055 Dunsmuir St, Unit 308",
    city: "Vancouver",
    neighborhood: "Downtown",
    state: "BC",
    zipCode: "V7X 1L4",
    price: 2200,
    pricePerSqft: 4,
    beds: 1,
    baths: 1,
    sqft: 550,
    propertyType: "condo",
    status: "for-rent",
    images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80"],
    description: "Efficient modern studio in the downtown core with stunning views.",
    features: ["City Views", "Concierge", "Gym", "Bike Storage", "Pet Friendly"],
    agentId: "agent-001",
    lat: 49.2850,
    lng: -123.1200,
    yearBuilt: 2020,
    parking: 0,
    listedAt: "2026-03-10T08:00:00Z",
    daysOnMarket: 3,
  },
  {
    id: "rent-004",
    slug: "yaletown-renovated-rental",
    title: "Renovated 2BR in Yaletown",
    address: "1000 Hamilton St, Unit 205",
    city: "Vancouver",
    neighborhood: "Yaletown",
    state: "BC",
    zipCode: "V6B 2V1",
    price: 3800,
    pricePerSqft: 3,
    beds: 2,
    baths: 2,
    sqft: 1100,
    propertyType: "condo",
    status: "for-rent",
    badge: "new",
    images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80"],
    description: "Fully renovated apartment in trendy Yaletown near restaurants and shops.",
    features: ["Renovated Kitchen", "Hardwood Floors", "In-Suite Laundry", "Rooftop Access", "Pet Friendly"],
    agentId: "agent-002",
    lat: 49.2770,
    lng: -123.1230,
    yearBuilt: 2018,
    parking: 1,
    listedAt: "2026-03-08T08:00:00Z",
    daysOnMarket: 7,
  },
  {
    id: "rent-005",
    slug: "victoria-waterfront-rental",
    title: "Waterfront Condo in Victoria",
    address: "1002 Government St, Unit 502",
    city: "Victoria",
    neighborhood: "Inner Harbour",
    state: "BC",
    zipCode: "V8V 1X4",
    price: 3200,
    pricePerSqft: 3,
    beds: 2,
    baths: 2,
    sqft: 1050,
    propertyType: "condo",
    status: "for-rent",
    images: ["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
    description: "Beautiful waterfront rental with stunning harbour views in Victoria.",
    features: ["Harbour Views", "Balcony", "Gym", "Pool", "Secure Parking"],
    agentId: "agent-003",
    lat: 48.4280,
    lng: -123.3650,
    yearBuilt: 2017,
    parking: 1,
    listedAt: "2026-03-02T08:00:00Z",
    daysOnMarket: 12,
  },
  {
    id: "rent-006",
    slug: "burnaby-family-rental",
    title: "Modern Family Rental in Brentwood",
    address: "4500 Kingsway, Unit 1805",
    city: "Burnaby",
    neighborhood: "Brentwood",
    state: "BC",
    zipCode: "V5C 0E4",
    price: 2800,
    pricePerSqft: 2,
    beds: 3,
    baths: 2,
    sqft: 1200,
    propertyType: "condo",
    status: "for-rent",
    images: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80", "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80"],
    description: "Modern family rental in growing Brentwood neighbourhood with excellent amenities.",
    features: ["New Building", "Gym", "Pool", "Playground", "Skytrain Accessible"],
    agentId: "agent-004",
    lat: 49.2320,
    lng: -123.0100,
    yearBuilt: 2022,
    parking: 2,
    listedAt: "2026-03-12T08:00:00Z",
    daysOnMarket: 2,
  },
];

const RENT_FILTERS = [
  { label: "Price Range", options: ["Any", "Under $2,000", "$2,000 - $3,000", "$3,000 - $5,000", "$5,000+"] },
  { label: "Bedrooms", options: ["Any", "Studio", "1 Bed", "2 Beds", "3+ Beds"] },
  { label: "Lease Type", options: ["Any", "Fixed Term", "Month-to-Month", "6+ Months"] },
  { label: "Pets", options: ["Any", "Cat Friendly", "Dog Friendly", "No Pets"] },
];

export default function RentPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({ price: "", beds: "", pets: "" });

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
              <span className="text-[#d4af37] font-medium">British Columbia Rentals</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Find Your Rental in BC
            </h1>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto">
              From modern Vancouver condos to family homes — find the perfect rental property across British Columbia
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="sticky top-[80px] z-30 bg-background border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-10 py-4">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="relative flex-1 max-w-xl">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search location, building, or neighbourhood in BC..."
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-[#2D4F3C]"
                />
              </div>
              
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden"
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filters
              </Button>

              <div className="hidden lg:flex gap-3">
                <select className="px-4 py-2.5 rounded-lg border border-border bg-background text-sm cursor-pointer">
                  <option>Any Price</option>
                  <option>Under $2,000</option>
                  <option>$2,000 - $3,000</option>
                  <option>$3,000 - $5,000</option>
                  <option>$5,000+</option>
                </select>
                <select className="px-4 py-2.5 rounded-lg border border-border bg-background text-sm cursor-pointer">
                  <option>Any Beds</option>
                  <option>Studio</option>
                  <option>1 Bed</option>
                  <option>2 Beds</option>
                  <option>3+ Beds</option>
                </select>
                <select className="px-4 py-2.5 rounded-lg border border-border bg-background text-sm cursor-pointer">
                  <option>Any Type</option>
                  <option>Apartment</option>
                  <option>House</option>
                  <option>Townhouse</option>
                </select>
              </div>

              <div className="flex items-center gap-2 border-l border-border pl-4">
                <button onClick={() => setViewMode("grid")} className={`p-2 rounded ${viewMode === "grid" ? "bg-[#2D4F3C] text-white" : "text-muted-foreground"}`}>
                  <Grid3X3 className="w-5 h-5" />
                </button>
                <button onClick={() => setViewMode("list")} className={`p-2 rounded ${viewMode === "list" ? "bg-[#2D4F3C] text-white" : "text-muted-foreground"}`}>
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>

            {showFilters && (
              <div className="lg:hidden mt-4 grid grid-cols-2 gap-3 pb-4">
                {RENT_FILTERS.slice(0, 4).map((filter) => (
                  <select key={filter.label} className="px-3 py-2 rounded-lg border border-border bg-background text-sm">
                    {filter.options.map((opt) => (
                      <option key={opt}>{opt}</option>
                    ))}
                  </select>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-8">
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{RENTAL_LISTINGS.length}</span> BC rentals available
            </p>
            <select className="px-3 py-2 rounded-lg border border-border bg-background text-sm">
              <option>Newest First</option>
              <option>Price (Low to High)</option>
              <option>Price (High to Low)</option>
              <option>Bedrooms</option>
            </select>
          </div>

          <div className={viewMode === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
            {RENTAL_LISTINGS.map((listing) => (
              <a 
                key={listing.id}
                href={`/rent/${listing.slug}`}
                className="group rounded-lg border border-border bg-card overflow-hidden hover:border-[#a67c52] transition-all"
              >
                <div className="aspect-[16/10] overflow-hidden bg-muted relative">
                  <img 
                    src={listing.images[0]} 
                    alt={listing.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {listing.badge && (
                    <Badge className="absolute top-3 left-3 bg-[#2D4F3C] text-white">
                      {listing.badge}
                    </Badge>
                  )}
                  <button 
                    className="absolute right-3 top-3 p-2 bg-white/90 rounded-full"
                    onClick={(e) => e.preventDefault()}
                  >
                    <Heart className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
                <div className="p-4">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">{listing.propertyType} · {listing.neighborhood}, {listing.city}</p>
                  <h3 className="font-semibold text-foreground mt-1 group-hover:text-[#2D4F3C] transition-colors">{listing.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{listing.address}</p>
                  <div className="flex items-center gap-3 mt-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><Bed className="w-4 h-4" /> {listing.beds}</span>
                    <span className="flex items-center gap-1"><Bath className="w-4 h-4" /> {listing.baths}</span>
                    <span className="flex items-center gap-1"><Maximize2 className="w-4 h-4" /> {listing.sqft.toLocaleString()} sqft</span>
                  </div>
                  <p className="text-xl font-bold text-foreground mt-3">{formatPrice(listing.price)}<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Renter Tips - BC */}
        <div className="bg-[#FAF8F5] py-16">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <h2 className="font-display text-3xl font-bold text-foreground text-center mb-8">BC Renter Resources</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: "BC Tenancy Rights", description: "Understand your rights as a tenant in British Columbia under the Residential Tenancy Act" },
                { title: "Rental Application Tips", description: "How to make your rental application stand out in BC's competitive market" },
                { title: "Moving Checklist", description: "Everything you need for a smooth move within BC" },
              ].map((tip, i) => (
                <div key={i} className="p-6 rounded-lg border border-border bg-card">
                  <h3 className="font-semibold text-foreground mb-2">{tip.title}</h3>
                  <p className="text-sm text-muted-foreground">{tip.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA - BC */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-6 md:px-10 text-center">
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">Need Help Finding a BC Rental?</h2>
            <p className="text-muted-foreground mb-8">Our agents specialize in helping renters find their perfect BC home</p>
            <a href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-[#2D4F3C] text-white font-semibold rounded-lg hover:bg-[#234136] transition-colors">
              Contact Us <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}