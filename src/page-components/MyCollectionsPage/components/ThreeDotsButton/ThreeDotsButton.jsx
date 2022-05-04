//classnames
import cn from "classnames";
//styles
import styles from "./ThreeDotsButton.module.scss";

export const ThreeDotsButton = ({ className, onClick }) => {
  return (
    <div onClick={onClick} className={cn(styles.wrapper, className)}>
      <ul>
        <li>.</li>
        <li>.</li>
        <li>.</li>
      </ul>
    </div>
  );
};
