
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { categories } from '@/data/categories';
import { allProducts } from '@/data/products';

interface CategoryProductsProps {
  category?: string;
}

const CategoryProducts: React.FC<CategoryProductsProps> = ({ category }) => {
  // If no category specified, show products from all categories
  const productsToShow = category 
    ? allProducts.filter(product => product.category === category)
    : allProducts;
  
  // Group products by category for the "All Products" view
  const productsByCategory = categories.map(cat => ({
    category: cat,
    products: allProducts.filter(product => product.category === cat.id).slice(0, 6) // Only show 6 products per category
  }));

  if (category) {
    // If a specific category is selected, show products from just that category
    const categoryData = categories.find(c => c.id === category);
    
    if (!categoryData) {
      return <div>Category not found</div>;
    }
    
    return (
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{categoryData.name}</h2>
          <Link to={`/products/${category}`} className="text-primary text-sm flex items-center">
            See all <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {productsToShow.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    );
  }

  // If no specific category is selected, show products grouped by categories
  return (
    <div className="space-y-10">
      {productsByCategory.map(({ category, products }) => {
        if (products.length === 0) return null;
        
        return (
          <div key={category.id}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{category.name}</h2>
              <Link to={`/products/${category.id}`} className="text-primary text-sm flex items-center">
                See all <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

interface ProductCardProps {
  product: typeof allProducts[0];
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-3 aspect-square relative">
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
          className="w-full h-full object-contain" 
        />
      </div>
      <CardContent className="p-3 pt-2">
        <h3 className="font-medium text-sm line-clamp-2 mb-1">{product.name}</h3>
        <p className="text-xs text-gray-500 mb-2">{product.quantity}</p>
        <div className="flex justify-between items-center">
          <p className="font-bold">₹{product.price}</p>
          <button className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
            Add
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryProducts;
