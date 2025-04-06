
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { productModels } from '@/data/productModels';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export function MobileProductCards() {
  const cardsRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    if (!cardsRef.current) return;
    
    const cards = cardsRef.current.querySelectorAll('.product-card');
    
    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        { 
          opacity: 0, 
          y: 50 
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={cardsRef} className="py-12 lg:py-20 bg-gradient-to-b from-background to-background/50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 text-gradient">Our Smart Products</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {productModels.map((product, index) => (
            <motion.div 
              key={product.id} 
              className="product-card overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="h-full border-2 hover:border-primary/50 transition-all duration-300">
                <CardContent className="p-0">
                  <div className={cn(
                    "h-48 flex items-center justify-center text-5xl relative", 
                    index % 2 === 0 
                      ? "bg-gradient-to-br from-primary/80 to-accent" 
                      : "bg-gradient-to-br from-blue-400 to-cyan-600"
                  )}>
                    <span className="filter drop-shadow-lg">{product.icon}</span>
                    <Badge className="absolute top-3 right-3 bg-white/80 text-primary font-medium hover:bg-white/90">
                      New
                    </Badge>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 flex items-center">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 mb-3">{product.description}</p>
                    
                    <div className="mb-4 space-y-1">
                      {product.features.slice(0, 3).map((feature, i) => (
                        <div key={i} className="flex items-center text-sm text-gray-500">
                          <svg className="w-4 h-4 mr-1.5 text-primary/70" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          {feature}
                        </div>
                      ))}
                    </div>
                    
                    <Button className="w-full">Learn More</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
