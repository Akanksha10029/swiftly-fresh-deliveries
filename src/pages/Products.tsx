
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ProductCategories from '@/components/products/ProductCategories';
import CategoryProducts from '@/components/products/CategoryProducts';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

const Products: React.FC = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  
  // Default to showing all categories if no specific category is selected
  const [activeCategory, setActiveCategory] = useState<string | undefined>(category);

  const handleCategoryChange = (category: string) => {
    navigate(`/products/${category}`);
    setActiveCategory(category);
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/')}
            className="text-gray-600 hover:text-primary mr-2"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Home
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold">
            {activeCategory ? `${activeCategory}` : 'All Products'}
          </h1>
        </div>

        {/* Display all categories at the top */}
        <ProductCategories 
          activeCategory={activeCategory} 
          onCategoryChange={handleCategoryChange} 
        />
        
        {/* Display products from the selected category */}
        <CategoryProducts category={activeCategory} />
      </div>
      <Footer />
    </div>
  );
};

export default Products;
