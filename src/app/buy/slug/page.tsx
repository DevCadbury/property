"use client";

import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

export default function BuyCategoryPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="font-display text-3xl font-bold text-foreground mb-4">Property Collection</h1>
          <p className="text-muted-foreground mb-6">This collection page is under development.</p>
          <a href="/listings" className="text-forest hover:underline">Browse All Listings →</a>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}