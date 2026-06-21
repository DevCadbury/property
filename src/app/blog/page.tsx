"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

const BLOG_POSTS = [
  {
    id: 1,
    slug: "vancouver-market-update-2026",
    title: "Vancouver Real Estate Market Update — Spring 2026",
    excerpt: "Analysis of current market trends, price movements, and what buyers and sellers should know heading into the spring season.",
    category: "Market Trends",
    date: "April 28, 2026",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1559511260-66a68e0d5c1d?w=800&q=80",
  },
  {
    id: 2,
    slug: "first-time-buyer-guide-bc",
    title: "First-Time Home Buyer's Guide to British Columbia",
    excerpt: "Everything you need to know about buying your first home in BC, from saving for a down payment to closing day.",
    category: "Buyer Guide",
    date: "April 15, 2026",
    readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80",
  },
  {
    id: 3,
    slug: "whistler-property-investment",
    title: "Investing in Whistler Property: What You Need to Know",
    excerpt: "A deep dive into the Whistler real estate market, rental potential, and why it's a top investment choice.",
    category: "Investment",
    date: "April 2, 2026",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1551613861-558df4c8bc7c?w=800&q=80",
  },
  {
    id: 4,
    slug: "victoria-vs-vancouver",
    title: "Victoria vs. Vancouver: Which BC City Is Right for You?",
    excerpt: "Compare lifestyle, cost of living, and real estate options between BC's two most desirable cities.",
    category: "Lifestyle",
    date: "March 20, 2026",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1542004947438-b54c095d2f6f?w=800&q=80",
  },
  {
    id: 5,
    slug: "selling-your-home-tips",
    title: "Top 10 Tips for Selling Your Home in BC",
    excerpt: "Maximize your property's value with these expert staging and marketing strategies tailored to the BC market.",
    category: "Seller Guide",
    date: "March 5, 2026",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
  },
  {
    id: 6,
    slug: "bc-property-tax-explained",
    title: "Understanding BC Property Transfer Tax & Annual Taxes",
    excerpt: "A complete guide to property taxes in British Columbia, including exemptions and calculations.",
    category: "Financial",
    date: "February 18, 2026",
    readTime: "11 min read",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  },
];

const CATEGORIES = ["All", "Market Trends", "Buyer Guide", "Seller Guide", "Investment", "Lifestyle", "Financial"];

export default function BlogPage() {
  return (
    <>
      <SiteHeader />

      <main className="min-h-screen bg-background">
        {/* Hero */}
        <div className="bg-forest text-primary-foreground py-20">
          <div className="max-w-7xl mx-auto px-6 md:px-10 text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              BC Real Estate Insights
            </h1>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              Market analysis, buying guides, and expert advice for navigating 
              British Columbia's real estate landscape.
            </p>
          </div>
        </div>

        {/* Category Filter */}
        <div className="border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex gap-2 overflow-x-auto scrollbar-luxury">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  category === "All"
                    ? "bg-forest text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Post */}
        <div className="py-12">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="grid lg:grid-cols-2 gap-8 bg-card rounded-xl overflow-hidden border border-border">
              <div className="aspect-[16/10] lg:aspect-auto bg-muted">
                <img 
                  src={BLOG_POSTS[0].image} 
                  alt={BLOG_POSTS[0].title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <span className="text-xs font-semibold uppercase tracking-wider text-forest mb-3">
                  {BLOG_POSTS[0].category}
                </span>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                  {BLOG_POSTS[0].title}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {BLOG_POSTS[0].excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {BLOG_POSTS[0].date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {BLOG_POSTS[0].readTime}
                  </span>
                </div>
                <a 
                  href={`/blog/${BLOG_POSTS[0].slug}`}
                  className="inline-flex items-center gap-2 text-forest font-semibold hover:underline"
                >
                  Read Article <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Post Grid */}
        <div className="pb-20">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {BLOG_POSTS.slice(1).map((post) => (
                <article key={post.id} className="group rounded-lg border border-border bg-card overflow-hidden hover:border-copper transition-colors">
                  <div className="aspect-[16/10] overflow-hidden bg-muted">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                      <span className="text-forest font-medium">{post.category}</span>
                      <span>•</span>
                      <span>{post.date}</span>
                    </div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-forest transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <a 
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-sm text-forest font-medium hover:underline"
                    >
                      Read More <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="bg-muted py-16">
          <div className="max-w-7xl mx-auto px-6 md:px-10 text-center">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              Stay Informed
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Subscribe to our newsletter for weekly market updates, new listings, 
              and expert real estate insights.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-forest"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-forest text-primary-foreground font-semibold rounded-lg hover:bg-forest-light transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}