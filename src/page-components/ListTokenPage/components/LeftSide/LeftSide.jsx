//redux
import { useSelector, useDispatch } from "react-redux";
import { addToken } from "../../../../redux/slices/ListTokenSlice";
//classnames
import cn from "classnames";
//components
import { CustButton } from "../../../../components/CustButton/CustButton";
import { ListedToken } from "./components/ListedToken/ListedToken";
//styles
import styles from "./LeftSide.module.scss";

export const LeftSide = ({ className }) => {
  const dispatch = useDispatch();
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
        <CustButton text="+ Add Token" color="primary" onClick={() => {}} />
      </div>
      <div className={styles.completeListing}>
        <CustButton text="Complete Listing" color="primary" disabled={true} onClick={() => {}} />
      </div>
    </div>
  );
};
