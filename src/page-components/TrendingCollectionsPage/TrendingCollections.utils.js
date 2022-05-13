import axios from 'axios';

export const durationOptions = [
  {
    text: 'Last 24 hours',
    numberOfDays: 1,
  },
  {
    text: 'Last 7 days',
    numberOfDays: 7,
  },
  {
    text: 'Last 30 days',
    numberOfDays: 30,
  },
  {
    text: 'All Time',
    numberOfDays: 9999,
  },
];

export const getFilteredCollections = async (duration, categoryId, chainId, offset) => {
  let url = `${process.env.BACKEND_URL}/collections/get/trending?limit=100&offset=${offset}`;

  if (duration) {
    url += `&daysOffset=${durationOptions.find(({ text }) => text === duration).numberOfDays}`;
  }

  if (categoryId) {
    url += `&categoryId=${categoryId}`;
  }

  if (chainId) {
    url += `&blockchainTypeId=${chainId}`;
  }

  const {
    data: { data, collections },
  } = await axios.get(url);

  const adaptedData = data.map((elem) => {
    let { total_value, day_before_total_value, week_before_total_value, owners, items } = elem;

    let last24h = null;
    let last7d = null;
    let adaptedOwners = owners;
    let adaptedItems = items;

    if (day_before_total_value !== 0) {
      if (total_value && day_before_total_value) {
        last24h =
          day_before_total_value < total_value
            ? { text: `+${(total_value / day_before_total_value) * 100}%`, color: 'green' }
            : { text: `-${(day_before_total_value / total_value) * 100}%`, color: 'red' };
      }
    }

    if (week_before_total_value !== 0) {
      if (total_value && week_before_total_value) {
        last7d =
          day_before_total_value < total_value
            ? { text: `+${(total_value / week_before_total_value) * 100}%`, color: 'green' }
            : { text: `-${(week_before_total_value / total_value) * 100}%`, color: 'red' };
      }
    }

    if (owners >= 1000) {
      adaptedOwners = `${(owners / 1000).toFixed(1)}K`;
    }

    if (items >= 1000) {
      adaptedItems = `${(items / 1000).toFixed(1)}K`;
    }

    return { ...elem, last24h, last7d, owners: adaptedOwners, items: adaptedItems };
  });
  
  return { data: adaptedData, quantity: collections };
};
