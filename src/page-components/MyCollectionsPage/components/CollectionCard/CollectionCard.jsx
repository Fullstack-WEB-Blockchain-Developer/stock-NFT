import { useState } from "react";
//next
import Image from "next/image";
import { useRouter } from "next/router";
//styles
import styles from "./CollectionCard.module.scss";
import { ThreeDotsButton } from "../ThreeDotsButton/ThreeDotsButton";

export const CollectionCard = ({
  auctionedNfts,
  id,
  listedNfts,
  logoImage,
  name,
  nfts,
  publicAddress,
  userProfileImage,
  username,
}) => {
  const router = useRouter();

  const [imageErrors, setImageErrors] = useState({
    user: false,
    collection: false,
  });

  const handleOpenEdit = (e) => {
    e.stopPropagation();
    router.push(`/my-collections/edit-collection/${id}`);
  };

  return (
    <div className={styles.wrapper} onClick={() => router.push(`/my-collections/${id}`)}>
      <div className={styles.collectionImageWrapper}>
        {logoImage && !imageErrors.collection && (
          <Image
            src={logoImage}
            loader={({ src }) => `${process.env.BACKEND_ASSETS_URL}/collectionImages/${src}`}
            layout="fill"
            alt="collection-logo"
            onError={() => setImageErrors({ ...imageErrors, collection: true })}
          />
        )}
        <div className={styles.userImageWrapper}>
          {userProfileImage && !imageErrors.user && (
            <Image
              src={userProfileImage}
              loader={({ src }) => `${process.env.BACKEND_ASSETS_URL}/profileImages/${src}`}
              layout="fill"
              alt="user-image"
              onError={() => setImageErrors({ ...imageErrors, user: true })}
            />
          )}
        </div>
        <ThreeDotsButton className={styles.threeDots} onClick={(e) => handleOpenEdit(e)} />
      </div>
      <div className={styles.infoWrapper}>
        <div className={styles.collectionName}>
          <span>{name}</span>
        </div>
        <div className={styles.userName}>
          <span>
            {username ||
              `${publicAddress.substring(0, 6)}...${publicAddress.substring(publicAddress.length - 6)}`}
          </span>
        </div>
        {nfts ? (
          <div className={styles.nftsData}>
            <span>
              {nfts} NFTs {(listedNfts || auctionedNfts) && "/"} {listedNfts && `${listedNfts} Listed`}
              {listedNfts && auctionedNfts && ","} {auctionedNfts && `${auctionedNfts} in Auction`}
            </span>
          </div>
        ): <></>}
      </div>
    </div>
  );
};
