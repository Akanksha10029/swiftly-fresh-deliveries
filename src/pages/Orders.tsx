
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Package, RefreshCcw } from 'lucide-react';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart, CartItem } from '@/context/CartContext';

type OrderWithItems = {
  id: string;
  status: string;
  total: number;
  shipping_address: string;
  created_at: string;
  updated_at: string;
  items: {
    id: string;
    product_id: string;
    product_name: string;
    price: number;
    quantity: number;
  }[];
};

const Orders = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setCartItems } = useCart();
  const [orders, setOrders] = useState<OrderWithItems[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      navigate('/auth/signin', { replace: true });
      return;
    }

    if (user) {
      fetchOrders();
    }
  }, [user, isAuthenticated, navigate]);

  const fetchOrders = async () => {
    if (!user?.id) return;
    
    setLoading(true);
    
    try {
      // Fetch orders
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (ordersError) {
        throw ordersError;
      }

      const ordersWithItems: OrderWithItems[] = [];

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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>;
      case 'processing':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Processing</Badge>;
      case 'shipped':
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Shipped</Badge>;
      case 'delivered':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Delivered</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleReorder = (orderItems: any[]) => {
    try {
      // Add all items to cart with the required productQuantity property
      const cartItems: CartItem[] = orderItems.map(item => ({
        id: item.product_id,
        name: item.product_name,
        price: item.price,
        quantity: item.quantity,
        image: '/placeholder.svg', // Using placeholder as we don't store image in order_items
        productQuantity: "1 unit", // Adding default productQuantity as it's required by CartItem type
        deliveryTime: "9 minutes" // Adding a default deliveryTime
      }));
      
      setCartItems(cartItems);
      
      toast({
        title: "Items added to cart",
        description: "All items have been added to your cart",
      });
    } catch (error) {
      toast({
        title: "Error reordering",
        description: "There was an error adding items to cart",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <div className="container mx-auto px-4 py-8 mt-16 flex-1">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild><Link to="/orders">My Orders</Link></BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">My Orders</h1>
          <Button asChild variant="outline">
            <Link to="/products">Continue Shopping</Link>
          </Button>
        </div>

        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="delivered">Delivered</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            {renderOrderList(orders, loading, getStatusBadge, handleReorder)}
          </TabsContent>
          
          <TabsContent value="pending">
            {renderOrderList(orders.filter(order => 
              ['pending', 'processing', 'shipped'].includes(order.status)
            ), loading, getStatusBadge, handleReorder)}
          </TabsContent>
          
          <TabsContent value="delivered">
            {renderOrderList(orders.filter(order => 
              order.status === 'delivered'
            ), loading, getStatusBadge, handleReorder)}
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

const renderOrderList = (
  orders: OrderWithItems[], 
  loading: boolean, 
  getStatusBadge: (status: string) => React.ReactNode,
  handleReorder: (items: any[]) => void
) => {
  if (loading) {
    return Array.from({ length: 3 }).map((_, i) => (
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
    ));
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
        <p className="text-gray-500 mb-6">You haven't placed any orders yet.</p>
        <Button asChild>
          <Link to="/products">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  return orders.map(order => (
    <div key={order.id} className="mb-6 border rounded-lg overflow-hidden">
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
          {getStatusBadge(order.status)}
        </div>
      </div>
      
      <div className="p-4">
        <div className="space-y-3">
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between items-center py-2 border-b last:border-0">
              <div>
                <div className="font-medium">{item.product_name}</div>
                <div className="text-sm text-gray-500">Qty: {item.quantity} × ${item.price.toFixed(2)}</div>
              </div>
              <div className="font-medium">
                ${(item.quantity * item.price).toFixed(2)}
              </div>
            </div>
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
            onClick={() => handleReorder(order.items)}
          >
            <RefreshCcw className="h-4 w-4" />
            Reorder
          </Button>
        </div>
      </div>
    </div>
  ));
};

export default Orders;
