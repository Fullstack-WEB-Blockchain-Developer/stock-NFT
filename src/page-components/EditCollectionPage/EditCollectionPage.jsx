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
import { getNavigationData } from "./EditCollectionPage.utils";
//styles
import styles from "./EditCollectionPage.module.scss";
import { DeleteModal } from "./components/DeleteModal/DeleteModal";

export const EditCollectionPage = ({ categories, blockchains, paymentTokens, ...props }) => {
  const router = useRouter();
  const [navigationData, setNavigationData] = useState([]);
  const [disabledButton, setDisabledButton] = useState(false);
  const [isDeleteOpened, setIsDeleteOpened] = useState(false);
  const [values, setValues] = useState({
    logo: { preview: undefined, file: undefined, link: props.logo },
    featured: { preview: undefined, file: undefined, link: props.featured },
    banner: { preview: undefined, file: undefined, link: props.banner },
    blockchain: "none",
    category: "none",
    creatorFee: props.creatorFee,
    description: props.description,
    discordLink: props.discordLink,
    displayedTheme: props.displayedTheme,
    instagramLink: props.instagramLink,
    isExplicit: props.isExplicit,
    mediumlink: props.mediumlink,
    name: props.name,
    paymentTokens: paymentTokens.filter(({ name }) => name !== "ETH" && name !== "WETH"),
    paymentTokensEthAndWeth: paymentTokens.filter(({ name }) => name === "ETH" || name === "WETH"),
    telegramLink: props.telegramLink,
    url: props.url,
    walletAddress: "",
    yourSiteLink: props.websiteLink,
  });

  const [errors, setErrors] = useState({
    creatorFee: { isError: false, helperText: "" },
    name: { isError: false, helperText: "" },
    url: { isError: false, helperText: "" },
    walletAddress: { isError: false, helperText: "" },
  });

  const handleSave = () => {};

  const handleDelete = () => {};

  useEffect(() => {
    let flag = true;
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
            <span>Edit Collection</span>
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
            chains={blockchains}
            errors={errors}
            paymentTokens={paymentTokens}
            setErrors={setErrors}
            setValues={setValues}
            values={values}
          />
          <DisplayThemeExplicit setValues={setValues} values={values} />
          <div className={styles.bottomButtons}>
            <CustButton
              className={styles.bottomLeftButton}
              color="primary"
              disabled={disabledButton}
              onClick={handleSave}
              text="Save Changes"
            />
            <CustButton
              className={styles.button}
              color="red"
              onClick={() => setIsDeleteOpened(true)}
              text="Delete Collection"
            />
          </div>
          <DeleteModal
            handleClose={() => setIsDeleteOpened(false)}
            handleDelete={handleDelete}
            isOpened={isDeleteOpened}
          />
        </div>
      </div>
    </>
  );
};
