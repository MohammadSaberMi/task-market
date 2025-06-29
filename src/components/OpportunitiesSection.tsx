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

const OpportunitiesSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null) as React.RefObject<HTMLElement>;
  const isSectionVisible = useElementVisible(sectionRef, { threshold: 0.1 });
  const isMobile = useIsMobile();
  const { hotList, newCoinsList, topGainersList, loading } =
    useMarketData(isSectionVisible);

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
        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-zinc-800 text-zinc-300 rounded-full text-sm font-medium border border-zinc-700 shadow-md">
          {/*<span className="w-2 h-2 bg-green-500 rounded-full"></span>*/}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 14.69C6.59 14.69 6.25 14.35 6.25 13.94V10.73C6.25 10.32 6.59 9.97998 7 9.97998C7.41 9.97998 7.75 10.32 7.75 10.73V13.94C7.75 14.36 7.41 14.69 7 14.69Z"
              fill="#e6e9ee"
            />
            <path
              d="M12 16.43C11.59 16.43 11.25 16.09 11.25 15.68V9C11.25 8.59 11.59 8.25 12 8.25C12.41 8.25 12.75 8.59 12.75 9V15.68C12.75 16.09 12.41 16.43 12 16.43Z"
              fill="#e6e9ee"
            />
            <path
              d="M17 14.69C16.59 14.69 16.25 14.35 16.25 13.94V10.73C16.25 10.32 16.59 9.97998 17 9.97998C17.41 9.97998 17.75 10.32 17.75 10.73V13.94C17.75 14.36 17.41 14.69 17 14.69Z"
              fill="#e6e9ee"
            />
            <path
              d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H15C20.43 1.25 22.75 3.57 22.75 9V15C22.75 20.43 20.43 22.75 15 22.75ZM9 2.75C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V9C21.25 4.39 19.61 2.75 15 2.75H9Z"
              fill="#e6e9ee"
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
