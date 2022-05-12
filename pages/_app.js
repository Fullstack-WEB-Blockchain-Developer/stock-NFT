// import { useState, useEffect, createContext } from "react";
//web3
import { Web3ReactProvider } from "@web3-react/core";
//redux
import { AuthProvider } from "../src/contexts/JWTContext";
import { Provider } from "react-redux";
import { store } from "../src/redux/store";
//ethers
import { ethers } from "ethers";
//styles
import "../styles/globals.css";

const getLibrary = (provider) => {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 8000; // frequency provider is polling
  return library;
};

// const UserContext = createContext()

// export const TokenNetworkProvider = (Component) => {
//   const [tokenNetwork, setTokenNetwork] = useState("");

//   useEffect(() => {
//     const { tokenId } = router.query;
//     (async () => {
//       const response = await axios.get(`${process.env.BACKEND_URL}/nfts/${tokenId}`);
//       const { blockchainType } = response.data;
//       setTokenNetwork(String(blockchainType.name).toLowerCase());
//     })();
//   }, []);

//   return (
//     <UserContext.Provider value={tokenNetwork}>
//         <Component {...props} />
//     </UserContext.Provider>
//   );
// }

function MyApp({ Component, pageProps }) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Provider store={store}>
        <AuthProvider>
          {/* <TokenNetworkProvider> */}
            <Component {...pageProps} />
          {/* </TokenNetworkProvider> */}
        </AuthProvider>
      </Provider>
    </Web3ReactProvider>
  );
}

export default MyApp;
