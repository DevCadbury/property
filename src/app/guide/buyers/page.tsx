"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle, Search, FileText, Home, Key, Calculator, DollarSign, ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { MortgageCalculator } from "@/components/ui/mortgage-calculator";

const STEPS = [
  {
    icon: Search,
    title: "Get Pre-Approved",
    step: "01",
    description: "Meet with a mortgage professional to determine your budget and get a pre-approval letter.",
    details: ["Check your credit score", "Gather income documents", "Meet with lender", "Get pre-approval letter"],
  },
  {
    icon: Home,
    title: "Define Your Needs",
    step: "02",
    description: "Work with your agent to identify must-haves vs. nice-to-haves. Consider location, property type, size.",
    details: ["Create a wish list", "Define must-haves", "Set priorities", "Research neighborhoods"],
  },
  {
    icon: Search,
    title: "Start Searching",
    step: "03",
    description: "Your agent will send you matching listings. Tour properties virtually and in-person.",
    details: ["Review listings daily", "Schedule showings", "Tour properties", "Take notes & photos"],
  },
  {
    icon: FileText,
    title: "Make an Offer",
    step: "04",
    description: "When you find the right property, your agent will prepare a competitive offer.",
    details: ["Review comparables", "Determine offer price", "Add conditions", "Submit to seller"],
  },
  {
    icon: FileText,
    title: "Inspection & Financing",
    step: "05",
    description: "Schedule your home inspection and finalize your mortgage. Your lawyer handles paperwork.",
    details: ["Book inspection", "Review conditions", "Finalize mortgage", "Waive conditions"],
  },
  {
    icon: Key,
    title: "Close the Deal",
    step: "06",
    description: "On closing day, your lawyer registers the property in your name. You get the keys!",
    details: ["Final walkthrough", "Sign documents", "Transfer funds", "Get your keys"],
  },
];

const RESOURCES = [
  { title: "BC Property Transfer Tax Calculator", description: "Estimate your provincial tax costs" },
  { title: "First-Time Home Buyer Rebate", description: "Learn about the BC FTHBI rebate" },
  { title: "Mortgage Stress Test Guide", description: "Understand current lending requirements" },
  { title: "BCREA Consumer Resources", description: "Official real estate education materials" },
];

const COSTS = [
  { title: "Down Payment", amount: "5–20%", note: "of purchase price" },
  { title: "Property Transfer Tax", amount: "1–2%", note: "First-time buyers may qualify for exemption" },
  { title: "Legal Fees", amount: "$1,000–$2,500", note: "Title transfer & registration" },
  { title: "Home Inspection", amount: "$300–$600", note: "Strongly recommended" },
  { title: "Property Taxes", amount: "~0.3–0.5%", note: "of assessed value, prorated" },
  { title: "Moving Costs", amount: "$500–$3,000", note: "Depends on distance & volume" },
];

