
import React from 'react';
import { Siren, Clock, Truck, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { products } from '@/data/products';

const EmergencyProducts = () => {
  const { addToCart } = useCart();
  
  // Filter emergency products (for demo purposes, we'll filter products with "care" or "emergency" in their name)
  const emergencyProducts = products.filter(
    product => 
      product.name.toLowerCase().includes('emergency') || 
      product.category === 'baby-care' || 
      product.name.toLowerCase().includes('medical') ||
      product.name.toLowerCase().includes('first aid')
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to="/products/emergency">Emergency Essentials</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <div className="bg-red-50 p-6 rounded-2xl mb-8">
        <div className="flex flex-col md:flex-row items-center gap-6 justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Siren className="h-8 w-8 text-red-500" />
              <h1 className="text-2xl sm:text-3xl font-bold">Emergency & Midnight Essentials</h1>
            </div>
            <p className="text-gray-700 mb-4">
              Need something urgently? We prioritize your emergency needs with our 24/7 delivery service.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
              <div className="bg-white p-3 rounded-lg flex items-center gap-2">
                <Clock className="h-5 w-5 text-red-500" />
                <span className="text-sm">Delivery 24/7</span>
              </div>
              <div className="bg-white p-3 rounded-lg flex items-center gap-2">
                <Truck className="h-5 w-5 text-red-500" />
                <span className="text-sm">15-30 min delivery</span>
              </div>
              <div className="bg-white p-3 rounded-lg flex items-center gap-2">
                <Shield className="h-5 w-5 text-red-500" />
                <span className="text-sm">Priority handling</span>
              </div>
            </div>
          </div>
          <img 
            src="/placeholder.svg" 
            alt="Emergency Services" 
            className="rounded-xl w-full md:w-64 h-40 object-cover"
          />
        </div>
      </div>
      
      <h2 className="text-xl font-bold mb-4">Emergency Essentials</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {emergencyProducts.length > 0 ? (
          emergencyProducts.map(product => (
            <div key={product.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-40 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium mb-1 line-clamp-1">{product.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{product.quantity}</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold">${product.price.toFixed(2)}</span>
                  <Button 
                    size="sm" 
                    onClick={() => addToCart(product)}
                  >
                    Add
                  </Button>
                </div>
                <div className="mt-2">
                  <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                    Express Delivery
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <p>No emergency products found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmergencyProducts;
