
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { X, MapPin, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLocation: (location: string) => void;
}

interface LocationFormValues {
  address: string;
  additionalDetails: string;
}

const LocationModal: React.FC<LocationModalProps> = ({ isOpen, onClose, onSelectLocation }) => {
  const { user, isAuthenticated } = useAuth();
  const [locations, setLocations] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [detectingLocation, setDetectingLocation] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  
  const form = useForm<LocationFormValues>({
    defaultValues: {
      address: '',
      additionalDetails: ''
    }
  });

  // Fetch locations when modal opens for authenticated users
  useEffect(() => {
    if (isAuthenticated && isOpen && user?.id) {
      fetchLocations();
    }
  }, [isAuthenticated, isOpen, user?.id]);

  const fetchLocations = async () => {
    if (!user?.id) return;
    
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('saved_locations')
        .select('*')
        .eq('user_id', user.id)
        .order('is_default', { ascending: false });
        
      if (error) throw error;
      
      setLocations(data || []);
      
    } catch (error: any) {
      console.error('Error fetching locations:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch locations',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const detectLocation = () => {
    setDetectingLocation(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log("Location detected:", latitude, longitude);
          
          // For simplicity, just use the coordinates as the address
          const detectedLocation = `Detected Location (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`;
          
          if (isAuthenticated && user?.id) {
            saveLocation(detectedLocation);
          } else {
            // For non-authenticated users, just set the location
            handleSelectLocation(detectedLocation);
          }
          
          setDetectingLocation(false);
        },
        (error) => {
          console.error('Geolocation error:', error);
          toast({
            title: 'Location detection failed',
            description: 'Please enter your address manually',
            variant: 'destructive',
          });
          setDetectingLocation(false);
        }
      );
    } else {
      toast({
        title: 'Geolocation not supported',
        description: 'Your browser does not support location detection',
        variant: 'destructive',
      });
      setDetectingLocation(false);
    }
  };

  const saveLocation = async (address: string) => {
    if (!user?.id) return;
    
    setIsLoading(true);
    
    try {
      const isFirstLocation = locations.length === 0;
      
      const { error } = await supabase
        .from('saved_locations')
        .insert([
          {
            user_id: user.id,
            name: 'Home',
            address,
            is_default: isFirstLocation,
          },
        ]);
        
      if (error) throw error;
      
      toast({
        title: 'Location saved',
        description: 'Your location has been saved',
      });
      
      handleSelectLocation(address);
      
    } catch (error: any) {
      console.error('Error saving location:', error);
      toast({
        title: 'Error',
        description: 'Failed to save location',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLocationInput = () => {
    if (!searchQuery.trim()) {
      toast({
        title: 'Empty location',
        description: 'Please enter your location',
        variant: 'destructive',
      });
      return;
    }
    
    if (isAuthenticated && user?.id) {
      saveLocation(searchQuery);
    } else {
      handleSelectLocation(searchQuery);
    }
  };

  const handleSelectLocation = (address: string) => {
    onSelectLocation(address);
    onClose();
  };

  const renderSavedLocations = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center py-4">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      );
    }
    
    if (locations.length === 0) {
      return (
        <div className="text-center py-4 text-gray-500">
          No saved locations
        </div>
      );
    }
    
    return (
      <div className="mt-4 space-y-2 max-h-48 overflow-y-auto">
        {locations.map((location) => (
          <div
            key={location.id}
            className="p-3 border rounded-md hover:bg-gray-50 cursor-pointer flex items-center"
            onClick={() => handleSelectLocation(location.address)}
          >
            <MapPin className="h-5 w-5 text-primary mr-2" />
            <div className="flex-1">
              <p className="font-medium">{location.name || 'Location'}</p>
              <p className="text-sm text-gray-500 truncate">{location.address}</p>
            </div>
            {location.is_default && (
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                Default
              </span>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md p-0">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-medium text-lg">Change Location</h2>
          <button 
            onClick={onClose}
            className="rounded-full hover:bg-gray-100 p-1"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-4 space-y-4">
          <Button 
            variant="default" 
            className="w-full gap-2 bg-green-600 hover:bg-green-700"
            onClick={detectLocation}
            disabled={detectingLocation}
          >
            {detectingLocation ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <MapPin className="h-4 w-4" />
            )}
            {detectingLocation ? "Detecting..." : "Detect my location"}
          </Button>
          
          <div className="flex items-center gap-2">
            <div className="border-t flex-1"></div>
            <span className="text-gray-400 text-sm">OR</span>
            <div className="border-t flex-1"></div>
          </div>
          
          <div className="flex gap-2">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="search delivery location"
              className="flex-1"
            />
            <Button 
              onClick={handleLocationInput}
              disabled={isLoading}
              className="bg-green-600 hover:bg-green-700"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Set"}
            </Button>
          </div>
          
          {isAuthenticated && renderSavedLocations()}
          
          {!isAuthenticated && (
            <div className="text-center mt-4">
              <p className="text-sm text-gray-500 mb-2">
                Sign in to save locations for faster checkout
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  onClose();
                  window.location.href = '/auth/signin';
                }}
              >
                Sign In
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LocationModal;
