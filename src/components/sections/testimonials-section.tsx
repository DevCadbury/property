"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Quote, Star, ArrowLeft, ArrowRight, Facebook, Instagram, Linkedin, Youtube, CheckCircle, Users, Award, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const TESTIMONIALS = [
  {
    id: 1,
    quote: "Pacific Edge made our first home purchase effortless. Their team's knowledge of Vancouver's market is unmatched. We found our dream home within weeks!",
    name: "Sarah & Michael Chen",
    location: "Vancouver, BC",
    rating: 5,
  },
  {
    id: 2,
    quote: "Selling our home was a breeze. The marketing was exceptional and we got 12% above asking. Couldn't recommend the team more highly!",
    name: "David & Jennifer Park",
    location: "Burnaby, BC",
    rating: 5,
  },
  {
    id: 3,
    quote: "As investors, we've worked with many agents. Pacific Edge is by far the best. They understand the market and always find us great deals.",
    name: "Robert Zhang",
    location: "Richmond, BC",
    rating: 5,
  },
  {
    id: 4,
    quote: "The team's dedication to our search was incredible. They found us a waterfront property that wasn't even on the market yet. True professionals!",
    name: "Emily & Tom Wilson",
    location: "West Vancouver, BC",
    rating: 5,
  },
  {
    id: 5,
    quote: "We relocated from Toronto and were nervous about the Vancouver market. Pacific Edge guided us through every step. Highly recommend!",
    name: "James & Lisa Thompson",
    location: "North Vancouver, BC",
    rating: 5,
  },
];

const SOCIAL_PROOF = [
  { icon: Users, metric: "500+", label: "Homes Sold", desc: "Across BC" },
  { icon: Star, metric: "98%", label: "5-Star Reviews", desc: "Client Satisfaction" },
  { icon: TrendingUp, metric: "$2B+", label: "Total Sales", desc: "In BC Real Estate" },
  { icon: Award, metric: "15+", label: "Years", desc: "BC Experience" },
];

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? TESTIMONIALS.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === TESTIMONIALS.length - 1 ? 0 : c + 1));

  return (
    <section className="py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-16">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[#2C1810] font-semibold text-sm uppercase tracking-wider mb-2">Client Stories</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            What sets us apart is our relationships with our clients. Here&apos;s what our clients have to say about working with Pacific Edge Realty.
          </p>
        </div>

        {/* Social Proof Stats */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-16">
          {SOCIAL_PROOF.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="flex items-center justify-center mb-2">
                <stat.icon className="w-5 h-5 text-[#2C1810] mr-2" />
                <p className="text-3xl md:text-4xl font-bold text-[#2C1810]">{stat.metric}</p>
              </div>
              <p className="text-gray-900 font-medium">{stat.label}</p>
              <p className="text-gray-500 text-sm">{stat.desc}</p>
            </div>
          ))}
        </div>

        {/* Testimonial Card */}
        <div className="relative max-w-4xl mx-auto mb-12">
          <div className="grid md:grid-cols-2 gap-0 bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Image Side */}
            <div className="hidden md:block relative overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=500&fit=crop&q=80"
                alt="Luxury home"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[#2C1810]/75 flex items-center justify-center">
                <div className="text-center">
                  <Quote className="w-16 h-16 text-white/20 mx-auto mb-4" />
                  <p className="text-white font-semibold text-lg">Trusted by</p>
                  <p className="text-[#D4AF37] text-4xl font-bold">500+</p>
                  <p className="text-white/80 text-sm">BC Families</p>
                </div>
              </div>
            </div>
            
            {/* Content Side */}
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="p-8 md:p-12 flex flex-col justify-center"
            >
              <Quote className="w-10 h-10 text-[#d4af37] mb-4" />
              
              <p className="text-lg md:text-xl text-gray-800 leading-relaxed mb-6 italic">
                &quot;{TESTIMONIALS[current].quote}&quot;
              </p>

              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#2C1810] flex items-center justify-center text-white font-bold">
                  {TESTIMONIALS[current].name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{TESTIMONIALS[current].name}</p>
                  <p className="text-sm text-gray-500">{TESTIMONIALS[current].location}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {[...Array(TESTIMONIALS[current].rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#d4af37] text-[#d4af37]" />
                ))}
              </div>

              {/* Navigation */}
              <div className="flex items-center gap-4 mt-4">
                <button
                  onClick={prev}
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-[#2C1810] hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="flex gap-2">
                  {TESTIMONIALS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrent(i)}
                      className={cn(
                        "w-2 h-2 rounded-full transition-colors",
                        current === i ? "bg-[#2C1810]" : "bg-gray-300"
                      )}
                    />
                  ))}
                </div>
                <button
                  onClick={next}
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-[#2C1810] hover:text-white transition-colors"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-3 mb-8">
          <a href="#" className="w-10 h-10 bg-[#2C1810] rounded-full flex items-center justify-center text-white hover:bg-[#3D2314] transition-colors">
            <Facebook className="w-4 h-4" />
          </a>
          <a href="#" className="w-10 h-10 bg-[#2C1810] rounded-full flex items-center justify-center text-white hover:bg-[#3D2314] transition-colors">
            <Instagram className="w-4 h-4" />
          </a>
          <a href="#" className="w-10 h-10 bg-[#2C1810] rounded-full flex items-center justify-center text-white hover:bg-[#3D2314] transition-colors">
            <Linkedin className="w-4 h-4" />
          </a>
          <a href="#" className="w-10 h-10 bg-[#2C1810] rounded-full flex items-center justify-center text-white hover:bg-[#3D2314] transition-colors">
            <Youtube className="w-4 h-4" />
          </a>
        </div>

        {/* Links */}
        <div className="flex justify-center gap-4">
          <a href="/testimonials" className="text-[#2C1810] font-medium hover:underline px-4 py-2 bg-white rounded-lg shadow-sm">
            Read all reviews
          </a>
          <span className="text-gray-300">|</span>
          <a href="/contact" className="text-[#2C1810] font-medium hover:underline px-4 py-2 bg-white rounded-lg shadow-sm">
            Contact us
          </a>
        </div>
      </div>
    </section>
  );
}