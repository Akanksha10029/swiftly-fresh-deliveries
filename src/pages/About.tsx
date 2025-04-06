
import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, OrbitControls, useGLTF, PresentationControls, Float } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// A component for a 3D grocery bag
function GroceryBag({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }) {
  // Using a placeholder model - in production you would use your actual model path
  const { scene } = useGLTF('/placeholder.svg'); // Replace with actual model path
  const meshRef = useRef();
  
  useFrame((state) => {
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
function FreshProduce({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }) {
  const meshRef = useRef();
  
  useFrame((state, delta) => {
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

// The main 3D scene component
function ThreeDScene() {
  return (
    <div className="h-[70vh] w-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <PresentationControls
          global
          snap
          zoom={0.8}
          rotation={[0, 0, 0]}
          polar={[-Math.PI / 4, Math.PI / 4]}
          azimuth={[-Math.PI / 4, Math.PI / 4]}>
          <Float rotationIntensity={0.5}>
            <GroceryBag position={[0, 0, 0]} scale={1.5} />
            <FreshProduce position={[2, 0, 0]} scale={0.7} />
            <FreshProduce position={[-2, 0, 0]} scale={0.5} />
          </Float>
        </PresentationControls>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI - Math.PI / 4}
        />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}

// Animations section with scroll effects
function AnimatedFeatures() {
  const featuresRef = useRef();
  
  useEffect(() => {
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
      
      {/* Hero Section with 3D Model */}
      <section className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 heading-responsive">
            Reimagining <span className="text-gradient">Grocery Delivery</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            We're combining cutting-edge technology with exceptional service to bring you the fastest, freshest grocery experience.
          </p>
          
          {/* 3D Scene */}
          <ThreeDScene />
        </div>
      </section>
      
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
