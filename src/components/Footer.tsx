
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Linkedin, ArrowRight, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          {/* Company section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-secondary mb-4">Company</h3>
            <ul className="space-y-2">
              {['About', 'Careers', 'Blog', 'Press', 'Leadership', 'Values', 'Sustainability'].map((item) => (
                <li key={item}>
                  <Link 
                    to="/" 
                    className="text-gray-600 hover:text-primary transition-colors duration-200 flex items-center group"
                  >
                    <span>{item}</span>
                    <ArrowRight className="w-3 h-3 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Consumers section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-secondary mb-4">For Consumers</h3>
            <ul className="space-y-2">
              {['Privacy', 'Terms', 'FAQs', 'Security', 'Mobile App', 'Contact Us', 'Help Center'].map((item) => (
                <li key={item}>
                  <Link 
                    to="/" 
                    className="text-gray-600 hover:text-primary transition-colors duration-200 flex items-center group"
                  >
                    <span>{item}</span>
                    <ArrowRight className="w-3 h-3 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Partners section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-secondary mb-4">For Partners</h3>
            <ul className="space-y-2">
              {['Franchise', 'Seller', 'Warehouse', 'Deliver', 'Partner', 'Become a Partner', 'Affiliate Program'].map((item) => (
                <li key={item}>
                  <Link 
                    to="/" 
                    className="text-gray-600 hover:text-primary transition-colors duration-200 flex items-center group"
                  >
                    <span>{item}</span>
                    <ArrowRight className="w-3 h-3 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Us section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-secondary mb-4">Follow Us</h3>
            <div className="flex flex-wrap gap-3">
              {[
                { icon: <Instagram className="h-5 w-5" />, label: "Instagram" },
                { icon: <Facebook className="h-5 w-5" />, label: "Facebook" },
                { icon: <Twitter className="h-5 w-5" />, label: "Twitter" },
                { icon: <Linkedin className="h-5 w-5" />, label: "LinkedIn" }
              ].map((social) => (
                <a 
                  key={social.label}
                  href="#" 
                  className="bg-gray-200 hover:bg-primary hover:text-white text-gray-600 p-3 rounded-full transition-colors duration-300"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
            
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Contact Us</h4>
              <div className="space-y-2">
                <a href="tel:+1234567890" className="text-gray-600 hover:text-primary flex items-center gap-2 transition-colors duration-200">
                  <Phone className="h-4 w-4" />
                  <span>+1 (234) 567-890</span>
                </a>
                <a href="mailto:support@swiftfresh.com" className="text-gray-600 hover:text-primary flex items-center gap-2 transition-colors duration-200">
                  <Mail className="h-4 w-4" />
                  <span>support@swiftfresh.com</span>
                </a>
              </div>
            </div>
          </div>

          {/* Download App section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-secondary mb-4">Download App</h3>
            <div className="space-y-3">
              <a 
                href="#" 
                className="block hover:opacity-80 transition-opacity duration-200"
                aria-label="Download on Google Play"
              >
                <img 
                  src="/lovable-uploads/2edb9da2-b44e-46c4-8a92-222aceb9c29e.png" 
                  alt="Get it on Google Play"
                  className="h-10 object-contain"
                />
              </a>
              <a 
                href="#" 
                className="block hover:opacity-80 transition-opacity duration-200"
                aria-label="Download on App Store"
              >
                <img 
                  src="/lovable-uploads/2edb9da2-b44e-46c4-8a92-222aceb9c29e.png"
                  alt="Download on the App Store"
                  className="h-10 object-contain"
                />
              </a>
            </div>

            <div className="p-4 bg-primary/10 rounded-lg mt-5">
              <h4 className="text-sm font-medium text-primary mb-2">Subscribe to our newsletter</h4>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <button className="bg-primary text-white px-4 rounded-r-md hover:bg-primary/90 transition-colors">
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal divider */}
        <div className="h-px bg-gray-200 my-8"></div>

        {/* Copyright section */}
        <div className="text-sm text-gray-500">
          <p>
            By continuing past this page you agree to our <Link to="/" className="text-primary hover:underline">Terms</Link>, 
            <Link to="/" className="text-primary hover:underline"> Cookie policy</Link> and 
            <Link to="/" className="text-primary hover:underline"> Privacy policy</Link>. 
            All trademarks are properties of their respective owners. © Swift Fresh 
            {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
