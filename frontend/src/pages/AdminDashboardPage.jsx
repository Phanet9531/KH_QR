import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Layers,
  ShoppingBag,
  Users,
  Settings,
  Search,
  Bell,
  ArrowUpRight,
  ArrowDownRight,
  AlertTriangle,
  ExternalLink,
} from 'lucide-react';

export const AdminDashboardPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="-mx-4 -my-8 sm:-mx-6 sm:-my-12 lg:-mx-8 min-h-screen bg-[#f3f6fa] flex">
      {/* ================= SIDEBAR ================= */}
      <aside className="w-64 bg-white border-r border-slate-200/80 flex flex-col justify-between p-5 hidden md:flex shrink-0">
        <div>
          {/* Logo / Brand */}
          <div className="flex items-center gap-3 px-2 py-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-200">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900">TechShop</span>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1 text-sm font-semibold">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                activeTab === 'dashboard'
                  ? 'bg-indigo-50 text-indigo-700 font-bold'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <LayoutDashboard className="w-5 h-5 text-indigo-600" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab('products')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                activeTab === 'products'
                  ? 'bg-indigo-50 text-indigo-700 font-bold'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Package className="w-5 h-5" />
              <span>Products</span>
            </button>

            <button
              onClick={() => setActiveTab('categories')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                activeTab === 'categories'
                  ? 'bg-indigo-50 text-indigo-700 font-bold'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Layers className="w-5 h-5" />
              <span>Categories</span>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                activeTab === 'orders'
                  ? 'bg-indigo-50 text-indigo-700 font-bold'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Orders</span>
            </button>

            <button
              onClick={() => setActiveTab('customers')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                activeTab === 'customers'
                  ? 'bg-indigo-50 text-indigo-700 font-bold'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Users className="w-5 h-5" />
              <span>Customers</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                activeTab === 'settings'
                  ? 'bg-indigo-50 text-indigo-700 font-bold'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </button>
          </nav>
        </div>

        {/* Low Stock Alert */}
        <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/60 text-xs space-y-1">
          <span className="font-bold text-amber-900 block flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            Low stock alert
          </span>
          <p className="text-amber-700 leading-relaxed">Keyboard has 8 units left. Restock soon.</p>
        </div>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-slate-200/80 px-6 sm:px-8 flex items-center justify-between sticky top-0 z-20">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Dashboard</h1>
            <p className="text-xs text-slate-400 font-medium mt-0.5">Sunday, 22 November 2026</p>
          </div>

          <div className="flex items-center gap-3 sm:gap-5">
            {/* Search Input */}
            <div className="relative hidden sm:block w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search orders, products"
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500"
              />
            </div>

            {/* Notification Bell */}
            <button className="w-10 h-10 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-600 transition relative">
              <Bell className="w-4 h-4" />
              <span className="w-2 h-2 rounded-full bg-rose-500 absolute top-2.5 right-2.5"></span>
            </button>

            {/* User Profile */}
            <div className="flex items-center gap-2.5 pl-2 sm:border-l sm:border-slate-200">
              <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-sm border border-indigo-200">
                AD
              </div>
              <div className="hidden lg:block text-left">
                <span className="block text-xs font-bold text-slate-900 leading-tight">Admin</span>
                <span className="block text-[11px] text-slate-400">Admin user</span>
              </div>
            </div>

            <Link
              to="/"
              className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 text-xs font-bold transition"
            >
              <span>Storefront</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6 sm:p-8 space-y-6 max-w-7xl w-full mx-auto">
          {/* Row 1: Four Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Total Revenue */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-2">
              <span className="text-xs font-semibold text-slate-400">Total revenue</span>
              <div className="text-3xl font-extrabold text-slate-900">$14,820</div>
              <div className="inline-flex items-center gap-1.5 text-xs">
                <span className="px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-600 font-bold text-[11px] flex items-center gap-0.5">
                  <ArrowUpRight className="w-3 h-3" />
                  +12.4%
                </span>
                <span className="text-slate-400 text-[11px]">vs last week</span>
              </div>
            </div>

            {/* Orders */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-2">
              <span className="text-xs font-semibold text-slate-400">Orders</span>
              <div className="text-3xl font-extrabold text-slate-900">186</div>
              <div className="inline-flex items-center gap-1.5 text-xs">
                <span className="px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-600 font-bold text-[11px] flex items-center gap-0.5">
                  <ArrowUpRight className="w-3 h-3" />
                  +8.1%
                </span>
                <span className="text-slate-400 text-[11px]">vs last week</span>
              </div>
            </div>

            {/* Customers */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-2">
              <span className="text-xs font-semibold text-slate-400">Customers</span>
              <div className="text-3xl font-extrabold text-slate-900">124</div>
              <div className="inline-flex items-center gap-1.5 text-xs">
                <span className="px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-600 font-bold text-[11px] flex items-center gap-0.5">
                  <ArrowUpRight className="w-3 h-3" />
                  +5.4%
                </span>
                <span className="text-slate-400 text-[11px]">vs last week</span>
              </div>
            </div>

            {/* Pending Orders */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-2">
              <span className="text-xs font-semibold text-slate-400">Pending orders</span>
              <div className="text-3xl font-extrabold text-slate-900">17</div>
              <div className="inline-flex items-center gap-1.5 text-xs">
                <span className="px-1.5 py-0.5 rounded-md bg-rose-50 text-rose-600 font-bold text-[11px] flex items-center gap-0.5">
                  <ArrowDownRight className="w-3 h-3" />
                  -3.2%
                </span>
                <span className="text-slate-400 text-[11px]">vs last week</span>
              </div>
            </div>
          </div>

          {/* Row 2: Revenue This Week + Top Products */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Revenue Chart (8 cols) */}
            <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Revenue this week</h3>
                  <p className="text-xs text-slate-400">Daily sales in USD thousands</p>
                </div>
                <span className="px-3 py-1 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-600">
                  Last 7 days
                </span>
              </div>

              {/* Bar Chart Graphic */}
              <div className="pt-6 pb-2">
                <div className="flex items-end justify-between gap-4 h-48 px-4 border-b border-slate-100">
                  <div className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                    <div className="w-full max-w-[42px] bg-indigo-200/80 group-hover:bg-indigo-300 rounded-t-xl transition-all" style={{ height: '40%' }}></div>
                    <span className="text-xs text-slate-400 font-medium">Mon</span>
                  </div>

                  <div className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                    <div className="w-full max-w-[42px] bg-indigo-200/80 group-hover:bg-indigo-300 rounded-t-xl transition-all" style={{ height: '55%' }}></div>
                    <span className="text-xs text-slate-400 font-medium">Tue</span>
                  </div>

                  <div className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                    <div className="w-full max-w-[42px] bg-indigo-200/80 group-hover:bg-indigo-300 rounded-t-xl transition-all" style={{ height: '45%' }}></div>
                    <span className="text-xs text-slate-400 font-medium">Wed</span>
                  </div>

                  <div className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                    <div className="w-full max-w-[42px] bg-indigo-200/80 group-hover:bg-indigo-300 rounded-t-xl transition-all" style={{ height: '65%' }}></div>
                    <span className="text-xs text-slate-400 font-medium">Thu</span>
                  </div>

                  <div className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                    <div className="w-full max-w-[42px] bg-indigo-200/80 group-hover:bg-indigo-300 rounded-t-xl transition-all" style={{ height: '58%' }}></div>
                    <span className="text-xs text-slate-400 font-medium">Fri</span>
                  </div>

                  {/* Saturday High Bar */}
                  <div className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                    <div className="w-full max-w-[42px] bg-indigo-600 rounded-t-xl shadow-md shadow-indigo-200 transition-all" style={{ height: '90%' }}></div>
                    <span className="text-xs font-bold text-indigo-600">Sat</span>
                  </div>

                  <div className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                    <div className="w-full max-w-[42px] bg-indigo-200/80 group-hover:bg-indigo-300 rounded-t-xl transition-all" style={{ height: '70%' }}></div>
                    <span className="text-xs text-slate-400 font-medium">Sun</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Products (4 cols) */}
            <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Top products</h3>
                <p className="text-xs text-slate-400">Units sold this week</p>
              </div>

              <div className="space-y-4">
                {/* Laptop */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">Laptop</span>
                    <span className="text-slate-500 font-medium">42 units • $650</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full bg-indigo-600 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>

                {/* Monitor */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">Monitor</span>
                    <span className="text-slate-500 font-medium">35 units • $120</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full bg-indigo-600 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                </div>

                {/* Keyboard */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">Keyboard</span>
                    <span className="text-slate-500 font-medium">28 units • $25</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full bg-indigo-600 rounded-full" style={{ width: '55%' }}></div>
                  </div>
                </div>

                {/* Mouse */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">Mouse</span>
                    <span className="text-slate-500 font-medium">21 units • $15</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full bg-indigo-600 rounded-full" style={{ width: '42%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Row 3: Recent Orders Table */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Recent orders</h3>
                <p className="text-xs text-slate-400">Latest customer orders</p>
              </div>
              <a href="#orders" className="text-xs font-bold text-indigo-600 hover:text-indigo-700">View all orders</a>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/70 text-slate-400 uppercase tracking-wider font-bold border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-3.5">ORDER ID</th>
                    <th className="px-6 py-3.5">CUSTOMER</th>
                    <th className="px-6 py-3.5">PRODUCT</th>
                    <th className="px-6 py-3.5">DATE</th>
                    <th className="px-6 py-3.5">TOTAL</th>
                    <th className="px-6 py-3.5">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  <tr className="hover:bg-slate-50/60 transition">
                    <td className="px-6 py-4 font-mono font-bold text-slate-800">ORD-0005</td>
                    <td className="px-6 py-4 font-bold text-slate-900">Sophea Chan</td>
                    <td className="px-6 py-4 text-slate-600">Laptop</td>
                    <td className="px-6 py-4 text-slate-500">22 Nov 2026</td>
                    <td className="px-6 py-4 font-extrabold text-slate-900">$650.00</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800">
                        Pending
                      </span>
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50/60 transition">
                    <td className="px-6 py-4 font-mono font-bold text-slate-800">ORD-0004</td>
                    <td className="px-6 py-4 font-bold text-slate-900">Dara Kim</td>
                    <td className="px-6 py-4 text-slate-600">Monitor, Keyboard</td>
                    <td className="px-6 py-4 text-slate-500">21 Nov 2026</td>
                    <td className="px-6 py-4 font-extrabold text-slate-900">$145.00</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-indigo-100 text-indigo-700">
                        Shipped
                      </span>
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50/60 transition">
                    <td className="px-6 py-4 font-mono font-bold text-slate-800">ORD-0003</td>
                    <td className="px-6 py-4 font-bold text-slate-900">Vanna Sok</td>
                    <td className="px-6 py-4 text-slate-600">Mouse</td>
                    <td className="px-6 py-4 text-slate-500">21 Nov 2026</td>
                    <td className="px-6 py-4 font-extrabold text-slate-900">$15.00</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                        Completed
                      </span>
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50/60 transition">
                    <td className="px-6 py-4 font-mono font-bold text-slate-800">ORD-0002</td>
                    <td className="px-6 py-4 font-bold text-slate-900">Srey Pich</td>
                    <td className="px-6 py-4 text-slate-600">Laptop, Mouse</td>
                    <td className="px-6 py-4 text-slate-500">20 Nov 2026</td>
                    <td className="px-6 py-4 font-extrabold text-slate-900">$665.00</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                        Completed
                      </span>
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50/60 transition">
                    <td className="px-6 py-4 font-mono font-bold text-slate-800">ORD-0001</td>
                    <td className="px-6 py-4 font-bold text-slate-900">Kity Lim</td>
                    <td className="px-6 py-4 text-slate-600">Keyboard</td>
                    <td className="px-6 py-4 text-slate-500">19 Nov 2026</td>
                    <td className="px-6 py-4 font-extrabold text-slate-900">$25.00</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-100 text-rose-800">
                        Cancelled
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
