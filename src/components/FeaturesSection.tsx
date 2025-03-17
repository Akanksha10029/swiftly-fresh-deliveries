
import React from 'react';
import { Clock, Leaf, Zap, Truck, Star, Cpu } from 'lucide-react';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <Clock className="h-8 w-8 text-primary" />,
      title: "Superfast Delivery",
      description: "Get your essentials delivered in just 10 minutes, right when you need them most."
    },
    {
      icon: <Cpu className="h-8 w-8 text-primary" />,
      title: "AI-Powered Shopping",
      description: "Smart recommendations based on your habits, preferences, and current needs."
    },
    {
      icon: <Leaf className="h-8 w-8 text-primary" />,
      title: "Farm Fresh Produce",
      description: "Direct from local farmers to your doorstep with maximum freshness guaranteed."
    },
    {
      icon: <Truck className="h-8 w-8 text-primary" />,
      title: "Sustainable Delivery",
      description: "Eco-friendly packaging and carbon-neutral delivery options for a greener planet."
    },
    {
      icon: <Zap className="h-8 w-8 text-primary" />,
      title: "Instant Reordering",
      description: "One-tap reorder your regular essentials with our smart shopping list."
    },
    {
      icon: <Star className="h-8 w-8 text-primary" />,
      title: "Premium Quality",
      description: "Curated selection of high-quality products from trusted brands and sources."
    }
  ];

  return (
    <div className="py-20 px-6 md:px-10 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
            Experience the <span className="text-gradient">Difference</span>
          </h2>
          <p className="text-gray-600 text-lg">
            We've reimagined grocery delivery from the ground up to provide an experience that's faster, smarter, and more sustainable.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="feature-card opacity-0"
              style={{ 
                animation: 'fade-in 0.6s ease-out forwards',
                animationDelay: `${index * 0.15}s`
              }}
            >
              <div className="mb-6 p-3 inline-flex items-center justify-center rounded-xl bg-primary/10">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
