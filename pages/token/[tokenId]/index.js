import { ViewIndividualTokenPage } from '../../../src/page-components/ViewIndividualTokenPage/ViewIndividualTokenPage';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import https from 'https';
import axios from 'axios';
import { withLayout } from '../../../layout/Layout';
import { getEtherPrice } from '../../../src/utils';

const ViewIndividualToken = (props) => <ViewIndividualTokenPage {...props} />;

export default withLayout(ViewIndividualToken);

export const getServerSideProps = async ({ params }) => {
  if (!params) {
    return {
      notFound: true,
    };
  }

  const httpsAgent = new https.Agent({ rejectUnauthorized: false });

  const { data } = await axios.get(
    `${process.env.BACKEND_URL}/nfts/${params.tokenId}`,
    {
      httpsAgent,
    }
  );

  const adaptPriceAndType = async (array, type) => {
    const newArray = Promise.all(
      array.map(
        async (elem) =>
          await getEtherPrice().then((result) => {
            return {
              ...elem,
              usdPrice: `$${(elem.price * result).toFixed(2)}`,
              type,
            };
          })
      )
    );
    return newArray;
  };

  const adaptedOffers = await adaptPriceAndType(data.offers, 'Offers');
  const adatpedFixedPriceListings = await adaptPriceAndType(
    data.fixedPriceListings,
    'Listings'
  );
  const adaptedTimeAuctionListings = await adaptPriceAndType(
    data.timeAuctionListings,
    'Listings'
  );
  const adaptedAllListings = [
    ...adatpedFixedPriceListings,
    ...adaptedTimeAuctionListings,
  ];

  return {
    props: {
      ...data,
      about: data.collection?.description,
      blockchainName: data.blockchainType?.name || null,
      collectionName: data.collection?.name || null,
      listings: adaptedAllListings,
      offers: adaptedOffers,
      user: data.owner,
    },
  };
};
