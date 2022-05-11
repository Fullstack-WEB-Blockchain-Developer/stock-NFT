export const dateRanges = [
  { text: '1 day', range: 1000 * 60 * 60 * 24 },
  { text: '3 days', range: 1000 * 60 * 60 * 24 * 3 },
  { text: '7 days', range: 1000 * 60 * 60 * 24 * 7 },
  { text: '1 month', range: 1000 * 60 * 60 * 24 * 30 },
  { text: '3 months', range: 1000 * 60 * 60 * 24 * 90 },
  { text: '6 months', range: 1000 * 60 * 60 * 24 * 180 },
];

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const getDurationTextFieldValue = (duration) => {
  const [start, end] = duration;

  const startDate = new Date(start);
  const endDate = new Date(end);
console.log('---endDate', endDate)
  const constructHalfString = (date) => {
    let result = '';
    result += months[date.getMonth()];
    result += ` ${date.getDate()}`;
    result += ` ${date.getFullYear()},`;
    result += ` (${date.getHours() % 12}:`;
    result += `${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()} `;
    result += date.getHours() <= 12 ? 'am)' : 'pm)';

    return result;
  };
 return `${constructHalfString(startDate)} - ${constructHalfString(endDate)}`
};
