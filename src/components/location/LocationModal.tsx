
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';

// Import our component modules
import LocationForm, { LocationFormValues } from './modals/LocationForm';
import LocationList from './modals/LocationList';
import LocationDetection from './modals/LocationDetection';
import AuthenticatedLocationSearch from './modals/AuthenticatedLocationSearch';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLocation: (location: string) => void;
}

const LocationModal: React.FC<LocationModalProps> = ({ isOpen, onClose, onSelectLocation }) => {
  const { user, isAuthenticated } = useAuth();
  const [locations, setLocations] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [detectingLocation, setDetectingLocation] = useState(false);
  const [detectedCoordinates, setDetectedCoordinates] = useState<{lat: number; lng: number} | null>(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  
  const form = useForm<LocationFormValues>({
    defaultValues: {
      address: '',
      additionalDetails: ''
    }
  });

  // Fetch locations when modal opens
  useEffect(() => {
    if (isAuthenticated && isOpen && user?.id) {
      fetchLocations();
    }
  }, [isAuthenticated, isOpen, user?.id]);

  // Update form values when detected coordinates change
  useEffect(() => {
    if (detectedCoordinates) {
      form.setValue('address', `Detected Location (${detectedCoordinates.lat.toFixed(4)}, ${detectedCoordinates.lng.toFixed(4)})`);
      setShowAddressForm(true);
    }
  }, [detectedCoordinates, form]);

  const fetchLocations = async () => {
    if (!user?.id) return;
    
    setIsLoading(true);
    setError(null);
    
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
      setError('Failed to fetch locations. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const addLocation = async (addressData: LocationFormValues) => {
    if (!addressData.address.trim()) {
      toast({
        title: 'Error',
        description: 'Address cannot be empty.',
        variant: 'destructive',
      });
      return;
    }
    
    setIsAdding(true);
    
    try {
      if (isAuthenticated && user?.id) {
        const isFirstLocation = locations.length === 0;
        
        const { error } = await supabase
          .from('saved_locations')
          .insert([
            {
              user_id: user.id,
              name: 'Home',
              address: addressData.address + (addressData.additionalDetails ? ` (${addressData.additionalDetails})` : ''),
              is_default: isFirstLocation,
            },
          ]);
          
        if (error) throw error;
        
        toast({
          title: 'Location added',
          description: 'Your location has been saved.',
        });
        
        fetchLocations();
      }
      
      // Always handle the location selection, whether user is authenticated or not
      handleSelectLocation(addressData.address + (addressData.additionalDetails ? ` (${addressData.additionalDetails})` : ''));
      
      setSearchQuery('');
      setShowAddressForm(false);
      setDetectedCoordinates(null);
      
    } catch (error: any) {
      console.error('Error adding location:', error);
      toast({
        title: 'Error',
        description: 'Failed to add location.',
        variant: 'destructive',
      });
    } finally {
      setIsAdding(false);
    }
  };

  const handleSelectLocation = (address: string) => {
    onSelectLocation(address);
    onClose();
  };

  const makeDefault = async (locationId: string) => {
    if (!user?.id) return;
    
    try {
      // First, remove default status from all locations
      await supabase
        .from('saved_locations')
        .update({ is_default: false })
        .eq('user_id', user.id);
      
      // Then set the selected location as default
      const { error } = await supabase
        .from('saved_locations')
        .update({ is_default: true })
        .eq('id', locationId);
        
      if (error) throw error;
      
      toast({
        title: 'Default updated',
        description: 'Your default location has been updated.',
      });
      
      fetchLocations();
      
    } catch (error: any) {
      console.error('Error updating default location:', error);
      toast({
        title: 'Error',
        description: 'Failed to update default location.',
        variant: 'destructive',
      });
    }
  };

  const detectLocation = () => {
    setDetectingLocation(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log("Location detected:", latitude, longitude);
          setDetectedCoordinates({ lat: latitude, lng: longitude });
          setShowAddressForm(true);
          setDetectingLocation(false);
        },
        (error) => {
          console.error('Geolocation error:', error);
          toast({
            title: 'Location detection failed',
            description: 'Please grant location access or enter your address manually.',
            variant: 'destructive',
          });
          setDetectingLocation(false);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      toast({
        title: 'Geolocation not supported',
        description: 'Your browser does not support location detection.',
        variant: 'destructive',
      });
      setDetectingLocation(false);
    }
  };

  const onSubmitLocationForm = (data: LocationFormValues) => {
    if (isAuthenticated && user?.id) {
      addLocation(data);
    } else {
      handleSelectLocation(data.address + (data.additionalDetails ? ` (${data.additionalDetails})` : ''));
    }
  };

  const handleAddNewLocation = (query: string) => {
    form.setValue('address', query);
    setShowAddressForm(true);
  };

  const handleSignIn = () => {
    onClose();
    window.location.href = '/auth/signin';
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        onClose();
        setSearchQuery('');
        setIsAdding(false);
        setShowAddressForm(false);
        setDetectedCoordinates(null);
      }
    }}>
      <DialogContent className="sm:max-w-md bg-white p-0 overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <DialogTitle className="text-lg">Change Location</DialogTitle>
          <button 
            onClick={onClose}
            className="rounded-full hover:bg-gray-100 p-1"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-4 flex flex-col gap-4">
          {showAddressForm ? (
            <LocationForm 
              form={form}
              onSubmit={onSubmitLocationForm}
              onCancel={() => {
                setShowAddressForm(false);
                setDetectedCoordinates(null);
              }}
              isAdding={isAdding}
            />
          ) : isAuthenticated ? (
            <>
              <AuthenticatedLocationSearch
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onDetectLocation={detectLocation}
                detectingLocation={detectingLocation}
              />
              
              <LocationList
                locations={locations}
                isLoading={isLoading}
                error={error}
                searchQuery={searchQuery}
                onSelectLocation={handleSelectLocation}
                onMakeDefault={makeDefault}
                onRetry={fetchLocations}
                onAddNewLocation={handleAddNewLocation}
              />
            </>
          ) : (
            <LocationDetection
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onDetectLocation={detectLocation}
              onAddDetails={() => handleAddNewLocation(searchQuery)}
              detectingLocation={detectingLocation}
              isAuthenticated={isAuthenticated}
              onSignIn={handleSignIn}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LocationModal;
