import axios from 'axios';

export const sendFixedPriceToServer = async (token) => {
  const { asBundle, duration, bundle, currency, price, specificBuyerAddress } = token;
  const [start, end] = duration;
  const startDate = new Date(start).toISOString();
  const endDate = new Date(end).toISOString();
  const accessToken = localStorage.getItem('accessToken');

  await axios.post(
    `${process.env.BACKEND_URL}/listings/fixedPrice`,
    {
      asBundle,
      endDate,
      nftIds: bundle,
      paymentTokenId: Number(currency.id),
      price: Number(price),
      reservedBuyerAddress: specificBuyerAddress,
      startDate,
    },
    {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    }
  );
};

export const sendTimedAuctionToServer = async (token) => {
  const {
    auctionMethod,
    auctionReservePrice,
    auctionStartingCurrency,
    auctionStartingPrice,
    auctionReserveCurrency,
    bundle,
    duration,
  } = token;
  const [start, end] = duration;
  const startDate = new Date(start).toISOString();
  const endDate = new Date(end).toISOString();
  const method = auctionMethod === 'Sell to the highest bidder' ? 'highestBid' : 'decliningPrice';
  const accessToken = localStorage.getItem('accessToken');

  await axios.post(
    `${process.env.BACKEND_URL}/listings/timedAuction`,
    {
      startingPrice: auctionStartingPrice,
      endDate,
      method,
      reservePrice: Number(auctionReservePrice),
      nftIds: [],
      pricePaymentTokenId: Number(auctionStartingCurrency.id),
      reservedPricePaymentTokenId: Number(auctionReserveCurrency.id),
      startDate,
    },
    {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    }
  );
};
