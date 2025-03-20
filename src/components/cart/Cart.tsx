
import React from 'react';
import { useCart } from '@/context/CartContext';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { X, Minus, Plus, ShoppingBag, ArrowRight, Info } from 'lucide-react';

const Cart: React.FC = () => {
  const { 
    cartItems, 
    isCartOpen, 
    setIsCartOpen, 
    removeFromCart, 
    increaseQuantity, 
    decreaseQuantity,
    totalItems,
    subtotal
  } = useCart();

  const deliveryCharge = 25;
  const handlingCharge = 5;
  const grandTotal = subtotal + deliveryCharge + handlingCharge;

  return (
    <>
      {/* Cart icon with count */}
      {totalItems > 0 && (
        <Button 
          className="fixed right-6 bottom-24 z-50 px-4 py-2 bg-green-600 hover:bg-green-700"
          onClick={() => setIsCartOpen(true)}
        >
          <ShoppingBag className="mr-2 h-5 w-5" />
          <span>{totalItems} items</span>
          <span className="ml-2">₹{subtotal}</span>
        </Button>
      )}

      {/* Cart sheet */}
      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetContent className="sm:max-w-md w-full flex flex-col p-0">
          <SheetHeader className="p-4 border-b">
            <div className="flex justify-between items-center">
              <SheetTitle>My Cart</SheetTitle>
              <SheetClose>
                <X className="h-5 w-5" />
              </SheetClose>
            </div>
          </SheetHeader>

          {cartItems.length > 0 ? (
            <div className="flex flex-col h-full">
              <div className="flex-1 overflow-auto">
                {/* Delivery details */}
                <div className="p-4 bg-gray-50">
                  <div className="flex gap-3 items-start">
                    <div className="bg-gray-200 p-2 rounded-full">
                      <div className="w-8 h-8 flex items-center justify-center">
                        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                          <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-base">Delivery in {cartItems[0].deliveryTime || '9 minutes'}</h3>
                      <p className="text-gray-500 text-sm">Shipment of {totalItems} {totalItems === 1 ? 'item' : 'items'}</p>
                    </div>
                  </div>
                </div>

                {/* Cart items */}
                <div className="p-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="py-4 flex gap-3 border-b">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-16 h-16 object-contain rounded bg-gray-50"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-gray-500 text-sm">{item.productQuantity}</p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="font-bold">₹{item.price}</span>
                          <div className="flex items-center gap-2 border rounded-full overflow-hidden">
                            <button 
                              onClick={() => decreaseQuantity(item.id)}
                              className="p-1 h-8 w-8 flex items-center justify-center bg-green-600 text-white"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="px-2">{item.quantity}</span>
                            <button 
                              onClick={() => increaseQuantity(item.id)}
                              className="p-1 h-8 w-8 flex items-center justify-center bg-green-600 text-white"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bill details */}
                <div className="p-4 border-t">
                  <h3 className="text-lg font-bold mb-3">Bill details</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span>Items total</span>
                      </div>
                      <span>₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span>Delivery charge</span>
                        <Info className="h-4 w-4 text-gray-400" />
                      </div>
                      <span>₹{deliveryCharge}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span>Handling charge</span>
                        <Info className="h-4 w-4 text-gray-400" />
                      </div>
                      <span>₹{handlingCharge}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t font-bold">
                      <span>Grand total</span>
                      <span>₹{grandTotal}</span>
                    </div>
                  </div>
                </div>

                {/* Cancellation policy */}
                <div className="p-4 border-t">
                  <h3 className="font-bold mb-2">Cancellation Policy</h3>
                  <p className="text-sm text-gray-600">
                    Orders cannot be cancelled once packed for delivery. In case of unexpected delays, a refund will be provided, if applicable.
                  </p>
                </div>
              </div>

              {/* Checkout button */}
              <div className="p-4 border-t mt-auto">
                <Button className="w-full bg-green-600 hover:bg-green-700 flex items-center justify-between gap-2 h-12">
                  <div className="flex-1 text-left">
                    <span className="block text-base font-bold">₹{grandTotal}</span>
                    <span className="block text-xs">TOTAL</span>
                  </div>
                  <span className="flex items-center">
                    Login to Proceed
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </span>
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-xl font-bold mb-2">Your cart is empty</h3>
              <p className="text-gray-500 mb-6">Add items to get started</p>
              <SheetClose asChild>
                <Button>Continue Shopping</Button>
              </SheetClose>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Cart;
