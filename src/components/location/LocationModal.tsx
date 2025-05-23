
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription } from '@/components/ui/dialog';
import { X, MapPin, Loader2, Check } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
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

interface FormattedAddress {
  fullAddress: string;
  street: string;
  neighbourhood: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
}

const LocationModal: React.FC<LocationModalProps> = ({ isOpen, onClose, onSelectLocation }) => {
  const { user, isAuthenticated } = useAuth();
  const [locations, setLocations] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [detectingLocation, setDetectingLocation] = useState(false);
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formattedAddress, setFormattedAddress] = useState<string | null>(null);
  const [isAddingLocation, setIsAddingLocation] = useState(false);
  
  const form = useForm<LocationFormValues>({
    defaultValues: {
      address: '',
      additionalDetails: ''
    }
  });

  // Fetch saved locations when modal opens for authenticated users
  useEffect(() => {
    if (isAuthenticated && isOpen && user?.id) {
      fetchLocations();
    }
  }, [isAuthenticated, isOpen, user?.id]);

  // Reset state when modal is closed
  useEffect(() => {
    if (!isOpen) {
      setShowForm(false);
      setFormattedAddress(null);
      form.reset();
      setSearchQuery('');
    }
  }, [isOpen, form]);

  // Effect for search functionality
  useEffect(() => {
    const searchLocations = async (query: string) => {
      if (!query || query.length < 3) {
        setSearchResults([]);
        return;
      }
      
      setIsSearching(true);
      
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock search results - replace with actual API call
        const mockResults = [
          `${query} Area, Delhi`,
          `${query} Colony, Mumbai`,
          `${query} Heights, Bangalore`,
          `${query} Street, Kolkata`
        ];
        
        setSearchResults(mockResults);
      } catch (error) {
        console.error('Error searching locations:', error);
      } finally {
        setIsSearching(false);
      }
    };
    
    const debounce = setTimeout(() => {
      if (searchQuery.trim()) {
        searchLocations(searchQuery);
      } else {
        setSearchResults([]);
      }
    }, 300);
    
    return () => clearTimeout(debounce);
  }, [searchQuery]);

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
        description: 'Failed to fetch saved locations',
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
        async (position) => {
          const { latitude, longitude } = position.coords;
          console.log("Location detected:", latitude, longitude);
          
          try {
            // Call our Supabase Edge Function for reverse geocoding
            const { data, error } = await supabase.functions.invoke('geocoding', {
              body: { lat: latitude, lng: longitude }
            });
            
            console.log("Geocoding response:", data);
            
            if (error) {
              console.error("Geocoding function error:", error);
              throw error;
            }
            
            if (data && data.success) {
              // Set the form with the detected address
              form.setValue('address', data.address.fullAddress);
              
              // Store the formatted address for display
              setFormattedAddress(data.displayAddress || data.address.fullAddress);
              
              // Show the form for additional details
              setShowForm(true);
            } else {
              throw new Error(data?.error || 'Could not decode location');
            }
          } catch (error) {
            console.error('Error reverse geocoding:', error);
            toast({
              title: 'Error',
              description: 'Failed to get your address. Please enter manually.',
              variant: 'destructive',
            });
          } finally {
            setDetectingLocation(false);
          }
        },
        (error) => {
          console.error('Geolocation error:', error);
          toast({
            title: 'Location detection failed',
            description: 'Please allow location access or enter your address manually',
            variant: 'destructive',
          });
          setDetectingLocation(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
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

  const handleFormSubmit = async (formData: LocationFormValues) => {
    setIsAddingLocation(true);
    
    try {
      const displayAddress = formattedAddress || formData.address;
      const fullAddress = formattedAddress 
        ? `${displayAddress}${formData.additionalDetails ? `, ${formData.additionalDetails}` : ''}` 
        : formData.address;
      
      if (isAuthenticated && user?.id) {
        await saveLocationToDatabase(displayAddress, fullAddress);
      } else {
        // For non-authenticated users, just set in local storage
        localStorage.setItem('userLocation', displayAddress);
        handleSelectLocation(displayAddress);
      }
    } catch (error) {
      console.error("Error saving location:", error);
      toast({
        title: 'Error',
        description: 'Failed to save location',
        variant: 'destructive',
      });
    } finally {
      setIsAddingLocation(false);
    }
  };

  const saveLocationToDatabase = async (displayAddress: string, fullAddress: string) => {
    if (!user?.id) return;
    
    try {
      const isFirstLocation = locations.length === 0;
      
      const { error } = await supabase
        .from('saved_locations')
        .insert([
          {
            user_id: user.id,
            name: 'Home',
            address: displayAddress,
            is_default: isFirstLocation,
          },
        ]);
        
      if (error) throw error;
      
      toast({
        title: 'Location saved',
        description: 'Your location has been saved',
      });
      
      handleSelectLocation(displayAddress);
      
    } catch (error: any) {
      throw error;
    }
  };

  const handleSearchResultClick = (location: string) => {
    setSearchQuery(location);
    setSearchResults([]);
    form.setValue('address', location);
    setFormattedAddress(location);
    setShowForm(true);
  };

  const handleManualSearch = () => {
    if (searchQuery.trim()) {
      form.setValue('address', searchQuery);
      setFormattedAddress(searchQuery);
      setShowForm(true);
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
        <div className="text-center py-2 text-gray-500 text-sm">
          No saved locations
        </div>
      );
    }
    
    return (
      <div className="mt-4 space-y-2 max-h-48 overflow-y-auto">
        {locations.map((location) => (
          <div
            key={location.id}
            className="p-2.5 border rounded-md hover:bg-gray-50 cursor-pointer flex items-center"
            onClick={() => handleSelectLocation(location.address)}
          >
            <MapPin className="h-4 w-4 text-primary mr-2" />
            <div className="flex-1">
              <p className="font-medium text-sm">{location.name || 'Location'}</p>
              <p className="text-xs text-gray-500 truncate">{location.address}</p>
            </div>
            {location.is_default && (
              <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
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
      <DialogContent className="sm:max-w-md p-0 gap-0">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-medium text-lg">Change Location</h2>
          <button 
            onClick={onClose}
            className="rounded-full hover:bg-gray-100 p-1"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-4">
          {!showForm ? (
            <div className="space-y-4">
              {/* Detect location button */}
              <Button 
                variant="default" 
                className="w-full gap-2 bg-green-500 hover:bg-green-600 text-base h-12"
                onClick={detectLocation}
                disabled={detectingLocation}
              >
                {detectingLocation ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <MapPin className="h-5 w-5" />
                )}
                {detectingLocation ? "Detecting..." : "Detect my location"}
              </Button>
              
              {/* OR divider */}
              <div className="flex items-center gap-2">
                <div className="border-t flex-1"></div>
                <span className="text-gray-400 text-sm">OR</span>
                <div className="border-t flex-1"></div>
              </div>
              
              {/* Search input with dropdown */}
              <div className="relative">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search area, street name..."
                      className="pr-10"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      {isSearching ? (
                        <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                      ) : null}
                    </div>
                  </div>
                  
                  <Button 
                    className="bg-green-500 hover:bg-green-600"
                    onClick={handleManualSearch}
                    disabled={!searchQuery.trim()}
                  >
                    Search
                  </Button>
                </div>
                
                {/* Search results dropdown */}
                {searchResults.length > 0 && (
                  <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                    {searchResults.map((result, index) => (
                      <div
                        key={index}
                        className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                        onClick={() => handleSearchResultClick(result)}
                      >
                        <div className="flex items-center">
                          <MapPin className="h-3.5 w-3.5 text-gray-400 mr-2" />
                          {result}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Saved locations (for authenticated users) */}
              {isAuthenticated && (
                <>
                  <div className="text-sm font-medium mt-2">Saved Locations</div>
                  {renderSavedLocations()}
                </>
              )}
              
              {/* Sign in prompt for non-authenticated users */}
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
          ) : (
            <div className="space-y-4">
              <DialogDescription className="text-center">
                Please confirm your location or add additional details
              </DialogDescription>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input {...field} readOnly={!!formattedAddress} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="additionalDetails"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Details</FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field} 
                            placeholder="Apartment number, landmark, etc." 
                            className="min-h-[80px]"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex gap-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => {
                        setShowForm(false);
                        setFormattedAddress(null);
                        form.reset();
                      }}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      className="flex-1 bg-green-500 hover:bg-green-600"
                      disabled={isAddingLocation || !form.getValues().address}
                    >
                      {isAddingLocation ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      ) : (
                        <Check className="h-4 w-4 mr-2" />
                      )}
                      Confirm Location
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LocationModal;
