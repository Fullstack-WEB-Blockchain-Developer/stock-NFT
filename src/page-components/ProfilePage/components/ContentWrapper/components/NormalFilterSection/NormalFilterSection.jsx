import { useState, useEffect } from "react";
//redux
import { useDispatch, useSelector } from "react-redux";
import {
  setData,
  clearOffsetAndItems,
  getItems,
} from "../../../../../../redux/slices/profileFiltrationSlice";
//classnames
import cn from "classnames";
//mui
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
//hooks
import { useDebounce } from "../../../../../../hooks/useDebounce";
import { useStyles } from "../../../../../../hooks/useStyles";
//utils
import { readyFilterOptions } from "./NormalFilterSection.utils";
//styles
import styles from "./NormalFilterSection.module.scss";
import Image from "next/image";

export const NormalFilterSection = () => {
  const dispatch = useDispatch();
  const muiClasses = useStyles();

  const initialFilterText = useSelector((state) => state.profileFiltration.filterText);
  const { itemsSelect, readyFilterOption, itemsGridScale } = useSelector((state) => state.profileFiltration);

  const [searchText, setSearchText] = useState(initialFilterText);

  const debouncedSearchText = useDebounce(searchText, 350);

  const handleChangeRightSelect = (selectValue) => {
    const result = readyFilterOptions.find((elem) => elem.text === selectValue);
    const { text, sortOrder, sortBy } = result;
    dispatch(setData({ field: "readyFilterOption", data: { text, sortBy, sortOrder } }));
    dispatch(clearOffsetAndItems());
    dispatch(getItems());
  };

  useEffect(() => {
    dispatch(setData({ field: "filterText", data: debouncedSearchText }));
    dispatch(clearOffsetAndItems());
    dispatch(getItems());
  }, [debouncedSearchText, dispatch]);

  return (
    <div className={styles.wrapper}>
      <TextField
        className={muiClasses.textField}
        id="search"
        InputProps={{
          style: { color: "white" },
          startAdornment: (
            <span style={{ marginRight: "8px", display: "flex", alignItems: "center" }}>
              <Image src="/search-icon.svg" width={19} height={19} alt="search" />
            </span>
          ),
        }}
        placeholder="Search"
        onChange={({ target: { value } }) => setSearchText(value)}
        type="text"
        sx={{ width: "39%" }}
        value={searchText}
        variant="outlined"
      />
      <div className={styles.centralSelect}>
        <Select
          fullWidth
          id="filter-items"
          style={{
            color: "white",
          }}
          onChange={({ target: { value } }) => dispatch(setData({ field: "itemsSelect", data: value }))}
          value={itemsSelect}
          className={muiClasses.select}
        >
          <MenuItem value="Single Items">
            <span>Single Items</span>
          </MenuItem>
          <MenuItem value="All Items">
            <span>All Items</span>
          </MenuItem>
          <MenuItem value="Bundles">
            <span>Bundles</span>
          </MenuItem>
        </Select>
      </div>
      <Select
        fullWidth
        id="filter-items"
        style={{
          color: "white",
        }}
        onChange={({ target: { value } }) => handleChangeRightSelect(value)}
        value={readyFilterOption.text}
        className={muiClasses.select}
      >
        {readyFilterOptions.map(({ text }) => (
          <MenuItem key={text} value={text}>
            <span>{text}</span>
          </MenuItem>
        ))}
      </Select>
      <div className={styles.styleButtons}>
        <div
          className={cn(styles.styleButton, {
            [styles.activeButton]: itemsGridScale === "large",
          })}
          onClick={() => dispatch(setData({ field: "itemsGridScale", data: "large" }))}
        >
          <Image src="/profile/SquaresFour.svg" width={27} height={27} alt="squares" />
        </div>
        <div
          className={cn(styles.styleButton, {
            [styles.activeButton]: itemsGridScale === "small",
          })}
          onClick={() => dispatch(setData({ field: "itemsGridScale", data: "small" }))}
        >
          <Image src="/profile/SquaresFour-1.svg" width={27} height={27} alt="squares" />
        </div>
      </div>
    </div>
  );
};
