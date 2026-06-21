"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, MapPin, Grid3X3, Map as MapIcon, Heart, Bed, Bath, Maximize2, Mountain, Building, AlertCircle, SortAsc, ArrowUpDown } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { MOCK_LISTINGS, formatPrice } from "@/data/mock";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Listing } from "@/types";

const PROPERTY_TYPES = [
  { value: "", label: "All Types" },
  { value: "house", label: "House" },
  { value: "condo", label: "Condo" },
  { value: "townhouse", label: "Townhouse" },
  { value: "penthouse", label: "Penthouse" },
  { value: "land", label: "Land" },
];

const BC_CITIES = [
  { value: "", label: "All Cities" },
  { value: "surrey", label: "Surrey" },
  { value: "delta", label: "Delta" },
  { value: "langley", label: "Langley" },
  { value: "aldergrove", label: "Aldergrove" },
  { value: "abbotsford", label: "Abbotsford" },
  { value: "mission", label: "Mission" },
  { value: "chilliwack", label: "Chilliwack" },
  { value: "vancouver", label: "Vancouver" },
  { value: "burnaby", label: "Burnaby" },
  { value: "richmond", label: "Richmond" },
  { value: "coquitlam", label: "Coquitlam" },
  { value: "port-moody", label: "Port Moody" },
  { value: "north-vancouver", label: "North Vancouver" },
  { value: "west-vancouver", label: "West Vancouver" },
  { value: "new-westminster", label: "New Westminster" },
  { value: "victoria", label: "Victoria" },
];

const PRICE_RANGES = [
  { value: "", label: "Any Price" },
  { value: "0-500000", label: "Under $500K" },
  { value: "500000-1000000", label: "$500K - $1M" },
  { value: "1000000-2000000", label: "$1M - $2M" },
  { value: "2000000-3000000", label: "$2M - $3M" },
  { value: "3000000-5000000", label: "$3M - $5M" },
  { value: "5000000-", label: "$5M+" },
];

const BEDROOMS = [
  { value: "", label: "Any" },
  { value: "1", label: "1+" },
  { value: "2", label: "2+" },
  { value: "3", label: "3+" },
  { value: "4", label: "4+" },
  { value: "5", label: "5+" },
];

const BATHROOMS = [
  { value: "", label: "Any" },
  { value: "1", label: "1+" },
  { value: "2", label: "2+" },
  { value: "3", label: "3+" },
  { value: "4", label: "4+" },
];

const SORT_OPTIONS = [
  { value: "fraser-first", label: "Fraser Valley Priority (Surrey, Delta, Langley...)" },
  { value: "newest", label: "Newest First" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "sqft-desc", label: "Largest First" },
];

const PRIORITY_CITIES = ["surrey", "delta", "langley", "aldergrove", "abbotsford", "mission", "chilliwack"];

