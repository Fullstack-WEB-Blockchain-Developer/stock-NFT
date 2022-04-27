//classnames
import cn from "classnames";
//styles
import styles from "./ThreeDotsButton.module.scss";

export const ThreeDotsButton = ({ size, className }) => {
  switch (size) {
    case "large":
      return (
        <div className={cn(styles.wrapper, styles.large, className)}>
          <ul>
            <li>.</li>
            <li>.</li>
            <li>.</li>
          </ul>
        </div>
      );
    case "small":
      return (
        <div className={cn(styles.wrapper, styles.small, className)}>
          <ul>
            <li>.</li>
            <li>.</li>
            <li>.</li>
          </ul>
        </div>
      );
  }
};
