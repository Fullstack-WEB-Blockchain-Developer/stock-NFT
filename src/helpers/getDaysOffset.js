export const getDaysOffset = (months) => {
  const now = new Date();
  const currMonth = now.getMonth();
  const final = new Date();
  final.setMonth(currMonth + months);

  let result = Date.parse(final) - Date.parse(now);
  result = result / 1000 / 60 / 60 / 24;
  
  return result;
};
