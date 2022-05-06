import { useState, useEffect } from "react";
//next
import Image from "next/image";
//redux
import { useSelector } from "react-redux";
import { open as openSuccess } from "../../../../../../redux/slices/successSnackbarSlice";
//mui
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

export const CompleteListingModal = ({ isOpened, handleClose, currencies }) => {
  const [activeStep, setActiveStep] = useState("initialization");
  const { tokens } = useSelector((state) => state.listToken);

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
          <div style={{ fontSize: "22px", fontWeight: "bold" }}>
            <span>Complete your listing</span>
          </div>
          <div onClick={handleClose} style={{ cursor: "pointer", width: "15px" }}>
            <Image src="/create-nft/Icon-Close.svg" alt="close-icon" width={15} height={15} />
          </div>
        </div>
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            maxHeight: "50wh",
            overflowY: "scroll",
            marginBottom: "16px",
          }}
        >
          <div>
            {tokens.map(({ fileName, id, name, collection, price, currency, usdPrice }) => (
              <div
                key={id}
                style={{
                  display: "flex",
                  padding: "24px 0",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      position: "relative",
                      borderRadius: "8px",
                      width: "63px",
                      height: "63px",
                    }}
                  >
                    <Image
                      alt={`${name}-image`}
                      layout="fill"
                      loader={({ src }) => `${process.env.BACKEND_ASSETS_URL}/nftMedia/${src}`}
                      src={fileName}
                    />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", marginLeft: "16px" }}>
                    <span style={{ color: "var(--light-grey)", fontSize: "16px" }}>{collection?.name}</span>
                    <span style={{ fontWeight: "600", fontSize: "18px", marginTop: "4px" }}>{name}</span>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {currencies.length > 0 && (
                    <>
                      <span style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                        <Image
                          alt={`currency`}
                          width={19}
                          height={19}
                          loader={({ src }) => `${process.env.BACKEND_ASSETS_URL}/icons/${src}`}
                          src={currencies.find(({ name }) => name === currency)?.icon}
                        />
                        <span style={{ fontWeight: "600", fontSize: "18px", textAlign: "right" }}>
                          {price}
                        </span>
                      </span>
                      {usdPrice && (
                        <span style={{ marginTop: "4px", fontSize: "16px", textAlign: "right" }}>
                          ${usdPrice}
                        </span>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              border: "1px solid #282829",
              borderRadius: "7px",
            }}
          >
            <div
              style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  padding: "16px",
                  alignItems: "center",
                  borderBottom: "1px solid var(--dark-grey)",
                }}
              >
                <div
                  style={{
                    border: `2px solid ${
                      activeStep === "initialization" ? "var(--primary)" : "var(--light-grey)"
                    }`,
                    alignItems: "center",
                    borderRadius: "50%",
                    display: "flex",
                    fontSize: "18px",
                    fontWeight: "600",
                    height: "39px",
                    justifyContent: "center",
                    width: "39px",
                  }}
                >
                  1
                </div>
                <span style={{ fontSize: "16px", marginLeft: "16px" }}>Initialize your wallet</span>
              </div>
              {activeStep === "initialization" && (
                <span style={{ fontSize: "14px", color: "var(--primary)" }}>Waiting for initialization</span>
              )}
            </div>
            <div style={{ padding: "16px" }}>
              <span style={{ color: "var(--light-grey)", fontSize: "14px" }}>
                To get up for selling on Stoke for the first time, you must initialize your wallet, which
                requires a one - time gas fee
              </span>
            </div>
            <div
              style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  padding: "16px",
                  alignItems: "center",
                  borderBottom: "1px solid var(--dark-grey)",
                }}
              >
                <div
                  style={{
                    border: `2px solid ${activeStep === "approve" ? "var(--primary)" : "var(--light-grey)"}`,
                    alignItems: "center",
                    borderRadius: "50%",
                    display: "flex",
                    fontSize: "18px",
                    fontWeight: "600",
                    height: "39px",
                    justifyContent: "center",
                    width: "39px",
                  }}
                >
                  2
                </div>
                <span style={{ fontSize: "16px", marginLeft: "16px" }}>Approve this item for sale</span>
              </div>
              {activeStep === "approve" && (
                <span style={{ fontSize: "14px", color: "var(--primary)" }}>Waiting for approval</span>
              )}
            </div>
            <div style={{ padding: "16px" }}>
              <span style={{ color: "var(--light-grey)", fontSize: "14px" }}>
                To get up for selling on Stoke for the first time, you must initialize your wallet, which
                requires a one - time gas fee
              </span>
            </div>
            <div
              style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  padding: "16px",
                  alignItems: "center",
                  borderBottom: "1px solid var(--dark-grey)",
                }}
              >
                <div
                  style={{
                    border: `2px solid ${activeStep === "confirm" ? "var(--primary)" : "var(--light-grey)"}`,
                    alignItems: "center",
                    borderRadius: "50%",
                    display: "flex",
                    fontSize: "18px",
                    fontWeight: "600",
                    height: "39px",
                    justifyContent: "center",
                    width: "39px",
                  }}
                >
                  3
                </div>
                <span style={{ fontSize: "16px", marginLeft: "16px" }}>Confirm 0.1 ETH listing</span>
              </div>
              {activeStep === "approve" && (
                <span style={{ fontSize: "14px", color: "var(--primary)" }}>Waiting for confirmation</span>
              )}
            </div>
            <div style={{ padding: "16px" }}>
              <span style={{ color: "var(--light-grey)", fontSize: "14px" }}>
                To get up for selling on Stoke for the first time, you must initialize your wallet, which
                requires a one - time gas fee
              </span>
            </div>
          </div>
        </Container>
      </Box>
    </Modal>
  );
};
