"use client";

import { motion } from "framer-motion";
import { MapPin, Award, Users, TrendingUp, Shield, Heart } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { MOCK_AGENTS } from "@/data/mock";

export default function AboutPage() {
  return (
    <>
      <SiteHeader />

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <div className="relative bg-forest text-primary-foreground py-24 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0 100 Q 25 60, 50 100 T 100 100 Z" fill="currentColor" />
              <path d="M0 100 Q 25 40, 50 100 T 100 100 Z" fill="currentColor" />
              <path d="M0 100 Q 25 20, 50 100 T 100 100 Z" fill="currentColor" />
            </svg>
          </div>
          <div className="max-w-7xl mx-auto px-6 md:px-10 relative">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-5xl md:text-6xl font-bold mb-6"
            >
              Our Story
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-primary-foreground/80 max-w-2xl"
            >
              Pacific Edge Realty is British Columbia's premier boutique brokerage, 
              dedicated to connecting discerning buyers with the province's most extraordinary properties.
            </motion.p>
          </div>
        </div>

        {/* Mission Section */}
        <div className="py-20">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Rooted in BC, Focused on You
                </h2>
                <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                  Founded in Vancouver in 2015, Pacific Edge Realty was born from a simple belief: 
                  finding your perfect home should be an inspiring journey, not a stressful transaction.
                </p>
                <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                  Our team of local experts brings deep knowledge of BC's diverse real estate landscape—
                  from the bustling streets of Vancouver to the serene shores of Victoria and the 
                  mountain retreats of Whistler.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  We combine old-school relationship building with modern technology to deliver 
                  a real estate experience that's as seamless as it is memorable.
                </p>
              </div>
              <div className="relative">
                <div className="aspect-[4/3] rounded-lg overflow-hidden bg-muted">
                  <img 
                    src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80" 
                    alt="BC Landscape" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-lg shadow-xl border border-border">
                  <p className="font-display text-4xl font-bold text-forest">15+</p>
                  <p className="text-sm text-muted-foreground">Years serving BC</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-muted py-20">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { icon: TrendingUp, value: "$4.2B+", label: "Sales Volume" },
                { icon: Users, value: "2,400+", label: "Happy Clients" },
                { icon: Award, value: "95+", label: "Expert Agents" },
                { icon: Shield, value: "15+", label: "Years Excellence" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <stat.icon className="w-8 h-8 text-forest mx-auto mb-3" />
                  <p className="font-display text-3xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="py-20">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Our Values
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Heart,
                  title: "Client-First",
                  description: "We listen, understand, and advocate for your unique needs. Your success is our measure of excellence."
                },
                {
                  icon: MapPin,
                  title: "Local Expertise",
                  description: "Our agents live and work in BC communities. We know the neighborhoods, schools, and hidden gems."
                },
                {
                  icon: Shield,
                  title: "Integrity Always",
                  description: "Transparent communication, ethical practices, and honest advice. We earn your trust with every interaction."
                },
              ].map((value, i) => (
                <div key={i} className="p-8 rounded-lg border border-border bg-card hover:border-copper transition-colors">
                  <value.icon className="w-10 h-10 text-forest mb-4" />
                  <h3 className="font-display text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-muted py-20">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Meet Our Leadership
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The experienced team behind Pacific Edge Realty
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {MOCK_AGENTS.slice(0, 4).map((agent) => (
                <div key={agent.id} className="text-center">
                  <div className="aspect-square rounded-full overflow-hidden bg-muted mb-4 max-w-[200px] mx-auto">
                    <img 
                      src={agent.avatar} 
                      alt={agent.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-semibold text-foreground">{agent.name}</h3>
                  <p className="text-sm text-muted-foreground">{agent.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-20">
          <div className="max-w-7xl mx-auto px-6 md:px-10 text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ready to Find Your BC Home?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Let our local experts guide you to your perfect property across British Columbia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/listings" 
                className="inline-flex items-center justify-center px-8 py-4 bg-forest text-primary-foreground font-semibold rounded-lg hover:bg-forest-light transition-colors"
              >
                Browse Listings
              </a>
              <a 
                href="/contact" 
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-forest text-forest font-semibold rounded-lg hover:bg-forest hover:text-primary-foreground transition-colors"
              >
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