"use client";

/* ═══════════════════════════════════════════════════════════════════════════
    ListingsSection — Metro Vancouver Properties
    Modern card design with warm brokerage theme
═══════════════════════════════════════════════════════════════════════════ */

import { useState, useRef }             from "react";
import {
  motion, useInView, useReducedMotion,
  AnimatePresence,
}                                        from "framer-motion";
import {
  Heart, Bed, Bath, Maximize2,
  MapPin, CalendarDays, ArrowRight,
  ChevronLeft, ChevronRight, Phone, Mail,
  Sparkles, Star,
}                                        from "lucide-react";
import {
  Dialog, DialogContent, DialogHeader,
  DialogTitle,
}                                        from "@/components/ui/dialog";
import { Badge }                         from "@/components/ui/badge";
import { cn }                            from "@/lib/utils";
import {
  MOCK_LISTINGS, MOCK_AGENTS,
  formatPrice, formatPriceFull, relativeDays,
}                                        from "@/data/mock";
import type { Listing, Agent }           from "@/types";

/* ─── Animation variants ─────────────────────────────────────────────────── */
const EASE_EXPO = [0.16, 1, 0.3, 1] as const;

const headerVariants = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y:  0, transition: { duration: 0.7, ease: EASE_EXPO } },
};
const gridContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.2 } },
};
const cardVariant = {
  hidden:  { opacity: 0, y: 28, scale: 0.97 },
  visible: { opacity: 1, y:  0, scale: 1,   transition: { duration: 0.55, ease: EASE_EXPO } },
};

/* ─── Badge config ───────────────────────────────────────────────────────── */
const BADGE_MAP: Record<string, { label: string; className: string }> = {
  new:           { label: "New",        className: "bg-[#5E312B]    text-white" },
  featured:      { label: "Featured",   className: "bg-[#5E312B]    text-white" },
  exclusive:     { label: "Exclusive",  className: "bg-[#AC7E71]    text-white" },
  "open-house":  { label: "Open House", className: "bg-forest-light  text-foreground" },
  "price-reduced":{ label: "Price ↓",  className: "bg-copper-light   text-copper-foreground" },
  sold:          { label: "Sold",       className: "bg-gray-600 text-white" },
};

