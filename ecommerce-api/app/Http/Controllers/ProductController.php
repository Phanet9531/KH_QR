<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * GET /api/products
     * Supports:
     * - ?category_id= (filter by category)
     * - ?search= (search in product name or category name)
     * - ?per_page= (pagination, default 10)
     * - with('category') eager loading to avoid N+1 queries
     */
    public function index(Request $request): JsonResponse
    {
        $query = Product::with('category');

        // Filter by category_id
        if ($request->filled('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        // Search by product name or category name
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhereHas('category', function ($catQuery) use ($search) {
                      $catQuery->where('name', 'like', "%{$search}%");
                  });
            });
        }

        // Sorting
        $sortBy = $request->get('sort_by', 'id');
        $sortOrder = $request->get('sort_order', 'asc');
        $query->orderBy($sortBy, $sortOrder);

        // Pagination
        $perPage = (int) $request->get('per_page', 10);
        $products = $query->paginate($perPage);

        return response()->json([
            'status' => 'success',
            'message' => 'Products retrieved successfully',
            'data' => ProductResource::collection($products->items()),
            'meta' => [
                'current_page' => $products->currentPage(),
                'last_page' => $products->lastPage(),
                'per_page' => $products->perPage(),
                'total' => $products->total(),
            ],
        ], 200);
    }

    /**
     * POST /api/products
     */
    public function store(ProductRequest $request): JsonResponse
    {
        $product = Product::create($request->validated());
        $product->load('category');

        return response()->json([
            'status' => 'success',
            'message' => 'Product created successfully',
            'data' => new ProductResource($product),
        ], 201);
    }

    /**
     * GET /api/products/{id}
     */
    public function show(string $id): JsonResponse
    {
        $product = Product::with('category')->find($id);

        if (!$product) {
            return response()->json([
                'status' => 'error',
                'message' => 'Product not found',
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Product retrieved successfully',
            'data' => new ProductResource($product),
        ], 200);
    }

    /**
     * PUT/PATCH /api/products/{id}
     */
    public function update(ProductRequest $request, string $id): JsonResponse
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json([
                'status' => 'error',
                'message' => 'Product not found',
            ], 404);
        }

        $product->update($request->validated());
        $product->load('category');

        return response()->json([
            'status' => 'success',
            'message' => 'Product updated successfully',
            'data' => new ProductResource($product),
        ], 200);
    }

    /**
     * DELETE /api/products/{id}
     */
    public function destroy(string $id): JsonResponse
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json([
                'status' => 'error',
                'message' => 'Product not found',
            ], 404);
        }

        $product->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Product deleted successfully',
        ], 200);
    }
}
