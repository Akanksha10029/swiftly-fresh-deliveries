
import React from 'react';
import { Store, MapPin, Wrench, AirVent, Utensils, ChefHat } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SmartServices = () => {
  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Hyperlocal Marketplace */}
          <div className="bg-white p-8 rounded-2xl shadow-sm">
            <Store className="h-10 w-10 text-amber-500 mb-4" />
            <h3 className="text-xl font-semibold mb-4">Local Marketplace</h3>
            <p className="text-gray-600 mb-6">
              Discover local sellers, artisans, bakers, and florists in your neighborhood
            </p>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <MapPin className="h-4 w-4 mr-2" />
                Explore Nearby Stores
              </Button>
            </div>
          </div>

          {/* Home Services */}
          <div className="bg-white p-8 rounded-2xl shadow-sm">
            <Wrench className="h-10 w-10 text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-4">Home Services</h3>
            <p className="text-gray-600 mb-6">
              Book reliable professionals for all your home service needs
            </p>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <AirVent className="h-4 w-4 mr-2" />
                AC Repair
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Wrench className="h-4 w-4 mr-2" />
                Plumbing
              </Button>
            </div>
          </div>

          {/* Smart Meal Kits */}
          <div className="bg-white p-8 rounded-2xl shadow-sm">
            <Utensils className="h-10 w-10 text-green-500 mb-4" />
            <h3 className="text-xl font-semibold mb-4">Smart Meal Kits</h3>
            <p className="text-gray-600 mb-6">
              AI-powered recipe suggestions with instant ingredient ordering
            </p>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <ChefHat className="h-4 w-4 mr-2" />
                Explore Recipes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartServices;
