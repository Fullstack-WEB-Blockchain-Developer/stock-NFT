import { CreateCollectionPage } from "../../../src/page-components/CreateCollectionPage/CreateCollectionPage";
import { GetServerSideProps } from "next";
import { withHeader } from "../../../layout/Layout";
import https from "https";
import axios from "axios";

const CreateCollection = ({ blockchains, paymentTokens, categories }) => (
  <CreateCollectionPage blockchains={blockchains} categories={categories} paymentTokens={paymentTokens} />
);

export default withHeader(CreateCollection);

export const getServerSideProps = async () => {
  const httpsAgent = new https.Agent({ rejectUnauthorized: false });

  const blockchains = await axios.get(`${process.env.BACKEND_URL}/nfts/blockchainTypes/all`, {
    httpsAgent,
  });

  const paymentTokens = await axios.get(`${process.env.BACKEND_URL}/collections/paymentTokens/all`, {
    httpsAgent,
  });

  const categories = await axios.get(`${process.env.BACKEND_URL}/collections/categories/all`, {
    httpsAgent,
  });

  return {
    props: {
      blockchains: blockchains.data,
      categories: categories.data,
      paymentTokens: paymentTokens.data,
    },
  };
};
