
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { productModels } from '@/data/productModels';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion } from 'framer-motion';

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
    <div ref={cardsRef} className="py-12 lg:py-20">
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
                    "h-48 flex items-center justify-center text-5xl", 
                    index % 2 === 0 
                      ? "bg-gradient-to-br from-primary/80 to-accent" 
                      : "bg-gradient-to-br from-blue-400 to-cyan-600"
                  )}>
                    <span className="filter drop-shadow-lg">{product.icon}</span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                    <p className="text-gray-600 mb-3">{product.description}</p>
                    <p className="text-sm text-gray-500 mb-4">{product.longDescription.substring(0, 100)}...</p>
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
