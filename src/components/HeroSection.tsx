
import React from 'react';
import { ArrowRight, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

const HeroSection: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden pt-24">
      {/* Background circles */}
      <div className="absolute top-[-5%] right-[-5%] w-96 h-96 rounded-full bg-primary/5 blur-3xl"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[30rem] h-[30rem] rounded-full bg-accent/5 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 pt-10 md:pt-20">
          <div className="flex flex-col space-y-6 md:space-y-8 md:w-1/2 z-10">
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <span className="px-4 py-1.5 text-xs font-medium bg-accent/10 text-accent rounded-full">
                Delivering in 10 minutes
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight tracking-tighter animate-fade-in" style={{ animationDelay: '0.4s' }}>
              Your Essentials,
              <br />
              <span className="text-gradient">Delivered in a Flash</span>
            </h1>
            
            <p className="text-base md:text-lg text-gray-600 max-w-lg animate-fade-in" style={{ animationDelay: '0.6s' }}>
              Get groceries, fresh produce, and everyday essentials delivered to your door in minutes. Faster, fresher, and smarter than you've ever experienced.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '0.8s' }}>
              <div className="relative w-full max-w-md">
                <Search className="absolute left-4 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for items..."
                  className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
              <button className="px-6 sm:px-8 py-3 bg-primary text-white rounded-full font-medium flex items-center justify-center group hover:bg-primary/90 transition-colors shrink-0">
                Order Now 
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 md:gap-8 text-sm text-gray-500 animate-fade-in" style={{ animationDelay: '1s' }}>
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-primary"></div>
                <span>Zero delivery fee</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-primary"></div>
                <span>10-min delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-primary"></div>
                <span>Eco-friendly</span>
              </div>
            </div>
          </div>
          
          <div className="relative md:w-1/2 h-full flex items-center justify-center z-0 mt-10 md:mt-0">
            <div className="relative w-full max-w-md aspect-square hidden md:block">
              <div className={cn(
                "absolute w-full h-full rounded-full bg-gradient-to-br from-accent/20 to-primary/20",
                "animate-pulse opacity-70"
              )}></div>
              
              <div className="absolute top-[-5%] left-[-10%] w-60 h-60 animate-float" style={{ animationDelay: '0s' }}>
                <div className="glass-card rounded-2xl p-4 transform rotate-[-5deg] shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=300&auto=format&fit=crop" 
                    alt="Fresh vegetables" 
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </div>
              
              <div className="absolute top-[25%] right-[-15%] w-48 h-48 animate-float" style={{ animationDelay: '1.5s' }}>
                <div className="glass-card rounded-2xl p-4 transform rotate-[7deg] shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1609780447631-05b93e5a88ea?q=80&w=240&auto=format&fit=crop" 
                    alt="Fresh fruits" 
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </div>
              
              <div className="absolute bottom-[-10%] left-[15%] w-40 h-40 animate-float" style={{ animationDelay: '0.7s' }}>
                <div className="glass-card rounded-2xl p-3 shadow-lg">
                  <img 
                    src="https://www.bing.com/ck/a?!&&p=128ea34187af084a44ded6366d8bc08c5d2921c1217e971acd9fd283e7d40ff3JmltdHM9MTc0MjI1NjAwMA&ptn=3&ver=2&hsh=4&fclid=02b8db3e-483b-6617-00ff-ce2649c9672a&u=a1L2ltYWdlcy9zZWFyY2g_cT1mcmVzaCUyMGJyZWFkcyUyMGltYWdlcyZGT1JNPUlRRlJCQSZpZD1GM0VCRUY3MjZBQTE0MjAyN0MxQ0M1RkQ2OUZEQUYyMEEwMUUyNjU3&ntb=1" 
                    alt="Fresh bread" 
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Mobile-only single image */}
            <div className="md:hidden w-full max-w-xs">
              <div className="glass-card rounded-2xl p-4 shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=300&auto=format&fit=crop" 
                  alt="Fresh produce" 
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
