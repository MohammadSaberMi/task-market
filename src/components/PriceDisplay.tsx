import React from 'react';
import { formatSubZero } from '@/utils/formatSubZero';

interface PriceDisplayProps {
  price: number;
  currency?: string;
}

const PriceDisplay: React.FC<PriceDisplayProps> = ({
  price,
  currency = ''
}) => {
  const formatted = formatSubZero(price, currency);
  if (formatted.includes('<sub')) {
    return <span dangerouslySetInnerHTML={{ __html: formatted }} />;
  }
  return <span>{formatted}</span>;
};

export default PriceDisplay;
