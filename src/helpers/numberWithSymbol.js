export const numberWithSymbol = (number, symbol) => {
  return Number(number).toFixed(2).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, symbol);
};
