import React, { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Truck, ShieldCheck, CreditCard } from 'lucide-react';
import { useShop } from '../context/ShopContext';

const SHIPPING_OPTIONS = [
  {
    id: 'free',
    name: 'Free Shipping',
    price: 0,
    estimate: '7-20 business days',
    description: 'Standard delivery via national postal service'
  },
  {
    id: 'express',
    name: 'Express Shipping',
    price: 9,
    estimate: '1-3 business days',
    description: 'Priority courier with real-time tracking'
  }
];

export const CheckoutPage = () => {
  const { cart, subtotal, placeOrder } = useShop();
  const navigate = useNavigate();

  // If cart is empty, redirect to cart page
  if (cart.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  // Shipping Method selection state
  const [shippingMethod, setShippingMethod] = useState(SHIPPING_OPTIONS[0]);

  // Customer form fields state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  });

  // Validation error state
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Real-time validation helper
  const validate = (values) => {
    const errs = {};

    // First Name
    if (!values.firstName.trim()) {
      errs.firstName = 'First name is required';
    }

    // Last Name
    if (!values.lastName.trim()) {
      errs.lastName = 'Last name is required';
    }

    // Email
    if (!values.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      errs.email = 'Please enter a valid email address';
    }

    // Phone Number (must be numeric / valid telephone characters)
    if (!values.phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (!/^[0-9+\-\s()]{7,15}$/.test(values.phone.trim()) || !/\d/.test(values.phone)) {
      errs.phone = 'Phone number must be numeric (7 to 15 digits)';
    }

    // Address
    if (!values.address.trim()) {
      errs.address = 'Street address is required';
    }

    return errs;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear or update error on change if already touched
    if (touched[name]) {
      const fieldErrors = validate({ ...formData, [name]: value });
      setErrors((prev) => ({ ...prev, [name]: fieldErrors[name] }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const fieldErrors = validate(formData);
    setErrors((prev) => ({ ...prev, [name]: fieldErrors[name] }));
  };

  const grandTotal = subtotal + shippingMethod.price;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Mark all required fields as touched
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      address: true,
    });

    const validationErrors = validate(formData);
    setErrors(validationErrors);

    // If there are validation errors, block submission
    if (Object.keys(validationErrors).length > 0) {
      // Focus first erroneous field
      const firstErrorField = Object.keys(validationErrors)[0];
      const element = document.getElementsByName(firstErrorField)[0];
      if (element) element.focus();
      return;
    }

    // Process Order
    placeOrder({
      customer: formData,
      shippingMethod,
    });

    // Navigate to confirmation page
    navigate('/order-confirmation');
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
          <Link to="/" className="hover:text-indigo-600">Home</Link>
          <span>/</span>
          <Link to="/cart" className="hover:text-indigo-600">Cart</Link>
          <span>/</span>
          <span className="text-slate-800 font-semibold">Checkout</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Order Checkout
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form & Shipping */}
        <div className="lg:col-span-7 space-y-8">
          <form onSubmit={handleSubmit} noValidate className="space-y-8">
            {/* 1. Customer Information Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-sm space-y-5">
              <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
                <span className="w-7 h-7 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">1</span>
                <h2 className="text-lg font-bold text-slate-900">Customer Details</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* First Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    First Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    placeholder="e.g. John"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition focus:outline-none focus:ring-2 ${
                      touched.firstName && errors.firstName
                        ? 'border-rose-400 bg-rose-50/50 focus:ring-rose-200'
                        : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-100'
                    }`}
                  />
                  {touched.firstName && errors.firstName && (
                    <p className="mt-1 text-xs text-rose-600 font-medium">{errors.firstName}</p>
                  )}
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Last Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    placeholder="e.g. Doe"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition focus:outline-none focus:ring-2 ${
                      touched.lastName && errors.lastName
                        ? 'border-rose-400 bg-rose-50/50 focus:ring-rose-200'
                        : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-100'
                    }`}
                  />
                  {touched.lastName && errors.lastName && (
                    <p className="mt-1 text-xs text-rose-600 font-medium">{errors.lastName}</p>
                  )}
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    placeholder="john.doe@example.com"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition focus:outline-none focus:ring-2 ${
                      touched.email && errors.email
                        ? 'border-rose-400 bg-rose-50/50 focus:ring-rose-200'
                        : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-100'
                    }`}
                  />
                  {touched.email && errors.email && (
                    <p className="mt-1 text-xs text-rose-600 font-medium">{errors.email}</p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    placeholder="e.g. +1 (555) 234-5678"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition focus:outline-none focus:ring-2 ${
                      touched.phone && errors.phone
                        ? 'border-rose-400 bg-rose-50/50 focus:ring-rose-200'
                        : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-100'
                    }`}
                  />
                  {touched.phone && errors.phone && (
                    <p className="mt-1 text-xs text-rose-600 font-medium">{errors.phone}</p>
                  )}
                </div>

                {/* Street Address */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Street Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    placeholder="e.g. 123 Innovation Boulevard, Suite 400"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition focus:outline-none focus:ring-2 ${
                      touched.address && errors.address
                        ? 'border-rose-400 bg-rose-50/50 focus:ring-rose-200'
                        : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-100'
                    }`}
                  />
                  {touched.address && errors.address && (
                    <p className="mt-1 text-xs text-rose-600 font-medium">{errors.address}</p>
                  )}
                </div>

                {/* Optional Extras: City, State, Zip */}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    City <span className="text-slate-400 font-normal lowercase">(optional)</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="San Francisco"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                      State <span className="text-slate-400 font-normal lowercase">(opt)</span>
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="CA"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                      ZIP <span className="text-slate-400 font-normal lowercase">(opt)</span>
                    </label>
                    <input
                      type="text"
                      name="zip"
                      value={formData.zip}
                      onChange={handleInputChange}
                      placeholder="94107"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Shipping Method Selection */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-sm space-y-4">
              <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
                <span className="w-7 h-7 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">2</span>
                <h2 className="text-lg font-bold text-slate-900">Shipping Method</h2>
              </div>

              <div className="space-y-3">
                {SHIPPING_OPTIONS.map((option) => {
                  const isSelected = shippingMethod.id === option.id;
                  return (
                    <label
                      key={option.id}
                      className={`relative flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50/40 shadow-sm'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shippingMethod"
                          value={option.id}
                          checked={isSelected}
                          onChange={() => setShippingMethod(option)}
                          className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 text-sm">{option.name}</span>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
                              {option.estimate}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">{option.description}</p>
                        </div>
                      </div>
                      <span className="font-extrabold text-slate-900 text-base">
                        {option.price === 0 ? 'FREE' : `$${option.price.toFixed(2)}`}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Submit Button (Mobile view / Bottom) */}
            <div className="block lg:hidden">
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition active:scale-[0.99] flex items-center justify-center gap-2"
              >
                <span>Place Order (${grandTotal.toFixed(2)})</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Order Summary with Items Breakdown */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sticky top-24 space-y-6">
            <h3 className="text-lg font-bold text-slate-900 pb-3 border-b border-slate-100">
              Order Review ({cart.length} {cart.length === 1 ? 'item' : 'items'})
            </h3>

            {/* Compact Item List */}
            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-3 py-1">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-lg object-cover bg-slate-100 border border-slate-100 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="text-xs font-bold text-slate-800 truncate">{item.name}</h5>
                    <p className="text-[11px] text-slate-500">
                      Qty: {item.quantity} × ${item.price}
                    </p>
                  </div>
                  <span className="text-xs font-extrabold text-slate-900">
                    ${(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-3 pt-4 border-t border-slate-100 text-sm">
              <div className="flex items-center justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-900">${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex items-center justify-between text-slate-600">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-indigo-600" />
                  Shipping ({shippingMethod.name})
                </span>
                <span className="font-semibold text-slate-900">
                  {shippingMethod.price === 0 ? 'FREE' : `$${shippingMethod.price.toFixed(2)}`}
                </span>
              </div>

              <div className="pt-3 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="text-base font-bold text-slate-900">Grand Total</span>
                  <div className="text-right">
                    <span className="text-2xl font-black text-indigo-600">
                      ${grandTotal.toFixed(2)}
                    </span>
                    <span className="block text-[11px] text-slate-400">Guaranteed price</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Place Order Button (Desktop) */}
            <div className="hidden lg:block pt-2">
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full py-3.5 px-6 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-200 hover:shadow-lg transition active:scale-[0.99] flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>Place Order</span>
              </button>
            </div>

            <div className="pt-2 flex items-center justify-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>SSL 256-Bit Encrypted Payment</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
