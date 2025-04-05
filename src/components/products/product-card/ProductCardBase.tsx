
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/context/CartContext';
import { ProductCardImage } from './ProductCardImage';
import { ProductCardDetails } from './ProductCardDetails';
import { ProductCardActions } from './ProductCardActions';
import { EmergencyDialog } from './EmergencyDialog';
import { QuickViewDialog } from './QuickViewDialog';

interface ProductCardProps {
  product: any;
}

// Local storage key for favorites
const FAVORITES_STORAGE_KEY = 'pharmacy-favorites';

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, cartItems } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [isAddingEmergency, setIsAddingEmergency] = useState(false);
  const [showEmergencyDialog, setShowEmergencyDialog] = useState(false);
  const [showQuickViewDialog, setShowQuickViewDialog] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  
  const isInCart = cartItems.some(item => item.id === product.id);
  
  const isEmergencyInCart = cartItems.some(
    item => item.id === product.id + '-emergency' || 
            (item.id === product.id && item.isEmergency)
  );

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (storedFavorites) {
      const favorites = JSON.parse(storedFavorites);
      setIsFavorite(favorites.includes(product.id));
    }
  }, [product.id]);
  
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

  const handleToggleFavorite = () => {
    const newFavoriteState = !isFavorite;
    setIsFavorite(newFavoriteState);
    
    // Update localStorage
    const storedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
    let favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
    
    if (newFavoriteState) {
      // Add to favorites if not already there
      if (!favorites.includes(product.id)) {
        favorites.push(product.id);
      }
    } else {
      // Remove from favorites
      favorites = favorites.filter((id: string) => id !== product.id);
    }
    
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
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
            isFavorite={isFavorite}
            handleAddToCart={handleAddToCart}
            onEmergencyClick={() => setShowEmergencyDialog(true)}
            onToggleFavorite={handleToggleFavorite}
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
