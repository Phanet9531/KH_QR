<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TechStore Admin Dashboard | Laravel 12 & MySQL</title>
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
                            600: '#4f46e5',
                            700: '#4338ca',
                        }
                    }
                }
            }
        }
    </script>
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
    </style>
</head>
<body class="bg-slate-50 text-slate-800 min-h-screen">

    <div class="flex min-h-screen">
        <!-- ================= SIDEBAR ================= -->
        <aside class="w-64 bg-slate-900 text-slate-300 flex flex-col justify-between hidden md:flex shrink-0">
            <div>
                <!-- Brand Header -->
                <div class="h-20 flex items-center gap-3 px-6 border-b border-slate-800">
                    <div class="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-500/20">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                        </svg>
                    </div>
                    <div>
                        <h1 class="text-white font-extrabold text-base tracking-tight">TechStore</h1>
                        <span class="text-[11px] text-indigo-400 font-semibold uppercase tracking-wider block">Admin Panel</span>
                    </div>
                </div>

                <!-- Nav Links -->
                <nav class="p-4 space-y-1.5 text-sm font-semibold">
                    <a href="#overview" class="flex items-center gap-3 px-4 py-3 rounded-xl bg-indigo-600 text-white shadow-sm transition">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>
                        <span>Dashboard</span>
                    </a>

                    <a href="#products-section" class="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
                        <span>Products</span>
                        <span class="ml-auto bg-slate-800 text-slate-300 text-xs px-2 py-0.5 rounded-full">{{ $totalProducts }}</span>
                    </a>

                    <a href="#categories-section" class="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/></svg>
                        <span>Categories</span>
                        <span class="ml-auto bg-slate-800 text-slate-300 text-xs px-2 py-0.5 rounded-full">{{ $totalCategories }}</span>
                    </a>

                    <a href="#api-tester" class="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
                        <span>REST API Tester</span>
                    </a>
                </nav>
            </div>

            <!-- Footer Link to Frontend -->
            <div class="p-4 border-t border-slate-800 space-y-3">
                <a href="http://localhost:5173" target="_blank" class="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-indigo-600 text-white text-xs font-bold transition shadow-sm">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                    <span>View React Storefront</span>
                </a>
                <p class="text-[11px] text-center text-slate-500">Connected to MySQL: <strong class="text-slate-400">kh_qr</strong></p>
            </div>
        </aside>

        <!-- ================= MAIN CONTENT ================= -->
        <main class="flex-1 flex flex-col min-w-0 overflow-y-auto">
            <!-- Top Navbar -->
            <header class="h-20 bg-white border-b border-slate-200 px-6 sm:px-8 flex items-center justify-between sticky top-0 z-20">
                <div>
                    <h2 class="text-xl font-bold text-slate-900">E-Commerce Management Dashboard</h2>
                    <p class="text-xs text-slate-500">Live operational overview for MySQL database <span class="font-semibold text-slate-700">kh_qr</span></p>
                </div>

                <div class="flex items-center gap-4">
                    <!-- Status Pill -->
                    <div class="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
                        <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span>API & DB Connected</span>
                    </div>

                    <!-- Quick Add Product Button -->
                    <button onclick="document.getElementById('addProductModal').classList.remove('hidden')" class="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold shadow-md shadow-indigo-100 transition active:scale-95">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
                        <span>New Product</span>
                    </button>
                </div>
            </header>

            <div class="p-6 sm:p-8 space-y-8 max-w-7xl w-full mx-auto">
                <!-- Flash Notification -->
                @if (session('success'))
                    <div class="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold flex items-center justify-between shadow-sm animate-fade-in">
                        <div class="flex items-center gap-2.5">
                            <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                            <span>{{ session('success') }}</span>
                        </div>
                        <button onclick="this.parentElement.remove()" class="text-emerald-600 hover:text-emerald-800">&times;</button>
                    </div>
                @endif

                <!-- ================= 4 KPI STAT CARDS ================= -->
                <section id="overview" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <!-- Card 1: Total Products -->
                    <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition">
                        <div class="flex items-center justify-between">
                            <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Products</span>
                            <div class="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
                            </div>
                        </div>
                        <div class="mt-4 flex items-baseline gap-2">
                            <span class="text-3xl font-extrabold text-slate-900">{{ $totalProducts }}</span>
                            <span class="text-xs text-emerald-600 font-semibold">Active in Store</span>
                        </div>
                    </div>

                    <!-- Card 2: Total Categories -->
                    <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition">
                        <div class="flex items-center justify-between">
                            <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Categories</span>
                            <div class="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/></svg>
                            </div>
                        </div>
                        <div class="mt-4 flex items-baseline gap-2">
                            <span class="text-3xl font-extrabold text-slate-900">{{ $totalCategories }}</span>
                            <span class="text-xs text-slate-500 font-medium">Departments</span>
                        </div>
                    </div>

                    <!-- Card 3: Total Inventory Units -->
                    <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition">
                        <div class="flex items-center justify-between">
                            <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Units in Stock</span>
                            <div class="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
                            </div>
                        </div>
                        <div class="mt-4 flex items-baseline gap-2">
                            <span class="text-3xl font-extrabold text-slate-900">{{ $totalStockUnits }}</span>
                            <span class="text-xs text-slate-500 font-medium">Items Available</span>
                        </div>
                    </div>

                    <!-- Card 4: Inventory Valuation -->
                    <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition">
                        <div class="flex items-center justify-between">
                            <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Inventory Value</span>
                            <div class="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                            </div>
                        </div>
                        <div class="mt-4 flex items-baseline gap-2">
                            <span class="text-3xl font-extrabold text-indigo-600">${{ number_format($totalInventoryValue, 2) }}</span>
                            <span class="text-xs text-slate-400">Total USD</span>
                        </div>
                    </div>
                </section>

                <!-- ================= PRODUCT CATALOG TABLE ================= -->
                <section id="products-section" class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div class="p-6 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                            <h3 class="text-lg font-bold text-slate-900">Manage Store Products</h3>
                            <p class="text-xs text-slate-500">Live synchronization with MySQL table <code class="text-indigo-600 font-mono">products</code></p>
                        </div>

                        <!-- Filter Form -->
                        <form method="GET" action="{{ route('admin.dashboard') }}" class="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                            <!-- Category Filter -->
                            <select name="category_id" onchange="this.form.submit()" class="px-3 py-2 text-xs font-semibold rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-100 bg-white">
                                <option value="">All Categories</option>
                                @foreach ($categories as $cat)
                                    <option value="{{ $cat->id }}" {{ $categoryFilter == $cat->id ? 'selected' : '' }}>
                                        {{ $cat->name }}
                                    </option>
                                @endforeach
                            </select>

                            <!-- Search Input -->
                            <div class="relative">
                                <input type="text" name="search" value="{{ $search }}" placeholder="Search products..." class="pl-8 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-100 bg-white">
                                <svg class="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                            </div>

                            @if($categoryFilter || $search)
                                <a href="{{ route('admin.dashboard') }}" class="text-xs font-semibold text-rose-600 hover:underline">Reset</a>
                            @endif
                        </form>
                    </div>

                    <!-- Products Table -->
                    <div class="overflow-x-auto">
                        <table class="w-full text-left text-sm">
                            <thead class="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider font-semibold border-b border-slate-100">
                                <tr>
                                    <th class="px-6 py-4">Product</th>
                                    <th class="px-6 py-4">Category</th>
                                    <th class="px-6 py-4">Price</th>
                                    <th class="px-6 py-4">Stock Status</th>
                                    <th class="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-100">
                                @forelse ($products as $product)
                                    <tr class="hover:bg-slate-50/70 transition">
                                        <td class="px-6 py-4">
                                            <div class="flex items-center gap-3">
                                                <img src="{{ $product->image }}" alt="{{ $product->name }}" class="w-12 h-12 rounded-xl object-cover bg-slate-100 border border-slate-200 shrink-0">
                                                <div>
                                                    <h4 class="font-bold text-slate-900">{{ $product->name }}</h4>
                                                    <span class="text-xs text-slate-400 font-mono">ID: #{{ $product->id }}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="px-6 py-4">
                                            <span class="px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                                                {{ $product->category->name ?? 'Uncategorized' }}
                                            </span>
                                        </td>
                                        <td class="px-6 py-4">
                                            <span class="font-extrabold text-slate-900 text-base">${{ number_format($product->price, 2) }}</span>
                                        </td>
                                        <td class="px-6 py-4">
                                            @if($product->stock > 20)
                                                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                                                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                                                    {{ $product->stock }} in stock
                                                </span>
                                            @elseif($product->stock > 0)
                                                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                                                    <span class="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                                                    Low stock ({{ $product->stock }})
                                                </span>
                                            @else
                                                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800">
                                                    <span class="w-1.5 h-1.5 rounded-full bg-rose-600"></span>
                                                    Out of stock
                                                </span>
                                            @endif
                                        </td>
                                        <td class="px-6 py-4 text-right">
                                            <form method="POST" action="{{ route('admin.product.delete', $product->id) }}" onsubmit="return confirm('Are you sure you want to delete this product?');" class="inline-block">
                                                @csrf
                                                @method('DELETE')
                                                <button type="submit" class="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition" title="Delete Product">
                                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                                                </button>
                                            </form>
                                        </td>
                                    </tr>
                                @empty
                                    <tr>
                                        <td colspan="5" class="px-6 py-12 text-center text-slate-400">
                                            No products found matching your filter criteria.
                                        </td>
                                    </tr>
                                @endforelse
                            </tbody>
                        </table>
                    </div>
                </section>

                <!-- ================= CATEGORIES & API TESTER SECTION ================= -->
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <!-- Categories Panel (5 cols) -->
                    <div id="categories-section" class="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
                        <div class="flex items-center justify-between pb-3 border-b border-slate-100">
                            <div>
                                <h3 class="text-base font-bold text-slate-900">Categories</h3>
                                <p class="text-xs text-slate-500">Groupings in <code class="text-indigo-600 font-mono">categories</code> table</p>
                            </div>
                            <span class="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">{{ $totalCategories }} Total</span>
                        </div>

                        <!-- Add Category Form -->
                        <form method="POST" action="{{ route('admin.category.store') }}" class="flex gap-2">
                            @csrf
                            <input type="text" name="name" required placeholder="New category name..." class="flex-1 px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-100 bg-white">
                            <button type="submit" class="px-4 py-2 bg-slate-900 hover:bg-indigo-600 text-white text-xs font-bold rounded-xl transition shadow-sm">
                                Add
                            </button>
                        </form>

                        <!-- Category List -->
                        <div class="divide-y divide-slate-100">
                            @foreach ($categories as $category)
                                <div class="py-3 flex items-center justify-between">
                                    <div class="flex items-center gap-2">
                                        <span class="w-2 h-2 rounded-full bg-indigo-600"></span>
                                        <span class="text-sm font-bold text-slate-800">{{ $category->name }}</span>
                                    </div>
                                    <span class="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                                        {{ $category->products_count }} {{ $category->products_count == 1 ? 'item' : 'items' }}
                                    </span>
                                </div>
                            @endforeach
                        </div>
                    </div>

                    <!-- API Tester Panel (7 cols) -->
                    <div id="api-tester" class="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                        <div class="flex items-center justify-between pb-3 border-b border-slate-100">
                            <div>
                                <h3 class="text-base font-bold text-slate-900">Live REST API Tester</h3>
                                <p class="text-xs text-slate-500">Test backend endpoints and inspect live JSON payload</p>
                            </div>
                            <span class="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">HTTP 200 OK</span>
                        </div>

                        <!-- Quick Test Buttons -->
                        <div class="flex flex-wrap gap-2">
                            <button onclick="testEndpoint('/api/products')" class="px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-mono text-xs font-bold transition">
                                GET /api/products
                            </button>
                            <button onclick="testEndpoint('/api/categories')" class="px-3 py-1.5 rounded-lg bg-purple-50 text-purple-700 hover:bg-purple-100 font-mono text-xs font-bold transition">
                                GET /api/categories
                            </button>
                            <button onclick="testEndpoint('/api/products/1')" class="px-3 py-1.5 rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-100 font-mono text-xs font-bold transition">
                                GET /api/products/1
                            </button>
                        </div>

                        <!-- JSON Response Preview Box -->
                        <div class="relative">
                            <div class="absolute top-2 right-2 text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">application/json</div>
                            <pre id="apiResult" class="p-4 bg-slate-900 text-emerald-400 rounded-xl text-xs font-mono h-52 overflow-y-auto leading-relaxed">// Click any endpoint button above to test live response</pre>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>

    <!-- ================= ADD PRODUCT MODAL ================= -->
    <div id="addProductModal" class="hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
        <div class="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6">
            <div class="flex items-center justify-between pb-4 border-b border-slate-100">
                <h3 class="text-lg font-bold text-slate-900">Add New Store Product</h3>
                <button onclick="document.getElementById('addProductModal').classList.add('hidden')" class="text-slate-400 hover:text-slate-600 text-xl font-bold">&times;</button>
            </div>

            <form method="POST" action="{{ route('admin.product.store') }}" class="space-y-4">
                @csrf
                <div>
                    <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Product Name</label>
                    <input type="text" name="name" required placeholder="e.g. Wireless Headphones" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-indigo-500 focus:outline-none">
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Category</label>
                        <select name="category_id" required class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-indigo-500 focus:outline-none bg-white">
                            @foreach ($categories as $cat)
                                <option value="{{ $cat->id }}">{{ $cat->name }}</option>
                            @endforeach
                        </select>
                    </div>

                    <div>
                        <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Price ($ USD)</label>
                        <input type="number" step="0.01" name="price" required placeholder="89.99" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-indigo-500 focus:outline-none">
                    </div>
                </div>

                <div>
                    <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Initial Stock Units</label>
                    <input type="number" name="stock" required placeholder="25" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-indigo-500 focus:outline-none">
                </div>

                <div>
                    <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Image URL (Optional)</label>
                    <input type="url" name="image" placeholder="https://images.unsplash.com/..." class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-indigo-500 focus:outline-none">
                </div>

                <div class="pt-4 flex justify-end gap-3">
                    <button type="button" onclick="document.getElementById('addProductModal').classList.add('hidden')" class="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-sm font-semibold hover:bg-slate-50">
                        Cancel
                    </button>
                    <button type="submit" class="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold shadow-md shadow-indigo-100">
                        Save Product
                    </button>
                </div>
            </form>
        </div>
    </div>

    <!-- Live API Tester Script -->
    <script>
        async function testEndpoint(endpoint) {
            const pre = document.getElementById('apiResult');
            pre.textContent = 'Loading ' + endpoint + ' ...';
            try {
                const res = await fetch(endpoint);
                const data = await res.json();
                pre.textContent = JSON.stringify(data, null, 2);
            } catch (err) {
                pre.textContent = 'Error: ' + err.message;
            }
        }
    </script>
</body>
</html>
