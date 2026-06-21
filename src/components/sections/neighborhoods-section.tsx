"use client";

import { motion } from "framer-motion";
import { MapPin, ArrowRight, Home, Users } from "lucide-react";
import Link from "next/link";
import { MOCK_NEIGHBORHOODS } from "@/data/mock";

const FEATURED = [
  { name: "Downtown Vancouver", slug: "downtown-vancouver", properties: 156, avgPrice: "$1.2M", desc: "Urban living at its finest" },
  { name: "West Vancouver", slug: "west-vancouver", properties: 89, avgPrice: "$2.8M", desc: "Luxury waterfront homes" },
  { name: "Richmond", slug: "richmond", properties: 203, avgPrice: "$980K", desc: "Family-friendly communities" },
  { name: "Burnaby", slug: "burnaby", properties: 178, avgPrice: "$1.1M", desc: "Modern amenities & parks" },
];

export function NeighborhoodsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-16">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[#2D4F3C] font-semibold text-sm uppercase tracking-wider mb-2">
            Explore
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Popular Neighborhoods
          </h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Discover the best communities in Metro Vancouver, from luxury waterfront to family-friendly suburbs
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURED.map((hood, i) => (
            <motion.div
              key={hood.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={`/neighbourhoods/${hood.slug}`} className="block group">
                <div className="relative overflow-hidden rounded-xl aspect-[4/3] bg-gradient-to-br from-[#1a365d] to-[#2D4F3C] mb-4">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <MapPin className="w-12 h-12 text-white/30" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white text-lg font-semibold group-hover:text-[#a67c52] transition-colors">
                      {hood.name}
                    </h3>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-600 text-sm">{hood.desc}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1 text-gray-500">
                      <Home className="w-4 h-4" /> {hood.properties} homes
                    </span>
                    <span className="text-[#2D4F3C] font-semibold">{hood.avgPrice}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Link
            href="/neighbourhoods"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#1a365d] text-white rounded-xl font-semibold hover:bg-[#2D4F3C] transition-colors"
          >
            View All Neighborhoods <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}