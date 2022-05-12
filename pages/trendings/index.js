//next
import { GetServerSideProps } from 'next';
//https
import https from 'https';
//axios
import axios from 'axios';
//HOC
import { withHeader } from '../../layout/Layout';
//page-component
import { TrendingCollectionsPage } from '../../src/page-components/TrendingCollectionsPage/TrendingCollectionsPage';

const TrendingCollections = (props) => <TrendingCollectionsPage {...props} />;

export default withHeader(TrendingCollections);

export const getServerSideProps = async () => {
  const httpsAgent = new https.Agent({ rejectUnauthorized: false });

  const blockchains = await axios.get(`${process.env.BACKEND_URL}/nfts/blockchainTypes/all`, {
    httpsAgent,
  });

  const categories = await axios.get(`${process.env.BACKEND_URL}/collections/categories/all`, {
    httpsAgent,
  });

  return {
    props: {
      blockchains: blockchains.data,
      categories: categories.data,
    },
  };
};
