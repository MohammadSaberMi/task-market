import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, animate, useSpring } from 'framer-motion';
import { MarketItem } from '@/components/types';
import MarketListItemSkeleton from './MarketListItemSkeleton';
import MarketList from './MarketList';

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

  const icons = {
    star: (
      <svg
        className="pr-1"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.7299 3.50989L15.4899 7.02989C15.7299 7.51989 16.3699 7.98989 16.9099 8.07989L20.0999 8.60989C22.1399 8.94989 22.6199 10.4299 21.1499 11.8899L18.6699 14.3699C18.2499 14.7899 18.0199 15.5999 18.1499 16.1799L18.8599 19.2499C19.4199 21.6799 18.1299 22.6199 15.9799 21.3499L12.9899 19.5799C12.4499 19.2599 11.5599 19.2599 11.0099 19.5799L8.01991 21.3499C5.87991 22.6199 4.57991 21.6699 5.13991 19.2499L5.84991 16.1799C5.97991 15.5999 5.74991 14.7899 5.32991 14.3699L2.84991 11.8899C1.38991 10.4299 1.85991 8.94989 3.89991 8.60989L7.08991 8.07989C7.61991 7.98989 8.25991 7.51989 8.49991 7.02989L10.2599 3.50989C11.2199 1.59989 12.7799 1.59989 13.7299 3.50989Z"
          stroke="#b2a5e1"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),

    top: (
      <svg
        className="pr-1"
        width="21"
        height="21"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.49994 15.2499C7.30994 15.2499 7.11994 15.1799 6.96994 15.0299C6.67994 14.7399 6.67994 14.2599 6.96994 13.9699L10.1699 10.7699C10.3299 10.6099 10.5399 10.5299 10.7699 10.5499C10.9899 10.5699 11.1899 10.6899 11.3199 10.8799L12.4099 12.5199L15.9599 8.96994C16.2499 8.67994 16.7299 8.67994 17.0199 8.96994C17.3099 9.25994 17.3099 9.73994 17.0199 10.0299L12.8199 14.2299C12.6599 14.3899 12.4499 14.4699 12.2199 14.4499C11.9999 14.4299 11.7999 14.3099 11.6699 14.1199L10.5799 12.4799L8.02994 15.0299C7.87994 15.1799 7.68994 15.2499 7.49994 15.2499Z"
          fill="#b2a5e1"
        />
        <path
          d="M16.5 12.25C16.09 12.25 15.75 11.91 15.75 11.5V10.25H14.5C14.09 10.25 13.75 9.91 13.75 9.5C13.75 9.09 14.09 8.75 14.5 8.75H16.5C16.91 8.75 17.25 9.09 17.25 9.5V11.5C17.25 11.91 16.91 12.25 16.5 12.25Z"
          fill="#b2a5e1"
        />
        <path
          d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H15C20.43 1.25 22.75 3.57 22.75 9V15C22.75 20.43 20.43 22.75 15 22.75ZM9 2.75C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V9C21.25 4.39 19.61 2.75 15 2.75H9Z"
          fill="#b2a5e1"
        />
      </svg>
    ),

    hot: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 26 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.0003 22C8.21386 22 4.33366 18.4183 4.33366 14C4.33366 8 13.0003 2 13.0003 2C13.4209 4.48692 13.8328 5.82158 15.167 8C16.468 7.4449 16.792 7 17.3337 5.75C19.5003 8 21.667 11 21.667 14C21.667 18.4183 17.7868 22 13.0003 22Z"
          stroke="#b2a5e1"
          stroke-width="1.5"
          stroke-linejoin="round"
        />
      </svg>
    )
  };

  const sliderItems = [
    {
      type: 'Hot List',
      data: hotList,
      prefix: 'hot-',
      icon: icons.hot
    },
    {
      type: 'New Coins',
      data: newCoinsList,
      prefix: 'new-',
      icon: icons.star
    },
    {
      type: 'Top Gainers',
      data: topGainersList,
      prefix: 'top-',
      icon: icons.top
    }
  ];
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
