import axios from 'axios';
import { PRODUCTS } from '../data/products';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000,
});

/**
 * Fetch all products with optional search and category filtering
 * Falls back to hardcoded PRODUCTS if the API is offline (Step 1 -> Step 6 seamless transition)
 */
export const getProducts = async (params = {}) => {
  try {
    const response = await apiClient.get('/products', { params });
    // Laravel API resource returns { data: [...], meta: {...} } or [...]
    return {
      success: true,
      data: response.data.data || response.data,
      meta: response.data.meta || null,
      fromApi: true,
    };
  } catch (error) {
    console.warn('Backend API unavailable, falling back to local store data:', error.message);
    let fallback = [...PRODUCTS];
    if (params.category_id) {
      fallback = fallback.filter(p => p.category_id === Number(params.category_id) || p.category?.id === Number(params.category_id));
    }
    if (params.search) {
      const q = params.search.toLowerCase();
      fallback = fallback.filter(p => p.name.toLowerCase().includes(q) || (p.category?.name || p.category || '').toLowerCase().includes(q));
    }
    return {
      success: true,
      data: fallback,
      meta: null,
      fromApi: false,
    };
  }
};

/**
 * Fetch a single product by ID
 */
export const getProductById = async (id) => {
  try {
    const response = await apiClient.get(`/products/${id}`);
    return {
      success: true,
      data: response.data.data || response.data,
    };
  } catch (error) {
    console.warn(`Product API failed for ID ${id}, using fallback:`, error.message);
    const item = PRODUCTS.find(p => p.id === Number(id));
    return {
      success: !!item,
      data: item || null,
    };
  }
};

/**
 * Fetch all categories
 */
export const getCategories = async () => {
  try {
    const response = await apiClient.get('/categories');
    return {
      success: true,
      data: response.data.data || response.data,
      fromApi: true,
    };
  } catch (error) {
    console.warn('Categories API unavailable, using fallback categories:', error.message);
    return {
      success: true,
      data: [
        { id: 1, name: 'Computers' },
        { id: 2, name: 'Accessories' },
        { id: 3, name: 'Displays' }
      ],
      fromApi: false,
    };
  }
};

export default apiClient;
