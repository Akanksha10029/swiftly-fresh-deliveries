
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
          <div className="bg-blue-50 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                1
              </div>
              <h3 className="text-lg sm:text-xl font-semibold">Choose Consultation Type</h3>
            </div>
            <div className="space-y-3 sm:space-y-4">
              <Button variant="outline" className="w-full justify-start gap-3 text-sm sm:text-base">
                <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
                Chat Consultation
              </Button>
              <Button variant="outline" className="w-full justify-start gap-3 text-sm sm:text-base">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
                Voice Call
              </Button>
              <Button variant="outline" className="w-full justify-start gap-3 text-sm sm:text-base">
                <Video className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
                Video Call
              </Button>
            </div>
            <p className="mt-4 text-xs sm:text-sm text-gray-600">
              <Clock className="h-3 w-3 sm:h-4 sm:w-4 inline mr-2" />
              Connect with a doctor in under 2 minutes
            </p>
          </div>

          {/* Step 2: Digital Prescription */}
          <div className="bg-green-50 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                2
              </div>
              <h3 className="text-lg sm:text-xl font-semibold">Digital Prescription</h3>
            </div>
            <div className="space-y-3 sm:space-y-4">
              <div className="bg-white p-3 sm:p-4 rounded-xl">
                <FileCheck className="h-5 w-5 sm:h-6 sm:w-6 text-green-500 mb-2" />
                <h4 className="font-medium mb-1 sm:mb-2 text-sm sm:text-base">Receive Digital Prescription</h4>
                <p className="text-xs sm:text-sm text-gray-600">
                  Get your prescription instantly after consultation
                </p>
              </div>
              <Button className="w-full bg-green-500 hover:bg-green-600 text-sm sm:text-base">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add Medicines to Cart
              </Button>
            </div>
          </div>

          {/* Step 3: Delivery Options */}
          <div className="bg-purple-50 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                3
              </div>
              <h3 className="text-lg sm:text-xl font-semibold">Medicine Delivery</h3>
            </div>
            <div className="space-y-3 sm:space-y-4">
              <div className="bg-white p-3 sm:p-4 rounded-xl">
                <h4 className="font-medium text-purple-600 mb-1 sm:mb-2 text-sm sm:text-base">Express Delivery</h4>
                <p className="text-xs sm:text-sm text-gray-600">
                  Get medicines delivered within 30 minutes
                </p>
              </div>
              <div className="bg-white p-3 sm:p-4 rounded-xl">
                <h4 className="font-medium text-purple-600 mb-1 sm:mb-2 text-sm sm:text-base">Regular Delivery</h4>
                <p className="text-xs sm:text-sm text-gray-600">
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
