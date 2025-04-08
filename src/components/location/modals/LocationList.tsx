
import React from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, Loader2 } from 'lucide-react';

interface Location {
  id: string;
  name: string;
  address: string;
  is_default: boolean;
}

interface LocationListProps {
  locations: Location[];
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  onSelectLocation: (address: string) => void;
  onMakeDefault: (locationId: string) => void;
  onRetry: () => void;
  onAddNewLocation: (query: string) => void;
}

const LocationList: React.FC<LocationListProps> = ({
  locations,
  isLoading,
  error,
  searchQuery,
  onSelectLocation,
  onMakeDefault,
  onRetry,
  onAddNewLocation
}) => {
  const filteredLocations = locations.filter(location => 
    location.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    location.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="flex flex-col items-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
          <p className="text-gray-600">Loading locations...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="text-center py-4">
        <p className="text-red-500 mb-2">{error}</p>
        <Button onClick={onRetry} variant="outline">Try Again</Button>
      </div>
    );
  }
  
  if (filteredLocations.length > 0) {
    return (
      <div className="max-h-[300px] overflow-y-auto bg-gray-50 rounded-lg p-2">
        {filteredLocations.map((location) => (
          <div
            key={location.id}
            className="flex items-center justify-between p-3 bg-white rounded-lg hover:bg-gray-50 mb-2 cursor-pointer"
            onClick={() => onSelectLocation(location.address)}
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
                  onMakeDefault(location.id);
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
    );
  } 
  
  if (searchQuery) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500 mb-4">No locations match "{searchQuery}"</p>
        <Button onClick={() => onAddNewLocation(searchQuery)}>
          Add "{searchQuery}" as a new location
        </Button>
      </div>
    );
  } 
  
  if (locations.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500 mb-4">You haven't saved any locations yet</p>
        <p className="text-sm text-gray-400 mb-4">
          Save locations for faster checkout in the future
        </p>
      </div>
    );
  }
  
  return null;
};

export default LocationList;
