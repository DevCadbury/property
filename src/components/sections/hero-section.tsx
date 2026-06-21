"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Search, MapPin, Phone, ArrowRight } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  const router = useRouter();
  const [intentState, setIntentState] = useState<"none" | "buying" | "selling">("none");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchError, setSearchError] = useState("");

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setSearchError("Please enter a city, neighbourhood, or MLS number.");
      return;
    }
    router.push("/listings?q=" + encodeURIComponent(searchQuery.trim()));
  };

  return (
    <section className="relative overflow-hidden min-h-screen flex items-center">
      {/* Full-bleed real estate background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&h=1080&fit=crop&q=85"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center"
        />
        {/* Rich chocolate overlay — darker on left, lighter toward right */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, rgba(28,14,8,0.97) 0%, rgba(44,24,16,0.92) 45%, rgba(44,24,16,0.72) 75%, rgba(44,24,16,0.45) 100%)",
          }}
        />
        {/* Subtle gold radial glow top-right */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 85% 20%, rgba(212,175,55,0.12) 0%, transparent 55%)",
          }}
        />
        {/* Mint glow bottom-left */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 8% 88%, rgba(62,180,137,0.10) 0%, transparent 45%)",
          }}
        />
      </div>

      {/* Thin gold top border accent */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

      {/* Bottom wave transition */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 72" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-auto">
          <path d="M0 72V36C240 72 480 72 720 72C960 72 1200 52 1440 36V72H0Z" fill="#FAF8F5" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-24 md:py-32">
        <div className="max-w-3xl">
          {/* Location pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 mb-6">
            <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-[#D4AF37] text-xs font-semibold tracking-widest uppercase">Metro Vancouver &amp; Fraser Valley</span>
          </div>

          {/* Main headline */}
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-4">
            Discover<br />
            <span className="text-[#D4AF37]">Your Next</span><br />
            Home
          </h1>

          {/* Gold rule */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-[2px] bg-[#D4AF37]" />
            <span className="text-white/50 text-xs tracking-widest uppercase">Results Driven</span>
            <div className="w-12 h-[2px] bg-[#3EB489]" />
          </div>

          {/* Intent panels */}
          <AnimatePresence mode="wait">
            {intentState === "none" && (
              <motion.div
                key="initial"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.22 }}
              >
                <p className="text-white/70 text-sm md:text-base font-medium tracking-widest uppercase mb-5 inline-flex items-center gap-3">
                  <span className="w-6 h-[1px] bg-[#3EB489]" />
                  Are You Interested In
                  <span className="w-6 h-[1px] bg-[#3EB489]" />
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => setIntentState("buying")}
                    className="group flex items-center justify-between gap-4 px-8 py-4 bg-[#D4AF37] text-[#2C1810] rounded-2xl font-bold text-lg hover:bg-[#C9A227] transition-all shadow-xl hover:shadow-[0_8px_32px_rgba(212,175,55,0.35)] hover:-translate-y-0.5"
                  >
                    <span>BUYING</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button
                    onClick={() => setIntentState("selling")}
                    className="group flex items-center justify-between gap-4 px-8 py-4 bg-transparent border-2 border-[#3EB489] text-white rounded-2xl font-bold text-lg hover:bg-[#3EB489]/15 transition-all hover:-translate-y-0.5"
                  >
                    <span>SELLING</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            )}

            {intentState === "buying" && (
              <motion.div
                key="buying"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.22 }}
              >
                <button
                  onClick={() => { setIntentState("none"); setSearchQuery(""); setSearchError(""); }}
                  className="flex items-center gap-1.5 text-white/50 hover:text-[#D4AF37] text-xs tracking-widest uppercase mb-5 transition-colors"
                >
                  ← Back
                </button>
                <p className="text-[#D4AF37] text-xs font-semibold tracking-widest uppercase mb-3">Find Your Perfect Property</p>
                <div className="flex gap-2 mb-3 max-w-lg">
                  <input
                    type="text"
                    placeholder="City, neighbourhood, or MLS number"
                    value={searchQuery}
                    onChange={(e) => { setSearchQuery(e.target.value); setSearchError(""); }}
                    onKeyDown={(e) => { if (e.key === "Enter") handleSearch(); }}
                    className="flex-1 px-5 py-3.5 bg-white/95 backdrop-blur rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] text-sm font-medium"
                  />
                  <button
                    onClick={handleSearch}
                    className="px-5 py-3.5 bg-[#D4AF37] text-[#2C1810] rounded-xl font-bold hover:bg-[#C9A227] transition-colors shadow-lg"
                  >
                    <Search className="w-5 h-5" />
                  </button>
                </div>
                {searchError && <p role="alert" className="text-red-300 text-xs mb-3">{searchError}</p>}
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-sm text-white/70 border border-white/20 px-5 py-2.5 rounded-xl hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors"
                >
                  <Phone className="w-4 h-4" /> Talk / Text to an Expert
                </Link>
              </motion.div>
            )}

            {intentState === "selling" && (
              <motion.div
                key="selling"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.22 }}
              >
                <button
                  onClick={() => setIntentState("none")}
                  className="flex items-center gap-1.5 text-white/50 hover:text-[#D4AF37] text-xs tracking-widest uppercase mb-5 transition-colors"
                >
                  ← Back
                </button>
                <p className="text-[#D4AF37] text-xs font-semibold tracking-widest uppercase mb-5">Sell With Confidence</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/sell/valuation"
                    className="group flex items-center justify-between gap-3 px-7 py-4 bg-[#D4AF37] text-[#2C1810] rounded-2xl font-bold text-base hover:bg-[#C9A227] transition-all shadow-xl hover:-translate-y-0.5"
                  >
                    Get Your Home Evaluation
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-4 border border-white/25 text-white rounded-2xl font-semibold text-base hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors"
                  >
                    <Phone className="w-4 h-4" /> Talk / Text to an Expert
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Trust indicators */}
          <div className="flex flex-wrap gap-6 mt-10 pt-8 border-t border-white/10">
            {[
              { value: "500+", label: "Active Listings" },
              { value: "15+", label: "Years in BC" },
              { value: "98%", label: "Client Satisfaction" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                <span className="text-white font-bold text-sm">{stat.value}</span>
                <span className="text-white/50 text-sm">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
