import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { HeroSection } from "@/components/sections/hero-section";
import { ListingsSection } from "@/components/sections/listings-section";
import { ServicesSection } from "@/components/sections/services-section";
import { TeamSection } from "@/components/sections/team-section";
import { CTASection } from "@/components/sections/cta-section";
import { BlogSection } from "@/components/sections/blog-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";

export default function HomePage() {
  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only fixed left-4 top-4 z-[9999] rounded-md bg-[#2C1810] px-4 py-2 text-sm font-bold text-white shadow-lg">Skip to main content</a>

      <SiteHeader />

      <main id="main-content" tabIndex={-1} className="outline-none">
        <HeroSection />
        
        <ListingsSection />
        
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-16">
            <div className="text-center mb-12">
              <p className="text-[#2C1810] font-semibold text-sm uppercase tracking-wider mb-2">Explore</p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Popular BC Neighbourhoods</h2>
              <p className="text-gray-600 mt-3 max-w-2xl mx-auto">Discover the best communities in British Columbia</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: "Downtown Vancouver", slug: "downtown-vancouver", image: "https://images.unsplash.com/photo-1559511260-66c68d1e93d6?w=600&h=400&fit=crop", desc: "Urban living at its finest" },
                { name: "West Vancouver", slug: "west-vancouver", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop", desc: "Luxury waterfront homes" },
                { name: "Richmond", slug: "richmond", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop", desc: "Family-friendly communities" },
                { name: "Burnaby", slug: "burnaby", image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&h=400&fit=crop", desc: "Modern amenities and parks" },
              ].map((hood) => (
                <a key={hood.slug} href={`/neighbourhoods/${hood.slug}`} className="group relative overflow-hidden rounded-2xl aspect-[4/3]">
                  <img src={hood.image} alt={hood.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-bold text-white mb-1">{hood.name}</h3>
                    <p className="text-gray-200 text-sm">{hood.desc}</p>
                  </div>
                </a>
              ))}
            </div>
            
            <div className="text-center mt-10">
              <a href="/neighbourhoods" className="inline-flex items-center gap-2 px-6 py-3 bg-[#2C1810] text-white rounded-xl font-semibold hover:bg-[#3D2314] transition-colors">View All Neighborhoods</a>
            </div>
          </div>
        </section>

        <TestimonialsSection />
        
        <ServicesSection />
        
        <section className="py-20 bg-[#FAF8F5]">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-16">
            <div className="text-center mb-12">
              <p className="text-[#2C1810] font-semibold text-sm uppercase tracking-wider mb-2">Process</p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">How It Works</h2>
              <p className="text-gray-600 mt-3 max-w-2xl mx-auto">Finding your dream home in BC is easier than you think.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { step: "01", title: "Schedule a Call", desc: "Book a free consultation with one of our BC experts." },
                { step: "02", title: "Search and Tour", desc: "We'll send personalized listings and schedule private tours." },
                { step: "03", title: "Close the Deal", desc: "Our team guides you from offer to keys." },
              ].map((item, i) => (
                <div key={i} className="text-center p-8 bg-white rounded-2xl shadow-lg">
                  <p className="text-[#2C1810] font-bold text-2xl mb-2">{item.step}</p>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <TeamSection />
        
        <CTASection />
        
        <BlogSection />
      </main>

      <SiteFooter />
    </>
  );
}