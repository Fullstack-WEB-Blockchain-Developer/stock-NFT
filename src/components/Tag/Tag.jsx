import cn from "classnames";
import styles from "./Tag.module.css";

export const Tag = ({ text, className }) => (
  <div
    className={cn(styles.tag, className, {
      [styles.pending]: text === "pending",
    })}
  >
    <p>{text}</p>
  </div>
);
