import { useEffect } from "react";
//redux
import { useSelector, useDispatch } from "react-redux";
import { getAllCurrencies } from "../../../../../../../../redux/slices/generalDataSlice";
//styles
import styles from "./ListFixedPriceInputs.module.scss";

export const ListFixedPriceInputs = () => {
  const dispatch = useDispatch();
  const { currencies, error } = useSelector((state) => state.generalData);

  useEffect(() => {
    currencies.length === 0 && dispatch(getAllCurrencies());
  }, [dispatch, currencies]);

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
    <>
      <div className={styles.title}>
        <span>Price</span>
      </div>
    </>
  );
};
