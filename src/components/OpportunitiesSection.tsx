'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useMarketData } from '@/hooks/useMarketData';
import MarketList from './MarketList';
import MarketListSlider from './MarketListSlider';
import {
  buttonVariants,
  descriptionVariants,
  textVariants
} from '@/utils/animationConfig';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useElementVisible } from '@/utils/useElementVisible';
import { createSliderItems, SliderItem } from './MarketSliderIcons';

const OpportunitiesSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null) as React.RefObject<HTMLElement>;
  const isSectionVisible = useElementVisible(sectionRef, { threshold: 0.1 });
  const isMobile = useIsMobile();
  const { hotList, newCoinsList, topGainersList, loading } =
    useMarketData(isSectionVisible);

  const sliderItems: SliderItem[] = createSliderItems(
    hotList,
    newCoinsList,
    topGainersList
  );
  return (
    <section
      ref={sectionRef}
      className="relative w-full py-16 md:py-24 overflow-hidden bg-background-color flex flex-col items-center px-4"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-8 md:mb-12"
      >
        <div
          className="inline-flex items-center space-x-2 px-2 py-1  bg-zinc-800/10
        text-zinc-300 rounded-full text-sm font-medium border-2 border-zinc-700 shadow-md"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 14.69C6.59 14.69 6.25 14.35 6.25 13.94V10.73C6.25 10.32 6.59 9.97998 7 9.97998C7.41 9.97998 7.75 10.32 7.75 10.73V13.94C7.75 14.36 7.41 14.69 7 14.69Z"
              fill="#9195dd"
            />
            <path
              d="M12 16.43C11.59 16.43 11.25 16.09 11.25 15.68V9C11.25 8.59 11.59 8.25 12 8.25C12.41 8.25 12.75 8.59 12.75 9V15.68C12.75 16.09 12.41 16.43 12 16.43Z"
              fill="#9195dd"
            />
            <path
              d="M17 14.69C16.59 14.69 16.25 14.35 16.25 13.94V10.73C16.25 10.32 16.59 9.97998 17 9.97998C17.41 9.97998 17.75 10.32 17.75 10.73V13.94C17.75 14.36 17.41 14.69 17 14.69Z"
              fill="#9195dd"
            />
            <path
              d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H15C20.43 1.25 22.75 3.57 22.75 9V15C22.75 20.43 20.43 22.75 15 22.75ZM9 2.75C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V9C21.25 4.39 19.61 2.75 15 2.75H9Z"
              fill="#9195dd"
            />
          </svg>

          <span>New opportunities</span>
        </div>
      </motion.div>

      <div className="text-center mb-6 md:mb-8 max-w-3xl">
        <motion.h1
          className="text-2xl md:text-4xl text-[#666EF0] font-black leading-tight"
          variants={textVariants}
          initial="hidden"
          animate="visible"
        >
          TRADE <span className="text-white">YOUR FAVOURITE MARKETS</span>
        </motion.h1>
      </div>

      <div className="text-center mb-10 md:mb-16 max-w-2xl text-sm md:text-md text-zinc-400 leading-relaxed">
        <motion.p
          variants={descriptionVariants}
          initial="hidden"
          animate="visible"
        >
          Want to buy Bitcoin outright or trade CFDs on Gold or EUR/USD? We got
          you covered with access to 100+ global markets on one platform.
        </motion.p>
      </div>

      <motion.button
        variants={buttonVariants}
        initial="initial"
        animate="animate"
        className="flex items-center justify-center px-5 py-2 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-lg shadow-lg transition-colors duration-300 mb-16 md:mb-24"
      >
        View All coins <span className="ml-2">→</span>
      </motion.button>

      <div className="w-full h-[100vh] mx-auto max-w-6xl">
        {isMobile ? (
          <MarketListSlider
            hotList={hotList}
            newCoinsList={newCoinsList}
            topGainersList={topGainersList}
            loading={loading}
          />
        ) : (
          <div className="hidden md:grid md:grid-cols-2 xl:grid-cols-3 md:gap-5 xl:gap-8">
            {sliderItems.map((item) => (
              <MarketList
                key={item.type}
                mode="popLayout"
                title={item.type}
                icon={item.icon}
                items={item.data.slice(0, 5)}
                listTypePrefix={item.prefix}
                loading={loading}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default OpportunitiesSection;
