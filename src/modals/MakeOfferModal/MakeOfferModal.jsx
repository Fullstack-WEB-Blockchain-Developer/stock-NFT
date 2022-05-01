import { useEffect, useState, useCallback } from "react";
//redux
import { useDispatch } from "react-redux";
import { open as openError } from "../../redux/slices/errorSnackbarSlice";
import { open as openSuccess } from "../../redux/slices/successfulOrderSlice";
import { addOffer } from "../../redux/slices/offersSlice";
//next
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
//axios
import axios from "axios";
//mui
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Select, MenuItem, TextField, Checkbox } from "@mui/material";
//components
import { CustButton } from "../../components/CustButton/CustButton";
import { ComposedTextField } from "./ComposedTextField";
import { ConnectWalletModal } from "../ConnectWalletModal/ConnectWalletModal";
import { TransferApprovalModal } from "../TransferApprovalModal/TransferApprovalModal";
//hooks
import useAuth from "../../hooks/useAuth";
import { useStyles } from "../../hooks/useStyles";
//utils
import { daysSelectArray, getExpirationDate } from "./MakeOfferModal.utils";
import { toHex, Offer, getEtherPrice, switchNetwork } from "../../utils";
//styles
import { styles as jsStyles } from "../modalStyles/modalJsStyles";
import cssStyles from "./MakeOfferModal.module.css";
//web3
import { useWeb3React } from "@web3-react/core";
//ethers
import { ethers } from "ethers";
//contracts
import tokenArtifacts from "../../../artifacts/contracts/WETH.sol/WETH9.json";

Date.prototype.toDateInputValue = function () {
  const local = new Date(this);
  let hours = local.getHours();
  let minutes = local.getMinutes();

  if (hours < 10) hours = `0${hours}`;
  if (minutes < 10) minutes = `0${minutes}`;

  return `${hours}:${minutes}`;
};

const etherChain = process.env.ETHER_CHAIN;
const polygonChain = process.env.POLYGON_CHAIN;
const eth_tokenAddr = process.env.ETH_TOKEN;
const eth_stokeMarketAddr = process.env.ETH_MARKET;
const pol_tokenAddr = process.env.POL_TOKEN;
const pol_stokeMarketAddr = process.env.POL_MARKET;
let tokenContract;
let etherPrice;
let tokenAddr;
let stokeMarketAddr;
let supportNetwork;

