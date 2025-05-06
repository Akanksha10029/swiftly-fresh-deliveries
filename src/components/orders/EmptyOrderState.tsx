
import React from 'react';
import { Link } from 'react-router-dom';
import { Package } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const EmptyOrderState: React.FC = () => {
  return (
    <div className="text-center py-12 bg-gray-50 rounded-lg">
      <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
      <p className="text-gray-500 mb-6">You haven't placed any orders yet.</p>
      <Button asChild>
        <Link to="/products">Start Shopping</Link>
      </Button>
    </div>
  );
};
