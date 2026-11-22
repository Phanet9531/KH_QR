import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, Trash2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { CartItem } from '../components/CartItem';
import { OrderSummary } from '../components/OrderSummary';

export const CartPage = () => {
  const { cart, subtotal, clearCart, cartItemCount } = useShop();

  const isCartEmpty = cart.length === 0;

  return (
    <div className="space-y-8">
      {/* Breadcrumb / Top Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <Link to="/" className="hover:text-indigo-600">Home</Link>
            <span>/</span>
            <span className="text-slate-800 font-semibold">Shopping Cart</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Shopping Cart <span className="text-lg font-semibold text-slate-500">({cartItemCount} {cartItemCount === 1 ? 'item' : 'items'})</span>
          </h1>
        </div>

        {!isCartEmpty && (
          <button
            onClick={clearCart}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-3 py-1.5 rounded-lg transition"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Cart</span>
          </button>
        )}
      </div>

      {isCartEmpty ? (
        /* Empty Cart State */
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-lg mx-auto shadow-sm my-8">
          <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Your Cart is Empty</h2>
          <p className="text-slate-500 text-sm mb-6 leading-relaxed">
            Looks like you haven't added any products to your cart yet. Explore our top electronics catalog to find what you need!
          </p>
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition shadow-md shadow-indigo-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </Link>
        </div>
      ) : (
        /* Cart With Items: Item List Left + Sticky Order Summary Right (Webyansh-style) */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Items List (Left Column) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="space-y-4">
              {cart.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            <div className="pt-4 flex justify-between items-center">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Continue Shopping</span>
              </Link>
            </div>
          </div>

          {/* Sticky Order Summary (Right Column) */}
          <div className="lg:col-span-4">
            <OrderSummary
              subtotal={subtotal}
              shippingFee={0}
              discount={0}
              shippingLabel="Calculated at checkout"
              showCheckoutBtn={true}
              isCartEmpty={isCartEmpty}
            />
          </div>
        </div>
      )}
    </div>
  );
};
