export const readyFilterOptions = [
  { text: 'Recently Recieved', sortOrder: 'DESC', sortBy: 'lastTransferDate' },
  { text: 'Recently Created', sortOrder: 'DESC', sortBy: 'creationDate' },
  { text: 'Recently Sold', sortOrder: 'DESC', sortBy: 'lastSaleDate' },
  { text: 'Recently Listed', sortOrder: 'DESC', sortBy: 'listingDate' },
  { text: 'Ending Soon', sortOrder: 'ASC', sortBy: 'expirationDate' },
  { text: 'Price: Low to High', sortOrder: 'DESC', sortBy: 'price' },
  { text: 'Price: High to Low', sortOrder: 'ASC', sortBy: 'price' },
  { text: 'Highest Last Sale', sortOrder: 'DESC', sortBy: 'lastSalePrice' },
  { text: 'Most Viewed', sortOrder: 'DESC', sortBy: 'viewerCount' },
  { text: 'Most Favorited', sortOrder: 'DESC', sortBy: 'favoriteCount' },
  { text: 'Oldest', sortOrder: 'ASC', sortBy: 'creationDate' },
];
