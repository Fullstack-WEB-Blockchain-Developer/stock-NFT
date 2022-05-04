import { useState } from "react";
//next
import Image from "next/image";
//classnames
import cn from "classnames";
//styles
import styles from "./ListedToken.module.scss";
import { ListFixedPriceInputs } from "./components/ListFixedPriceInputs/ListFixedPriceInputs";

export const ListedToken = ({ name, id, tokens }) => {
  const [isOpened, setIsOpened] = useState(true);
  const [listingType, setListingType] = useState("fixedPrice");

  const handleRemoveToken = (id) => {};

  return (
    <div className={styles.tokenListedWrapper}>
      <div className={styles.tokenListedHead}>
        <span>{name}</span>
        <div className={styles.deleteArrowWrapper}>
          <span onClick={() => handleRemoveToken(id)}>
            <Image alt="trash-icon" height={19} src="/!!!!fakeImage.png" width={19} />
          </span>
          <span onClick={() => setIsOpened(!isOpened)}>
            {isOpened ? (
              <Image alt="arrow-down-icon" src="/view-token/Icon-ArrowDown.svg" height={8} width={16} />
            ) : (
              <Image alt="arrow-up-icon" src="/view-token/Icon-ArrowUp.svg" height={8} width={16} />
            )}
          </span>
        </div>
      </div>
      <div
        className={cn(styles.tokenInfoWrapper, {
          [styles.isOpened]: isOpened,
        })}
      >
        <div className={styles.title}>
          <span>Type</span>
        </div>
        <div className={styles.listTypesWrapper}>
          {[
            { text: "Fixed price", camelCase: "fixedPrice" },
            { text: "Time auction", camelCase: "timeAuction" },
          ].map(({ text, camelCase }) => (
            <div
              key={camelCase}
              className={cn(styles.listType, {
                [styles.activeType]: listingType === camelCase,
              })}
              onClick={() => setListingType(camelCase)}
            >
              <Image alt="aquares-icon" src="/profile-settings/Icon-Site.svg" height={42} width={42} />
              <span>{text}</span>
            </div>
          ))}
        </div>
        {listingType === "fixedPrice" ? <ListFixedPriceInputs /> : <></>}
      </div>
    </div>
  );
};
