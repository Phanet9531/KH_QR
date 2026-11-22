import React from 'react';
import { ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const OrderSummary = ({
  subtotal = 0,
  shippingFee = 0,
  discount = 0,
  showCheckoutBtn = false,
  isCartEmpty = false,
  shippingLabel = 'Calculated at checkout',
}) => {
  const navigate = useNavigate();
  const grandTotal = Math.max(0, subtotal + shippingFee - discount);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sticky top-24">
      <h3 className="text-lg font-bold text-slate-900 pb-4 border-b border-slate-100">
        Order Summary
      </h3>

      <div className="mt-4 space-y-3.5 text-sm">
        {/* Subtotal */}
        <div className="flex items-center justify-between text-slate-600">
          <span>Subtotal</span>
          <span className="font-semibold text-slate-900">
            ${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>

        {/* Delivery / Shipping */}
        <div className="flex items-center justify-between text-slate-600">
          <span>Delivery</span>
          <span className="font-semibold text-slate-900">
            {shippingFee === 0
              ? shippingLabel
              : `$${shippingFee.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          </span>
        </div>

        {/* Discount */}
        <div className="flex items-center justify-between text-slate-600">
          <span className="flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-emerald-600" />
            Discount
          </span>
          <span className="font-semibold text-emerald-600">
            -${discount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>

        {/* Divider */}
        <div className="pt-3 border-t border-slate-200/80">
          <div className="flex items-center justify-between">
            <span className="text-base font-bold text-slate-900">Grand Total</span>
            <div className="text-right">
              <span className="text-2xl font-black text-indigo-600">
                ${grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <span className="block text-[11px] text-slate-400">Including all taxes</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Button for Cart page */}
      {showCheckoutBtn && (
        <div className="mt-6">
          <button
            onClick={() => navigate('/checkout')}
            disabled={isCartEmpty}
            className={`w-full py-3.5 px-6 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-md ${
              isCartEmpty
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200 hover:shadow-lg active:scale-[0.99]'
            }`}
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Trust Badges */}
      <div className="mt-6 pt-5 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
        <span>Guaranteed safe & secure checkout process</span>
      </div>
    </div>
  );
};
