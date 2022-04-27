import { useState, useEffect } from "react";
//redux
import { useDispatch, useSelector } from "react-redux";
import { setData } from "../../../../../../redux/slices/profileFiltrationSlice";
//mui
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
//components
import { CustButton } from "../../../../../../components/CustButton/CustButton";
//hooks
import { useStyles } from "../../../../../../hooks/useStyles";
//styles
import styles from "./Price.module.scss";

export const Price = () => {
  const dispatch = useDispatch();
  const { selectedPrice } = useSelector((state) => state.profileFiltration);

  const [choosenCurrency, setChoosenCurrency] = useState(selectedPrice.currency);
  const [min, setMin] = useState(selectedPrice.min);
  const [max, setMax] = useState(selectedPrice.max);
  const [disablesButton, setDisabledButton] = useState(true);
  const muiClasses = useStyles();

  useEffect(() => {
    if (Number(min) < 0) setMin("0");
    if (Number(min) > Number(max)) setMin(max);

    if (min && max) setDisabledButton(false);
    else setDisabledButton(true);
  }, [min, max]);

  const handleClick = () => {
    const text = choosenCurrency === "usd" && "USD";
    dispatch(
      setData({
        field: "selectedPrice",
        data: {
          min,
          max,
          currency: choosenCurrency,
          text
        },
      })
    );
  };

  return (
    <div className={styles.wrapper}>
      <Select
        fullWidth
        labelId="demo-simple-select-filled-label"
        id="demo-simple-select-filled"
        style={{
          color: "white",
        }}
        onChange={({ target: { value } }) => setChoosenCurrency(value)}
        value={choosenCurrency}
        className={muiClasses.select}
      >
        <MenuItem value="usd">
          <span>United States Dollar (USD)</span>
        </MenuItem>
        <MenuItem value="eth">
          <span>Ethers (ETH)</span>
        </MenuItem>
      </Select>
      <div className={styles.textfields}>
        <TextField
          id="from"
          label="Min"
          variant="outlined"
          className={muiClasses.textField}
          value={min}
          onChange={({ target: { value } }) => setMin(value)}
          InputProps={{ style: { color: "white" } }}
          type="number"
        />
        <div className={styles.between}>
          <span>to</span>
        </div>
        <TextField
          id="from"
          label="Max"
          variant="outlined"
          className={muiClasses.textField}
          value={max}
          onChange={({ target: { value } }) => setMax(value)}
          InputProps={{ style: { color: "white" } }}
          type="number"
        />
      </div>
      <CustButton
        text="Apply"
        color="primary"
        disabled={disablesButton}
        className={styles.button}
        onClick={handleClick}
      />
    </div>
  );
};
