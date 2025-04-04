
import React, { useState } from 'react';
import { Plus, Check, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';

interface ProductCardProps {
  product: any;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, cartItems } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [isAddingEmergency, setIsAddingEmergency] = useState(false);
  const [showEmergencyDialog, setShowEmergencyDialog] = useState(false);
  
  const isInCart = cartItems.some(item => item.id === product.id);
  
  const isEmergencyInCart = cartItems.some(
    item => item.id === product.id + '-emergency' || 
            (item.id === product.id && item.isEmergency)
  );
  
  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product);
    
    setTimeout(() => {
      setIsAdding(false);
    }, 1000);
  };

  const handleAddAsEmergency = () => {
    setIsAddingEmergency(true);
    addToCart({
      ...product,
      deliveryTime: '15-30 min',
      isEmergency: true
    });
    
    setShowEmergencyDialog(false);
    
    setTimeout(() => {
      setIsAddingEmergency(false);
    }, 1000);
  };
  
  return (
    <>
      <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
        <div className="p-3 aspect-square relative">
          <div className="absolute top-2 left-2 z-10">
            {product.deliveryTime && (
              <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                {product.deliveryTime}
              </span>
            )}
          </div>
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-contain" 
          />
        </div>
        <CardContent className="p-3 pt-2">
          <h3 className="font-medium text-sm line-clamp-2 mb-1">{product.name}</h3>
          <p className="text-xs text-gray-500 mb-2">{product.quantity}</p>
          <div className="flex justify-between items-center">
            <p className="font-bold">₹{product.price}</p>
            <div className="flex items-center gap-1">
              <Button
                size="sm"
                onClick={() => setShowEmergencyDialog(true)}
                variant="outline"
                className={`rounded-full h-8 w-8 p-0 ${
                  isEmergencyInCart 
                    ? "border-red-700 text-red-700 bg-red-50" 
                    : "border-red-500 text-red-500 hover:bg-red-50"
                }`}
              >
                <Clock className="h-4 w-4" />
              </Button>
              <Button 
                size="sm"
                onClick={handleAddToCart}
                variant={isInCart || isAdding ? "default" : "outline"}
                className={`rounded-full h-8 px-3 ${
                  isInCart || isAdding 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'border-green-600 text-green-600 hover:bg-green-50'
                }`}
              >
                {isAdding ? (
                  <Check className="h-4 w-4" />
                ) : isInCart ? (
                  "Added"
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-1" />
                    Add
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showEmergencyDialog} onOpenChange={setShowEmergencyDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Emergency Delivery</DialogTitle>
            <DialogDescription>
              Get this item delivered within 15-30 minutes
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-700 mb-4">
              Add <span className="font-semibold">{product.name}</span> as an emergency item? 
              This will prioritize delivery within 15-30 minutes.
            </p>
            <div className="p-3 bg-red-50 rounded-lg flex items-center gap-3 mb-4">
              <Clock className="h-5 w-5 text-red-500" />
              <p className="text-sm">Express delivery with higher priority</p>
            </div>
          </div>
          <DialogFooter className="flex gap-2 sm:justify-between">
            <Button variant="outline" onClick={() => setShowEmergencyDialog(false)}>
              Cancel
            </Button>
            <Button 
              className={`${isEmergencyInCart || isAddingEmergency ? 'bg-red-700 hover:bg-red-800' : 'bg-red-500 hover:bg-red-600'}`} 
              onClick={handleAddAsEmergency}
              disabled={isAddingEmergency}
            >
              {isAddingEmergency ? (
                <Check className="h-4 w-4" />
              ) : isEmergencyInCart ? (
                "Already Added"
              ) : (
                "Add as Emergency"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductCard;
