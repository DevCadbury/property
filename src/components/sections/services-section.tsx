"use client";

import { motion } from "framer-motion";
import { Home, Key, Calculator, Search, Phone, ArrowRight, CheckCircle, MapPin, Clock, Shield, Users } from "lucide-react";
import Link from "next/link";

const SERVICES = [
  {
    id: "seller",
    title: "Seller Benefits",
    description: "Get top dollar for your home with our proven marketing strategies and professional staging advice.",
    link: "/sell",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
  },
  {
    id: "buyer",
    title: "Buyer Benefits", 
    description: "Find your perfect property with our expert guidance. We help you navigate the market and negotiate the best deal.",
    link: "/buy",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
  },
];

const SERVICE_CARDS = [
  { icon: Home, title: "Home Buying", desc: "Find your dream BC home with expert guidance", link: "/buy" },
  { icon: Key, title: "Home Selling", desc: "Get top dollar for your property", link: "/sell" },
  { icon: Calculator, title: "Mortgage Calculator", desc: "Plan your finances with ease", link: "/calculator" },
  { icon: Search, title: "Property Valuation", desc: "Know your home's market value", link: "/sell/valuation" },
];

const WHY_CHOOSE_US = [
  { icon: Shield, title: "Licensed & Insured", desc: "Fully licensed BC real estate professionals" },
  { icon: Clock, title: "Available 24/7", desc: "We're always here when you need us" },
  { icon: CheckCircle, title: "Satisfaction Guaranteed", desc: "98% of clients recommend us" },
  { icon: MapPin, title: "Local BC Experts", desc: "Deep knowledge of BC neighborhoods" },
];

export function ServicesSection() {
  return (
    <section className="py-20 bg-[#F8F4F2]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-16">
        {/* Hero Banner */}
        <div className="relative w-full h-48 md:h-64 rounded-2xl overflow-hidden mb-12">
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1400&h=400&fit=crop&q=80"
            alt="Luxury BC homes"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#5E312B]/80 to-transparent flex items-center px-10">
            <div>
              <p className="text-[#AC7E71] text-sm font-semibold uppercase tracking-widest mb-1">Results Driven</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white">Your BC Real Estate Experts</h2>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[#5E312B] font-semibold text-sm uppercase tracking-wider mb-2">Our Services</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Love where you live
          </h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Whether you&apos;re a first-time buyer, selling your family home, or looking for a change — we&apos;re here to make BC real estate simple and enjoyable.
          </p>
        </div>

        {/* Large Visual Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-2xl"
            >
              <Link href={service.link} className="block">
                <div className="aspect-[16/10] relative">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url('${service.image}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#5E312B]/85 via-[#5E312B]/40 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <span className="px-3 py-1 bg-[#AC7E71] text-white text-xs font-semibold rounded-full mb-3 inline-block">
                      {service.id === 'seller' ? 'SELLING' : 'BUYING'}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-200 text-sm mb-4 line-clamp-2">
                      {service.description}
                    </p>
                    <span className="inline-flex items-center gap-2 text-white font-semibold group-hover:gap-3 transition-all">
                      Learn more <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Service Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {SERVICE_CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#F8F4F2] rounded-xl p-6 hover:shadow-lg transition-all hover:-translate-y-1 group"
            >
              <div className="w-12 h-12 bg-[#5E312B] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <card.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{card.title}</h3>
              <p className="text-gray-600 text-sm mb-3">{card.desc}</p>
              <Link href={card.link} className="text-[#5E312B] font-medium text-sm hover:underline">
                Learn More
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Why Choose Us */}
        <div className="bg-[#F8F4F2] rounded-3xl p-8 md:p-12">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Why Choose Pacific Edge Realty</h2>
            <p className="text-gray-600 mt-2">What sets us apart from other BC real estate companies</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_CHOOSE_US.map((item, i) => (
              <div key={i} className="text-center p-6 bg-white rounded-xl">
                <div className="w-14 h-14 bg-[#AC7E71]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-[#AC7E71]" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-wrap justify-center gap-4 mt-12">
          <Link
            href="/contact"
            className="px-6 py-3 bg-[#5E312B] text-white rounded-xl font-semibold hover:bg-[#7A463E] transition-colors flex items-center gap-2"
          >
            <Phone className="w-5 h-5" /> Talk to an Expert
          </Link>
          <Link
            href="/sell/valuation"
            className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-[#5E312B] hover:text-[#5E312B] transition-colors"
          >
            Get Home Value
          </Link>
        </div>
      </div>
    </section>
  );
}