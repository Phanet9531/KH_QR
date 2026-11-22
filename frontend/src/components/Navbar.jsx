import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Laptop, ShieldCheck } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Navbar = () => {
  const { cartItemCount } = useShop();
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-200 group-hover:bg-indigo-700 transition">
              <Laptop className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-indigo-600 transition">
                Tech<span className="text-indigo-600">Store</span>
              </span>
              <span className="hidden sm:block text-[11px] font-medium text-slate-400 -mt-1 tracking-wider uppercase">
                Digital Hardware
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="flex items-center gap-1 sm:gap-6">
            <Link
              to="/"
              className={`px-3 py-2 text-sm font-semibold rounded-lg transition ${
                location.pathname === '/'
                  ? 'text-indigo-600 bg-indigo-50'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Products
            </Link>

            {/* Cart Icon & Live Counter Badge */}
            <Link
              to="/cart"
              className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition ${
                location.pathname === '/cart'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
              title="View Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <span
                    className={`absolute -top-2.5 -right-3 min-w-[20px] h-5 px-1.5 flex items-center justify-center text-xs font-bold rounded-full border-2 ${
                      location.pathname === '/cart'
                        ? 'bg-amber-400 text-slate-900 border-indigo-600'
                        : 'bg-indigo-600 text-white border-white animate-pulse'
                    }`}
                  >
                    {cartItemCount}
                  </span>
                )}
              </div>
              <span className="hidden md:inline">Cart</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};
