"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { HeroSection } from "@/components/sections/hero-section";
import { ListingsSection } from "@/components/sections/listings-section";
import { ServicesSection } from "@/components/sections/services-section";
import { CTASection } from "@/components/sections/cta-section";
import { BlogSection } from "@/components/sections/blog-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowRight, Calculator, Home as HomeIcon } from "lucide-react";

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string; }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >{children}</motion.div>
  );
}

const HOODS = [
  { name: "Surrey", slug: "surrey", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop&q=80", desc: "Fraser Valley's largest city" },
  { name: "Cloverdale", slug: "cloverdale", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop&q=80", desc: "Historic charm meets modern living" },
  { name: "Langley", slug: "langley", image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&h=400&fit=crop&q=80", desc: "Growing community & great value" },
  { name: "Aldergrove", slug: "aldergrove", image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop&q=80", desc: "Peaceful rural neighbourhoods" },
  { name: "Abbotsford", slug: "abbotsford", image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&h=400&fit=crop&q=80", desc: "BC's fastest growing city" },
  { name: "Maple Ridge", slug: "maple-ridge", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop&q=80", desc: "Mountain views & family living" },
];

export default function HomePage() {
  const { t } = useLanguage();
  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only fixed left-4 top-4 z-[9999] rounded-md bg-[#5E312B] px-4 py-2 text-sm font-bold text-white shadow-lg">Skip to main content</a>
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <HeroSection />

        {/* ── GUIDES — minimalist, light ── */}
        <section className="bg-white border-b border-[#F0E6E2]">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-16 py-16 md:py-20">
            <FadeUp className="max-w-2xl mb-10">
              <p className="text-[#AC7E71] text-[11px] font-bold tracking-[0.22em] uppercase mb-2">{t("home.journeyTag")}</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-[#3E1F1B] leading-tight">{t("home.buyingOrSelling")}</h2>
            </FadeUp>

            <div className="grid md:grid-cols-2 gap-5">
              {[
                { href: "/guide/buyers", icon: HomeIcon, tag: t("home.forBuyers"), title: t("home.buyerGuide"), desc: "Mortgage calculator, first-time buyer rebates & expert support throughout your purchase.", cta: t("home.exploreBuyer") },
                { href: "/guide/sellers", icon: Calculator, tag: t("home.forSellers"), title: t("home.sellerGuide"), desc: "Free home evaluation, proven marketing strategy & top-dollar results for your property.", cta: t("home.exploreSeller") },
              ].map((card, i) => (
                <FadeUp key={card.href} delay={i * 0.1}>
                  <Link href={card.href}
                    className="group relative flex items-start gap-5 rounded-2xl border border-[#E5D5CF] bg-[#FBF8F6] p-6 md:p-7 hover:border-[#AC7E71]/60 hover:bg-white hover:shadow-[0_12px_40px_rgba(94,49,43,0.08)] transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-[#5E312B] flex items-center justify-center shrink-0 group-hover:bg-[#AC7E71] transition-colors duration-300">
                      <card.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[#AC7E71] text-[10px] font-bold tracking-[0.2em] uppercase mb-1.5">{card.tag}</p>
                      <h3 className="font-display text-xl font-bold text-[#3E1F1B] mb-1.5 leading-tight">{card.title}</h3>
                      <p className="text-[#8A6A60] text-[13px] leading-relaxed mb-3">{card.desc}</p>
                      <span className="inline-flex items-center gap-1.5 text-[#5E312B] text-[13px] font-semibold group-hover:gap-2.5 transition-all">
                        {card.cta} <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        <ListingsSection />

        {/* ── NEIGHBOURHOODS ── */}
        <section className="py-24 bg-[#F8F4F2]">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-16">
            <FadeUp className="mb-14">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <p className="text-[#5E312B] text-[10px] font-bold tracking-[0.22em] uppercase mb-2">{t("home.communities")}</p>
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-[#3E1F1B]">Fraser Valley &amp; BC Neighbourhoods</h2>
                  <p className="text-[#8A6A60] mt-2 text-sm max-w-lg">From suburban Surrey to rural Aldergrove — find your perfect community.</p>
                </div>
                <Link href="/neighbourhoods" className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#5E312B] border border-[#5E312B]/20 px-5 py-2.5 rounded-xl hover:bg-[#5E312B] hover:text-white transition-all duration-200 shrink-0">
                  {t("home.viewAll")} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </FadeUp>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {HOODS.map((hood, i) => (
                <FadeUp key={hood.slug} delay={i * 0.06}>
                  <a href={`/neighbourhoods/${hood.slug}`} className="group block relative overflow-hidden rounded-2xl aspect-[4/3] bg-[#5E312B]">
                    <img src={hood.image} alt={hood.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.06]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                    <div className="absolute inset-0 bg-[#5E312B]/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <div className="flex items-end justify-between">
                        <div>
                          <h3 className="text-white font-bold text-lg leading-tight mb-0.5">{hood.name}</h3>
                          <p className="text-white/60 text-[12px]">{hood.desc}</p>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-[#AC7E71] flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 shrink-0 ml-3">
                          <ArrowRight className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    </div>
                  </a>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        <TestimonialsSection />
        <ServicesSection />
        <CTASection />
        <BlogSection />
      </main>
      <SiteFooter />
    </>
  );
}
