"use client";

import { useState } from "react";
import { CheckCircle, TrendingUp, Home, Tag, FileText, Key, ArrowRight, DollarSign } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

const STEPS = [
  {
    icon: TrendingUp,
    step: "01",
    title: "Determine Your Home's Value",
    description: "We provide a comprehensive market analysis considering recent sales, current listings, and unique features.",
    details: ["Comparative market analysis", "Property features assessment", "Current market conditions", "Price positioning strategy"],
  },
  {
    icon: Home,
    step: "02",
    title: "Prepare Your Home",
    description: "First impressions matter. We guide you through staging, repairs, and improvements to maximize appeal.",
    details: ["Home staging recommendations", "Repairs & maintenance", "Decluttering & depersonalizing", "Professional photography"],
  },
  {
    icon: Tag,
    step: "03",
    title: "List & Market",
    description: "We create a targeted marketing plan. Our strategy includes online, print, and social media exposure.",
    details: ["Professional listing photos", "Virtual tour creation", "MLS & online exposure", "Social media campaigns"],
  },
  {
    icon: FileText,
    step: "04",
    title: "Review Offers & Negotiate",
    description: "When offers come in, we help you evaluate each one and negotiate the best terms for your situation.",
    details: ["Offer analysis", "Terms & conditions review", "Negotiation strategy", "Counter-offer guidance"],
  },
  {
    icon: FileText,
    step: "05",
    title: "Accept & Close",
    description: "After accepting an offer, we coordinate inspections, appraisals, and work with your lawyer to complete the sale.",
    details: ["Coordinate inspections", "Appraisal management", "Condition fulfillment", "Lawyer coordination"],
  },
  {
    icon: Key,
    step: "06",
    title: "Hand Over Keys",
    description: "On closing day, your lawyer transfers ownership. We ensure a smooth transition to the new owners.",
    details: ["Final walkthrough", "Document signing", "Key handover", "Post-sale support"],
  },
];

const TIPS = [
  "Deep clean and declutter every room",
  "Fix minor repairs before listing",
  "Enhance curb appeal with landscaping",
  "Neutralize bold paint colors",
  "Update lighting for brightness",
  "Stage each room with purpose",
  "Remove personal photos & items",
  "Hide or organize valuables",
];

const COSTS = [
  { title: "Real Estate Commission", amount: "~4–5%", note: "Split between listing & buyer's agents" },
  { title: "Legal Fees", amount: "$1,000–$2,500", note: "Lawyer handles contract & title transfer" },
  { title: "Payouts & Debts", amount: "Varies", note: "Mortgage payoff, lines of credit, strata fees" },
];

