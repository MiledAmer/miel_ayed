'use client';

import Image from 'next/image';
import { type Product } from '@/lib/products';
import { type Language, t } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/lib/store';

interface ProductGridProps {
  products: Product[];
  language: Language;
}

export function ProductGrid({ products, language }: ProductGridProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: 1,
      image: product.image,
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition duration-300 animate-slide-in flex flex-col"
        >
          <div className="relative w-full h-48 bg-secondary">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="p-4 space-y-3 flex-1 flex flex-col">
            <h3 className="font-bold text-lg text-card-foreground truncate">
              {product.title}
            </h3>

            <p className="text-sm text-muted-foreground line-clamp-2">
              {product.description}
            </p>

            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-primary">
                {product.price.toFixed(2)} TND
              </span>
            </div>

            <Button
              onClick={() => handleAddToCart(product)}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mt-auto"
            >
              {t(language, 'products.addToCart')}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
