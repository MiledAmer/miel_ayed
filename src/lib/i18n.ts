export const translations = {
  en: {
    nav: {
      home: 'Home',
      shop: 'Shop',
      cart: 'Cart',
      checkout: 'Checkout',
      language: 'Language',
    },
    home: {
      title: 'Ayed Honey',
      subtitle: 'Premium organic honey from nature',
      shop: 'Shop Now',
      special: 'Special Offers',
    },
    products: {
      quantity: 'Quantity',
      addToCart: 'Add to Cart',
      price: 'TND {price}',
      description: 'Description',
    },
    cart: {
      title: 'Shopping Cart',
      empty: 'Your cart is empty',
      total: 'Total',
      checkout: 'Proceed to Checkout',
      remove: 'Remove',
      quantity: 'Qty',
      price: 'Price',
      subtotal: 'Subtotal',
      continue: 'Continue Shopping',
    },
    checkout: {
      title: 'Checkout',
      summary: 'Order Summary',
      items: 'Items',
      totalPrice: 'Total Price',
      thankYou: 'Thank you for your purchase!',
    },
  },
  fr: {
    nav: {
      home: 'Accueil',
      shop: 'Boutique',
      cart: 'Panier',
      checkout: 'Paiement',
      language: 'Langue',
    },
    home: {
      title: 'Miel Ayed',
      subtitle: 'Miel biologique premium de la nature',
      shop: 'Acheter Maintenant',
      special: 'Offres Spéciales',
    },
    products: {
      quantity: 'Quantité',
      addToCart: 'Ajouter au Panier',
      price: '{price} TND',
      description: 'Description',
    },
    cart: {
      title: 'Panier',
      empty: 'Votre panier est vide',
      total: 'Total',
      checkout: 'Procéder au Paiement',
      remove: 'Supprimer',
      quantity: 'Qté',
      price: 'Prix',
      subtotal: 'Sous-total',
      continue: 'Continuer vos achats',
    },
    checkout: {
      title: 'Paiement',
      summary: 'Résumé de la Commande',
      items: 'Articles',
      totalPrice: 'Prix Total',
      thankYou: 'Merci pour votre achat!',
    },
  },
  ar: {
    nav: {
      home: 'الصفحة الرئيسية',
      shop: 'المتجر',
      cart: 'السلة',
      checkout: 'الدفع',
      language: 'اللغة',
    },
    home: {
      title: 'العسل عياد',
      subtitle: 'عسل عضوي فاخر من الطبيعة',
      shop: 'تسوق الآن',
      special: 'عروض خاصة',
    },
    products: {
      quantity: 'الكمية',
      addToCart: 'أضف إلى السلة',
      price: '{price} دينار',
      description: 'الوصف',
    },
    cart: {
      title: 'السلة',
      empty: 'السلة فارغة',
      total: 'المجموع',
      checkout: 'متابعة الدفع',
      remove: 'إزالة',
      quantity: 'الكمية',
      price: 'السعر',
      subtotal: 'المجموع الجزئي',
      continue: 'متابعة التسوق',
    },
    checkout: {
      title: 'الدفع',
      summary: 'ملخص الطلب',
      items: 'المنتجات',
      totalPrice: 'السعر الإجمالي',
      thankYou: 'شكراً على شرائك!',
    },
  },
} as const;

export type Language = keyof typeof translations;

export function t(lang: Language, path: string) {
  const keys = path.split('.');
  let value: any = translations[lang];
  for (const key of keys) {
    value = value?.[key];
  }
  return value || path;
}
