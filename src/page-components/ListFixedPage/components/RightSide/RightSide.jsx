//classnames
import cn from "classnames";
//styles
import styles from "./RightSide.module.scss";

export const RightSide = ({ className }) => {
  return <div className={cn(className, styles.wrapper)}></div>;
};
