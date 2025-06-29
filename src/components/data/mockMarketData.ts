import { MarketItem } from '@/components/types';
import { formatPrice } from '@/utils/formatPrice';

export const initialMarketData: MarketItem[] = [
  {
    id: 'BTC',
    name: 'Bitcoin',
    symbol: '(BTCUSDT)',
    icon: '/icons/@Wallpaper_4K3D (6931).jpg',
    price: 109481.14,
    change24h: 0.01
  },
  {
    id: 'ETH',
    name: 'Ethereum',
    symbol: '(ETHUSDT)',
    icon: '/icons/CH_Icone__VANTAGGI1-copia-2.webp',
    price: 2644.09,
    change24h: 0.5
  },
  {
    id: 'TON',
    name: 'Toncoin',
    symbol: '(TONUSDT)',
    icon: '/icons/Warm Glow.jpg',
    price: 2.99,
    change24h: -0.22
  },
  {
    id: 'DOGE',
    name: 'Dogecoin',
    symbol: '(DOGEUSDT)',
    icon: '/icons/doge.png',
    price: 0.23,
    change24h: 0.08
  },
  {
    id: 'SOL',
    name: 'Solana',
    symbol: '(SOLUSDT)',
    icon: '/icons/sol.png',
    price: 175.13,
    change24h: 0.78
  },
  {
    id: 'PEPE',
    name: 'Pepe',
    symbol: '(PEPEUSDT)',
    icon: '/icons/pepe.png',
    price: 0.0000187,
    change24h: -0.09
  },
  {
    id: 'SHIB',
    name: 'Shiba Inu',
    symbol: '(SHIBUSDT)',
    icon: '/icons/shib.png',
    price: 0.0000084,
    change24h: 0.06
  },
  {
    id: 'NOT',
    name: 'Notcoin',
    symbol: '(NOTUSDT)',
    icon: '/icons/not.png',
    price: 0.003,
    change24h: 0.22
  },

  {
    id: 'CRV',
    name: 'Curve DAO',
    symbol: '(CRVUSDT)',
    icon: '/icons/crv.png',
    price: 0.79,
    change24h: 2.4
  },
  {
    id: 'SUI',
    name: 'Sui',
    symbol: '(SUIUSDT)',
    icon: '/icons/sui.png',
    price: 3.64,
    change24h: 3.92
  },
  {
    id: 'DYDX',
    name: 'dYdX',
    symbol: '(DYDXUSDT)',
    icon: '/icons/dydx.png',
    price: 0.62,
    change24h: 1.61
  },
  {
    id: 'AAVE',
    name: 'Aave',
    symbol: '(AAVEUSDT)',
    icon: '/icons/aave.png',
    price: 280.81,
    change24h: 1.48
  },
  {
    id: 'LINK',
    name: 'Chainlink',
    symbol: '(LINKUSDT)',
    icon: '/icons/link.png',
    price: 7.12,
    change24h: 0.34
  }
];

const PRICE_CHANGE_RANGE = 0.005;
const CHANGE24H_RANGE = 0.5;

const getRandomNumber = (
  min: number,
  max: number,
  decimalPlaces = 2
): number => {
  const factor = 10 ** decimalPlaces;
  return Math.round((Math.random() * (max - min) + min) * factor) / factor;
};

export const simulateMarketDataUpdate = (
  currentData: MarketItem[]
): MarketItem[] => {
  return currentData.map((item) => {
    const priceChangeFactor = getRandomNumber(
      -PRICE_CHANGE_RANGE,
      PRICE_CHANGE_RANGE,
      4
    );
    const changeChangeFactor = getRandomNumber(
      -CHANGE24H_RANGE,
      CHANGE24H_RANGE,
      2
    );

    return {
      ...item,
      price: formatPrice(item.price * (1 + priceChangeFactor)),
      change24h: parseFloat((item.change24h + changeChangeFactor).toFixed(2))
    };
  });
};
