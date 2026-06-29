"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Search, MapPin, Phone, ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

const IMAGES = [
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&h=1080&fit=crop&q=85",
  "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&h=1080&fit=crop&q=85",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&h=1080&fit=crop&q=85",
];

const LOCATIONS = ["Surrey", "Langley", "Abbotsford", "Cloverdale", "Maple Ridge", "Aldergrove"];

export function HeroSection() {
  const router = useRouter();
  const { t } = useLanguage();
  const [intentState, setIntentState] = useState<"none" | "buying" | "selling">("none");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchError, setSearchError] = useState("");
  const [imgIndex, setImgIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const springY = useSpring(yParallax, { stiffness: 60, damping: 20 });

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setImgIndex((i) => (i + 1) % IMAGES.length), 6000);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = () => {
    if (!searchQuery.trim()) { setSearchError("Enter a city, neighbourhood, or MLS number."); return; }
    router.push("/listings?q=" + encodeURIComponent(searchQuery.trim()));
  };

  return (
    <section ref={sectionRef} className="relative overflow-hidden min-h-screen flex flex-col">
      {/* Parallax background */}
      <motion.div className="absolute inset-0 will-change-transform" style={{ y: springY, scale }}>
        {IMAGES.map((src, i) => (
          <motion.img key={src} src={src} alt="" aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover object-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: i === imgIndex ? 1 : 0 }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
          />
        ))}
      </motion.div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#2E1512]/97 via-[#3E1F1B]/90 to-[#5E312B]/55 pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 80% 15%, rgba(172,126,113,0.18) 0%, transparent 50%)" }} />
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "128px" }} />
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#AC7E71]/70 to-transparent z-10" />

      {/* Image dots */}
      <div className="absolute bottom-24 right-8 md:right-16 z-20 flex flex-col gap-1.5">
        {IMAGES.map((_, i) => (
          <button key={i} onClick={() => setImgIndex(i)} aria-label={`View image ${i + 1}`}>
            <span className={`block rounded-full transition-all duration-500 ${i === imgIndex ? "w-1 h-6 bg-[#AC7E71]" : "w-1 h-1.5 bg-white/30 hover:bg-white/60"}`} />
          </button>
        ))}
      </div>

      {/* Main content */}
      <motion.div
        className="relative z-10 flex-1 flex flex-col justify-center w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-16 pt-28 pb-32 md:pt-36 md:pb-36"
        style={{ opacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#AC7E71]/40 bg-[#AC7E71]/10 backdrop-blur-sm mb-7 w-fit"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#AC7E71] animate-pulse" />
          <MapPin className="w-3 h-3 text-[#AC7E71]" />
          <span className="text-[#E0CCC5] text-[11px] font-semibold tracking-[0.18em] uppercase">Surrey · Langley · Abbotsford · Fraser Valley</span>
        </motion.div>

        <div className="mb-6">
          {[t("hero.d1"), t("hero.d2"), t("hero.d3")].map((word, i) => (
            <div key={i} className="overflow-hidden">
              <motion.span
                initial={{ y: 80, opacity: 0 }}
                animate={mounted ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.75, delay: 0.2 + i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
                className={`block font-display font-bold leading-[1.0] tracking-tight text-[clamp(3rem,8vw,5.5rem)] ${i === 1 ? "text-[#C99C8E]" : "text-white"}`}
              >
                {word}
              </motion.span>
            </div>
          ))}
        </div>

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={mounted ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.58, ease: "easeOut" }}
          className="flex items-center gap-3 mb-8 origin-left"
        >
          <div className="w-10 h-[1.5px] bg-[#AC7E71]" />
          <span className="text-white/45 text-[10px] tracking-[0.25em] uppercase font-medium">{t("hero.tagline")}</span>
        </motion.div>

        {/* Intent panels */}
        <AnimatePresence mode="wait">
          {intentState === "none" && (
            <motion.div key="initial"
              initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
            >
              <p className="text-white/55 text-[11px] font-semibold tracking-[0.22em] uppercase mb-5 inline-flex items-center gap-3">
                <span className="w-5 h-px bg-[#AC7E71]/70" />
                {t("hero.interested")}
                <span className="w-5 h-px bg-[#AC7E71]/70" />
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md">
                <motion.button onClick={() => setIntentState("buying")}
                  whileHover={{ y: -2, scale: 1.01 }} whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="group flex items-center justify-between gap-4 px-7 py-4 bg-[#AC7E71] text-white rounded-2xl font-bold text-[15px] shadow-[0_4px_24px_rgba(172,126,113,0.35)] hover:shadow-[0_8px_36px_rgba(172,126,113,0.5)] hover:bg-[#9A6B5D] transition-[background,box-shadow] duration-200"
                >
                  <span className="tracking-wide">{t("hero.buying")}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </motion.button>
                <motion.button onClick={() => setIntentState("selling")}
                  whileHover={{ y: -2, scale: 1.01 }} whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="group flex items-center justify-between gap-4 px-7 py-4 bg-white/[0.07] backdrop-blur-sm border border-white/40 text-white rounded-2xl font-bold text-[15px] hover:bg-white/15 hover:border-white/70 transition-all duration-200"
                >
                  <span className="tracking-wide">{t("hero.selling")}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </motion.button>
              </div>
            </motion.div>
          )}

          {intentState === "buying" && (
            <motion.div key="buying"
              initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 16 }}
              transition={{ duration: 0.26, ease: [0.32, 0.72, 0, 1] }}
            >
              <button onClick={() => { setIntentState("none"); setSearchQuery(""); setSearchError(""); }}
                className="flex items-center gap-1.5 text-white/40 hover:text-[#AC7E71] text-[10px] tracking-[0.2em] uppercase mb-4 transition-colors duration-200">
                ← {t("hero.back")}
              </button>
              <p className="text-[#C99C8E] text-[10px] font-bold tracking-[0.22em] uppercase mb-4">{t("hero.findProperty")}</p>
              <div className="flex gap-2 mb-2 max-w-[480px]">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="text" placeholder={t("hero.searchPlaceholder")}
                    value={searchQuery}
                    onChange={(e) => { setSearchQuery(e.target.value); setSearchError(""); }}
                    onKeyDown={(e) => { if (e.key === "Enter") handleSearch(); }}
                    className="w-full pl-10 pr-4 py-3.5 bg-white/95 backdrop-blur-sm rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#AC7E71] text-[13px] font-medium shadow-lg"
                  />
                </div>
                <motion.button onClick={handleSearch} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  className="px-5 py-3.5 bg-[#AC7E71] text-white rounded-xl font-bold hover:bg-[#9A6B5D] transition-colors shadow-lg shadow-[#AC7E71]/30">
                  <Search className="w-4 h-4" />
                </motion.button>
              </div>
              {searchError && <p role="alert" className="text-red-300 text-[11px] mb-2">{searchError}</p>}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {LOCATIONS.map((loc) => (
                  <button key={loc} onClick={() => router.push("/listings?q=" + encodeURIComponent(loc))}
                    className="px-3 py-1 text-[11px] font-medium text-white/60 border border-white/15 rounded-full hover:border-[#AC7E71]/60 hover:text-[#C99C8E] transition-all duration-200">
                    {loc}
                  </button>
                ))}
              </div>
              <Link href="/contact" className="inline-flex items-center gap-2 text-[12px] text-white/55 border border-white/15 px-4 py-2 rounded-xl hover:border-[#AC7E71]/60 hover:text-[#C99C8E] transition-all duration-200 backdrop-blur-sm">
                <Phone className="w-3.5 h-3.5" /> {t("hero.talkExpert")}
              </Link>
            </motion.div>
          )}

          {intentState === "selling" && (
            <motion.div key="selling"
              initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.26, ease: [0.32, 0.72, 0, 1] }}
            >
              <button onClick={() => setIntentState("none")}
                className="flex items-center gap-1.5 text-white/40 hover:text-[#AC7E71] text-[10px] tracking-[0.2em] uppercase mb-4 transition-colors duration-200">
                ← {t("hero.back")}
              </button>
              <p className="text-[#C99C8E] text-[10px] font-bold tracking-[0.22em] uppercase mb-5">{t("hero.sellConfidence")}</p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-lg">
                <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}>
                  <Link href="/sell/valuation" className="group flex items-center justify-between gap-3 px-6 py-4 bg-[#AC7E71] text-white rounded-2xl font-bold text-[14px] shadow-[0_4px_24px_rgba(172,126,113,0.35)] hover:bg-[#9A6B5D] transition-all duration-200 w-full">
                    <span>{t("hero.getEvaluation")}</span>
                    <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>
                </motion.div>
                <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-5 py-4 border border-white/20 backdrop-blur-sm text-white rounded-2xl font-semibold text-[14px] hover:border-[#AC7E71]/60 hover:text-[#C99C8E] transition-all duration-200">
                  <Phone className="w-4 h-4 shrink-0" /><span>{t("hero.talkExpert")}</span>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0 }} animate={mounted ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-wrap gap-x-7 gap-y-3 mt-10 pt-8 border-t border-white/[0.08]"
        >
          {[
            { value: "500+", label: t("stat.listings") },
            { value: "15+", label: t("stat.years") },
            { value: "98%", label: t("stat.satisfaction") },
          ].map((stat) => (
            <div key={stat.label} className="flex items-baseline gap-2">
              <span className="text-white font-bold text-lg leading-none tabular-nums">{stat.value}</span>
              <span className="text-white/40 text-[11px] tracking-wide">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }} animate={mounted ? { opacity: 1 } : {}}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 cursor-pointer"
        onClick={() => window.scrollBy({ top: window.innerHeight, behavior: "smooth" })}
      >
        <span className="text-white/30 text-[9px] tracking-[0.25em] uppercase">{t("hero.scroll")}</span>
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown className="w-4 h-4 text-white/30" />
        </motion.div>
      </motion.div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none">
        <svg viewBox="0 0 1440 64" fill="none" preserveAspectRatio="none" className="w-full h-auto">
          <path d="M0 64V28C360 64 720 64 1080 48C1260 40 1380 28 1440 20V64H0Z" fill="#F8F4F2" />
        </svg>
      </div>
    </section>
  );
}
