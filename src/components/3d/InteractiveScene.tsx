
import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  Environment, 
  OrbitControls, 
  Float, 
  Html,
  ContactShadows,
  useProgress,
  Stars,
  PresentationControls
} from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { useIsMobile } from '@/hooks/use-mobile';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { productModels, ProductModel } from '@/data/productModels';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm rounded-lg p-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-2"></div>
        <p className="text-primary font-medium">{progress.toFixed(0)}% loaded</p>
      </div>
    </Html>
  );
}

interface ModelProps {
  product: ProductModel;
  setHovered: (id: string | null) => void;
  hovered: string | null;
  setSelected: (id: string | null) => void;
}

function useCursor() {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursor({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return cursor;
}

function SmartCube({ product, setHovered, hovered, setSelected }: ModelProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const isHovered = hovered === product.id;
  const cursor = useCursor();
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3;
      
      const time = state.clock.getElapsedTime();
      meshRef.current.position.y = Math.sin(time) * 0.2 + product.position[1];
      
      if (isHovered) {
        gsap.to(meshRef.current.rotation, {
          x: cursor.y * 0.2,
          z: -cursor.x * 0.2,
          duration: 0.5
        });
      }
    }
  });

  return (
    <group 
      position={product.position as [number, number, number]} 
      onPointerOver={() => setHovered(product.id)}
      onPointerOut={() => setHovered(null)}
      onClick={() => setSelected(product.id)}
    >
      <mesh 
        ref={meshRef}
        scale={isHovered ? 1.2 : 1}
      >
        <boxGeometry args={[1.2, 1.2, 1.2]} />
        <meshStandardMaterial 
          color={product.color} 
          metalness={0.1} 
          roughness={0.3}
          emissive={isHovered ? product.color : "#000000"}
          emissiveIntensity={isHovered ? 0.3 : 0}
        />
        
        <Html position={[0, 0, 0.61]} transform scale={0.2} rotation-x={0} rotation-y={0} rotation-z={0} center>
          <div className="w-40 h-40 flex items-center justify-center text-white text-7xl">
            {product.icon}
          </div>
        </Html>
      </mesh>
      
      {isHovered && (
        <Html position={[0, -1, 0]} center distanceFactor={15}>
          <div className="bg-background/90 backdrop-blur-md p-2 rounded-lg shadow-lg border border-primary/20 w-28 scale-75">
            <h3 className="text-primary font-bold text-sm">{product.name}</h3>
            <p className="text-xs text-muted-foreground line-clamp-2">{product.description}</p>
          </div>
        </Html>
      )}
    </group>
  );
}

function FreshProduce({ product, setHovered, hovered, setSelected }: ModelProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const isHovered = hovered === product.id;
  const cursor = useCursor();
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
      meshRef.current.rotation.z += delta * 0.1;
      
      const time = state.clock.getElapsedTime();
      meshRef.current.position.y = Math.sin(time * 0.8) * 0.2 + product.position[1];
      
      if (isHovered) {
        gsap.to(meshRef.current.rotation, {
          x: cursor.y * 0.3,
          z: -cursor.x * 0.3,
          duration: 0.5
        });
      }
    }
  });

  return (
    <group 
      position={product.position as [number, number, number]} 
      onPointerOver={() => setHovered(product.id)}
      onPointerOut={() => setHovered(null)}
      onClick={() => setSelected(product.id)}
    >
      <mesh 
        ref={meshRef}
        scale={isHovered ? 1.2 : 1}
      >
        <sphereGeometry args={[0.9, 32, 32]} />
        <meshStandardMaterial 
          color={product.color} 
          metalness={0.1} 
          roughness={0.2}
          emissive={isHovered ? product.color : "#000000"}
          emissiveIntensity={isHovered ? 0.3 : 0}
        />
        
        <Html position={[0, 0, 0]} transform scale={0.15} rotation-x={0} rotation-y={0} rotation-z={0} center>
          <div className="w-40 h-40 flex items-center justify-center text-white text-7xl">
            {product.icon}
          </div>
        </Html>
      </mesh>
      
      {isHovered && (
        <Html position={[0, -1.5, 0]} center distanceFactor={15}>
          <div className="bg-background/90 backdrop-blur-md p-2 rounded-lg shadow-lg border border-primary/20 w-28 scale-75">
            <h3 className="text-primary font-bold text-sm">{product.name}</h3>
            <p className="text-xs text-muted-foreground line-clamp-2">{product.description}</p>
          </div>
        </Html>
      )}
    </group>
  );
}

