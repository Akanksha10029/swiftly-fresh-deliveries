
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Home, ShoppingBasket, Tag, Clipboard, MapPin, User, Heart } from 'lucide-react';

interface NavigationMobileMenuProps {
  isOpen: boolean;
}

export const NavigationMobileMenu = ({ isOpen }: NavigationMobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-xl p-4 sm:p-6 animate-fade-in max-h-[80vh] overflow-y-auto">
      <div className="flex items-center space-x-1 relative px-3 py-2 bg-gray-100 rounded-full mb-4">
        <Search className="h-4 w-4 text-gray-500" />
        <input 
          type="text" 
          placeholder="Search for items..." 
          className="bg-transparent border-0 outline-none ml-2 w-full text-sm" 
        />
      </div>
      <nav className="flex flex-col space-y-3">
        <Link to="/" className="flex items-center text-sm font-medium py-2">
          <Home className="h-4 w-4 mr-2" />
          <span>Home</span>
        </Link>
        <Link to="/products" className="flex items-center text-sm font-medium py-2">
          <ShoppingBasket className="h-4 w-4 mr-2" />
          <span>All Products</span>
        </Link>
        <Link to="/products/skincare-wellness" className="flex items-center text-sm font-medium py-2">
          <Tag className="h-4 w-4 mr-2" />
          <span>Skincare</span>
        </Link>
        <Link to="/orders" className="flex items-center text-sm font-medium py-2">
          <Clipboard className="h-4 w-4 mr-2" />
          <span>My Orders</span>
        </Link>
        <Link to="/wishlist" className="flex items-center text-sm font-medium py-2">
          <Heart className="h-4 w-4 mr-2" />
          <span>Wishlist</span>
        </Link>
        <Link to="#" className="flex items-center text-sm font-medium py-2">
          <MapPin className="h-4 w-4 mr-2" />
          <span>Set Location</span>
        </Link>
        <Link to="/auth/signin" className="flex items-center text-sm font-medium py-2">
          <User className="h-4 w-4 mr-2" />
          <span>Account</span>
        </Link>
      </nav>
    </div>
  );
};