/* ═══════════════════════════════════════════════════════════════════════════
   Root Section
═══════════════════════════════════════════════════════════════════════════ */
export function ListingsSection() {
  const listings = MOCK_LISTINGS.slice(0, 6);

  /* Quick view state */
  const [quickView, setQuickView] = useState<Listing | null>(null);

  /* Saved listings state (local for now) */
  const [saved, setSaved] = useState<Set<string>>(new Set());

  function toggleSave(id: string) {
    setSaved((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
      // TODO: Fire 'listing_saved' / 'listing_unsaved' analytics event
    });
  }

  const prefersRM = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);

  const headerInView = useInView(sectionRef, { once: true, margin: "-60px" });
  const gridInView   = useInView(gridRef,   { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      aria-labelledby="listings-heading"
      className="section-band-light py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">

        {/* ── Section Header ── */}
        <motion.div
          variants={prefersRM ? undefined : headerVariants}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          className="mb-12 flex flex-col gap-3 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="mb-2 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.28em] text-forest">
              <Sparkles className="h-3 w-3" />
              Curated Properties
            </p>
            <h2 id="listings-heading" className="font-display text-4xl font-bold text-foreground md:text-5xl">
              Featured Listings
            </h2>
            <p className="mt-3 max-w-xl text-base text-muted-foreground">
              Personally curated by our specialists — properties meeting the highest
              standards of design, location, and enduring value.
            </p>
          </div>
          <motion.a
            href="/listings"
            whileHover={prefersRM ? {} : { x: 4 }}
            className="group hidden shrink-0 items-center gap-1.5 text-sm font-semibold text-foreground underline-offset-4 hover:text-forest transition-colors md:flex"
          >
            View All Listings
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </motion.a>
        </motion.div>

        {/* Decorative copper divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={headerInView ? { scaleX: 1, opacity: 1 } : {}}
          transition={prefersRM ? { duration: 0 } : { duration: 0.9, ease: EASE_EXPO, delay: 0.2 }}
          style={{ originX: 0 }}
          className="divider-copper mb-12"
          aria-hidden="true"
        />

        {/* ── Listings Grid ── */}
        <motion.div
          ref={gridRef}
          variants={prefersRM ? undefined : gridContainer}
          initial="hidden"
          animate={gridInView ? "visible" : "hidden"}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {listings.map((listing) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              isSaved={saved.has(listing.id)}
              onSave={() => toggleSave(listing.id)}
              onQuickView={() => setQuickView(listing)}
              prefersRM={!!prefersRM}
            />
          ))}
        </motion.div>

        {/* Mobile View All */}
        <motion.div
          className="mt-10 flex md:hidden"
          initial={{ opacity: 0 }}
          animate={gridInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <a
            href="/listings"
            className="mx-auto flex items-center gap-2 rounded-md border-2 border-foreground px-7 py-3 text-sm font-bold uppercase tracking-wide transition-all hover:bg-foreground hover:text-primary-foreground active:scale-[0.98]"
          >
            Browse All Listings
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>

      {/* ── Quick View Dialog ── */}
      <Dialog
        open={!!quickView}
        onOpenChange={(open) => !open && setQuickView(null)}
      >
        <AnimatePresence>
          {quickView && (
            <DialogContent
              className="
                max-w-3xl w-full p-0 overflow-hidden rounded-xl
                gap-0
                sm:max-w-3xl
              "
              showCloseButton
            >
              <QuickViewContent listing={quickView} />
            </DialogContent>
          )}
        </AnimatePresence>
      </Dialog>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Listing Card
═══════════════════════════════════════════════════════════════════════════ */
interface CardProps {
  listing:     Listing;
  isSaved:     boolean;
  onSave:      () => void;
  onQuickView: () => void;
  prefersRM:   boolean;
}

function ListingCard({ listing, isSaved, onSave, onQuickView, prefersRM }: CardProps) {
  const { title, address, neighborhood, price, beds, baths, sqft,
          badge, images, propertyType, pricePerSqft } = listing;

  const badgeConfig = badge ? BADGE_MAP[badge] : null;

  return (
    <motion.article
      variants={prefersRM ? undefined : cardVariant}
      whileHover={prefersRM ? {} : { y: -4, transition: { duration: 0.25, ease: EASE_EXPO } }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-md",
        "border border-border bg-card shadow-sm",
        "transition-[border-color,box-shadow] duration-300",
        "hover:border-copper hover:shadow-[0_12px_40px_rgba(45,79,60,0.12)]",
      )}
    >
      {/* ── Image ── */}
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={images[0]}
          alt={`${title} — exterior view`}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />

        {/* Dark overlay for hover actions */}
        <div
          className="
            absolute inset-0 flex flex-col items-center justify-end gap-2.5 pb-4
            bg-gradient-to-t from-black/70 via-black/30 to-transparent
            opacity-0 transition-opacity duration-300
            group-hover:opacity-100
          "
        >
          <div className="flex gap-2.5">
            <motion.button
              type="button"
              onClick={onQuickView}
              whileTap={prefersRM ? {} : { scale: 0.95 }}
              className="
                rounded-md bg-white/95 px-4 py-2
                text-xs font-bold uppercase tracking-wide text-foreground
                shadow transition-all hover:bg-forest hover:text-primary-foreground
              "
              // TODO: Fire 'listing_quick_view' analytics event
            >
              Quick View
            </motion.button>
            <motion.a
              href={`mailto:?subject=Inquiry: ${title}`}
              whileTap={prefersRM ? {} : { scale: 0.95 }}
              className="
                rounded-md border border-white/70 bg-transparent px-4 py-2
                text-xs font-bold uppercase tracking-wide text-white shadow
                transition-all hover:bg-white hover:text-foreground
              "
              // TODO: Open contact agent modal instead of mailto
            >
              Contact Agent
            </motion.a>
          </div>
        </div>

        {/* Badge */}
        {badgeConfig && (
          <div className="absolute left-3 top-3 z-10">
            <motion.span
              initial={prefersRM ? {} : { scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              className={cn(
                "inline-flex items-center rounded-sm px-2.5 py-1",
                "text-[9px] font-bold uppercase tracking-[0.15em]",
                "shadow-sm",
                badgeConfig.className,
              )}
            >
              {badgeConfig.label}
            </motion.span>
          </div>
        )}

        {/* Image count indicator */}
        {images.length > 1 && (
          <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1 rounded-sm bg-black/60 px-2 py-1 text-[10px] font-medium text-white/80 backdrop-blur-sm">
            <span>1/{images.length}</span>
          </div>
        )}

        {/* Save button */}
        <motion.button
          type="button"
          onClick={(e) => { e.stopPropagation(); onSave(); }}
          aria-label={isSaved ? `Remove ${title} from saved` : `Save ${title}`}
          aria-pressed={isSaved}
          whileTap={prefersRM ? {} : { scale: 0.85 }}
          className="
            absolute right-3 top-3 z-10
            flex h-8 w-8 items-center justify-center rounded-full
            bg-white/90 shadow-md
            transition-all duration-200
            hover:scale-110 hover:bg-white
          "
        >
          <Heart
            className={cn(
              "h-4 w-4 transition-colors duration-200",
              isSaved ? "fill-red-500 text-red-500" : "text-foreground/50",
            )}
          />
        </motion.button>
      </div>

      {/* ── Card Body ── */}
      <div className="flex flex-1 flex-col p-5">
        {/* Type + neighbourhood */}
        <div className="mb-1.5 flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          <span>{propertyType}</span>
          <span aria-hidden="true" className="text-border">·</span>
          <span className="flex items-center gap-0.5">
            <MapPin className="h-2.5 w-2.5" />
            {neighborhood}
          </span>
        </div>

        {/* Title */}
        <h3 className="mb-1 text-base font-semibold leading-snug text-foreground line-clamp-1 group-hover:text-forest transition-colors duration-200">
          {title}
        </h3>

        {/* Address */}
        <p className="mb-4 text-xs text-muted-foreground truncate">{address}</p>

        {/* Meta: beds / baths / sqft */}
        <div
          className="mb-4 flex items-center gap-3 border-y border-border py-3 text-xs"
          aria-label={`${beds} bedrooms, ${baths} bathrooms, ${sqft.toLocaleString()} square feet`}
        >
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Bed className="h-3.5 w-3.5 text-forest/60" />
            <strong className="font-semibold text-foreground">{beds}</strong>
            <span>bd</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Bath className="h-3.5 w-3.5 text-forest/60" />
            <strong className="font-semibold text-foreground">{baths}</strong>
            <span>ba</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Maximize2 className="h-3.5 w-3.5 text-forest/60" />
            <strong className="font-semibold text-foreground">{sqft.toLocaleString()}</strong>
            <span>sqft</span>
          </div>
        </div>

        {/* Price + link */}
        <div className="mt-auto flex items-end justify-between">
          <div>
            <p className="text-2xl font-bold tracking-tight text-foreground">
              {formatPrice(price)}
            </p>
            {pricePerSqft && (
              <p className="text-[10px] text-muted-foreground">
                ${pricePerSqft.toLocaleString()} /sqft
              </p>
            )}
          </div>
          <motion.a
            href={`/listings/${listing.slug}`}
            whileHover={prefersRM ? {} : { x: 3 }}
            className="group/link flex items-center gap-1 rounded-sm border border-border px-3 py-2 text-xs font-semibold text-muted-foreground transition-all hover:border-copper hover:text-forest"
            // TODO: Fire 'listing_detail_view' analytics event
          >
            View Details
            <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover/link:translate-x-0.5" />
          </motion.a>
        </div>

        {/* Listed date */}
        <p className="mt-3 flex items-center gap-1 text-[10px] text-muted-foreground">
          <CalendarDays className="h-3 w-3" />
          {relativeDays(listing.listedAt)}
          {listing.daysOnMarket > 30 && (
            <span className="ml-1 text-amber-500">· {listing.daysOnMarket} days on market</span>
          )}
        </p>
      </div>
    </motion.article>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Quick View Dialog Content
═══════════════════════════════════════════════════════════════════════════ */
function QuickViewContent({ listing }: { listing: Listing }) {
  const [imgIdx, setImgIdx] = useState(0);
  const agent = MOCK_AGENTS.find((a) => a.id === listing.agentId);

  const prevImg = () => setImgIdx((i) => (i - 1 + listing.images.length) % listing.images.length);
  const nextImg = () => setImgIdx((i) => (i + 1) % listing.images.length);

  const badgeConfig = listing.badge ? BADGE_MAP[listing.badge] : null;

  return (
    <div className="flex max-h-[90svh] flex-col overflow-y-auto">

      {/* ── Image Gallery ── */}
      <div className="relative h-64 shrink-0 overflow-hidden bg-muted sm:h-80">
        <AnimatePresence mode="wait">
          <motion.img
            key={imgIdx}
            src={listing.images[imgIdx]}
            alt={`${listing.title} — image ${imgIdx + 1}`}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: EASE_EXPO }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>

        {/* Nav arrows */}
        {listing.images.length > 1 && (
          <>
            <button
              onClick={prevImg}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 z-10 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={nextImg}
              aria-label="Next image"
              className="absolute right-3 top-1/2 z-10 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}

        {/* Image dots */}
        {listing.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
            {listing.images.map((_, i) => (
              <button
                key={i}
                onClick={() => setImgIdx(i)}
                aria-label={`View image ${i + 1}`}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-200",
                  i === imgIdx ? "w-6 bg-white" : "w-1.5 bg-white/50",
                )}
              />
            ))}
          </div>
        )}

        {/* Thumbnail strip */}
        <div className="absolute bottom-0 right-0 flex gap-1.5 p-3">
          {listing.images.slice(1, 4).map((img, i) => (
            <button
              key={i}
              onClick={() => setImgIdx(i + 1)}
              className={cn(
                "h-10 w-14 overflow-hidden rounded-sm border-2 transition-all",
                imgIdx === i + 1 ? "border-copper" : "border-white/30",
              )}
            >
              <img src={img} alt="" className="h-full w-full object-cover" loading="lazy" />
            </button>
          ))}
        </div>

        {/* Badge */}
        {badgeConfig && (
          <div className="absolute left-4 top-4 z-10">
            <span className={cn("rounded-sm px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest shadow", badgeConfig.className)}>
              {badgeConfig.label}
            </span>
          </div>
        )}
      </div>

      {/* ── Content ── */}
      <div className="flex flex-col p-5 sm:p-6">
        <DialogHeader className="mb-4">
          <div className="mb-1 flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            <span>{listing.propertyType}</span>
            <span>·</span>
            <MapPin className="h-2.5 w-2.5" />
            <span>{listing.neighborhood}, {listing.city}</span>
          </div>
          <DialogTitle className="font-display text-2xl font-bold text-foreground">
            {listing.title}
          </DialogTitle>
          <p className="text-sm text-muted-foreground">{listing.address}</p>
        </DialogHeader>

        {/* Price */}
        <div className="mb-5 flex items-baseline gap-3">
          <span className="text-3xl font-bold text-foreground">{formatPriceFull(listing.price)}</span>
          {listing.pricePerSqft && (
            <span className="text-sm text-muted-foreground">${listing.pricePerSqft.toLocaleString()}/sqft</span>
          )}
        </div>

        {/* Meta row */}
        <div className="mb-5 grid grid-cols-3 gap-3 rounded-md border border-border bg-muted/30 p-4">
          {[
            { icon: Bed,       val: `${listing.beds} beds`,         label: "Bedrooms"   },
            { icon: Bath,      val: `${listing.baths} baths`,       label: "Bathrooms"  },
            { icon: Maximize2, val: `${listing.sqft.toLocaleString()} sqft`, label: "Area" },
          ].map(({ icon: Icon, val, label }) => (
            <div key={label} className="flex flex-col items-center gap-1 text-center">
              <Icon className="h-4 w-4 text-gold" aria-hidden="true" />
              <p className="text-sm font-bold text-foreground">{val}</p>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>

        {/* Description */}
        <p className="mb-5 text-sm leading-relaxed text-muted-foreground line-clamp-4">
          {listing.description}
        </p>

        {/* Features */}
        {listing.features.length > 0 && (
          <div className="mb-5">
            <p className="mb-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Property Features
            </p>
            <div className="flex flex-wrap gap-2">
              {listing.features.map((f) => (
                <span
                  key={f}
                  className="rounded-sm border border-border bg-muted px-2.5 py-1 text-xs font-medium text-foreground"
                >
                  {f}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Agent card */}
        {agent && <AgentMiniCard agent={agent} />}

        {/* CTA row */}
        <div className="mt-4 flex gap-3">
          <a
            href={`/listings/${listing.slug}`}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-md bg-foreground py-3 text-sm font-bold text-primary-foreground transition-all hover:bg-forest hover:text-foreground active:scale-[0.98]"
            // TODO: Fire 'listing_detail_view' analytics event
          >
            View Full Listing
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href={`/listings/${listing.slug}#contact`}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-md border-2 border-foreground py-3 text-sm font-bold text-foreground transition-all hover:border-copper hover:text-forest active:scale-[0.98]"
          >
            Schedule Tour
          </a>
        </div>
      </div>
    </div>
  );
}

/* ─── Agent mini-card inside dialog ─────────────────────────────────────── */
function AgentMiniCard({ agent }: { agent: Agent }) {
  return (
    <div className="mb-5 flex items-center gap-4 rounded-md border border-border bg-card p-4">
      <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-copper/30 bg-muted">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={agent.avatar} alt={agent.name} className="h-full w-full object-cover" loading="lazy" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-foreground">{agent.name}</p>
        <p className="text-xs text-muted-foreground">{agent.title}</p>
        <div className="mt-0.5 flex items-center gap-1 text-xs">
          <Star className="h-3 w-3 fill-forest text-forest" />
          <span className="font-semibold text-foreground">{agent.rating}</span>
          <span className="text-muted-foreground">({agent.reviewCount})</span>
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <a
          href={`tel:${agent.phone.replace(/\D/g,"")}`}
          aria-label={`Call ${agent.name}`}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:border-copper hover:text-forest"
        >
          <Phone className="h-3.5 w-3.5" />
        </a>
        <a
          href={`mailto:${agent.email}`}
          aria-label={`Email ${agent.name}`}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:border-copper hover:text-forest"
        >
          <Mail className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
}
