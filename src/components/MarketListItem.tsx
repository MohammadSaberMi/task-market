import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { MarketItem } from '@/components/types';
import { getListItemVariants } from '@/utils/animationConfig';
import PriceDisplay from './PriceDisplay';

interface MarketItemProps {
  item: MarketItem;
  listTypePrefix: string;
  index: number;
}

const MarketListItem: React.FC<MarketItemProps> = React.memo(
  ({ item, listTypePrefix, index }) => {
    const priceColor = item.change24h >= 0 ? 'text-green-500' : 'text-red-500';
    const changePrefix = item.change24h >= 0 ? '+' : '';
    const uniqueLayoutId = `${listTypePrefix}${item.id}`;

    return (
      <motion.li
        layoutId={uniqueLayoutId}
        layout
        {...getListItemVariants(index)}
        className="relative flex items-center justify-between text-sm border-zinc-700 last:border-b-0 group"
      >
        <div className="relative mt-1 flex items-center justify-between rounded-xl p-2">
          <Image
            src={item.icon}
            alt={item.name}
            width={32}
            height={32}
            className="object-cover bg-center mr-5 ring ring-gray-600 rounded-full border-0 hover:scale-110 w-8 h-8 transition-all duration-200 ease-in"
          />
          <div>
            <p className="flex flex-col [@media(min-width:410px)]:flex-row sm:font-medium md:font-semibold text-zinc-200 ">
              <span>{item.name}</span>
              <span className="pl-1 text-zinc-400">{item.symbol}</span>
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end w-1/2">
          <p className="font-semibold text-zinc-200">
            <PriceDisplay price={item.price} />
          </p>
          <p className={`text-sm ${priceColor}`}>
            {changePrefix}
            {item.change24h}%
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="hidden sm:flex absolute -right-9 top-1/2 -translate-y-1/2 bg-indigo-500 rounded-lg p-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.5 8.34003H14.9C15.79 8.34003 16.5 9.06 16.5 9.94V11.71"
              stroke="#e7eaef"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9.19 6.65997L7.5 8.34003L9.19 10.03"
              stroke="#e7eaef"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16.5 15.66H9.10001C8.21001 15.66 7.5 14.94 7.5 14.06V12.29"
              stroke="#e7eaef"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14.8101 17.34L16.5001 15.66L14.8101 13.97"
              stroke="#e7eaef"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              stroke="#e7eaef"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.button>
      </motion.li>
    );
  }
);

MarketListItem.displayName = 'MarketListItem';

export default MarketListItem;
