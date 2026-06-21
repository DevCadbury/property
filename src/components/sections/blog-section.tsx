"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, User } from "lucide-react";
import Link from "next/link";

const POSTS = [
  {
    id: 1,
    title: "First-Time Homebuying Guide: Everything You Need to Know Before You Buy in BC",
    excerpt: "Complete guide to buying your first home in British Columbia, from pre-approval to closing.",
    category: "Buying",
    date: "April 16, 2026",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop",
  },
  {
    id: 2,
    title: "Ready to Sell Your Home? Here's Everything You Need to Know",
    excerpt: "Maximize your home sale with these proven strategies specific to the BC market.",
    category: "Selling",
    date: "April 15, 2026",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop",
  },
  {
    id: 3,
    title: "Top 10 Neighbourhoods in Vancouver for Families in 2026",
    excerpt: "Discover the best family-friendly neighbourhoods in Metro Vancouver based on schools, amenities, and community.",
    category: "Neighbourhoods",
    date: "April 10, 2026",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&h=400&fit=crop",
  },
];

const CATEGORIES = [
  { name: "Buying Guides", count: 12 },
  { name: "Selling Tips", count: 8 },
  { name: "Market Updates", count: 15 },
  { name: "Neighbourhoods", count: 10 },
  { name: "Investment", count: 6 },
];

export function BlogSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <p className="text-[#2C1810] font-semibold text-sm uppercase tracking-wider mb-2">Blog</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Latest BC Real Estate News</h2>
            <p className="text-gray-600 mt-2 max-w-xl">Stay informed about the BC real estate market with tips, guides, and insights from our expert team.</p>
          </div>
          <Link href="/blog" className="hidden md:flex items-center gap-2 px-6 py-3 bg-[#2C1810] text-white rounded-xl font-semibold hover:bg-[#3D2314] transition-colors">
            View All Posts <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {POSTS.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <Link href={`/blog`} className="block">
                <div className="relative overflow-hidden rounded-xl mb-4 aspect-[16/10]">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 bg-[#2C1810] text-white text-xs font-semibold rounded-full">
                    {post.category}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                  <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {post.date}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#2C1810] transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm mt-2 line-clamp-2">{post.excerpt}</p>
                <span className="inline-flex items-center gap-1 text-[#2C1810] font-medium text-sm mt-3">
                  Read More <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Categories */}
        <div className="bg-[#FAF8F5] rounded-2xl p-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">Browse by Category</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {CATEGORIES.map((cat) => (
              <Link 
                key={cat.name}
                href={`/blog?category=${cat.name.toLowerCase()}`}
                className="flex items-center gap-2 px-4 py-2 bg-white rounded-full text-sm text-gray-700 hover:bg-[#2C1810] hover:text-white transition-colors"
              >
                {cat.name}
                <span className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs">{cat.count}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="text-center mt-8 md:hidden">
          <Link href="/blog" className="inline-flex items-center gap-2 px-6 py-3 bg-[#2C1810] text-white rounded-xl font-semibold">
            View All Posts <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}