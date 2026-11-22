import React from 'react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Sparkles, ShieldCheck, Zap, Headphones } from 'lucide-react';

export const ProductListPage = () => {
  return (
    <div className="space-y-12">
      {/* Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white p-8 sm:p-12 lg:p-16 shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-xs font-semibold backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Next-Gen Tech Essentials • Fall 2026 Collection</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Upgrade Your Digital <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-indigo-200 to-amber-200">
              Workspace & Lifestyle
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Discover premium laptops, precision mice, mechanical keyboards, and crisp monitors designed for creators, developers, and power users.
          </p>

          <div className="pt-2 flex flex-wrap gap-4 text-xs text-slate-300">
            <span className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-400" /> Fast Express Shipping
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Official Guarantee
            </span>
            <span className="flex items-center gap-1.5">
              <Headphones className="w-4 h-4 text-indigo-400" /> 24/7 Dedicated Support
            </span>
          </div>
        </div>

        {/* Decorative background circle */}
        <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
        <div className="absolute right-10 top-10 w-72 h-72 rounded-full bg-indigo-400/10 blur-2xl pointer-events-none" />
      </section>

      {/* Product Catalog Section */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">Featured Store</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Explore Our Products</h2>
          </div>
          <p className="text-sm text-slate-500">
            Showing all <span className="font-bold text-slate-800">{PRODUCTS.length}</span> flagship items
          </p>
        </div>

        {/* 4 Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};
