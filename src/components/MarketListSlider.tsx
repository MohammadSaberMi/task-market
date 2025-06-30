'use client';
import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MarketItem } from '@/components/types';
import MarketList from './MarketList';
import { createSliderItems, SliderItem } from './MarketSliderIcons';
import {
  MarketListSliderNavButton,
  MarketListSliderPagination
} from './MarketListSliderControls';

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
  const sliderWrapperRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);

  const sliderItems: SliderItem[] = createSliderItems(
    hotList,
    newCoinsList,
    topGainersList
  );

  useEffect(() => {
    if (sliderWrapperRef.current) {
      setCardWidth(sliderWrapperRef.current.offsetWidth);
    }
  }, []);

  const goToSlide = (index: number) => {
    const clamped = Math.max(0, Math.min(index, sliderItems.length - 1));
    setCurrentIndex(clamped);
  };

  return (
    <div className="relative w-full overflow-hidden md:hidden">
      <div ref={sliderWrapperRef} className="overflow-hidden">
        <motion.div
          className="flex"
          drag="x"
          dragConstraints={{
            left: -cardWidth * (sliderItems.length - 1),
            right: 0
          }}
          onDragEnd={(e, info) => {
            const velocityX = info.velocity.x;
            const offsetX = info.offset.x;

            if (offsetX < -50 || velocityX < -500) {
              goToSlide(currentIndex + 1);
            } else if (offsetX > 50 || velocityX > 500) {
              goToSlide(currentIndex - 1);
            } else {
              goToSlide(currentIndex);
            }
          }}
          animate={{
            x: -currentIndex * cardWidth
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {sliderItems.map((item, index) => (
            <div key={index} className="min-w-full px-4 flex-shrink-0">
              <MarketList
                mode="sync"
                title={item.type}
                icon={item.icon}
                items={item.data.slice(0, 5)}
                listTypePrefix={item.prefix}
                loading={loading}
              />
            </div>
          ))}
        </motion.div>
      </div>

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
          <MarketListSliderPagination
            count={sliderItems.length}
            current={currentIndex}
            onClick={goToSlide}
          />
        </>
      )}
    </div>
  );
};

export default MarketListSlider;
