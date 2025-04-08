
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Search, Loader2 } from 'lucide-react';

interface AuthenticatedLocationSearchProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onDetectLocation: () => void;
  detectingLocation: boolean;
}

const AuthenticatedLocationSearch: React.FC<AuthenticatedLocationSearchProps> = ({
  searchQuery,
  onSearchChange,
  onDetectLocation,
  detectingLocation,
}) => {
  return (
    <div className="flex gap-4">
      <Button 
        variant="default" 
        className="flex-1 gap-2 bg-primary"
        onClick={onDetectLocation}
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
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search delivery location"
          className="pl-9"
        />
      </div>
    </div>
  );
};

export default AuthenticatedLocationSearch;
