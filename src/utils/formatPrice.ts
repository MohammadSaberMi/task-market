const DEFAULT_DECIMALS = 2;
const LOW_PRICE_DECIMALS = 6;

export const formatPrice = (price: number): number => {
  return parseFloat(
    price.toFixed(price < 1 ? LOW_PRICE_DECIMALS : DEFAULT_DECIMALS)
  );
};
