import { useState, useEffect, useContext } from "react";
//redux
import { useSelector, useDispatch } from "react-redux";
//classnames
import cn from "classnames";
//components
import { CustButton } from "src/components/CustButton/CustButton.jsx";
import { AddTokenModal } from "./components/AddTokenModal/AddTokenModal";
import { CompleteListingModal } from "./components/CompleteListingModal/CompleteListingModal";
import { ListedToken } from "./components/ListedToken/ListedToken";
//styles
import styles from "./LeftSide.module.scss";

export const LeftSide = ({ className }) => {
  const [isAddModalOpened, setIsAddModalOpened] = useState(false);
  const [isCompleteModalOpened, setIsCompleteModalOpened] = useState(false);
  const [disabledAdd, setDisabledAdd] = useState(false);
  const [disabledComplete, setDisabledComplete] = useState(true);
  const { tokens } = useSelector((state) => state.listToken);
  const { currencies } = useSelector((state) => state.generalData);

  useEffect(() => {
    tokens.length === 10 && setDisabledAdd(true);
  }, [tokens]);

  useEffect(() => {
    const flag = tokens.every((token) => {
      if (
        (token.listingType === "fixedPrice" && (!token.price || !token.duration[0] || !token.duration[1])) ||
        (token.listingType === "timeAuction" &&
          (!token.auctionStartingPrice ||
            !token.duration[0] ||
            !token.duration[1] ||
            (token.auctionMethod === "Sell with declining price" && !token.auctionEndPrice)))
      )
        return false;
      else return true;
    });

    setDisabledComplete(!flag);
  }, [tokens]);

  return (
    <div className={cn(className, styles.wrapper)}>
      <div className={styles.leftSideTitle}>
        <span>List item for sale</span>
      </div>
      {tokens.map(({ id }) => (
        <ListedToken key={id} id={id} />
      ))}
      <div className={styles.addToken}>
        <CustButton
          color="primary"
          disabled={disabledAdd}
          onClick={() => setIsAddModalOpened(true)}
          text="+ Add Token"
        />
      </div>
      <div className={styles.completeListing}>
        <CustButton
          text="Complete Listing"
          color="primary"
          style={{width: 'fit-content'}}
          disabled={disabledComplete}
          onClick={() => setIsCompleteModalOpened(true)}
        />
      </div>
      <AddTokenModal
        handleClose={() => setIsAddModalOpened(false)}
        isOpened={isAddModalOpened}
        tokens={tokens}
      />
      <CompleteListingModal
        handleClose={() => setIsCompleteModalOpened(false)}
        isOpened={isCompleteModalOpened}
        currencies={currencies}
      />
    </div>
  );
};
