import { useEffect } from "react";
//redux
import { useDispatch, useSelector } from "react-redux";
import { addToken, getAllUserTokens, clearError } from "../../redux/slices/ListTokenSlice";
import { open as openError } from "../../redux/slices/errorSnackbarSlice";
//components
import { LeftSide } from "./components/LeftSide/LeftSide";
import { RightSide } from "./components/RightSide/RightSide";
//styles
import styles from "./ListTokenPage.module.scss";

export const ListTokenPage = ({ id, name, price, owner, fileName, category, collection, status }) => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.listToken);

  useEffect(() => {
    dispatch(
      addToken({
        asBundle: false,
        bundleDescription: "",
        bundleName: "",
        category,
        collection,
        currency: "none",
        fileName,
        id,
        initialPrice: price,
        isReserved: false,
        listingType: "fixedPrice",
        name,
        owner,
        price: undefined,
        specificBuyerAddress: "",
        status,
        bundle: [],
      })
    );
  }, [dispatch, id, name, owner, fileName, category, price, collection, status]);

  useEffect(() => {
    dispatch(getAllUserTokens());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      dispatch(
        openError(
          error.response?.data
            ? `${error.response.data.statusCode} ${error.response.data.message}`
            : error.message
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
