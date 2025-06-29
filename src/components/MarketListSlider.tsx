import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, animate, useSpring } from 'framer-motion';
import { MarketItem } from '@/components/types';
import MarketListItemSkeleton from './MarketListItemSkeleton';
import MarketList from './MarketList';
import { createSliderItems, SliderItem } from './MarketSliderIcons';

const MarketListSliderNavButton: React.FC<{
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

const MarketListSliderPagination: React.FC<{
  count: number;
  current: number;
  onClick: (i: number) => void;
}> = ({ count, current, onClick }) => (
  <div className="flex justify-center mt-6 space-x-2">
    {Array.from({ length: count }).map((_, i) => (
      <motion.div
        key={i}
        onClick={() => onClick(i)}
        className={`w-2 h-2 rounded-full transition-colors duration-300 cursor-pointer ${
          i === current ? 'bg-blue-500' : 'bg-zinc-600'
        }`}
      />
    ))}
  </div>
);

interface MarketListSliderProps {
  hotList: MarketItem[];
  newCoinsList: MarketItem[];
  topGainersList: MarketItem[];
  loading?: boolean;
}

const MarketListSlider: React.FC<MarketListSliderProps> = ({
  hotList,
  newCoinsList,
  topGainersList,
  loading = false
}) => {
  const sliderContainerRef = useRef<HTMLDivElement>(null);
  const dummyHeightRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 30 });
  const [cardFullWidth, setCardFullWidth] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fixedContentHeight, setFixedContentHeight] = useState('400px');

  const sliderItems: SliderItem[] = createSliderItems(
    hotList,
    newCoinsList,
    topGainersList
  );
  useEffect(() => {
    const updateWidths = () => {
      if (sliderContainerRef.current) {
        setCardFullWidth(sliderContainerRef.current.clientWidth);
      }
    };
    updateWidths();
    window.addEventListener('resize', updateWidths);
    return () => window.removeEventListener('resize', updateWidths);
  }, []);

  useEffect(() => {
    if (dummyHeightRef.current) {
      setFixedContentHeight(`${dummyHeightRef.current.scrollHeight}px`);
    } else {
      setFixedContentHeight('400px');
    }
  }, [hotList, newCoinsList, topGainersList]);

  const dragConstraints = {
    left: -(cardFullWidth * (sliderItems.length - 1)),
    right: 0
  };

  const goToSlide = useCallback(
    (index: number) => {
      if (cardFullWidth === 0) return;
      const targetX = -index * cardFullWidth;
      const clampedTargetX = Math.max(
        dragConstraints.left,
        Math.min(dragConstraints.right, targetX)
      );
      animate(x, clampedTargetX, {
        type: 'spring',
        stiffness: 200,
        damping: 30
      });
      setCurrentIndex(index);
    },
    [x, cardFullWidth, dragConstraints.left, dragConstraints.right]
  );

  interface HandleDragEndInfo {
    velocity: { x: number; y: number };
  }

  type HandleDragEndEvent = MouseEvent | TouchEvent | PointerEvent;

  const handleDragEnd = useCallback(
    (_event: HandleDragEndEvent, info: HandleDragEndInfo) => {
      if (cardFullWidth === 0) return;
      const currentOffset = x.get();
      const velocity = info.velocity.x;
      const threshold = cardFullWidth * 0.2;
      let newIndex = currentIndex;

      if (
        velocity < -100 ||
        currentOffset < -(newIndex * cardFullWidth + threshold)
      ) {
        newIndex = Math.min(newIndex + 1, sliderItems.length - 1);
      } else if (
        velocity > 100 ||
        currentOffset > -(newIndex * cardFullWidth - threshold)
      ) {
        newIndex = Math.max(newIndex - 1, 0);
      }
      goToSlide(newIndex);
    },
    [x, cardFullWidth, currentIndex, sliderItems.length, goToSlide]
  );

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const unsubscribeX = x.on('change', (latestX) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (cardFullWidth === 0) return;
        const newIndex = Math.round(Math.abs(latestX) / cardFullWidth);
        const clampedNewIndex = Math.max(
          0,
          Math.min(newIndex, sliderItems.length - 1)
        );
        if (clampedNewIndex !== currentIndex) {
          setCurrentIndex(clampedNewIndex);
        }
      }, 50);
    });
    return () => {
      unsubscribeX();
      clearTimeout(timeoutId);
    };
  }, [x, cardFullWidth, currentIndex, sliderItems.length]);

  return (
    <div className="relative w-full overflow-hidden">
      <div className="relative">
        <motion.div
          ref={sliderContainerRef}
          className="flex cursor-grab md:hidden"
          style={{ x: springX }}
          drag="x"
          dragConstraints={dragConstraints}
          onDragEnd={handleDragEnd}
          dragElastic={0.2}
        >
          {sliderItems.map((listGroup) => (
            <div
              key={listGroup.type}
              className="slider-card-item flex-shrink-0 min-w-full px-4"
            >
              <div
                style={{
                  height: fixedContentHeight,
                  transition: 'height 0.3s ease-out'
                }}
              >
                <MarketList
                  mode="sync"
                  title={listGroup.type}
                  icon={listGroup.icon}
                  items={listGroup.data.slice(0, 5)}
                  listTypePrefix={listGroup.prefix}
                  loading={loading}
                />
              </div>
            </div>
          ))}

          <div
            ref={dummyHeightRef}
            style={{
              position: 'absolute',
              visibility: 'hidden',
              height: 'auto',
              width: '100%',
              padding: '1.5rem',
              top: 0,
              left: 0
            }}
          >
            <h3 className="text-lg font-semibold text-zinc-300 mb-4 flex items-center space-x-2">
              <span></span>Dummy Header
            </h3>
            <ul className="list-none p-0">
              {Array.from({ length: 5 }).map((_, idx) => (
                <MarketListItemSkeleton key={`dummy-${idx}`} />
              ))}
            </ul>
          </div>
        </motion.div>

        {sliderItems.length > 1 && (
          <>
            <MarketListSliderNavButton
              onClick={() => goToSlide(currentIndex - 1)}
              disabled={currentIndex === 0}
              direction="prev"
            />
            <MarketListSliderNavButton
              onClick={() => goToSlide(currentIndex + 1)}
              disabled={currentIndex === sliderItems.length - 1}
              direction="next"
            />
          </>
        )}
      </div>

      {sliderItems.length > 1 && (
        <MarketListSliderPagination
          count={sliderItems.length}
          current={currentIndex}
          onClick={goToSlide}
        />
      )}
    </div>
  );
};

export default MarketListSlider;
