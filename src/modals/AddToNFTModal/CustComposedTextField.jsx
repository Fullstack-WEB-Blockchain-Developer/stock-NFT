import { useEffect, useState } from "react";
//mui
import TextField from "@mui/material/TextField";
//styles
import cssStyles from "./AddToNFTModal.module.css";
//hooks
import { useStyles } from "../../hooks/useStyles";

export const CustComposedTextField = ({ nftValue, maxValue, modalData, setModalData, index }) => {
  const [fieldValue, setfieldValue] = useState(nftValue);
  const [maxFieldValue, setMaxFieldValue] = useState(maxValue);
  const muiClasses = useStyles();

  const handleChange = (newValue, label, index) => {
    const data = [...modalData];

    if (label === "Value" && Number(newValue) > maxFieldValue) {
      data[index].nftValue = maxFieldValue;
      setfieldValue(maxFieldValue);
    } else if (label === "Value") {
      data[index].nftValue = newValue;
      setfieldValue(newValue);
    } else if (label === "Max Value") {
      data[index].maxValue = newValue;
      setMaxFieldValue(newValue);
    }

    setModalData([...data]);
  };

  return (
    <div className={cssStyles.select}>
      <TextField
        fullWidth
        id=""
        type="number"
        label="Value"
        variant="outlined"
        sx={{ width: "40%" }}
        className={muiClasses.textFieldLeftHalf}
        value={fieldValue}
        onChange={({ target: { value } }) => handleChange(value, "Value", index)}
        InputLabelProps={{
          style: { color: "var(--shadow)" },
        }}
        InputProps={{ style: { color: "white" } }}
      />
      <div className={cssStyles.of}>
        <span>Of</span>
      </div>
      <TextField
        fullWidth
        id=""
        label="Max Value"
        type="number"
        variant="outlined"
        sx={{ width: "40%" }}
        className={muiClasses.textFieldRightHalf}
        value={maxFieldValue}
        onChange={({ target: { value } }) => handleChange(value, "Max Value", index)}
        InputLabelProps={{
          style: { color: "var(--shadow)" },
        }}
        InputProps={{ style: { color: "white" } }}
      />
    </div>
  );
};
