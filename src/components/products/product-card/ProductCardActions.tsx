
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Check, Clock, Heart } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface ProductCardActionsProps {
  product: any;
  isInCart: boolean;
  isEmergencyInCart: boolean;
  isAdding: boolean;
  isFavorite: boolean;
  handleAddToCart: () => void;
  onEmergencyClick: () => void;
  onToggleFavorite: () => void;
}

export const ProductCardActions: React.FC<ProductCardActionsProps> = ({
  product,
  isInCart,
  isEmergencyInCart,
  isAdding,
  isFavorite,
  handleAddToCart,
  onEmergencyClick,
  onToggleFavorite
}) => {
  return (
    <div className="flex justify-between items-center">
      <p className="font-bold">₹{product.price}</p>
      <div className="flex items-center gap-1">
        <Button
          size="sm"
          onClick={() => {
            onToggleFavorite();
            toast({
              title: isFavorite ? "Removed from wishlist" : "Added to wishlist",
              description: isFavorite ? `${product.name} has been removed from your wishlist` : `${product.name} has been added to your wishlist`,
              duration: 2000,
            });
          }}
          variant="outline"
          className={`rounded-full h-8 w-8 p-0 ${
            isFavorite 
              ? "border-red-500 text-red-500 bg-red-50 hover:bg-red-100" 
              : "border-gray-300 text-gray-500 hover:border-red-200 hover:text-red-400"
          }`}
        >
          <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500' : ''}`} />
        </Button>
        <Button
          size="sm"
          onClick={onEmergencyClick}
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
  );
};
