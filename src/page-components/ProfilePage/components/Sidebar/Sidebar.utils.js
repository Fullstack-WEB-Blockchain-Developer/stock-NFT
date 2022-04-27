export const normalSections = [
  {
    text: "Status",
    section: "status",
  },
  {
    text: "Price",
    section: "price",
  },
  {
    text: "Collections",
    section: "collections",
  },
  {
    text: "Chains",
    section: "chains",
  },
  {
    text: "Categories",
    section: "categories",
  },
  {
    text: "On Sale In",
    section: "onSaleIn",
  },
];

export const activitySections = [
  {
    text: "Event Type",
    section: "eventType",
  },
  {
    text: "Collections",
    section: "collections",
  },
  {
    text: "Chains",
    section: "chains",
  },
];

export const onlyCollections = [
  {
    text: "Collections",
    section: "collections",
  },
];

export const forNormal = ["created", "collected", "favorited", "hidden"];
export const forCollectionsOnly = ["offers", "listings"];

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
    text: "Buy Now",
    status: "buyNow",
  },
  {
    text: "On Auction",
    status: "onAuction",
  },
  {
    text: "New",
    status: "new",
  },
  {
    text: "Has Offers",
    status: "hasOffers",
  },
];

export const fakeOnSaleIn = [
    {
        name: 'First One',
        id: '1'
    },
    {
        name: 'Second One',
        id: '12'
    },
    {
        name: 'Third One',
        id: '13'
    },
    {
        name: 'Fourth One',
        id: '14'
    },
    {
        name: 'Fifth One',
        id: '15'
    },
    {
        name: 'Sixth One',
        id: '16'
    },
    {
        name: 'Seventh One',
        id: '17'
    },
    {
        name: 'Eighth One',
        id: '18'
    },
]

export const fakeCollections = [
  {
      name: 'First One',
      icon: '',
      id: '1'
  },
  {
      name: 'Second One',
      id: '12'
  },
  {
      name: 'Third One',
      id: '13'
  },
  {
      name: 'Fourth One',
      id: '14'
  },
  {
      name: 'Fifth One',
      id: '15'
  },
  {
      name: 'Sixth One',
      id: '16'
  },
  {
      name: 'Seventh One',
      id: '17'
  },
  {
      name: 'Eighth One',
      id: '18'
  },
]
