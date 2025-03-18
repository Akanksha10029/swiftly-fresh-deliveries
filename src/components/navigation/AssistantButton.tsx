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
  return <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
      {showAssistant && <div className="bg-white p-4 rounded-xl shadow-lg mb-2 animate-scale-in">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-medium">AI Shopping Assistant</h4>
            <button onClick={onToggleAssistant}>
              <X className="h-4 w-4" />
            </button>
          </div>
          <p className="text-sm text-gray-600 mb-3">Hi there! How can I help with your shopping today?</p>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="text-xs">
              Reorder Previous Items
            </Button>
            <Button size="sm" variant="outline" className="text-xs">
              Track My Order
            </Button>
          </div>
        </div>}
      
      <Button className="rounded-full shadow-lg bg-red-500 hover:bg-red-600" onClick={onToggleAssistant}>
        {showAssistant ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
      </Button>
      
      <Button className="rounded-full shadow-lg bg-red-500 hover:bg-red-600 mx-[50px] px-[14px] py-0 my-0">
        <Siren className="h-5 w-5" />
      </Button>
    </div>;
};