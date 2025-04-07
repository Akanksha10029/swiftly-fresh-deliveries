
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Plus, Loader2 } from 'lucide-react';
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
  const [newLocation, setNewLocation] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated && isOpen && user?.id) {
      fetchLocations();
    }
  }, [isAuthenticated, isOpen, user?.id]);

  const fetchLocations = async () => {
    setIsLoading(true);
    setError(null);
    
    console.log('Fetching locations in modal, user ID:', user?.id);
    
    try {
      if (!user?.id) {
        console.log('No user ID found');
        throw new Error('User ID not found');
      }
      
      const { data, error } = await supabase
        .from('saved_locations')
        .select('*')
        .eq('user_id', user.id)
        .order('is_default', { ascending: false });
        
      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      console.log('Locations fetched successfully:', data);
      setLocations(data || []);
      
    } catch (error: any) {
      console.error('Error fetching locations:', error);
      setError(error.message);
      toast({
        title: 'Error fetching locations',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addLocation = async () => {
    if (!newLocation.trim()) return;
    
    try {
      if (!user?.id) {
        throw new Error('User ID not found');
      }
      
      console.log('Adding new location:', newLocation);
      
      const isFirstLocation = locations.length === 0;
      
      const { error } = await supabase
        .from('saved_locations')
        .insert([
          {
            user_id: user.id,
            name: 'Home',
            address: newLocation,
            is_default: isFirstLocation,
          },
        ]);
        
      if (error) {
        console.error('Error adding location:', error);
        throw error;
      }
      
      toast({
        title: 'Location added',
        description: 'Your location has been saved.',
      });
      
      // If this is the first location, select it automatically
      if (isFirstLocation) {
        onSelectLocation(newLocation);
      }
      
      setNewLocation('');
      setIsAdding(false);
      fetchLocations();
      
    } catch (error: any) {
      console.error('Error in addLocation:', error);
      toast({
        title: 'Error adding location',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleSelectLocation = (address: string) => {
    console.log('Location selected in modal:', address);
    onSelectLocation(address);
    onClose();
  };

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
              <div className="flex flex-col items-center justify-center py-6">
                <Loader2 className="h-6 w-6 animate-spin text-primary mb-2" />
                <p>Loading locations...</p>
              </div>
            ) : error ? (
              <div className="text-center py-4 text-red-500">
                <p>{error}</p>
                <Button variant="outline" className="mt-2" onClick={fetchLocations}>
                  Try Again
                </Button>
              </div>
            ) : locations.length === 0 ? (
              <div className="text-center py-4">
                <p className="mb-4">You don't have any saved locations yet.</p>
                {!isAdding && (
                  <Button 
                    variant="outline" 
                    onClick={() => setIsAdding(true)}
                    className="mx-auto"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Location
                  </Button>
                )}
              </div>
            ) : (
              <div className="max-h-[300px] overflow-y-auto">
                {locations.map((location) => (
                  <div
                    key={location.id}
                    className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50 mb-2"
                    onClick={() => handleSelectLocation(location.address)}
                  >
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                      <div>
                        <p className="font-medium">{location.name}</p>
                        <p className="text-sm text-gray-500 break-words">{location.address}</p>
                      </div>
                    </div>
                    {location.is_default && (
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded flex-shrink-0 ml-2">Default</span>
                    )}
                  </div>
                ))}
              </div>
            )}
            
            {!isAdding && locations.length > 0 && (
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => setIsAdding(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Location
              </Button>
            )}
            
            {isAdding && (
              <div className="flex flex-col space-y-2">
                <Input
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  placeholder="Enter your address"
                />
                <div className="flex space-x-2">
                  <Button onClick={addLocation}>Save</Button>
                  <Button variant="outline" onClick={() => setIsAdding(false)}>Cancel</Button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <Input
              value={newLocation}
              onChange={(e) => setNewLocation(e.target.value)}
              placeholder="Enter your address"
            />
            <Button onClick={() => handleSelectLocation(newLocation)}>Confirm Location</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LocationModal;
