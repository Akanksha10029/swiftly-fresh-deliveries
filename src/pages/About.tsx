
import React, { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  Environment, 
  OrbitControls, 
  PresentationControls, 
  Float, 
  useGLTF, 
  Html,
  ContactShadows,
  useProgress,
  Stars
} from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
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

// Loading component for 3D models
function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress.toFixed(0)}% loaded</Html>;
}

// A component for a 3D grocery bag
function GroceryBag({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }: {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (meshRef.current) {
      // Add subtle floating animation
      meshRef.current.rotation.y += 0.005;
    }
  });

  // Fallback 3D object if model doesn't load
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh ref={meshRef}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#4ade80" />
      </mesh>
    </group>
  );
}

// A component for fresh produce
function FreshProduce({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }: {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.z += delta * 0.2;
    }
  });

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#34d399" metalness={0.1} roughness={0.5} />
      </mesh>
    </group>
  );
}

// A component for a 3D smartphone
function Smartphone({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }: {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      {/* Phone body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.7, 1.5, 0.08]} />
        <meshStandardMaterial color="#111111" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Phone screen */}
      <mesh position={[0, 0, 0.04]}>
        <boxGeometry args={[0.65, 1.4, 0.01]} />
        <meshStandardMaterial color="#44bbff" emissive="#1a4a6c" emissiveIntensity={0.5} metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* Camera bump */}
      <mesh position={[0.2, 0.5, -0.05]}>
        <cylinderGeometry args={[0.1, 0.1, 0.1, 16]} />
        <meshStandardMaterial color="#222222" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}

// A component for a 3D laptop
function Laptop({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }: {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      {/* Base */}
      <mesh position={[0, -0.1, 0]}>
        <boxGeometry args={[2, 0.1, 1.5]} />
        <meshStandardMaterial color="#888888" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Screen */}
      <mesh position={[0, 0.7, -0.5]} rotation={[Math.PI/6, 0, 0]}>
        <boxGeometry args={[2, 1.2, 0.05]} />
        <meshStandardMaterial color="#222222" metalness={0.7} roughness={0.3} />
      </mesh>
      
      {/* Screen display */}
      <mesh position={[0, 0.7, -0.47]} rotation={[Math.PI/6, 0, 0]}>
        <boxGeometry args={[1.9, 1.1, 0.01]} />
        <meshStandardMaterial color="#44bbff" emissive="#1a4a6c" emissiveIntensity={0.5} metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* Keyboard */}
      <mesh position={[0, -0.03, 0]}>
        <boxGeometry args={[1.8, 0.01, 1.3]} />
        <meshStandardMaterial color="#444444" />
      </mesh>
    </group>
  );
}

// The main 3D scene component with zoom controls
function ThreeDScene() {
  const [zoom, setZoom] = useState(5);
  
  const handleZoomIn = () => {
    setZoom(prev => Math.max(prev - 1, 2));
  };
  
  const handleZoomOut = () => {
    setZoom(prev => Math.min(prev + 1, 8));
  };

  return (
    <div className="relative h-[70vh] w-full">
      <Canvas camera={{ position: [0, 0, zoom], fov: 45 }}>
        <Suspense fallback={<Loader />}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
          <Float rotationIntensity={0.5}>
            <GroceryBag position={[-2.5, 0, 0]} scale={1.2} />
            <FreshProduce position={[0, 1, 0]} scale={0.7} />
            <Smartphone position={[2, 0, 0]} scale={1.5} />
            <Laptop position={[0, -1.5, 0]} scale={0.8} />
          </Float>
          <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={1.5} />
          <Environment preset="city" />
          <OrbitControls
            enableZoom={true}
            enablePan={true}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI - Math.PI / 6}
          />
          <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
        </Suspense>
      </Canvas>
      
      {/* Zoom controls */}
      <div className="absolute bottom-4 right-4 flex space-x-2">
        <Button onClick={handleZoomIn} variant="outline" size="icon" className="bg-white/80 backdrop-blur-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zoom-in"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/><line x1="11" x2="11" y1="8" y2="14"/><line x1="8" x2="14" y1="11" y2="11"/></svg>
        </Button>
        <Button onClick={handleZoomOut} variant="outline" size="icon" className="bg-white/80 backdrop-blur-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zoom-out"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/><line x1="8" x2="14" y1="11" y2="11"/></svg>
        </Button>
      </div>
    </div>
  );
}

// Interactive product showcase component
function ProductShowcase() {
  const showcaseRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!showcaseRef.current) return;
    
    const cards = showcaseRef.current.querySelectorAll('.product-card');
    
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
    <div ref={showcaseRef} className="py-20 bg-gray-50/80">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 text-gradient">Our Products</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Fresh Groceries",
              description: "Fresh produce delivered from local farms within hours of harvesting.",
              imgSrc: "bg-gradient-to-br from-green-400 to-emerald-600",
              icon: "🥦"
            },
            {
              title: "Meal Kits",
              description: "Chef-designed meal kits with pre-measured ingredients and easy recipes.",
              imgSrc: "bg-gradient-to-br from-blue-400 to-cyan-600",
              icon: "🍲"
            },
            {
              title: "Organic Pantry",
              description: "Organic, non-GMO pantry staples for your healthy lifestyle.",
              imgSrc: "bg-gradient-to-br from-amber-400 to-yellow-600",
              icon: "🌾"
            },
            {
              title: "Premium Meats",
              description: "Ethically sourced, premium quality meats and seafood.",
              imgSrc: "bg-gradient-to-br from-red-400 to-rose-600",
              icon: "🥩"
            },
            {
              title: "Healthy Snacks",
              description: "Nutritious snacks that taste great without the guilt.",
              imgSrc: "bg-gradient-to-br from-purple-400 to-indigo-600",
              icon: "🍎"
            },
            {
              title: "Specialty Drinks",
              description: "Craft beverages, premium coffee, and specialty drinks.",
              imgSrc: "bg-gradient-to-br from-teal-400 to-cyan-600",
              icon: "🍹"
            }
          ].map((product, index) => (
            <div key={index} className="product-card overflow-hidden">
              <Card className="h-full transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                <CardContent className="p-0">
                  <div className={cn("h-48 flex items-center justify-center text-5xl", product.imgSrc)}>
                    <span className="filter drop-shadow-lg">{product.icon}</span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{product.title}</h3>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    <Button className="w-full">Explore</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
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

// The main About page component
const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navigation />
      
      {/* Hero Section with 3D Models */}
      <section className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 heading-responsive">
            Reimagining <span className="text-gradient">Grocery Delivery</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            We're combining cutting-edge technology with exceptional service to bring you the fastest, freshest grocery experience.
          </p>
          
          {/* 3D Scene with interactive controls */}
          <ThreeDScene />
        </div>
      </section>
      
      {/* Product Showcase with Apple-like animations */}
      <ProductShowcase />
      
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
