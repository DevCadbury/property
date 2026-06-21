"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { MOCK_LISTINGS, formatPrice } from "@/data/mock";
import Link from "next/link";

// Dynamically import Leaflet to avoid SSR issues
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

// Fix Leaflet marker icons
const fixLeafletIcons = () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const L = require("leaflet");
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  });
};

function MapContent() {
  const [activePin, setActivePin] = useState<string | null>(null);
  const [hoveredListing, setHoveredListing] = useState<string | null>(null);
  const mapRef = useRef<any>(null);
  const [leafletLoaded, setLeafletLoaded] = useState(false);

  // Coordinates for BC/Vancouver area listings
  const getListingCoords = (index: number) => {
    const baseCoords = [
      { lng: -123.1295, lat: 49.2883 }, // Coal Harbour
      { lng: -123.1207, lat: 49.2827 }, // Downtown
      { lng: -123.1550, lat: 49.2505 }, // Kitsilano
      { lng: -123.1130, lat: 49.2750 }, // Yaletown
      { lng: -123.1400, lat: 49.2650 }, // False Creek
      { lng: -123.1800, lat: 49.2350 }, // Arbutus
      { lng: -123.0500, lat: 49.2100 }, // Richmond
      { lng: -122.9500, lat: 49.3000 }, // Burnaby
    ];
    return baseCoords[index % baseCoords.length];
  };

  const mapListings = MOCK_LISTINGS.slice(0, 8);

  const handlePinClick = (listingId: string) => {
    setActivePin(listingId === activePin ? null : listingId);
  };

  const handleCardClick = (listingId: string, index: number) => {
    setActivePin(listingId);
    const coords = getListingCoords(index);
    if (mapRef.current) {
      mapRef.current.setView([coords.lat, coords.lng], 13);
    }
  };

  const activeListing = mapListings.find(l => l.id === activePin);
  const activeIndex = mapListings.findIndex(l => l.id === activePin);

  useEffect(() => {
    fixLeafletIcons();
    setLeafletLoaded(true);
  }, []);

  // Custom price marker
  const createCustomIcon = (price: number, isActive: boolean, isHovered: boolean) => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const L = require("leaflet");
    const color = isActive || isHovered ? "#2D4F3C" : "#1f2937";
    const priceK = (price / 1000).toFixed(0);
    return L.divIcon({
      className: "custom-marker",
      html: `<div style="
        background: ${color};
        color: white;
        padding: 8px 14px;
        border-radius: 24px;
        font-size: 12px;
        font-weight: 700;
        white-space: nowrap;
        box-shadow: 0 4px 12px rgba(0,0,0,0.35);
        transform: translateX(-50%);
        border: 2px solid white;
      ">$${priceK}K</div>`,
      iconSize: [80, 36],
      iconAnchor: [40, 36],
    });
  };

  if (!leafletLoaded) {
    return (
      <section className="py-16 md:py-24 bg-[#faf9f6]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
          <div className="min-h-[400px] lg:min-h-[500px] bg-gray-100 rounded-xl flex items-center justify-center border border-gray-200">
            <div className="text-center">
              <div className="animate-spin h-8 w-8 border-4 border-[#2D4F3C] border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-500">Loading map...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-[#faf9f6]" id="map-section">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
        
        {/* Section Header - PROPERLY ALIGNED */}
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#2D4F3C] mb-2">
            Explore by Map
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Discover by Neighbourhood
          </h2>
          <p className="text-base text-gray-600 max-w-xl">
            Browse properties geographically. Click any pin to preview the listing — then dive deeper.
          </p>
        </div>

        {/* Gold Divider */}
        <div className="w-16 h-1 bg-[#A67C52] mb-8"></div>

        {/* Main Map Container with Frames */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          
          {/* Map and List Split */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px]">
            
            {/* Map Frame */}
            <div className="relative min-h-[400px] lg:min-h-[520px] bg-gray-100">
              <MapContainer
                ref={mapRef}
                center={[49.2650, -123.1207]}
                zoom={11}
                style={{ width: "100%", height: "100%" }}
                scrollWheelZoom={true}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
                {mapListings.map((listing, i) => {
                  const coords = getListingCoords(i);
                  const isActive = activePin === listing.id;
                  const isHovered = hoveredListing === listing.id;
                  
                  return (
                    <Marker
                      key={listing.id}
                      position={[coords.lat, coords.lng]}
                      icon={createCustomIcon(listing.price, isActive, isHovered)}
                      eventHandlers={{
                        click: () => handlePinClick(listing.id),
                        mouseover: () => setHoveredListing(listing.id),
                        mouseout: () => setHoveredListing(null),
                      }}
                    >
                      <Popup>
                        <div className="p-2 min-w-[180px]">
                          <img 
                            src={listing.images[0]} 
                            alt={listing.title}
                            className="w-full h-20 object-cover rounded mb-2"
                          />
                          <h3 className="font-semibold text-sm">{listing.title}</h3>
                          <p className="text-xs text-gray-500">{listing.neighborhood}</p>
                          <p className="font-bold text-[#2D4F3C] mt-1">{formatPrice(listing.price)}</p>
                        </div>
                      </Popup>
                    </Marker>
                  );
                })}
              </MapContainer>

              {/* Map Overlay Frame - Top Left */}
              <div className="absolute top-4 left-4 z-[1000]">
                <div className="bg-white/95 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg border border-gray-200">
                  <p className="text-xs font-semibold text-gray-700">Vancouver Region</p>
                </div>
              </div>

              {/* Map Controls Frame - Bottom Right */}
              <div className="absolute bottom-4 right-4 z-[1000] flex flex-col gap-2">
                <button className="w-8 h-8 bg-white rounded-lg shadow-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </button>
                <button className="w-8 h-8 bg-white rounded-lg shadow-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14" />
                  </svg>
                </button>
              </div>

              {/* Frame Border Effect - Top */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2D4F3C] via-[#A67C52] to-[#2D4F3C]"></div>
              
              {/* Frame Border Effect - Bottom Left Label */}
              <div className="absolute bottom-4 left-4 z-[1000]">
                <div className="bg-white/90 backdrop-blur-sm rounded px-2 py-1 text-[10px] text-gray-500 border">
                  © OpenStreetMap
                </div>
              </div>
            </div>

            {/* Listing Cards Frame */}
            <div className="bg-white border-l border-gray-200 flex flex-col">
              {/* Cards Header Frame */}
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {activePin ? "Property Selected" : `${mapListings.length} Properties`}
                    </h3>
                    {!activePin && (
                      <p className="text-xs text-gray-500 mt-0.5">Click a pin or card to view</p>
                    )}
                  </div>
                  {activePin && (
                    <button 
                      onClick={() => setActivePin(null)}
                      className="text-xs text-[#2D4F3C] hover:underline font-medium"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {/* Cards List Frame */}
              <div className="flex-1 overflow-y-auto p-3 space-y-2 scrollbar-luxury max-h-[400px]">
                {mapListings.map((listing, index) => {
                  const isActive = activePin === listing.id;
                  const isHovered = hoveredListing === listing.id;
                  
                  return (
                    <button
                      key={listing.id}
                      type="button"
                      onClick={() => handleCardClick(listing.id, index)}
                      onMouseEnter={() => setHoveredListing(listing.id)}
                      onMouseLeave={() => setHoveredListing(null)}
                      className={`
                        w-full flex items-center gap-3 p-3 rounded-xl text-left
                        transition-all duration-200 border-2
                        ${isActive 
                          ? "bg-[#2D4F3C]/5 border-[#2D4F3C] shadow-md" 
                          : isHovered 
                            ? "bg-gray-50 border-gray-200" 
                            : "bg-white border-gray-100 hover:border-[#A67C52]"
                        }
                      `}
                    >
                      {/* Image Frame */}
                      <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                        <img
                          src={listing.images[0]}
                          alt=""
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                        {listing.badge && (
                          <span className="absolute top-1 left-1 text-[9px] font-bold px-1.5 py-0.5 bg-[#2D4F3C] text-white rounded">
                            {listing.badge}
                          </span>
                        )}
                      </div>
                      
                      {/* Content Frame */}
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {listing.title}
                        </p>
                        <p className="text-xs text-gray-500 truncate mt-0.5">
                          {listing.neighborhood}
                        </p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <p className="text-sm font-bold text-[#2D4F3C]">
                            {formatPrice(listing.price)}
                          </p>
                          <span className="text-[10px] text-gray-400">
                            {listing.beds}bd • {listing.baths}ba
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* View All Button Frame */}
              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <Link 
                  href="/listings"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-[#2D4F3C] text-white rounded-lg font-semibold text-sm hover:bg-[#234136] transition-colors shadow-md"
                >
                  View All Listings
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Active Property Preview Card */}
        {activeListing && (
          <div className="mt-6 bg-white rounded-xl shadow-2xl border-2 border-[#2D4F3C] p-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Image Frame */}
              <div className="w-full md:w-64 h-40 shrink-0 rounded-xl overflow-hidden bg-gray-100 shadow-inner">
                <img 
                  src={activeListing.images[0]} 
                  alt={activeListing.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Details Frame */}
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div>
                    <span className="text-xs font-semibold text-[#2D4F3C] uppercase tracking-wider">
                      {activeListing.neighborhood}
                    </span>
                    <h4 className="text-xl font-bold text-gray-900 mt-1">
                      {activeListing.title}
                    </h4>
                    <p className="text-gray-600 mt-1 text-sm">
                      {activeListing.address}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-[#2D4F3C]">
                      {formatPrice(activeListing.price)}
                    </p>
                    <p className="text-sm text-gray-500">
                      ${activeListing.pricePerSqft}/sqft
                    </p>
                  </div>
                </div>
                
                {/* Specs Frame */}
                <div className="flex items-center gap-6 mt-4 text-sm text-gray-600 py-3 border-t border-b border-gray-100">
                  <span className="flex items-center gap-1.5">
                    <strong className="text-gray-900">{activeListing.beds}</strong> beds
                  </span>
                  <span className="flex items-center gap-1.5">
                    <strong className="text-gray-900">{activeListing.baths}</strong> baths
                  </span>
                  <span className="flex items-center gap-1.5">
                    <strong className="text-gray-900">{activeListing.sqft.toLocaleString()}</strong> sqft
                  </span>
                  <span className="flex items-center gap-1.5">
                    <strong className="text-gray-900">{activeListing.propertyType}</strong>
                  </span>
                </div>

                {/* Actions Frame */}
                <div className="flex flex-wrap items-center gap-3 mt-5">
                  <Link 
                    href={`/listings/${activeListing.slug}`}
                    className="px-5 py-2.5 bg-[#2D4F3C] text-white rounded-lg font-medium text-sm hover:bg-[#234136] transition-colors shadow-md"
                  >
                    View Details
                  </Link>
                  <button 
                    className="px-5 py-2.5 border-2 border-gray-200 text-gray-700 rounded-lg font-medium text-sm hover:bg-gray-50 hover:border-gray-300 transition-colors"
                  >
                    Save Property
                  </button>
                  <button className="px-5 py-2.5 border-2 border-gray-200 text-gray-700 rounded-lg font-medium text-sm hover:bg-gray-50 hover:border-gray-300 transition-colors">
                    Contact Agent
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Legend Frame */}
        <div className="mt-6 flex flex-wrap items-center gap-6 text-xs text-gray-500 bg-white/80 rounded-lg px-4 py-3 border border-gray-200">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-gray-900"></div>
            <span>Available Property</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[#2D4F3C]"></div>
            <span>Selected Property</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-gray-900 text-white rounded-full text-[10px] font-bold">$500K</span>
            <span>Price Marker</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function MapSection() {
  return <MapContent />;
}