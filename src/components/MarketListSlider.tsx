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
    function updateCardWidth() {
      if (sliderWrapperRef.current) {
        setCardWidth(sliderWrapperRef.current.clientWidth);
      }
    }
    updateCardWidth();

    window.addEventListener('resize', updateCardWidth);
    return () => window.removeEventListener('resize', updateCardWidth);
  }, []);

  const goToSlide = (index: number) => {
    const clamped = Math.max(0, Math.min(index, sliderItems.length - 1));
    setCurrentIndex(clamped);
  };
  const SWIPE_THRESHOLD = 5;
  const DIRECTION_THRESHOLD = 0.2;
  return (
    <div className="relative w-full overflow-hidden md:hidden">
      <div
        ref={sliderWrapperRef}
        className="overflow-hidden"
        style={{ paddingTop: '8px', boxSizing: 'border-box' }}
      >
        <motion.div
          className="flex"
          drag="x"
          dragConstraints={{
            left: -cardWidth * (sliderItems.length - 1),
            right: 0
          }}
          //          onDragEnd={(e, info) => {
          //            const absOffsetX = Math.abs(info.offset.x);
          //            const absOffsetY = Math.abs(info.offset.y);
          //
          //            if (
          //              absOffsetX > SWIPE_THRESHOLD &&
          //              absOffsetX / absOffsetY > DIRECTION_THRESHOLD
          //            ) {
          //              if (info.offset.x < 0 && currentIndex < sliderItems.length - 1) {
          //                goToSlide(currentIndex + 1);
          //              } else if (info.offset.x > 0 && currentIndex > 0) {
          //                goToSlide(currentIndex - 1);
          //              } else {
          //                goToSlide(currentIndex);
          //              }
          //            } else {
          //              goToSlide(currentIndex);
          //            }
          //          }}
          onDragEnd={(e, info) => {
            const absOffsetX = Math.abs(info.offset.x);
            const absOffsetY = Math.abs(info.offset.y);

            if (
              absOffsetX > SWIPE_THRESHOLD &&
              absOffsetX / (absOffsetY || 1) > DIRECTION_THRESHOLD
            ) {
              if (info.offset.x < 0 && currentIndex < sliderItems.length - 1) {
                goToSlide(currentIndex + 1);
              } else if (info.offset.x > 0 && currentIndex > 0) {
                goToSlide(currentIndex - 1);
              } else {
                goToSlide(currentIndex);
              }
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
