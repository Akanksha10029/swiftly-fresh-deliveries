
import React from 'react';
import { MapPin, User, ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export const NavigationActions = () => {
  const { setIsCartOpen, totalItems, subtotal } = useCart();

  return (
    <div className="flex items-center space-x-4">
      <button className="flex items-center text-sm font-medium hover:text-primary transition-colors">
        <MapPin className="h-4 w-4 mr-2" />
        <span className="hidden lg:inline">Set Location</span>
      </button>
      <button className="flex items-center text-sm font-medium hover:text-primary transition-colors">
        <User className="h-4 w-4 mr-2" />
        <span className="hidden lg:inline">Account</span>
      </button>
      <button
        onClick={() => setIsCartOpen(true)}
        className="flex items-center bg-primary text-white px-4 py-2 rounded-full font-medium hover:bg-primary/90 transition-colors relative"
      >
        <ShoppingCart className="h-4 w-4 mr-2" />
        <span className="hidden lg:inline">Cart</span>
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </button>
    </div>
  );
};
