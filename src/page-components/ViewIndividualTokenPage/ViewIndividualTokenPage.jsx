import { useState, useEffect, useRef } from "react";
//next
import Image from "next/image";
//redux
import { open as openError } from "../../redux/slices/errorSnackbarSlice";
import { useDispatch } from "react-redux";
//classnames
import cn from "classnames";
//components
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

export const ViewIndividualTokenPage = ({
  status,
  name,
  fileName,
  externalLink,
  description,
  properties,
  levels,
  stats,
  user,
  blockchainName,
  collectionName,
  offers,
  about,
}) => {
  const dispatch = useDispatch();

  const [imageErrors, setImageErrors] = useState({
    tokenImage: false,
    blockchainTypeIcon: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [typeOfTokenFile, setTypeOfTokenFile] = useState();
  const [tokenFileLink, setTokenFileLink] = useState("/");

  const [ratio, setRatio] = useState(16 / 9);

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

  const tokenImageLoader = () => {
    return `${process.env.BACKEND_ASSETS_URL}/nftMedia/${fileName}`;
  };

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

  return (
    <div className={styles.wrapper}>
      <div className={styles.topSection}>
        <div className={styles.leftSide}>
          <div className={styles.tokenImageWrapper}>
            <div className={styles.blockchainTypeAndLikes}>
              {imageErrors.blockchainTypeIcon ? (
                <Image src="/noImage.png" layout="fill" alt="token-image" />
              ) : (
                <Image
                  src={blockchainName === "Ethereum" ? "/view-token/Icon-Eth.svg" : "/view-token/Polygon.svg"}
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
            /// fake data
            likes={fakeLikes}
            usdPrice={fakePrice.usd}
            ethPrice={fakePrice.eth}
            listing={fakeListing}
            ///
          />
        </div>
      </div>
      <div className={styles.bottomSection}>
        <BottomInfoWrapper activity={offers.concat(fakeListing)} />
      </div>
      <SuccessfulOrderModal />
    </div>
  );
};
