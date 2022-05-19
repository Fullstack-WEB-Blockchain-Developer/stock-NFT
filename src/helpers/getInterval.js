export const getInterval = (days) => {
  if (days < 14) return 0;
  if (days >= 14 && days < 30) return 1;
  else return Math.ceil(days / 15);
};