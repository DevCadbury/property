/* ═══════════════════════════════════════════════════════════════════════════
   NorthStar Real Estate — Shared TypeScript Types
   Replace these with API/CMS types when integrating a backend.
═══════════════════════════════════════════════════════════════════════════ */

/* ─── Enumerations ─────────────────────────────────────────────────────────── */

export type PropertyType =
  | "house"
  | "condo"
  | "townhouse"
  | "penthouse"
  | "villa"
  | "studio"
  | "loft"
  | "duplex";

export type ListingStatus = "for-sale" | "for-rent" | "sold" | "pending";

export type ListingBadge =
  | "new"
  | "featured"
  | "sold"
  | "open-house"
  | "price-reduced"
  | "exclusive";

export type PriceRange = {
  min: number | null;
  max: number | null;
};

/* ─── Core Entities ────────────────────────────────────────────────────────── */

export interface Listing {
  id: string;
  slug: string;
  title: string;
  address: string;
  city: string;
  neighborhood: string;
  state: string;
  zipCode: string;
  price: number;
  pricePerSqft: number;
  beds: number;
  baths: number;
  halfBaths?: number;
  sqft: number;
  lotSqft?: number;
  propertyType: PropertyType;
  status: ListingStatus;
  badge?: ListingBadge;
  /** Array of image URLs — first is the hero/cover image */
  images: string[];
  description: string;
  features: string[];
  agentId: string;
  /** Geographic coordinates for map integration */
  lat: number;
  lng: number;
  yearBuilt: number;
  parking: number;
  garage?: boolean;
  floors?: number;
  hoaFee?: number;
  taxes?: number;
  listedAt: string; // ISO 8601 date string
  daysOnMarket: number;
  virtualTourUrl?: string;
}

export interface Agent {
  id: string;
  slug: string;
  name: string;
  title: string;
  /** Absolute URL or relative path to avatar image */
  avatar: string;
  phone: string;
  email: string;
  rating: number;         // 1–5
  reviewCount: number;
  listingsSold: number;
  yearsActive: number;
  specialties: string[];
  bio: string;
  languages?: string[];
  social?: {
    linkedIn?: string;
    instagram?: string;
  };
}

export interface Testimonial {
  id: string;
  content: string;
  authorName: string;
  authorTitle: string;   // e.g. "Home Buyer", "Home Seller"
  authorAvatar?: string;
  rating: number;        // 1–5
  date: string;          // ISO 8601
  listingId?: string;    // optional link to the property they bought/sold
  agentId?: string;
}

export interface Neighborhood {
  id: string;
  slug: string;
  name: string;
  city: string;
  state: string;
  image: string;
  avgPrice: number;
  listingCount: number;
  description: string;
  highlights: string[];  // e.g. ["Top-rated schools", "15 min to downtown"]
}

export interface ProcessStep {
  id: number;
  title: string;
  description: string;
  /** Lucide icon component name, e.g. "Search", "FileText", "KeyRound" */
  iconName: string;
}

export interface MapPin {
  listingId: string;
  lat: number;
  lng: number;
  price: number;
  isActive?: boolean;    // highlighted/selected state
}

/* ─── Search & Filter ──────────────────────────────────────────────────────── */

export interface SearchFilters {
  location: string;
  priceMin: number | null;
  priceMax: number | null;
  beds: number | null;
  baths?: number | null;
  propertyType: PropertyType | null;
  status?: ListingStatus;
}

export const PRICE_RANGES: { label: string; min: number; max: number | null }[] = [
  { label: "Under $500K",    min: 0,        max: 500_000 },
  { label: "$500K – $800K",  min: 500_000,  max: 800_000 },
  { label: "$800K – $1.2M",  min: 800_000,  max: 1_200_000 },
  { label: "$1.2M – $2M",    min: 1_200_000, max: 2_000_000 },
  { label: "$2M+",           min: 2_000_000, max: null },
];

export const BED_OPTIONS = [1, 2, 3, 4, 5] as const;

export const PROPERTY_TYPE_LABELS: Record<PropertyType, string> = {
  house:      "House",
  condo:      "Condo",
  townhouse:  "Townhouse",
  penthouse:  "Penthouse",
  villa:      "Villa",
  studio:     "Studio",
  loft:       "Loft",
  duplex:     "Duplex",
};

/* ─── UI State ─────────────────────────────────────────────────────────────── */

export interface QuickViewState {
  isOpen: boolean;
  listing: Listing | null;
}

export interface MapState {
  activePin: string | null;  // listingId
  center: { lat: number; lng: number };
  zoom: number;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}
