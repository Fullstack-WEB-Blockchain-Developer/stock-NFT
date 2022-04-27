export const numberWithSymbol = (number, symbol) => {
  return number.toFixed(2).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, symbol);
};
