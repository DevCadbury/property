"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, ArrowRight, Building, Waves, Home, Sparkles, Users, TrendingUp, Mountain, TreePine, Building2 } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { MOCK_LISTINGS, MOCK_NEIGHBORHOODS, formatPrice } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const PROPERTY_CATEGORIES = [
  { 
    id: "luxury", 
    name: "Luxury Homes", 
    icon: Sparkles, 
    count: 45,
    description: "Premium properties with high-end finishes",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80"
  },
  { 
    id: "waterfront", 
    name: "BC Waterfront", 
    icon: Waves, 
    count: 32,
    description: "Ocean and lake front properties",
    image: "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=600&q=80"
  },
  { 
    id: "family", 
    name: "Family Homes", 
    icon: Home, 
    count: 68,
    description: "Spacious homes in family-friendly areas",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80"
  },
  { 
    id: "investment", 
    name: "Investment", 
    icon: TrendingUp, 
    count: 28,
    description: "Properties with high rental potential",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80"
  },
];

const BUYING_STEPS = [
  { number: 1, title: "Get Pre-Approved", description: "Understand your budget and strengthen your offer" },
  { number: 2, title: "Search BC Properties", description: "Browse listings and tour homes across BC" },
  { number: 3, title: "Make an Offer", description: "Submit a competitive offer with your agent's guidance" },
  { number: 4, title: "Complete Conditions", description: "Home inspection, financing, and legal reviews" },
  { number: 5, title: "Close the Deal", description: "Sign documents and receive your keys" },
];

const BC_CITIES = [
  { name: "Vancouver", count: 156 },
  { name: "Richmond", count: 89 },
  { name: "Burnaby", count: 78 },
  { name: "Surrey", count: 65 },
  { name: "Victoria", count: 54 },
  { name: "Coquitlam", count: 45 },
  { name: "Langley", count: 42 },
  { name: "Delta", count: 38 },
];

