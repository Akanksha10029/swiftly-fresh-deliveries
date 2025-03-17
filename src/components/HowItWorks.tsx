
import React from 'react';
import { MapPin, ShoppingBag, Timer, Check } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: <MapPin className="h-8 w-8 text-white" />,
      title: "Set Your Location",
      description: "Enter your address to find stores near you for the fastest delivery."
    },
    {
      icon: <ShoppingBag className="h-8 w-8 text-white" />,
      title: "Select Your Items",
      description: "Browse categories or search for specific products you need."
    },
    {
      icon: <Timer className="h-8 w-8 text-white" />,
      title: "Receive in Minutes",
      description: "Your order arrives at your door in 10 minutes or less, guaranteed."
    },
    {
      icon: <Check className="h-8 w-8 text-white" />,
      title: "Enjoy & Reorder",
      description: "Rate your experience and easily reorder your favorites next time."
    }
  ];

  return (
    <div className="py-20 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
            Simple, <span className="text-gradient">Seamless</span> Process
          </h2>
          <p className="text-gray-600 text-lg">
            Getting what you need has never been easier. Our process is designed for speed and convenience.
          </p>
        </div>
        
        <div className="relative">
          {/* Connection line */}
          <div className="absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 hidden md:block"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center text-center opacity-0"
                style={{ 
                  animation: 'fade-in 0.6s ease-out forwards',
                  animationDelay: `${index * 0.15}s`
                }}
              >
                <div className="mb-6 p-4 bg-primary rounded-full inline-flex items-center justify-center relative z-10">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
