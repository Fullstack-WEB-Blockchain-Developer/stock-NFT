import { useEffect, useState } from "react";
//next
import { useRouter } from "next/router";
//redux
import { useDispatch, useSelector } from "react-redux";
import { getUserCollections, clearError } from "../../redux/slices/userDataSlice";
import { open as openError } from "../../redux/slices/errorSnackbarSlice";
//hooks
import useAuth from "../../hooks/useAuth";
//components
import { CustButton } from "./../../components/CustButton/CustButton";
import { ThreeDotsButton } from "./components/ThreeDotsButton/ThreeDotsButton";
//styles
import styles from "./MyCollectionsPage.module.scss";
import { CollectionCard } from "./components/CollectionCard/CollectionCard";

export const MyCollectionsPage = () => {
  const auth = useAuth();
  const dispatch = useDispatch();
  const router = useRouter();

  if (auth.error) {
    dispatch(openError(`${auth.error.statusCode + " " + auth.error.message}`));
  }

  const { userCollections, error } = useSelector((state) => state.userData);

  useEffect(() => {
    dispatch(getUserCollections());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      dispatch(
        openError(
          error.response?.data
            ? `${error.response.data.statusCode} ${error.response.data.message}`
            : error.message
        )
      );
      dispatch(clearError());
    }
  }, [error, dispatch]);

  console.log("---userCollections", userCollections);

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
          <CustButton
            text="Create a Collection"
            color="primary"
            onClick={() => router.push("/my-collections/create-collection")}
          />
        </div>
        <div className={styles.collectionsWrapper}>
          {userCollections &&
            userCollections.map(
              ({ id, logoImage, name, user: { username, publicAddress, profileImage } }) => (
                <CollectionCard
                  id={id}
                  key={id}
                  logoImage={logoImage}
                  name={name}
                  publicAddress={publicAddress}
                  userProfileImage={profileImage}
                  username={username}
                />
              )
            )}
        </div>
      </div>
    </div>
  );
};
