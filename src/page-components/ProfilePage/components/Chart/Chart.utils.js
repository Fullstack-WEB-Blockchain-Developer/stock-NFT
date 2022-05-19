import { getDaysOffset } from "src/helpers/getDaysOffset"

export const periods = [
    {
        text: '1mo',
        daysOffset: getDaysOffset(1)
    },
    {
        text: '3mo',
        daysOffset: getDaysOffset(3)
    },
    {
        text: '6mo',
        daysOffset: getDaysOffset(6)
    },
    {
        text: '1yr',
        daysOffset: getDaysOffset(12)
    },
    {
        text: 'All',
        daysOffset: 99999
    },
]

export const getInterval = (days) => {
    if (days < 30) return 0;
    else return Math.ceil(days / 30);
  };