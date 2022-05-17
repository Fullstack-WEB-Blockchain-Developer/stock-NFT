import { useState, useEffect } from "react";
//next
import Image from "next/image";
//redux
import { useDispatch, useSelector } from "react-redux";
import {
  clearOffsetAndTokens,
  getItems,
  setData,
} from "../../../../../../redux/slices/profileFiltrationSlice";
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

export const Price = ({ currencies }) => {
  const dispatch = useDispatch();
  const { selectedPrice } = useSelector((state) => state.profileFiltration);

  const [choosenCurrency, setChoosenCurrency] = useState({ name: "none" });
  const [min, setMin] = useState(selectedPrice.min);
  const [max, setMax] = useState(selectedPrice.max);
  const [disablesButton, setDisabledButton] = useState(true);
  const muiClasses = useStyles();

  useEffect(() => {
    if (Number(max) < 0) setMax("0");
    if (Number(min) < 0) setMin("0");
    if (Number(min) > Number(max)) setMin(max);
    if (min && max && choosenCurrency.name !== "none") setDisabledButton(false);
    else setDisabledButton(true);
  }, [min, max, choosenCurrency]);

  const handleChange = (value) => {
    const result = currencies.find(({ name }) => name === value);
    setChoosenCurrency(result);
  };

  const handleClick = () => {
    dispatch(
      setData({
        field: "selectedPrice",
        data: {
          min,
          max,
          currency: choosenCurrency,
        },
      })
    );
    dispatch(clearOffsetAndItems());
    dispatch(getItems());
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
        onChange={({ target: { value } }) => handleChange(value)}
        value={choosenCurrency?.name}
        className={muiClasses.select}
      >
        <MenuItem disabled style={{ color: "var(--dark-grey)" }} value="none">
          <span style={{ color: "var(--dark-grey)" }} className={styles.menuItem}>
            <span>Select a currency</span>
          </span>
        </MenuItem>
        {currencies.map(({ name, icon, id }) => (
          <MenuItem key={id} value={name}>
            <span className={styles.menuItem}>
              <Image
                alt={`${name}-icon`}
                height={19}
                loader={({ src }) => `${process.env.BACKEND_ASSETS_URL}/icons/${src}`}
                src={icon}
                width={19}
              />
              <span>{name}</span>
            </span>
          </MenuItem>
        ))}
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
