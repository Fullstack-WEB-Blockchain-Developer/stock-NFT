import { EditCollectionPage } from "../../../../src/page-components/EditCollectionPage/EditCollectionPage";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import https from "https";
import axios from "axios";
import { withHeader } from "../../../../layout/Layout";

const EditCollection = (props) => <EditCollectionPage {...props} />;

export default withHeader(EditCollection);

export const getServerSideProps = async ({ params }) => {
  if (!params) {
    return {
      notFound: true,
    };
  }

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

  const { data } = await axios.get(`${process.env.BACKEND_URL}/collections/${params.collectionId}`, {
    httpsAgent,
  });

  return {
    props: {
      ...data,
      url: data.url || "",
      description: data.description || "",
      websiteLink: data.websiteLink || "",
      discordLink: data.discordLink || "",
      instagramLink: data.instagramLink || "",
      mediumLink: data.mediumLink || "",
      telegramLink: data.telegramLink || "",
      blockchains: blockchains.data,
      categories: categories.data,
      paymentTokens: paymentTokens.data,
    },
  };
};
