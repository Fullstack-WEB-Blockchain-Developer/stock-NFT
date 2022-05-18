//icons
import CollectedIcon from './icons/Icon-Collected.svg';
import CreatedIcon from './icons/Icon-Created.svg';
import FavoritedIcon from './icons/Icon-Heart.svg';
import ActivityIcon from './icons/Icon-Activity.svg';
import OfferIcon from './icons/Icon-Offers.svg';
//utils
import { getEtherPrice } from '../../../../utils';
import { getDateAgo } from '../../../../helpers/getDateAgo';
import { getExpirationString } from 'src/helpers/getExpirationString';

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

export const adaptOffers = async (offers) => {
  return Promise.all(
    [...offers].map(
      async (elem) =>
        await getEtherPrice().then((result) =>
          elem.price
            ? {
                ...elem,
                usdPrice: (result * elem.price).toFixed(2),
                expirationDate: getExpirationString(elem.expirationDate),
              }
            : { ...elem, usdPrice: 0, date: getExpirationString(elem.expirationDate) }
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
  selectedCategories,
  filterText,
  choosenSeltion
) => {
  const statuses = selectedStatuses.map(({ name }) => name).join(',');
  const collections = selectedCollections.rows.map(({ id }) => id).join(',');
  const chains = selectedChains.map(({ id }) => id).join(',');
  const categories = selectedCategories.map(({ id }) => id).join(',');
  const { min, max, currency } = selectedPrice;

  initialUrl += collections.length > 0 ? `&collectionId=${collections}` : '';
  initialUrl += chains.length > 0 ? `&blockchainId=${chains}` : '';

  if (choosenSeltion !== 'activity') {
    initialUrl += filterText ? `&search=${filterText}` : '';
    initialUrl += statuses.length > 0 ? `&status=${statuses}` : '';
    initialUrl += collections.length > 0 ? `&collectionId=${collections}` : '';
    initialUrl += min ? `&priceFilterType=${currency}&priceFilterMin=${min}&priceFilterMax=${max}` : '';
    initialUrl += categories.length > 0 ? `&categoryId=${categories}` : '';
  }

  return initialUrl;
};