export default function ListingsPage() {
  const [listings, setListings] = useState<Listing[]>(MOCK_LISTINGS);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());

  const [searchQuery, setSearchQuery] = useState("");
  const [city, setCity] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [sortBy, setSortBy] = useState("fraser-first");

  useEffect(() => {
    let filtered = [...MOCK_LISTINGS];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (l) =>
          l.title.toLowerCase().includes(query) ||
          l.neighborhood.toLowerCase().includes(query) ||
          l.city.toLowerCase().includes(query) ||
          l.address.toLowerCase().includes(query)
      );
    }

    if (city) {
      filtered = filtered.filter((l) => l.city.toLowerCase() === city.toLowerCase());
    }

    if (propertyType) {
      filtered = filtered.filter((l) => l.propertyType === propertyType);
    }

    if (priceRange) {
      const [min, max] = priceRange.split("-").map((v) => (v ? Number(v) : Infinity));
      filtered = filtered.filter((l) => l.price >= min && l.price <= max);
    }

    if (bedrooms) {
      filtered = filtered.filter((l) => l.beds >= Number(bedrooms));
    }

    if (bathrooms) {
      filtered = filtered.filter((l) => l.baths >= Number(bathrooms));
    }

    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "sqft-desc":
        filtered.sort((a, b) => b.sqft - a.sqft);
        break;
      case "fraser-first":
        filtered.sort((a, b) => {
          const aCity = a.city.toLowerCase();
          const bCity = b.city.toLowerCase();
          const aIndex = PRIORITY_CITIES.indexOf(aCity);
          const bIndex = PRIORITY_CITIES.indexOf(bCity);
          if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
          if (aIndex !== -1) return -1;
          if (bIndex !== -1) return 1;
          return aCity.localeCompare(bCity);
        });
        break;
      default:
        filtered.sort((a, b) => new Date(b.listedAt).getTime() - new Date(a.listedAt).getTime());
    }

    setListings(filtered);
  }, [searchQuery, city, propertyType, priceRange, bedrooms, bathrooms, sortBy]);

  const toggleSave = (id: string) => {
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const clearFilters = () => {
    setSearchQuery("");
    setCity("");
    setPropertyType("");
    setPriceRange("");
    setBedrooms("");
    setBathrooms("");
    setSortBy("fraser-first");
  };

  const hasActiveFilters = searchQuery || city || propertyType || priceRange || bedrooms || bathrooms;

  return (
    <>
      <SiteHeader />

      <main className="min-h-screen bg-background">
        {/* Hero Banner */}
        <div className="relative bg-[#1a365d] text-white py-12 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0 100 Q 25 50, 50 100 T 100 100 Z" fill="currentColor" />
            </svg>
          </div>
          <div className="relative max-w-7xl mx-auto px-6 md:px-10 text-center">
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
              Metro Vancouver & BC Property Listings
            </h1>
            <p className="text-gray-300">
              {listings.length} listings available
            </p>
          </div>
        </div>

        {/* Filter & Sort Bar */}
        <div className="sticky top-[80px] z-30 bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 md:px-10 py-3">
            <div className="flex flex-col lg:flex-row gap-3 items-start lg:items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by city, neighbourhood, or MLS #..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#2D4F3C] focus:border-transparent"
                />
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2">
                <ArrowUpDown className="w-4 h-4 text-gray-500" />
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#2D4F3C]"
                >
                  {SORT_OPTIONS.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
              </div>

              {/* Filter Toggle */}
              <div className="flex items-center gap-3 lg:hidden">
                <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className={cn("flex items-center gap-2 px-4 py-2 rounded-lg border", showFilters ? "bg-[#2D4F3C] text-white border-[#2D4F3C]" : "border-gray-200")}
                >
                  <SlidersHorizontal className="w-4 h-4" /> Filters
                </button>
                <div className="flex items-center gap-1 border-l border-gray-200 pl-3">
                  <button onClick={() => setViewMode("grid")} className={cn("p-2 rounded", viewMode === "grid" ? "bg-gray-100" : "")}>
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button onClick={() => setViewMode("list")} className={cn("p-2 rounded", viewMode === "list" ? "bg-gray-100" : "")}>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Desktop Filters */}
              <div className="hidden lg:flex items-center gap-3">
                <select value={city} onChange={(e) => setCity(e.target.value)} className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm min-w-[130px]">
                  {BC_CITIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
                <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)} className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm">
                  {PROPERTY_TYPES.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
                <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)} className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm">
                  {PRICE_RANGES.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
                <select value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm">
                  {BEDROOMS.map((opt) => <option key={opt.value} value={opt.value}>{opt.label} bd</option>)}
                </select>
                <div className="flex items-center gap-1 border-l border-gray-200 pl-3">
                  <button onClick={() => setViewMode("grid")} className={cn("p-2 rounded transition-colors", viewMode === "grid" ? "bg-[#2D4F3C] text-white" : "hover:bg-gray-100")}>
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button onClick={() => setViewMode("list")} className={cn("p-2 rounded transition-colors", viewMode === "list" ? "bg-[#2D4F3C] text-white" : "hover:bg-gray-100")}>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Filters Panel */}
            <AnimatePresence>
              {showFilters && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="lg:hidden overflow-hidden mt-3 pt-3 border-t border-gray-100">
                  <div className="grid grid-cols-2 gap-3">
                    <select value={city} onChange={(e) => setCity(e.target.value)} className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm">
                      {BC_CITIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                    </select>
                    <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)} className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm">
                      {PROPERTY_TYPES.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                    </select>
                    <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)} className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm">
                      {PRICE_RANGES.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                    </select>
                    <select value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm">
                      {BEDROOMS.map((opt) => <option key={opt.value} value={opt.value}>{opt.label} bd</option>)}
                    </select>
                  </div>
                  {hasActiveFilters && <button onClick={clearFilters} className="text-sm text-[#2D4F3C] hover:underline mt-2">Clear all filters</button>}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Results Bar */}
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-3 flex items-center justify-between bg-gray-50">
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-900">{listings.length}</span> listings found
            {city && <span className="ml-1"> in {BC_CITIES.find(c => c.value === city)?.label}</span>}
          </p>
          {hasActiveFilters && (
            <button onClick={clearFilters} className="text-sm text-[#2D4F3C] hover:underline">
              Clear filters
            </button>
          )}
        </div>

        {/* Listings Grid */}
        <div className="max-w-7xl mx-auto px-6 md:px-10 pb-16">
          {listings.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-lg text-gray-500 mb-4">No properties match your criteria.</p>
              <button onClick={clearFilters} className="text-[#2D4F3C] hover:underline">Clear filters to see more</button>
            </div>
          ) : (
            <div className={cn(viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4")}>
              {listings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} viewMode={viewMode} isSaved={savedIds.has(listing.id)} onSave={() => toggleSave(listing.id)} />
              ))}
            </div>
          )}
        </div>
      </main>

      <SiteFooter />
    </>
  );
}

