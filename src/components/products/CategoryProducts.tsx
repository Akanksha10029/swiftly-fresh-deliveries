
import React from 'react';
import { categories } from '@/data/categories';
import { allProducts } from '@/data/products';
import CategoryView from './CategoryView';
import CategoryListView from './CategoryListView';

interface CategoryProductsProps {
  category?: string;
}

const CategoryProducts: React.FC<CategoryProductsProps> = ({ category }) => {
  if (category) {
    const categoryData = categories.find(c => c.id === category);
    
    if (!categoryData) {
      return <div>Category not found</div>;
    }
    
    const productsToShow = allProducts.filter(product => product.category === category);
    
    return (
      <CategoryView 
        categoryName={categoryData.name} 
        products={productsToShow} 
      />
    );
  }

  const productsByCategory = categories.map(cat => ({
    category: cat,
    products: allProducts.filter(product => product.category === cat.id)
  }));

  return (
    <CategoryListView 
      categories={categories} 
      productsByCategory={productsByCategory} 
    />
  );
};

export default CategoryProducts;
