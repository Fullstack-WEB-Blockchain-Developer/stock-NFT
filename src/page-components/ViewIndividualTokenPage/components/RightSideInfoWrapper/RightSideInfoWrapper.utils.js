import { getDaysOffset } from 'src/helpers/getDaysOffset';

const monthDayYearOptions = { year: 'numeric', month: 'long', day: 'numeric' };

const hourMinuteOptions = { hour: 'numeric', minute: 'numeric' };

export const getCorrectDateString = (time) => {
  const date = new Date(time);
  const monthDayYear = date.toLocaleString('en-US', monthDayYearOptions);
  const hourMinute = date.toLocaleString('en-US', hourMinuteOptions);
  const withoutPmOrAm = hourMinute.substring(0, hourMinute.length - 3);
  const amOrPm = hourMinute.substring(hourMinute.length - 2).toLowerCase();

  return `${monthDayYear} at ${withoutPmOrAm}${amOrPm}`;
};

export const priceHistorySelectOptions = [
  {
    text: 'Last 7 days',
    daysOffset: 7,
  },
  {
    text: 'Last 14 days',
    daysOffset: 14,
  },
  {
    text: 'Last 30 days',
    daysOffset: getDaysOffset(1),
  },
  {
    text: 'Last 60 days',
    daysOffset: getDaysOffset(2),
  },
  {
    text: 'Last 90 days',
    daysOffset: getDaysOffset(3),
  },
  {
    text: 'Last year',
    daysOffset: getDaysOffset(12),
  },
];

export const adaptChartData = (data) => {
  const result = data.map(({ date, avg_price }) => {
    const newDate = new Date(date);
    const monthDay = newDate.toLocaleString('en-US', { month: 'numeric', day: 'numeric' });
    return { price: avg_price, date: monthDay };
  });

  return result;
};


