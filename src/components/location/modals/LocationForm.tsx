
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { Loader2, Check } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';

export interface LocationFormValues {
  address: string;
  additionalDetails: string;
}

interface LocationFormProps {
  form: UseFormReturn<LocationFormValues>;
  onSubmit: (data: LocationFormValues) => void;
  onCancel: () => void;
  isAdding: boolean;
}

const LocationForm: React.FC<LocationFormProps> = ({ 
  form, 
  onSubmit, 
  onCancel, 
  isAdding 
}) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Your address" />
              </FormControl>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="additionalDetails"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Details</FormLabel>
              <FormControl>
                <Textarea 
                  {...field} 
                  placeholder="Apartment number, landmark, etc." 
                  className="min-h-[80px]"
                />
              </FormControl>
            </FormItem>
          )}
        />
        
        <div className="flex gap-2">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            className="flex-1"
            disabled={isAdding}
          >
            {isAdding ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Check className="h-4 w-4 mr-2" />
            )}
            Confirm Location
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default LocationForm;
