
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Plus, Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { categories } from '@/data/categories';
import { allProducts } from '@/data/products';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/components/ui/pagination';

interface CategoryProductsProps {
  category?: string;
}

const CategoryProducts: React.FC<CategoryProductsProps> = ({ category }) => {
  const [showAllProducts, setShowAllProducts] = useState<Record<string, boolean>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;
  
  // Filter products by category if specified
  const productsToShow = category 
    ? allProducts.filter(product => product.category === category)
    : allProducts;
  
  // Calculate pagination for a specific category
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productsToShow.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(productsToShow.length / productsPerPage);
  
  // Group products by category for the "All Products" view
  const productsByCategory = categories.map(cat => ({
    category: cat,
    products: allProducts.filter(product => product.category === cat.id)
  }));

  const toggleShowAll = (categoryId: string) => {
    setShowAllProducts(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const getDisplayedProducts = (categoryId: string, products: any[]) => {
    return showAllProducts[categoryId] ? products : products.slice(0, 9);
  };

  if (category) {
    // If a specific category is selected, show products from just that category with pagination
    const categoryData = categories.find(c => c.id === category);
    
    if (!categoryData) {
      return <div>Category not found</div>;
    }
    
    return (
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{categoryData.name}</h2>
          <span className="text-sm text-gray-500">
            {productsToShow.length} products
          </span>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-6">
          {currentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {totalPages > 1 && (
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
  }

  // If no specific category is selected, show products grouped by categories
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

interface ProductCardProps {
  product: typeof allProducts[0];
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, cartItems } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  
  const isInCart = cartItems.some(item => item.id === product.id);
  
  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product);
    
    setTimeout(() => {
      setIsAdding(false);
    }, 1000);
  };
  
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
          <Button 
            size="sm"
            onClick={handleAddToCart}
            variant={isInCart || isAdding ? "default" : "outline"}
            className={`rounded-full h-8 px-3 ${isInCart || isAdding ? 'bg-green-600 hover:bg-green-700' : 'border-green-600 text-green-600 hover:bg-green-50'}`}
          >
            {isAdding ? (
              <Check className="h-4 w-4" />
            ) : isInCart ? (
              "Added"
            ) : (
              <>
                <Plus className="h-4 w-4 mr-1" />
                Add
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryProducts;
