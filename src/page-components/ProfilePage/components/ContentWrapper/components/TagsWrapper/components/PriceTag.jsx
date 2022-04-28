//next
import Image from "next/image";
//styles
import styles from "./Tag.module.scss";

export const PriceTag = ({ currency: { name, icon }, min, max, handleClose }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.priceText}>
        <Image
          alt={`${name}-icon`}
          height={19}
          loader={({ src }) => `${process.env.BACKEND_ASSETS_URL}/icons/${src}`}
          src={icon}
          width={19}
        />
        <span>
          {name}: {Number(min).toFixed(2)} - {Number(max).toFixed(2)}
        </span>
      </div>
      <div className={styles.cross} onClick={handleClose}>
        <Image src="/create-nft/Icon-Close.svg" alt="colse-icon" width={15} height={15} />
      </div>
    </div>
  );
};
