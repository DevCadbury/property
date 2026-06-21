"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Home, MapPin, DollarSign, Camera, User, CheckCircle, ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

const STEPS = [
  { number: 1, title: "Property Details", description: "Basic information about your property" },
  { number: 2, title: "Location", description: "Address and neighbourhood details" },
  { number: 3, title: "Pricing", description: "Your asking price expectations" },
  { number: 4, title: "Photos", description: "Upload images of your property" },
  { number: 5, title: "Contact", description: "Your contact information" },
];

export default function ListPropertyPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1
    propertyType: "",
    bedrooms: "",
    bathrooms: "",
    squareFeet: "",
    yearBuilt: "",
    // Step 2
    address: "",
    city: "",
    postalCode: "",
    // Step 3
    askingPrice: "",
    timeline: "",
    // Step 4
    images: [] as string[],
    // Step 5
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleNext = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

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
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-24 h-24 bg-forest/10 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle className="w-12 h-12 text-forest" />
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-3xl font-bold text-foreground mb-4"
            >
              Submission Received!
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground mb-8"
            >
              Thank you for listing your property with Pacific Edge. One of our agents will contact you within 24 hours to discuss next steps and provide a market valuation.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a href="/" className="px-6 py-3 bg-forest text-white font-semibold rounded-lg">
                Return Home
              </a>
              <a href="/contact" className="px-6 py-3 border-2 border-forest text-forest font-semibold rounded-lg">
                Contact Us
              </a>
            </motion.div>
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
        <div className="bg-forest text-primary-foreground py-16">
          <div className="max-w-7xl mx-auto px-6 md:px-10 text-center">
            <h1 className="font-display text-4xl font-bold mb-4">List Your Property</h1>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              Get the best price for your home with our premium marketing and expert guidance
            </p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="border-b border-border">
          <div className="max-w-3xl mx-auto px-6 md:px-10 py-6">
            <div className="flex items-center justify-between">
              {STEPS.map((step) => (
                <div key={step.number} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    currentStep >= step.number ? "bg-forest text-white" : "bg-muted text-muted-foreground"
                  }`}>
                    {step.number}
                  </div>
                  {step.number < 5 && (
                    <div className={`hidden sm:block w-12 lg:w-20 h-0.5 mx-2 ${
                      currentStep > step.number ? "bg-forest" : "bg-muted"
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              {STEPS.map((step) => (
                <span key={step.number} className="hidden sm:block flex-1 text-center">{step.title}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="max-w-2xl mx-auto px-6 md:px-10 py-12">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Property Details */}
            {currentStep === 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">Property Details</h2>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Property Type *</label>
                  <select
                    required
                    value={formData.propertyType}
                    onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-forest"
                  >
                    <option value="">Select type</option>
                    <option value="house">House</option>
                    <option value="condo">Condo/Apartment</option>
                    <option value="townhouse">Townhouse</option>
                    <option value="land">Land</option>
                  </select>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Bedrooms</label>
                    <select
                      value={formData.bedrooms}
                      onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground"
                    >
                      <option value="">Any</option>
                      {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Bathrooms</label>
                    <select
                      value={formData.bathrooms}
                      onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground"
                    >
                      <option value="">Any</option>
                      {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Sq Ft</label>
                    <input
                      type="number"
                      value={formData.squareFeet}
                      onChange={(e) => setFormData({ ...formData, squareFeet: e.target.value })}
                      placeholder="e.g. 2000"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Year Built</label>
                  <input
                    type="number"
                    value={formData.yearBuilt}
                    onChange={(e) => setFormData({ ...formData, yearBuilt: e.target.value })}
                    placeholder="e.g. 2015"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground"
                  />
                </div>
              </motion.div>
            )}

            {/* Step 2: Location */}
            {currentStep === 2 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">Property Location</h2>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Street Address *</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="123 Main Street"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">City *</label>
                    <select
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground"
                    >
                      <option value="">Select city</option>
                      <option value="Vancouver">Vancouver</option>
                      <option value="Victoria">Victoria</option>
                      <option value="North Vancouver">North Vancouver</option>
                      <option value="West Vancouver">West Vancouver</option>
                      <option value="Burnaby">Burnaby</option>
                      <option value="Surrey">Surrey</option>
                      <option value="Richmond">Richmond</option>
                      <option value="Other">Other BC</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Postal Code *</label>
                    <input
                      type="text"
                      required
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      placeholder="V6B 1A1"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Pricing */}
            {currentStep === 3 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">Asking Price & Timeline</h2>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Asking Price (CAD)</label>
                  <input
                    type="number"
                    value={formData.askingPrice}
                    onChange={(e) => setFormData({ ...formData, askingPrice: e.target.value })}
                    placeholder="e.g. 1500000"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Selling Timeline</label>
                  <select
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground"
                  >
                    <option value="">Select timeline</option>
                    <option value="immediately">Immediately</option>
                    <option value="1-3 months">1-3 months</option>
                    <option value="3-6 months">3-6 months</option>
                    <option value="6+ months">6+ months</option>
                    <option value="not sure">Not sure yet</option>
                  </select>
                </div>
              </motion.div>
            )}

            {/* Step 4: Photos (Mock) */}
            {currentStep === 4 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">Property Photos</h2>
                
                <div className="border-2 border-dashed border-border rounded-lg p-12 text-center">
                  <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-2">Drag and drop images here, or click to browse</p>
                  <p className="text-xs text-muted-foreground">Supports: JPG, PNG (Max 20MB per image)</p>
                  <input type="file" className="hidden" multiple accept="image/*" />
                </div>

                <p className="text-sm text-muted-foreground">
                  You can also email photos later to <span className="text-forest">listings@pacificedge.ca</span>
                </p>
              </motion.div>
            )}

            {/* Step 5: Contact */}
            {currentStep === 5 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">Your Contact Information</h2>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">First Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Last Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Phone *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Additional Notes</label>
                  <textarea
                    rows={4}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Any additional information about your property..."
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground resize-none"
                  />
                </div>
              </motion.div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-6 border-t border-border">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-6 py-3 border border-border text-foreground font-medium rounded-lg hover:bg-muted"
                >
                  Back
                </button>
              ) : (
                <div />
              )}
              
              {currentStep < 5 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-3 bg-forest text-white font-semibold rounded-lg hover:bg-forest-light flex items-center gap-2"
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-6 py-3 bg-forest text-white font-semibold rounded-lg hover:bg-forest-light flex items-center gap-2"
                >
                  Submit Listing Request <CheckCircle className="w-4 h-4" />
                </button>
              )}
            </div>
          </form>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}