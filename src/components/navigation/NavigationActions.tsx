
import React, { useState, useEffect } from 'react';
import { MapPin, User, ShoppingCart, LogOut, Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import LocationModal from '@/components/location/LocationModal';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { supabase } from '@/integrations/supabase/client';

export const NavigationActions = () => {
  const { setIsCartOpen, totalItems, subtotal } = useCart();
  const { isAuthenticated, signOut, user } = useAuth();
  const navigate = useNavigate();
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<string>('Set Location');
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  // Fetch default location when authenticated
  useEffect(() => {
    if (isAuthenticated && user?.id) {
      fetchDefaultLocation();
    }
  }, [isAuthenticated, user?.id]);

  const fetchDefaultLocation = async () => {
    setIsLoadingLocation(true);
    try {
      const { data, error } = await supabase
        .from('saved_locations')
        .select('address')
        .eq('user_id', user?.id)
        .eq('is_default', true)
        .maybeSingle();
        
      if (error) throw error;
      
      if (data?.address) {
        setCurrentLocation(data.address);
      }
    } catch (error) {
      console.error('Error fetching default location:', error);
    } finally {
      setIsLoadingLocation(false);
    }
  };

  const handleLocationSelect = (location: string) => {
    setCurrentLocation(location);
  };

  return (
    <div className="flex items-center space-x-4">
      <button 
        className="flex items-center text-sm font-medium hover:text-primary transition-colors"
        onClick={() => setShowLocationModal(true)}
      >
        <MapPin className="h-4 w-4 mr-2" />
        <span className="hidden lg:inline truncate max-w-[150px]">
          {isLoadingLocation ? 'Loading...' : currentLocation}
        </span>
      </button>
      
      {isAuthenticated ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center text-sm font-medium hover:text-primary transition-colors">
              <User className="h-4 w-4 mr-2" />
              <span className="hidden lg:inline">Account</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem onClick={() => navigate('/orders')}>
              My Orders
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/wishlist')}>
              <Heart className="h-4 w-4 mr-2" />
              My Wishlist
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/profile')}>
              Profile Settings
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => signOut()}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <button 
          className="flex items-center text-sm font-medium hover:text-primary transition-colors"
          onClick={() => navigate('/auth/signin')}
        >
          <User className="h-4 w-4 mr-2" />
          <span className="hidden lg:inline">Sign In</span>
        </button>
      )}
      
      <button
        onClick={() => setIsCartOpen(true)}
        className="flex items-center bg-primary text-white px-4 py-2 rounded-full font-medium hover:bg-primary/90 transition-colors relative"
      >
        <ShoppingCart className="h-4 w-4 mr-2" />
        <span className="hidden lg:inline">Cart</span>
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </button>
      
      <LocationModal 
        isOpen={showLocationModal}
        onClose={() => setShowLocationModal(false)}
        onSelectLocation={handleLocationSelect}
      />
    </div>
  );
};
