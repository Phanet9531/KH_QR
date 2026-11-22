<?php

use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application.
| All routes are prefixed with /api.
|
*/

// Admin KPI statistics endpoint
Route::get('/admin/stats', [AdminDashboardController::class, 'apiStats']);

// Category API Routes
Route::apiResource('categories', CategoryController::class);

// Product API Routes
Route::apiResource('products', ProductController::class);
