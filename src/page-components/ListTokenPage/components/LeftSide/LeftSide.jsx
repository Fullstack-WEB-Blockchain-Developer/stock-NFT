import { useState } from "react";
//redux
import { useSelector, useDispatch } from "react-redux";
//classnames
import cn from "classnames";
//components
import { CustButton } from "../../../../components/CustButton/CustButton";
import { ListedToken } from "./components/ListedToken/ListedToken";
import { AddTokenModal } from "./components/AddTokenModal/AddTokenModal";
//styles
import styles from "./LeftSide.module.scss";

export const LeftSide = ({ className }) => {
  const [isAddModalOpened, setIsAddModalOpened] = useState(false);
  const { tokens } = useSelector((state) => state.listToken);

  return (
    <div className={cn(className, styles.wrapper)}>
      <div className={styles.leftSideTitle}>
        <span>List item for sale</span>
      </div>
      {tokens.map(({ id }) => (
        <ListedToken key={id} id={id} />
      ))}
      <div className={styles.addToken}>
        <CustButton text="+ Add Token" color="primary" onClick={() => setIsAddModalOpened(true)} />
      </div>
      <div className={styles.completeListing}>
        <CustButton text="Complete Listing" color="primary" disabled={true} onClick={() => {}} />
      </div>
      <AddTokenModal
        isOpened={isAddModalOpened}
        handleClose={() => setIsAddModalOpened(false)}
        tokens={tokens}
      />
    </div>
  );
};
