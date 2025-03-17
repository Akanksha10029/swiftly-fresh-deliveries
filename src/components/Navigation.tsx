
import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { Package, Search, ShoppingCart, User, MapPin, Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ease-in-out py-4 px-6 md:px-10",
        isScrolled 
          ? "bg-white/80 backdrop-blur-lg shadow-sm" 
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Package className="h-8 w-8 text-primary mr-2" />
          <span className="text-xl font-bold tracking-tighter">SwiftFresh</span>
        </div>

        {!isMobile ? (
          <>
            <div className="hidden md:flex items-center space-x-1 relative px-3 py-2 bg-gray-100/80 rounded-full w-96">
              <Search className="h-4 w-4 text-gray-500" />
              <input 
                type="text" 
                placeholder="Search for items..." 
                className="bg-transparent border-0 outline-none ml-2 w-full text-sm" 
              />
            </div>
            
            <div className="flex items-center space-x-6">
              <button className="flex items-center text-sm font-medium hover:text-primary transition-colors">
                <MapPin className="h-4 w-4 mr-2" />
                <span>Set Location</span>
              </button>
              <button className="flex items-center text-sm font-medium hover:text-primary transition-colors">
                <User className="h-4 w-4 mr-2" />
                <span>Account</span>
              </button>
              <button className="flex items-center bg-primary text-white px-4 py-2 rounded-full font-medium hover:bg-primary/90 transition-colors">
                <ShoppingCart className="h-4 w-4 mr-2" />
                <span>Cart</span>
              </button>
            </div>
          </>
        ) : (
          <>
            <button 
              className="p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </>
        )}
      </div>

      {/* Mobile menu */}
      {isMobile && isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-xl p-6 animate-fade-in">
          <div className="flex items-center space-x-1 relative px-3 py-2 bg-gray-100 rounded-full mb-4">
            <Search className="h-4 w-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search for items..." 
              className="bg-transparent border-0 outline-none ml-2 w-full text-sm" 
            />
          </div>
          <nav className="flex flex-col space-y-4">
            <a href="#" className="flex items-center text-sm font-medium py-2">
              <MapPin className="h-4 w-4 mr-2" />
              <span>Set Location</span>
            </a>
            <a href="#" className="flex items-center text-sm font-medium py-2">
              <User className="h-4 w-4 mr-2" />
              <span>Account</span>
            </a>
            <a href="#" className="flex items-center text-sm font-medium py-2">
              <ShoppingCart className="h-4 w-4 mr-2" />
              <span>Cart</span>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navigation;