function Laptop({ product, setHovered, hovered, setSelected }: ModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const screenRef = useRef<THREE.Group>(null);
  const isHovered = hovered === product.id;
  const cursor = useCursor();
  const { clock } = useThree();
  
  useFrame((state) => {
    if (groupRef.current && screenRef.current) {
      const time = clock.getElapsedTime();
      groupRef.current.position.y = Math.sin(time * 0.6) * 0.15 + product.position[1];
      
      groupRef.current.rotation.y += 0.002;
      
      const openAmount = Math.min(Math.max((Math.sin(time * 0.2) + 1) / 2, 0), 1);
      screenRef.current.rotation.x = -Math.PI/6 + (Math.PI/2.5) * openAmount;
      
      if (isHovered) {
        gsap.to(groupRef.current.rotation, {
          x: cursor.y * 0.1,
          z: -cursor.x * 0.1,
          duration: 0.5
        });
      }
    }
  });

  return (
    <group 
      ref={groupRef}
      position={product.position as [number, number, number]} 
      rotation={[0.1, 0, 0]}
      onPointerOver={() => setHovered(product.id)}
      onPointerOut={() => setHovered(null)}
      onClick={() => setSelected(product.id)}
      scale={isHovered ? 1.2 : 1}
    >
      <mesh position={[0, -0.1, 0]}>
        <boxGeometry args={[2, 0.1, 1.5]} />
        <meshStandardMaterial 
          color="#888888" 
          metalness={0.8} 
          roughness={0.2} 
          emissive={isHovered ? "#888888" : "#000000"}
          emissiveIntensity={isHovered ? 0.2 : 0}
        />
      </mesh>
      
      <mesh position={[0, -0.03, 0]}>
        <boxGeometry args={[1.8, 0.01, 1.3]} />
        <meshStandardMaterial color="#444444" />
      </mesh>
      
      <group position={[0, 0, -0.7]} rotation={[-Math.PI/6, 0, 0]} ref={screenRef}>
        <mesh position={[0, 0.6, 0]}>
          <boxGeometry args={[2, 1.2, 0.05]} />
          <meshStandardMaterial 
            color="#222222" 
            metalness={0.7} 
            roughness={0.3}
            emissive={isHovered ? "#222222" : "#000000"}
            emissiveIntensity={isHovered ? 0.1 : 0}
          />
        </mesh>
        
        <mesh position={[0, 0.6, 0.03]}>
          <boxGeometry args={[1.9, 1.1, 0.01]} />
          <meshStandardMaterial 
            color={product.color} 
            emissive={product.color} 
            emissiveIntensity={0.8} 
            metalness={0.9} 
            roughness={0.1} 
          />
          
          <Html position={[0, 0, 0.01]} transform scale={0.13} rotation-x={0} rotation-y={0} rotation-z={0} center>
            <div className="w-[300px] h-[200px] flex flex-col items-center justify-center bg-primary/20 text-primary rounded-md">
              <div className="text-3xl mb-2">{product.icon}</div>
              <h3 className="text-lg font-bold">{product.name}</h3>
            </div>
          </Html>
        </mesh>
      </group>
      
      {isHovered && (
        <Html position={[0, -1, 0]} center distanceFactor={15}>
          <div className="bg-background/90 backdrop-blur-md p-2 rounded-lg shadow-lg border border-primary/20 w-28 scale-75">
            <h3 className="text-primary font-bold text-sm">{product.name}</h3>
            <p className="text-xs text-muted-foreground line-clamp-2">{product.description}</p>
          </div>
        </Html>
      )}
    </group>
  );
}

function Smartphone({ product, setHovered, hovered, setSelected }: ModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const isHovered = hovered === product.id;
  const cursor = useCursor();
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      groupRef.current.position.y = Math.sin(time * 0.7) * 0.15 + product.position[1];
      
      groupRef.current.rotation.y += delta * 0.03;
      
      if (isHovered) {
        gsap.to(groupRef.current.rotation, {
          x: cursor.y * 0.3,
          y: -cursor.x * 0.5,
          duration: 0.5
        });
      } else {
        gsap.to(groupRef.current.rotation, {
          x: cursor.y * 0.05,
          y: -cursor.x * 0.1 + time * 0.03,
          duration: 1
        });
      }
    }
  });

  return (
    <group 
      ref={groupRef}
      position={product.position as [number, number, number]} 
      onPointerOver={() => setHovered(product.id)}
      onPointerOut={() => setHovered(null)}
      onClick={() => setSelected(product.id)}
      scale={isHovered ? 1.2 : 1}
    >
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.7, 1.5, 0.08]} />
        <meshStandardMaterial 
          color="#111111" 
          metalness={0.8} 
          roughness={0.2}
          emissive={isHovered ? "#111111" : "#000000"}
          emissiveIntensity={isHovered ? 0.2 : 0}
        />
      </mesh>
      
      <mesh position={[0, 0, 0.04]}>
        <boxGeometry args={[0.65, 1.4, 0.01]} />
        <meshStandardMaterial 
          color={product.color} 
          emissive={product.color} 
          emissiveIntensity={0.5} 
          metalness={0.9} 
          roughness={0.1} 
        />
        
        <Html position={[0, 0, 0.01]} transform scale={0.08} rotation-x={0} rotation-y={0} rotation-z={0} center>
          <div className="w-[150px] h-[300px] flex flex-col items-center justify-center bg-primary/10 text-primary rounded-md">
            <div className="text-3xl mb-2">{product.icon}</div>
            <h3 className="text-lg font-bold">{product.name}</h3>
          </div>
        </Html>
      </mesh>
      
      <mesh position={[0.2, 0.5, -0.05]}>
        <cylinderGeometry args={[0.1, 0.1, 0.1, 16]} />
        <meshStandardMaterial color="#222222" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {isHovered && (
        <Html position={[0, -1.2, 0]} center distanceFactor={15}>
          <div className="bg-background/90 backdrop-blur-md p-2 rounded-lg shadow-lg border border-primary/20 w-28 scale-75">
            <h3 className="text-primary font-bold text-sm">{product.name}</h3>
            <p className="text-xs text-muted-foreground line-clamp-2">{product.description}</p>
          </div>
        </Html>
      )}
    </group>
  );
}

