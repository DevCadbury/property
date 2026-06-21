"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, Mountain, Building2 } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    interest: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your inquiry! We'll be in touch soon.");
  };

  return (
    <>
      <SiteHeader />

      <main className="min-h-screen bg-background">
        {/* Hero - BC Focused */}
        <div className="relative bg-[#1a365d] text-white py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <Mountain className="w-full h-full" />
          </div>
          <div className="relative max-w-7xl mx-auto px-6 md:px-10 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Building2 className="w-5 h-5 text-[#d4af37]" />
              <span className="text-[#d4af37] font-medium">British Columbia Real Estate Experts</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Get In Touch
            </h1>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto">
              Have questions about BC real estate? We&apos;re here to help. 
              Reach out to our team of local experts across Vancouver & BC.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
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
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#2D4F3C]"
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
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#2D4F3C]"
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
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#2D4F3C]"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#2D4F3C]"
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
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#2D4F3C]"
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
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#2D4F3C] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-[#2D4F3C] text-white font-semibold rounded-lg hover:bg-[#234136] transition-colors"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info - BC Offices */}
            <div className="space-y-8">
              <div>
                <h2 className="font-display text-2xl font-bold mb-6">Our BC Offices</h2>
                <div className="space-y-6">
                  {/* Vancouver Office */}
                  <div className="p-6 rounded-lg border border-border bg-card">
                    <div className="flex items-start gap-4">
                      <MapPin className="w-6 h-6 text-[#2D4F3C] shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Vancouver — Headquarters</h3>
                        <p className="text-muted-foreground text-sm mb-3">
                          1055 West Georgia Street, Suite 2400<br />
                          Vancouver, BC V6E 3P3
                        </p>
                        <div className="flex flex-col gap-2 text-sm">
                          <a href="tel:+16045550100" className="flex items-center gap-2 text-[#2D4F3C] hover:underline">
                            <Phone className="w-4 h-4" /> +1 (604) 555-0100
                          </a>
                          <a href="mailto:vancouver@pacificedge.ca" className="flex items-center gap-2 text-[#2D4F3C] hover:underline">
                            <Mail className="w-4 h-4" /> vancouver@pacificedge.ca
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Victoria Office */}
                  <div className="p-6 rounded-lg border border-border bg-card">
                    <div className="flex items-start gap-4">
                      <MapPin className="w-6 h-6 text-[#2D4F3C] shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Victoria</h3>
                        <p className="text-muted-foreground text-sm mb-3">
                          1512 Fort Street, Suite 200<br />
                          Victoria, BC V8S 3K2
                        </p>
                        <div className="flex flex-col gap-2 text-sm">
                          <a href="tel:+12505550300" className="flex items-center gap-2 text-[#2D4F3C] hover:underline">
                            <Phone className="w-4 h-4" /> +1 (250) 555-0300
                          </a>
                          <a href="mailto:victoria@pacificedge.ca" className="flex items-center gap-2 text-[#2D4F3C] hover:underline">
                            <Mail className="w-4 h-4" /> victoria@pacificedge.ca
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Office Hours */}
              <div className="p-6 rounded-lg border border-border bg-card">
                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-[#2D4F3C] shrink-0 mt-1" />
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

              {/* Emergency */}
              <div className="p-4 rounded-lg bg-[#2D4F3C]/10 border border-[#2D4F3C]/20">
                <p className="text-sm text-foreground">
                  <span className="font-semibold">After-Hours Emergency:</span> For urgent matters outside business hours, 
                  call our emergency line at <a href="tel:+16045550999" className="underline">+1 (604) 555-0999</a>
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