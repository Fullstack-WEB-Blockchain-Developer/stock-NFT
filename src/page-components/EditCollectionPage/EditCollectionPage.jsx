import { useEffect, useState } from "react";
//next
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
//redux
import { useDispatch } from "react-redux";
import { open as openSuccess } from "../../redux/slices/successSnackbarSlice";
import { open as openError } from "../../redux/slices/errorSnackbarSlice";
//axios
import axios from "axios";
//components
import { CustButton } from "../../components/CustButton/CustButton";
import { ApproveModal } from "../../modals/ApproveModal/ApproveModal";
import { CreatorFeeAndBlockChains } from "./components/CreatorFeeAndBlockChains/CreatorFeeAndBlockChains";
import { DisplayThemeExplicit } from "./components/DisplayThemeExplicit/DisplayThemeExplicit";
import { ImageLoadFields } from "./components/ImageLoadFields/ImageLoadFields";
import { Links } from "./components/Links/Links";
import { NameUrlDescriptionCategory } from "./components/NameUrlDescriptionCategory/NameUrlDescriptionCategory";
//utils
import { getNavigationData, sendImagesToServer } from "./EditCollectionPage.utils";
//styles
import styles from "./EditCollectionPage.module.scss";

export const EditCollectionPage = ({ categories, blockchains, paymentTokens, ...props }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [navigationData, setNavigationData] = useState([]);
  const [disabledButton, setDisabledButton] = useState(false);
  const [isDeleteOpened, setIsDeleteOpened] = useState(false);
  const [values, setValues] = useState({
    logo: { preview: undefined, file: undefined, link: props.logoImage },
    featured: { preview: undefined, file: undefined, link: props.featuredImage },
    banner: { preview: undefined, file: undefined, link: props.bannerImage },
    blockchain: props.blockchainType ? props.blockchainType.name : "none",
    category: props.category ? props.category.name : "none",
    creatorFee: props.creatorEarnings,
    description: props.description,
    discordLink: props.discordLink,
    displayedTheme: props.displayTheme,
    instagramLink: props.instagramLink,
    isExplicit: props.IsSensitiveContent,
    mediumlink: props.mediumlink,
    name: props.name,
    choosenPaymentTokens:
      props.choosenPaymentTokens.length > 0
        ? props.choosenPaymentTokens.map((id) => paymentTokens.find((token) => token.id === id))
        : [],
    telegramLink: props.telegramLink,
    url: props.url,
    walletAddress: props.walletAddress,
    yourSiteLink: props.websiteLink,
  });

  const [errors, setErrors] = useState({
    creatorFee: { isError: false, helperText: "" },
    name: { isError: false, helperText: "" },
    url: { isError: false, helperText: "" },
    walletAddress: { isError: false, helperText: "" },
  });

  const handleSaveChanges = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const { collectionId } = router.query;

      const { logoImage, bannerImage, featuredImage } = await sendImagesToServer(
        values.logo.file,
        values.featured.file,
        values.banner.file
      );

      const body = {
        name: values.name,
        url: values.url,
        description: values.description,
        websiteLink: values.yourSiteLink,
        discordLink: values.discordLink,
        instagramLink: values.instagramLink,
        mediumLink: values.mediumLink,
        telegramLink: values.telegramLink,
        creatorEarnings: Number(values.creatorFee),
        displayTheme: values.displayedTheme,
        isSensitiveContent: values.isExplicit,
        collaborators: [],
        paymentTokens: [
          paymentTokens.find(({ name }) => name === "ETH").id,
          paymentTokens.find(({ name }) => name === "WETH").id,
        ],
        payoutWalletAddress: values.walletAddress,
      };

      if (logoImage) body.logoImage = logoImage;
      if (featuredImage) body.featuredImage = featuredImage;
      if (bannerImage) body.bannerImage = bannerImage;
      if (values.category !== "none") {
        body.collectionCategoryId = categories.find(({ name }) => name === values.category).id;
      }
      if (values.blockchain !== "none") {
        body.blockchainTypeId = blockchains.find(({ name }) => name === values.blockchain).id;
      }
      if (values.choosenPaymentTokens.length > 0) {
        body.paymentTokensIds = [
          ...body.paymentTokens,
          ...values.choosenPaymentTokens.map(
            (elem) => paymentTokens.find(({ name }) => name === elem.name).id
          ),
        ];
      }

      await axios.patch(`${process.env.BACKEND_URL}/collections/${collectionId}`, body, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
      router.push("/my-collections");
      dispatch(openSuccess("Collection is successfully changed!"));
    } catch (e) {
      dispatch(
        openError(e.response?.data ? `${e.response.data.statusCode} ${e.response.data.message}` : e.message)
      );
    }
  };

  const handleDelete = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const { collectionId } = router.query;

      await axios.delete(`${process.env.BACKEND_URL}/collections/${collectionId}`, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });

      router.push("/my-collections");
      dispatch(openSuccess("Collection is successfully deleted!"));
    } catch (e) {
      dispatch(
        openError(e.response?.data ? `${e.response.data.statusCode} ${e.response.data.message}` : e.message)
      );
    }
  };


  useEffect(() => {
    let flag = true;
    if (
      values.name &&
      (values.logo.file || values.logo.link) &&
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
            initialName={props.name}
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
              onClick={handleSaveChanges}
              text="Save Changes"
            />
            <CustButton
              className={styles.button}
              color="red"
              onClick={() => setIsDeleteOpened(true)}
              text="Delete Collection"
            />
          </div>
          <ApproveModal
            handleClose={() => setIsDeleteOpened(false)}
            isOpened={isDeleteOpened}
            text="Do you really want to delete this collection?"
            leftButton={{ text: "yes", color: "primary", onClick: handleDelete }}
            rightButton={{ text: "no", color: "primary", onClick: () => setIsDeleteOpened(false) }}
          />
        </div>
      </div>
    </>
  );
};
