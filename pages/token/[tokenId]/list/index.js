import { ListFixedPage} from '../../../../src/page-components/ListFixedPage/ListFixedPage'
import { GetServerSideProps } from "next";
import https from "https";
import axios from "axios";
import { withLayout } from "../../../../layout/Layout";

const ListFixed = (props) => <ListFixedPage {...props} />;

export default withLayout(ListFixed);

export const getServerSideProps = async ({ params }) => {
  if (!params) {
    return {
      notFound: true,
    };
  }

  const httpsAgent = new https.Agent({ rejectUnauthorized: false });

  const { data } = await axios.get(`${process.env.BACKEND_URL}/nfts/${params.tokenId}`, {
    httpsAgent,
  });


  console.log('---data', data)
  return {
    props: {
      ...data,
    },
  };
};
