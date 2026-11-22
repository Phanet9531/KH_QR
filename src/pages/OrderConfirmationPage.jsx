import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import { CheckCircle, PackageCheck, Calendar, User, Clock, ArrowRight, Printer } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const OrderConfirmationPage = () => {
  const { currentOrder } = useShop();

  // If there is no order, redirect to "/"
  if (!currentOrder) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-4">
      {/* Success Hero Header */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-10 shadow-sm text-center relative overflow-hidden">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm animate-bounce">
          <CheckCircle className="w-10 h-10" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Order Placed Successfully!
        </h1>
        <p className="mt-2 text-slate-500 text-sm max-w-md mx-auto">
          Thank you for your purchase. We have received your order and our fulfillment team is preparing it for dispatch.
        </p>

        {/* Order ID Pill */}
        <div className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-700 font-bold text-sm tracking-wide">
          <span>Order ID:</span>
          <span className="font-mono text-base">{currentOrder.orderId}</span>
        </div>
      </div>

      {/* Order Details & Summary Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pb-6 border-b border-slate-100 text-xs">
          <div>
            <span className="text-slate-400 block mb-1">Customer Name</span>
            <span className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-indigo-600" />
              {currentOrder.customerName}
            </span>
          </div>

          <div>
            <span className="text-slate-400 block mb-1">Order Date</span>
            <span className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-indigo-600" />
              {currentOrder.orderDate}
            </span>
          </div>

          <div>
            <span className="text-slate-400 block mb-1">Shipping Method</span>
            <span className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <PackageCheck className="w-3.5 h-3.5 text-indigo-600" />
              {currentOrder.shippingMethod}
            </span>
          </div>

          <div>
            <span className="text-slate-400 block mb-1">Order Status</span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
              <Clock className="w-3 h-3" />
              {currentOrder.status}
            </span>
          </div>
        </div>

        {/* Customer Address Breakdown */}
        {currentOrder.shippingAddress && (
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1">
            <span className="font-bold text-slate-700 uppercase tracking-wider block mb-1">Delivery Address</span>
            <p className="text-slate-800 font-medium">{currentOrder.shippingAddress.address}</p>
            {(currentOrder.shippingAddress.city || currentOrder.shippingAddress.state || currentOrder.shippingAddress.zip) && (
              <p className="text-slate-500">
                {[currentOrder.shippingAddress.city, currentOrder.shippingAddress.state, currentOrder.shippingAddress.zip]
                  .filter(Boolean)
                  .join(', ')}
              </p>
            )}
            <p className="text-slate-500 mt-1">Contact: {currentOrder.customerPhone} • {currentOrder.customerEmail}</p>
          </div>
        )}

        {/* Ordered Products Table */}
        <div className="space-y-3">
          <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">Ordered Products</h3>
          <div className="divide-y divide-slate-100 border border-slate-100 rounded-xl overflow-hidden">
            {currentOrder.items.map((item) => (
              <div key={item.id} className="p-4 flex items-center justify-between gap-4 bg-white hover:bg-slate-50/50 transition">
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-lg object-cover bg-slate-100 border border-slate-100 shrink-0"
                  />
                  <div>
                    <h5 className="font-bold text-slate-900 text-sm truncate">{item.name}</h5>
                    <p className="text-xs text-slate-500">
                      Quantity: <span className="font-semibold text-slate-800">{item.quantity}</span> × ${item.price}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-slate-900 text-sm">
                    ${(item.price * item.quantity).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Totals Summary */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2 text-sm">
          <div className="flex justify-between text-slate-600 text-xs">
            <span>Subtotal</span>
            <span className="font-semibold text-slate-800">
              ${currentOrder.subtotal.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between text-slate-600 text-xs">
            <span>Shipping Fee</span>
            <span className="font-semibold text-slate-800">
              {currentOrder.shippingFee === 0 ? 'FREE' : `$${currentOrder.shippingFee.toFixed(2)}`}
            </span>
          </div>
          <div className="pt-2 border-t border-slate-200 flex justify-between items-center">
            <span className="font-bold text-slate-900">Total Amount</span>
            <span className="text-xl font-black text-indigo-600">
              ${currentOrder.totalAmount.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={() => window.print()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-sm font-semibold transition"
          >
            <Printer className="w-4 h-4" />
            <span>Print Invoice</span>
          </button>

          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold shadow-md shadow-indigo-100 transition active:scale-95"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
