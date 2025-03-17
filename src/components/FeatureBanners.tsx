
import React from 'react';
import { Button } from '@/components/ui/button';

const FeatureBanners = () => {
  return (
    <div className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pharmacy Banner */}
          <div className="relative overflow-hidden rounded-2xl h-64 bg-cyan-500 flex flex-col justify-center px-8">
            <div className="absolute top-0 right-0 w-32 h-32 -mt-8 -mr-8 bg-cyan-400 rounded-full opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 -mb-8 -ml-8 bg-cyan-600 rounded-full opacity-30"></div>
            <h3 className="text-2xl font-bold text-white mb-2 z-10">
              Pharmacy at your doorstep!
            </h3>
            <p className="text-white/90 mb-4 z-10">
              Cough syrups, pain relief sprays & more
            </p>
            <Button className="bg-white text-cyan-600 hover:bg-white/90 w-fit z-10">
              Order Now
            </Button>
          </div>
          
          {/* Pet Care Banner */}
          <div className="relative overflow-hidden rounded-2xl h-64 bg-amber-400 flex flex-col justify-center px-8">
            <div className="absolute top-0 right-0 w-32 h-32 -mt-8 -mr-8 bg-amber-300 rounded-full opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 -mb-8 -ml-8 bg-amber-500 rounded-full opacity-30"></div>
            <h3 className="text-2xl font-bold text-white mb-2 z-10">
              Pet Care supplies in minutes
            </h3>
            <p className="text-white/90 mb-4 z-10">
              Food, treats, toys & more
            </p>
            <Button className="bg-white text-amber-600 hover:bg-white/90 w-fit z-10">
              Order Now
            </Button>
          </div>
          
          {/* Baby Care Banner */}
          <div className="relative overflow-hidden rounded-2xl h-64 bg-sky-200 flex flex-col justify-center px-8">
            <div className="absolute top-0 right-0 w-32 h-32 -mt-8 -mr-8 bg-sky-100 rounded-full opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 -mb-8 -ml-8 bg-sky-300 rounded-full opacity-30"></div>
            <h3 className="text-2xl font-bold text-slate-700 mb-2 z-10">
              No time for a diaper run?
            </h3>
            <p className="text-slate-600 mb-4 z-10">
              Get baby care essentials in minutes
            </p>
            <Button className="bg-slate-700 hover:bg-slate-800 w-fit z-10">
              Order Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureBanners;
