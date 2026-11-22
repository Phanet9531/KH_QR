<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            [
                'id' => 1,
                'category_id' => 1, // Computers
                'name' => 'Laptop',
                'price' => 650.00,
                'stock' => 15,
                'image' => 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=80',
            ],
            [
                'id' => 2,
                'category_id' => 2, // Accessories
                'name' => 'Mouse',
                'price' => 15.00,
                'stock' => 50,
                'image' => 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=600&q=80',
            ],
            [
                'id' => 3,
                'category_id' => 2, // Accessories
                'name' => 'Keyboard',
                'price' => 25.00,
                'stock' => 35,
                'image' => 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80',
            ],
            [
                'id' => 4,
                'category_id' => 3, // Displays
                'name' => 'Monitor',
                'price' => 120.00,
                'stock' => 20,
                'image' => 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80',
            ],
        ];

        foreach ($products as $prod) {
            Product::updateOrCreate(['id' => $prod['id']], $prod);
        }
    }
}
