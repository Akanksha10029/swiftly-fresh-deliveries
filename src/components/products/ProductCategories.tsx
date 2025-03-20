
import React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { categories } from '@/data/categories';

interface ProductCategoriesProps {
  activeCategory?: string;
  onCategoryChange: (category: string) => void;
}

const ProductCategories: React.FC<ProductCategoriesProps> = ({ 
  activeCategory, 
  onCategoryChange 
}) => {
  return (
    <div className="mb-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-10 gap-3 overflow-x-auto pb-4">
        {categories.map((category) => (
          <Card 
            key={category.id}
            className={cn(
              "flex flex-col items-center p-3 cursor-pointer transition-all hover:shadow-md",
              activeCategory === category.id ? "border-primary border-2" : "border"
            )}
            onClick={() => onCategoryChange(category.id)}
          >
            <div className="w-16 h-16 mb-2 overflow-hidden rounded">
              <img 
                src={category.image} 
                alt={category.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-xs text-center font-medium line-clamp-2">
              {category.name}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductCategories;
