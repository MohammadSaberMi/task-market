import React from 'react';

export const MarketListSliderNavButton: React.FC<{
  onClick: () => void;
  disabled: boolean;
  direction: 'prev' | 'next';
}> = ({ onClick, disabled, direction }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`absolute ${
      direction === 'prev' ? 'left-0 ml-0' : 'right-0 mr-0'
    } top-1/2 -translate-y-1/2 bg-zinc-500/80 hover:bg-zinc-700/80 p-2 rounded-full text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors z-10`}
    aria-label={direction === 'prev' ? 'Previous slide' : 'Next slide'}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d={direction === 'prev' ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'}
      />
    </svg>
  </button>
);

export const MarketListSliderPagination: React.FC<{
  count: number;
  current: number;
  onClick: (i: number) => void;
}> = ({ count, current, onClick }) => (
  <div className="flex justify-center mt-6 space-x-2">
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        onClick={() => onClick(i)}
        className={`w-2 h-2 rounded-full transition-colors duration-300 cursor-pointer ${
          i === current ? 'bg-blue-500' : 'bg-zinc-600'
        }`}
      />
    ))}
  </div>
);
