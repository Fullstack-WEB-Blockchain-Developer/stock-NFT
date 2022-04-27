//next
import { useRouter } from "next/router";
//components
import { CustButton } from "./../../components/CustButton/CustButton";
import { ThreeDotsButton } from "./components/ThreeDotsButton/ThreeDotsButton";
//styles
import styles from "./MyCollectionsPage.module.scss";

export const MyCollectionsPage = () => {
  const router = useRouter();

  return (
    <div className={styles.pageContainer}>
      <div className={styles.wrapper}>
        <div className={styles.pageTitle}>
          <span>My Collections</span>
        </div>
        <div className={styles.pageDescription}>
          <span>Create, curate, and manage collections of unique NFTs to share and sell.</span>
        </div>
        <div className={styles.buttonsWrapper}>
          <CustButton text="Create a Collection" color="primary" onClick={() => router.push('/create-collection')} />
          <ThreeDotsButton size="large" className={styles.threeDots} />
        </div>
      </div>
    </div>
  );
};
