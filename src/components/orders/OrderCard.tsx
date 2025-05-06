
import React from 'react';
import { RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { OrderItem } from './OrderItem';
import { OrderStatusBadge } from './OrderStatusBadge';

interface OrderItem {
  id: string;
  product_id: string;
  product_name: string;
  price: number;
  quantity: number;
}

interface OrderCardProps {
  order: {
    id: string;
    status: string;
    total: number;
    shipping_address: string;
    created_at: string;
    updated_at: string;
    items: OrderItem[];
  };
  onReorder: (items: OrderItem[]) => void;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order, onReorder }) => {
  return (
    <div className="mb-6 border rounded-lg overflow-hidden">
      <div className="bg-gray-50 p-4 border-b">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-sm text-gray-500">Order #{order.id.slice(0, 8)}</div>
            <div className="text-sm text-gray-500">
              {new Date(order.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </div>
          <OrderStatusBadge status={order.status} />
        </div>
      </div>
      
      <div className="p-4">
        <div className="space-y-3">
          {order.items.map((item) => (
            <OrderItem 
              key={item.id}
              id={item.id}
              product_name={item.product_name}
              quantity={item.quantity}
              price={item.price}
            />
          ))}
        </div>
        
        <div className="mt-4 flex justify-between items-center pt-3 border-t">
          <div>
            <div className="text-sm text-gray-500">Total</div>
            <div className="font-bold text-lg">${order.total.toFixed(2)}</div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={() => onReorder(order.items)}
          >
            <RefreshCcw className="h-4 w-4" />
            Reorder
          </Button>
        </div>
      </div>
    </div>
  );
};