export const MakeOfferModal = ({ isOpened, handleClose, tokenNetwork }) => {
  const { account, activate, library, chainId } = useWeb3React();

  const { isAuthorized } = useAuth();
  const dispatch = useDispatch();
  const router = useRouter();

  const [isTransferApprovalModalOpened, setIsTransferApprovalModalOpened] = useState(false);
  const [disabledButton, setDisabledButton] = useState(true);
  const [currencyTypes, setCurrencyTypes] = useState([]);
  const [modalData, setModalData] = useState({
    currency: {},
    balance: {
      ETHBalance: 0,
      WETHBalance: 0,
    },
    amount: 0,
    pricePerItem: "$0",
    offerExpirationDays: "3 days",
    offerExpirationTime: new Date().toDateInputValue(),
    agreed: false,
  });
  const muiClasses = useStyles();

  console.log("🚀 ~ file: MakeOfferModal.jsx ~ line 73 ~ MakeOfferModal ~ modalData", modalData.balance)

  const loadIcon = ({ src }) => {
    return `${process.env.BACKEND_ASSETS_URL}/nftMedia/${src}`;
  };

  const sendOfferToServer = async () => {
    const {
      query: { tokenId },
    } = router;

    const { offerExpirationDays, offerExpirationTime, amount } = modalData;
    const expirationDate = getExpirationDate(offerExpirationDays, offerExpirationTime);

    try {
      const accessToken = localStorage.getItem("accessToken");

      await axios
        .post(
          `${process.env.BACKEND_URL}/offers`,
          {
            price: Number(amount),
            expirationDate,
            nftId: Number(tokenId),
            currencyId: modalData.currency.id,
          },
          {
            headers: {
              Authorization: "Bearer " + accessToken,
            },
          }
        )
        .then(async ({ data }) => {
          handleClose();

          const ethPrice = await getEtherPrice();
          dispatch(addOffer({ ...data, usdPrice: (ethPrice * Number(amount)).toFixed(3) }));

          dispatch(
            openSuccess({
              title: "Your order was successfully placed",
              description:
                "To trade this token, you must first complete a free (plus gas) transaction. <br/> Confirm it in your wallet and keep this tab open!",
            })
          );
        });
    } catch (e) {
      dispatch(
        openError(e.response?.data ? `${e.response.data.statusCode} ${e.response.data.message}` : e.message)
      );
    }
  };

  const getTokenBalance = async () => {
    const tokenBalanceWei = await tokenContract.balanceOf(account);
    const WETH = ethers.utils.formatEther(tokenBalanceWei);

    async function getBalance() {
      if (library) {
        const signer = await library.getSigner();
        const wei = await signer.getBalance();
        const amount = ethers.utils.formatEther(wei);
        return Number(amount).toFixed(1);
      }
    }
    getBalance().then((result) =>
      setModalData({ ...modalData, balance: { ETHBalance: result, WETHBalance: WETH } })
    );
  };

  const getCurrencies = async () => {
    try {
      const { data } = await axios.get(`${process.env.BACKEND_URL}/offers/currencyTypes/all`);
      setCurrencyTypes([...data]);
      setModalData({ ...modalData, currency: data[0] });
    } catch (e) {
      dispatch(
        openError(e.response?.data ? `${e.response.data.statusCode} ${e.response.data.message}` : e.message)
      );
    }
  };

  const getPricePerItem = async () => {
    return await getEtherPrice();
  };

  const handleMakeOffer = async () => {
    if (modalData.currency.name === "ETH") {
      dispatch(openError("Offers must use wrapped ETH or an ERC-20 token"));
      return;
    }

    if (chainId !== supportNetwork) {
      await switchNetwork(supportNetwork, library);
      dispatch(
        openSuccess({
          title: "The network has been changed successfully.",
        })
      );
    } else {
      // await tokenContract.deposit({from: account, value:ethers.utils.parseEther('0.1')})
      const value = modalData.amount;
      const offerClass = new Offer({ contractAddress: tokenAddr, signer: library?.getSigner(), library });
      const nonce = await tokenContract.nonces(account);
      const { offer, signature } = await offerClass.makeOffer(
        account,
        stokeMarketAddr,
        String(value * 10 ** 18),
        ethers.utils.formatUnits(nonce) * 10 ** 18,
        Date.now("2022-04-20")
      );

      const signData = ethers.utils.splitSignature(signature);
      const { v, r, s } = signData;

      try {
        const accessToken = localStorage.getItem("accessToken");
        const {
          data: { isTransferApproved },
        } = await axios.get(`${process.env.BACKEND_URL}/users/checkTransferApproval`, {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        });

        if (!isTransferApproved) {
          setIsTransferApprovalModalOpened(true);
        } else {
          sendOfferToServer();
        }
      } catch (e) {
        dispatch(
          openError(e.response?.data ? `${e.response.data.statusCode} ${e.response.data.message}` : e.message)
        );
      }
    } 
  };

  useEffect(() => {
      if (chainId !== supportNetwork) {
        (async() => {
          await switchNetwork(supportNetwork, library);
          dispatch(
            openSuccess({
              title: "The network has been changed successfully.",
            })
          );
        })()
      }
  }, [isOpened]);

  useEffect(() => {
    if (
      modalData.currency &&
      modalData.amount &&
      modalData.pricePerItem &&
      modalData.agreed &&
      (modalData.offerExpirationDays !== "None" || modalData.offerExpirationTime)
    ) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [
    modalData.currency,
    modalData.amount,
    modalData.pricePerItem,
    modalData.agreed,
    modalData.offerExpirationDays,
    modalData.offerExpirationTime,
  ]);

  useEffect(() => {
    if (library) {
      if (tokenNetwork === "ethereum") {
        tokenAddr = eth_tokenAddr;
        stokeMarketAddr = eth_stokeMarketAddr;
        supportNetwork = etherChain;
      } else if (tokenNetwork === "polygon") {
        tokenAddr = pol_tokenAddr;
        stokeMarketAddr = pol_stokeMarketAddr;
        supportNetwork = polygonChain;
      }
      if (chainId === supportNetwork) {
        const IToken = new ethers.ContractFactory(
          tokenArtifacts.abi,
          tokenArtifacts.deployedBytecode,
          library?.getSigner()
        );
        tokenContract = IToken.attach(tokenAddr);
        account && getTokenBalance();
      }
    }
  }, [account, library]);

  useEffect(() => {
    if (modalData.amount < 0) setModalData({ ...modalData, amount: 0 });
  }, [modalData.amount]);

  useEffect(() => {
    setModalData({ ...modalData, pricePerItem: `$${(modalData.amount * etherPrice).toFixed(3)}` });
  }, [modalData.amount]);

  useEffect(() => {
    getPricePerItem().then((result) => {
      etherPrice = result;
    });

    getCurrencies();
  }, []);

  return (
    <>
      {isAuthorized ? (
        <Modal
          open={isOpened}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={jsStyles.wrapper}>
            <Typography id="modal-modal-title" variant="h6" component="h2" style={jsStyles.header}>
              <span>Make an offer</span>
              <div className={cssStyles.cross} onClick={handleClose}>
                <Image
                  src="/create-nft/Icon-Close.svg"
                  alt="close-icon"
                  width={15}
                  height={15}
                  onClick={handleClose}
                />
              </div>
            </Typography>
            <section className={cssStyles.section}>
              Price
              <ComposedTextField
                modalData={modalData}
                currencies={currencyTypes}
                setModalData={setModalData}
              />
              <div className={cssStyles.balance}>
                {modalData.currency.name === "ETH" && (
                  <span>Balance: {modalData.balance.ETHBalance} ETH</span>
                )}
                {modalData.currency.name === "WETH" && (
                  <span>Balance: {modalData.balance.WETHBalance} WETH</span>
                )}
              </div>
              <div className={cssStyles.offerExpiration}>
                <span>Offer Expiration</span>
              </div>
              <div className={cssStyles.dateSelectsWrapper}>
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
                  sx={{ width: "30%", maxHeight: "56px", color: "white" }}
                  className={muiClasses.select}
                  value={modalData.offerExpirationDays}
                  InputLabelProps={{
                    style: { color: "var(--shadow)" },
                  }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        maxHeight: "250px",
                      },
                    },
                  }}
                  InputProps={{ style: { color: "white" } }}
                  onChange={({ target: { value } }) =>
                    setModalData({ ...modalData, offerExpirationDays: value })
                  }
                >
                  {daysSelectArray.map((elem) => (
                    <MenuItem key={elem} value={elem}>
                      <span>{elem}</span>
                    </MenuItem>
                  ))}
                </Select>
                <TextField
                  fullWidth
                  id=""
                  type="time"
                  variant="outlined"
                  sx={{
                    width: "67.5%",
                    marginLeft: "2.5%",
                    '& input[type="time"]::-webkit-calendar-picker-indicator': {
                      filter: "invert(100%) sepia(0%)",
                    },
                  }}
                  className={muiClasses.textField}
                  value={modalData.offerExpirationTime}
                  onChange={({ target: { value } }) =>
                    setModalData({ ...modalData, offerExpirationTime: value })
                  }
                  InputLabelProps={{
                    style: { color: "var(--shadow)" },
                  }}
                  InputProps={{ style: { color: "white" } }}
                />
              </div>
              <div className={cssStyles.termsOfService}>
                <Checkbox
                  sx={{
                    color: "var(--light-grey)",
                    "&.Mui-checked": {
                      color: "var(--light-grey)",
                    },
                    position: "relative",
                    bottom: "1px",
                  }}
                  checked={modalData.agreed}
                  onChange={({ target: { checked } }) => setModalData({ ...modalData, agreed: checked })}
                />
                <span className={cssStyles.marginLeft8}>
                  By checking this box, I agree to{" "}
                  <Link href="" passHref>
                    <span className={cssStyles.link}>Stoke’s Terms of Service</span>
                  </Link>
                </span>
              </div>
            </section>
            <footer className={cssStyles.footer}>
              <CustButton
                color="primary"
                disabled={disabledButton}
                onClick={() => handleMakeOffer()}
                text="Make Offer"
              />
            </footer>
            <TransferApprovalModal
              isOpened={isTransferApprovalModalOpened}
              handleClose={() => setIsTransferApprovalModalOpened(false)}
              sendOfferToServer={sendOfferToServer}
            />
          </Box>
        </Modal>
      ) : (
        <ConnectWalletModal isOpened={isOpened} onClose={handleClose} />
      )}
    </>
  );
};
