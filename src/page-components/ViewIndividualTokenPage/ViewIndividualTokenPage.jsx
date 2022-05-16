import { useState, useEffect, useRef } from "react";
//next
import Image from "next/image";
import { useRouter } from "next/router";
//redux
import { open as openError } from "../../redux/slices/errorSnackbarSlice";
import { open as openSuccess } from "../../redux/slices/successfulOrderSlice";
import { useDispatch } from "react-redux";
//classnames
import cn from "classnames";
//components
import { CustButton } from "../../components/CustButton/CustButton";
import { LeftSideInfoWrapper } from "./components/LeftSideInfoWrapper/LeftSideInfoWraper";
import { RightSideInfoWrapper } from "./components/RightSideInfoWrapper/RightSideInfoWrapper";
import { BottomInfoWrapper } from "./components/BottomInfoWrapper/BottomInfoWrapper";
import { SuccessfulOrderModal } from "../../modals/SuccessfulOrderModal/SuccessfulOrderModal";
//spinner
import { Oval } from "react-loader-spinner";
//utils
import { videos, audios, images } from "../../helpers/extentions";
import { fakeLikes, fakeListing, fakePrice } from "./ViewIndividualToken.utils";
//styles
import styles from "./ViewIndividualTokenPage.module.css";

import { useWeb3React } from "@web3-react/core";
import axios from "axios";
import { toHex, Offer, switchNetwork } from "../../utils";

const etherChain = process.env.ETHER_CHAIN;
const polygonChain = process.env.POLYGON_CHAIN;
const eth_tokenAddr = process.env.ETH_TOKEN;
const eth_stokeMarketAddr = process.env.ETH_MARKET;
const eth_nftAddr = process.env.ETH_NFT;
const pol_tokenAddr = process.env.POL_TOKEN;
const pol_stokeMarketAddr = process.env.POL_MARKET;
const pol_nftAddr = process.env.POL_NFT;

