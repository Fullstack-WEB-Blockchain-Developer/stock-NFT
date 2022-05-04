import { ViewIndividualTokenPage } from "../../../src/page-components/ViewIndividualTokenPage/ViewIndividualTokenPage";
import { GetServerSideProps } from "next";
import https from "https";
import axios from "axios";
import { withLayout } from "../../../layout/Layout";

const ViewIndividualToken = (props) => <ViewIndividualTokenPage {...props} />;

export default withLayout(ViewIndividualToken);

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

  return {
    props: {
      ...data,
    },
  };
};
