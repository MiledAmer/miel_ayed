'use client';

import Image from 'next/image';
import { type CartItem } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

interface CartItemCardProps {
  item: CartItem;
  onUpdateQuantity: (quantity: number) => void;
  onRemove: () => void;
}

export function CartItemCard({
  item,
  onUpdateQuantity,
  onRemove,
}: CartItemCardProps) {
  return (
    <div className="flex gap-4 p-4 bg-card rounded-lg border border-border">
      <div className="relative w-24 h-24 flex-shrink-0 bg-secondary rounded-lg overflow-hidden">
        <Image
          src={item.image || "/placeholder.svg"}
          alt={item.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-lg text-card-foreground">{item.title}</h3>
          <p className="text-sm text-muted-foreground">
            {item.price.toFixed(2)} TND each
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 border border-border rounded-lg p-1">
            <button
              onClick={() => onUpdateQuantity(Math.max(1, item.quantity - 1))}
              className="w-6 h-6 flex items-center justify-center hover:bg-secondary rounded transition text-sm"
            >
              −
            </button>
            <span className="w-6 text-center text-sm font-medium">
              {item.quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(item.quantity + 1)}
              className="w-6 h-6 flex items-center justify-center hover:bg-secondary rounded transition text-sm"
            >
              +
            </button>
          </div>

          <div className="text-right">
            <p className="font-bold text-primary">
              {(item.price * item.quantity).toFixed(2)} TND
            </p>
          </div>

          <Button
            onClick={onRemove}
            variant="ghost"
            size="sm"
            className="text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
