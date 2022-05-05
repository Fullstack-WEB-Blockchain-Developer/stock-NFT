import { useEffect } from "react";
//redux
import { useDispatch } from "react-redux";
import { addToken } from "../../redux/slices/ListTokenSlice";
//components
import { LeftSide } from "./components/LeftSide/LeftSide";
import { RightSide } from "./components/RightSide/RightSide";
//styles
import styles from "./ListTokenPage.module.scss";

export const ListTokenPage = ({ id, name, price, owner, fileName, category, collection, status }) => {
  const dispatch = useDispatch();

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
        bundle: []
      })
    );
  }, [dispatch, id, name, owner, fileName, category, price, collection, status]);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.wrapper}>
        <LeftSide className={styles.leftSide} />
        <RightSide className={styles.rightSide} />
      </div>
    </div>
  );
};
