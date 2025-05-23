
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
import { toast } from '@/hooks/use-toast';

export const NavigationActions = () => {
  const { setIsCartOpen, totalItems } = useCart();
  const { isAuthenticated, signOut, user } = useAuth();
  const navigate = useNavigate();
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<string>('Select Location');
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);

  // Check for location on component mount
  useEffect(() => {
    checkAndSetLocation();
  }, []);

  // Fetch location when auth state changes
  useEffect(() => {
    if (isAuthenticated && user?.id) {
      fetchDefaultLocation();
    }
  }, [isAuthenticated, user?.id]);

  const checkAndSetLocation = () => {
    // First check localStorage for a cached location
    const savedLocation = localStorage.getItem('userLocation');
    if (savedLocation) {
      setCurrentLocation(savedLocation);
      setIsLoadingLocation(false);
    } else {
      // Show location modal if no location is set
      setShowLocationModal(true);
      setIsLoadingLocation(false);
    }
  };

  const fetchDefaultLocation = async () => {
    if (!user?.id) return;
    
    setIsLoadingLocation(true);
    
    try {
      // First try to get the default location
      const { data: defaultLocation, error: defaultError } = await supabase
        .from('saved_locations')
        .select('address')
        .eq('user_id', user.id)
        .eq('is_default', true)
        .maybeSingle();
      
      if (defaultError) {
        throw defaultError;
      }
      
      // If no default location, try to get any location
      if (!defaultLocation) {
        const { data: anyLocation, error: anyError } = await supabase
          .from('saved_locations')
          .select('address')
          .eq('user_id', user.id)
          .limit(1)
          .maybeSingle();
        
        if (anyError) {
          throw anyError;
        }
        
        if (anyLocation) {
          setCurrentLocation(anyLocation.address);
          localStorage.setItem('userLocation', anyLocation.address);
        }
      } else {
        setCurrentLocation(defaultLocation.address);
        localStorage.setItem('userLocation', defaultLocation.address);
      }
    } catch (error) {
      console.error('Error fetching location:', error);
    } finally {
      setIsLoadingLocation(false);
    }
  };

  const handleLocationSelect = (location: string) => {
    setCurrentLocation(location);
    localStorage.setItem('userLocation', location);
    
    toast({
      title: 'Location updated',
      description: 'Your delivery location has been updated',
    });
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
      toast({
        title: 'Signed out',
        description: 'You have been signed out successfully',
      });
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: 'Error',
        description: 'Failed to sign out. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <button 
        className="flex items-center text-sm font-medium hover:text-primary transition-colors"
        onClick={() => setShowLocationModal(true)}
        aria-label="Select delivery location"
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
            <DropdownMenuItem onClick={() => navigate('/orders')} className="cursor-pointer">
              My Orders
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/wishlist')} className="cursor-pointer">
              <Heart className="h-4 w-4 mr-2" />
              My Wishlist
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/profile')} className="cursor-pointer">
              Profile Settings
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
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
