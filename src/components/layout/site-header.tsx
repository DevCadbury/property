"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  X, User, Search, ChevronDown, ChevronRight,
  MapPin, Phone, Home, Key, Calculator, Star, ArrowRight,
} from "lucide-react";

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const id = setTimeout(() => {
      setOpenDropdown(null);
      setMobileOpen(false);
      setOpenSection(null);
    }, 0);
    return () => clearTimeout(id);
  }, [pathname]);

  // Prevent body scroll when drawer open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const navLinks = [
    {
      id: "search",
      label: "Search for Homes",
      children: [
        { href: "/listings", label: "All Listings", desc: "Browse all properties" },
        { href: "/featured-listings", label: "Featured", desc: "Handpicked homes" },
        { href: "/neighbourhoods", label: "Communities", desc: "Explore BC areas" },
      ],
    },
    {
      id: "services",
      label: "Our Services",
      children: [
        { href: "/buy", label: "Buying", desc: "Find your home" },
        { href: "/sell", label: "Selling", desc: "Sell your property" },
        { href: "/rent", label: "Renting", desc: "Find a rental" },
        { href: "/sell/valuation", label: "Valuation", desc: "Get home value" },
      ],
    },
    {
      id: "guides",
      label: "Guides",
      children: [
        { href: "/guide/buyers", label: "Buyer's Guide", desc: "Steps + Mortgage Calculator" },
        { href: "/guide/sellers", label: "Seller's Guide", desc: "Process + Free Evaluation" },
        { href: "/guide/buyers#mortgage-calculator", label: "Mortgage Calculator", desc: "Estimate your payments" },
        { href: "/guide/sellers#free-evaluation", label: "Free Home Evaluation", desc: "Know your home's worth" },
      ],
    },
    { href: "/contact", label: "Contact" },
    { href: "/testimonials", label: "Reviews" },
    {
      id: "about",
      label: "About",
      children: [
        { href: "/about", label: "Our Story", desc: "Who we are" },
        { href: "/agents", label: "Our Team", desc: "Meet our agents" },
        { href: "/blog", label: "Blog", desc: "News & tips" },
      ],
    },
  ];

  const drawerQuickLinks = [
    { href: "/listings", icon: Home, label: "Browse Listings", color: "#2C1810" },
    { href: "/guide/buyers#mortgage-calculator", icon: Calculator, label: "Mortgage Calculator", color: "#D4AF37", badge: "FREE" },
    { href: "/guide/sellers#free-evaluation", icon: Star, label: "Free Home Evaluation", color: "#3EB489", badge: "FREE" },
    { href: "/sell/valuation", icon: Key, label: "Property Valuation", color: "#2C1810" },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-500 ${
          isScrolled
            ? "bg-white/97 backdrop-blur-md shadow-[0_2px_24px_rgba(44,24,16,0.10)] border-b border-[#E8D5C0]"
            : "bg-[#1A0F0A]/96 backdrop-blur-sm"
        }`}
      >
        {/* Top utility bar */}
        <div className={`hidden lg:block overflow-hidden transition-all duration-500 ${isScrolled ? "max-h-0 opacity-0" : "max-h-10 opacity-100"}`}>
          <div className="border-b border-white/[0.07]">
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-9">
              <div className="flex items-center gap-5 text-[11px] text-white/50 font-medium tracking-wide">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-[#D4AF37]" /> Metro Vancouver &amp; Fraser Valley, BC
                </span>
                <span className="w-px h-3 bg-white/15" />
                <a href="tel:7782400000" className="flex items-center gap-1.5 hover:text-white/80 transition-colors">
                  <Phone className="w-3 h-3 text-[#D4AF37]" /> 778.240.0000
                </a>
              </div>
              <div className="flex items-center gap-5 text-[11px] text-white/50 font-medium tracking-wide">
                <Link href="/blog" className="hover:text-white/80 transition-colors">Blog</Link>
                <span className="w-px h-3 bg-white/15" />
                <Link href="/contact" className="hover:text-white/80 transition-colors">Talk to Us</Link>
                <span className="w-px h-3 bg-white/15" />
                <Link href="/login" className="hover:text-white/80 transition-colors">Login / Register</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Main nav */}
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16 md:h-[68px]">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 shrink-0">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-colors ${isScrolled ? "border-[#2C1810]/30 bg-[#2C1810]" : "border-[#D4AF37]/50 bg-transparent"}`}>
                <svg viewBox="0 0 36 36" className="w-6 h-6" fill="none">
                  <circle cx="18" cy="18" r="14" stroke="#D4AF37" strokeWidth="1.4" />
                  <path d="M18 4C18 4 13 11 13 18C13 25 18 32 18 32C18 32 23 25 23 18C23 11 18 4 18 4Z" stroke="#D4AF37" strokeWidth="1.2" fill="none"/>
                  <line x1="4" y1="18" x2="32" y2="18" stroke="#D4AF37" strokeWidth="1.2"/>
                  <path d="M12 23L18 17L24 23" stroke="#D4AF37" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15.5 21V27H20.5V21" stroke="#D4AF37" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="leading-none">
                <span className={`block font-bold text-[15px] tracking-[0.08em] uppercase transition-colors ${isScrolled ? "text-[#2C1810]" : "text-white"}`}>Planet Group</span>
                <span className={`block text-[9px] tracking-[0.18em] uppercase font-medium transition-colors ${isScrolled ? "text-[#D4AF37]" : "text-[#D4AF37]/80"}`}>Realty Inc.</span>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center" ref={dropdownRef}>
              {navLinks.map((link) => (
                <div
                  key={link.id || link.href}
                  className="relative"
                  onMouseEnter={() => link.children && setOpenDropdown(link.id!)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  {link.children ? (
                    <>
                      <button className={`flex items-center gap-1 px-3.5 py-2 text-[13px] font-medium tracking-wide transition-all rounded-lg ${isScrolled ? (openDropdown === link.id ? "text-[#2C1810] bg-[#FAF8F5]" : "text-[#2C1810]/70 hover:text-[#2C1810] hover:bg-[#FAF8F5]") : (openDropdown === link.id ? "text-[#D4AF37] bg-white/[0.06]" : "text-white/70 hover:text-white hover:bg-white/[0.06]")}`}>
                        {link.label}
                        <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${openDropdown === link.id ? "rotate-180" : ""}`} />
                      </button>
                      {openDropdown === link.id && (
                        <div className="absolute top-full left-0 pt-2 z-50">
                          <div className={`bg-white rounded-2xl shadow-[0_8px_40px_rgba(44,24,16,0.18)] border border-[#E8D5C0] overflow-hidden py-1 ${link.id === "guides" ? "w-60" : "w-52"}`}>
                            {link.id === "guides" ? (
                              <>
                                <div className="px-4 pt-2 pb-1"><span className="text-[9px] font-bold tracking-widest uppercase text-gray-400">Guides</span></div>
                                {link.children.slice(0, 2).map((child) => (
                                  <Link key={child.href} href={child.href} className="flex items-start gap-3 px-4 py-2.5 hover:bg-[#FAF8F5] transition-colors group">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-1.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div><span className="block text-[13px] font-semibold text-[#2C1810]">{child.label}</span><span className="block text-[11px] text-gray-400 mt-0.5">{child.desc}</span></div>
                                  </Link>
                                ))}
                                <div className="mx-4 my-1 border-t border-[#E8D5C0]" />
                                <div className="px-4 pt-1 pb-1"><span className="text-[9px] font-bold tracking-widest uppercase text-gray-400">Tools</span></div>
                                {link.children.slice(2).map((child) => (
                                  <Link key={child.href} href={child.href} className="flex items-center justify-between gap-3 px-4 py-2.5 hover:bg-[#FAF8F5] transition-colors">
                                    <div><span className="block text-[13px] font-semibold text-[#2C1810]">{child.label}</span><span className="block text-[11px] text-gray-400 mt-0.5">{child.desc}</span></div>
                                    <span className="shrink-0 text-[9px] font-bold tracking-wide bg-[#D4AF37]/15 text-[#2C1810] px-2 py-0.5 rounded-full border border-[#D4AF37]/30">FREE</span>
                                  </Link>
                                ))}
                              </>
                            ) : (
                              link.children.map((child) => (
                                <Link key={child.href} href={child.href} className="flex items-start gap-3 px-4 py-3 hover:bg-[#FAF8F5] transition-colors group">
                                  <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-1.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                                  <div><span className="block text-[13px] font-semibold text-[#2C1810]">{child.label}</span><span className="block text-[11px] text-gray-400 mt-0.5">{child.desc}</span></div>
                                </Link>
                              ))
                            )}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <Link href={link.href!} className={`flex items-center px-3.5 py-2 text-[13px] font-medium tracking-wide rounded-lg transition-all ${isScrolled ? "text-[#2C1810]/70 hover:text-[#2C1810] hover:bg-[#FAF8F5]" : "text-white/70 hover:text-white hover:bg-white/[0.06]"}`}>
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              <Link href="/listings" title="Search" className={`p-2 rounded-lg transition-colors ${isScrolled ? "text-[#2C1810]/60 hover:text-[#2C1810] hover:bg-[#FAF8F5]" : "text-white/60 hover:text-white hover:bg-white/[0.06]"}`}>
                <Search className="w-[18px] h-[18px]" />
              </Link>
              {user ? (
                <Link href={user.role === "agent" || user.role === "admin" ? "/agent/dashboard" : "/dashboard"} className={`hidden md:flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[13px] font-medium border transition-all ${isScrolled ? "border-[#E8D5C0] text-[#2C1810] hover:border-[#D4AF37]" : "border-white/20 text-white/80 hover:border-white/40 hover:text-white"}`}>
                  <User className="w-3.5 h-3.5" /> My Account
                </Link>
              ) : (
                <Link href="/login" className={`hidden md:flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[13px] font-medium border transition-all ${isScrolled ? "border-[#E8D5C0] text-[#2C1810] hover:border-[#D4AF37]" : "border-white/20 text-white/80 hover:border-white/40 hover:text-white"}`}>
                  Sign In
                </Link>
              )}
              <Link href="/list-property" className="hidden sm:flex items-center gap-1.5 px-4 py-2 bg-[#D4AF37] text-[#2C1810] rounded-xl text-[13px] font-bold tracking-wide hover:bg-[#C9A227] transition-colors shadow-md shadow-[#D4AF37]/20">
                List Property
              </Link>
              {/* Hamburger — mobile only */}
              <button
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
                className={`lg:hidden flex flex-col justify-center items-center w-10 h-10 rounded-xl gap-1.5 transition-colors ${isScrolled ? "text-[#2C1810] hover:bg-[#FAF8F5]" : "text-white hover:bg-white/[0.08]"}`}
              >
                <span className={`block w-5 h-[1.5px] rounded-full transition-all ${isScrolled ? "bg-[#2C1810]" : "bg-white"}`} />
                <span className={`block w-3.5 h-[1.5px] rounded-full transition-all ${isScrolled ? "bg-[#2C1810]" : "bg-white"}`} />
                <span className={`block w-5 h-[1.5px] rounded-full transition-all ${isScrolled ? "bg-[#2C1810]" : "bg-white"}`} />
              </button>
            </div>
          </div>
        </div>
        {/* Gold hairline */}
        <div className={`h-px transition-opacity duration-500 ${isScrolled ? "opacity-0" : "opacity-100"}`}>
          <div className="h-full bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
        </div>
      </header>

      {/* ── RIGHT-SIDE DRAWER OVERLAY ── */}
      {/* Backdrop */}
      <div
        onClick={() => { setMobileOpen(false); setOpenSection(null); }}
        className={`lg:hidden fixed inset-0 z-[60] bg-black/50 backdrop-blur-[2px] transition-opacity duration-300 ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        className={`lg:hidden fixed top-0 right-0 bottom-0 z-[70] w-[88vw] max-w-[360px] bg-white flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-4 bg-[#2C1810] shrink-0">
          <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full border border-[#D4AF37]/60 flex items-center justify-center">
              <svg viewBox="0 0 36 36" className="w-5 h-5" fill="none">
                <circle cx="18" cy="18" r="14" stroke="#D4AF37" strokeWidth="1.4" />
                <path d="M18 4C18 4 13 11 13 18C13 25 18 32 18 32C18 32 23 25 23 18C23 11 18 4 18 4Z" stroke="#D4AF37" strokeWidth="1.2" fill="none"/>
                <line x1="4" y1="18" x2="32" y2="18" stroke="#D4AF37" strokeWidth="1.2"/>
                <path d="M12 23L18 17L24 23" stroke="#D4AF37" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15.5 21V27H20.5V21" stroke="#D4AF37" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="leading-none">
              <span className="block text-white font-bold text-[13px] tracking-widest uppercase">Planet Group</span>
              <span className="block text-[#D4AF37]/80 text-[8px] tracking-[0.2em] uppercase">Realty Inc.</span>
            </div>
          </Link>
          <button
            onClick={() => { setMobileOpen(false); setOpenSection(null); }}
            aria-label="Close menu"
            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>
        {/* Gold accent line */}
        <div className="h-[2px] shrink-0 bg-gradient-to-r from-[#D4AF37] via-[#3EB489] to-transparent" />

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto overscroll-contain">

          {/* Quick tools */}
          <div className="px-4 pt-5 pb-4">
            <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-3">Quick Access</p>
            <div className="grid grid-cols-2 gap-2">
              {drawerQuickLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="group relative flex flex-col gap-2 p-3.5 rounded-2xl border border-[#E8D5C0] bg-[#FAF8F5] hover:border-[#D4AF37] hover:bg-white transition-all active:scale-[0.97]"
                >
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: item.color + "18", border: `1px solid ${item.color}30` }}>
                    <item.icon className="w-4 h-4" style={{ color: item.color }} />
                  </div>
                  <span className="text-[12px] font-semibold text-[#2C1810] leading-tight pr-4">{item.label}</span>
                  {item.badge && (
                    <span className="absolute top-2.5 right-2.5 text-[8px] font-bold tracking-wide bg-[#D4AF37] text-[#2C1810] px-1.5 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>

          <div className="mx-4 border-t border-[#F0E8DC]" />

          {/* Main nav sections */}
          <div className="px-4 py-3">
            <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-2">Navigation</p>
            <div className="space-y-0.5">
              {navLinks.map((link) => (
                <div key={link.id || link.href}>
                  {link.children ? (
                    <>
                      <button
                        onClick={() => setOpenSection(openSection === link.id ? null : link.id!)}
                        className="flex items-center justify-between w-full px-3 py-3 rounded-xl text-[#2C1810] font-semibold text-[14px] hover:bg-[#FAF8F5] transition-colors"
                      >
                        <span>{link.label}</span>
                        <ChevronRight className={`w-4 h-4 text-[#D4AF37] transition-transform duration-200 ${openSection === link.id ? "rotate-90" : ""}`} />
                      </button>
                      {openSection === link.id && (
                        <div className="ml-3 mb-1 border-l-2 border-[#D4AF37]/30 pl-3 space-y-0.5">
                          {link.id === "guides" && (
                            <>
                              <p className="text-[9px] font-bold tracking-widest uppercase text-gray-400 px-1 pt-1.5 pb-0.5">Guides</p>
                              {link.children.slice(0, 2).map((child) => (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  onClick={() => { setMobileOpen(false); setOpenSection(null); }}
                                  className="flex items-center justify-between py-2.5 px-2 rounded-lg hover:bg-[#FAF8F5] transition-colors"
                                >
                                  <div>
                                    <span className="block text-[13px] font-medium text-[#2C1810]">{child.label}</span>
                                    <span className="block text-[11px] text-gray-400">{child.desc}</span>
                                  </div>
                                  <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                                </Link>
                              ))}
                              <p className="text-[9px] font-bold tracking-widest uppercase text-gray-400 px-1 pt-2.5 pb-0.5">Tools</p>
                              {link.children.slice(2).map((child) => (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  onClick={() => { setMobileOpen(false); setOpenSection(null); }}
                                  className="flex items-center justify-between py-2.5 px-2 rounded-lg hover:bg-[#FAF8F5] transition-colors"
                                >
                                  <div>
                                    <span className="block text-[13px] font-medium text-[#2C1810]">{child.label}</span>
                                    <span className="block text-[11px] text-gray-400">{child.desc}</span>
                                  </div>
                                  <span className="text-[9px] font-bold bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#2C1810] px-2 py-0.5 rounded-full">FREE</span>
                                </Link>
                              ))}
                            </>
                          )}
                          {link.id !== "guides" && link.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={() => { setMobileOpen(false); setOpenSection(null); }}
                              className="flex items-center justify-between py-2.5 px-2 rounded-lg hover:bg-[#FAF8F5] transition-colors"
                            >
                              <div>
                                <span className="block text-[13px] font-medium text-[#2C1810]">{child.label}</span>
                                <span className="block text-[11px] text-gray-400">{child.desc}</span>
                              </div>
                              <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={link.href!}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between px-3 py-3 rounded-xl text-[#2C1810] font-semibold text-[14px] hover:bg-[#FAF8F5] transition-colors"
                    >
                      {link.label}
                      <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Contact info strip */}
          <div className="mx-4 mt-2 mb-4 rounded-2xl bg-[#FAF8F5] border border-[#E8D5C0] p-4">
            <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-3">Get in Touch</p>
            <a href="tel:7782400000" className="flex items-center gap-2.5 mb-2.5 group">
              <div className="w-7 h-7 rounded-full bg-[#D4AF37]/15 flex items-center justify-center">
                <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
              </div>
              <span className="text-[13px] font-semibold text-[#2C1810] group-hover:text-[#D4AF37] transition-colors">778.240.0000</span>
            </a>
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-[#3EB489]/15 flex items-center justify-center">
                <MapPin className="w-3.5 h-3.5 text-[#3EB489]" />
              </div>
              <span className="text-[12px] text-gray-500">Metro Vancouver &amp; Fraser Valley</span>
            </div>
          </div>
        </div>

        {/* Drawer footer CTAs — always visible */}
        <div className="shrink-0 px-4 py-4 border-t border-[#E8D5C0] bg-white space-y-2.5">
          <Link
            href="/list-property"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center gap-2 py-3.5 bg-[#D4AF37] text-[#2C1810] rounded-2xl font-bold text-[14px] tracking-wide shadow-lg shadow-[#D4AF37]/25 hover:bg-[#C9A227] transition-colors active:scale-[0.98]"
          >
            <Home className="w-4 h-4" /> List Your Property
          </Link>
          <Link
            href="/login"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center gap-2 py-3 border-2 border-[#E8D5C0] text-[#2C1810] rounded-2xl font-semibold text-[14px] hover:border-[#D4AF37] transition-colors"
          >
            <User className="w-4 h-4 text-[#D4AF37]" /> Sign In / Register
          </Link>
        </div>
      </div>
    </>
  );
}
