
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Search, Loader2 } from 'lucide-react';

interface LocationDetectionProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onDetectLocation: () => void;
  onAddDetails: () => void;
  detectingLocation: boolean;
  isAuthenticated: boolean;
  onSignIn: () => void;
}

const LocationDetection: React.FC<LocationDetectionProps> = ({
  searchQuery,
  onSearchChange,
  onDetectLocation,
  onAddDetails,
  detectingLocation,
  isAuthenticated,
  onSignIn
}) => {
  return (
    <div className="space-y-4 py-4">
      <Button 
        variant="default" 
        className="w-full gap-2"
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
      
      <div className="flex items-center justify-center gap-4">
        <div className="border-t border-gray-200 flex-1"></div>
        <span className="text-gray-400 text-sm">OR</span>
        <div className="border-t border-gray-200 flex-1"></div>
      </div>
      
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Enter your full address"
          className="pl-9"
        />
      </div>
      
      {searchQuery.trim() && (
        <Button
          onClick={onAddDetails}
          className="w-full"
        >
          Add Details
        </Button>
      )}
      
      {!isAuthenticated && (
        <div className="text-center mt-4">
          <p className="text-sm text-gray-500">
            Sign in to save your locations for faster checkout
          </p>
          <Button
            variant="outline"
            className="mt-2"
            onClick={onSignIn}
          >
            Sign In
          </Button>
        </div>
      )}
    </div>
  );
};

export default LocationDetection;
