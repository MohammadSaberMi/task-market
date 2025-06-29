import { useState, useEffect, useCallback } from 'react';
import {
  initialMarketData,
  simulateMarketDataUpdate
} from '@/components/data/mockMarketData';
import { MarketItem } from '@/components/types';

interface MarketLists {
  hotList: MarketItem[];
  newCoinsList: MarketItem[];
  topGainersList: MarketItem[];
}

export const useMarketData = (isSectionVisible: boolean) => {
  const [lists, setLists] = useState<MarketLists>({
    hotList: [],
    newCoinsList: [],
    topGainersList: []
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLists({
        hotList: initialMarketData.slice(0, 5),
        newCoinsList: initialMarketData.slice(5, 9),
        topGainersList: initialMarketData.slice(9, 13)
      });
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const updateLists = useCallback(() => {
    setLists((prev) => ({
      hotList: [...simulateMarketDataUpdate(prev.hotList)].sort(
        (a, b) => b.change24h - a.change24h
      ),
      newCoinsList: simulateMarketDataUpdate(prev.newCoinsList),
      topGainersList: [...simulateMarketDataUpdate(prev.topGainersList)].sort(
        (a, b) => b.change24h - a.change24h
      )
    }));
  }, []);

  useEffect(() => {
    if (!isSectionVisible || loading) return;

    const interval = setInterval(updateLists, 3000);
    return () => clearInterval(interval);
  }, [isSectionVisible, loading, updateLists]);

  return { ...lists, loading };
};
