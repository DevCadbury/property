"use client";

import { motion } from "framer-motion";
import { ArrowRight, Phone, Mail, MessageCircle, CheckCircle } from "lucide-react";
import Link from "next/link";

const STEPS = [
  { 
    number: "01", 
    title: "Schedule a Call", 
    desc: "Book a free consultation with one of our BC experts. No obligation, just a conversation about your goals.",
  },
  { 
    number: "02", 
    title: "Share Your Goals", 
    desc: "We want to know your goals so we can help you achieve them. No goal is too big or too small for us.",
  },
  { 
    number: "03", 
    title: "We'll Make It Happen", 
    desc: "We'll take your goals and turn them into a reality. Don't stress, we have everything covered.",
  },
];

const BENEFITS = [
  "Personalized property matching",
  "Expert market knowledge",
  "Professional photography",
  "MLS listing exposure",
  "Flexible scheduling",
  "Post-purchase support",
];

export function CTASection() {
  return (
    <section
      className="py-20 bg-[#2C1810] bg-cover bg-center relative overflow-hidden"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1600&h=600&fit=crop&q=80')" }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[#2C1810]/85 opacity-[0.97]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            opacity: 0.03,
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to make the right move?
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            At Pacific Edge Realty our success is measured by impressing you. Let&apos;s work together to find your perfect BC home.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {STEPS.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 border-2 border-[#d4af37] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-[#d4af37] font-bold text-xl">{step.number}</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
              <p className="text-gray-400 text-sm">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Benefits */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h3 className="text-white font-semibold text-lg mb-6 text-center">What You Get Working With Us</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {BENEFITS.map((benefit, i) => (
                <div key={i} className="flex items-center gap-3 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-[#d4af37] flex-shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#d4af37] text-white rounded-xl font-semibold hover:bg-[#b8962e] transition-colors shadow-lg"
          >
            <MessageCircle className="w-5 h-5" /> Get Started
          </Link>
          <Link
            href="/sell/valuation"
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-[#2C1810] transition-colors"
          >
            Get Home Value
          </Link>
        </div>
      </div>
    </section>
  );
}