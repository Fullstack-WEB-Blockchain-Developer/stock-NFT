import { useState } from "react";
//classnames
import cn from "classnames";
//styles
import styles from "./LeftSide.module.scss";
import { ListedToken } from "./components/ListedToken/ListedToken";

export const LeftSide = ({ className, firstTokenData }) => {
  const [tokens, setTokens] = useState([firstTokenData]);

  return (
    <div className={cn(className, styles.wrapper)}>
      <div className={styles.leftSideTitle}>
        <span>List item for sale</span>
      </div>
      {tokens.map(({ name, id }) => (
        <ListedToken tokens={tokens} key={id} id={id} name={name} />
      ))}
    </div>
  );
};
