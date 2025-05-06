
import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import { OrderCard } from './OrderCard';
import { EmptyOrderState } from './EmptyOrderState';

interface OrderItem {
  id: string;
  product_id: string;
  product_name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  status: string;
  total: number;
  shipping_address: string;
  created_at: string;
  updated_at: string;
  items: OrderItem[];
}

interface OrderListProps {
  orders: Order[];
  loading: boolean;
  onReorder: (items: OrderItem[]) => void;
}

export const OrderList: React.FC<OrderListProps> = ({ orders, loading, onReorder }) => {
  if (loading) {
    return (
      <>
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="mb-6 border rounded-lg p-4">
            <div className="flex justify-between items-center mb-3">
              <Skeleton className="h-4 w-[150px]" />
              <Skeleton className="h-4 w-[100px]" />
            </div>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-4" />
            <div className="flex justify-between">
              <Skeleton className="h-10 w-[120px]" />
              <Skeleton className="h-10 w-[120px]" />
            </div>
          </div>
        ))}
      </>
    );
  }

  if (orders.length === 0) {
    return <EmptyOrderState />;
  }

  return (
    <>
      {orders.map(order => (
        <OrderCard 
          key={order.id}
          order={order}
          onReorder={onReorder}
        />
      ))}
    </>
  );
};
