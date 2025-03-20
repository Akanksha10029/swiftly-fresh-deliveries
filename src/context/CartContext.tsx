import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  productQuantity: string; // e.g., "500 ml", "1 kg"
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (product: any) => void;
  removeFromCart: (productId: string) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  totalItems: number;
  subtotal: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [subtotal, setSubtotal] = useState(0);

  // Calculate totals whenever cart changes
  useEffect(() => {
    const items = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    
    setTotalItems(items);
    setSubtotal(total);
  }, [cartItems]);

  const addToCart = (product: any) => {
    setCartItems(prevItems => {
      // Check if product is already in cart
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        // Increase quantity if already in cart
        const updatedItems = prevItems.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
        return updatedItems;
      } else {
        // Add new item to cart
        const newItem: CartItem = {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          image: product.image,
          productQuantity: product.quantity
        };
        
        toast({
          title: "Added to cart",
          description: `${product.name} has been added to your cart`,
        });
        
        return [...prevItems, newItem];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const increaseQuantity = (productId: string) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === productId 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      )
    );
  };

  const decreaseQuantity = (productId: string) => {
    setCartItems(prevItems => {
      // If quantity is 1, remove the item
      if (prevItems.find(item => item.id === productId)?.quantity === 1) {
        return prevItems.filter(item => item.id !== productId);
      }
      
      // Otherwise decrease quantity
      return prevItems.map(item => 
        item.id === productId 
          ? { ...item, quantity: item.quantity - 1 } 
          : item
      );
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider 
      value={{ 
        cartItems, 
        addToCart, 
        removeFromCart, 
        increaseQuantity, 
        decreaseQuantity, 
        clearCart,
        isCartOpen,
        setIsCartOpen,
        totalItems,
        subtotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
