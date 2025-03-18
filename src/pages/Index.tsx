
import React from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import DoctorConsultation from '@/components/DoctorConsultation';
import SmartServices from '@/components/SmartServices';
import EmergencySection from '@/components/EmergencySection';
import FeaturesSection from '@/components/FeaturesSection';
import FeatureBanners from '@/components/FeatureBanners';
import CategoriesSection from '@/components/CategoriesSection';
import FeaturedOffers from '@/components/FeaturedOffers';
import SustainableSection from '@/components/SustainableSection';
import HowItWorks from '@/components/HowItWorks';
import Footer from '@/components/Footer';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <CategoriesSection />
      <FeatureBanners />
      <DoctorConsultation />
      <SmartServices />
      <EmergencySection />
      <FeaturedOffers />
      <FeaturesSection />
      <SustainableSection />
      <HowItWorks />
      <Footer />
    </div>
  );
};

export default Index;
