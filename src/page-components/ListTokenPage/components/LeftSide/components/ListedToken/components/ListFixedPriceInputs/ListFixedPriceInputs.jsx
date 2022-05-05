import { useEffect, useState } from "react";
//next
import Image from "next/image";
//redux
import { useSelector, useDispatch } from "react-redux";
import { getAllCurrencies } from "../../../../../../../../redux/slices/generalDataSlice";
//mui
import TextField from "@mui/material/TextField";
import { Select, MenuItem } from "@mui/material";
//hooks
import { useStyles } from "../../../../../../../../hooks/useStyles";
//styles
import styles from "./ListFixedPriceInputs.module.scss";

export const ListFixedPriceInputs = () => {
  const dispatch = useDispatch();
  const muiClasses = useStyles();
  const { currencies, error } = useSelector((state) => state.generalData);

  const [listingData, setListingData] = useState({
    currency: "none",
    price: undefined,
  });

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
      <Select
        fullWidth
        id=""
        type="number"
        variant="outlined"
        IconComponent={() => (
          <div style={{ right: "16px", position: "absolute", pointerEvents: "none" }}>
            <Image src="/view-token/Icon-ArrowDown.svg" height={8} width={16} alt="arrow-up" />
          </div>
        )}
        sx={{ width: "24%", maxHeight: "56px", color: "white" }}
        className={muiClasses.selectLeftHalf}
        value={listingData.currency}
        InputProps={{ style: { color: "white" } }}
        onChange={({ target: { value } }) =>
          setListingData({ ...listingData, currency: value })
        }
      >
        <MenuItem disabled value="none">
          <span style={{ color: "rgb(77, 77, 77)" }}>Select Currency</span>
        </MenuItem>
        {currencies.map(({ name, id, icon }) => (
          <MenuItem value={name} key={id}>
            <span>
              <span style={{ position: "relative", top: "3px" }}>
                <Image
                  alt="currency-icon"
                  height={31}
                  loader={({ src }) => `${process.env.BACKEND_ASSETS_URL}/icons/${src}`}
                  src={icon}
                  width={31}
                />
              </span>
              <span style={{ marginLeft: "20px", position: "relative", bottom: "6px" }}>{name}</span>
            </span>
          </MenuItem>
        ))}
      </Select>
      <TextField
        fullWidth
        id=""
        type="number"
        variant="outlined"
        sx={{ width: "76%" }}
        onChange={({ target: { value } }) => setListingData({ ...listingData, price: value })}
        className={muiClasses.textFieldRightHalf}
        value={listingData.price}
        InputProps={{ style: { color: "white" } }}
      />
    </>
  );
};
