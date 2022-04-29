//classnames
import cn from "classnames";
//next
import Image from "next/image";
//helpers
import { numberWithSymbol } from "../../helpers/numberWithSymbol";
//styles
import styles from "./AmountWithIcon.module.css";

export const AmountWithIcon = ({ amount, color, size, className }) => {
  return (
    <span
      className={cn(styles.span, className, {
        [styles.l]: size === "l",
        [styles.m]: size === "m",
        [styles.sm]: size === "sm",
        [styles.primary]: color === "primary",
        [styles.red]: color === "red",
        [styles.yellow]: color === "yellow",
      })}
    >
      <div className={styles.iconWrapper}>
        {color === "red" && <Image src="/profile/Icon-Price.svg" layout="fill" alt="amount-icon" />}
        {color === "primary" && <Image src="/profile/Icon-PricePrimary.svg" layout="fill" alt="amount-icon" />}
      </div>
      <span> ${numberWithSymbol(amount, ",")}</span>
    </span>
  );
};
