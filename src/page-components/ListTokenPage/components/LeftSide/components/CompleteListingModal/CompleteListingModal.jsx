import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
//next
import { useRouter } from 'next/router';
import Image from 'next/image';
//redux
import { useSelector, useDispatch } from 'react-redux';
import { open as openError } from 'src/redux/slices/errorSnackbarSlice';
import { open as openSuccess } from 'src/redux/slices/successfulOrderSlice';
//mui
import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
//utils
import { images, audios, videos } from 'src/helpers/extentions';
import {
  sendFixedPriceToServer,
  sendTimedAuctionToServer,
} from './CompleteListingModal.utils';
//styles
import { styles as jsStyles } from '../../../../../../modals/modalStyles/modalJsStyles';
//ethers
import { ethers } from 'ethers';
//web3
import { useWeb3React } from '@web3-react/core';
//contract
import stokeNFTArtifacts from '../../../../../../../artifacts/contracts/StokeNFT.sol/StokeNFT.json';
import marketPlaceArtifacts from '../../../../../../../artifacts/contracts/StokeMarketPlace.sol/StokeMarketplace.json';
import tokenArtifacts from '../../../../../../../artifacts/contracts/WETH.sol/WETH9.json';
import { toHex, Offer, switchNetwork } from 'src/utils';

import { UserContext } from '../../../../ListTokenPage';

const etherChain = process.env.ETHER_CHAIN;
const polygonChain = process.env.POLYGON_CHAIN;
const eth_tokenAddr = process.env.ETH_TOKEN;
const eth_stokeMarketAddr = process.env.ETH_MARKET;
const eth_nftAddr = process.env.ETH_NFT;
const pol_tokenAddr = process.env.POL_TOKEN;
const pol_stokeMarketAddr = process.env.POL_MARKET;
const pol_nftAddr = process.env.POL_NFT;

let tokenContract;
let nftContract;
let marketContract;
let tokenAddr;
let stokeMarketAddr;
let nftAddr;

