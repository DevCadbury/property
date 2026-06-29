"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useLanguage, LANGUAGES, type LangCode } from "@/context/LanguageContext";
import { MOCK_LISTINGS } from "@/data/mock";
import {
  X, User, Search, ChevronDown, ChevronRight, Globe, Check,
  MapPin, Phone, Home, Key, Calculator, Star, ArrowRight, Bed, Bath,
} from "lucide-react";

const FEATURED = MOCK_LISTINGS.slice(0, 3);

const fmt = (n: number) =>
  new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 }).format(n);

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [langOpen, setLangOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { user } = useAuth();
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setOpenDropdown(null);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const id = setTimeout(() => { setOpenDropdown(null); setMobileOpen(false); setOpenSection(null); }, 0);
    return () => clearTimeout(id);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const navLinks = [
    {
      id: "search", label: t("nav.search"), mega: true,
      children: [
        { href: "/listings", label: "All Listings", desc: "Browse all properties" },
        { href: "/featured-listings", label: "Featured", desc: "Handpicked homes" },
        { href: "/neighbourhoods", label: "Communities", desc: "Explore BC areas" },
      ],
    },
    {
      id: "services", label: t("nav.services"),
      children: [
        { href: "/buy", label: "Buying", desc: "Find your home" },
        { href: "/sell", label: "Selling", desc: "Sell your property" },
        { href: "/rent", label: "Renting", desc: "Find a rental" },
        { href: "/sell/valuation", label: "Evaluation", desc: "Get home evaluation" },
      ],
    },
    {
      id: "guides", label: t("nav.guides"),
      children: [
        { href: "/guide/buyers", label: "Buyer's Guide", desc: "Steps + Mortgage Calculator" },
        { href: "/guide/sellers", label: "Seller's Guide", desc: "Process + Free Evaluation" },
        { href: "/guide/buyers#mortgage-calculator", label: "Mortgage Calculator", desc: "Estimate your payments" },
        { href: "/guide/sellers#free-evaluation", label: "Free Home Evaluation", desc: "Know your home's worth" },
      ],
    },
    { href: "/contact", label: t("nav.contact") },
    { href: "/testimonials", label: t("nav.reviews") },
    {
      id: "about", label: t("nav.about"),
      children: [
        { href: "/about", label: "Our Story", desc: "Who we are" },
        { href: "/agents", label: "Our Team", desc: "Meet our agents" },
        { href: "/blog", label: "Blog", desc: "News & tips" },
      ],
    },
  ];

  const drawerQuickLinks = [
    { href: "/listings", icon: Home, label: "Browse Listings", color: "#5E312B" },
    { href: "/guide/buyers#mortgage-calculator", icon: Calculator, label: "Mortgage Calculator", color: "#AC7E71", badge: "FREE" },
    { href: "/guide/sellers#free-evaluation", icon: Star, label: "Free Home Evaluation", color: "#5E312B", badge: "FREE" },
    { href: "/sell/valuation", icon: Key, label: "Property Evaluation", color: "#AC7E71" },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-500 ${
          isScrolled
            ? "bg-white/98 backdrop-blur-md shadow-[0_1px_0_rgba(94,49,43,0.08),0_4px_24px_rgba(94,49,43,0.08)] border-b border-[#E5D5CF]/70"
            : "bg-[#3E1F1B]/95 backdrop-blur-sm"
        }`}
      >
        {/* Top utility bar */}
        <div className={`hidden lg:block overflow-hidden transition-all duration-500 ${isScrolled ? "max-h-0 opacity-0" : "max-h-10 opacity-100"}`}>
          <div className="border-b border-white/[0.07]">
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-9">
              <div className="flex items-center gap-5 text-[11px] text-white/50 font-medium tracking-wide">
                <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3 text-[#AC7E71]" /> Metro Vancouver &amp; Fraser Valley, BC</span>
                <span className="w-px h-3 bg-white/15" />
                <a href="tel:7782400000" className="flex items-center gap-1.5 hover:text-white/80 transition-colors"><Phone className="w-3 h-3 text-[#AC7E71]" /> 778.240.0000</a>
              </div>
              <div className="flex items-center gap-5 text-[11px] text-white/50 font-medium tracking-wide">
                <span className="text-[#C99C8E] tracking-[0.15em] uppercase text-[10px]">Trusted Fraser Valley Real Estate</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main nav */}
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16 md:h-[68px]">
            {/* LOGO — height is set via inline style. Change "45px" to resize */}
            <Link href="/" className="flex items-center shrink-0">
              <img
                src="/harpreet-logo.png"
                alt="Harpreet Dhillon — Planet Group Realty Inc."
                style={{ height: "150px", width: "auto", objectFit: "contain" }}
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center" ref={dropdownRef}>
              {navLinks.map((link) => (
                <div key={link.id || link.href} className="relative"
                  onMouseEnter={() => link.children && setOpenDropdown(link.id!)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  {link.children ? (
                    <>
                      <button className={`flex items-center gap-1 px-3.5 py-2 text-[14px] font-medium tracking-wide transition-all rounded-lg ${isScrolled ? (openDropdown === link.id ? "text-[#5E312B] bg-[#F2E7E3]" : "text-[#5E312B]/70 hover:text-[#5E312B] hover:bg-[#F2E7E3]") : (openDropdown === link.id ? "text-[#C99C8E] bg-white/[0.06]" : "text-white/70 hover:text-white hover:bg-white/[0.06]")}`}>
                        {link.label}
                        <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${openDropdown === link.id ? "rotate-180" : ""}`} />
                      </button>

                      {openDropdown === link.id && link.mega && (
                        <motion.div initial={{ opacity: 0, y: 8, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
                          className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50">
                          <div className="w-[640px] bg-white rounded-2xl shadow-[0_12px_50px_rgba(94,49,43,0.22)] border border-[#E5D5CF] overflow-hidden grid grid-cols-[1fr_1.4fr]">
                            {/* Left: links */}
                            <div className="p-3 bg-[#F8F4F2] border-r border-[#E5D5CF]">
                              <p className="text-[9px] font-bold tracking-widest uppercase text-[#AC7E71] px-3 pt-2 pb-1.5">Browse</p>
                              {link.children.map((child) => (
                                <Link key={child.href} href={child.href} className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-white transition-colors group">
                                  <div>
                                    <span className="block text-[13px] font-semibold text-[#3E1F1B]">{child.label}</span>
                                    <span className="block text-[11px] text-[#8A6A60]">{child.desc}</span>
                                  </div>
                                  <ChevronRight className="w-3.5 h-3.5 text-[#AC7E71] opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
                                </Link>
                              ))}
                            </div>
                            {/* Right: featured properties */}
                            <div className="p-3">
                              <p className="text-[9px] font-bold tracking-widest uppercase text-[#AC7E71] px-2 pt-2 pb-1.5">Featured Listings</p>
                              <div className="space-y-1">
                                {FEATURED.map((p) => (
                                  <Link key={p.id} href={`/listings/${p.slug}`} className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#F8F4F2] transition-colors group">
                                    <div className="w-16 h-12 rounded-lg overflow-hidden shrink-0">
                                      <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <p className="text-[12px] font-semibold text-[#3E1F1B] truncate">{p.title}</p>
                                      <p className="text-[11px] text-[#AC7E71] font-bold">{fmt(p.price)}</p>
                                      <div className="flex items-center gap-2 text-[10px] text-[#8A6A60] mt-0.5">
                                        <span className="flex items-center gap-0.5"><Bed className="w-3 h-3" />{p.beds}</span>
                                        <span className="flex items-center gap-0.5"><Bath className="w-3 h-3" />{p.baths}</span>
                                        <span className="truncate">{p.neighborhood}</span>
                                      </div>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                              <Link href="/listings" className="flex items-center justify-center gap-1.5 mt-2 py-2 text-[12px] font-semibold text-[#5E312B] bg-[#F2E7E3] rounded-xl hover:bg-[#AC7E71] hover:text-white transition-colors">
                                View All Listings <ArrowRight className="w-3.5 h-3.5" />
                              </Link>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {openDropdown === link.id && !link.mega && (
                        <motion.div initial={{ opacity: 0, y: 6, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.18, ease: [0.32, 0.72, 0, 1] }}
                          className="absolute top-full left-0 pt-2 z-50">
                          <div className={`bg-white rounded-2xl shadow-[0_8px_40px_rgba(94,49,43,0.18)] border border-[#E5D5CF] overflow-hidden py-1 ${link.id === "guides" ? "w-60" : "w-52"}`}>
                            {link.id === "guides" ? (
                              <>
                                <div className="px-4 pt-2 pb-1"><span className="text-[9px] font-bold tracking-widest uppercase text-[#AC7E71]">Guides</span></div>
                                {link.children.slice(0, 2).map((child) => (
                                  <Link key={child.href} href={child.href} className="flex items-start gap-3 px-4 py-2.5 hover:bg-[#F8F4F2] transition-colors group">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#AC7E71] mt-1.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div><span className="block text-[13px] font-semibold text-[#3E1F1B]">{child.label}</span><span className="block text-[11px] text-[#8A6A60] mt-0.5">{child.desc}</span></div>
                                  </Link>
                                ))}
                                <div className="mx-4 my-1 border-t border-[#E5D5CF]" />
                                <div className="px-4 pt-1 pb-1"><span className="text-[9px] font-bold tracking-widest uppercase text-[#AC7E71]">Tools</span></div>
                                {link.children.slice(2).map((child) => (
                                  <Link key={child.href} href={child.href} className="flex items-center justify-between gap-3 px-4 py-2.5 hover:bg-[#F8F4F2] transition-colors">
                                    <div><span className="block text-[13px] font-semibold text-[#3E1F1B]">{child.label}</span><span className="block text-[11px] text-[#8A6A60] mt-0.5">{child.desc}</span></div>
                                    <span className="shrink-0 text-[9px] font-bold tracking-wide bg-[#AC7E71]/15 text-[#5E312B] px-2 py-0.5 rounded-full border border-[#AC7E71]/30">FREE</span>
                                  </Link>
                                ))}
                              </>
                            ) : (
                              link.children.map((child) => (
                                <Link key={child.href} href={child.href} className="flex items-start gap-3 px-4 py-3 hover:bg-[#F8F4F2] transition-colors group">
                                  <div className="w-1.5 h-1.5 rounded-full bg-[#AC7E71] mt-1.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                                  <div><span className="block text-[13px] font-semibold text-[#3E1F1B]">{child.label}</span><span className="block text-[11px] text-[#8A6A60] mt-0.5">{child.desc}</span></div>
                                </Link>
                              ))
                            )}
                          </div>
                        </motion.div>
                      )}
                    </>
                  ) : (
                    <Link href={link.href!} className={`relative flex items-center px-3.5 py-2 text-[14px] font-medium tracking-wide rounded-lg transition-all ${isScrolled ? "text-[#5E312B]/70 hover:text-[#5E312B] hover:bg-[#F2E7E3]" : "text-white/70 hover:text-white hover:bg-white/[0.06]"}`}>
                      {link.label}
                      {pathname === link.href && <motion.span layoutId="nav-active" className="absolute bottom-0 left-3.5 right-3.5 h-[2px] bg-[#AC7E71] rounded-full" />}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              {/* Language selector — functional */}
              <div className="relative hidden lg:block" onMouseLeave={() => setLangOpen(false)}>
                <button onClick={() => setLangOpen(!langOpen)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-[13px] font-semibold border transition-all ${isScrolled ? "border-[#E5D5CF] text-[#5E312B] hover:border-[#AC7E71]" : "border-white/20 text-white/80 hover:border-white/40 hover:text-white"}`}>
                  <Globe className="w-3.5 h-3.5" /> {lang}
                  <ChevronDown className={`w-3 h-3 transition-transform ${langOpen ? "rotate-180" : ""}`} />
                </button>
                {langOpen && (
                  <motion.div initial={{ opacity: 0, y: 6, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.18 }}
                    className="absolute top-full right-0 pt-2 z-50">
                    <div className="bg-white rounded-2xl shadow-[0_8px_40px_rgba(94,49,43,0.18)] border border-[#E5D5CF] overflow-hidden py-1 w-52">
                      <p className="text-[9px] font-bold tracking-widest uppercase text-[#AC7E71] px-4 pt-2 pb-1">Choose Language</p>
                      {LANGUAGES.map((l) => (
                        <button key={l.code} onClick={() => { setLang(l.code as LangCode); setLangOpen(false); }}
                          className={`w-full flex items-center justify-between px-4 py-2.5 text-[13px] hover:bg-[#F8F4F2] transition-colors ${lang === l.code ? "font-semibold text-[#5E312B]" : "text-[#3E1F1B]/70"}`}>
                          <span><span className="font-semibold">{l.native}</span> <span className="text-[#8A6A60] text-[11px]">· {l.label}</span></span>
                          {lang === l.code && <Check className="w-3.5 h-3.5 text-[#AC7E71]" />}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              <Link href="/listings" title="Search" className={`p-2 rounded-lg transition-colors ${isScrolled ? "text-[#5E312B]/60 hover:text-[#5E312B] hover:bg-[#F2E7E3]" : "text-white/60 hover:text-white hover:bg-white/[0.06]"}`}>
                <Search className="w-[18px] h-[18px]" />
              </Link>

              {user ? (
                <Link href={user.role === "agent" || user.role === "admin" ? "/agent/dashboard" : "/dashboard"} className={`hidden md:flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[14px] font-medium border transition-all ${isScrolled ? "border-[#E5D5CF] text-[#5E312B] hover:border-[#AC7E71]" : "border-white/20 text-white/80 hover:border-white/40 hover:text-white"}`}>
                  <User className="w-3.5 h-3.5" /> {t("nav.account")}
                </Link>
              ) : (
                <Link href="/login" className={`hidden md:flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[14px] font-medium border transition-all ${isScrolled ? "border-[#E5D5CF] text-[#5E312B] hover:border-[#AC7E71]" : "border-white/20 text-white/80 hover:border-white/40 hover:text-white"}`}>
                  {t("nav.signIn")}
                </Link>
              )}

              <Link href="/list-property" className="hidden sm:flex items-center gap-1.5 px-4 py-2 bg-[#AC7E71] text-white rounded-xl text-[14px] font-bold tracking-wide hover:bg-[#9A6B5D] transition-colors shadow-md shadow-[#AC7E71]/25">
                {t("nav.listProperty")}
              </Link>

              <button onClick={() => setMobileOpen(true)} aria-label="Open menu"
                className={`lg:hidden flex flex-col justify-center items-center w-10 h-10 rounded-xl gap-1.5 transition-colors ${isScrolled ? "text-[#5E312B] hover:bg-[#F2E7E3]" : "text-white hover:bg-white/[0.08]"}`}>
                <span className={`block w-5 h-[1.5px] rounded-full transition-all ${isScrolled ? "bg-[#5E312B]" : "bg-white"}`} />
                <span className={`block w-3.5 h-[1.5px] rounded-full transition-all ${isScrolled ? "bg-[#5E312B]" : "bg-white"}`} />
                <span className={`block w-5 h-[1.5px] rounded-full transition-all ${isScrolled ? "bg-[#5E312B]" : "bg-white"}`} />
              </button>
            </div>
          </div>
        </div>
        <motion.div className="h-px overflow-hidden" initial={false} animate={{ opacity: isScrolled ? 0 : 1 }} transition={{ duration: 0.4 }}>
          <div className="h-full bg-gradient-to-r from-transparent via-[#AC7E71]/35 to-transparent" />
        </motion.div>
      </header>

      {/* Drawer backdrop */}
      <div onClick={() => { setMobileOpen(false); setOpenSection(null); }}
        className={`lg:hidden fixed inset-0 z-[60] bg-black/50 backdrop-blur-[2px] transition-opacity duration-300 ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`} aria-hidden="true" />

      {/* Drawer panel */}
      <div className={`lg:hidden fixed top-0 right-0 bottom-0 z-[70] w-[88vw] max-w-[360px] bg-white flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between px-5 py-4 bg-[#3E1F1B] shrink-0">
          <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center">
            <img
              src="/harpreet-logo.png"
              alt="Harpreet Dhillon — Planet Group Realty Inc."
              style={{ height: "150px", width: "auto", objectFit: "contain" }}
            />
          </Link>
          <button onClick={() => { setMobileOpen(false); setOpenSection(null); }} aria-label="Close menu" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
            <X className="w-4 h-4 text-white" />
          </button>
        </div>
        <div className="h-[2px] shrink-0 bg-gradient-to-r from-[#AC7E71] via-[#C99C8E] to-transparent" />

        <div className="flex-1 overflow-y-auto overscroll-contain">
          {/* Language row */}
          <div className="px-4 pt-4">
            <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#AC7E71] mb-2">Language</p>
            <div className="flex flex-wrap gap-1.5">
              {LANGUAGES.map((l) => (
                <button key={l.code} onClick={() => setLang(l.code as LangCode)}
                  className={`px-2.5 py-1.5 rounded-lg text-[11px] font-semibold border transition-colors ${lang === l.code ? "bg-[#AC7E71] text-white border-[#AC7E71]" : "border-[#E5D5CF] text-[#5E312B] hover:border-[#AC7E71]"}`}>
                  {l.native}
                </button>
              ))}
            </div>
          </div>

          <div className="px-4 pt-4 pb-2">
            <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#AC7E71] mb-3">Quick Access</p>
            <div className="grid grid-cols-2 gap-2">
              {drawerQuickLinks.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}
                  className="group relative flex flex-col gap-2 p-3.5 rounded-2xl border border-[#E5D5CF] bg-[#F8F4F2] hover:border-[#AC7E71] hover:bg-white transition-all active:scale-[0.97]">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: item.color + "18", border: `1px solid ${item.color}30` }}>
                    <item.icon className="w-4 h-4" style={{ color: item.color }} />
                  </div>
                  <span className="text-[12px] font-semibold text-[#3E1F1B] leading-tight pr-4">{item.label}</span>
                  {item.badge && <span className="absolute top-2.5 right-2.5 text-[8px] font-bold tracking-wide bg-[#AC7E71] text-white px-1.5 py-0.5 rounded-full">{item.badge}</span>}
                </Link>
              ))}
            </div>
          </div>

          <div className="mx-4 my-2 border-t border-[#F0E6E2]" />

          <div className="px-4 py-2">
            <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#AC7E71] mb-2">Navigation</p>
            <div className="space-y-0.5">
              {navLinks.map((link) => (
                <div key={link.id || link.href}>
                  {link.children ? (
                    <>
                      <button onClick={() => setOpenSection(openSection === link.id ? null : link.id!)}
                        className="flex items-center justify-between w-full px-3 py-3 rounded-xl text-[#3E1F1B] font-semibold text-[14px] hover:bg-[#F8F4F2] transition-colors">
                        <span>{link.label}</span>
                        <ChevronRight className={`w-4 h-4 text-[#AC7E71] transition-transform duration-200 ${openSection === link.id ? "rotate-90" : ""}`} />
                      </button>
                      {openSection === link.id && (
                        <div className="ml-3 mb-1 border-l-2 border-[#AC7E71]/30 pl-3 space-y-0.5">
                          {link.children.map((child) => {
                            const isTool = child.href.includes("#mortgage-calculator") || child.href.includes("#free-evaluation");
                            return (
                              <Link key={child.href} href={child.href} onClick={() => { setMobileOpen(false); setOpenSection(null); }}
                                className="flex items-center justify-between py-2.5 px-2 rounded-lg hover:bg-[#F8F4F2] transition-colors">
                                <div>
                                  <span className="block text-[13px] font-medium text-[#3E1F1B]">{child.label}</span>
                                  <span className="block text-[11px] text-[#8A6A60]">{child.desc}</span>
                                </div>
                                {isTool ? <span className="text-[9px] font-bold bg-[#AC7E71]/15 border border-[#AC7E71]/40 text-[#5E312B] px-2 py-0.5 rounded-full">FREE</span> : <ArrowRight className="w-3.5 h-3.5 text-[#AC7E71] shrink-0" />}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link href={link.href!} onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between px-3 py-3 rounded-xl text-[#3E1F1B] font-semibold text-[14px] hover:bg-[#F8F4F2] transition-colors">
                      {link.label} <ArrowRight className="w-4 h-4 text-[#AC7E71]" />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mx-4 mt-2 mb-4 rounded-2xl bg-[#F8F4F2] border border-[#E5D5CF] p-4">
            <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#AC7E71] mb-3">Get in Touch</p>
            <a href="tel:7782400000" className="flex items-center gap-2.5 mb-2.5 group">
              <div className="w-7 h-7 rounded-full bg-[#AC7E71]/15 flex items-center justify-center"><Phone className="w-3.5 h-3.5 text-[#AC7E71]" /></div>
              <span className="text-[13px] font-semibold text-[#3E1F1B] group-hover:text-[#AC7E71] transition-colors">778.240.0000</span>
            </a>
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-[#5E312B]/12 flex items-center justify-center"><MapPin className="w-3.5 h-3.5 text-[#5E312B]" /></div>
              <span className="text-[12px] text-[#8A6A60]">Metro Vancouver &amp; Fraser Valley</span>
            </div>
          </div>
        </div>

        <div className="shrink-0 px-4 py-4 border-t border-[#E5D5CF] bg-white space-y-2.5">
          <Link href="/list-property" onClick={() => setMobileOpen(false)} className="flex items-center justify-center gap-2 py-3.5 bg-[#AC7E71] text-white rounded-2xl font-bold text-[14px] tracking-wide shadow-lg shadow-[#AC7E71]/25 hover:bg-[#9A6B5D] transition-colors active:scale-[0.98]">
            <Home className="w-4 h-4" /> {t("nav.listProperty")}
          </Link>
          <Link href="/login" onClick={() => setMobileOpen(false)} className="flex items-center justify-center gap-2 py-3 border-2 border-[#E5D5CF] text-[#5E312B] rounded-2xl font-semibold text-[14px] hover:border-[#AC7E71] transition-colors">
            <User className="w-4 h-4 text-[#AC7E71]" /> {t("nav.signIn")}
          </Link>
        </div>
      </div>
    </>
  );
}
