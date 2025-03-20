
import React, { useState } from 'react';
import { MessageCircle, X, Siren } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AIAssistant from '@/components/assistant/AIAssistant';
import { useNavigate } from 'react-router-dom';

interface AssistantButtonProps {
  showAssistant: boolean;
  onToggleAssistant: () => void;
}

export const AssistantButton = ({
  showAssistant,
  onToggleAssistant
}: AssistantButtonProps) => {
  const [showChatModal, setShowChatModal] = useState(false);
  const navigate = useNavigate();

  const handleEmergencyClick = () => {
    navigate('/products/emergency');
  };

  return (
    <div className="fixed z-50 bottom-6 right-6">
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
            <Button 
              size="sm" 
              variant="outline" 
              className="text-xs"
              onClick={() => {
                setShowChatModal(true);
                onToggleAssistant();
              }}
            >
              Chat with AI Assistant
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="text-xs"
              onClick={() => navigate('/orders')}
            >
              Track My Order
            </Button>
          </div>
        </div>
      )}
      
      <div className="flex gap-2 sm:gap-4 items-center">
        <Button 
          className="rounded-full shadow-lg bg-primary hover:bg-primary/90 h-12 w-12 p-0"
          onClick={onToggleAssistant}
        >
          {showAssistant ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
        </Button>
        
        <Button 
          className="rounded-full shadow-lg bg-red-500 hover:bg-red-600 h-12 w-12 p-0"
          onClick={handleEmergencyClick}
        >
          <Siren className="h-5 w-5" />
        </Button>
      </div>
      
      {showChatModal && (
        <AIAssistant isOpen={true} onClose={() => setShowChatModal(false)} />
      )}
    </div>
  );
};
