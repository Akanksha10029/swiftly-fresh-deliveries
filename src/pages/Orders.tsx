
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCart, CartItem } from '@/context/CartContext';
import { OrderList } from '@/components/orders/OrderList';
import { useOrders, OrderItem as OrderItemType } from '@/hooks/useOrders';
import { useToast } from '@/hooks/use-toast';

const Orders = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setCartItems } = useCart();
  const { orders, loading } = useOrders(user?.id);

  React.useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      navigate('/auth/signin', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleReorder = (orderItems: OrderItemType[]) => {
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
            <OrderList
              orders={orders}
              loading={loading}
              onReorder={handleReorder}
            />
          </TabsContent>
          
          <TabsContent value="pending">
            <OrderList
              orders={orders.filter(order => 
                ['pending', 'processing', 'shipped'].includes(order.status)
              )}
              loading={loading}
              onReorder={handleReorder}
            />
          </TabsContent>
          
          <TabsContent value="delivered">
            <OrderList
              orders={orders.filter(order => 
                order.status === 'delivered'
              )}
              loading={loading}
              onReorder={handleReorder}
            />
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default Orders;
