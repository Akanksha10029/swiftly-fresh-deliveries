
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface OrderItem {
  id: string;
  product_id: string;
  product_name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  status: string;
  total: number;
  shipping_address: string;
  created_at: string;
  updated_at: string;
  items: OrderItem[];
}

export const useOrders = (userId: string | undefined) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (!userId) return;
    
    const fetchOrders = async () => {
      setLoading(true);
      
      try {
        // Fetch orders
        const { data: ordersData, error: ordersError } = await supabase
          .from('orders')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false });

        if (ordersError) {
          throw ordersError;
        }

        const ordersWithItems: Order[] = [];

        // For each order, fetch its items
        for (const order of ordersData || []) {
          const { data: itemsData, error: itemsError } = await supabase
            .from('order_items')
            .select('*')
            .eq('order_id', order.id);

          if (itemsError) {
            console.error('Error fetching order items:', itemsError);
            continue;
          }

          ordersWithItems.push({
            ...order,
            items: itemsData || []
          });
        }

        setOrders(ordersWithItems);
      } catch (error: any) {
        console.error('Error fetching orders:', error);
        toast({ 
          title: "Error fetching orders", 
          description: error.message || "Failed to load your orders",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId, toast]);

  return { orders, loading };
};
