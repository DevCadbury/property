"use client";

import { motion } from "framer-motion";
import { Phone, Mail, ArrowRight, Award, Users, TrendingUp, Star, CheckCircle } from "lucide-react";
import Link from "next/link";
import { MOCK_AGENTS } from "@/data/mock";

const TEAM_STATS = [
  { icon: Users, value: "25+", label: "Expert Agents" },
  { icon: TrendingUp, value: "$2B+", label: "BC Sales Volume" },
  { icon: Award, value: "15+", label: "Years Experience" },
];

const TEAM_FEATURES = [
  { icon: Award, title: "Award Winning", desc: "Recognized as BC's top team" },
  { icon: Star, title: "5-Star Reviews", desc: "98% client satisfaction" },
  { icon: CheckCircle, title: "100% Dedicated", desc: "We go above and beyond" },
  { icon: Users, title: "Team Approach", desc: "Multiple agents per client" },
];

export function TeamSection() {
  return (
    <section className="py-20 bg-[#F8F4F2]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-16">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[#5E312B] font-semibold text-sm uppercase tracking-wider mb-2">Our Team</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Meet the BC Experts
          </h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Our dedicated team of real estate professionals is here to guide you through every step of your BC real estate journey.
          </p>
        </div>

        {/* Team Banner */}
        <div className="relative w-full h-40 md:h-52 rounded-2xl overflow-hidden mb-12">
          <img
            src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1400&h=300&fit=crop&q=80"
            alt="BC real estate team"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#5E312B]/70 flex items-center justify-center">
            <p className="text-[#AC7E71] text-xl font-semibold tracking-widest uppercase">Your Dedicated BC Experts</p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-16">
          {TEAM_STATS.map((stat, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#5E312B] rounded-lg flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Team Features */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {TEAM_FEATURES.map((feature, i) => (
            <div key={i} className="text-center p-4 bg-[#F8F4F2] rounded-xl">
              <feature.icon className="w-6 h-6 text-[#5E312B] mx-auto mb-2" />
              <h3 className="font-semibold text-gray-900 text-sm">{feature.title}</h3>
              <p className="text-gray-500 text-xs">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {MOCK_AGENTS.map((agent, i) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-xl mb-4 aspect-[3/4]">
                <img 
                  src={agent.avatar} 
                  alt={agent.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#5E312B]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="w-full p-4">
                    <div className="flex gap-2">
                      <a
                        href={`tel:${agent.phone}`}
                        className="flex-1 py-2 bg-white text-[#5E312B] rounded-lg text-center text-sm font-medium hover:bg-gray-100 flex items-center justify-center gap-1"
                      >
                        <Phone className="w-4 h-4" /> Call
                      </a>
                      <a
                        href={`mailto:${agent.email}`}
                        className="flex-1 py-2 bg-white text-[#5E312B] rounded-lg text-center text-sm font-medium hover:bg-gray-100 flex items-center justify-center gap-1"
                      >
                        <Mail className="w-4 h-4" /> Email
                      </a>
                    </div>
                  </div>
                </div>
                <div className="absolute top-3 right-3 px-2 py-1 bg-white/90 rounded-full flex items-center gap-1">
                  <Star className="w-3 h-3 fill-[#AC7E71] text-[#AC7E71]" />
                  <span className="text-xs font-semibold text-gray-900">{agent.rating}</span>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#5E312B] transition-colors">
                {agent.name}
              </h3>
              <p className="text-[#AC7E71] font-medium text-sm">{agent.title}</p>
              <p className="text-gray-500 text-sm mt-1">{agent.specialties?.slice(0, 2).join(", ")}</p>
              <Link
                href={`/agents/${agent.slug}`}
                className="inline-flex items-center gap-1 text-sm text-[#5E312B] mt-2 hover:gap-2 transition-all"
              >
                View Profile <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            href="/agents"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#5E312B] text-white rounded-xl font-semibold hover:bg-[#7A463E] transition-colors"
          >
            View All Team Members
          </Link>
        </div>
      </div>
    </section>
  );
}