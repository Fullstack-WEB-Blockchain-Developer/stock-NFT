export const fakePrice = {
  eth: 0.211,
  usd: 667.75,
};

export const fakeListing = [
  {
    price: 1,
    updatedAt: new Date(2022, 0, 1, 2, 3, 4, 567),
    expirationDate: new Date(2022, 5, 1, 2, 3, 4, 567),
    buyer: { username: "CreVthor" },
    seller: { username: "Darth Vader" }, 
    id: "1",
    usdPrice: '987',
    type: "Listing",
  },
  {
    price: 2,
    updatedAt: new Date(2022, 3, 15, 1, 3, 4, 567),
    expirationDate: new Date(2022, 5, 1, 2, 3, 4, 567),
    buyer: { username: "Darth Vader" },
    seller: { username: "CreVthor" }, 
    id: "2",
    usdPrice: '987',
    type: "Listing",
  },
];

export const fakeLikes = 15;
