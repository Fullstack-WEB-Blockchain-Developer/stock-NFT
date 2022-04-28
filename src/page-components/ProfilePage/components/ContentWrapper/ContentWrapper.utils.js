import CollectedIcon from "./icons/Icon-Collected.svg";
import CreatedIcon from "./icons/Icon-Created.svg";
import FavoritedIcon from "./icons/Icon-Heart.svg";
import ActivityIcon from "./icons/Icon-Activity.svg";
import OfferIcon from "./icons/Icon-Offers.svg";

export const chooseSections = [
  {
    text: "Collected",
    icon: <CollectedIcon />,
    nameForBE: "collected",
    forRedux: "ownedNfts",
  },
  {
    text: "Created",
    icon: <CreatedIcon />,
    nameForBE: "created",
    forRedux: "createdNfts",
  },
  {
    text: "Favorited",
    icon: <FavoritedIcon />,
    nameForBE: "favorited",
    forRedux: "favoritedNfts",
  },
  {
    text: "Activity",
    icon: <ActivityIcon />,
    nameForBE: "activity",
  },
  {
    text: "Offers",
    icon: <OfferIcon />,
    nameForBE: "offers",
  },
];

export const constructUrl = (initialUrl, selectedStatuses, selectedCollections, selectedPrice) => {
  const statuses = selectedStatuses.map(({ name }) => name).join(",");
  const collections = selectedCollections.rows.map(({ id }) => id).join(",");
  const { min, max, currency } = selectedPrice;

  initialUrl += statuses.length > 0 ? `&status=${statuses}` : "";
  initialUrl += collections.length > 0 ? `&collectionId=${collections}` : "";
  initialUrl += min ? `&priceFilterType=${currency}&priceFilterMin=${min}&priceFilterMax=${max}` : "";
  
  return initialUrl;
};
