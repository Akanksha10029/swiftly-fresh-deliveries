
import React from 'react';

interface ProductCardImageProps {
  product: any;
  onViewDetails: () => void;
}

export const ProductCardImage: React.FC<ProductCardImageProps> = ({ 
  product, 
  onViewDetails 
}) => {
  return (
    <div className="p-3 aspect-square relative overflow-hidden">
      <div className="absolute top-2 left-2 z-10">
        {product.deliveryTime && (
          <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
            {product.deliveryTime}
          </span>
        )}
      </div>
      <img 
        src={product.image} 
        alt={product.name} 
        className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110" 
      />
      <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <button 
          onClick={onViewDetails}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white text-gray-900 font-medium text-sm px-4 py-2 rounded-md shadow-sm"
        >
          View product details
        </button>
      </div>
    </div>
  );
};
