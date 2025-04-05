
import React from 'react';
import { Button } from '@/components/ui/button';
import { Clock } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface QuickViewDialogProps {
  product: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isInCart: boolean;
  onAddToCart: () => void;
  onEmergencyClick: () => void;
}

export const QuickViewDialog: React.FC<QuickViewDialogProps> = ({
  product,
  open,
  onOpenChange,
  isInCart,
  onAddToCart,
  onEmergencyClick
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{product.name}</DialogTitle>
          <DialogDescription>
            Product details and information
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          <div className="flex items-center justify-center bg-gray-50 p-4 rounded-md">
            <img 
              src={product.image} 
              alt={product.name} 
              className="max-h-40 object-contain" 
            />
          </div>
          <div className="flex flex-col space-y-3">
            <div>
              <h4 className="text-sm font-medium text-gray-500">Product details</h4>
              <p className="text-sm">{product.quantity}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Price</h4>
              <p className="text-xl font-bold">₹{product.price}</p>
            </div>
            {product.deliveryTime && (
              <div>
                <h4 className="text-sm font-medium text-gray-500">Standard delivery</h4>
                <p className="text-sm">{product.deliveryTime}</p>
              </div>
            )}
            <div className="pt-2 flex space-x-2">
              <Button 
                onClick={onAddToCart}
                variant={isInCart ? "secondary" : "default"}
                className="flex-1"
              >
                {isInCart ? "Added to cart" : "Add to cart"}
              </Button>
              <Button 
                onClick={onEmergencyClick}
                variant="outline"
                className="text-red-500 border-red-500 hover:bg-red-50"
              >
                <Clock className="h-4 w-4 mr-1" />
                Emergency
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
