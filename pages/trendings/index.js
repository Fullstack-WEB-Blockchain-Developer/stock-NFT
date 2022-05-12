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

  const {
    data: { data },
    collections,
  } = await axios.get(`${process.env.BACKEND_URL}/collections/get/trending`, {
    httpsAgent,
  });
  console.log('---data', data);

  const adaptedData = data.map((elem) => {
    let { total_value, day_before_total_value, week_before_total_value } = elem;

    let last24h = '0%';
    let last7d = '0%';

    if (day_before_total_value !== 0) {
      last24h =
        day_before_total_value < total_value
          ? `+${(total_value / day_before_total_value) * 100}%`
          : `-${(day_before_total_value / total_value) * 100}%`;
    }

    if (week_before_total_value !== 0) {
      last7d =
        day_before_total_value < total_value
          ? `+${(total_value / week_before_total_value) * 100}%`
          : `-${(week_before_total_value / total_value) * 100}%`;
    }

    return { ...elem, last24h, last7d };
  });

  console.log('---data', adaptedData);

  return {
    props: {
      ...adaptedData,
      blockchains: blockchains.data,
      categories: categories.data,
    },
  };
};
