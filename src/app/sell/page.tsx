"use client";

import { motion } from "framer-motion";
import { TrendingUp, Home, Tag, FileText, Key, Users, Award, ArrowRight, Calculator, Mountain } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

const SELLING_BENEFITS = [
  { icon: TrendingUp, title: "Top Dollar Results", description: "Our BC listings sell for 3-5% above market average" },
  { icon: Home, title: "Professional Staging", description: "We transform your home to attract buyers" },
  { icon: Tag, title: "Targeted Marketing", description: "Reach qualified buyers through premium channels" },
  { icon: Users, title: "Expert Negotiation", description: "Our team secures the best terms for you" },
];

const MARKETING_FEATURES = [
  "Professional photography & virtual tours",
  "MLS listing with premium placement",
  "Targeted social media campaigns",
  "Email marketing to qualified buyers",
  "Open houses and private showings",
  "BC and international buyer network",
  "Search engine optimization",
  "Featured in premium publications",
];

const TESTIMONIALS = [
  { quote: "Pacific Edge sold our home $85K above asking in just 8 days!", author: "Sarah & Tom M.", location: "Kitsilano, Vancouver" },
  { quote: "Their marketing strategy brought us 12 offers on day one. Incredible results.", author: "David L.", location: "West Vancouver, BC" },
];

const MARKET_STATS = [
  { value: "98%", label: "Client Satisfaction" },
  { value: "14", label: "Avg Days on Market" },
  { value: "105%", label: "Avg Sale vs List" },
  { value: "$4.2B+", label: "Total BC Sales" },
];

export default function SellPage() {
  return (
    <>
      <SiteHeader />

      <main className="min-h-screen bg-background">
        {/* Hero - BC Focused */}
        <div className="relative bg-[#1a365d] text-white py-24 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <Mountain className="w-full h-full" />
          </div>
          <div className="relative max-w-7xl mx-auto px-6 md:px-10 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-4xl md:text-5xl font-bold mb-4"
            >
              Sell Your BC Home for <span className="text-[#d4af37]">Top Dollar</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-gray-200 max-w-2xl mx-auto mb-8"
            >
              Partner with BC&apos;s most trusted brokerage to sell your property for the best possible price with our proven process
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a href="/sell/valuation" className="px-8 py-4 bg-[#d4af37] text-white font-semibold rounded-lg hover:bg-[#b8962e] transition-colors">
                Get Free Valuation
              </a>
              <a href="/sell/process" className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-[#1a365d] transition-colors">
                See Our Process
              </a>
            </motion.div>
          </div>
        </div>

        {/* Why Sell With Us - BC */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <h2 className="font-display text-3xl font-bold text-foreground text-center mb-12">Why Sell With Pacific Edge Realty</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {SELLING_BENEFITS.map((benefit, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center p-6 rounded-lg border border-border bg-card"
                >
                  <benefit.icon className="w-10 h-10 text-[#2D4F3C] mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats - BC */}
        <div className="bg-[#FAF8F5] py-16">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {MARKET_STATS.map((stat, i) => (
                <div key={i}>
                  <p className="font-display text-4xl font-bold text-[#2D4F3C]">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Marketing */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-display text-3xl font-bold text-foreground mb-6">Premium Marketing Strategy</h2>
                <p className="text-muted-foreground text-lg mb-6">
                  Every BC listing receives our comprehensive marketing treatment designed to attract qualified buyers and maximize your sale price.
                </p>
                <ul className="space-y-3">
                  {MARKETING_FEATURES.slice(0, 6).map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-foreground">
                      <div className="w-2 h-2 rounded-full bg-[#2D4F3C]" /> {feature}
                    </li>
                  ))}
                </ul>
                <a href="/sell/marketing" className="inline-flex items-center gap-2 mt-6 text-[#2D4F3C] font-semibold hover:underline">
                  Full Marketing Plan <ArrowRight className="w-4 h-4" />
                </a>
              </div>
              <div className="aspect-[4/3] rounded-lg overflow-hidden bg-muted">
                <img 
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
                  alt="Premium Marketing"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Process */}
        <div className="bg-[#FAF8F5] py-16">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <h2 className="font-display text-3xl font-bold text-foreground text-center mb-12">The Selling Process</h2>
            <div className="grid md:grid-cols-5 gap-4">
              {[
                { number: 1, title: "Valuation", desc: "Get your BC home's market value" },
                { number: 2, title: "Prepare", desc: "Stage and prepare your home" },
                { number: 3, title: "Market", desc: "Launch premium marketing" },
                { number: 4, title: "Negotiate", desc: "Review and negotiate offers" },
                { number: 5, title: "Close", desc: "Complete paperwork and close" },
              ].map((step, i) => (
                <div key={i} className="text-center p-6 rounded-lg border border-border bg-card">
                  <div className="w-10 h-10 rounded-full bg-[#2D4F3C] text-white flex items-center justify-center font-bold mx-auto mb-3">
                    {step.number}
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{step.title}</h3>
                  <p className="text-xs text-muted-foreground">{step.desc}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <a href="/sell/process" className="inline-flex items-center gap-2 px-6 py-3 bg-[#2D4F3C] text-white font-semibold rounded-lg hover:bg-[#234136]">
                View Full Process <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <h2 className="font-display text-3xl font-bold text-foreground text-center mb-12">What Our BC Sellers Say</h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className="p-6 rounded-lg border border-border bg-card">
                  <p className="text-foreground italic mb-4">"{t.quote}"</p>
                  <p className="text-sm text-muted-foreground">— {t.author}, {t.location}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA - BC */}
        <div className="bg-[#1a365d] py-20">
          <div className="max-w-7xl mx-auto px-6 md:px-10 text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6">Ready to Sell Your BC Home?</h2>
            <p className="text-gray-200 max-w-xl mx-auto mb-8">
              Get a free, no-obligation home valuation from our expert agents and learn what your BC property could sell for
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/sell/valuation" className="px-8 py-4 bg-[#d4af37] text-white font-semibold rounded-lg hover:bg-[#b8962e] transition-colors flex items-center gap-2">
                <Calculator className="w-5 h-5" /> Get Free Valuation
              </a>
              <a href="/contact" className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-[#1a365d] transition-colors">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}