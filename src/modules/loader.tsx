import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface Props {
  count: number;
}

const Loader: React.FC<Props> = ({ count }) => {
  return (
    <div className="flex flex-col space-y-2">
      {Array(count)
        .fill('')
        .map((_, i) => (
          <Skeleton key={i} className="h-6 w-full" />
        ))}
    </div>
  );
};

export default Loader;