export default function SellerGuidePage() {
  const [formData, setFormData] = useState({ fullName: "", email: "", phone: "", address: "" });
  const [formErrors, setFormErrors] = useState({ fullName: "", email: "", phone: "", address: "" });
  const [submitted, setSubmitted] = useState(false);

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateForm = (data: typeof formData) => ({
    fullName: data.fullName.trim() === "" ? "Full name is required." : "",
    email: !isValidEmail(data.email) ? "A valid email address is required." : "",
    phone: data.phone.trim() === "" ? "Phone number is required." : "",
    address: data.address.trim() === "" ? "Property address is required." : "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm(formData);
    if (Object.values(errors).some(Boolean)) { setFormErrors(errors); return; }
    setSubmitted(true);
  };

  const handleFieldChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setFormErrors((prev) => ({ ...prev, [field]: "" }));
  };

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[#F8F4F2]">

        {/* ── HERO BANNER ── */}
        <div className="relative overflow-hidden min-h-[340px] flex items-end">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&h=500&fit=crop&q=85"
            alt="Luxury home for sale"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#5E312B]/95 via-[#5E312B]/80 to-[#5E312B]/40" />
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#AC7E71] to-transparent" />
          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-16 w-full">
            <p className="text-[#AC7E71] text-xs font-semibold tracking-widest uppercase mb-3 flex items-center gap-2">
              <span className="w-6 h-[1px] bg-[#AC7E71]" /> Planet Group Realty
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3">Seller&apos;s Guide</h1>
            <p className="text-white/60 max-w-xl text-base">
              Maximize your property&apos;s value with our proven strategy, expert marketing, and skilled negotiation.
            </p>
          </div>
        </div>

        {/* ── OVERVIEW ── */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="relative order-2 lg:order-1">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop&q=85"
                    alt="Home interior"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-5 -right-5 bg-[#AC7E71] text-[#5E312B] px-6 py-4 rounded-2xl shadow-xl">
                  <p className="text-2xl font-bold">Top 1%</p>
                  <p className="text-[#5E312B]/70 text-xs tracking-wide">BC Realtors</p>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <p className="text-[#AC7E71] text-xs font-semibold tracking-widest uppercase mb-4 flex items-center gap-2">
                  <span className="w-5 h-[1px] bg-[#AC7E71]" /> Sell Smarter
                </p>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-[#5E312B] mb-6 leading-tight">
                  Sell Smarter,<br />Sell Faster
                </h2>
                <p className="text-gray-600 text-lg mb-4 leading-relaxed">
                  Selling your home is more than listing it online. It requires strategic pricing, expert marketing, and skilled negotiation.
                </p>
                <p className="text-gray-500 mb-8">
                  Our team has helped hundreds of BC homeowners achieve top dollar. We handle every detail so you can focus on your next chapter.
                </p>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#5E312B] text-white rounded-xl font-semibold text-sm hover:bg-[#7A463E] transition-colors shadow-lg"
                >
                  Get a Free Consultation <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── STEPS ── */}
        <section className="py-20 bg-[#F8F4F2]">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="text-center mb-14">
              <p className="text-[#AC7E71] text-xs font-semibold tracking-widest uppercase mb-3">The Process</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-[#5E312B]">The Selling Process</h2>
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

        {/* ── FREE HOME EVALUATION ── */}
        <section id="free-evaluation" className="py-20 bg-[#5E312B] relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <img
              src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1600&h=700&fit=crop&q=60"
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#AC7E71] to-transparent" />
          <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left copy */}
              <div>
                <p className="text-[#AC7E71] text-xs font-semibold tracking-widest uppercase mb-4 flex items-center gap-2">
                  <span className="w-5 h-[1px] bg-[#AC7E71]" /> No Obligation
                </p>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-5 leading-tight">
                  Free Home<br />Evaluation
                </h2>
                <p className="text-white/60 mb-8 leading-relaxed">
                  Wondering what your home is worth in today&apos;s market? Our experts will assess your property and provide a detailed, no-obligation market report within 24 hours.
                </p>
                <div className="space-y-4">
                  {["Comprehensive market analysis", "Recent comparable sales", "Personalized pricing strategy", "No strings attached"].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#AC7E71]/20 border border-[#AC7E71]/40 flex items-center justify-center shrink-0">
                        <CheckCircle className="w-3 h-3 text-[#AC7E71]" />
                      </div>
                      <span className="text-white/70 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form */}
              <div className="bg-white rounded-2xl p-8 shadow-2xl">
                {!submitted ? (
                  <>
                    <h3 className="font-display text-xl font-bold text-[#5E312B] mb-1">Get Your Free Report</h3>
                    <p className="text-gray-400 text-sm mb-6">We&apos;ll respond within 24 hours.</p>
                    <form onSubmit={handleSubmit} noValidate className="space-y-4">
                      {[
                        { field: "fullName" as const, label: "Full Name", type: "text", placeholder: "Jane Smith" },
                        { field: "email" as const, label: "Email Address", type: "email", placeholder: "jane@example.com" },
                        { field: "phone" as const, label: "Phone Number", type: "tel", placeholder: "(604) 555-0100" },
                        { field: "address" as const, label: "Property Address", type: "text", placeholder: "123 Maple Street, Vancouver, BC" },
                      ].map(({ field, label, type, placeholder }) => (
                        <div key={field}>
                          <label htmlFor={field} className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                            {label} <span className="text-[#AC7E71]">*</span>
                          </label>
                          <input
                            id={field}
                            type={type}
                            value={formData[field]}
                            onChange={(e) => handleFieldChange(field, e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-[#E5D5CF] bg-[#F8F4F2] text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#AC7E71] focus:border-transparent transition-all"
                            placeholder={placeholder}
                          />
                          {formErrors[field] && (
                            <p role="alert" className="text-red-500 text-xs mt-1">{formErrors[field]}</p>
                          )}
                        </div>
                      ))}
                      <button
                        type="submit"
                        className="w-full py-4 bg-[#AC7E71] text-[#5E312B] rounded-xl font-bold text-sm tracking-wide hover:bg-[#9A6B5D] transition-colors shadow-lg mt-2"
                      >
                        GET MY FREE EVALUATION
                      </button>
                    </form>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-[#AC7E71] rounded-full flex items-center justify-center mx-auto mb-5">
                      <CheckCircle className="w-8 h-8 text-[#5E312B]" />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-[#5E312B] mb-2">Thank You!</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      We&apos;ll be in touch shortly with your free home evaluation. Our team typically responds within 24 hours.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── PREP TIPS ── */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-[#AC7E71] text-xs font-semibold tracking-widest uppercase mb-4">Before You List</p>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-[#5E312B] mb-6">Prepare Your Home for Success</h2>
                <p className="text-gray-500 mb-8">These simple preparations can significantly impact buyer interest and offer prices.</p>
                <div className="grid grid-cols-2 gap-3">
                  {TIPS.map((tip, i) => (
                    <div key={i} className="flex items-start gap-2.5 p-3.5 bg-[#F8F4F2] rounded-xl border border-[#E5D5CF]">
                      <CheckCircle className="w-4 h-4 text-[#AC7E71] shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop&q=85"
                    alt="Staged home"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── COSTS ── */}
        <section className="py-20 bg-[#F8F4F2]">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="text-center mb-12">
              <p className="text-[#AC7E71] text-xs font-semibold tracking-widest uppercase mb-3">No Surprises</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-[#5E312B]">Understanding Selling Costs</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {COSTS.map((item, i) => (
                <div key={i} className="bg-white rounded-2xl p-7 border border-[#E5D5CF] text-center hover:border-[#AC7E71] hover:shadow-lg transition-all">
                  <div className="w-10 h-10 bg-[#5E312B] rounded-xl flex items-center justify-center mx-auto mb-4">
                    <DollarSign className="w-5 h-5 text-[#AC7E71]" />
                  </div>
                  <h3 className="font-semibold text-[#5E312B] mb-2">{item.title}</h3>
                  <p className="text-[#AC7E71] font-bold text-xl mb-1">{item.amount}</p>
                  <p className="text-gray-400 text-xs">{item.note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="relative overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1600&h=400&fit=crop&q=80"
            alt=""
            aria-hidden="true"
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-[#5E312B]/90 flex items-center justify-center">
            <div className="text-center px-6">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">Ready to Sell Your Home?</h2>
              <p className="text-white/60 mb-7 max-w-xl mx-auto">Request a free, no-obligation market valuation. We&apos;ll visit your home and provide a detailed report.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#free-evaluation" className="px-8 py-3.5 bg-[#AC7E71] text-[#5E312B] font-bold rounded-xl hover:bg-[#9A6B5D] transition-colors shadow-lg">
                  Get Free Evaluation
                </a>
                <a href="/contact" className="px-8 py-3.5 border-2 border-white/30 text-white font-semibold rounded-xl hover:border-[#AC7E71] hover:text-[#AC7E71] transition-colors">
                  Talk to an Agent
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  );
}
