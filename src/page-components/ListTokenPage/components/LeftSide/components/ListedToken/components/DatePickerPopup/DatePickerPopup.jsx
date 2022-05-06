import { useRef } from "react";
import styles from "./DatePickerPopup.module.scss";
import { useOnClickOutside } from "../../../../../../../../hooks/useOnClickOutside";

export const DatePickerPopup = ({ handleClose }) => {
  const ref = useRef();
  useOnClickOutside(ref, handleClose);

  return <div ref={ref} className={styles.wrapper}></div>;
};
