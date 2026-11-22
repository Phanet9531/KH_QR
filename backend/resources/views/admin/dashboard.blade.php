<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TechShop Admin Dashboard</title>
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: {
                            50: '#eef2ff',
                            100: '#e0e7ff',
                            200: '#c7d2fe',
                            500: '#6366f1',
                            600: '#4338ca',
                            700: '#3730a3',
                        }
                    }
                }
            }
        }
    </script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; }
    </style>
</head>
<body class="bg-[#f3f6fa] text-slate-800 min-h-screen antialiased">

    <div class="flex min-h-screen">
        <!-- ================= SIDEBAR ================= -->
        <aside class="w-64 bg-white border-r border-slate-200/80 flex flex-col justify-between p-5 hidden md:flex shrink-0">
            <div>
                <!-- Brand / Logo -->
                <div class="flex items-center gap-3 px-2 py-3 mb-6">
                    <div class="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-200">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
                        </svg>
                    </div>
                    <span class="text-xl font-extrabold tracking-tight text-slate-900">TechShop</span>
                </div>

                <!-- Navigation Links -->
                <nav class="space-y-1 text-sm font-semibold">
                    <a href="#dashboard" onclick="switchTab('dashboard')" id="nav-dashboard" class="flex items-center gap-3 px-4 py-3 rounded-xl bg-indigo-50 text-indigo-700 transition">
                        <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
                        </svg>
                        <span>Dashboard</span>
                    </a>

                    <a href="#products" onclick="switchTab('products')" id="nav-products" class="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                        </svg>
                        <span>Products</span>
                    </a>

                    <a href="#categories" onclick="switchTab('products')" id="nav-categories" class="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
                        </svg>
                        <span>Categories</span>
                    </a>

                    <a href="#orders" onclick="switchTab('dashboard')" class="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                        </svg>
                        <span>Orders</span>
                    </a>

                    <a href="#customers" class="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
                        </svg>
                        <span>Customers</span>
                    </a>

                    <a href="#settings" class="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                        </svg>
                        <span>Settings</span>
                    </a>
                </nav>
            </div>

            <!-- Bottom: Low stock alert Card -->
            <div class="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/60 text-xs space-y-1">
                <span class="font-bold text-amber-900 block">Low stock alert</span>
                <p class="text-amber-700 leading-relaxed">Keyboard has 8 units left. Restock soon.</p>
            </div>
        </aside>

        <!-- ================= MAIN CONTENT ================= -->
        <main class="flex-1 flex flex-col min-w-0 overflow-y-auto">
            <!-- Header Bar -->
            <header class="h-20 bg-white border-b border-slate-200/80 px-6 sm:px-8 flex items-center justify-between sticky top-0 z-20">
                <div>
                    <h1 class="text-2xl font-bold text-slate-900 tracking-tight">Dashboard</h1>
                    <p class="text-xs text-slate-400 font-medium mt-0.5">Sunday, 22 November 2026</p>
                </div>

                <div class="flex items-center gap-3 sm:gap-5">
                    <!-- Search Input -->
                    <div class="relative hidden sm:block w-64">
                        <svg class="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                        </svg>
                        <input type="text" placeholder="Search orders, products" class="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500">
                    </div>

                    <!-- Notification Bell -->
                    <button class="w-10 h-10 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-600 transition relative">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                        </svg>
                        <span class="w-2 h-2 rounded-full bg-rose-500 absolute top-2.5 right-2.5"></span>
                    </button>

                    <!-- User Profile Avatar -->
                    <div class="flex items-center gap-2.5 pl-2 sm:border-l sm:border-slate-200">
                        <div class="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-sm border border-indigo-200">
                            AD
                        </div>
                        <div class="hidden lg:block text-left">
                            <span class="block text-xs font-bold text-slate-900 leading-tight">Admin</span>
                            <span class="block text-[11px] text-slate-400">Admin user</span>
                        </div>
                    </div>
                </div>
            </header>

            <div class="p-6 sm:p-8 space-y-6 max-w-7xl w-full mx-auto">
                <!-- ================= TAB 1: MAIN METRIC DASHBOARD ================= -->
                <div id="tab-dashboard" class="space-y-6">
                    <!-- Row 1: Four Summary Cards -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        <!-- Card 1: Total Revenue -->
                        <div class="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-2">
                            <span class="text-xs font-semibold text-slate-400">Total revenue</span>
                            <div class="text-3xl font-extrabold text-slate-900">$14,820</div>
                            <div class="inline-flex items-center gap-1.5 text-xs">
                                <span class="px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-600 font-bold text-[11px]">+12.4%</span>
                                <span class="text-slate-400 text-[11px]">vs last week</span>
                            </div>
                        </div>

                        <!-- Card 2: Orders -->
                        <div class="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-2">
                            <span class="text-xs font-semibold text-slate-400">Orders</span>
                            <div class="text-3xl font-extrabold text-slate-900">186</div>
                            <div class="inline-flex items-center gap-1.5 text-xs">
                                <span class="px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-600 font-bold text-[11px]">+8.1%</span>
                                <span class="text-slate-400 text-[11px]">vs last week</span>
                            </div>
                        </div>

                        <!-- Card 3: Customers -->
                        <div class="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-2">
                            <span class="text-xs font-semibold text-slate-400">Customers</span>
                            <div class="text-3xl font-extrabold text-slate-900">124</div>
                            <div class="inline-flex items-center gap-1.5 text-xs">
                                <span class="px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-600 font-bold text-[11px]">+5.4%</span>
                                <span class="text-slate-400 text-[11px]">vs last week</span>
                            </div>
                        </div>

                        <!-- Card 4: Pending orders -->
                        <div class="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-2">
                            <span class="text-xs font-semibold text-slate-400">Pending orders</span>
                            <div class="text-3xl font-extrabold text-slate-900">17</div>
                            <div class="inline-flex items-center gap-1.5 text-xs">
                                <span class="px-1.5 py-0.5 rounded-md bg-rose-50 text-rose-600 font-bold text-[11px]">-3.2%</span>
                                <span class="text-slate-400 text-[11px]">vs last week</span>
                            </div>
                        </div>
                    </div>

                    <!-- Row 2: Revenue this week Chart & Top Products -->
                    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                        <!-- Revenue This Week Bar Chart (8 cols) -->
                        <div class="lg:col-span-8 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm flex flex-col justify-between">
                            <div class="flex items-center justify-between mb-6">
                                <div>
                                    <h3 class="text-base font-bold text-slate-900">Revenue this week</h3>
                                    <p class="text-xs text-slate-400">Daily sales in USD thousands</p>
                                </div>
                                <span class="px-3 py-1 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-600">
                                    Last 7 days
                                </span>
                            </div>

                            <!-- Custom Bar Chart Graphic -->
                            <div class="pt-6 pb-2">
                                <div class="flex items-end justify-between gap-4 h-48 px-4 border-b border-slate-100">
                                    <!-- Mon -->
                                    <div class="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                                        <div class="w-full max-w-[42px] bg-indigo-200/80 group-hover:bg-indigo-300 rounded-t-xl transition-all" style="height: 40%;"></div>
                                        <span class="text-xs text-slate-400 font-medium">Mon</span>
                                    </div>

                                    <!-- Tue -->
                                    <div class="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                                        <div class="w-full max-w-[42px] bg-indigo-200/80 group-hover:bg-indigo-300 rounded-t-xl transition-all" style="height: 55%;"></div>
                                        <span class="text-xs text-slate-400 font-medium">Tue</span>
                                    </div>

                                    <!-- Wed -->
                                    <div class="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                                        <div class="w-full max-w-[42px] bg-indigo-200/80 group-hover:bg-indigo-300 rounded-t-xl transition-all" style="height: 45%;"></div>
                                        <span class="text-xs text-slate-400 font-medium">Wed</span>
                                    </div>

                                    <!-- Thu -->
                                    <div class="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                                        <div class="w-full max-w-[42px] bg-indigo-200/80 group-hover:bg-indigo-300 rounded-t-xl transition-all" style="height: 65%;"></div>
                                        <span class="text-xs text-slate-400 font-medium">Thu</span>
                                    </div>

                                    <!-- Fri -->
                                    <div class="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                                        <div class="w-full max-w-[42px] bg-indigo-200/80 group-hover:bg-indigo-300 rounded-t-xl transition-all" style="height: 58%;"></div>
                                        <span class="text-xs text-slate-400 font-medium">Fri</span>
                                    </div>

                                    <!-- Sat (Highlight active day) -->
                                    <div class="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                                        <div class="w-full max-w-[42px] bg-indigo-600 rounded-t-xl shadow-md shadow-indigo-200 transition-all" style="height: 90%;"></div>
                                        <span class="text-xs font-bold text-indigo-600">Sat</span>
                                    </div>

                                    <!-- Sun -->
                                    <div class="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                                        <div class="w-full max-w-[42px] bg-indigo-200/80 group-hover:bg-indigo-300 rounded-t-xl transition-all" style="height: 70%;"></div>
                                        <span class="text-xs text-slate-400 font-medium">Sun</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Top Products Card (4 cols) -->
                        <div class="lg:col-span-4 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm flex flex-col justify-between space-y-4">
                            <div>
                                <h3 class="text-base font-bold text-slate-900">Top products</h3>
                                <p class="text-xs text-slate-400">Units sold this week</p>
                            </div>

                            <div class="space-y-4">
                                <!-- Laptop -->
                                <div class="space-y-1.5">
                                    <div class="flex items-center justify-between text-xs">
                                        <span class="font-bold text-slate-800">Laptop</span>
                                        <span class="text-slate-500 font-medium">42 units • $650</span>
                                    </div>
                                    <div class="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                                        <div class="h-full bg-indigo-600 rounded-full" style="width: 85%;"></div>
                                    </div>
                                </div>

                                <!-- Monitor -->
                                <div class="space-y-1.5">
                                    <div class="flex items-center justify-between text-xs">
                                        <span class="font-bold text-slate-800">Monitor</span>
                                        <span class="text-slate-500 font-medium">35 units • $120</span>
                                    </div>
                                    <div class="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                                        <div class="h-full bg-indigo-600 rounded-full" style="width: 70%;"></div>
                                    </div>
                                </div>

                                <!-- Keyboard -->
                                <div class="space-y-1.5">
                                    <div class="flex items-center justify-between text-xs">
                                        <span class="font-bold text-slate-800">Keyboard</span>
                                        <span class="text-slate-500 font-medium">28 units • $25</span>
                                    </div>
                                    <div class="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                                        <div class="h-full bg-indigo-600 rounded-full" style="width: 55%;"></div>
                                    </div>
                                </div>

                                <!-- Mouse -->
                                <div class="space-y-1.5">
                                    <div class="flex items-center justify-between text-xs">
                                        <span class="font-bold text-slate-800">Mouse</span>
                                        <span class="text-slate-500 font-medium">21 units • $15</span>
                                    </div>
                                    <div class="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                                        <div class="h-full bg-indigo-600 rounded-full" style="width: 42%;"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Row 3: Recent Orders Table -->
                    <div class="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                        <div class="p-6 border-b border-slate-100 flex items-center justify-between">
                            <div>
                                <h3 class="text-base font-bold text-slate-900">Recent orders</h3>
                                <p class="text-xs text-slate-400">Latest customer orders</p>
                            </div>
                            <a href="#orders" class="text-xs font-bold text-indigo-600 hover:text-indigo-700">View all orders</a>
                        </div>

                        <div class="overflow-x-auto">
                            <table class="w-full text-left text-xs">
                                <thead class="bg-slate-50/70 text-slate-400 uppercase tracking-wider font-bold border-b border-slate-100">
                                    <tr>
                                        <th class="px-6 py-3.5">ORDER ID</th>
                                        <th class="px-6 py-3.5">CUSTOMER</th>
                                        <th class="px-6 py-3.5">PRODUCT</th>
                                        <th class="px-6 py-3.5">DATE</th>
                                        <th class="px-6 py-3.5">TOTAL</th>
                                        <th class="px-6 py-3.5">STATUS</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-slate-100 font-medium">
                                    <tr class="hover:bg-slate-50/60 transition">
                                        <td class="px-6 py-4 font-mono font-bold text-slate-800">ORD-0005</td>
                                        <td class="px-6 py-4 font-bold text-slate-900">Sophea Chan</td>
                                        <td class="px-6 py-4 text-slate-600">Laptop</td>
                                        <td class="px-6 py-4 text-slate-500">22 Nov 2026</td>
                                        <td class="px-6 py-4 font-extrabold text-slate-900">$650.00</td>
                                        <td class="px-6 py-4">
                                            <span class="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800">
                                                Pending
                                            </span>
                                        </td>
                                    </tr>

                                    <tr class="hover:bg-slate-50/60 transition">
                                        <td class="px-6 py-4 font-mono font-bold text-slate-800">ORD-0004</td>
                                        <td class="px-6 py-4 font-bold text-slate-900">Dara Kim</td>
                                        <td class="px-6 py-4 text-slate-600">Monitor, Keyboard</td>
                                        <td class="px-6 py-4 text-slate-500">21 Nov 2026</td>
                                        <td class="px-6 py-4 font-extrabold text-slate-900">$145.00</td>
                                        <td class="px-6 py-4">
                                            <span class="px-2.5 py-1 rounded-full text-[11px] font-bold bg-indigo-100 text-indigo-700">
                                                Shipped
                                            </span>
                                        </td>
                                    </tr>

                                    <tr class="hover:bg-slate-50/60 transition">
                                        <td class="px-6 py-4 font-mono font-bold text-slate-800">ORD-0003</td>
                                        <td class="px-6 py-4 font-bold text-slate-900">Vanna Sok</td>
                                        <td class="px-6 py-4 text-slate-600">Mouse</td>
                                        <td class="px-6 py-4 text-slate-500">21 Nov 2026</td>
                                        <td class="px-6 py-4 font-extrabold text-slate-900">$15.00</td>
                                        <td class="px-6 py-4">
                                            <span class="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                                                Completed
                                            </span>
                                        </td>
                                    </tr>

                                    <tr class="hover:bg-slate-50/60 transition">
                                        <td class="px-6 py-4 font-mono font-bold text-slate-800">ORD-0002</td>
                                        <td class="px-6 py-4 font-bold text-slate-900">Srey Pich</td>
                                        <td class="px-6 py-4 text-slate-600">Laptop, Mouse</td>
                                        <td class="px-6 py-4 text-slate-500">20 Nov 2026</td>
                                        <td class="px-6 py-4 font-extrabold text-slate-900">$665.00</td>
                                        <td class="px-6 py-4">
                                            <span class="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                                                Completed
                                            </span>
                                        </td>
                                    </tr>

                                    <tr class="hover:bg-slate-50/60 transition">
                                        <td class="px-6 py-4 font-mono font-bold text-slate-800">ORD-0001</td>
                                        <td class="px-6 py-4 font-bold text-slate-900">Kity Lim</td>
                                        <td class="px-6 py-4 text-slate-600">Keyboard</td>
                                        <td class="px-6 py-4 text-slate-500">19 Nov 2026</td>
                                        <td class="px-6 py-4 font-extrabold text-slate-900">$25.00</td>
                                        <td class="px-6 py-4">
                                            <span class="px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-100 text-rose-800">
                                                Cancelled
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- ================= TAB 2: PRODUCT MANAGEMENT ================= -->
                <div id="tab-products" class="hidden space-y-6">
                    <div class="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm flex items-center justify-between">
                        <div>
                            <h2 class="text-lg font-bold text-slate-900">Manage Store Products</h2>
                            <p class="text-xs text-slate-400">Add, edit, or remove inventory in MySQL</p>
                        </div>
                        <button onclick="document.getElementById('addProductModal').classList.remove('hidden')" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-100 transition">
                            + Add Product
                        </button>
                    </div>

                    <div class="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                        <table class="w-full text-left text-xs">
                            <thead class="bg-slate-50/70 text-slate-400 uppercase tracking-wider font-bold border-b border-slate-100">
                                <tr>
                                    <th class="px-6 py-3.5">Product</th>
                                    <th class="px-6 py-3.5">Category</th>
                                    <th class="px-6 py-3.5">Price</th>
                                    <th class="px-6 py-3.5">Stock Status</th>
                                    <th class="px-6 py-3.5 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-100">
                                @foreach ($products as $product)
                                    <tr class="hover:bg-slate-50/60 transition">
                                        <td class="px-6 py-4">
                                            <div class="flex items-center gap-3">
                                                <img src="{{ $product->image }}" alt="{{ $product->name }}" class="w-10 h-10 rounded-lg object-cover bg-slate-100 border border-slate-200">
                                                <div>
                                                    <h5 class="font-bold text-slate-900">{{ $product->name }}</h5>
                                                    <span class="text-[11px] text-slate-400 font-mono">ID: #{{ $product->id }}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="px-6 py-4">
                                            <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700">
                                                {{ $product->category->name ?? 'General' }}
                                            </span>
                                        </td>
                                        <td class="px-6 py-4 font-bold text-slate-900 text-sm">
                                            ${{ number_format($product->price, 2) }}
                                        </td>
                                        <td class="px-6 py-4">
                                            <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                                                {{ $product->stock }} units in stock
                                            </span>
                                        </td>
                                        <td class="px-6 py-4 text-right">
                                            <form method="POST" action="{{ route('admin.product.delete', $product->id) }}" onsubmit="return confirm('Delete this product?');" class="inline">
                                                @csrf
                                                @method('DELETE')
                                                <button type="submit" class="p-1.5 text-slate-400 hover:text-rose-600 transition">
                                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                                                </button>
                                            </form>
                                        </td>
                                    </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    </div>

    <!-- Modal for Adding Product -->
    <div id="addProductModal" class="hidden fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
        <div class="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5">
            <div class="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 class="font-bold text-slate-900">Add New Product</h3>
                <button onclick="document.getElementById('addProductModal').classList.add('hidden')" class="text-slate-400 text-lg font-bold">&times;</button>
            </div>
            <form method="POST" action="{{ route('admin.product.store') }}" class="space-y-4 text-xs">
                @csrf
                <div>
                    <label class="block font-bold text-slate-700 uppercase tracking-wider mb-1">Product Name</label>
                    <input type="text" name="name" required placeholder="e.g. Wireless Mouse" class="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-indigo-500">
                </div>
                <div class="grid grid-cols-2 gap-3">
                    <div>
                        <label class="block font-bold text-slate-700 uppercase tracking-wider mb-1">Category</label>
                        <select name="category_id" required class="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm bg-white">
                            @foreach ($categories as $cat)
                                <option value="{{ $cat->id }}">{{ $cat->name }}</option>
                            @endforeach
                        </select>
                    </div>
                    <div>
                        <label class="block font-bold text-slate-700 uppercase tracking-wider mb-1">Price ($)</label>
                        <input type="number" step="0.01" name="price" required placeholder="25.00" class="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm">
                    </div>
                </div>
                <div>
                    <label class="block font-bold text-slate-700 uppercase tracking-wider mb-1">Stock</label>
                    <input type="number" name="stock" required placeholder="20" class="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm">
                </div>
                <div>
                    <label class="block font-bold text-slate-700 uppercase tracking-wider mb-1">Image URL (Optional)</label>
                    <input type="url" name="image" placeholder="https://..." class="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm">
                </div>
                <div class="pt-3 flex justify-end gap-2">
                    <button type="button" onclick="document.getElementById('addProductModal').classList.add('hidden')" class="px-4 py-2 rounded-xl border border-slate-300 text-slate-600 font-semibold">Cancel</button>
                    <button type="submit" class="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold shadow-md shadow-indigo-100">Save</button>
                </div>
            </form>
        </div>
    </div>

    <!-- Tab switcher JS -->
    <script>
        function switchTab(tab) {
            const dashTab = document.getElementById('tab-dashboard');
            const prodTab = document.getElementById('tab-products');
            const navDash = document.getElementById('nav-dashboard');
            const navProd = document.getElementById('nav-products');

            if (tab === 'dashboard') {
                dashTab.classList.remove('hidden');
                prodTab.classList.add('hidden');
                navDash.className = "flex items-center gap-3 px-4 py-3 rounded-xl bg-indigo-50 text-indigo-700 transition";
                navProd.className = "flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition";
            } else {
                dashTab.classList.add('hidden');
                prodTab.classList.remove('hidden');
                navProd.className = "flex items-center gap-3 px-4 py-3 rounded-xl bg-indigo-50 text-indigo-700 transition";
                navDash.className = "flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition";
            }
        }
    </script>
</body>
</html>
