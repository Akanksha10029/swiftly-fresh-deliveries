
import React, { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Plus, Search, X, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';

// This is a publishable token, it's safe to include in the client-side code
mapboxgl.accessToken = 'pk.eyJ1IjoibG92YWJsZXRlc3QiLCJhIjoiY2x0amM5c2hoMDJ4azJqbjA5aGE4ZXR4ZyJ9.O0HQkoiZoOt5nAEpJK-9ow';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLocation: (location: string) => void;
}

interface PlaceSuggestion {
  place_id: string;
  description: string;
  main_text: string;
  secondary_text: string;
}

const LocationModal: React.FC<LocationModalProps> = ({ isOpen, onClose, onSelectLocation }) => {
  const { user, isAuthenticated } = useAuth();
  const [locations, setLocations] = useState<any[]>([]);
  const [newLocation, setNewLocation] = useState('');
  const [newLocationName, setNewLocationName] = useState('Home');
  const [isAdding, setIsAdding] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [mapCoordinates, setMapCoordinates] = useState<[number, number]>([77.2090, 28.6139]); // Default: Delhi
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState<PlaceSuggestion | null>(null);

  useEffect(() => {
    if (isAuthenticated && isOpen) {
      fetchLocations();
    }
  }, [isAuthenticated, isOpen]);

  useEffect(() => {
    if (showMap && mapContainer.current) {
      // Initialize map
      mapInstance.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: mapCoordinates,
        zoom: 13
      });

      // Add navigation controls
      mapInstance.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      // Add marker at center
      marker.current = new mapboxgl.Marker({ draggable: true })
        .setLngLat(mapCoordinates)
        .addTo(mapInstance.current);

      // When marker is dragged, update coordinates
      marker.current.on('dragend', () => {
        if (marker.current) {
          const lngLat = marker.current.getLngLat();
          setMapCoordinates([lngLat.lng, lngLat.lat]);
          // Update the address using reverse geocoding
          fetchAddressFromCoordinates(lngLat.lng, lngLat.lat);
        }
      });

      // Cleanup
      return () => {
        if (mapInstance.current) {
          mapInstance.current.remove();
          mapInstance.current = null;
        }
      };
    }
  }, [showMap]);

  const fetchLocations = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('saved_locations')
        .select('*')
        .eq('user_id', user?.id)
        .order('is_default', { ascending: false });
        
      if (error) throw error;
      
      setLocations(data || []);
    } catch (error: any) {
      toast({
        title: 'Error fetching locations',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAddressFromCoordinates = async (lng: number, lat: number) => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxgl.accessToken}`
      );
      const data = await response.json();
      
      if (data && data.features && data.features.length > 0) {
        setNewLocation(data.features[0].place_name);
      }
    } catch (error) {
      console.error('Error fetching address:', error);
    }
  };

  const fetchCoordinatesFromAddress = async (address: string) => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${mapboxgl.accessToken}`
      );
      const data = await response.json();
      
      if (data && data.features && data.features.length > 0) {
        const coordinates = data.features[0].center;
        setMapCoordinates([coordinates[0], coordinates[1]]);
        
        // Update marker position
        if (mapInstance.current && marker.current) {
          marker.current.setLngLat([coordinates[0], coordinates[1]]);
          mapInstance.current.flyTo({
            center: [coordinates[0], coordinates[1]],
            zoom: 15
          });
        }
      }
    } catch (error) {
      console.error('Error fetching coordinates:', error);
    }
  };

  const addLocation = async () => {
    if (!newLocation.trim()) return;
    
    try {
      const { error } = await supabase
        .from('saved_locations')
        .insert([
          {
            user_id: user?.id,
            name: newLocationName,
            address: newLocation,
            is_default: locations.length === 0,
          },
        ]);
        
      if (error) throw error;
      
      toast({
        title: 'Location added',
        description: 'Your location has been saved.',
      });
      
      setNewLocation('');
      setNewLocationName('Home');
      setIsAdding(false);
      setShowMap(false);
      fetchLocations();
    } catch (error: any) {
      toast({
        title: 'Error adding location',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleSelectLocation = (address: string) => {
    onSelectLocation(address);
    onClose();
  };

  const fetchLocationSuggestions = async (query: string) => {
    if (!query || query.length < 3) {
      setSuggestions([]);
      return;
    }
    
    setIsSearching(true);
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${mapboxgl.accessToken}&types=address,place,neighborhood,locality,district&country=in&autocomplete=true&limit=5`
      );
      const data = await response.json();
      
      if (data && data.features) {
        const placeSuggestions: PlaceSuggestion[] = data.features.map((feature: any) => {
          const mainText = feature.text || '';
          const secondaryText = feature.place_name.replace(mainText + ', ', '') || '';
          
          return {
            place_id: feature.id,
            description: feature.place_name,
            main_text: mainText,
            secondary_text: secondaryText
          };
        });
        
        setSuggestions(placeSuggestions);
      }
    } catch (error) {
      console.error('Error fetching location suggestions:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectSuggestion = (suggestion: PlaceSuggestion) => {
    setNewLocation(suggestion.description);
    setSuggestions([]);
    setSelectedSuggestion(suggestion);
    fetchCoordinatesFromAddress(suggestion.description);
  };

  const handleLocationInputChange = (value: string) => {
    setNewLocation(value);
    fetchLocationSuggestions(value);
  };

  // Debounce the search input
  useEffect(() => {
    const timer = setTimeout(() => {
      if (newLocation) {
        fetchLocationSuggestions(newLocation);
      }
    }, 300);
    
    return () => clearTimeout(timer);
  }, [newLocation]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Select Location</DialogTitle>
          <DialogDescription>
            {isAuthenticated ? 'Choose from your saved locations or add a new one.' : 'Enter your delivery location.'}
          </DialogDescription>
        </DialogHeader>
        
        {isAuthenticated ? (
          <div className="space-y-4">
            {isLoading ? (
              <div className="text-center py-4 flex items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin mr-2" />
                <span>Loading locations...</span>
              </div>
            ) : (
              <>
                {locations.map((location) => (
                  <div
                    key={location.id}
                    className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSelectLocation(location.address)}
                  >
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-primary mr-2" />
                      <div>
                        <p className="font-medium">{location.name}</p>
                        <p className="text-sm text-gray-500">{location.address}</p>
                      </div>
                    </div>
                    {location.is_default && (
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">Default</span>
                    )}
                  </div>
                ))}
                
                {isAdding ? (
                  <div className="flex flex-col space-y-2">
                    <Input
                      value={newLocationName}
                      onChange={(e) => setNewLocationName(e.target.value)}
                      placeholder="Location name (e.g. Home, Work)"
                      className="mb-2"
                    />
                    <div className="relative">
                      <div className="flex gap-2">
                        <Input
                          value={newLocation}
                          onChange={(e) => handleLocationInputChange(e.target.value)}
                          placeholder="Enter your address"
                          className="flex-1"
                        />
                        {newLocation && (
                          <Button 
                            size="icon" 
                            variant="ghost" 
                            className="absolute right-12 top-0"
                            onClick={() => {
                              setNewLocation('');
                              setSuggestions([]);
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                        <Button size="icon" onClick={() => fetchCoordinatesFromAddress(newLocation)}>
                          <Search className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      {suggestions.length > 0 && (
                        <div className="absolute w-full z-10 mt-1 bg-white rounded-md shadow-lg border">
                          <Command>
                            <CommandGroup>
                              {suggestions.map((suggestion) => (
                                <CommandItem
                                  key={suggestion.place_id}
                                  onSelect={() => handleSelectSuggestion(suggestion)}
                                  className="cursor-pointer p-2"
                                >
                                  <MapPin className="h-4 w-4 mr-2 text-primary" />
                                  <div>
                                    <p className="font-medium">{suggestion.main_text}</p>
                                    <p className="text-sm text-gray-500">{suggestion.secondary_text}</p>
                                  </div>
                                </CommandItem>
                              ))}
                            </CommandGroup>
                            {isSearching && (
                              <div className="flex items-center justify-center p-2">
                                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                <span className="text-sm">Searching...</span>
                              </div>
                            )}
                            {!isSearching && suggestions.length === 0 && newLocation.length >= 3 && (
                              <div className="p-2 text-center text-sm text-gray-500">
                                No locations found
                              </div>
                            )}
                          </Command>
                        </div>
                      )}
                    </div>
                    <Button 
                      variant="outline" 
                      onClick={() => setShowMap(true)}
                      className="flex items-center gap-2"
                    >
                      <MapPin className="h-4 w-4" />
                      Select on map
                    </Button>
                    <div className="flex space-x-2 mt-2">
                      <Button onClick={addLocation}>Save</Button>
                      <Button variant="outline" onClick={() => {
                        setIsAdding(false);
                        setShowMap(false);
                        setSuggestions([]);
                      }}>Cancel</Button>
                    </div>
                  </div>
                ) : (
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => setIsAdding(true)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Location
                  </Button>
                )}
              </>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative">
              <Input
                value={newLocation}
                onChange={(e) => handleLocationInputChange(e.target.value)}
                placeholder="Enter your address"
              />
              {suggestions.length > 0 && (
                <div className="absolute w-full z-10 mt-1 bg-white rounded-md shadow-lg border">
                  <Command>
                    <CommandGroup>
                      {suggestions.map((suggestion) => (
                        <CommandItem
                          key={suggestion.place_id}
                          onSelect={() => handleSelectSuggestion(suggestion)}
                          className="cursor-pointer p-2"
                        >
                          <MapPin className="h-4 w-4 mr-2 text-primary" />
                          <div>
                            <p className="font-medium">{suggestion.main_text}</p>
                            <p className="text-sm text-gray-500">{suggestion.secondary_text}</p>
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                    {isSearching && (
                      <div className="flex items-center justify-center p-2">
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        <span className="text-sm">Searching...</span>
                      </div>
                    )}
                  </Command>
                </div>
              )}
            </div>
            <Button 
              variant="outline" 
              onClick={() => setShowMap(true)}
              className="flex items-center gap-2 w-full"
            >
              <MapPin className="h-4 w-4" />
              Select on map
            </Button>
            <Button onClick={() => handleSelectLocation(newLocation)}>Confirm Location</Button>
          </div>
        )}
      </DialogContent>

      <Sheet open={showMap} onOpenChange={setShowMap}>
        <SheetContent className="w-full sm:max-w-none md:max-w-xl" side="bottom">
          <SheetHeader>
            <SheetTitle>Select location on map</SheetTitle>
            <SheetDescription>Drag the pin to set your exact location</SheetDescription>
          </SheetHeader>
          <div className="mt-4">
            <div ref={mapContainer} className="w-full h-[400px] rounded-md border" />
            <div className="mt-4 text-sm">
              <p className="font-medium">Selected address:</p>
              <p className="text-muted-foreground">{newLocation}</p>
            </div>
            <div className="flex gap-2 mt-4">
              <Button onClick={() => setShowMap(false)}>Confirm location</Button>
              <Button variant="outline" onClick={() => setShowMap(false)}>Cancel</Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </Dialog>
  );
};

export default LocationModal;
