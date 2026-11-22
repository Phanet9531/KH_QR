<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * GET /api/categories
     */
    public function index(Request $request): JsonResponse
    {
        $categories = Category::withCount('products')->get();

        return response()->json([
            'status' => 'success',
            'message' => 'Categories retrieved successfully',
            'data' => CategoryResource::collection($categories),
        ], 200);
    }

    /**
     * POST /api/categories
     */
    public function store(CategoryRequest $request): JsonResponse
    {
        $category = Category::create($request->validated());

        return response()->json([
            'status' => 'success',
            'message' => 'Category created successfully',
            'data' => new CategoryResource($category),
        ], 201);
    }

    /**
     * GET /api/categories/{id}
     */
    public function show(string $id): JsonResponse
    {
        $category = Category::with('products')->find($id);

        if (!$category) {
            return response()->json([
                'status' => 'error',
                'message' => 'Category not found',
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Category retrieved successfully',
            'data' => new CategoryResource($category),
        ], 200);
    }

    /**
     * PUT/PATCH /api/categories/{id}
     */
    public function update(CategoryRequest $request, string $id): JsonResponse
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json([
                'status' => 'error',
                'message' => 'Category not found',
            ], 404);
        }

        $category->update($request->validated());

        return response()->json([
            'status' => 'success',
            'message' => 'Category updated successfully',
            'data' => new CategoryResource($category),
        ], 200);
    }

    /**
     * DELETE /api/categories/{id}
     */
    public function destroy(string $id): JsonResponse
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json([
                'status' => 'error',
                'message' => 'Category not found',
            ], 404);
        }

        $category->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Category deleted successfully',
        ], 200);
    }
}
