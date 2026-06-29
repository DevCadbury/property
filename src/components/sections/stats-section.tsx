"use client";

import { motion } from "framer-motion";
import { Award, Users, TrendingUp, MapPin, Star, Handshake } from "lucide-react";

const STATS = [
  { icon: TrendingUp, value: "$2.5B+", label: "Total Sales", desc: "Combined property value sold" },
  { icon: Users, value: "2,500+", label: "Happy Clients", desc: "Families found their dream home" },
  { icon: Award, value: "15+", label: "Years Experience", desc: "Serving BC since 2009" },
  { icon: MapPin, value: "50+", label: "Neighborhoods", desc: "Expert knowledge across Metro Vancouver" },
];

const ACHIEVEMENTS = [
  { icon: Star, title: "Top 1% Realtors", desc: "Ranked in top 1% of all BC realtors" },
  { icon: Handshake, title: "Best Service Award", desc: "Voted best customer service 2024" },
  { icon: Award, title: "5-Star Reviews", desc: "500+ perfect 5-star reviews" },
];

export function StatsSection() {
  return (
    <section
      className="py-20 bg-[#5E312B] bg-cover bg-center relative overflow-hidden"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1600&h=600&fit=crop&q=80')" }}
    >
      <div className="absolute inset-0 bg-[#5E312B]/90" />
      <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-16">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-[#7A463E] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <p className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-[#AC7E71] font-semibold text-sm">{stat.label}</p>
              <p className="text-white/60 text-xs mt-1">{stat.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Achievements */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ACHIEVEMENTS.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-colors"
            >
              <item.icon className="w-10 h-10 text-[#AC7E71] mx-auto mb-3" />
              <h3 className="text-white font-semibold text-lg">{item.title}</h3>
              <p className="text-white/70 text-sm mt-1">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}