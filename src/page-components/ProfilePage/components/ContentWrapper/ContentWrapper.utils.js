import CollectedIcon from "./icons/Icon-Collected.svg";
import CreatedIcon from "./icons/Icon-Created.svg";
import FavoritedIcon from "./icons/Icon-Heart.svg";
import ActivityIcon from "./icons/Icon-Activity.svg";
import OfferIcon from "./icons/Icon-Offers.svg";
import { getEtherPrice } from "../../../../utils";
import { getDateAgo } from "../../../../helpers/getDateAgo";

export const fakeActivities = [
  {
    action: {
      name: "List",
      icon: "32aab398-0c84-4f05-80c9-524589c24319.svg",
    },
    buyer: {
      name: "some buyerrrrrr",
    },
    seller: { name: "Some sellerrrrr" },
    nft: {
      fileName: "32aab398-0c84-4f05-80c9-524589c24319.svg",
      name: "Some tokennnnnnnnnnnn",
      collection: {
        name: "Collection 114141234123412341234",
      },
      price: {
        currency: { name: "ETH", icon: "32aab398-0c84-4f05-80c9-524589c24319.svg" },
        amount: 0.05,
      },
    },
    quantity: 1,
    date: new Date() - 10000000,
    id: "1",
  },
  {
    action: {
      name: "Sale",
      icon: "32aab398-0c84-4f05-80c9-524589c24319.svg",
    },
    buyer: {
      name: "some buyer",
    },
    seller: { name: "Some seller" },
    nft: {
      fileName: "32aab398-0c84-4f05-80c9-524589c24319.svg",
      name: "Some token",
      collection: {
        name: "Collection 1",
      },
      price: null,
    },
    quantity: 1,
    date: new Date() - 50000000,
    id: "2",
  },
  {
    action: {
      name: "Minted",
      icon: "32aab398-0c84-4f05-80c9-524589c24319.svg",
    },
    buyer: {
      name: "some buyer",
    },
    seller: { name: "Some seller" },
    nft: {
      fileName: "32aab398-0c84-4f05-80c9-524589c24319.svg",
      name: "Some token",
      collection: {
        name: "Collection 1",
      },
      price: {
        currency: { name: "WETH", icon: "32aab398-0c84-4f05-80c9-524589c24319.svg" },
        amount: 0.05,
      },
    },
    quantity: 1,
    date: new Date() - 500000,
    id: "3",
  },
  {
    action: {
      name: "Offers",
      icon: "32aab398-0c84-4f05-80c9-524589c24319.svg",
    },
    buyer: {
      name: "some buyer",
    },
    seller: { name: "Some seller" },
    nft: {
      fileName: "32aab398-0c84-4f05-80c9-524589c24319.svg",
      name: "Some token",
      collection: {
        name: "Collection 1",
      },
      price: {
        currency: { name: "WETH", icon: "32aab398-0c84-4f05-80c9-524589c24319.svg" },
        amount: 0.05,
      },
    },
    quantity: 1,
    date: new Date() - 3000,
    id: "4",
  },
  {
    action: {
      name: "List",
      icon: "32aab398-0c84-4f05-80c9-524589c24319.svg",
    },
    buyer: {
      name: "some buyer",
    },
    seller: { name: "Some seller" },
    nft: {
      fileName: "32aab398-0c84-4f05-80c9-524589c24319.svg",
      name: "Some token",
      collection: {
        name: "Collection 1",
      },
      price: {
        currency: { name: "ETH", icon: "32aab398-0c84-4f05-80c9-524589c24319.svg" },
        amount: 0.05,
      },
    },
    quantity: 1,
    date: new Date() - 100000,
    id: "5",
  },
];

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

export const adaptActivities = async (activities) => {
  return Promise.all(
    [...activities].map(
      async (elem) =>
        await getEtherPrice().then((result) =>
          elem.nft.price
            ? {
                ...elem,
                nft: {
                  ...elem.nft,
                  price: {
                    ...elem.nft.price,
                    usd: (result * elem.nft.price.amount).toFixed(2),
                  },
                },
                date: getDateAgo(elem.date),
              }
            : { ...elem, date: getDateAgo(elem.date) }
        )
    )
  );
};
