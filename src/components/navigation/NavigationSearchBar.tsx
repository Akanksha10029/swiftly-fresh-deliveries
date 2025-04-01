import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '@/hooks/useDebounce';
import { allProducts } from '@/data/products';

export const NavigationSearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (debouncedSearchTerm) {
      performSearch(debouncedSearchTerm);
    } else {
      setSearchResults([]);
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearching(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const performSearch = (term: string) => {
    // Search the imported products data
    const results = allProducts
      .filter(product => 
        product.name.toLowerCase().includes(term.toLowerCase()) ||
        product.category.toLowerCase().includes(term.toLowerCase())
      )
      .slice(0, 5); // Limit to 5 results
    
    setSearchResults(results);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
      setIsSearching(false);
      setSearchTerm('');
    }
  };

  const handleProductClick = (productId: string) => {
    setIsSearching(false);
    setSearchTerm('');
    navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <div ref={searchRef} className="hidden md:block relative">
      <form onSubmit={handleSearch} className="flex items-center space-x-1 relative px-3 py-2 bg-gray-100/80 rounded-full w-96">
        <Search className="h-4 w-4 text-gray-500" />
        <input 
          type="text" 
          placeholder="Search for items..." 
          className="bg-transparent border-0 outline-none ml-2 w-full text-sm" 
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            if (e.target.value) {
              setIsSearching(true);
            } else {
              setIsSearching(false);
            }
          }}
          onFocus={() => {
            if (searchTerm) {
              setIsSearching(true);
            }
          }}
        />
        {searchTerm && (
          <button 
            type="button" 
            onClick={() => {
              setSearchTerm('');
              setIsSearching(false);
            }}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </form>
      
      {isSearching && searchResults.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg z-20 overflow-hidden">
          {searchResults.map((product) => (
            <div 
              key={product.id}
              className="p-3 hover:bg-gray-50 cursor-pointer border-b last:border-0"
              onClick={() => handleProductClick(product.id)}
            >
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-md bg-gray-100 flex-shrink-0 mr-3">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
                <div>
                  <p className="font-medium text-sm">{product.name}</p>
                  <p className="text-xs text-gray-500">{product.category}</p>
                </div>
              </div>
            </div>
          ))}
          
          <div className="p-2 bg-gray-50">
            <button 
              onClick={handleSearch}
              className="w-full text-center text-sm text-primary hover:underline py-1"
            >
              See all results for "{searchTerm}"
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