export const ViewIndividualTokenPage = ({
  about,
  blockchainName,
  collectionName,
  description,
  externalLink,
  fileName,
  levels,
  name,
  offers,
  properties,
  stats,
  status,
  user,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { tokenId } = router.query;

  const [imageErrors, setImageErrors] = useState({
    tokenImage: false,
    blockchainTypeIcon: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [typeOfTokenFile, setTypeOfTokenFile] = useState();
  const [tokenFileLink, setTokenFileLink] = useState("/");
  const [userAccount, setUserAccount] = useState("");

  const [tokenNetwork, setTokenNetwork] = useState("");
  const [ratio, setRatio] = useState(16 / 9);

  const { account, library, chainId } = useWeb3React();

  const videoRef = useRef();
  const audioRef = useRef();

  const handleError = (message, callback) => {
    callback();
    dispatch(openError(message));
    setIsLoading(false);
  };

  const handleLoadImage = (width, height) => {
    setRatio(100 / (width / height));
    setIsLoading(false);
  };

  const tokenImageLoader = () => `${process.env.BACKEND_ASSETS_URL}/nftMedia/${fileName}`;

  const sellHandle = async () => {
    let supportNetwork;
    if (tokenNetwork === "ethereum") {
      supportNetwork = etherChain;
    } else if (tokenNetwork === "polygon") {
      supportNetwork = polygonChain;
    }

    if (chainId !== supportNetwork) {
      // TODO: add switch network modal
      await switchNetwork(supportNetwork, library);
      dispatch(
        openSuccess({
          title: "The network has been changed successfully.",
        })
      );
    } else {
      router.push(`/token/${router.query.tokenId}/list`)
    }
  };

  // useEffect(() => {
  //   if (dataa?.data?.length > 0 && tokenId) {
  //     tokenIdone(tokenId)
  //   }

  // }, [dataa?.data, tokenId])
  // useEffect(() => {
  //   if (acc) {
  //     timer1(tokenId)
  //   }

  // }, [acc, tokenId, ffind, web3main])

  // useEffect(() => {
  //   if (tokenId) {
  //     window.scrollTo(0, 0)
  //   }
  // }, [tokenId])
  // useEffect(() => {
  //   if (library) {
  //     if (tokenId) {
  //       saleNft(tokenId)
  //       auctionDetail(tokenId)
  //       timer(tokenId)
  //       nftInfo(tokenId)
  //       aucstatm(tokenId)
  //       owner(tokenId)
  //     }
  //   }
  // }, [tokenId, acc, dataa?.data?.length, web3main])

  // const saleNft = async (id) => {
  //   if (library) {
  //     marketContract.listofsaleNft(id).call({ from: account })
  //       .then((length) => {
  //         setbuyprice((Number(length[3])) / 1000000000000000000)
  //         setaucbuyprice(((Number(length[2])) / 1000000000000000000))
  //         ffind?.set('collectionId', fdata ? fdata[7] : null)
  //         ffind?.set('nftPrice', `${((Number(length[3])) / 1000000000000000000)}`)
  //         ffind?.set('auction', `${(((Number(length[2])) / 1000000000000000000))}`)
  //         ffind?.set('csprice', "0")

  //         ffind?.save()
  //       })
  //       .catch()
  //   }
  // }

  // const buyfixednft = async (collectionid, tokenId, amount) => {

  //   if (library) {
  //     setShow(true)


  //     let userwalletaddresss = account;
  //     let swaping = new web3main.eth.Contract(nft, addrs)
  //     let amountIn = web3main.utils.toBN(fromExponential((amount) * Math.pow(10, 18)));
  //     let address = '0x0000000000000000000000000000000000000000'
  //     marketContract.buynft(collectionid, tokenId, address).send({ from: userwalletaddresss, value: amountIn })
  //       .then((recipt) => {
  //         ffind?.set('nftPrice', "0")
  //         ffind?.save()
  //         setShow(false)

  //         history.push('/mycollection')
  //       })
  //       .catch((err) => {
  //         setShow(false)

  //       })

  //   }
  // }
  // const auctionDetail = async (id) => {
  //   if (library) {

  //     let userwalletaddresss = account;
  //     let swaping = new web3main.eth.Contract(nft, addrs)

  //     marketContract.auctionDetail(id).call({ from: userwalletaddresss })
  //       .then((value) => {
  //         var aucde = {
  //           id: value[1],
  //           val: (Number(value[0]))?.length > 21 ? Number(value[0]) / 1000000000000000000000000000000000000 : Number(value[0]) / 1000000000000000000,
  //           userid: id
  //         }
  //         ffind?.set('highauch', `${((Number(value[0]))?.length > 21 ? Number(value[0]) / 1000000000000000000000000000000000000 : Number(value[0]) / 1000000000000000000)}`)
  //         ffind?.save().then((v) => console.log(v))
  //         setauch(aucde)
  //         console.log('auction high bid', aucde)
  //       }).catch()

  //   }
  // }
  // const aucstatm = async (tokenId) => {
  //   if (library) {
  //     marketContract.nftauctionend(tokenId).call({ from: userwalletaddresss })
  //       .then((length) => {
  //         console.log("alll", length);
  //         setaucstat(length)
  //       })
  //       .catch()
  //   }
  // }
  // const removeauc = async (tokenId) => {
  //   if (library) {
  //     setShow(true)

  //     let userwalletaddresss = account;
  //     let swaping = new web3main.eth.Contract(nft, addrs)
  //     marketContract.removesfromauction(tokenId).send({ from: userwalletaddresss })
  //       .then((length) => {
  //         console.log(length);
  //         ffind?.set('auction', "0")
  //         ffind?.save()
  //         window.location.reload()
  //       })
  //       .catch()
  //   }
  // }
  // const removesale = async (collectionid, tokenId) => {
  //   if (library) {
  //     setShow(true)

  //     let userwalletaddresss = account;
  //     let swaping = new web3main.eth.Contract(nft, addrs)
  //     marketContract.cancelfixedsale(tokenId).send({ from: userwalletaddresss })
  //       .then((length) => {
  //         console.log(length);
  //         ffind?.set('nftPrice', "0")
  //         ffind?.save()
  //         window.location.reload()
  //       })
  //       .catch()

  //   }
  // }
  // const owner = async (tokenId) => {
  //   if (library) {

  //     let userwalletaddresss = account;
  //     let swaping = new web3main.eth.Contract(nft, addrs)
  //     marketContract.originalowner(tokenId).call({ from: userwalletaddresss })
  //       .then((length) => {
  //         console.log("aaaa", length);
  //         setnowner(length)
  //       })
  //       .catch()
  //   }
  // }
  // const upgradebtn = async (tokenId) => {
  //   if (library) {

  //     let userwalletaddresss = account;
  //     setShow(true)
  //     let swaping = new web3main.eth.Contract(nft, addrs)
  //     if (checkval) {
  //       let amountIn = web3main.utils.toBN(fromExponential((newbid) * Math.pow(10, 18)));
  //       marketContract.upgradeauction(tokenId, checkval).send({ from: userwalletaddresss, value: amountIn })
  //         .then((recipt) => {
  //           console.log(recipt);
  //           window.location.reload()
  //         })
  //         .catch()
  //     } else {
  //       marketContract.upgradeauction(tokenId, checkval).send({ from: userwalletaddresss, value: 0 })
  //         .then((recipt) => {
  //           console.log(recipt);
  //           window.location.reload()
  //         })
  //         .catch()

  //     }
  //   }
  // }
  // const buyauctionnft = async (tokenId, amount) => {
  //   if (library) {
  //     setShow(true)


  //     let userwalletaddresss = account;
  //     let swaping = new web3main.eth.Contract(nft, addrs)
  //     let amountIn = web3main.utils.toBN(fromExponential((amount) * Math.pow(10, 18)));
  //     marketContract.buyauction(tokenId).send({ from: userwalletaddresss, value: amountIn })
  //       .then((recipt) => {
  //         ffind?.set('highauch', `${amount}`)
  //         ffind?.save()
  //         setShow(false)
  //         window.location.reload()
  //       })
  //       .catch((err) => {
  //         setShow(false)
  //       })
  //   }
  // }

  // const claimauctionnft = async (collectionid, tokenId) => {
  //   if (library) {
  //     setShow(true)

  //     let userwalletaddresss = account;
  //     let swaping = new web3main.eth.Contract(nft, addrs)
  //     marketContract.claim(collectionid, tokenId).send({ from: userwalletaddresss })
  //       .then((recipt) => {
  //         ffind?.set("auction", "0")
  //         ffind?.save()
  //         setShow(false)
  //         history.push('/mycollection')
  //       })
  //       .catch((err) => {
  //         setShow(false)
  //       })
  //   }
  // }
  // // const fixedsale = async (collectionid, tokenId, price) => {
  // //   setShow(true)
  // //   if (library) {


  // //     let userwalletaddresss = account;
  // //     let swaping = new web3main.eth.Contract(nft, addrs)
  // //     let amount = web3main.utils.toBN(fromExponential(((parseFloat(price)) * Math.pow(10, 18))));

  // //     marketContract.fixedsales(tokenId, amount, false).send({ from: userwalletaddresss })
  // //       .then((length) => {
  // //         if (length.status === true) {
  // //           ffind?.set("nftPrice", `${price}`)
  // //           ffind?.save()
  // //           setShow(false)
  // //           history.push('/mycollection')
  // //         } else {
  // //           alert('failed')
  // //         }
  // //       })
  // //       .catch((err) => {
  // //         setShow(false)

  // //       })
  // //   }
  // // }

  // const nftInfo = async (id) => {
  //   if (library) {

  //     let userwalletaddresss = account;
  //     let swaping = new web3main.eth.Contract(nft, addrs)

  //     marketContract.nftInformation(id).call({ from: userwalletaddresss })
  //       .then((fees) => {
  //         console.log("pop22", fees)
  //         ffind?.set("collectionId", `${fees[4]}`)
  //         ffind?.save().then((v) => console.log(v))
  //         setfdata(fees)
  //       }).catch()

  //   }
  // }
  // const tokenIdone = async (id) => {
  //   if (library) {


  //     let userwalletaddresss = account;
  //     let swaping = new web3main.eth.Contract(nft, addrs)

  //     marketContract.nftInformation(id).call({ from: userwalletaddresss })
  //       .then(async (fees) => {
  //         const findc = await dataa?.data?.find(p => p?.attributes?.tokenId === fees[0])
  //         if (findc) {
  //           console.log('vbvbyesss')

  //         } else {
  //           const GameScore = Moralis.Object.extend("CREATECSDOGENFT");
  //           const gameScore = new GameScore();
  //           gameScore?.set("nftName", fees[1]);
  //           gameScore?.set("tokenId", fees[0]);
  //           gameScore?.set("nftOwner", fees[3]);
  //           gameScore?.set("nftDes", JSON.parse(fdata[5])[0]);
  //           gameScore?.set("nftImg", fees[6]);
  //           gameScore?.set('datatype', JSON.parse(fdata[5])[1])
  //           gameScore?.save().then(v => console.log('vbvb1', v))
  //         }

  //       }).catch()
  //   }
  // }

  // // const auction = async (tokenId, price, endday, endhours) => {
  // //   if (library) {
  // //     setShow(true)

  // //     let userwalletaddresss = account;
  // //     let swaping = new web3main.eth.Contract(nft, addrs)
  // //     let amountIn = web3main.utils.toBN(fromExponential((price) * Math.pow(10, 18)));

  // //     marketContract.startAuction(tokenId, amountIn, endday, endhours).send({ from: userwalletaddresss })
  // //       .then((recipt) => {
  // //         if (recipt.status === true) {
  // //           ffind?.set("auction", `${price}`)
  // //           ffind?.set("days", `${endday}`)
  // //           ffind?.set("hr", `${endhours}`)
  // //           ffind?.set("min", "0")
  // //           ffind?.save()

  // //           setShow(false)
  // //           history.push('/mycollection')

  // //         } else {
  // //           alert('failed')
  // //         }
  // //       })
  // //       .catch(err => {
  // //         setShow(false)
  // //       })
  // //   }
  // // }

  // const timer = async (id) => {
  //   if (library) {
  //     marketContract.timing(id).call({ from: account })
  //       .then((fees) => {
  //         var day = Math.floor(fees / 86400)
  //         var hr = Math.floor((fees - day * 86400) / 3600)
  //         var minutesout = Math.floor((fees - day * 86400 - hr * 3600) / 60);
  //         setTime({ id: id, d: day, h: hr, m: minutesout })
  //       }).catch()
  //   }
  // }
  // const timer1 = async (id) => {
  //   if (library) {
  //     marketContract.timing(id).call({ from: account })
  //       .then((fees) => {
  //         var day = Math.floor(fees / 86400)
  //         var hr = Math.floor((fees - day * 86400) / 3600)
  //         var minutesout = Math.floor((fees - day * 86400 - hr * 3600) / 60);
  //         console.log("hr", hr)
  //         console.log("day", day)
  //         console.log("min", minutesout)

  //         ffind?.set("days", `${day}`)
  //         ffind?.set("hr", `${hr}`)
  //         ffind?.set("min", `${minutesout}`)
  //         ffind?.save().then((v) => console.log("vv", v))
  //         settime({ id: id, d: day, h: hr, m: minutesout })
  //       }).catch()
  //   }
  // }

  useEffect(() => {
    const end = fileName.substring(fileName.indexOf(".") + 1).toLowerCase();
    if (images.includes(end)) {
      setTypeOfTokenFile("image");
    } else if (videos.includes(end)) {
      setTypeOfTokenFile("video");
      setTokenFileLink(`${process.env.BACKEND_ASSETS_URL}/nftMedia/${fileName}`);
    } else if (audios.includes(end)) {
      setTypeOfTokenFile("audio");
      setTokenFileLink(`${process.env.BACKEND_ASSETS_URL}/nftMedia/${fileName}`);
    }
  }, [fileName]);

  useEffect(() => {
    if (audioRef.current?.src || videoRef.current?.src) {
      setIsLoading(false);
    }
  }, [typeOfTokenFile]);

  useEffect(() => {
    const account = localStorage.getItem("account");
    setUserAccount(account);
  }, []);

  useEffect(() => {
    (async () => {
      const response = await axios.get(`${process.env.BACKEND_URL}/nfts/${tokenId}`);
      const { blockchainType } = response.data;
      setTokenNetwork(String(blockchainType.name).toLowerCase());
    })()
  }, [tokenId]);

  return (
    <>
      {userAccount === user.publicAddress && (
        <div className={styles.headBar}>
          <CustButton text="Edit" color="ghost" />
          <CustButton
            color="primary"
            onClick={sellHandle}
            text="Sell"
          />
        </div>
      )}
      <div className={styles.wrapper}>
        <div className={styles.topSection}>
          <div className={styles.leftSide}>
            <div className={styles.tokenImageWrapper}>
              <div className={styles.blockchainTypeAndLikes}>
                {imageErrors.blockchainTypeIcon ? (
                  <Image src="/noImage.png" layout="fill" alt="token-image" />
                ) : (
                  <Image
                    src={
                      blockchainName === "Ethereum" ? "/view-token/Icon-Eth.svg" : "/view-token/Polygon.svg"
                    }
                    width={19}
                    height={19}
                    alt="blockchain-type"
                    onError={(e) =>
                      handleError("Something went wrong with blockchain type", () =>
                        setImageErrors({ ...imageErrors, blockchainTypeIcon: true })
                      )
                    }
                  />
                )}
                <div className={styles.likesWrapper}>
                  <Image src="/view-token/Icon-Heart.svg" width={19} height={19} alt="likes" />
                  <span>{fakeLikes}</span>
                </div>
              </div>
              <div
                className={cn(styles.tokenImageContainer, {
                  [styles.videoContainer]: typeOfTokenFile === "video",
                  [styles.audioContainer]: typeOfTokenFile === "audio",
                })}
              >
                <div
                  className={cn(styles.tokenImage, {
                    [styles.videoContainer]: typeOfTokenFile === "video",
                    [styles.audioContainer]: typeOfTokenFile === "audio",
                  })}
                >
                  {isLoading && (
                    <div className={styles.spinner}>
                      <Oval
                        ariaLabel="loading-indicator"
                        height={70}
                        width={70}
                        strokeWidth={3}
                        color="var(--black)"
                        secondaryColor="var(--light-grey)"
                      />
                    </div>
                  )}
                  {typeOfTokenFile === "image" &&
                    (imageErrors.tokenImage ? (
                      <div className={styles.emptySection}>
                        <span>No file</span>
                      </div>
                    ) : (
                      <Image
                        src={tokenFileLink}
                        loader={tokenImageLoader}
                        alt="token-image"
                        objectFit="contain"
                        layout="responsive"
                        width="100%"
                        height={`${ratio}%`}
                        onError={() =>
                          handleError("404 Token file is not found", () =>
                            setImageErrors({ ...imageErrors, tokenImage: true })
                          )
                        }
                        onLoadingComplete={({ naturalWidth, naturalHeight }) =>
                          handleLoadImage(naturalWidth, naturalHeight)
                        }
                      />
                    ))}
                  {typeOfTokenFile === "video" && (
                    <video
                      src={tokenFileLink}
                      controls="controls"
                      autoPlay={true}
                      alt="token-video"
                      ref={videoRef}
                      className={styles.video}
                    />
                  )}
                  {typeOfTokenFile === "audio" && (
                    <audio
                      src={tokenFileLink}
                      controls="controls"
                      autoPlay={true}
                      alt="token-audio"
                      ref={audioRef}
                      className={styles.audio}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className={styles.leftSideInfoWrapper}>
              <LeftSideInfoWrapper
                owner={user}
                description={description}
                properties={properties}
                levels={levels}
                status={status}
                stats={stats}
                about={about}
              />
            </div>
          </div>
          <div className={styles.rightSide}>
            <RightSideInfoWrapper
              collection={collectionName}
              tokenFileName={fileName}
              name={name}
              owner={user}
              userId={user.userId}
              offers={offers}
              tokenNetwork={tokenNetwork}
              /// fake data
              likes={fakeLikes}
              usdPrice={fakePrice.usd}
              ethPrice={fakePrice.eth}
              listing={[]}
              ///
            />
          </div>
        </div>
        <div className={styles.bottomSection}>
          <BottomInfoWrapper activity={offers.concat(fakeListing)} />
        </div>
        <SuccessfulOrderModal />
      </div>
    </>
  );
};
