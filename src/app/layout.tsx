import type { Metadata, Viewport } from "next";
import { Inter, Cormorant_Garamond, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { CRMProvider } from "@/context/CRMContext";

/* ─────────────────────────────────────────────────────────────────────────────
   FONTS — BC West Coast aesthetic
   - Inter            → --font-inter  (sans-serif, UI body text)
   - Cormorant Garamond → --font-cormorant (serif, elegant display headings)
   - Geist Mono       → --font-geist-mono (code blocks)
────────────────────────────────────────────────────────────────────────────── */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  fallback: ["system-ui", "Arial", "sans-serif"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
  fallback: ["Georgia", "Times New Roman", "serif"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

/* ─────────────────────────────────────────────────────────────────────────────
   METADATA
────────────────────────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: {
    default: "Pacific Edge Realty — British Columbia Real Estate",
    template: "%s | Pacific Edge Realty",
  },
  description:
    "Discover exceptional properties across British Columbia — from Vancouver penthouses to Gulf Islands retreats. Pacific Edge connects discerning buyers with the province's most extraordinary homes.",
  keywords: [
    "real estate",
    "BC real estate",
    "Vancouver homes",
    "luxury properties BC",
    "buy house BC",
    "Pacific Edge",
    "property listings",
    "British Columbia real estate",
    "Victoria real estate",
    "Whistler property",
  ],
  authors: [{ name: "Pacific Edge Realty" }],
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: "Pacific Edge Realty",
    title: "Pacific Edge Realty — British Columbia Real Estate",
    description:
      "Discover exceptional properties across British Columbia.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pacific Edge Realty — British Columbia Real Estate",
    description: "Find your perfect BC home with Pacific Edge.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAF8F5" },
    { media: "(prefers-color-scheme: dark)", color: "#151A16" },
  ],
  width: "device-width",
  initialScale: 1,
};

/* ─────────────────────────────────────────────────────────────────────────────
   ROOT LAYOUT
────────────────────────────────────────────────────────────────────────────── */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`
          ${inter.variable}
          ${cormorant.variable}
          ${geistMono.variable}
          antialiased
          bg-background
          text-foreground
          scrollbar-luxury
        `}
      >
        <AuthProvider>
          <CRMProvider>
            {children}
          </CRMProvider>
        </AuthProvider>
      </body>
    </html>
  );
}