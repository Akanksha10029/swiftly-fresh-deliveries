
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/context/CartContext';
import { ProductCardImage } from './ProductCardImage';
import { ProductCardDetails } from './ProductCardDetails';
import { ProductCardActions } from './ProductCardActions';
import { EmergencyDialog } from './EmergencyDialog';
import { QuickViewDialog } from './QuickViewDialog';
import { ProductCardSkeleton } from './ProductCardSkeleton';

interface ProductCardProps {
  product: any;
  isLoading?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, isLoading = false }) => {
  // If loading, return the skeleton component
  if (isLoading) {
    return <ProductCardSkeleton />;
  }
  
  const { addToCart, cartItems } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [isAddingEmergency, setIsAddingEmergency] = useState(false);
  const [showEmergencyDialog, setShowEmergencyDialog] = useState(false);
  const [showQuickViewDialog, setShowQuickViewDialog] = useState(false);
  
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
      <Card className="h-full overflow-hidden hover:shadow-md transition-shadow group">
        <ProductCardImage 
          product={product} 
          onViewDetails={() => setShowQuickViewDialog(true)} 
        />
        <CardContent className="p-3 pt-2">
          <ProductCardDetails product={product} />
          <ProductCardActions 
            product={product}
            isInCart={isInCart}
            isEmergencyInCart={isEmergencyInCart}
            isAdding={isAdding}
            handleAddToCart={handleAddToCart}
            onEmergencyClick={() => setShowEmergencyDialog(true)}
          />
        </CardContent>
      </Card>

      <EmergencyDialog 
        product={product}
        open={showEmergencyDialog}
        onOpenChange={setShowEmergencyDialog}
        isEmergencyInCart={isEmergencyInCart}
        isAddingEmergency={isAddingEmergency}
        onAddAsEmergency={handleAddAsEmergency}
      />

      <QuickViewDialog 
        product={product}
        open={showQuickViewDialog}
        onOpenChange={setShowQuickViewDialog}
        isInCart={isInCart}
        onAddToCart={handleAddToCart}
        onEmergencyClick={() => {
          setShowQuickViewDialog(false);
          setShowEmergencyDialog(true);
        }}
      />
    </>
  );
};
