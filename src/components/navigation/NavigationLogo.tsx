
import React from 'react';
import { Package } from 'lucide-react';

export const NavigationLogo = () => {
  return (
    <div className="flex items-center">
      <Package className="h-8 w-8 text-primary mr-2" />
      <span className="text-xl font-bold tracking-tighter">SwiftFresh</span>
    </div>
  );
};
