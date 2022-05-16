import CollectedIcon from './icons/Icon-Collected.svg';
import CreatedIcon from './icons/Icon-Created.svg';
import FavoritedIcon from './icons/Icon-Heart.svg';
import ActivityIcon from './icons/Icon-Activity.svg';
import OfferIcon from './icons/Icon-Offers.svg';
import { getEtherPrice } from '../../../../utils';
import { getDateAgo } from '../../../../helpers/getDateAgo';

export const fakeActivities = [
  {
    action: {
      name: 'List',
      icon: '32aab398-0c84-4f05-80c9-524589c24319.svg',
    },
    buyer: {
      name: 'some buyerrrrrr',
    },
    seller: { name: 'Some sellerrrrr' },
    nft: {
      fileName: '32aab398-0c84-4f05-80c9-524589c24319.svg',
      name: 'Some tokennnnnnnnnnnn',
      collection: {
        name: 'Collection 114141234123412341234',
      },
      price: {
        currency: { name: 'ETH', icon: '32aab398-0c84-4f05-80c9-524589c24319.svg' },
        amount: 0.05,
      },
    },
    quantity: 1,
    date: new Date() - 10000000,
    id: '1',
  },
  {
    action: {
      name: 'Sale',
      icon: '32aab398-0c84-4f05-80c9-524589c24319.svg',
    },
    buyer: {
      name: 'some buyer',
    },
    seller: { name: 'Some seller' },
    nft: {
      fileName: '32aab398-0c84-4f05-80c9-524589c24319.svg',
      name: 'Some token',
      collection: {
        name: 'Collection 1',
      },
      price: null,
    },
    quantity: 1,
    date: new Date() - 50000000,
    id: '2',
  },
];

export const chooseSections = [
  {
    text: 'Collected',
    icon: <CollectedIcon />,
    nameForBE: 'collected',
    forRedux: 'ownedNfts',
  },
  {
    text: 'Created',
    icon: <CreatedIcon />,
    nameForBE: 'created',
    forRedux: 'createdNfts',
  },
  {
    text: 'Favorited',
    icon: <FavoritedIcon />,
    nameForBE: 'favorited',
    forRedux: 'favoritedNfts',
  },
  {
    text: 'Activity',
    icon: <ActivityIcon />,
    nameForBE: 'activity',
  },
  {
    text: 'Offers',
    icon: <OfferIcon />,
    nameForBE: 'offers',
  },
];

export const adaptActivities = async (activities) => {
  return Promise.all(
    [...activities].map(
      async (elem) =>
        await getEtherPrice().then((result) =>
          elem.price
            ? {
                ...elem,
                usdPrice: (result * elem.price).toFixed(2),
                date: getDateAgo(elem.updatedAt),
              }
            : { ...elem, usdPrice: 0, date: getDateAgo(elem.updatedAt) }
        )
    )
  );
};

export const constructUrl = (
  initialUrl,
  selectedStatuses,
  selectedCollections,
  selectedPrice,
  selectedChains,
  choosenSeltion
) => {
  const statuses = selectedStatuses.map(({ name }) => name).join(',');
  const collections = selectedCollections.rows.map(({ id }) => id).join(',');
  const chains = selectedChains.map(({ id }) => id).join(',');
  const { min, max, currency } = selectedPrice;

  initialUrl += collections.length > 0 ? `&collectionId=${collections}` : '';
  initialUrl += chains.length > 0 ? `&blockchainId=${chains}` : '';

  if (choosenSeltion !== 'activity') {
    initialUrl += statuses.length > 0 ? `&status=${statuses}` : '';
    initialUrl += collections.length > 0 ? `&collectionId=${collections}` : '';
    initialUrl += min ? `&priceFilterType=${currency}&priceFilterMin=${min}&priceFilterMax=${max}` : '';
  }

  return initialUrl;
};
