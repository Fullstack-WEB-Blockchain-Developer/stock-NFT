import { useState, useEffect } from "react";
//next
import Image from "next/image";
//redux
import { useSelector, useDispatch } from "react-redux";
import { getAllChains } from "../../../../redux/slices/generalDataSlice";
//mui
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
//hooks
import { useStyles } from "../../../../hooks/useStyles";
//styles
import styles from "./CreatorFeeAndBlockChains.module.scss";

export const CreatorFeeAndBlockChains = ({ values, setValues }) => {
  const muiClasses = useStyles();
  const dispatch = useDispatch();

  const [error, setError] = useState({ isError: false, helperText: "" });
  const { chains } = useSelector((state) => state.generalData);

  useEffect(() => {
    (!chains || chains.length === 0) && dispatch(getAllChains());
  }, [chains, dispatch]);

  useEffect(() => {
    if (values.creatorFee < 0) setValues({ ...values, creatorFee: 0 });

    if (values.creatorFee > 10) {
      setError({ isError: true, helperText: "Creator earnings cannot be greater than 10%" });
    } else {
      setError({ isError: false, helperText: "" });
    }
  }, [values.creatorFee]);

  return (
    <>
      <div className={styles.title}>
        <span>Creator earnings</span>
      </div>
      <div className={styles.description}>
        <span>The number of items that can be minted. No gas cost to you!</span>
      </div>
      <div className={styles.title}>
        <span>Creator Fee</span>
      </div>
      <div className={styles.description}>
        <span>
          Collect a fee when a user re-sells an item you originally created. This is deducted from the final
          sale price and paid monthly to a payout address of your choosing.
        </span>
      </div>
      <TextField
        error={error.isError}
        helperText={error.isError && error.helperText}
        fullWidth
        id="creatorFee"
        label="e.g. 2.5"
        variant="outlined"
        className={error.isError ? muiClasses.textFieldError : muiClasses.textField}
        value={values.creatorFee}
        onChange={({ target: { value } }) => setValues({ ...values, creatorFee: value })}
        InputProps={{ style: { color: "white" } }}
        type="number"
      />
      {values.creatorFee && values.creatorFee > 0 && (
        <>
          <div className={styles.title}>
            <span>
              Your payout wallet address<span className={styles.star}>*</span>
            </span>
          </div>
          <TextField
            error={error.isError}
            helperText={error.isError && error.helperText}
            fullWidth
            id="address"
            label="Please enter an address"
            variant="outlined"
            className={error.isError ? muiClasses.textFieldError : muiClasses.textField}
            value={values.walletAddress}
            onChange={({ target: { value } }) => setValues({ ...values, walletAddress: value })}
            InputProps={{ style: { color: "white" } }}
          />
        </>
      )}
      <div className={styles.title}>
        <span>Blockchain</span>
      </div>
      <div className={styles.description}>
        <span>
          Select the blockchain where you’d like new items from this collection to be added by default.
        </span>
      </div>
      <Select
        fullWidth
        labelId="demo-simple-select-filled-label"
        id="demo-simple-select-filled"
        style={{
          color: "white",
        }}
        onChange={({ target: { value } }) => setValues({ ...values, category: value })}
        value={values.category}
        className={muiClasses.select}
      >
        <MenuItem disabled value="none">
          <span style={{ color: "rgb(77, 77, 77)" }}>Select Category</span>
        </MenuItem>
        {chains.map(({ name, icon, id }) => (
          <MenuItem key={id} value={name}>
            <span className={styles.menuItem}>
              <Image
                alt={`${name}-icon`}
                height={28}
                loader={({ src }) => `${process.env.BACKEND_ASSETS_URL}/icons/${src}`}
                src={icon}
                width={28}
              />
              <span>{name}</span>
            </span>
          </MenuItem>
        ))}
      </Select>
    </>
  );
};
