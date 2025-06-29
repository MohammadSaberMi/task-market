import React, { useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MarketListItemSkeleton from './MarketListItemSkeleton';
import MarketListItem from './MarketListItem';
import { MarketItem } from './types';

interface MarketListProps {
  title: string;
  icon: React.ReactNode;
  items: MarketItem[];
  listTypePrefix: string;
  loading: boolean;
  mode?: 'sync' | 'popLayout' | 'wait';
}

const MarketList: React.FC<MarketListProps> = ({
  title,
  icon,
  items,
  listTypePrefix,
  loading,
  mode
}) => {
  const renderContent = useCallback(() => {
    if (loading) {
      return Array.from({ length: 5 }).map((_, index) => (
        <MarketListItemSkeleton key={`${listTypePrefix}-skeleton-${index}`} />
      ));
    }

    return (
      <AnimatePresence mode={mode}>
        {items.map((item, index) => (
          <MarketListItem
            key={item.id}
            item={item}
            listTypePrefix={listTypePrefix}
            index={index}
          />
        ))}
      </AnimatePresence>
    );
  }, [items, listTypePrefix, loading]);

  return (
    <div className="flex flex-col bg-box border border-gray-600 p-4 rounded-xl shadow-lg h-full">
      <h3 className="text-sm font-semibold text-[#b2a5e1] flex items-center space-x-2 mb-4">
        <span className=" py-1 px-2 bg-gray-900 flex items-center justify-center rounded-full">
          {icon}
          <span>{title}</span>
        </span>
      </h3>
      <motion.ul className="flex-1 list-none p-0 flex flex-col">
        {renderContent()}
      </motion.ul>
    </div>
  );
};

export default MarketList;
