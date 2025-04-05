
import React, { useState } from 'react';
import ProductCard, { ProductCardSkeleton } from './product-card';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/components/ui/pagination';

interface CategoryViewProps {
  categoryName: string;
  products: any[];
  isLoading?: boolean;
}

const CategoryView: React.FC<CategoryViewProps> = ({ 
  categoryName, 
  products, 
  isLoading = false 
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;
  
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);
  
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{categoryName}</h2>
        {!isLoading && (
          <span className="text-sm text-gray-500">
            {products.length} products
          </span>
        )}
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-6">
        {isLoading ? (
          // Show skeleton cards while loading
          Array(6).fill(0).map((_, index) => (
            <ProductCardSkeleton key={`skeleton-${index}`} />
          ))
        ) : (
          // Show actual product cards
          currentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
      
      {!isLoading && totalPages > 1 && (
        <Pagination className="my-8">
          <PaginationContent>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink 
                  isActive={currentPage === page}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default CategoryView;
