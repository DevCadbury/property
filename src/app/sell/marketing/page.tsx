"use client";

import { motion } from "framer-motion";
import { CheckCircle, Camera, Globe, Mail, Phone, Users, Home, ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

const MARKETING_PACKAGE = [
  { category: "Photography & Media", items: ["Professional photography", "Cinematic video tour", "360° virtual tour", "Drone aerial photography", "Twilight shots"] },
  { category: "Digital Marketing", items: ["MLS® premium listing", "Google advertising", "Facebook & Instagram", "Email campaigns", "SEO optimization"] },
  { category: "Traditional Marketing", items: ["Feature in luxury publications", "Open house events", "For sale signage", "Brochure distribution", "Neighbourhood mailouts"] },
  { category: "Agent Network", items: ["Internal co-broking", "Agent preview events", "Networking events", "Luxury buyer database", "International referrals"] },
];

const RESULTS = {
  avgDaysOnMarket: 14,
  avgSaleVsList: "105%",
  totalViews: "2,500+",
  inquiries: "45+",
};

export default function SellMarketingPage() {
  return (
    <>
      <SiteHeader />

      <main className="min-h-screen bg-background">
        <div className="bg-forest text-primary-foreground py-20">
          <div className="max-w-7xl mx-auto px-6 md:px-10 text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Our Marketing Strategy</h1>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              Premium marketing that puts your property in front of qualified buyers and maximizes your sale price
            </p>
          </div>
        </div>

        {/* Results */}
        <div className="py-12 bg-muted">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center p-4">
                <p className="font-display text-4xl font-bold text-forest">{RESULTS.avgDaysOnMarket}</p>
                <p className="text-sm text-muted-foreground">Avg Days on Market</p>
              </div>
              <div className="text-center p-4">
                <p className="font-display text-4xl font-bold text-forest">{RESULTS.avgSaleVsList}</p>
                <p className="text-sm text-muted-foreground">Avg Sale vs List</p>
              </div>
              <div className="text-center p-4">
                <p className="font-display text-4xl font-bold text-forest">{RESULTS.totalViews}</p>
                <p className="text-sm text-muted-foreground">Avg Listing Views</p>
              </div>
              <div className="text-center p-4">
                <p className="font-display text-4xl font-bold text-forest">{RESULTS.inquiries}</p>
                <p className="text-sm text-muted-foreground">Avg Inquiries</p>
              </div>
            </div>
          </div>
        </div>

        {/* Marketing Package */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <h2 className="font-display text-3xl font-bold text-foreground text-center mb-12">Complete Marketing Package</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {MARKETING_PACKAGE.map((section, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-lg border border-border bg-card"
                >
                  <h3 className="font-display text-xl font-semibold text-foreground mb-4">{section.category}</h3>
                  <ul className="space-y-3">
                    {section.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-3 text-muted-foreground">
                        <CheckCircle className="w-5 h-5 text-forest shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Process */}
        <div className="bg-muted py-16">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <h2 className="font-display text-3xl font-bold text-foreground text-center mb-8">How It Works</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { icon: Camera, title: "Day 1-2", desc: "Professional photos & video" },
                { icon: Globe, title: "Day 3", desc: "Launch online marketing" },
                { icon: Users, title: "Day 4-14", desc: "Showings & open houses" },
                { icon: Home, title: "Day 15+", desc: "Review offers & close" },
              ].map((step, i) => (
                <div key={i} className="text-center p-6 rounded-lg border border-border bg-card">
                  <step.icon className="w-10 h-10 text-forest mx-auto mb-3" />
                  <h3 className="font-semibold text-foreground">{step.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-6 md:px-10 text-center">
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">Start Your Marketing Campaign</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Get a comprehensive marketing plan and valuation for your property
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/sell/valuation" className="px-8 py-4 bg-forest text-white font-semibold rounded-lg hover:bg-forest-light">
                Get Free Valuation
              </a>
              <a href="/contact" className="px-8 py-4 border-2 border-forest text-forest font-semibold rounded-lg hover:bg-forest hover:text-white">
                Talk to an Agent
              </a>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}