function ProductDetailDialog({ selectedProduct, onClose }: { 
  selectedProduct: ProductModel | null;
  onClose: () => void;
}) {
  if (!selectedProduct) return null;

  return (
    <Dialog open={!!selectedProduct} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <span className="text-2xl">{selectedProduct.icon}</span>
            <span>{selectedProduct.name}</span>
          </DialogTitle>
          <DialogDescription className="text-base">
            {selectedProduct.description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4 space-y-6">
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-5 rounded-lg border border-primary/10">
            <p className="text-foreground/90 text-md leading-relaxed">{selectedProduct.longDescription}</p>
          </div>
          
          <div className="bg-primary/10 p-5 rounded-lg">
            <h4 className="font-medium text-lg mb-3 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Key Features
            </h4>
            <ul className="space-y-3">
              {selectedProduct.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-accent mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => onClose()}>Close</Button>
            <Button>Learn More</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function InteractiveScene() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<ProductModel | null>(null);
  const isMobile = useIsMobile();

  const handleSelectProduct = (id: string | null) => {
    if (id) {
      const product = productModels.find(p => p.id === id) || null;
      setSelectedProduct(product);
    } else {
      setSelectedProduct(null);
    }
  };

  return (
    <div className="relative h-[70vh] w-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <Suspense fallback={<Loader />}>
          <ambientLight intensity={0.6} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
          <PresentationControls 
            global 
            snap 
            zoom={0.8}
            rotation={[0, 0, 0]} 
            polar={[-Math.PI / 4, Math.PI / 4]}
            azimuth={[-Math.PI / 4, Math.PI / 4]}
          >
            <Float
              speed={2}
              rotationIntensity={0.5}
              floatIntensity={1}
            >
              <SmartCube
                product={productModels[0]}
                setHovered={setHovered}
                hovered={hovered}
                setSelected={handleSelectProduct}
              />
              <FreshProduce
                product={productModels[1]}
                setHovered={setHovered}
                hovered={hovered}
                setSelected={handleSelectProduct}
              />
              <Laptop
                product={productModels[2]}
                setHovered={setHovered}
                hovered={hovered}
                setSelected={handleSelectProduct}
              />
              <Smartphone
                product={productModels[3]}
                setHovered={setHovered}
                hovered={hovered}
                setSelected={handleSelectProduct}
              />
            </Float>
          </PresentationControls>
          <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={1.5} />
          <Environment preset="city" />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI - Math.PI / 6}
          />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        </Suspense>
      </Canvas>
      
      <div className="absolute top-4 right-4 z-10 bg-background/90 backdrop-blur-sm p-3 rounded-lg border border-primary/20 max-w-[200px]">
        <h4 className="text-sm font-medium mb-2">Explore Products:</h4>
        <div className="space-y-2">
          {productModels.map(product => (
            <Button 
              key={product.id} 
              variant="ghost" 
              size="sm"
              className="w-full justify-start text-xs p-2 h-auto"
              onClick={() => handleSelectProduct(product.id)}
            >
              <span className="mr-2">{product.icon}</span> {product.name}
            </Button>
          ))}
        </div>
      </div>
      
      {isMobile && (
        <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm p-3 rounded-lg border border-primary/20">
          <h4 className="text-sm font-medium mb-1">Tap objects to explore:</h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {productModels.map(product => (
              <Button 
                key={product.id} 
                variant="ghost" 
                size="sm"
                className="justify-start text-xs p-1 h-auto"
                onClick={() => handleSelectProduct(product.id)}
              >
                <span className="mr-1">{product.icon}</span> {product.name}
              </Button>
            ))}
          </div>
        </div>
      )}
      
      <ProductDetailDialog 
        selectedProduct={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />
    </div>
  );
}
