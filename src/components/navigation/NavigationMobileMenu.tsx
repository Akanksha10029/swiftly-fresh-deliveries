
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Home, ShoppingBasket, Tag, Clipboard, MapPin, User, Heart, ChevronRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface NavigationMobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NavigationMobileMenu = ({ isOpen, onClose }: NavigationMobileMenuProps) => {
  const { isAuthenticated, signOut } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const handleLinkClick = () => {
    onClose();
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onClose();
      // Navigate to search results would go here
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="absolute top-0 left-0 w-4/5 max-w-xs h-full bg-white shadow-lg overflow-y-auto animate-slide-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 space-y-4">
          <form onSubmit={handleSearch} className="flex items-center space-x-1 relative px-3 py-2 bg-gray-100 rounded-full">
            <Search className="h-4 w-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search for items..." 
              className="bg-transparent border-0 outline-none ml-2 w-full text-sm" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="sr-only">Search</button>
          </form>

          <div className="border-t border-gray-100 pt-2">
            <h3 className="text-xs font-semibold uppercase text-gray-500 mb-1 px-2">Navigation</h3>
            <nav className="flex flex-col">
              <Link to="/" className="flex items-center justify-between text-sm py-3 px-2 hover:bg-gray-50 rounded-md" onClick={handleLinkClick}>
                <div className="flex items-center">
                  <Home className="h-4 w-4 mr-3" />
                  <span>Home</span>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </Link>
              
              <Link to="/products" className="flex items-center justify-between text-sm py-3 px-2 hover:bg-gray-50 rounded-md" onClick={handleLinkClick}>
                <div className="flex items-center">
                  <ShoppingBasket className="h-4 w-4 mr-3" />
                  <span>All Products</span>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </Link>
              
              <Link to="/products/skincare-wellness" className="flex items-center justify-between text-sm py-3 px-2 hover:bg-gray-50 rounded-md" onClick={handleLinkClick}>
                <div className="flex items-center">
                  <Tag className="h-4 w-4 mr-3" />
                  <span>Skincare</span>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </Link>
            </nav>
          </div>
          
          <div className="border-t border-gray-100 pt-2">
            <h3 className="text-xs font-semibold uppercase text-gray-500 mb-1 px-2">My Account</h3>
            <nav className="flex flex-col">
              <Link to="/orders" className="flex items-center justify-between text-sm py-3 px-2 hover:bg-gray-50 rounded-md" onClick={handleLinkClick}>
                <div className="flex items-center">
                  <Clipboard className="h-4 w-4 mr-3" />
                  <span>My Orders</span>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </Link>
              
              <Link to="/wishlist" className="flex items-center justify-between text-sm py-3 px-2 hover:bg-gray-50 rounded-md" onClick={handleLinkClick}>
                <div className="flex items-center">
                  <Heart className="h-4 w-4 mr-3" />
                  <span>Wishlist</span>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </Link>
              
              <Link to="#" className="flex items-center justify-between text-sm py-3 px-2 hover:bg-gray-50 rounded-md" onClick={handleLinkClick}>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-3" />
                  <span>Set Location</span>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </Link>
              
              {isAuthenticated ? (
                <button 
                  className="flex items-center justify-between text-sm py-3 px-2 hover:bg-gray-50 rounded-md w-full text-left"
                  onClick={() => {
                    signOut();
                    handleLinkClick();
                  }}
                >
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-3" />
                    <span>Sign Out</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </button>
              ) : (
                <Link 
                  to="/auth/signin" 
                  className="flex items-center justify-between text-sm py-3 px-2 hover:bg-gray-50 rounded-md"
                  onClick={handleLinkClick}
                >
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-3" />
                    <span>Sign In</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </Link>
              )}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};
