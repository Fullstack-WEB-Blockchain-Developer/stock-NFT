import { useState, useEffect } from "react";
//next
import Image from "next/image";
//redux
import { useDispatch, useSelector } from "react-redux";
import { addToken } from "../../../../../../redux/slices/ListTokenSlice";
//mui
import { Container, Select, MenuItem } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
//hooks
import { useStyles } from "../../../../../../hooks/useStyles";
//styles
import { styles as jsStyles } from "../../../../../../modals/modalStyles/modalJsStyles";
import { CustButton } from "../../../../../../components/CustButton/CustButton";
//import cssStyles from "./AddTokenModal.module.scss";

export const AddTokenModal = ({ isOpened, handleClose, tokens }) => {
  const dispatch = useDispatch();
  const muiClasses = useStyles();
  const availableTokens = useSelector((state) => state.listToken.allUserTokens).filter(
    (token) => tokens.every((elem) => elem.id !== token.id) && token
  );
  const [choosenToken, setChoosenToken] = useState("none");
  const [disabledButton, setDisabledButton] = useState(true);

  useEffect(() => {
    choosenToken !== "none" && setDisabledButton(false);
  }, [choosenToken]);

  const handleAccept = () => {
    const token = availableTokens.find(({ name }) => name === choosenToken);
    dispatch(addToken(token));
    handleClose();
  };

  return (
    <Modal
      open={isOpened}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ fontFamily: "Poppins, sans-serif" }}
    >
      <Box sx={jsStyles.wrapper}>
        <div
          style={{
            display: "flex",
            padding: "24px",
            justifyContent: "space-between",
            borderBottom: "1px solid var(--dark-grey)",
          }}
        >
          <div style={{ fontSize: "18px", fontWeight: "bold" }}>
            <span>Add Token</span>
          </div>
          <div onClick={handleClose} style={{ cursor: "pointer", width: "15px" }}>
            <Image src="/create-nft/Icon-Close.svg" alt="close-icon" width={15} height={15} />
          </div>
        </div>
        <Container sx={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              padding: "24px 0",
              justifyContent: "space-between",
              borderBottom: "1px solid var(--dark-grey)",
            }}
          >
            <Select
              fullWidth
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              style={{
                color: "white",
              }}
              onChange={({ target: value }) => setChoosenToken(value)}
              value={choosenToken}
              className={muiClasses.select}
            >
              <MenuItem disabled value="none">
                <span style={{ color: "rgb(77, 77, 77)" }}>Select Items</span>
              </MenuItem>
              {availableTokens.map(({ name, fileName, id }) => (
                <MenuItem key={id} value={name}>
                  <span>
                    {fileName && (
                      <Image
                        alt={`${name}-icon`}
                        height={63}
                        loader={({ src }) => `${process.env.BACKEND_ASSETS_URL}/nftMedia/${src}`}
                        src={fileName}
                        width={63}
                      />
                    )}
                    <span>{name}</span>
                  </span>
                </MenuItem>
              ))}
            </Select>
          </div>
        </Container>
        <div
          style={{
            display: "flex",
            padding: "24px",
            justifyContent: "space-between",
            borderBottom: "1px solid var(--dark-grey)",
          }}
        >
          <CustButton text="Accept" onClick={handleAccept} color="primary" disabled={disabledButton} />
        </div>
      </Box>
    </Modal>
  );
};
