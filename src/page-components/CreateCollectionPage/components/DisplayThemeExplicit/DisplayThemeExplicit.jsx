//next
import Image from "next/image";
//classnames
import cn from "classnames";
//components
import { CustSwitch } from "../../../../components/CustSwitch/CustSwitch";
//styles
import styles from "./DisplayThemeExplicit.module.scss";

export const DisplayThemeExplicit = ({ values, setValues }) => {
  return (
    <>
      <div className={styles.title}>
        <span>Display Theme <span className={styles.star}>*</span></span>
      </div>
      <div className={styles.description}>
        <span>Change how your items are shown.</span>
      </div>
      <div className={styles.boxesWrapper}>
        <div
          className={cn(styles.box, {
            [styles.active]: values.displayedTheme === "padded",
          })}
          onClick={() => setValues({ ...values, displayedTheme: "padded" })}
        >
          <Image src="/profile/SquaresFour.svg" height={40} width={40} alt="squares" />
          <div className={styles.title}>
            <span>Padded</span>
          </div>
          <div className={styles.description}>
            <span>Recommended for assets with transparent background</span>
          </div>
        </div>
        <div
          className={cn(styles.box, {
            [styles.active]: values.displayedTheme === "contained",
          })}
          onClick={() => setValues({ ...values, displayedTheme: "contained" })}
        >
          <Image src="/profile/SquaresFour.svg" height={40} width={40} alt="squares" />
          <div className={styles.title}>
            <span>Contained</span>
          </div>
          <div className={styles.description}>
            <span>Recommended for assets that have ratio 1:1</span>
          </div>
        </div>
        <div
          className={cn(styles.box, {
            [styles.active]: values.displayedTheme === "covered",
          })}
          onClick={() => setValues({ ...values, displayedTheme: "covered" })}
        >
          <Image src="/profile/SquaresFour.svg" height={40} width={40} alt="squares" />
          <div className={styles.title}>
            <span>Covered</span>
          </div>
          <div className={styles.description}>
            <span>Recommended for assets that can extend to the edge</span>
          </div>
        </div>
      </div>
      <div className={styles.explicitWrapper}>
        <div>
          <div className={styles.title}>
            <span>Explicit & Sensitive Content</span>
          </div>
          <div className={styles.description}>
            <span>Set this item as explicit and sensitive content</span>
          </div>
        </div>
        <CustSwitch
          className={styles.switch}
          checked={values.isExplicit}
          onChange={({ target: { checked } }) => setValues({...values, isExplicit: checked})}
        />
      </div>
    </>
  );
};