export const CompleteListingModal = ({ isOpened, handleClose, currencies }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState('initialization');
  const { tokens } = useSelector((state) => state.listToken);
  const { account, library, chainId } = useWeb3React();
  const tokenNetwork = useContext(UserContext);
  const { stokeFee, creatorRoyalty } = useSelector(
    (state) => state.administration.fees
  );

  //get contract
  useEffect(() => {
    if (library) {
      console.log(tokenNetwork);
      let supportNetwork;
      if (tokenNetwork === 'ethereum') {
        tokenAddr = eth_tokenAddr;
        stokeMarketAddr = eth_stokeMarketAddr;
        nftAddr = eth_nftAddr;
        supportNetwork = etherChain;
      } else if (tokenNetwork === 'polygon') {
        tokenAddr = pol_tokenAddr;
        stokeMarketAddr = pol_stokeMarketAddr;
        nftAddr = pol_nftAddr;
        supportNetwork = polygonChain;
      }

      // if (chainId !== supportNetwork) {
      //   // TODO: add switch network modal
      //   (async () => {
      //     await switchNetwork(supportNetwork, library);
      //     dispatch(
      //       openSuccess({
      //         title: "The network has been changed successfully.",
      //       })
      //     );
      //   })()
      // }
      const IToken = new ethers.ContractFactory(
        tokenArtifacts.abi,
        tokenArtifacts.deployedBytecode,
        library?.getSigner()
      );

      console.log('---tokenAddr', tokenAddr);
      if (tokenAddr) {
        tokenContract = IToken?.attach(tokenAddr);

        const IStokeNFT = new ethers.ContractFactory(
          stokeNFTArtifacts.abi,
          stokeNFTArtifacts.deployedBytecode,
          library?.getSigner()
        );
        nftContract = IStokeNFT.attach(nftAddr);

        const IMarket = new ethers.ContractFactory(
          marketPlaceArtifacts.abi,
          marketPlaceArtifacts.deployedBytecode,
          library?.getSigner()
        );
        marketContract = IMarket?.attach(stokeMarketAddr);
      }
    }
  }, [account, library, tokenNetwork]);

  useEffect(() => {
    if (nftContract && marketContract) {
      (async () => {
        try {
          const accessToken = localStorage.getItem('accessToken');
          const {
            data: { isTransferApproved },
          } = await axios.get(
            `${process.env.BACKEND_URL}/users/checkTransferApproval`,
            {
              headers: {
                Authorization: 'Bearer ' + accessToken,
              },
            }
          );

          if (!isTransferApproved) {
            // await tokens.forEach(async(token) => {
            //   await nftContract.approve(marketContract.address, token.id)
            //   .then(() => {
            //     setActiveStep("confirm");
            //   });
            // });
            // setIsTransferApprovalModalOpened(true);
          } else {
            setActiveStep('confirm');
            (async () => {
              if (isOpened && activeStep === 'confirm') {
                const fixedSaleData = {
                  tokenIds: [],
                  prices: [],
                  startTimes: [],
                  endTimes: [],
                  nftAddrs: [],
                };
                const auctionSaleData = {
                  tokenIds: [],
                  minPrices: [],
                  maxPrices: [],
                  startTimes: [],
                  endTimes: [],
                  nftAddrs: [],
                };

                // const offerClass = new Offer({ contractAddress: tokenAddr, signer: library.getSigner(), library });
                // const nonce = await tokenContract.nonces(account);
                // // TODO: add support for multiple tokens ERC721 permit
                // const { offer, signature } = await offerClass.makeOffer(
                //   account,
                //   stokeMarketAddr,
                //   String(1 * 10 ** 18),
                //   ethers.utils.formatUnits(nonce) * 10 ** 18,
                //   Math.floor(new Date(expirationDate) / 1000)
                // );

                // please use sendFixedPriceToServer functions with these parameters
                // tokens.map((token) =>
                //   sendFixedPriceToServer({ ...token, currency: currencies.find(({ name }) => name === token.currency) })
                // );

                // const res = await tokens.reduce(async (memo, v) => {
                //   const results = await memo;
                //   console.log(`S ${v}`)
                //   await sleep(10);
                //   console.log(`F ${v}`);
                //   return [...results, v + 1];
                // }, []);
                //and this one for timad
                console.log(
                  '🚀 ~ file: CompleteListingModal.jsx ~ line 176 ~ tokens',
                  tokens
                );
                for (const token of tokens) {
                  const startTime = Math.floor(token.duration[0] / 1000);
                  const endTime = Math.floor(token.duration[1] / 1000);

                  const offerClass = new Offer({
                    contractAddress: tokenAddr,
                    signer: library.getSigner(),
                    library,
                  });
                  const nonce = await tokenContract.nonces(account);
                  console.log(
                    '🚀 ~ file: CompleteListingModal.jsx ~ line 182 ~ nonce',
                    nonce
                  );
                  if (token.listingType === 'timeAuction') {
                    auctionSaleData.tokenIds.push(token.id);
                    auctionSaleData.minPrices.push(
                      ethers.utils.parseUnits(token.auctionStartingPrice)
                    );
                    if (token.auctionMethod === 'Sell to the highest bidder') {
                      auctionSaleData.methods.push(true);
                    } else {
                      auctionSaleData.methods.push(false);
                      auctionSaleData.maxPrices.push(
                        ethers.utils.parseUnits(token.auctionEndPrice)
                      );
                    }
                    auctionSaleData.startTimes.push(startTime);
                    auctionSaleData.endTimes.push(endTime);
                    auctionSaleData.nftAddrs.push(nftAddr);
                    // TODO: add support for multiple tokens ERC721 permit
                    const { offer, signature } = await offerClass.makeOffer(
                      account,
                      stokeMarketAddr,
                      token.auctionStartingPrice * 10 ** 18,
                      ethers.utils.formatUnits(nonce) * 10 ** 18,
                      endTime
                    );
                    console.log(
                      '🚀 ~ file: CompleteListingModal.jsx ~ line 200 ~ signature',
                      signature
                    );

                    if (signature)
                      await sendTimedAuctionToServer({
                        ...token,
                        auctionStartingCurrency: currencies.find(
                          ({ name }) => name === token.auctionStartingCurrency
                        ),
                        auctionReserveCurrency: currencies.find(
                          ({ name }) => name === token.auctionReserveCurrency
                        ),
                      });
                  } else {
                    fixedSaleData.tokenIds.push(token.id);
                    fixedSaleData.prices.push(
                      ethers.utils.parseUnits(token.price)
                    );
                    fixedSaleData.startTimes.push(startTime);
                    fixedSaleData.endTimes.push(endTime);
                    fixedSaleData.nftAddrs.push(nftAddr);
                    // TODO: add support for multiple tokens ERC721 permit
                    // const { offer, signature } = await offerClass.makeOffer(
                    //   account,
                    //   stokeMarketAddr,
                    //   token.price * 10 ** 18,
                    //   ethers.utils.formatUnits(nonce) * 10 ** 18,
                    //   endTime
                    // );
                    // console.log(
                    //   '🚀 ~ file: CompleteListingModal.jsx ~ line 200 ~ signature',
                    //   signature
                    // );
                    // if (signature) await sendFixedPriceToServer(token);
                  }
                }
                // TODO: add support for multiple tokens ERC721 permit
                // await Promise.all(tokens.map(async (token) => {
                //   const offerClass = new Offer({ contractAddress: tokenAddr, signer: library.getSigner(), library });
                //   const nonce = await tokenContract.nonces(account);
                //   const { offer, signature } = await offerClass.makeOffer(
                //     account,
                //     stokeMarketAddr,
                //     String(1 * 10 ** 18),
                //     ethers.utils.formatUnits(nonce) * 10 ** 18,
                //     Math.floor(new Date(expirationDate) / 1000)
                //   );

                // const fixedSaleData = { tokenIds: [], prices: [], startTimes: [], endTimes: [], nftAddrs: [] };
                // const auctionSaleData = { tokenIds: [], minPrices: [], maxPrices: [], startTimes: [], endTimes: [], nftAddrs: [] };
                // FIXME: this is a workaround for the fact that the contract doesn't support multiple tokens
                // // propunits filtering param
                // tokens.forEach((token) => {
                //   const startTime = Math.floor(token.duration[0] / 1000);
                //   const endTime = Math.floor(token.duration[1] / 1000);
                //   if (token.listingType === "timeAuction") {
                //      auctionSaleData.tokenIds.push(token.id);
                //     auctionSaleData.minPrices.push(String(token.auctionStartingPrice * 10 ** 18));
                //     if (token.auctionMethod === "Sell to the highest bidder") {
                //       auctionSaleData.methods.push(true);
                //     } else {
                //       auctionSaleData.methods.push(false);
                //       auctionSaleData.maxPrices.push(String(token.auctionEndPrice * 10 ** 18));
                //     }
                //     auctionSaleData.startTimes.push(startTime);
                //     auctionSaleData.endTimes.push(endTime);
                //     auctionSaleData.nftAddrs.push(nftAddr);
                //   } else {
                //     fixedSaleData.tokenIds.push(token.id);
                //     fixedSaleData.prices.push(String(token.price * 10 ** 18));
                //     fixedSaleData.startTimes.push(startTime);
                //     fixedSaleData.endTimes.push(endTime);
                //     fixedSaleData.nftAddrs.push(nftAddr);
                //   }
                // });
                // console.log("🚀 ~ file: CompleteListingModal.jsx ~ line 132 ~ auctionSaleData", auctionSaleData)
                // console.log("🚀 ~ file: CompleteListingModal.jsx ~ line 136 ~ fixedSaleData", fixedSaleData)
                //   sendTimedAuctionToServer({
                //     ...token,
                //     auctionStartingCurrency: currencies.find(({ name }) => name === token.auctionStartingCurrency),
                //     auctionReserveCurrency: currencies.find(({ name }) => name === token.auctionReserveCurrency),
                //   });
                // }));

                if (auctionSaleData.tokenIds.length > 0) {
                  await auctionSale(auctionSaleData);
                }

                if (fixedSaleData.tokenIds.length > 0) {
                  await fixedSale(fixedSaleData);
                }
              }
            })();
          }
        } catch (e) {
          dispatch(
            openError(
              e.response?.data
                ? `${e.response.data.statusCode} ${e.response.data.message}`
                : e.message
            )
          );
        }
      })();
    }
    return () => {
      setActiveStep('initialization');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpened]);

  const fixedSale = async ({ tokenIds, prices, startTimes, endTimes, nftAddrs }) => {

    if (library) {
      await marketContract
        .fixedSales(tokenIds, prices, startTimes, endTimes, nftAddrs)
        .then((result) => {
          if (result.status === true) {
            dispatch(
              openSuccess({
                title: 'Fixed sale has been created successfully.',
              })
            );
          } else {
            dispatch(
              openError({
                title: "Fixed sale hasn't been created.",
              })
            );
          }
        })
        .catch((err) => {
          console.log('🚀 ~ file: LeftSide.jsx ~ line 151 ~ fixedSale ~ err', err);
        });
    }
  };

  const auctionSale = async ({ tokenIds, startPrices, endPrices, startTimes, endTimes, nftAddrs }) => {
    console.log(
      '🚀 ~ file: CompleteListingModal.jsx ~ line 180 ~ auctionSale ~ {tokenIds, prices, startTimes, endTimes, nftAddrs}',
      { tokenIds, startPrices, endPrices, startTimes, endTimes, nftAddrs }
    );
    if (library) {
      await marketContract
        .startAuction(tokenIds, startPrices, endPrices, startTimes, endTimes, nftAddrs)
        .then((recipt) => {
          if (recipt.status === true) {
            // ffind?.set("auction", `${price}`)
            // ffind?.set("days",   `${endday}`)
            // ffind?.set("hr",   `${endhours}`)
            // ffind?.set("min", "0")
            // ffind?.save()
            dispatch(
              openSuccess({
                title: 'Fixed sale has been created successfully.',
              })
            );
          } else {
            dispatch(
              openError({
                title: "Fixed sale hasn't been created.",
              })
            );
          }
        })
        .catch((err) => {
          console.log('🚀 ~ file: CompleteListingModal.jsx ~ line 153 ~ auctionSale ~ err', err);
        });
    }
  };

  // const getTokenBalance = async () => {
  //   const tokenBalanceWei = await tokenContract.balanceOf(account);
  //   const WETH = ethers.utils.formatEther(tokenBalanceWei);

  //   async function getBalance() {
  //     if (library) {
  //       const signer = await library.getSigner();
  //       const wei = await signer.getBalance();
  //       const amount = ethers.utils.formatEther(wei);
  //       return Number(amount).toFixed(1);
  //     }
  //   }
  //   getBalance().then((result) =>
  //     setBalance({ ETHBalance: result, WETHBalance: WETH })
  //   );
  // };

  return (
    <Modal
      open={isOpened}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ fontFamily: 'Poppins, sans-serif' }}
    >
      <Box sx={jsStyles.wrapper}>
        <div
          style={{
            display: 'flex',
            padding: '24px',
            justifyContent: 'space-between',
            borderBottom: '1px solid var(--dark-grey)',
          }}
        >
          <div style={{ fontSize: '22px', fontWeight: 'bold' }}>
            <span>Complete your listing</span>
          </div>
          <div
            onClick={handleClose}
            style={{ cursor: 'pointer', width: '15px' }}
          >
            <Image
              src="/create-nft/Icon-Close.svg"
              alt="close-icon"
              width={15}
              height={15}
            />
          </div>
        </div>
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'column',
            maxHeight: '50wh',
            overflowY: 'scroll',
            marginBottom: '16px',
          }}
        >
          <div>
            {tokens.map(
              ({
                fileName,
                id,
                name,
                collection,
                price,
                currency,
                usdPrice,
              }) => (
                <div
                  key={id}
                  style={{
                    display: 'flex',
                    padding: '24px 0',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex' }}>
                    <div
                      style={{
                        position: 'relative',
                        borderRadius: '8px',
                        width: '63px',
                        height: '63px',
                      }}
                    >
                      {images.includes(
                        fileName
                          .substring(fileName.indexOf('.') + 1)
                          .toLowerCase()
                      ) && (
                        <Image
                          alt={`${name}-image`}
                          loader={({ src }) =>
                            `${process.env.BACKEND_ASSETS_URL}/nftMedia/${src}`
                          }
                          src={fileName}
                          layout="fill"
                        />
                      )}
                      {videos.includes(
                        fileName
                          .substring(fileName.indexOf('.') + 1)
                          .toLowerCase()
                      ) && (
                        <video
                          src={`${process.env.BACKEND_ASSETS_URL}/nftMedia/${fileName}`}
                          alt="token-video"
                          style={{
                            position: 'absolute',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: '100%',
                          }}
                        />
                      )}
                      {audios.includes(
                        fileName
                          .substring(fileName.indexOf('.') + 1)
                          .toLowerCase()
                      ) && (
                        <div
                          style={{
                            color: 'var(--white)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100% ',
                          }}
                        >
                          <span>
                            {fileName
                              .substring(fileName.indexOf('.') + 1)
                              .toLowerCase()}
                          </span>
                        </div>
                      )}
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        marginLeft: '16px',
                      }}
                    >
                      <span
                        style={{ color: 'var(--light-grey)', fontSize: '16px' }}
                      >
                        {collection?.name}
                      </span>
                      <span
                        style={{
                          fontWeight: '600',
                          fontSize: '18px',
                          marginTop: '4px',
                        }}
                      >
                        {name}
                      </span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {currencies.length > 0 && (
                      <>
                        <span
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                          }}
                        >
                          <Image
                            alt={`currency`}
                            width={19}
                            height={19}
                            loader={({ src }) =>
                              `${process.env.BACKEND_ASSETS_URL}/icons/${src}`
                            }
                            src={
                              currencies.find(({ name }) => name === currency)
                                ?.icon
                            }
                          />
                          <span
                            style={{
                              fontWeight: '600',
                              fontSize: '18px',
                              textAlign: 'right',
                            }}
                          >
                            {price}
                          </span>
                        </span>
                        {usdPrice && (
                          <span
                            style={{
                              marginTop: '4px',
                              fontSize: '16px',
                              textAlign: 'right',
                            }}
                          >
                            ${usdPrice}
                          </span>
                        )}
                      </>
                    )}
                  </div>
                </div>
              )
            )}
          </div>
          <div
            style={{
              border: '1px solid #282829',
              borderRadius: '7px',
            }}
          >
            <div
              style={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  padding: '16px',
                  alignItems: 'center',
                  borderBottom: '1px solid var(--dark-grey)',
                }}
              >
                <div
                  style={{
                    border: `2px solid ${
                      activeStep === 'approve' ||
                      activeStep === 'confirm' ||
                      activeStep === 'initialization'
                        ? 'var(--primary)'
                        : 'var(--light-grey)'
                    }`,
                    alignItems: 'center',
                    borderRadius: '50%',
                    display: 'flex',
                    fontSize: '18px',
                    fontWeight: '600',
                    height: '39px',
                    justifyContent: 'center',
                    width: '39px',
                  }}
                >
                  1
                </div>
                <span style={{ fontSize: '16px', marginLeft: '16px' }}>
                  Initialize your wallet
                </span>
              </div>
              {(activeStep === 'approve' ||
                activeStep === 'confirm' ||
                activeStep === 'initialization') && (
                <span style={{ fontSize: '14px', color: 'var(--primary)' }}>
                  Waiting for initialization
                </span>
              )}
            </div>
            <div style={{ padding: '16px' }}>
              <span style={{ color: 'var(--light-grey)', fontSize: '14px' }}>
                To get up for selling on Stoke for the first time, you must
                initialize your wallet, which requires a one - time gas fee
              </span>
            </div>
            <div
              style={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  padding: '16px',
                  alignItems: 'center',
                  borderBottom: '1px solid var(--dark-grey)',
                }}
              >
                <div
                  style={{
                    border: `2px solid ${
                      activeStep === 'approve' || activeStep === 'confirm'
                        ? 'var(--primary)'
                        : 'var(--light-grey)'
                    }`,
                    alignItems: 'center',
                    borderRadius: '50%',
                    display: 'flex',
                    fontSize: '18px',
                    fontWeight: '600',
                    height: '39px',
                    justifyContent: 'center',
                    width: '39px',
                  }}
                >
                  2
                </div>
                <span style={{ fontSize: '16px', marginLeft: '16px' }}>
                  Approve this item for sale
                </span>
              </div>
              {(activeStep === 'approve' || activeStep === 'confirm') && (
                <span style={{ fontSize: '14px', color: 'var(--primary)' }}>
                  Waiting for approval
                </span>
              )}
            </div>
            <div style={{ padding: '16px' }}>
              <span style={{ color: 'var(--light-grey)', fontSize: '14px' }}>
                To get up for selling on Stoke for the first time, you must
                initialize your wallet, which requires a one - time gas fee
              </span>
            </div>
            <div
              style={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  padding: '16px',
                  alignItems: 'center',
                  borderBottom: '1px solid var(--dark-grey)',
                }}
              >
                <div
                  style={{
                    border: `2px solid ${
                      activeStep === 'confirm'
                        ? 'var(--primary)'
                        : 'var(--light-grey)'
                    }`,
                    alignItems: 'center',
                    borderRadius: '50%',
                    display: 'flex',
                    fontSize: '18px',
                    fontWeight: '600',
                    height: '39px',
                    justifyContent: 'center',
                    width: '39px',
                  }}
                >
                  3
                </div>
                <span style={{ fontSize: '16px', marginLeft: '16px' }}>
                  Confirm 0.1 ETH listing
                </span>
              </div>
              {activeStep === 'confirm' && (
                <span style={{ fontSize: '14px', color: 'var(--primary)' }}>
                  Waiting for confirmation
                </span>
              )}
            </div>
            <div style={{ padding: '16px' }}>
              <span style={{ color: 'var(--light-grey)', fontSize: '14px' }}>
                To get up for selling on Stoke for the first time, you must
                initialize your wallet, which requires a one - time gas fee
              </span>
            </div>
          </div>
        </Container>
      </Box>
    </Modal>
  );
};
