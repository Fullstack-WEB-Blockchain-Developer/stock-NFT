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

export const getServerSideProps = async ({ params }) => {
  if (!params) {
    return {
      notFound: true,
    };
  }

  const httpsAgent = new https.Agent({ rejectUnauthorized: false });

  const { data } = await axios.get(`${process.env.BACKEND_URL}/collections/get/trending`, {
    httpsAgent,
  });

  console.log('---data', data);
  return {
    props: {
      ...data,
    },
  };
};