interface ListingCardProps {
  listing: Listing;
  viewMode: "grid" | "list";
  isSaved: boolean;
  onSave: () => void;
}

function ListingCard({ listing, viewMode, isSaved, onSave }: ListingCardProps) {
  const badgeConfig: Record<string, { label: string; className: string }> = {
    new: { label: "New", className: "bg-[#2D4F3C] text-white" },
    featured: { label: "Featured", className: "bg-[#a67c52] text-white" },
    exclusive: { label: "Exclusive", className: "bg-[#1a365d] text-white" },
    "price-reduced": { label: "Reduced", className: "bg-red-500 text-white" },
  };

  const priorityLabel = PRIORITY_CITIES.includes(listing.city.toLowerCase()) ? "★ FVR" : "";

  if (viewMode === "list") {
    return (
      <a href={`/listings/${listing.slug}`} className="flex gap-4 p-4 rounded-lg border border-gray-200 bg-white hover:border-[#a67c52] transition-colors group">
        <div className="w-40 h-28 shrink-0 rounded-md overflow-hidden bg-gray-100">
          <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div>
              {listing.badge && badgeConfig[listing.badge] && (
                <span className={cn("inline-block px-2 py-0.5 text-xs font-semibold rounded mb-1", badgeConfig[listing.badge].className)}>
                  {badgeConfig[listing.badge].label}
                </span>
              )}
              <h3 className="font-semibold text-gray-900 group-hover:text-[#2D4F3C]">{listing.title}</h3>
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <MapPin className="w-3 h-3" /> {listing.city}, BC
                {priorityLabel && <span className="ml-1 text-amber-600">{priorityLabel}</span>}
              </p>
            </div>
            <p className="text-xl font-bold text-gray-900">{formatPrice(listing.price)}</p>
          </div>
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
            <span className="flex items-center gap-1"><Bed className="w-4 h-4" /> {listing.beds} bd</span>
            <span className="flex items-center gap-1"><Bath className="w-4 h-4" /> {listing.baths} ba</span>
            <span className="flex items-center gap-1"><Maximize2 className="w-4 h-4" /> {listing.sqft.toLocaleString()} sqft</span>
          </div>
        </div>
      </a>
    );
  }

  return (
    <a href={`/listings/${listing.slug}`} className="group block rounded-lg border border-gray-200 bg-white overflow-hidden hover:border-[#a67c52] hover:shadow-lg transition-all">
      <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
        <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        {listing.badge && badgeConfig[listing.badge] && (
          <span className={cn("absolute left-3 top-3 px-2 py-1 text-xs font-semibold rounded", badgeConfig[listing.badge].className)}>
            {badgeConfig[listing.badge].label}
          </span>
        )}
        {priorityLabel && (
          <span className="absolute right-3 top-3 px-2 py-1 text-xs font-semibold rounded bg-amber-500 text-white">
            FVR Priority
          </span>
        )}
        <button onClick={(e) => { e.preventDefault(); onSave(); }} className="absolute right-3 bottom-3 p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
          <Heart className={cn("w-4 h-4", isSaved ? "fill-red-500 text-red-500" : "text-gray-600")} />
        </button>
      </div>
      <div className="p-4">
        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">{listing.propertyType}</p>
        <h3 className="font-semibold text-gray-900 group-hover:text-[#2D4F3C] mb-1 line-clamp-1">{listing.title}</h3>
        <p className="text-sm text-gray-500 mb-3">{listing.address}</p>
        <div className="flex items-center gap-3 text-sm text-gray-500 border-t border-gray-100 pt-3">
          <span className="flex items-center gap-1"><Bed className="w-4 h-4" /> {listing.beds}</span>
          <span className="flex items-center gap-1"><Bath className="w-4 h-4" /> {listing.baths}</span>
          <span className="flex items-center gap-1"><Maximize2 className="w-4 h-4" /> {listing.sqft.toLocaleString()}</span>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <p className="text-lg font-bold text-gray-900">{formatPrice(listing.price)}</p>
          <span className="text-sm text-gray-400">View</span>
        </div>
      </div>
    </a>
  );
}