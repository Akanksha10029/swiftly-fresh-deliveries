
import React from 'react';
import { Calendar, Home, Inbox, Search, Settings, ShoppingBasket, Pill, Wrench, Siren } from 'lucide-react';
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
  );
};
