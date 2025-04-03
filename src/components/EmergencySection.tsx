
import React from 'react';
import { Siren, Clock, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';

const EmergencySection = () => {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  
  // Check if there are any emergency items in the cart
  const hasEmergencyItems = cartItems.some(item => item.isEmergency);
  const emergencyItemsCount = cartItems.filter(item => item.isEmergency).length;
  
  return (
    <div className="py-8 bg-gradient-to-r from-red-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="bg-white rounded-2xl p-8 border border-red-100 shadow-sm">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <Siren className="h-8 w-8 text-red-500 animate-pulse" />
                <h2 className="text-2xl font-bold text-gray-900">Emergency & Midnight Essentials</h2>
              </div>
              <p className="text-gray-600 mb-6">
                Need something urgently? We deliver essential items 24/7 within 15-30 minutes. Our dedicated team will prioritize your emergency needs.
              </p>
              <div className="flex flex-wrap gap-3 mb-6">
                <div className="bg-red-50 px-4 py-2 rounded-lg flex items-center gap-2">
                  <Clock className="h-5 w-5 text-red-500" />
                  <span className="text-sm font-medium">15-30 min delivery</span>
                </div>
                <div className="bg-red-50 px-4 py-2 rounded-lg flex items-center gap-2">
                  <Siren className="h-5 w-5 text-red-500" />
                  <span className="text-sm font-medium">24/7 service</span>
                </div>
                <div className="bg-red-50 px-4 py-2 rounded-lg flex items-center gap-2">
                  <ShieldAlert className="h-5 w-5 text-red-500" />
                  <span className="text-sm font-medium">Priority handling</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button 
                  className="bg-red-500 hover:bg-red-600 text-white"
                  onClick={() => navigate('/products/emergency')}
                >
                  <Siren className="h-4 w-4 mr-2" />
                  Browse Emergency Products
                </Button>
                {hasEmergencyItems && (
                  <Button
                    variant="outline"
                    className="border-red-500 text-red-500 hover:bg-red-50"
                  >
                    <Clock className="h-4 w-4 mr-2" />
                    {emergencyItemsCount} Emergency {emergencyItemsCount === 1 ? 'Item' : 'Items'} in Cart
                  </Button>
                )}
              </div>
            </div>
            
            <div className="bg-red-50 p-6 rounded-xl w-full md:w-auto">
              <h3 className="font-semibold mb-3 text-center">Available Emergency Items</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  Medical & First Aid Supplies
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  Baby Care Essentials
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  Midnight Snacks & Beverages
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  Personal Care Items
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencySection;
