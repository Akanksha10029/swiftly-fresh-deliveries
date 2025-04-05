
import React from 'react';
import { Calendar, Home, Inbox, Search, Settings, ShoppingBasket, Sparkles, Wrench, Siren, Tag as TagIcon, Clipboard as ClipboardIcon, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export const NavigationDesktopMenu = () => {
  return (
    <NavigationMenu className="hidden lg:flex">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link to="/" className="px-4 py-2 text-sm font-medium hover:text-primary transition-colors flex items-center">
              <Home className="h-4 w-4 mr-2" />
              Home
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-sm font-medium">Categories</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid grid-cols-2 gap-3 p-4 w-[400px]">
              <Link to="/products/fruits-vegetables" className="flex items-center p-3 hover:bg-gray-100 rounded-lg">
                <ShoppingBasket className="h-5 w-5 text-primary mr-2" />
                <div>
                  <div className="font-medium">Groceries</div>
                  <p className="text-xs text-gray-500">Fresh produce & essentials</p>
                </div>
              </Link>
              <Link to="/products/skincare-wellness" className="flex items-center p-3 hover:bg-gray-100 rounded-lg">
                <Sparkles className="h-5 w-5 text-teal-500 mr-2" />
                <div>
                  <div className="font-medium">Skincare</div>
                  <p className="text-xs text-gray-500">Beauty & personal care</p>
                </div>
              </Link>
              <Link to="/products/cleaning-essentials" className="flex items-center p-3 hover:bg-gray-100 rounded-lg">
                <Wrench className="h-5 w-5 text-amber-500 mr-2" />
                <div>
                  <div className="font-medium">Home Services</div>
                  <p className="text-xs text-gray-500">Cleaning & maintenance</p>
                </div>
              </Link>
              <Link to="/products/baby-care" className="flex items-center p-3 hover:bg-gray-100 rounded-lg">
                <Siren className="h-5 w-5 text-red-500 mr-2" />
                <div>
                  <div className="font-medium">Emergency Needs</div>
                  <p className="text-xs text-gray-500">24/7 urgent supplies</p>
                </div>
              </Link>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link to="/products" className="px-4 py-2 text-sm font-medium hover:text-primary transition-colors flex items-center">
              <TagIcon className="h-4 w-4 mr-2" />
              All Products
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link to="/orders" className="px-4 py-2 text-sm font-medium hover:text-primary transition-colors flex items-center">
              <ClipboardIcon className="h-4 w-4 mr-2" />
              My Orders
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link to="/wishlist" className="px-4 py-2 text-sm font-medium hover:text-primary transition-colors flex items-center">
              <Heart className="h-4 w-4 mr-2" />
              Wishlist
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