export default function BuyerGuidePage() {
  const [mortgagePrice, setMortgagePrice] = useState<number>(800000);
  const [priceInput, setPriceInput] = useState<string>("800000");
  const [priceError, setPriceError] = useState<string>("");

  const handlePriceChange = (rawValue: string) => {
    setPriceInput(rawValue);
    const parsed = parseFloat(rawValue);
    if (isNaN(parsed) || parsed < 10000 || parsed > 10000000) {
      setPriceError("Enter a price between $10,000 and $10,000,000.");
    } else {
      setPriceError("");
      setMortgagePrice(parsed);
    }
  };

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[#F8F4F2]">

        {/* ── HERO BANNER ── */}
        <div className="relative overflow-hidden min-h-[340px] flex items-end">
          <img
            src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1600&h=500&fit=crop&q=85"
            alt="Beautiful BC home"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#5E312B]/95 via-[#5E312B]/80 to-[#5E312B]/40" />
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#AC7E71] to-transparent" />
          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-16 w-full">
            <p className="text-[#AC7E71] text-xs font-semibold tracking-widest uppercase mb-3 flex items-center gap-2">
              <span className="w-6 h-[1px] bg-[#AC7E71]" /> Planet Group Realty
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3">Buyer&apos;s Guide</h1>
            <p className="text-white/60 max-w-xl text-base">
              Everything you need to navigate the BC real estate market — from first steps to getting your keys.
            </p>
          </div>
        </div>

        {/* ── OVERVIEW ── */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-[#AC7E71] text-xs font-semibold tracking-widest uppercase mb-4 flex items-center gap-2">
                  <span className="w-5 h-[1px] bg-[#AC7E71]" /> Your Journey
                </p>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-[#5E312B] mb-6 leading-tight">
                  Your Path to<br />Homeownership in BC
                </h2>
                <p className="text-gray-600 text-lg mb-4 leading-relaxed">
                  Buying a home is one of the biggest financial decisions you&apos;ll make. Our comprehensive guide walks you through every step of the BC real estate process.
                </p>
                <p className="text-gray-500 mb-8">
                  From getting pre-approved to signing on closing day, we help you understand what to expect and navigate each stage with confidence.
                </p>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#5E312B] text-white rounded-xl font-semibold text-sm hover:bg-[#7A463E] transition-colors shadow-lg"
                >
                  Get a Free Consultation <ArrowRight className="w-4 h-4" />
                </a>
              </div>
              <div className="relative">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop&q=85"
                    alt="BC real estate"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Floating stat card */}
                <div className="absolute -bottom-5 -left-5 bg-[#5E312B] text-white px-6 py-4 rounded-2xl shadow-xl border border-[#AC7E71]/30">
                  <p className="text-[#AC7E71] text-2xl font-bold">500+</p>
                  <p className="text-white/70 text-xs tracking-wide">Active Listings in BC</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── STEPS ── */}
        <section className="py-20 bg-[#F8F4F2]">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="text-center mb-14">
              <p className="text-[#AC7E71] text-xs font-semibold tracking-widest uppercase mb-3">Step by Step</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-[#5E312B]">The Home Buying Process</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {STEPS.map((step, i) => (
                <div
                  key={i}
                  className="group bg-white rounded-2xl p-7 border border-[#E5D5CF] hover:border-[#AC7E71] hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-12 h-12 bg-[#5E312B] rounded-xl flex items-center justify-center group-hover:bg-[#AC7E71] transition-colors">
                      <step.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-4xl font-bold text-[#5E312B]/10 group-hover:text-[#AC7E71]/20 font-display transition-colors">{step.step}</span>
                  </div>
                  <h3 className="font-semibold text-[#5E312B] text-lg mb-2">{step.title}</h3>
                  <p className="text-gray-500 text-sm mb-4 leading-relaxed">{step.description}</p>
                  <ul className="space-y-1.5">
                    {step.details.map((detail, j) => (
                      <li key={j} className="flex items-center gap-2 text-xs text-gray-600">
                        <CheckCircle className="w-3.5 h-3.5 text-[#AC7E71] shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── MORTGAGE CALCULATOR ── */}
        <section id="mortgage-calculator" className="py-20 bg-[#5E312B] relative overflow-hidden">
          {/* bg image */}
          <div className="absolute inset-0 opacity-10">
            <img
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&h=700&fit=crop&q=60"
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#AC7E71] to-transparent" />
          <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Left copy */}
              <div className="lg:pt-4">
                <p className="text-[#AC7E71] text-xs font-semibold tracking-widest uppercase mb-4 flex items-center gap-2">
                  <span className="w-5 h-[1px] bg-[#AC7E71]" /> Plan Your Budget
                </p>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-5 leading-tight">
                  Mortgage<br />Calculator
                </h2>
                <p className="text-white/60 mb-8 leading-relaxed">
                  Estimate your monthly payments instantly. Adjust the home price and see how your mortgage changes in real time.
                </p>
                {/* Price input */}
                <div className="mb-2">
                  <label htmlFor="home-price" className="block text-white/80 text-sm font-medium mb-2">
                    <span className="flex items-center gap-2"><DollarSign className="w-4 h-4 text-[#AC7E71]" /> Home Price (CAD)</span>
                  </label>
                  <input
                    id="home-price"
                    type="number"
                    value={priceInput}
                    onChange={(e) => handlePriceChange(e.target.value)}
                    min={10000}
                    max={10000000}
                    step={1000}
                    aria-label="Home price"
                    className="w-full px-5 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#AC7E71] text-base backdrop-blur"
                    placeholder="800,000"
                  />
                  {priceError && <p role="alert" className="text-red-300 text-xs mt-2">{priceError}</p>}
                </div>
                <div className="mt-8 grid grid-cols-3 gap-4">
                  {[{ v: "500000", l: "$500K" }, { v: "800000", l: "$800K" }, { v: "1200000", l: "$1.2M" }].map((p) => (
                    <button
                      key={p.v}
                      onClick={() => handlePriceChange(p.v)}
                      className={`py-2 rounded-lg text-sm font-semibold border transition-colors ${
                        priceInput === p.v
                          ? "bg-[#AC7E71] border-[#AC7E71] text-[#5E312B]"
                          : "border-white/20 text-white/70 hover:border-[#AC7E71] hover:text-[#AC7E71]"
                      }`}
                    >
                      {p.l}
                    </button>
                  ))}
                </div>
              </div>
              {/* Calculator widget */}
              <div>
                <MortgageCalculator price={mortgagePrice} className="rounded-2xl shadow-2xl" />
              </div>
            </div>
          </div>
        </section>

        {/* ── KEY COSTS ── */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="text-center mb-12">
              <p className="text-[#AC7E71] text-xs font-semibold tracking-widest uppercase mb-3">Be Prepared</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-[#5E312B]">Key Costs to Budget For</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
              {COSTS.map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-5 bg-[#F8F4F2] rounded-2xl border border-[#E5D5CF]">
                  <div className="w-2 h-2 rounded-full bg-[#AC7E71] mt-2 shrink-0" />
                  <div>
                    <h3 className="font-semibold text-[#5E312B] mb-1">{item.title}</h3>
                    <p className="text-[#5E312B] font-bold text-lg">{item.amount}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{item.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── RESOURCES ── */}
        <section className="py-20 bg-[#F8F4F2]">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="text-center mb-12">
              <p className="text-[#AC7E71] text-xs font-semibold tracking-widest uppercase mb-3">Tools & Guides</p>
              <h2 className="font-display text-3xl font-bold text-[#5E312B]">Helpful Resources</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {RESOURCES.map((resource, i) => (
                <a
                  key={i}
                  href="#"
                  className="group p-5 bg-white rounded-2xl border border-[#E5D5CF] hover:border-[#AC7E71] hover:shadow-lg transition-all"
                >
                  <div className="w-8 h-8 bg-[#5E312B] rounded-lg flex items-center justify-center mb-3 group-hover:bg-[#AC7E71] transition-colors">
                    <Calculator className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="font-semibold text-[#5E312B] text-sm mb-1">{resource.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{resource.description}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="relative overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1600&h=400&fit=crop&q=80"
            alt=""
            aria-hidden="true"
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-[#5E312B]/90 flex items-center justify-center">
            <div className="text-center px-6">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">Ready to Start Your Search?</h2>
              <p className="text-white/60 mb-7 max-w-xl mx-auto">Our expert agents know the BC market inside out. Let us help you find your perfect home.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/listings" className="px-8 py-3.5 bg-[#AC7E71] text-[#5E312B] font-bold rounded-xl hover:bg-[#9A6B5D] transition-colors shadow-lg">
                  Browse Listings
                </Link>
                <Link href="/contact" className="px-8 py-3.5 border-2 border-white/30 text-white font-semibold rounded-xl hover:border-[#AC7E71] hover:text-[#AC7E71] transition-colors">
                  Talk to an Agent
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  );
}
