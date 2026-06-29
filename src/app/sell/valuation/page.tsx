"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, CheckCircle, Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

export default function ValuationPage() {
  const [formData, setFormData] = useState({
    address: "",
    unitNumber: "",
    postalCode: "",
    propertyType: "",
    bedrooms: "",
    bathrooms: "",
    yearBuilt: "",
    name: "",
    email: "",
    phone: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <>
        <SiteHeader />
        <main className="min-h-screen bg-background flex items-center justify-center">
          <div className="max-w-xl mx-auto px-6 py-20 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-4">Evaluation Request Received!</h1>
            <p className="text-muted-foreground mb-6">
              Thank you for your interest in a home evaluation. One of our expert agents will contact you within 24–48 hours with your property&apos;s estimated market value.
            </p>
            <a href="/" className="text-[#5E312B] hover:underline font-semibold">Return to Home</a>
          </div>
        </main>
        <SiteFooter />
      </>
    );
  }

  return (
    <>
      <SiteHeader />

      <main className="min-h-screen bg-background">
        {/* Hero */}
        <div className="bg-[#5E312B] text-white py-20">
          <div className="max-w-7xl mx-auto px-6 md:px-10 text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Free Home Evaluation</h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Get an accurate market estimate for your BC property from our expert agents
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">Property Details</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Property Address *</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="123 Main Street"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#AC7E71]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Unit / Suite Number (optional)</label>
                  <input
                    type="text"
                    value={formData.unitNumber}
                    onChange={(e) => setFormData({ ...formData, unitNumber: e.target.value })}
                    placeholder="e.g. 204"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#AC7E71]"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Postal Code *</label>
                    <input
                      type="text"
                      required
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      placeholder="V6B 1A1"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#AC7E71]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Property Type</label>
                    <select
                      value={formData.propertyType}
                      onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#AC7E71]"
                    >
                      <option value="">Select type</option>
                      <option value="house">House</option>
                      <option value="condo">Condo/Apartment</option>
                      <option value="townhouse">Townhouse</option>
                      <option value="land">Land</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Bedrooms</label>
                    <select
                      value={formData.bedrooms}
                      onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#AC7E71]"
                    >
                      <option value="">Any</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5+">5+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Bathrooms</label>
                    <select
                      value={formData.bathrooms}
                      onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#AC7E71]"
                    >
                      <option value="">Any</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Year Built</label>
                    <input
                      type="text"
                      value={formData.yearBuilt}
                      onChange={(e) => setFormData({ ...formData, yearBuilt: e.target.value })}
                      placeholder="e.g. 2015"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#AC7E71]"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <h3 className="font-semibold text-foreground mb-4">Your Contact Information</h3>
                  <div className="space-y-4">
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your Name *"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#AC7E71]"
                    />
                    <div className="grid md:grid-cols-2 gap-4">
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Email Address *"
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#AC7E71]"
                      />
                      <div className="flex rounded-lg border border-border bg-background overflow-hidden focus-within:ring-2 focus-within:ring-[#AC7E71]">
                        <span className="flex items-center px-3 bg-gray-100 text-gray-600 text-sm font-medium border-r border-border select-none whitespace-nowrap">
                          🇨🇦 +1
                        </span>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="778 240 0000"
                          className="flex-1 px-4 py-3 bg-background text-foreground focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-[#AC7E71] text-[#5E312B] font-semibold rounded-lg hover:bg-[#9A6B5D] transition-colors"
                >
                  <Calculator className="w-5 h-5" />
                  Get My Free Evaluation
                </button>
              </form>
            </div>

            {/* Info */}
            <div className="space-y-8">
              <div className="p-6 rounded-lg border border-border bg-card">
                <h3 className="font-semibold text-foreground mb-4">What You&apos;ll Receive</h3>
                <ul className="space-y-3">
                  {[
                    "Comprehensive market analysis",
                    "Comparable property sales data",
                    "Current market trends in your area",
                    "Recommended listing price range",
                    "Estimated days on market",
                    "Personal consultation with an agent",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-muted-foreground">
                      <CheckCircle className="w-5 h-5 text-[#5E312B] shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 rounded-lg border border-border bg-card">
                <h3 className="font-semibold text-foreground mb-4">Contact Us Directly</h3>
                <div className="space-y-2 mb-4">
                  <p className="font-semibold text-foreground">Harpreet Dhillon</p>
                  <p className="text-muted-foreground text-sm">Planet Group Realty Inc.</p>
                </div>
                <div className="space-y-3">
                  <a href="tel:7782400000" className="flex items-center gap-3 text-[#5E312B] hover:underline">
                    <Phone className="w-5 h-5 text-[#AC7E71]" /> 778.240.0000
                  </a>
                  <a href="mailto:harpreet@planetgrouprealty.ca" className="flex items-center gap-3 text-[#5E312B] hover:underline">
                    <Mail className="w-5 h-5 text-[#AC7E71]" /> harpreet@planetgrouprealty.ca
                  </a>
                </div>
              </div>

              <div className="p-6 rounded-lg bg-[#5E312B]/10 border border-[#5E312B]/20">
                <p className="text-sm text-foreground">
                  <strong>Average home evaluation completed:</strong> 4.2 hours<br />
                  <strong>Free, no-obligation assessment</strong><br />
                  We typically respond within <strong>24–48 hours</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
