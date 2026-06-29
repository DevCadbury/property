"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, Mountain, Building2, CheckCircle } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

const AREAS_SERVED = [
  "Surrey", "Cloverdale", "Langley", "Aldergrove",
  "Abbotsford", "Maple Ridge", "Delta", "Coquitlam",
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    unitNumber: "",
    companyName: "",
    interest: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <SiteHeader />

      <main className="min-h-screen bg-background">
        {/* Hero */}
        <div className="relative bg-[#5E312B] text-white py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <Mountain className="w-full h-full" />
          </div>
          <div className="relative max-w-7xl mx-auto px-6 md:px-10 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Building2 className="w-5 h-5 text-[#AC7E71]" />
              <span className="text-[#AC7E71] font-medium">British Columbia Real Estate Experts</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Get In Touch
            </h1>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto">
              Have questions about BC real estate? We&apos;re here to help.
              Reach out to Harpreet Dhillon &amp; Planet Group Realty Inc.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form or Success Card */}
            <div>
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center text-center py-12 px-8 rounded-2xl border border-green-200 bg-green-50"
                >
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h2 className="font-display text-3xl font-bold text-gray-900 mb-4">Message Received!</h2>
                  <p className="text-gray-600 mb-8 max-w-md leading-relaxed">
                    Thank you for reaching out to Harpreet Dhillon &amp; Planet Group Realty Inc. We typically respond within 24–48 hours. We look forward to helping you with your real estate journey.
                  </p>
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-8 py-3 bg-[#AC7E71] text-[#5E312B] font-semibold rounded-xl hover:bg-[#9A6B5D] transition-colors"
                  >
                    Back to Home
                  </Link>
                </motion.div>
              ) : (
                <>
                  <h2 className="font-display text-2xl font-bold mb-6">Send Us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          required
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#AC7E71]"
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-2">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          required
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#AC7E71]"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#AC7E71]"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                          Phone *
                        </label>
                        <div className="flex rounded-lg border border-border bg-background overflow-hidden focus-within:ring-2 focus-within:ring-[#AC7E71]">
                          <span className="flex items-center px-3 bg-gray-100 text-gray-600 text-sm font-medium border-r border-border select-none whitespace-nowrap">
                            🇨🇦 +1
                          </span>
                          <input
                            type="tel"
                            id="phone"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="778 240 0000"
                            className="flex-1 px-4 py-3 bg-background text-foreground focus:outline-none"
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">e.g. +1 778 240 0000</p>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="unitNumber" className="block text-sm font-medium text-foreground mb-2">
                          Unit / Suite Number (optional)
                        </label>
                        <input
                          type="text"
                          id="unitNumber"
                          value={formData.unitNumber}
                          onChange={(e) => setFormData({ ...formData, unitNumber: e.target.value })}
                          placeholder="e.g. 204"
                          className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#AC7E71]"
                        />
                      </div>
                      <div>
                        <label htmlFor="companyName" className="block text-sm font-medium text-foreground mb-2">
                          Company Name (optional)
                        </label>
                        <input
                          type="text"
                          id="companyName"
                          value={formData.companyName}
                          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                          placeholder="e.g. ABC Realty"
                          className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#AC7E71]"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="interest" className="block text-sm font-medium text-foreground mb-2">
                        I&apos;m interested in
                      </label>
                      <select
                        id="interest"
                        value={formData.interest}
                        onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#AC7E71]"
                      >
                        <option value="">Select an option</option>
                        <option value="buying">Buying a property in BC</option>
                        <option value="selling">Selling my BC property</option>
                        <option value="renting">Renting in BC</option>
                        <option value="investment">Investment opportunities</option>
                        <option value="other">Other inquiry</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about your BC real estate needs..."
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#AC7E71] resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-[#AC7E71] text-[#5E312B] font-semibold rounded-lg hover:bg-[#9A6B5D] transition-colors"
                    >
                      <Send className="w-5 h-5" />
                      Send Message
                    </button>
                  </form>
                </>
              )}
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div>
                <h2 className="font-display text-2xl font-bold mb-6">Contact Information</h2>
                {/* Agent Card */}
                <div className="p-6 rounded-lg border border-border bg-card">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-[#AC7E71] shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Harpreet Dhillon</h3>
                      <p className="text-muted-foreground text-sm mb-3">Planet Group Realty Inc.</p>
                      <div className="flex flex-col gap-2 text-sm">
                        <a href="tel:7782400000" className="flex items-center gap-2 text-[#AC7E71] hover:underline">
                          <Phone className="w-4 h-4" /> 778.240.0000
                        </a>
                        <a href="mailto:harpreet@planetgrouprealty.ca" className="flex items-center gap-2 text-[#AC7E71] hover:underline">
                          <Mail className="w-4 h-4" /> harpreet@planetgrouprealty.ca
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Response Time Info Box */}
              <div className="p-4 rounded-lg bg-[#AC7E71]/10 border border-[#AC7E71]/30">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#AC7E71] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-1">Response Time</p>
                    <p className="text-sm text-muted-foreground">
                      We typically respond within <strong className="text-foreground">24–48 hours</strong> during business hours.
                    </p>
                  </div>
                </div>
              </div>

              {/* Office Hours */}
              <div className="p-6 rounded-lg border border-border bg-card">
                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-[#AC7E71] shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">Office Hours (Pacific Time)</h3>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p><span className="text-foreground font-medium">Monday — Friday:</span> 9:00 AM — 6:00 PM</p>
                      <p><span className="text-foreground font-medium">Saturday:</span> 10:00 AM — 4:00 PM</p>
                      <p><span className="text-foreground font-medium">Sunday:</span> By appointment</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Areas We Serve */}
              <div className="p-6 rounded-lg border border-border bg-card">
                <h3 className="font-semibold text-foreground mb-4">Areas We Serve</h3>
                <div className="flex flex-wrap gap-2">
                  {AREAS_SERVED.map((area) => (
                    <span
                      key={area}
                      className="px-3 py-1 text-sm rounded-full bg-[#F8F4F2] border border-[#E5D5CF] text-gray-700"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
