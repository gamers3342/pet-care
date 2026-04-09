import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from 'lucide-react';
import { createPaidOrder } from '../services/orderService';

const CartPage: React.FC = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart, getTotalItems, getTotalPrice } = useCart();
  const [processingRazorpay, setProcessingRazorpay] = useState(false);
  const [processingDemo, setProcessingDemo] = useState(false);

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (typeof window !== 'undefined' && (window as any).Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleDemoCheckout = async () => {
    if (cartItems.length === 0) return;
    setProcessingDemo(true);
    try {
      await createPaidOrder(
        cartItems.map(i => ({ id: i.id, name: i.name, price: i.price, quantity: i.quantity })),
        getTotalPrice()
      );
      alert('Order placed successfully! (Demo Mode)\nThank you for your purchase!');
      clearCart();
    } catch (err) {
      console.error('Demo checkout error:', err);
      alert('Failed to place order. Please try again.');
    } finally {
      setProcessingDemo(false);
    }
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;
    setProcessingRazorpay(true);
    try {
      const ok = await loadRazorpayScript();
      
      if (!ok) {
        alert('Payment SDK failed to load. Placing order in demo mode...');
        await handleDemoCheckout();
        return;
      }

      const keyId = (import.meta as any).env?.VITE_RAZORPAY_KEY_ID || 'rzp_test_1DP5mmOlF5G5ag';
      const amountInPaise = Math.max(100, Math.round(getTotalPrice() * 100));

      const options: any = {
        key: keyId,
        amount: amountInPaise,
        currency: 'INR',
        name: 'Pets & Care Hub',
        description: 'Cart Checkout',
        prefill: {
          name: 'Pet Lover',
          email: 'demo@petscarehub.com',
          contact: '9876543210',
        },
        theme: { color: '#10b981' },
        modal: {
          confirm_close: true,
        }
      };

      const rzp = new (window as any).Razorpay(options);
      
      rzp.on('payment.success', async function (response: any) {
        try {
          await createPaidOrder(
            cartItems.map(i => ({ id: i.id, name: i.name, price: i.price, quantity: i.quantity })),
            getTotalPrice()
          );
          alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}\nThank you for your purchase!`);
          clearCart();
        } catch (err) {
          console.error('Order save error:', err);
          alert('Payment received but order save failed. Please contact support.');
        }
      });

      rzp.on('payment.failed', function (response: any) {
        console.error('Payment failed:', response.error);
        alert(`Payment failed: ${response.error.description}\n\nTry the Demo Checkout instead.`);
      });
      
      rzp.open();
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Payment failed. Please try again or use Demo Checkout.');
    } finally {
      setProcessingRazorpay(false);
    }
  };

  const hasItems = cartItems.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-mint-25 to-peach-25 pt-20">
      <div className="container mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <Link to="/shop" className="flex items-center space-x-2 text-mint-600 hover:text-mint-700 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Continue Shopping</span>
          </Link>

          {hasItems && (
            <button onClick={clearCart} className="text-red-600 hover:text-red-700 font-medium">Clear Cart</button>
          )}
        </div>

        <h1 className="text-4xl font-bold text-gray-800 mb-6 font-poppins">Your Cart</h1>

        {!hasItems ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow">
            <ShoppingBag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Your cart is empty.</p>
            <Link to="/shop" className="inline-block mt-6 px-6 py-3 bg-gradient-to-r from-mint-400 to-peach-400 text-white rounded-xl">Go to Shop</Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center gap-4 bg-white rounded-2xl p-4 shadow border border-mint-100">
                  <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-xl" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.category} • {item.petType}</p>
                    <div className="mt-2 font-bold">₹{item.price}</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200"> 
                      <Minus className="w-4 h-4 mx-auto" />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200"> 
                      <Plus className="w-4 h-4 mx-auto" />
                    </button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-red-600 hover:text-red-700">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl p-6 shadow border border-mint-100 h-fit">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="flex justify-between text-gray-700 mb-2">
                <span>Items</span>
                <span>{getTotalItems()}</span>
              </div>
              <div className="flex justify-between text-gray-700 mb-4">
                <span>Total</span>
                <span className="font-bold">₹{getTotalPrice()}</span>
              </div>
              <button onClick={handleDemoCheckout} disabled={processingDemo || cartItems.length === 0} className="w-full py-3 bg-gradient-to-r from-mint-400 to-peach-400 text-white rounded-xl disabled:opacity-60 mb-3">
                {processingDemo ? 'Processing…' : 'Checkout (Demo Mode)'}
              </button>
              <button onClick={handleCheckout} disabled={processingRazorpay || cartItems.length === 0} className="w-full py-3 bg-gray-500 text-white rounded-xl disabled:opacity-60 text-sm">
                {processingRazorpay ? 'Processing…' : 'Pay with Razorpay'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
