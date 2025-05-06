
import React from 'react';

interface OrderItemProps {
  id: string;
  product_name: string;
  quantity: number;
  price: number;
}

export const OrderItem: React.FC<OrderItemProps> = ({ 
  id, 
  product_name, 
  quantity, 
  price 
}) => {
  return (
    <div key={id} className="flex justify-between items-center py-2 border-b last:border-0">
      <div>
        <div className="font-medium">{product_name}</div>
        <div className="text-sm text-gray-500">Qty: {quantity} × ${price.toFixed(2)}</div>
      </div>
      <div className="font-medium">
        ${(quantity * price).toFixed(2)}
      </div>
    </div>
  );
};
