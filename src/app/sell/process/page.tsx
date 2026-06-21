"use client";

import { motion } from "framer-motion";
import { CheckCircle, CalendarDays, FileText, Home, Tag, Key, ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

const STEPS = [
  { 
    number: 1, 
    title: "Initial Consultation", 
    description: "We meet to understand your goals, timeline, and property details. We'll explain our process and answer your questions.",
    duration: "1-2 days",
    tasks: ["Discuss pricing strategy", "Review comparable sales", "Outline marketing plan", "Answer your questions"]
  },
  { 
    number: 2, 
    title: "Market Valuation", 
    description: "We provide a comprehensive market analysis to determine the optimal listing price for your property.",
    duration: "1-2 days",
    tasks: ["Analyze recent sales", "Evaluate current listings", "Consider unique features", "Recommend price range"]
  },
  { 
    number: 3, 
    title: "Prepare & Stage", 
    description: "We help prepare your home for sale with professional staging recommendations and any needed repairs.",
    duration: "1-2 weeks",
    tasks: ["Home staging consultation", "Photography & virtual tour", "Prepare listing materials", "Declutter & depersonalize"]
  },
  { 
    number: 4, 
    title: "Launch Marketing", 
    description: "Your property hits the market with our comprehensive marketing campaign targeting qualified buyers.",
    duration: "Ongoing",
    tasks: ["MLS listing", "Social media campaign", "Email marketing", "Open houses scheduled"]
  },
  { 
    number: 5, 
    title: "Show & Negotiate", 
    description: "We handle all showings and negotiate offers on your behalf to secure the best terms.",
    duration: "1-4 weeks",
    tasks: ["Coordinate showings", "Review offers", "Negotiate terms", "Accept qualified offer"]
  },
  { 
    number: 6, 
    title: "Complete Conditions", 
    description: "We manage all conditions including inspections, financing, and legal requirements.",
    duration: "1-3 weeks",
    tasks: ["Coordinate inspection", "Verify financing", "Review legal documents", "Satisfy conditions"]
  },
  { 
    number: 7, 
    title: "Close & Transfer", 
    description: "On closing day, we ensure a smooth transfer of ownership and you receive your proceeds.",
    duration: "1 day",
    tasks: ["Final walkthrough", "Sign documents", "Transfer keys", "Receive proceeds"]
  },
];

export default function SellProcessPage() {
  return (
    <>
      <SiteHeader />

      <main className="min-h-screen bg-background">
        <div className="bg-forest text-primary-foreground py-20">
          <div className="max-w-7xl mx-auto px-6 md:px-10 text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Our Selling Process</h1>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              A proven 7-step process designed to sell your home for top dollar with minimal stress
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
          <div className="space-y-8">
            {STEPS.map((step, i) => (
              <motion.div 
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="grid md:grid-cols-4 gap-6 p-6 rounded-lg border border-border bg-card"
              >
                <div className="md:col-span-1">
                  <div className="w-12 h-12 rounded-full bg-forest text-white flex items-center justify-center font-bold text-lg mb-3">
                    {step.number}
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground">{step.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                    <CalendarDays className="w-4 h-4" /> {step.duration}
                  </p>
                </div>
                <div className="md:col-span-3">
                  <p className="text-muted-foreground mb-4">{step.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {step.tasks.map((task, j) => (
                      <span key={j} className="flex items-center gap-1 text-xs px-2 py-1 bg-muted rounded">
                        <CheckCircle className="w-3 h-3 text-forest" /> {task}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="bg-muted py-16">
          <div className="max-w-7xl mx-auto px-6 md:px-10 text-center">
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">Ready to Start?</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Get a free home valuation and learn how we can sell your property for top dollar
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/sell/valuation" className="px-8 py-4 bg-forest text-white font-semibold rounded-lg hover:bg-forest-light">
                Get Free Valuation
              </a>
              <a href="/contact" className="px-8 py-4 border-2 border-forest text-forest font-semibold rounded-lg hover:bg-forest hover:text-white">
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