//mui
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
//components
import { CustButton } from "../../../../components/CustButton/CustButton";
//styles
import { style } from "./DeleteModal.utils";

export const DeleteModal = ({ isOpened, handleClose, handleDelete }) => {
  return (
    <Modal
      open={isOpened}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          sx={{ fontFamily: "Poppins, sans-serif" }}
          id="modal-modal-title"
          variant="h6"
          component="h2"
        >
          Do you really want to delete this collection?
        </Typography>
        <div style={{ display: "flex", justifyContent: "space-around", marginTop: "20px" }}>
          <CustButton color="primary" onClick={handleDelete} text="yes" />
          <CustButton color="primary" onClick={handleClose} text="no" />
        </div>
      </Box>
    </Modal>
  );
};
