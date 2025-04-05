
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const ProductCardSkeleton: React.FC = () => {
  return (
    <Card className="h-full overflow-hidden">
      <Skeleton className="w-full h-40" />
      <CardContent className="p-3 pt-2 space-y-2">
        <Skeleton className="h-4 w-3/4 mt-2" />
        <Skeleton className="h-3 w-1/2" />
        <div className="flex justify-between items-center mt-2">
          <Skeleton className="h-4 w-16" />
          <div className="flex gap-1">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-16 rounded-full" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
