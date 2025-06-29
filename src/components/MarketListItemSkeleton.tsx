import React from 'react';

const MarketListItemSkeleton: React.FC = () => (
  <li className="flex items-center justify-between py-3 border-zinc-700 last:border-b-0 animate-pulse">
    <div className="flex items-center space-x-3 w-1/2">
      <div className="w-8 h-8 bg-zinc-700 rounded-full"></div>
      <div>
        <div className="h-4 bg-zinc-700 rounded w-24 mb-1"></div>
        <div className="h-3 bg-zinc-700 rounded w-16"></div>
      </div>
    </div>
    <div className="flex flex-col items-end w-1/2">
      <div className="h-4 bg-zinc-700 rounded w-20 mb-1"></div>
      <div className="h-3 bg-zinc-700 rounded w-12"></div>
    </div>
  </li>
);

export default MarketListItemSkeleton;
