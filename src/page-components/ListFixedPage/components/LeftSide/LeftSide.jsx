import { useState } from "react";
//next
import Image from "next/image";
//classnames
import cn from "classnames";
//styles
import styles from "./LeftSide.module.scss";

export const LeftSide = ({ className, firstTokenData }) => {
  const [tokens, setTokens] = useState([{ ...firstTokenData, isOpened: true }]);

  const handleRemoveToken = (id) => {};

  const toggleOpen = (id) => {
    const tokensArray = [...tokens];
    const token = tokensArray.find((token) => token.id === id);
    token.isOpened = !token.isOpened;

    setTokens([...tokensArray]);
  };

  return (
    <div className={cn(className, styles.wrapper)}>
      <div className={styles.leftSideTitle}>
        <span>List item for sale</span>
      </div>
      {tokens.map(({ name, id }) => (
        <div className={styles.tokenListedWrapper} key={id}>
          <div className={styles.tokenListedHead}>
            <span>{name}</span>
            <div className={styles.deleteArrowWrapper}>
              <span onClick={() => handleRemoveToken(id)}>
                <Image alt="trash-icon" height={19} src="/!!!!fakeImage.png" width={19} />
              </span>
              <span onClick={() => toggleOpen(id)}>
                {tokens.find((token) => token.id === id).isOpened ? (
                  <Image alt="arrow-down-icon" src="/view-token/Icon-ArrowDown.svg" height={8} width={16} />
                ) : (
                  <Image alt="arrow-up-icon" src="/view-token/Icon-ArrowUp.svg" height={8} width={16} />
                )}
              </span>
            </div>
          </div>
          <div className={styles.title}>
              <span>Type</span>
          </div>
          <div className={styles.listTypesWrapper}>
              {['Fixed price', 'Time auction'].map(elem => (
                  <div key={elem} className={styles.listType}>
                  <Image alt="arrow-up-icon" src="/view-token/Icon-ArrowUp.svg" height={8} width={16} />
                  </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};
