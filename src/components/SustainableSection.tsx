
import React from 'react';
import { Leaf, Recycle, Droplet } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const SustainableSection = () => {
  return (
    <div className="py-16 bg-gradient-to-r from-emerald-50 to-teal-50">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Sustainable Shopping</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Make eco-friendly choices with every order. We're committed to reducing our environmental footprint.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-emerald-100 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
              <Leaf className="h-8 w-8 text-emerald-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Plastic-Free Packaging</h3>
            <p className="text-gray-600 mb-6">
              All our deliveries come in biodegradable packaging that's good for the environment.
            </p>
            <Button variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50">
              Choose Eco-Packaging
            </Button>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-emerald-100 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
              <Recycle className="h-8 w-8 text-emerald-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Refillable Grocery Options</h3>
            <p className="text-gray-600 mb-6">
              Send back empty containers and get refills at a discount. Save money and reduce waste.
            </p>
            <Button variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50">
              Explore Refillable Items
            </Button>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-emerald-100 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
              <Droplet className="h-8 w-8 text-emerald-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Reduced Carbon Footprint</h3>
            <p className="text-gray-600 mb-6">
              Choose carbon-neutral deliveries with our electric vehicle fleet, optimized for minimal emissions.
            </p>
            <Button variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50">
              Go Carbon Neutral
            </Button>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <Button variant="default" className="bg-emerald-600 hover:bg-emerald-700">
            Learn More About Our Sustainability Efforts
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SustainableSection;
