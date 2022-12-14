import cn from "classnames";
import styles from "./Level.module.css";

export const Level = ({ name, nftValue, maxValue, className }) => {
  return (
    <div className={cn(className, styles.wrapper)}>
      <div className={styles.textInfo}>
        <span>{name}</span>
        <span>
          {nftValue} of {maxValue}
        </span>
      </div>
      <div className={styles.slider}>
        <div className={styles.filled} style={{ width: `${(nftValue / maxValue) * 100}%` }} />
      </div>
    </div>
  );
};
