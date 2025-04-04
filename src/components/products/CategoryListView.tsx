
import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from './ProductCard';

interface CategoryListViewProps {
  categories: {
    id: string;
    name: string;
  }[];
  productsByCategory: {
    category: {
      id: string;
      name: string;
    };
    products: any[];
  }[];
}

const CategoryListView: React.FC<CategoryListViewProps> = ({ categories, productsByCategory }) => {
  const [showAllProducts, setShowAllProducts] = useState<Record<string, boolean>>({});

  const toggleShowAll = (categoryId: string) => {
    setShowAllProducts(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const getDisplayedProducts = (categoryId: string, products: any[]) => {
    return showAllProducts[categoryId] ? products : products.slice(0, 9);
  };

  return (
    <div className="space-y-10">
      {productsByCategory.map(({ category, products }) => {
        if (products.length === 0) return null;
        
        const displayedProducts = getDisplayedProducts(category.id, products);
        
        return (
          <div key={category.id}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{category.name}</h2>
              <div className="flex items-center">
                <span className="text-sm text-gray-500 mr-4">
                  {products.length} products
                </span>
                {products.length > 9 && (
                  <Button 
                    variant="ghost" 
                    className="text-primary flex items-center"
                    onClick={() => toggleShowAll(category.id)}
                  >
                    {showAllProducts[category.id] ? 'Show less' : 'See all'} 
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {displayedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryListView;
