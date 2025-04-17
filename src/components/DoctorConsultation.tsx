
import React from 'react';
import { MessageCircle, Phone, Video, Clock, FileCheck, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DoctorConsultation = () => {
  return (
    <div className="py-10 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center">Online Doctor Consultation</h2>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {/* Step 1: Consultation Options */}
          <div className="bg-blue-50 rounded-2xl p-5 sm:p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                1
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-semibold">Choose Consultation</h3>
            </div>
            <div className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start gap-2 text-xs sm:text-sm py-2 h-auto flex-wrap" 
                size="sm"
              >
                <MessageCircle className="h-4 w-4 text-blue-500 flex-shrink-0" />
                <span className="truncate">Chat Consultation</span>
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start gap-2 text-xs sm:text-sm py-2 h-auto" 
                size="sm"
              >
                <Phone className="h-4 w-4 text-blue-500 flex-shrink-0" />
                <span className="truncate">Voice Call</span>
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start gap-2 text-xs sm:text-sm py-2 h-auto" 
                size="sm"
              >
                <Video className="h-4 w-4 text-blue-500 flex-shrink-0" />
                <span className="truncate">Video Call</span>
              </Button>
            </div>
            <p className="mt-3 text-xs text-gray-600 flex items-center">
              <Clock className="h-3 w-3 mr-1 flex-shrink-0" />
              <span className="truncate">Connect with a doctor in under 2 minutes</span>
            </p>
          </div>

          {/* Step 2: Digital Prescription */}
          <div className="bg-green-50 rounded-2xl p-5 sm:p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                2
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-semibold">Digital Prescription</h3>
            </div>
            <div className="space-y-3">
              <div className="bg-white p-3 rounded-xl">
                <FileCheck className="h-5 w-5 text-green-500 mb-1" />
                <h4 className="font-medium mb-1 text-xs sm:text-sm">Receive Digital Prescription</h4>
                <p className="text-xs text-gray-600">
                  Get your prescription instantly
                </p>
              </div>
              <Button 
                className="w-full bg-green-500 hover:bg-green-600 text-xs sm:text-sm py-2 h-auto flex items-center justify-center"
                size="sm"
              >
                <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 flex-shrink-0" />
                <span className="truncate">Add Medicines to Cart</span>
              </Button>
            </div>
          </div>

          {/* Step 3: Delivery Options */}
          <div className="bg-purple-50 rounded-2xl p-5 sm:p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                3
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-semibold">Medicine Delivery</h3>
            </div>
            <div className="space-y-3">
              <div className="bg-white p-3 rounded-xl">
                <h4 className="font-medium text-purple-600 mb-1 text-xs sm:text-sm">Express Delivery</h4>
                <p className="text-xs text-gray-600">
                  Get medicines delivered within 30 minutes
                </p>
              </div>
              <div className="bg-white p-3 rounded-xl">
                <h4 className="font-medium text-purple-600 mb-1 text-xs sm:text-sm">Regular Delivery</h4>
                <p className="text-xs text-gray-600">
                  Standard delivery within 2-3 hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorConsultation;
