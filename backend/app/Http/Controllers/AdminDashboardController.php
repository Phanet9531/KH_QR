<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\View\View;

class AdminDashboardController extends Controller
{
    /**
     * Display the Admin Dashboard Web UI
     */
    public function index(Request $request): View
    {
        $categoryFilter = $request->query('category_id');
        $search = $request->query('search');

        // Products Query with Filters
        $productsQuery = Product::with('category')->latest();

        if ($categoryFilter) {
            $productsQuery->where('category_id', $categoryFilter);
        }

        if ($search) {
            $productsQuery->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhereHas('category', function ($catQuery) use ($search) {
                      $catQuery->where('name', 'like', "%{$search}%");
                  });
            });
        }

        $products = $productsQuery->get();
        $categories = Category::withCount('products')->get();

        // Calculate KPI Stats
        $totalProducts = Product::count();
        $totalCategories = Category::count();
        $totalStockUnits = (int) Product::sum('stock');
        $totalInventoryValue = (float) Product::select(DB::raw('SUM(price * stock) as total'))->value('total') ?? 0;
        $lowStockCount = Product::where('stock', '<=', 20)->count();

        // Database connection test
        $dbStatus = 'Connected';
        try {
            DB::connection()->getPdo();
        } catch (\Exception $e) {
            $dbStatus = 'Disconnected: ' . $e->getMessage();
        }

        return view('admin.dashboard', compact(
            'products',
            'categories',
            'totalProducts',
            'totalCategories',
            'totalStockUnits',
            'totalInventoryValue',
            'lowStockCount',
            'dbStatus',
            'categoryFilter',
            'search'
        ));
    }

    /**
     * Store new product from the Admin Dashboard Web UI
     */
    public function storeProduct(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'image' => 'nullable|url|max:500',
        ]);

        if (empty($validated['image'])) {
            $validated['image'] = 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=600&q=80';
        }

        Product::create($validated);

        return redirect()->route('admin.dashboard')->with('success', 'Product "' . $validated['name'] . '" added successfully!');
    }

    /**
     * Delete product from the Admin Dashboard Web UI
     */
    public function deleteProduct(int $id): RedirectResponse
    {
        $product = Product::findOrFail($id);
        $name = $product->name;
        $product->delete();

        return redirect()->route('admin.dashboard')->with('success', 'Product "' . $name . '" deleted successfully!');
    }

    /**
     * Store new category from Admin Dashboard
     */
    public function storeCategory(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100|unique:categories,name',
        ]);

        Category::create($validated);

        return redirect()->route('admin.dashboard')->with('success', 'Category "' . $validated['name'] . '" created successfully!');
    }

    /**
     * API Endpoint: GET /api/admin/stats
     */
    public function apiStats(): JsonResponse
    {
        return response()->json([
            'status' => 'success',
            'data' => [
                'total_products' => Product::count(),
                'total_categories' => Category::count(),
                'total_stock_units' => (int) Product::sum('stock'),
                'total_inventory_value' => (float) Product::select(DB::raw('SUM(price * stock) as total'))->value('total') ?? 0,
                'low_stock_count' => Product::where('stock', '<=', 20)->count(),
                'database' => config('database.connections.mysql.database'),
            ]
        ]);
    }
}
