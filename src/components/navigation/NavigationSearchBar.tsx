
import React from 'react';
import { Search } from 'lucide-react';

export const NavigationSearchBar = () => {
  return (
    <div className="hidden md:flex items-center space-x-1 relative px-3 py-2 bg-gray-100/80 rounded-full w-96">
      <Search className="h-4 w-4 text-gray-500" />
      <input 
        type="text" 
        placeholder="Search for items..." 
        className="bg-transparent border-0 outline-none ml-2 w-full text-sm" 
      />
    </div>
  );
};
