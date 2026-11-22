<?php

use App\Http\Controllers\AdminDashboardController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes - Backend Admin Dashboard
|--------------------------------------------------------------------------
|
| Access the interactive Admin Dashboard at:
| http://localhost:8000/
| http://localhost:8000/admin
|
*/

Route::get('/', [AdminDashboardController::class, 'index'])->name('admin.home');
Route::get('/admin', [AdminDashboardController::class, 'index'])->name('admin.dashboard');

// Direct Actions from Dashboard UI
Route::post('/admin/products', [AdminDashboardController::class, 'storeProduct'])->name('admin.product.store');
Route::delete('/admin/products/{id}', [AdminDashboardController::class, 'deleteProduct'])->name('admin.product.delete');
Route::post('/admin/categories', [AdminDashboardController::class, 'storeCategory'])->name('admin.category.store');
