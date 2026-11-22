import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useShop();

  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleIncrement = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const lineTotal = item.price * item.quantity;

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-5 bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:border-slate-300 transition">
      {/* Product Image & Info */}
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl bg-slate-100 shrink-0 border border-slate-100"
        />
        <div className="min-w-0">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-600">
            {typeof item.category === 'object' ? item.category?.name : (item.category || 'Tech')}
          </span>
          <h4 className="text-base font-bold text-slate-900 truncate">{item.name}</h4>
          <p className="text-sm font-semibold text-slate-500 mt-0.5">
            ${item.price.toLocaleString()} <span className="text-xs text-slate-400 font-normal">/ unit</span>
          </p>
        </div>
      </div>

      {/* Quantity Controls & Line Total & Delete Button */}
      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
        {/* - QTY + */}
        <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 p-1 shadow-inner">
          <button
            onClick={handleDecrement}
            disabled={item.quantity <= 1}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition ${
              item.quantity <= 1
                ? 'text-slate-300 cursor-not-allowed'
                : 'text-slate-700 hover:bg-white hover:shadow-sm active:scale-95'
            }`}
            aria-label="Decrease quantity"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>

          <span className="w-10 text-center text-sm font-bold text-slate-800 select-none">
            {item.quantity}
          </span>

          <button
            onClick={handleIncrement}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-700 hover:bg-white hover:shadow-sm active:scale-95 transition"
            aria-label="Increase quantity"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Line Total */}
        <div className="text-right min-w-[90px]">
          <span className="text-xs text-slate-400 block sm:hidden">Total</span>
          <span className="text-lg font-extrabold text-slate-900">
            ${lineTotal.toLocaleString()}
          </span>
        </div>

        {/* Trash Button */}
        <button
          onClick={() => removeFromCart(item.id)}
          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition active:scale-95"
          title="Remove item"
          aria-label={`Remove ${item.name}`}
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
