
import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { 
  Package, Search, ShoppingCart, User, MapPin, 
  Menu, X, Home, Tag, Bell, Heart, MessageCircle, 
  ShoppingBasket, Pill, Wrench, Siren, Clipboard 
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAssistant, setShowAssistant] = useState(false);
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
          ? "bg-white/90 backdrop-blur-lg shadow-sm" 
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
            <NavigationMenu className="hidden lg:flex">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink href="#" className="px-4 py-2 text-sm font-medium hover:text-primary transition-colors">
                    <Home className="h-4 w-4 mr-2 inline-block" />
                    Home
                  </NavigationMenuLink>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium">Categories</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid grid-cols-2 gap-3 p-4 w-[400px]">
                      <NavigationMenuLink href="#" className="flex items-center p-3 hover:bg-gray-100 rounded-lg">
                        <ShoppingBasket className="h-5 w-5 text-primary mr-2" />
                        <div>
                          <div className="font-medium">Groceries</div>
                          <p className="text-xs text-gray-500">Fresh produce & essentials</p>
                        </div>
                      </NavigationMenuLink>
                      <NavigationMenuLink href="#" className="flex items-center p-3 hover:bg-gray-100 rounded-lg">
                        <Pill className="h-5 w-5 text-cyan-500 mr-2" />
                        <div>
                          <div className="font-medium">Pharmacy</div>
                          <p className="text-xs text-gray-500">Medicines & healthcare</p>
                        </div>
                      </NavigationMenuLink>
                      <NavigationMenuLink href="#" className="flex items-center p-3 hover:bg-gray-100 rounded-lg">
                        <Wrench className="h-5 w-5 text-amber-500 mr-2" />
                        <div>
                          <div className="font-medium">Home Services</div>
                          <p className="text-xs text-gray-500">Cleaning & maintenance</p>
                        </div>
                      </NavigationMenuLink>
                      <NavigationMenuLink href="#" className="flex items-center p-3 hover:bg-gray-100 rounded-lg">
                        <Siren className="h-5 w-5 text-red-500 mr-2" />
                        <div>
                          <div className="font-medium">Emergency Needs</div>
                          <p className="text-xs text-gray-500">24/7 urgent supplies</p>
                        </div>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuLink href="#" className="px-4 py-2 text-sm font-medium hover:text-primary transition-colors">
                    <Tag className="h-4 w-4 mr-2 inline-block" />
                    Offers
                  </NavigationMenuLink>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuLink href="#" className="px-4 py-2 text-sm font-medium hover:text-primary transition-colors">
                    <Clipboard className="h-4 w-4 mr-2 inline-block" />
                    My Orders
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            
            <div className="hidden md:flex items-center space-x-1 relative px-3 py-2 bg-gray-100/80 rounded-full w-96">
              <Search className="h-4 w-4 text-gray-500" />
              <input 
                type="text" 
                placeholder="Search for items..." 
                className="bg-transparent border-0 outline-none ml-2 w-full text-sm" 
              />
            </div>
            
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
          </>
        ) : (
          <>
            <Button 
              variant="outline"
              size="icon"
              className="p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
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
              <Home className="h-4 w-4 mr-2" />
              <span>Home</span>
            </a>
            <a href="#" className="flex items-center text-sm font-medium py-2">
              <ShoppingBasket className="h-4 w-4 mr-2" />
              <span>Categories</span>
            </a>
            <a href="#" className="flex items-center text-sm font-medium py-2">
              <Tag className="h-4 w-4 mr-2" />
              <span>Offers</span>
            </a>
            <a href="#" className="flex items-center text-sm font-medium py-2">
              <Clipboard className="h-4 w-4 mr-2" />
              <span>My Orders</span>
            </a>
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

      {/* Emergency Button - Always visible */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
        {showAssistant && (
          <div className="bg-white p-4 rounded-xl shadow-lg mb-2 animate-scale-in">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium">AI Shopping Assistant</h4>
              <button onClick={() => setShowAssistant(false)}>
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-3">Hi there! How can I help with your shopping today?</p>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="text-xs">
                Reorder Previous Items
              </Button>
              <Button size="sm" variant="outline" className="text-xs">
                Track My Order
              </Button>
            </div>
          </div>
        )}
        
        <Button 
          className="rounded-full shadow-lg bg-red-500 hover:bg-red-600"
          onClick={() => setShowAssistant(!showAssistant)}
        >
          {showAssistant ? (
            <X className="h-5 w-5" />
          ) : (
            <MessageCircle className="h-5 w-5" />
          )}
        </Button>
        
        <Button className="rounded-full shadow-lg bg-red-500 hover:bg-red-600">
          <Siren className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

export default Navigation;
