
import React from 'react';

interface ProductCardDetailsProps {
  product: any;
}

export const ProductCardDetails: React.FC<ProductCardDetailsProps> = ({ product }) => {
  return (
    <>
      <h3 className="font-medium text-sm line-clamp-2 mb-1">{product.name}</h3>
      <p className="text-xs text-gray-500 mb-2">{product.quantity}</p>
    </>
  );
};
