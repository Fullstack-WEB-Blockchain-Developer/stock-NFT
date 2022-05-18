export const normalSections = [
  {
    text: 'Status',
    section: 'status',
  },
  {
    text: 'Price',
    section: 'price',
  },
  {
    text: 'Collections',
    section: 'collections',
  },
  {
    text: 'Chains',
    section: 'chains',
  },
  {
    text: 'Categories',
    section: 'categories',
  },
  // {
  //   text: "On Sale In",
  //   section: "onSaleIn",
  // },
];

export const activitySections = [
  {
    text: 'Event Type',
    section: 'eventType',
  },
  {
    text: 'Collections',
    section: 'collections',
  },
  {
    text: 'Chains',
    section: 'chains',
  },
];

export const onlyCollections = [
  {
    text: 'Collections',
    section: 'collections',
  },
];

export const forNormal = ['created', 'collected', 'favorited'];
export const forCollectionsOnly = ['offersMade', 'offersReceived'];

export const getSections = (choosenTopSection) => {
  if (forNormal.includes(choosenTopSection)) return normalSections;

  if (forCollectionsOnly.includes(choosenTopSection)) return onlyCollections;

  return activitySections;
};

export const getSectionsForUseState = (choosenTopSection) => {
  const sections = getSections(choosenTopSection);
  const obj = {};

  sections.forEach(({ section }) => (obj[section] = false));

  return obj;
};

export const statuses = [
  {
    text: 'Buy Now',
    status: 'buyNow',
  },
  {
    text: 'On Auction',
    status: 'onAuction',
  },
  {
    text: 'New',
    status: 'new',
  },
  {
    text: 'Has Offers',
    status: 'hasOffers',
  },
];

export const eventTypes = [
  {
    text: 'Listings',
    eventType: 'listings',
  },
  {
    text: 'Sales',
    eventType: 'sales',
  },
  {
    text: 'Bids',
    eventType: 'bids',
  },
  {
    text: 'Transfers',
    eventType: 'transfers',
  },
];
