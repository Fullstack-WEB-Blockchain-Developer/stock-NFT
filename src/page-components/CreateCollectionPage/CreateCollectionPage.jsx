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

export const CreateCollectionPage = ({ categories, blockchains, paymentTokens }) => {
  const router = useRouter();
  const [navigationData, setNavigationData] = useState([]);
  const [disabledButton, setDisabledButton] = useState(false);
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
    choosenPaymentTokens: [],
    displayedTheme: "",
    isExplicit: false,
  });

  const [errors, setErrors] = useState({
    creatorFee: { isError: false, helperText: "" },
    name: { isError: false, helperText: "" },
    url: { isError: false, helperText: "" },
    walletAddress: { isError: false, helperText: "" },
  });

  const handleSave = () => {};

  useEffect(() => {
    let flag = true;
    console.log("---values", values);
    if (
      values.name &&
      values.logo.file &&
      values.displayedTheme &&
      (!values.creatorFee ||
        values.creatorFee === 0 ||
        ((values.creatorFee || values.creatorFee !== 0) && values.walletAddress)) &&
      !errors.name.isError &&
      !errors.creatorFee.isError &&
      !errors.url.isError &&
      !errors.walletAddress.isError
    ) {
      flag = false;
    } else {
      flag = true;
    }
    setDisabledButton(flag);
  }, [
    errors.creatorFee.isError,
    errors.name.isError,
    errors.url.isError,
    errors.walletAddress.isError,
    values.creatorFee,
    values.displayedTheme,
    values.logo.file,
    values.name,
    values.walletAddress,
  ]);

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
          <NameUrlDescriptionCategory
            categories={categories}
            errors={errors}
            setErrors={setErrors}
            setValues={setValues}
            values={values}
          />
          <Links setValues={setValues} values={values} />
          <CreatorFeeAndBlockChains
            values={values}
            chains={blockchains}
            paymentTokens={paymentTokens}
            setValues={setValues}
            setErrors={setErrors}
            errors={errors}
          />
          <DisplayThemeExplicit setValues={setValues} values={values} />
          <CustButton
            className={styles.button}
            color="primary"
            disabled={disabledButton}
            onClick={handleSave}
            text="Create"
          />
        </div>
      </div>
    </>
  );
};
