//redux
import { Provider } from 'react-redux';
import { useSelector } from 'react-redux';
import { store } from '../src/redux/store';
//classnames
import cn from 'classnames';
//layout
import { Header } from './Header/Header';
import { Footer } from './Footer/Footer';
//components
import { WalletPopup } from '../src/components/WalletPopup/WalletPopup';
import { ErrorSnackbar } from '../src/components/ErrorSnackbar/ErrorSnackbar';
import { SuccessSnackbar } from '../src/components/SuccessSnackbar/SuccessSnackbar';
import { LogoutWindow } from '../src/modals/LogoutWindow/LogoutWindow';
//styles
import styles from './Layout.module.css';

const Layout = ({ children, isFooterDisplayed }) => {
  const isWalletPopupOpened = useSelector(
    (state) => state.walletPopup.walletPopup.isOpened
  );

  const isErrorSnackbarOpened = useSelector(
    (state) => state.errorSnackbar.isOpened
  );
  const isSuccessSnackbarOpened = useSelector(
    (state) => state.successSnackbar.isOpened
  );

  return (
    <>
      <Header />
      <div className={styles.pusherDown}></div>
      <div className={styles.withoutHeader}>
        <div>{children}</div>
        {isFooterDisplayed && <Footer />}
        <div
          className={cn(styles.shadowBackground, {
            [styles.shadowBackgroundActive]: isWalletPopupOpened,
          })}
        >
          <WalletPopup
            className={cn(styles.walletPopup, {
              [styles.walletPopupIsActive]: isWalletPopupOpened,
            })}
          />
        </div>
        {isErrorSnackbarOpened && (
          <ErrorSnackbar className={styles.errorSnackbar} />
        )}
        {isSuccessSnackbarOpened && (
          <SuccessSnackbar className={styles.errorSnackbar} />
        )}
        <LogoutWindow />
      </div>
    </>
  );
};

export const withReduxProvider = (Component) => {
  return function withReduxProviderComponent(props) {
    return (
      <Provider store={store}>
        <Component {...props} />
      </Provider>
    );
  };
};

export const withLayout = (Component) => {
  return function withLayoutComponent(props) {
    return (
      <Provider store={store}>
        <Layout isFooterDisplayed>
          <Component {...props} />
        </Layout>
      </Provider>
    );
  };
};

export const withHeader = (Component) => {
  return function withReduxProviderComponent(props) {
    return (
      <Provider store={store}>
        <Layout isFooterDisplayed={false}>
          <Component {...props} />
        </Layout>
      </Provider>
    );
  };
};
