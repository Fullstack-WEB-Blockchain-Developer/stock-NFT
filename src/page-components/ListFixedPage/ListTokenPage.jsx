//components
import { LeftSide } from "./components/LeftSide/LeftSide";
import { RightSide } from "./components/RightSide/RightSide";
//styles
import styles from "./ListFixedPage.module.scss";

export const ListFixedPage = ({ id, name }) => {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.wrapper}>
        <LeftSide className={styles.leftSide} firstTokenData={{ name, id }} />
        <RightSide className={styles.rightSide} />
      </div>
    </div>
  );
};