export default function BuyPage() {
  const [searchLocation, setSearchLocation] = useState("");

  return (
    <>
      <SiteHeader />

      <main className="min-h-screen bg-background">
        {/* Hero Section - BC Focused */}
        <div className="relative bg-[#1a365d] text-white py-24 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <Mountain className="w-full h-full" />
          </div>
          <div className="relative max-w-7xl mx-auto px-6 md:px-10">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-4xl md:text-5xl font-bold mb-4 text-center"
            >
              Find Your Dream Home in <span className="text-[#d4af37]">British Columbia</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-gray-200 text-center mb-8 max-w-2xl mx-auto"
            >
              From Vancouver penthouses to Victoria waterfronts — discover exceptional properties across BC&apos;s most desirable communities
            </motion.p>
            
            {/* Search Bar */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-2xl mx-auto"
            >
              <div className="flex bg-white rounded-lg overflow-hidden shadow-2xl">
                <div className="relative flex-1">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by city or neighbourhood in BC..."
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 text-gray-900 placeholder:text-gray-400 focus:outline-none"
                  />
                </div>
                <a 
                  href="/listings"
                  className="px-8 py-4 bg-[#2D4F3C] hover:bg-[#234136] text-white font-semibold transition-colors flex items-center gap-2"
                >
                  <Search className="w-5 h-5" />
                  Search
                </a>
              </div>
            </motion.div>

            {/* Quick City Links */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-2 mt-6"
            >
              <span className="text-gray-400 text-sm">Quick Search:</span>
              {BC_CITIES.slice(0, 4).map((city) => (
                <a 
                  key={city.name}
                  href={`/listings?city=${city.name.toLowerCase()}`}
                  className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-full text-sm text-white transition-colors"
                >
                  {city.name} ({city.count})
                </a>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Property Categories */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <h2 className="font-display text-3xl font-bold text-foreground text-center mb-4">Browse by Category</h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">Find properties that match your lifestyle and goals across BC</p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {PROPERTY_CATEGORIES.map((category, i) => (
                <a 
                  key={category.id}
                  href={`/listings?type=${category.id}`}
                  className="group relative rounded-lg overflow-hidden border border-border bg-card hover:border-[#a67c52] transition-all hover:shadow-lg"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <div className="flex items-center gap-2 mb-1">
                      <category.icon className="w-4 h-4" />
                      <span className="font-semibold">{category.name}</span>
                    </div>
                    <p className="text-sm text-white/80">{category.count} BC properties</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Listings */}
        <div className="bg-[#FAF8F5] py-16">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="font-display text-3xl font-bold text-foreground">Featured BC Properties</h2>
                <p className="text-muted-foreground mt-2">Handpicked listings from across British Columbia</p>
              </div>
              <a href="/listings" className="hidden md:flex items-center gap-2 text-[#2D4F3C] font-semibold hover:underline">
                View All <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MOCK_LISTINGS.slice(0, 6).map((listing) => (
                <a 
                  key={listing.id}
                  href={`/listings/${listing.slug}`}
                  className="group rounded-lg border border-border bg-card overflow-hidden hover:border-[#a67c52] transition-all"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-muted">
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
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">{listing.propertyType} · {listing.neighborhood}, {listing.city}</p>
                    <h3 className="font-semibold text-foreground mt-1 group-hover:text-[#2D4F3C] transition-colors">{listing.title}</h3>
                    <div className="flex items-center gap-3 mt-3 text-sm text-muted-foreground">
                      <span>{listing.beds} bd</span>
                      <span>{listing.baths} ba</span>
                      <span>{listing.sqft.toLocaleString()} sqft</span>
                    </div>
                    <p className="text-xl font-bold text-foreground mt-3">{formatPrice(listing.price)}</p>
                  </div>
                </a>
              ))}
            </div>

            <div className="text-center mt-8 md:hidden">
              <a href="/listings" className="text-[#2D4F3C] font-semibold hover:underline">View All Properties →</a>
            </div>
          </div>
        </div>

        {/* Buying Process - BC Focused */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">Your BC Buying Journey</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">From start to finish, we&apos;re here to guide you through every step of purchasing your BC home</p>
            </div>

            <div className="grid md:grid-cols-5 gap-4">
              {BUYING_STEPS.map((step, i) => (
                <div key={i} className="relative p-6 rounded-lg border border-border bg-card text-center">
                  <div className="w-10 h-10 rounded-full bg-[#2D4F3C] text-white flex items-center justify-center font-bold mx-auto mb-4">
                    {step.number}
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                  {i < BUYING_STEPS.length - 1 && (
                    <ArrowRight className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  )}
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <a href="/guide/buyers" className="inline-flex items-center gap-2 px-6 py-3 bg-[#2D4F3C] text-white font-semibold rounded-lg hover:bg-[#234136] transition-colors">
                Full Buyer&apos;s Guide <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* BC Financing Overview */}
        <div className="bg-[#FAF8F5] py-16">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-display text-3xl font-bold text-foreground mb-4">Financing Your BC Home</h2>
                <p className="text-muted-foreground mb-6">
                  Understanding your financing options is crucial for BC real estate. We connect you with trusted mortgage professionals who specialize in British Columbia properties.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3 text-foreground">
                    <div className="w-2 h-2 rounded-full bg-[#2D4F3C]" /> Pre-approval in as little as 24 hours
                  </li>
                  <li className="flex items-center gap-3 text-foreground">
                    <div className="w-2 h-2 rounded-full bg-[#2D4F3C]" /> Competitive rates for BC buyers
                  </li>
                  <li className="flex items-center gap-3 text-foreground">
                    <div className="w-2 h-2 rounded-full bg-[#2D4F3C]" /> BC Property Transfer Tax exemptions available
                  </li>
                  <li className="flex items-center gap-3 text-foreground">
                    <div className="w-2 h-2 rounded-full bg-[#2D4F3C]" /> CMHC insured and conventional options
                  </li>
                </ul>
                <a href="/contact" className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#2D4F3C] text-[#2D4F3C] font-semibold rounded-lg hover:bg-[#2D4F3C] hover:text-white transition-colors">
                  Get Pre-Approved
                </a>
              </div>
              <div className="aspect-[4/3] rounded-lg overflow-hidden bg-muted">
                <img 
                  src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80"
                  alt="BC Mortgage Financing"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-6 md:px-10 text-center">
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">Ready to Find Your BC Home?</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Our expert agents are ready to help you find the perfect property in British Columbia
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/listings" className="px-8 py-4 bg-[#2D4F3C] text-white font-semibold rounded-lg hover:bg-[#234136] transition-colors">
                Browse BC Listings
              </a>
              <a href="/contact" className="px-8 py-4 border-2 border-[#2D4F3C] text-[#2D4F3C] font-semibold rounded-lg hover:bg-[#2D4F3C] hover:text-white transition-colors">
                Talk to a BC Agent
              </a>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}