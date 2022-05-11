import { useEffect } from 'react';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { addToken, getAllUserTokens, clearError } from '../../redux/slices/ListTokenSlice';
import { open as openError } from '../../redux/slices/errorSnackbarSlice';
//components
import { LeftSide } from './components/LeftSide/LeftSide';
import { RightSide } from './components/RightSide/RightSide';
//styles
import styles from './ListTokenPage.module.scss';

export const ListTokenPage = ({ id, name, price, owner, fileName, category, collection, status }) => {
  const dispatch = useDispatch();
  const { error, tokens } = useSelector((state) => state.listToken);

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
    tokens.length === 0 && dispatch(getAllUserTokens());
  }, [dispatch, tokens.length]);
  console.log('---tokens', tokens);

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
    <div className={styles.pageContainer}>
      <div className={styles.wrapper}>
        <LeftSide className={styles.leftSide} />
        <RightSide className={styles.rightSide} />
      </div>
    </div>
  );
};
