import React, { useState, useEffect } from 'react';
import { ProductCard } from '../components/ProductCard';
import { getProducts, getCategories } from '../services/api';
import { Sparkles, ShieldCheck, Zap, Headphones, Search, Filter, Loader2, AlertCircle } from 'lucide-react';

export const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUsingApi, setIsUsingApi] = useState(false);

  // Load categories once
  useEffect(() => {
    let isMounted = true;
    const fetchCats = async () => {
      const res = await getCategories();
      if (isMounted && res.success) {
        setCategories(res.data);
      }
    };
    fetchCats();
    return () => { isMounted = false; };
  }, []);

  // Load products whenever category or search filter changes
  useEffect(() => {
    let isMounted = true;
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = {};
        if (selectedCategory) params.category_id = selectedCategory;
        if (searchTerm.trim()) params.search = searchTerm.trim();

        const res = await getProducts(params);
        if (isMounted) {
          if (res.success) {
            setProducts(res.data);
            setIsUsingApi(res.fromApi);
          } else {
            setError('Failed to load products');
          }
        }
      } catch (err) {
        if (isMounted) setError(err.message || 'Error loading catalog');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    const debounce = setTimeout(fetchProducts, 250);
    return () => {
      isMounted = false;
      clearTimeout(debounce);
    };
  }, [selectedCategory, searchTerm]);

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

      {/* Catalog Search & Category Filter Section */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">Featured Store</span>
              {isUsingApi && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                  Live API
                </span>
              )}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Explore Our Products</h2>
          </div>

          {/* Search bar & Category filter controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 bg-white"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              <button
                onClick={() => setSelectedCategory('')}
                className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                  selectedCategory === ''
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(String(cat.id))}
                  className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                    selectedCategory === String(cat.id)
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="py-20 flex flex-col items-center justify-center text-slate-400 gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
            <p className="text-sm font-medium">Fetching products...</p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="p-6 rounded-2xl bg-rose-50 border border-rose-200 flex items-center gap-3 text-rose-700">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span className="text-sm font-medium">{error}</span>
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Empty Search Results */}
        {!loading && !error && products.length === 0 && (
          <div className="py-16 text-center bg-white rounded-2xl border border-slate-200 p-8 max-w-md mx-auto">
            <Filter className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No products found</h3>
            <p className="text-xs text-slate-500 mt-1">Try adjusting your search terms or category filter.</p>
            <button
              onClick={() => { setSelectedCategory(''); setSearchTerm(''); }}
              className="mt-4 px-4 py-2 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-lg hover:bg-indigo-100 transition"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
};
