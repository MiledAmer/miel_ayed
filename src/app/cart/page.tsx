'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/header';
import { CartItemCard } from '@/components/cart-item-card';
import { useCartStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { type Language } from '@/lib/i18n';
import { ArrowLeft, CheckCircle } from 'lucide-react';

export default function CartPage() {
  const [language, setLanguage] = useState<Language>('en');
  const [showSuccess, setShowSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);

  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('language') as Language | null;
    if (saved) setLanguage(saved);
  }, []);

  if (!mounted) return null;

  const handleCheckout = () => {
    setShowSuccess(true);
    clearCart();
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  return (
    <main className="min-h-screen bg-background">
      <Header language={language} />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {showSuccess && (
          <div className="mb-4 p-4 bg-green-100 border border-green-300 rounded-lg flex gap-3 items-center animate-slide-in">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <p className="text-green-800 font-medium">
              Order placed successfully! Thank you for your purchase.
            </p>
          </div>
        )}

        <div className="flex items-center gap-2 mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-primary hover:underline">
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold mb-6 text-foreground">Cart</h1>

            {items.length === 0 ? (
              <div className="text-center py-12 bg-card rounded-lg border border-border">
                <p className="text-muted-foreground text-lg mb-4">
                  Your cart is empty
                </p>
                <Link href="/">
                  <Button className="bg-primary hover:bg-primary/90">
                    Start Shopping
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {items.map((item) => (
                  <CartItemCard
                    key={item.id}
                    item={item}
                    onUpdateQuantity={(qty) => updateQuantity(item.id, qty)}
                    onRemove={() => removeItem(item.id)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Order Summary */}
          {items.length > 0 && (
            <div className="lg:col-span-1">
              <div className="bg-card rounded-lg border border-border p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-4 text-card-foreground">
                  Order Summary
                </h2>

                <div className="space-y-3 mb-4 pb-4 border-b border-border">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">
                      {getTotalPrice().toFixed(2)} TND
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium">Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="font-medium">Included</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-6 pb-4 border-b border-border">
                  <span className="font-bold text-lg">Total</span>
                  <span className="text-2xl font-bold text-primary">
                    {getTotalPrice().toFixed(2)} TND
                  </span>
                </div>

                <Button
                  onClick={handleCheckout}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-base py-6 font-bold animate-bounce-subtle"
                >
                  Proceed to Checkout
                </Button>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  Free shipping on all orders
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-secondary text-secondary-foreground py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm">
            © 2025 Golden Honey. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
