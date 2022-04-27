import cn from "classnames";
import Image from "next/image";
import styles from "./AmountDifference.module.css";

export const AmountDifference = ({ direction, percent, className }) => {
  switch (direction) {
    case "up":
      return (
        <div className={cn(styles.wrapper, className)}>
            <Image src="/profile/Icon-PriceUp.svg" alt="price-up" width={13} height={13} />
          <span>{percent}%</span>
        </div>
      );
    case "down":
      return (
        <div className={cn(styles.wrapper, className, styles.down)}>
          <Image src="/profile/Icon-PriceDown.svg" alt="price-down" width={13} height={13} />
          <span>{percent}%</span>
        </div>
      );
    default:
      return (
        <div className={cn(styles.wrapper, className)}>
          <Image src="/profile/Icon-PriceUp.svg" alt="price-up" width={13} height={13} />
          <span>{percent}%</span>
        </div>
      );
  }
};
