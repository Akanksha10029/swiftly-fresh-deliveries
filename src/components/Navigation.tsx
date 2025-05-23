
import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from '@/components/ui/button';
import { useScroll } from '@/hooks/use-scroll';
import { NavigationLogo } from './navigation/NavigationLogo';
import { NavigationDesktopMenu } from './navigation/NavigationDesktopMenu';
import { NavigationSearchBar } from './navigation/NavigationSearchBar';
import { NavigationActions } from './navigation/NavigationActions';
import { NavigationMobileMenu } from './navigation/NavigationMobileMenu';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const isScrolled = useScroll();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // When opening the menu, prevent body scrolling
    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 w-full transition-all duration-300 ease-in-out py-4 px-4 sm:px-6 md:px-10",
        isScrolled 
          ? "bg-white/90 backdrop-blur-lg shadow-sm" 
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <NavigationLogo />

        {!isMobile ? (
          <>
            <NavigationDesktopMenu />
            <NavigationSearchBar />
            <NavigationActions />
          </>
        ) : (
          <Button 
            variant="outline"
            size="icon"
            className="p-2"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        )}
      </div>

      {isMobile && <NavigationMobileMenu isOpen={isMenuOpen} onClose={closeMenu} />}
    </header>
  );
};

export default Navigation;
