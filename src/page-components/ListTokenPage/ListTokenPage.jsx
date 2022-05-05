import { useEffect } from "react";
//redux
import { useDispatch } from "react-redux";
import { addToken } from "../../redux/slices/ListTokenSlice";
//components
import { LeftSide } from "./components/LeftSide/LeftSide";
import { RightSide } from "./components/RightSide/RightSide";
//styles
import styles from "./ListTokenPage.module.scss";

export const ListTokenPage = ({ id, name }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      addToken({
        asBundle: false,
        bundleDescription: "",
        bundleName: "",
        currency: "none",
        id,
        isReserved: false,
        listingType: "fixedPrice",
        name,
        price: undefined,
        specificBuyerAddress: ''
      })
    );
  }, [dispatch, id, name]);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.wrapper}>
        <LeftSide className={styles.leftSide} />
        <RightSide className={styles.rightSide} />
      </div>
    </div>
  );
};
