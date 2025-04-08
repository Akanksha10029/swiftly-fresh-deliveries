
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Plus, Search, Loader2, Check, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

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

  // Fetch locations when modal opens
  useEffect(() => {
    if (isAuthenticated && isOpen && user?.id) {
      fetchLocations();
    }
  }, [isAuthenticated, isOpen, user?.id]);

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

  const addLocation = async (address: string) => {
    if (!address.trim() || !user?.id) return;
    
    setIsAdding(true);
    
    try {
      const isFirstLocation = locations.length === 0;
      
      const { error } = await supabase
        .from('saved_locations')
        .insert([
          {
            user_id: user.id,
            name: 'Home',
            address: address,
            is_default: isFirstLocation,
          },
        ]);
        
      if (error) throw error;
      
      toast({
        title: 'Location added',
        description: 'Your location has been saved.',
      });
      
      // If this is the first location, select it automatically
      if (isFirstLocation) {
        onSelectLocation(address);
      }
      
      setSearchQuery('');
      fetchLocations();
      
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
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          try {
            // For demo purposes, we'll just use a placeholder address
            // In a real app, you'd use a reverse geocoding service
            const detectedAddress = `Detected Location (${latitude.toFixed(2)}, ${longitude.toFixed(2)})`;
            
            if (isAuthenticated && user?.id) {
              await addLocation(detectedAddress);
            }
            
            handleSelectLocation(detectedAddress);
          } catch (error) {
            console.error('Error handling detected location:', error);
            toast({
              title: 'Error',
              description: 'Failed to save your detected location.',
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
            description: 'Please grant location access or enter your address manually.',
            variant: 'destructive',
          });
          setDetectingLocation(false);
        }
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

  const filteredLocations = locations.filter(location => 
    location.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    location.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        onClose();
        setSearchQuery('');
        setIsAdding(false);
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
          {isAuthenticated ? (
            <>
              <div className="flex gap-4">
                <Button 
                  variant="default" 
                  className="flex-1 gap-2 bg-primary"
                  onClick={detectLocation}
                  disabled={detectingLocation}
                >
                  {detectingLocation ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <MapPin className="h-4 w-4" />
                  )}
                  Detect my location
                </Button>
                
                <div className="flex items-center">
                  <div className="text-gray-400">OR</div>
                </div>
                
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search delivery location"
                    className="pl-9"
                  />
                </div>
              </div>
              
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <div className="flex flex-col items-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
                    <p className="text-gray-600">Loading locations...</p>
                  </div>
                </div>
              ) : error ? (
                <div className="text-center py-4">
                  <p className="text-red-500 mb-2">{error}</p>
                  <Button onClick={fetchLocations} variant="outline">Try Again</Button>
                </div>
              ) : (
                <>
                  {filteredLocations.length > 0 ? (
                    <div className="max-h-[300px] overflow-y-auto bg-gray-50 rounded-lg p-2">
                      {filteredLocations.map((location) => (
                        <div
                          key={location.id}
                          className="flex items-center justify-between p-3 bg-white rounded-lg hover:bg-gray-50 mb-2 cursor-pointer"
                          onClick={() => handleSelectLocation(location.address)}
                        >
                          <div className="flex items-center">
                            <MapPin className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                            <div>
                              <p className="font-medium">{location.name}</p>
                              <p className="text-sm text-gray-500 break-words">{location.address}</p>
                            </div>
                          </div>
                          {!location.is_default && (
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="ml-2"
                              onClick={(e) => {
                                e.stopPropagation();
                                makeDefault(location.id);
                              }}
                            >
                              Set Default
                            </Button>
                          )}
                          {location.is_default && (
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                              Default
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : searchQuery ? (
                    <div className="text-center py-10">
                      <p className="text-gray-500 mb-4">No locations match "{searchQuery}"</p>
                      <Button onClick={() => addLocation(searchQuery)}>
                        Add "{searchQuery}" as a new location
                      </Button>
                    </div>
                  ) : locations.length === 0 ? (
                    <div className="text-center py-10">
                      <p className="text-gray-500 mb-4">You haven't saved any locations yet</p>
                      <p className="text-sm text-gray-400 mb-4">
                        Save locations for faster checkout in the future
                      </p>
                    </div>
                  ) : null}
                </>
              )}
            </>
          ) : (
            <div className="space-y-4 py-4">
              <Button 
                variant="default" 
                className="w-full gap-2"
                onClick={detectLocation}
                disabled={detectingLocation}
              >
                {detectingLocation ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <MapPin className="h-4 w-4" />
                )}
                Detect my location
              </Button>
              
              <div className="flex items-center justify-center gap-4">
                <div className="border-t border-gray-200 flex-1"></div>
                <span className="text-gray-400 text-sm">OR</span>
                <div className="border-t border-gray-200 flex-1"></div>
              </div>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter your full address"
                  className="pl-9"
                />
              </div>
              
              {searchQuery.trim() && (
                <Button
                  onClick={() => handleSelectLocation(searchQuery)}
                  className="w-full"
                >
                  Confirm Location
                </Button>
              )}
              
              <div className="text-center mt-4">
                <p className="text-sm text-gray-500">
                  Sign in to save your locations for faster checkout
                </p>
                <Button
                  variant="outline"
                  className="mt-2"
                  onClick={() => {
                    onClose();
                    window.location.href = '/auth/signin';
                  }}
                >
                  Sign In
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LocationModal;
