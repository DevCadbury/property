"use client";

import { motion } from "framer-motion";
import { MapPin, ArrowRight, TrendingUp, Home, Users } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { MOCK_NEIGHBORHOODS, formatPrice } from "@/data/mock";

const NEIGHBOURHOODS_WITH_STATS = MOCK_NEIGHBORHOODS.map((n, i) => ({
  ...n,
  avgPrice: [2850000, 2400000, 1650000, 3200000, 1450000, 1950000][i] || 2000000,
  avgRent: [4500, 3800, 2800, 5200, 2200, 3200][i] || 3000,
  walkScore: [92, 89, 95, 78, 72, 85][i] || 85,
  transitScore: [88, 82, 90, 65, 55, 75][i] || 75,
}));

const CITIES = ["All", "Vancouver", "Victoria", "North Vancouver", "Burnaby", "Surrey", "Kelowna", "Whistler"];

export default function NeighbourhoodsPage() {
  return (
    <>
      <SiteHeader />

      <main className="min-h-screen bg-background">
        {/* Hero */}
        <div className="bg-forest text-primary-foreground py-20">
          <div className="max-w-7xl mx-auto px-6 md:px-10 text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Explore BC Neighbourhoods
            </h1>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              Discover the perfect community for your lifestyle — from Vancouver's vibrant urban cores to Victoria's charming heritage districts
            </p>
          </div>
        </div>

        {/* City Filter */}
        <div className="border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex gap-2 overflow-x-auto scrollbar-luxury">
            {CITIES.map((city) => (
              <button
                key={city}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  city === "All"
                    ? "bg-forest text-white"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* Neighbourhoods Grid */}
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {NEIGHBOURHOODS_WITH_STATS.map((n, i) => (
              <motion.a
                key={n.id}
                href={`/neighbourhoods/${n.slug}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group rounded-lg border border-border bg-card overflow-hidden hover:border-copper hover:shadow-lg transition-all"
              >
                <div className="aspect-[16/9] overflow-hidden bg-muted relative">
                  <img
                    src={n.image}
                    alt={n.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-display text-xl font-bold">{n.name}</h3>
                    <p className="text-sm text-white/80">{n.city}</p>
                  </div>
                </div>

                <div className="p-5">
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{n.description}</p>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-4 py-4 border-t border-b border-border">
                    <div className="text-center">
                      <p className="text-lg font-bold text-foreground">{formatPrice(n.avgPrice)}</p>
                      <p className="text-xs text-muted-foreground">Avg Price</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-foreground">{n.walkScore}</p>
                      <p className="text-xs text-muted-foreground">Walk Score</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-foreground">{n.listingCount}</p>
                      <p className="text-xs text-muted-foreground">Listings</p>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="mt-4">
                    <p className="text-xs font-semibold text-foreground mb-2">Highlights</p>
                    <div className="flex flex-wrap gap-1">
                      {n.highlights?.slice(0, 3).map((h, j) => (
                        <span key={j} className="text-xs px-2 py-1 bg-muted rounded text-muted-foreground">
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm text-forest font-medium">Explore {n.name}</span>
                    <ArrowRight className="w-4 h-4 text-forest group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        {/* More Neighbourhoods */}
        <div className="bg-muted py-16">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <h2 className="font-display text-3xl font-bold text-foreground text-center mb-8">More BC Communities</h2>
            <div className="grid md:grid-cols-4 gap-4">
              {[
                "Surrey", "Richmond", "Langley", "Delta", "Coquitlam", "Port Moody", "New Westminster", "Abbotsford"
              ].map((city) => (
                <a 
                  key={city}
                  href={`/neighbourhoods/${city.toLowerCase().replace(" ", "-")}`}
                  className="p-4 rounded-lg border border-border bg-card text-center hover:border-forest transition-colors"
                >
                  <span className="font-medium text-foreground">{city}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-6 md:px-10 text-center">
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">Not Sure Where to Start?</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Our local experts know every neighbourhood intimately. Let us help you find the perfect community for your lifestyle.
            </p>
            <a href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-forest text-primary-foreground font-semibold rounded-lg hover:bg-forest-light transition-colors">
              Talk to an Expert <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}