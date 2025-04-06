
import React from 'react';
import { Package } from 'lucide-react';
import { Link } from 'react-router-dom';

export const NavigationLogo = () => {
  return (
    <Link to="/about" className="flex items-center">
      <Package className="h-8 w-8 text-primary mr-2" />
      <span className="text-xl font-bold tracking-tighter">SwiftFresh</span>
    </Link>
  );
};
