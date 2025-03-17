
import React from 'react';
import { ArrowRight, Tag, Shield, Recycle, Gift } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const OfferCard = ({ 
  color, 
  icon: Icon, 
  title, 
  description, 
  buttonText 
}: { 
  color: string; 
  icon: React.ElementType; 
  title: string; 
  description: string; 
  buttonText: string;
}) => {
  return (
    <div className={cn(
      "h-full p-6 rounded-2xl overflow-hidden transition-all",
      "flex flex-col justify-between",
      color
    )}>
      <div>
        <Icon className="h-8 w-8 mb-4 text-white" />
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-white/90 mb-4">{description}</p>
      </div>
      
      <Button className="bg-white text-black hover:bg-white/90 w-fit">
        {buttonText}
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};

const FeaturedOffers = () => {
  const offers = [
    {
      color: "bg-gradient-to-br from-primary to-emerald-600",
      icon: Tag,
      title: "20% Off First Order",
      description: "Use code SWIFT20 on your first purchase to get an instant discount!",
      buttonText: "Order Now"
    },
    {
      color: "bg-gradient-to-br from-cyan-500 to-blue-600",
      icon: Shield,
      title: "Pharmacy Cashback",
      description: "Flat ₹50 cashback on medicine orders above ₹500!",
      buttonText: "Shop Medicines"
    },
    {
      color: "bg-gradient-to-br from-amber-400 to-orange-600",
      icon: Gift,
      title: "Weekend Special",
      description: "Free delivery on all orders this weekend. No minimum order value!",
      buttonText: "Explore Deals"
    },
    {
      color: "bg-gradient-to-br from-emerald-500 to-teal-700",
      icon: Recycle,
      title: "Go Green & Save",
      description: "Extra 5% off when you choose eco-friendly packaging on your order",
      buttonText: "Go Green"
    }
  ];

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Featured Offers & Deals</h2>
        <p className="text-gray-600 mb-10">Exclusive discounts just for you</p>
        
        <Carousel className="w-full">
          <CarouselContent>
            {offers.map((offer, index) => (
              <CarouselItem key={index} className="sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 h-[280px]">
                <OfferCard
                  color={offer.color}
                  icon={offer.icon}
                  title={offer.title}
                  description={offer.description}
                  buttonText={offer.buttonText}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
      </div>
    </div>
  );
};

export default FeaturedOffers;
