import React, { useState } from 'react';
import { ShoppingBag, Check, Star } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const ProductCard = ({ product }) => {
  const { addToCart, cart } = useShop();
  const [justAdded, setJustAdded] = useState(false);

  // Check how many of this item is currently in cart
  const cartItem = cart.find((item) => item.id === product.id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  const handleAdd = () => {
    addToCart(product);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
    }, 1200);
  };

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col overflow-hidden">
      {/* Product Image */}
      <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-white/90 backdrop-blur-sm text-slate-700 shadow-sm">
            {product.category}
          </span>
        </div>
        {quantityInCart > 0 && (
          <div className="absolute top-3 right-3 bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow">
            {quantityInCart} in cart
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1 text-amber-500 text-xs mb-2">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="font-semibold text-slate-700">{product.rating || 4.8}</span>
            <span className="text-slate-400">({product.reviews || 95})</span>
          </div>

          <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition">
            {product.name}
          </h3>
          <p className="mt-1 text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 uppercase tracking-wider block">Price</span>
            <span className="text-2xl font-extrabold text-slate-900">
              ${product.price.toLocaleString()}
            </span>
          </div>

          <button
            onClick={handleAdd}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-95 shadow-sm ${
              justAdded
                ? 'bg-emerald-600 text-white shadow-emerald-200'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-100'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>{quantityInCart > 0 ? 'Add More' : 'Add to Cart'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
