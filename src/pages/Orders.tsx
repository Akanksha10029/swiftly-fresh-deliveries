
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useCart } from '@/context/CartContext';
import { 
  Package, Clock, ChevronRight, ShoppingCart, CheckCircle, AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Link, useNavigate } from 'react-router-dom';

const Orders = () => {
  const { user, isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth/signin');
      return;
    }
    
    fetchOrders();
  }, [isAuthenticated]);

  const fetchOrders = async () => {
    try {
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });
        
      if (ordersError) throw ordersError;
      
      // For each order, fetch its items
      const ordersWithItems = await Promise.all(
        ordersData.map(async (order) => {
          const { data: itemsData, error: itemsError } = await supabase
            .from('order_items')
            .select('*')
            .eq('order_id', order.id);
            
          if (itemsError) throw itemsError;
          
          return {
            ...order,
            items: itemsData,
          };
        })
      );
      
      setOrders(ordersWithItems);
    } catch (error: any) {
      toast({
        title: 'Error fetching orders',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const reorderItems = (items: any[]) => {
    items.forEach(item => {
      // Construct a cart item from order item
      const cartItem = {
        id: item.product_id,
        name: item.product_name,
        price: item.price,
        quantity: item.quantity,
        image: '/placeholder.svg', // This would ideally come from your products data
        productQuantity: '1 item', // This would ideally come from your products data
      };
      
      addToCart(cartItem);
    });
    
    toast({
      title: 'Items added to cart',
      description: 'The items have been added to your cart.',
    });
    
    navigate('/');
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'processing':
        return <Package className="h-4 w-4" />;
      case 'cancelled':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to="/orders">My Orders</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      
      {loading ? (
        <div className="text-center py-12">
          <p>Loading your orders...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium mb-2">No orders yet</h3>
          <p className="text-gray-500 mb-4">You haven't placed any orders yet.</p>
          <Button as={Link} to="/products">
            Browse Products
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border rounded-lg overflow-hidden">
              <div className="bg-gray-50 p-4 flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm text-gray-500">Order #{order.id.slice(0, 8)}</p>
                  <p className="text-sm text-gray-500">{formatDate(order.created_at)}</p>
                </div>
                <div className="flex items-center mt-2 md:mt-0">
                  <span className={`flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                    <span className="ml-1">{order.status}</span>
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                    className="ml-2"
                  >
                    <ChevronRight className={`h-4 w-4 transition-transform ${expandedOrder === order.id ? 'rotate-90' : ''}`} />
                  </Button>
                </div>
              </div>
              
              {expandedOrder === order.id && (
                <div className="p-4 bg-white">
                  <h3 className="font-medium mb-2">Order Items</h3>
                  <div className="space-y-2 mb-4">
                    {order.items.map((item: any) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span>
                          {item.product_name} x {item.quantity}
                        </span>
                        <span className="font-medium">
                          ${item.price.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t pt-2 flex justify-between font-medium">
                    <span>Total</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                  
                  <div className="mt-4">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => reorderItems(order.items)}
                      className="w-full sm:w-auto"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Reorder
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
