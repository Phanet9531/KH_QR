# TechStore Full-Stack E-Commerce Project

A complete, modern full-stack e-commerce project organized into two clean, dedicated folders:
- **`frontend/`**: React 18, Vite, React Router, Tailwind CSS, Context API.
- **`backend/`**: Laravel 12 REST API, Eloquent ORM, MySQL database (`kh_qr`).

---

## 📁 Two-Folder Directory Structure

```text
Connect_KH_qr/
├── frontend/                          # REACT FRONTEND APPLICATION
│   ├── .env                           # VITE_API_URL=http://localhost:8000/api
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── src/
│       ├── data/
│       │   └── products.js            # Hardcoded product catalog (Step 1)
│       ├── services/
│       │   └── api.js                 # Axios API service client (Step 6)
│       ├── context/
│       │   └── ShopContext.jsx        # Cart & Order state with localStorage
│       ├── components/
│       │   ├── Navbar.jsx             # Top bar with live cart count badge
│       │   ├── Footer.jsx             # Trust badges and footer links
│       │   ├── ProductCard.jsx        # Product card with Add-to-Cart logic
│       │   ├── CartItem.jsx           # +/- quantity modifier & trash delete
│       │   └── OrderSummary.jsx       # Live Subtotal, Delivery, Grand Total
│       └── pages/
│           ├── ProductListPage.jsx    # Catalog with search, filters & API loading
│           ├── CartPage.jsx           # Cart table & sticky Order Summary
│           ├── CheckoutPage.jsx       # Customer form & live shipping selection
│           └── OrderConfirmationPage.jsx # Order placed receipt (ORD-0001)
│
├── backend/                           # LARAVEL BACKEND REST API
│   ├── .env                           # DB_DATABASE=kh_qr
│   ├── .env.example
│   ├── config/cors.php                # CORS for http://localhost:5173
│   ├── app/
│   │   ├── Models/
│   │   │   ├── Category.php           # Category (hasMany Product)
│   │   │   └── Product.php            # Product (belongsTo Category)
│   │   ├── Http/
│   │   │   ├── Controllers/
│   │   │   │   ├── CategoryController.php # Category CRUD
│   │   │   │   └── ProductController.php  # Product CRUD, search, filter, pagination
│   │   │   ├── Requests/
│   │   │   │   ├── CategoryRequest.php    # Category validation
│   │   │   │   └── ProductRequest.php     # Product validation
│   │   │   └── Resources/
│   │   │       ├── CategoryResource.php   # Category JSON Resource
│   │   │       └── ProductResource.php    # Product JSON Resource
│   │   ├── database/
│   │   │   ├── migrations/
│   │   │   │   ├── 2026_01_01_000001_create_categories_table.php
│   │   │   │   └── 2026_01_01_000002_create_products_table.php
│   │   │   └── seeders/
│   │   │       ├── CategorySeeder.php     # Computers, Accessories, Displays
│   │   │       ├── ProductSeeder.php      # Laptop, Mouse, Keyboard, Monitor
│   │   │       └── DatabaseSeeder.php     # Master seeder registration
│   │   └── routes/
│   │       └── api.php                # RESTful apiResource routes
│
├── .github/workflows/deploy.yml       # Automated GitHub Pages CI/CD
├── .gitignore                         # Clean git ignore for both apps
├── database-erd.drawio                # Draw.io / diagrams.net ERD diagram file
├── package.json                       # Root script shortcuts for both apps
└── README.md
```

---

## 🚀 How to Run the Projects

### 1. Start the Backend API (Laravel)
Open a terminal:
```powershell
cd backend
php artisan serve --port=8000
```
Backend API will be running at: `http://localhost:8000/api`

### 2. Start the Frontend (React JS)
Open a second terminal:
```powershell
cd frontend
npm install
npm run dev
```
Frontend will be running at: `http://localhost:5173`

---

## ⚡ Root NPM Shortcuts (Optional)
From the root folder `Connect_KH_qr`, you can also run:
```powershell
npm run dev:frontend    # Starts React dev server
npm run dev:backend     # Starts Laravel API server
npm run migrate:backend # Migrates and seeds MySQL database kh_qr
```

---

## 🗄️ Database Setup (`kh_qr`)
1. Ensure MySQL is running (e.g. in XAMPP or MySQL Service).
2. Inside `backend/`:
```powershell
cd backend
php artisan migrate:fresh --seed
```
This drops existing tables, creates the `categories` and `products` tables, and seeds the 4 products across the 3 categories.
