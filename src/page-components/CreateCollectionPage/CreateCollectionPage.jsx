import { useEffect, useState } from "react";
//next
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
//utils
import { getNavigationData } from "./CreateCollectionPage.utils";
//styles
import styles from "./CreateCollectionPage.module.scss";

export const CreateCollectionPage = () => {
  const router = useRouter();
  const [navigationData, setNavigationData] = useState([]);

  useEffect(() => {
    setNavigationData(getNavigationData(router.pathname));
  }, [router.pathname]);

  return (
    <>
      <div className={styles.navigationBar}>
        {navigationData.map(({text, href}) => (
          <div key={text} className={styles.navigationItem}>
            <Link href={href} passHref><span>{text}</span></Link>
            <div className={styles.navigationArrow}>
              <Image src='/view-token/Icon-ArrowDown.svg' width={8} height={4} alt="arrow-icon" />
            </div>
          </div>
        ))}
      </div>
      <div className={styles.pageContainer}>
        <div className={styles.wrapper}></div>
      </div>
    </>
  );
};
