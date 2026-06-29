"use client";

import { motion } from "framer-motion";
import { ArrowRight, Home } from "lucide-react";
import Link from "next/link";

const FEATURED = [
  { name: "Surrey", slug: "surrey", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop&q=80", properties: 312, avgPrice: "$1.1M", desc: "Fraser Valley's largest city" },
  { name: "Cloverdale", slug: "cloverdale", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop&q=80", properties: 87, avgPrice: "$980K", desc: "Historic charm meets modern living" },
  { name: "Langley", slug: "langley", image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&h=400&fit=crop&q=80", properties: 198, avgPrice: "$1.0M", desc: "Growing community & great value" },
  { name: "Aldergrove", slug: "aldergrove", image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop&q=80", properties: 54, avgPrice: "$890K", desc: "Peaceful rural neighbourhoods" },
  { name: "Abbotsford", slug: "abbotsford", image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&h=400&fit=crop&q=80", properties: 243, avgPrice: "$920K", desc: "BC's fastest growing city" },
  { name: "Maple Ridge", slug: "maple-ridge", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop&q=80", properties: 165, avgPrice: "$1.05M", desc: "Mountain views & family living" },
  { name: "Delta", slug: "delta", image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=600&h=400&fit=crop&q=80", properties: 142, avgPrice: "$1.2M", desc: "Scenic waterfront community" },
  { name: "Coquitlam", slug: "coquitlam", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop&q=80", properties: 189, avgPrice: "$1.15M", desc: "Urban amenities & green spaces" },
];

export function NeighborhoodsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-16">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[#5E312B] font-semibold text-sm uppercase tracking-wider mb-2">
            Explore
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Popular Neighborhoods
          </h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Explore homes across Surrey, Langley, Abbotsford, and the wider Fraser Valley region
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
                <div className="relative overflow-hidden rounded-2xl aspect-[4/3] mb-4">
                  <img
                    src={hood.image}
                    alt={hood.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white text-lg font-bold">{hood.name}</h3>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-600 text-sm">{hood.desc}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1 text-gray-500">
                      <Home className="w-4 h-4" /> {hood.properties} homes
                    </span>
                    <span className="text-[#5E312B] font-semibold">{hood.avgPrice}</span>
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
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#5E312B] text-white rounded-xl font-semibold hover:bg-[#7A463E] transition-colors"
          >
            View All Neighborhoods <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
