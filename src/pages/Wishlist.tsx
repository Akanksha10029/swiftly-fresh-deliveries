
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { useToast } from '@/hooks/use-toast';
import { Heart } from 'lucide-react';
import ProductCard from '@/components/products/product-card';
import { useAuth } from '@/context/AuthContext';

// Get the product data
import { allProducts } from '@/data/products';

const FAVORITES_STORAGE_KEY = 'pharmacy-favorites';

const Wishlist = () => {
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();
  const [favoriteItems, setFavoriteItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = () => {
      setIsLoading(true);
      const storedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
      if (storedFavorites) {
        const favoriteIds = JSON.parse(storedFavorites);
        // Find products that match the IDs in favorites
        const favoriteProducts = allProducts.filter(product => 
          favoriteIds.includes(product.id)
        );
        setFavoriteItems(favoriteProducts);
      }
      setIsLoading(false);
    };

    loadFavorites();
  }, []);

  const removeFromWishlist = (productId: string) => {
    const storedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (storedFavorites) {
      let favorites = JSON.parse(storedFavorites);
      favorites = favorites.filter((id: string) => id !== productId);
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
      
      // Update state to remove product from display
      setFavoriteItems(prevItems => prevItems.filter(item => item.id !== productId));
      
      toast({
        title: "Removed from wishlist",
        description: "Item has been removed from your wishlist",
        duration: 2000,
      });
    }
  };

  const clearWishlist = () => {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify([]));
    setFavoriteItems([]);
    toast({
      title: "Wishlist cleared",
      description: "All items have been removed from your wishlist",
      duration: 2000,
    });
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
              <BreadcrumbLink asChild><Link to="/wishlist">My Wishlist</Link></BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">My Wishlist</h1>
          <div className="flex gap-2">
            {favoriteItems.length > 0 && (
              <Button 
                variant="outline" 
                onClick={clearWishlist}
              >
                Clear Wishlist
              </Button>
            )}
            <Button asChild variant="outline">
              <Link to="/products">Continue Shopping</Link>
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-80 bg-gray-100 rounded-lg animate-pulse"></div>
            ))}
          </div>
        ) : favoriteItems.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <Heart className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Your wishlist is empty</h3>
            <p className="text-gray-500 mb-6">Add items that you like to your wishlist</p>
            <Button asChild>
              <Link to="/products">Explore Products</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {favoriteItems.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Wishlist;
