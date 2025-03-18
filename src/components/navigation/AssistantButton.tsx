
import React from 'react';
import { MessageCircle, X, Siren } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AssistantButtonProps {
  showAssistant: boolean;
  onToggleAssistant: () => void;
}

export const AssistantButton = ({
  showAssistant,
  onToggleAssistant
}: AssistantButtonProps) => {
  return (
    <div className="fixed z-50 bottom-6 md:right-6 right-20">
      {showAssistant && (
        <div className="bg-white p-4 rounded-xl shadow-lg mb-2 animate-scale-in max-w-[280px] md:max-w-[320px]">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-medium">AI Shopping Assistant</h4>
            <button onClick={onToggleAssistant}>
              <X className="h-4 w-4" />
            </button>
          </div>
          <p className="text-sm text-gray-600 mb-3">Hi there! How can I help with your shopping today?</p>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="outline" className="text-xs">
              Reorder Previous Items
            </Button>
            <Button size="sm" variant="outline" className="text-xs">
              Track My Order
            </Button>
          </div>
        </div>
      )}
      
      <div className="flex gap-2 sm:gap-4 items-center">
        <Button 
          className="rounded-full shadow-lg bg-red-500 hover:bg-red-600 h-10 w-10 p-0"
          onClick={onToggleAssistant}
        >
          {showAssistant ? <X className="h-4 w-4" /> : <MessageCircle className="h-4 w-4" />}
        </Button>
        
        <Button className="rounded-full shadow-lg bg-red-500 hover:bg-red-600 h-10 w-10 p-0">
          <Siren className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
