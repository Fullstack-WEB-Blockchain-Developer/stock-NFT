import { useEffect, useState } from "react";
//next
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
//components
import { CustButton } from "../../components/CustButton/CustButton";
import { CreatorFeeAndBlockChains } from "./components/CreatorFeeAndBlockChains/CreatorFeeAndBlockChains";
import { DisplayThemeExplicit } from "./components/DisplayThemeExplicit/DisplayThemeExplicit";
import { ImageLoadFields } from "./components/ImageLoadFields/ImageLoadFields";
import { Links } from "./components/Links/Links";
import { NameUrlDescriptionCategory } from "./components/NameUrlDescriptionCategory/NameUrlDescriptionCategory";
//utils
import { getNavigationData } from "./CreateCollectionPage.utils";
//styles
import styles from "./CreateCollectionPage.module.scss";

export const CreateCollectionPage = () => {
  const router = useRouter();
  const [navigationData, setNavigationData] = useState([]);
  const [disabledButon, setDisabledButton] = useState(false);
  const [values, setValues] = useState({
    logo: { preview: undefined, file: undefined },
    featured: { preview: undefined, file: undefined },
    banner: { preview: undefined, file: undefined },
    category: "none",
    description: "",
    name: "",
    url: "",
    discordLink: "",
    instagramLink: "",
    mediumlink: "",
    telegramLink: "",
    yourSiteLink: "",
    creatorFee: undefined,
    walletAddress: "",
    blockchain: "none",
    paymentTokens: [],
    paymentTokensEthAndWeth: [],
    displayedTheme: "",
    isExplicit: false,
  });

  const [errors, setErrors] = useState({});

  const handleSave = () => {};

  useEffect(() => {
    let flag = false;
    if (
      values.name &&
      values.icon &&
      values.displayedTheme &&
      (!values.creatorFee ||
        values.creatorFee === 0 ||
        ((values.creatorFee || values.creatorFee !== 0) && values.walletAddress))
    ) {
      flag = true;
    }
  }, [values.name, values.icon.file, values.displayedTheme, values.creatorFee, values.walletAddress]);

  useEffect(() => {
    setNavigationData(getNavigationData(router.pathname));
  }, [router.pathname]);

  return (
    <>
      <div className={styles.navigationBar}>
        {navigationData.map(({ text, href }) => (
          <div key={text} className={styles.navigationItem}>
            <Link href={href} passHref>
              <span>{text}</span>
            </Link>
            <div className={styles.navigationArrow}>
              <Image src="/view-token/Icon-ArrowDown.svg" width={8} height={4} alt="arrow-icon" />
            </div>
          </div>
        ))}
      </div>
      <div className={styles.pageContainer}>
        <div className={styles.wrapper}>
          <div className={styles.pageTitle}>
            <span>Create Collection</span>
          </div>
          <ImageLoadFields values={values} setValues={setValues} />
          <NameUrlDescriptionCategory setValues={setValues} values={values} />
          <Links setValues={setValues} values={values} />
          <CreatorFeeAndBlockChains setValues={setValues} values={values} />
          <DisplayThemeExplicit setValues={setValues} values={values} />
          <CustButton
            className={styles.button}
            color="primary"
            disabled={disabledButon}
            onClick={handleSave}
            text="Create"
          />
        </div>
      </div>
    </>
  );
};
