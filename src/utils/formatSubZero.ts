export const formatSubZero = (num: number, currency: string = '') => {
  let fixedDecimalPlaces: number;
  if (num >= 1000) {
    fixedDecimalPlaces = 2; // e.g., 109481.14
  } else if (num >= 1) {
    fixedDecimalPlaces = 4; // e.g., 2644.0987
  } else {
    fixedDecimalPlaces = 8; // For numbers less than 1, to potentially find sub-zeros
  }

  const numStr = num.toFixed(fixedDecimalPlaces);
  const [integerPart, decimalPart] = numStr.split('.');

  if (!decimalPart || num >= 1) {
    return `${currency}${num.toFixed(num >= 1 ? 2 : fixedDecimalPlaces)}`;
  }

  let leadingZeros = 0;
  for (let i = 0; i < decimalPart.length; i++) {
    if (decimalPart[i] === '0') {
      leadingZeros++;
    } else {
      break;
    }
  }

  if (leadingZeros >= 2) {
    const significantPart = decimalPart.substring(leadingZeros);
    const trimmedSignificantPart = significantPart.replace(/0+$/, '');
    if (trimmedSignificantPart === '') {
      return `${currency}${num.toFixed(fixedDecimalPlaces)}`;
    }
    return `${currency}${integerPart}.0<sub class="text-[0.6em] relative -top-[0.2em]">${leadingZeros}</sub>${trimmedSignificantPart}`;
  }

  return `${currency}${num.toFixed(fixedDecimalPlaces)}`;
};
