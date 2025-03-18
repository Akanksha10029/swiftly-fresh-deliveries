
import React from 'react';
import { Siren, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const EmergencySection = () => {
  return (
    <div className="py-8 bg-gradient-to-r from-red-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="bg-white rounded-2xl p-8 border border-red-100">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <Siren className="h-8 w-8 text-red-500 animate-pulse" />
                <h2 className="text-2xl font-bold text-gray-900">Emergency & Midnight Essentials</h2>
              </div>
              <p className="text-gray-600 mb-6">
                Need something urgently? We deliver essential items 24/7 within 15-30 minutes.
              </p>
              <Button className="bg-red-500 hover:bg-red-600">
                <Siren className="h-4 w-4 mr-2" />
                Order Emergency Essentials
              </Button>
            </div>
            
            <div className="bg-red-50 p-6 rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="h-5 w-5 text-red-500" />
                <span className="font-semibold">Express Delivery</span>
              </div>
              <p className="text-sm text-gray-600">
                Guaranteed delivery within 15-30 minutes for urgent needs
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencySection;
