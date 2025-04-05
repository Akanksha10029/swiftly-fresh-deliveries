
import React from 'react';
import { Button } from '@/components/ui/button';
import { Clock, Check } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';

interface EmergencyDialogProps {
  product: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isEmergencyInCart: boolean;
  isAddingEmergency: boolean;
  onAddAsEmergency: () => void;
}

export const EmergencyDialog: React.FC<EmergencyDialogProps> = ({
  product,
  open,
  onOpenChange,
  isEmergencyInCart,
  isAddingEmergency,
  onAddAsEmergency
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Emergency Delivery</DialogTitle>
          <DialogDescription>
            Get this item delivered within 15-30 minutes
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-gray-700 mb-4">
            Add <span className="font-semibold">{product.name}</span> as an emergency item? 
            This will prioritize delivery within 15-30 minutes.
          </p>
          <div className="p-3 bg-red-50 rounded-lg flex items-center gap-3 mb-4">
            <Clock className="h-5 w-5 text-red-500" />
            <p className="text-sm">Express delivery with higher priority</p>
          </div>
        </div>
        <DialogFooter className="flex gap-2 sm:justify-between">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            className={`${isEmergencyInCart || isAddingEmergency ? 'bg-red-700 hover:bg-red-800' : 'bg-red-500 hover:bg-red-600'}`} 
            onClick={onAddAsEmergency}
            disabled={isAddingEmergency}
          >
            {isAddingEmergency ? (
              <Check className="h-4 w-4" />
            ) : isEmergencyInCart ? (
              "Already Added"
            ) : (
              "Add as Emergency"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
