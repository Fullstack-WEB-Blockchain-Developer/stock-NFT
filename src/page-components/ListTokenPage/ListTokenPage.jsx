import { useState, useEffect, createContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
//redux
import { useDispatch, useSelector } from 'react-redux';
import { addToken, getAllUserTokens, clearError } from '../../redux/slices/ListTokenSlice';
import { open as openError } from '../../redux/slices/errorSnackbarSlice';
//components
import { LeftSide } from './components/LeftSide/LeftSide';
import { RightSide } from './components/RightSide/RightSide';
//styles
import styles from './ListTokenPage.module.scss';

export const UserContext = createContext()
export const ListTokenPage = ({ id, name, price, owner, fileName, category, collection, status }) => {
  const router = useRouter();
  const { tokenId } = router.query;
  const dispatch = useDispatch();
  const { error, tokens } = useSelector((state) => state.listToken);
  const [tokenNetwork, setTokenNetwork] = useState("");

  useEffect(() => {
    tokens.length === 0 &&
      dispatch(
        addToken({
          auctionMethod: 'Sell to the highest bidder',
          auctionStartingPrice: undefined,
          auctionStartingUsdPrice: undefined,
          auctionStartingCurrency: 'none',
          auctionReservePrice: undefined,
          auctionReserveUsdPrice: undefined,
          auctionReserveCurrency: 'none',
          auctionEndPrice: undefined,
          auctionEndUsdPrice: undefined,
          auctionEndCurrency: 'none',
          includeReservePrice: false,
          asBundle: false,
          bundle: [],
          bundleDescription: '',
          bundleName: '',
          category,
          collection,
          currency: 'none',
          duration: [new Date(), Date.parse(new Date()) + 1000 * 60 * 60 * 24 * 7],
          fileName,
          id,
          initialPrice: price,
          isReserved: false,
          listingType: 'fixedPrice',
          name,
          owner,
          price,
          specificBuyerAddress: '',
          status,
        })
      );
  }, [dispatch, id, name, owner, fileName, category, price, collection, status, tokens.length]);

  useEffect(() => {
    dispatch(getAllUserTokens());
    (async () => {
      const response = await axios.get(`${process.env.BACKEND_URL}/nfts/${tokenId}`);
      const { blockchainType } = response.data;
      setTokenNetwork(String(blockchainType.name).toLowerCase());
    })()
  }, [tokenId, dispatch]);

  useEffect(() => {
    if (error) {
      dispatch(
        openError(
          error.response?.data ? `${error.response.data.statusCode} ${error.response.data.message}` : error.message
        )
      );
      dispatch(clearError());
    }
  }, [error, dispatch]);

  return (
    <UserContext.Provider value={tokenNetwork}>
      <div className={styles.pageContainer}>
        <div className={styles.wrapper}>
          <LeftSide className={styles.leftSide} />
          <RightSide className={styles.rightSide} />
        </div>
      </div>
    </UserContext.Provider>
  );
};
