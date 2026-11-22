import React, { createContext, useContext, useState, useEffect } from 'react';

const ShopContext = createContext(null);

const CART_STORAGE_KEY = 'techstore_cart_items';
const ORDER_COUNTER_KEY = 'techstore_order_counter';
const LATEST_ORDER_KEY = 'techstore_latest_order';

export const ShopProvider = ({ children }) => {
  // 1. Initialize Cart State from LocalStorage
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to parse cart from localStorage:', e);
      return [];
    }
  });

  // 2. Initialize Latest Order State from LocalStorage (persists across page reloads on confirmation)
  const [currentOrder, setCurrentOrder] = useState(() => {
    try {
      const saved = localStorage.getItem(LATEST_ORDER_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      console.error('Failed to parse latest order:', e);
      return null;
    }
  });

  // Sync cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage:', e);
    }
  }, [cart]);

  // Sync latest order to localStorage whenever it changes
  useEffect(() => {
    try {
      if (currentOrder) {
        localStorage.setItem(LATEST_ORDER_KEY, JSON.stringify(currentOrder));
      }
    } catch (e) {
      console.error('Failed to save latest order:', e);
    }
  }, [currentOrder]);

  // ADD TO CART: If item exists, increment quantity by 1; else add with qty = 1
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.id === product.id);
      if (existingIndex > -1) {
        return prevCart.map((item, idx) =>
          idx === existingIndex ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // UPDATE QUANTITY: Minimum is 1
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // REMOVE FROM CART
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id === productId));
  };

  // CLEAR CART
  const clearCart = () => {
    setCart([]);
  };

  // DERIVED CART CALCULATIONS
  // Total quantity of items in cart
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Subtotal ($)
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // PLACE ORDER
  const placeOrder = ({ customer, shippingMethod }) => {
    // Generate Auto-incrementing Order ID: ORD-0001, ORD-0002, etc.
    let currentCounter = 1;
    try {
      const storedCounter = localStorage.getItem(ORDER_COUNTER_KEY);
      if (storedCounter) {
        currentCounter = parseInt(storedCounter, 10) + 1;
      }
      localStorage.setItem(ORDER_COUNTER_KEY, currentCounter.toString());
    } catch (e) {
      console.error('Failed updating order counter:', e);
    }

    const paddedId = String(currentCounter).padStart(4, '0');
    const orderId = `ORD-${paddedId}`;

    const shippingFee = shippingMethod.id === 'express' ? 9 : 0;
    const totalAmount = subtotal + shippingFee;

    const newOrder = {
      orderId,
      customerName: `${customer.firstName.trim()} ${customer.lastName.trim()}`,
      customerEmail: customer.email.trim(),
      customerPhone: customer.phone.trim(),
      shippingAddress: {
        address: customer.address.trim(),
        city: customer.city ? customer.city.trim() : '',
        state: customer.state ? customer.state.trim() : '',
        zip: customer.zip ? customer.zip.trim() : '',
      },
      orderDate: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      shippingMethod: shippingMethod.name,
      shippingFee,
      items: cart.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        total: item.price * item.quantity,
        image: item.image,
      })),
      subtotal,
      totalAmount,
      status: 'Pending',
    };

    setCurrentOrder(newOrder);
    clearCart();
    return newOrder;
  };

  return (
    <ShopContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartItemCount,
        subtotal,
        currentOrder,
        placeOrder,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
