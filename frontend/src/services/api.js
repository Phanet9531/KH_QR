import axios from 'axios';
import { PRODUCTS } from '../data/products';

// Primary IPv4 address avoids Windows localhost IPv6 resolution delays
const PRIMARY_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';
const FALLBACK_URL = 'http://localhost:8000/api';

const createClient = (baseURL) =>
  axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    timeout: 6000,
  });

let activeClient = createClient(PRIMARY_URL);

/**
 * Fetch all products with search & category filtering
 * Connects directly to GET /api/products from Laravel Backend
 */
export const getProducts = async (params = {}) => {
  try {
    const response = await activeClient.get('/products', { params });
    console.log('[API Success] Loaded products from Laravel backend:', response.data);
    return {
      success: true,
      data: response.data.data || response.data,
      meta: response.data.meta || null,
      fromApi: true,
    };
  } catch (error) {
    // If primary failed, try fallback host once
    try {
      const fallbackClient = createClient(FALLBACK_URL);
      const response = await fallbackClient.get('/products', { params });
      activeClient = fallbackClient; // Switch to working host
      console.log('[API Success via fallback] Loaded products:', response.data);
      return {
        success: true,
        data: response.data.data || response.data,
        meta: response.data.meta || null,
        fromApi: true,
      };
    } catch (fallbackError) {
      console.warn(
        'Laravel Backend not running at :8000. To start it, run: "cd backend && php artisan serve". Using local store data for now.'
      );

      // Local store fallback
      let fallback = [...PRODUCTS];
      if (params.category_id) {
        fallback = fallback.filter(
          (p) =>
            p.category_id === Number(params.category_id) ||
            p.category?.id === Number(params.category_id)
        );
      }
      if (params.search) {
        const q = params.search.toLowerCase();
        fallback = fallback.filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            (p.category?.name || p.category || '').toLowerCase().includes(q)
        );
      }
      return {
        success: true,
        data: fallback,
        meta: null,
        fromApi: false,
      };
    }
  }
};

/**
 * Fetch a single product by ID
 */
export const getProductById = async (id) => {
  try {
    const response = await activeClient.get(`/products/${id}`);
    return {
      success: true,
      data: response.data.data || response.data,
      fromApi: true,
    };
  } catch (error) {
    const item = PRODUCTS.find((p) => p.id === Number(id));
    return {
      success: !!item,
      data: item || null,
      fromApi: false,
    };
  }
};

/**
 * Fetch all categories
 */
export const getCategories = async () => {
  try {
    const response = await activeClient.get('/categories');
    return {
      success: true,
      data: response.data.data || response.data,
      fromApi: true,
    };
  } catch (error) {
    return {
      success: true,
      data: [
        { id: 1, name: 'Computers' },
        { id: 2, name: 'Accessories' },
        { id: 3, name: 'Displays' },
      ],
      fromApi: false,
    };
  }
};

export default activeClient;
