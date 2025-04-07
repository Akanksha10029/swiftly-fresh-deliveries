
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useIsMobile } from '@/hooks/use-mobile';
import { InteractiveScene } from '@/components/3d/InteractiveScene';
import { MobileProductCards } from '@/components/3d/MobileProductCards';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Animations section with scroll effects
function AnimatedFeatures() {
  const featuresRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!featuresRef.current) return;
    
    const sections = featuresRef.current.querySelectorAll('.feature-item');
    
    sections.forEach((section, index) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
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
    <div ref={featuresRef} className="max-w-7xl mx-auto px-4 py-20">
      <h2 className="text-4xl font-bold text-center mb-16 heading-responsive text-gradient">Our Innovation</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="feature-item p-8 glass-card rounded-2xl">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">Swift Delivery</h3>
          <p className="text-gray-600">Get your groceries delivered within 10 minutes. Our optimized logistics make it possible.</p>
        </div>
        
        <div className="feature-item p-8 glass-card rounded-2xl">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">Fresh Guarantee</h3>
          <p className="text-gray-600">We source daily from local farms and suppliers to ensure maximum freshness.</p>
        </div>
        
        <div className="feature-item p-8 glass-card rounded-2xl">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">Smart Technology</h3>
          <p className="text-gray-600">Our AI-powered platform learns your preferences and helps you shop more efficiently.</p>
        </div>
      </div>
    </div>
  );
}

// Carousel section with automatic sliding
function FeaturedCarousel() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 text-gradient">Featured Collections</h2>
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className={`h-64 ${index % 2 === 0 ? 'bg-gradient-to-br from-primary/80 to-accent' : 'bg-gradient-to-br from-blue-400 to-cyan-600'} flex items-center justify-center`}>
                        <div className="text-white text-center p-6">
                          <span className="text-6xl block mb-4">{["🥗", "🍇", "🥑", "🍱", "🍒"][index]}</span>
                          <h3 className="text-xl font-bold">{["Seasonal Specials", "Organic Collection", "Local Farms", "Meal Prep Essentials", "Fresh Picks"][index]}</h3>
                        </div>
                      </div>
                      <div className="p-6">
                        <p className="text-gray-600 mb-4">
                          {["Limited time seasonal products at special prices.", 
                            "100% certified organic products for your health.", 
                            "Support local farmers with farm-to-table fresh produce.", 
                            "Everything you need for weekly meal preparation.", 
                            "Hand-selected fresh items delivered daily."][index]}
                        </p>
                        <Button variant="outline" className="w-full">View Collection</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
      </div>
    </section>
  );
}

// The main About page component
const About = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 overflow-x-hidden">
      <Navigation />
      
      {/* Hero Section with 3D Models */}
      <section className="pt-24 pb-16 relative">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 heading-responsive">
            Reimagining <span className="text-gradient">Grocery Delivery</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            We're combining cutting-edge technology with exceptional service to bring you the fastest, freshest grocery experience.
          </p>
          
          {/* 3D Scene with interactive controls */}
          <div className="relative z-10 mb-10">
            <InteractiveScene />
          </div>
        </div>
      </section>
      
      {/* Mobile-friendly product cards (visibility controlled by screen size) */}
      <div className="block lg:hidden">
        <MobileProductCards />
      </div>
      
      {/* Featured Collections Carousel */}
      <FeaturedCarousel />
      
      {/* Scroll-based animations section */}
      <AnimatedFeatures />
      
      {/* Mission statement with parallax effect */}
      <section className="py-20 bg-primary/5 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 heading-responsive">Our Mission</h2>
          <p className="text-xl text-gray-700 leading-relaxed">
            At SwiftFresh, we believe everyone deserves access to fresh, quality food without the wait. 
            We're on a mission to revolutionize how you shop for groceries by bringing the store to your door 
            with unprecedented speed and convenience.
          </p>
          
          <div className="mt-12 flex justify-center">
            <a href="/products" className="px-8 py-3 bg-primary text-white rounded-full font-medium flex items-center justify-center group hover:bg-primary/90 transition-colors">
              Explore Our Products
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
        
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 transform-gpu"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-accent/5 -skew-x-12 transform-gpu"></div>
      </section>
      
      <Footer />
    </div>
  );
};

export default About;
