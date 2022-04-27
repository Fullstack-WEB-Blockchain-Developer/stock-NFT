//next
import Link from "next/link";
//redux
import { useDispatch } from "react-redux";
import { open as openError } from "../../redux/slices/errorSnackbarSlice";
//components
import { ChooseWalletBox } from "../../components/ChooseWalletBox/ChooseWalletBox";
//hooks
import useAuth from "../../hooks/useAuth";
//styles
import styles from "./ConnectWalletPage.module.css";

export const ConnectWalletPage = () => {
  const { error } = useAuth();
  const dispatch = useDispatch();

  if (error) {
    dispatch(openError(`${error.statusCode + " " + error.message}`));
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.centralInfo}>
        <h2 className={styles.title}>Connect your wallet.</h2>
        <p className={styles.prompt}>
          Connect with one of our available{" "}
          <Link href="#" passHref>
            <span className={styles.walletLink}>wallet</span>
          </Link>{" "}
          providers or create a new one.
        </p>
        <div className={styles.chooseWalletWrapper}>
          <ChooseWalletBox />
        </div>
      </div>
    </div>
  );
};
