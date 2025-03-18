
import React from 'react';
import { Pill, ShoppingBasket, Home, Siren, Utensils, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const CategoryCard = ({ 
  icon: Icon, 
  title, 
  description, 
  color 
}: { 
  icon: React.ElementType; 
  title: string; 
  description: string; 
  color: string;
}) => {
  return (
    <div className={cn(
      "relative flex flex-col items-center p-4 sm:p-6 rounded-2xl overflow-hidden transition-all hover:-translate-y-1",
      "bg-white shadow-md hover:shadow-lg border border-gray-100",
      "min-h-[160px] sm:min-h-[180px] group",
    )}>
      <div className={cn(
        "absolute top-0 left-0 right-0 h-1 transition-all group-hover:h-1.5",
        color
      )} />
      <div className={cn(
        "rounded-full p-3 mb-3 sm:mb-4",
        "bg-primary/10"
      )}>
        <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
      </div>
      <h3 className="text-base sm:text-lg font-semibold mb-1 text-center">{title}</h3>
      <p className="text-xs sm:text-sm text-gray-500 text-center mb-3 sm:mb-4 line-clamp-2">{description}</p>
      <Button variant="outline" size="sm" className="mt-auto text-xs sm:text-sm">
        Explore
      </Button>
    </div>
  );
};

const CategoriesSection = () => {
  const categories = [
    {
      icon: ShoppingBasket,
      title: "Groceries",
      description: "Fresh produce & essentials",
      color: "bg-emerald-500"
    },
    {
      icon: Pill,
      title: "Pharmacy",
      description: "Medicines & healthcare",
      color: "bg-cyan-500"
    },
    {
      icon: Home,
      title: "Home Services",
      description: "Cleaning & maintenance",
      color: "bg-amber-500"
    },
    {
      icon: Siren,
      title: "Emergency Needs",
      description: "24/7 urgent supplies",
      color: "bg-red-500"
    },
    {
      icon: Utensils,
      title: "Meal Kits & Recipes",
      description: "Ready-to-cook ingredients",
      color: "bg-indigo-500"
    },
    {
      icon: Briefcase,
      title: "Office Supplies",
      description: "Stationery & essentials",
      color: "bg-purple-500"
    }
  ];

  return (
    <div className="bg-gray-50 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-2">What do you need today?</h2>
        <p className="text-gray-600 text-center mb-8 sm:mb-10">Get everything delivered in minutes</p>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {categories.map((category, index) => (
            <CategoryCard
              key={index}
              icon={category.icon}
              title={category.title}
              description={category.description}
              color={category.color}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesSection;
