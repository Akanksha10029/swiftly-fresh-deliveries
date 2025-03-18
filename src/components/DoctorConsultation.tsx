
import React from 'react';
import { MessageCircle, Phone, Video, Clock, FileCheck, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DoctorConsultation = () => {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <h2 className="text-3xl font-bold mb-12 text-center">Online Doctor Consultation</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1: Consultation Options */}
          <div className="bg-blue-50 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold">Choose Consultation Type</h3>
            </div>
            <div className="space-y-4">
              <Button variant="outline" className="w-full justify-start gap-3">
                <MessageCircle className="h-5 w-5 text-blue-500" />
                Chat Consultation
              </Button>
              <Button variant="outline" className="w-full justify-start gap-3">
                <Phone className="h-5 w-5 text-blue-500" />
                Voice Call
              </Button>
              <Button variant="outline" className="w-full justify-start gap-3">
                <Video className="h-5 w-5 text-blue-500" />
                Video Call
              </Button>
            </div>
            <p className="mt-4 text-sm text-gray-600">
              <Clock className="h-4 w-4 inline mr-2" />
              Connect with a doctor in under 2 minutes
            </p>
          </div>

          {/* Step 2: Digital Prescription */}
          <div className="bg-green-50 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold">Digital Prescription</h3>
            </div>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-xl">
                <FileCheck className="h-6 w-6 text-green-500 mb-2" />
                <h4 className="font-medium mb-2">Receive Digital Prescription</h4>
                <p className="text-sm text-gray-600">
                  Get your prescription instantly after consultation
                </p>
              </div>
              <Button className="w-full bg-green-500 hover:bg-green-600">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add Medicines to Cart
              </Button>
            </div>
          </div>

          {/* Step 3: Delivery Options */}
          <div className="bg-purple-50 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold">Medicine Delivery</h3>
            </div>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-xl">
                <h4 className="font-medium text-purple-600 mb-2">Express Delivery</h4>
                <p className="text-sm text-gray-600">
                  Get medicines delivered within 30 minutes
                </p>
              </div>
              <div className="bg-white p-4 rounded-xl">
                <h4 className="font-medium text-purple-600 mb-2">Regular Delivery</h4>
                <p className="text-sm text-gray-600">
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
