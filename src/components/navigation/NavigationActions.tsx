
import React from 'react';
import { MapPin, User, ShoppingCart } from 'lucide-react';

export const NavigationActions = () => {
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
      <button className="flex items-center bg-primary text-white px-4 py-2 rounded-full font-medium hover:bg-primary/90 transition-colors">
        <ShoppingCart className="h-4 w-4 mr-2" />
        <span className="hidden lg:inline">Cart</span>
      </button>
    </div>
  );
};
