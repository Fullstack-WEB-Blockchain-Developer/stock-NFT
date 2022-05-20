import { useEffect } from 'react';
//next
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
//classnames
import cn from 'classnames';
//axios
import axios from 'axios';
//redux
import { useSelector, useDispatch } from 'react-redux';
import { open as openProfilePopupReducer } from '../../src/redux/slices/profilePopupSlice';
import { open as openWalletPopupReducer } from '../../src/redux/slices/walletPopupSlice';
import { open as openError } from '../../src/redux/slices/errorSnackbarSlice';
import {
  setImage,
  setUsername,
  setBanner,
  setUserBio,
  setField,
} from '../../src/redux/slices/userDataSlice';
// these are components for the second variant of header. I don't know exactly which one to implement
// import { Username } from "../../src/components/Username/Username";
// import { AmountWithIcon } from "../../src/components/AmountWithIcon/AmountWithIcon";
// import { AmountDifference } from "../../src/components/AmountDifference/AmountDifference";
// import { SmallChart } from "../../src/components/SmallChart/SmallChart";
//components
import { ProfilePopup } from '../../src/components/ProfilePopup/ProfilePopup';
//utils
import { routingCategories, profilePopupCategories } from './Header.utils';
//hook
import useAuth from '../../src/hooks/useAuth';
//styles
import styles from './Header.module.css';

const fakeChartData = new Array(15).fill({}, 0, 14).map(() => {
  return { name: 'Page A', price: Math.random() * 100 };
});

export const Header = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthorized, error } = useAuth();
  const pagesForUnauthorized = useSelector(
    (state) => state.administration.pagesForUnauthorized
  );

  if (error && !pagesForUnauthorized.includes(router.pathname)) {
    dispatch(
      openError(
        error.response?.data
          ? `${error.response.data.statusCode} ${error.response.data.message}`
          : error.message
      )
    );
  }

  const fetchUserData = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const publicAddress = localStorage.getItem('account');
    try {
      const { data } = await axios.get(
        `${process.env.BACKEND_URL}/users/${publicAddress}`,
        {
          headers: { Authorization: 'Bearer ' + accessToken },
        }
      );
      dispatch(setField({ field: 'userId', value: data.id }));
      dispatch(setImage(data.profileImage));
      dispatch(setBanner(data.profileBanner));
      dispatch(setUsername(data.username));
      dispatch(setUserBio(data.bio));
    } catch (e) {
      !pagesForUnauthorized.includes(router.pathname) &&
        dispatch(
          openError(
            e.response?.data
              ? `${e.response.data.statusCode} ${e.response.data.message}`
              : e.message
          )
        );
    }
  };

  useEffect(() => {
    !error && fetchUserData();
  }, [isAuthorized]);

  const isProfilePopupOpened = useSelector(
    (state) => state.profilePopup.profilePopup.isOpened
  );
  const avatar = useSelector((state) => state.userData.imageUrl);
  const username = useSelector((state) => state.userData.username);
  const openProfilePopup = () => {
    dispatch(openProfilePopupReducer());
  };

  const openWalletPopup = () => {
    dispatch(openWalletPopupReducer());
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/" passHref>
          <Image src="/header-logo.png" height={106} width={267} alt="logo" />
        </Link>
      </div>
      <div className={styles.navigation}>
        <div className={styles.navigationCategories}>
          {routingCategories.map(({ categoryName, id, src, href }) => (
            <Link href={href} passHref key={id}>
              <div className={styles.category}>
                <Image src={src} height={18} width={16} alt={categoryName} />
                <p className={styles.categoryName}>{categoryName}</p>
              </div>
            </Link>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div className={styles.searchButton}>
            <Image
              src="/search-icon.svg"
              height={18}
              width={16}
              alt="search-icon"
            />
            <div>Search All NFTs</div>
          </div>
          <div className={styles.createButton}>
            <span>
              <Link href="/create-nft" passHref>
                Create NFT
              </Link>
            </span>
          </div>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div className={styles.userData}>
          <div className={styles.profile} onClick={openProfilePopup}>
            <div
              className={
                isAuthorized ? styles.authorisedIcon : styles.profileIcon
              }
            >
              <Image
                src={isAuthorized ? avatar : '/profile-icon.svg'}
                loader={({src}) => src}
                objectFit="cover"
                alt="profileImage"
                layout="fill"
              />
            </div>
            <div className={styles.profileText}>
              {isAuthorized
                ? username && username !== ''
                  ? username
                  : 'Profile'
                : 'Profile'}
            </div>
          </div>
          <ProfilePopup
            categories={profilePopupCategories}
            className={cn(styles.profilePopup, {
              [styles.popupActive]: isProfilePopupOpened,
            })}
          />
          <div className={styles.wallet} onClick={openWalletPopup}>
            <div className={styles.walletIcon}>
              <Image src="/wallet-icon.svg" layout="fill" alt="profile-icon" />
            </div>
            <div className={styles.walletText}>Wallet</div>
          </div>
        </div>
      </div>
    </header>
  );
};

// We have 2 variants of header and I don't know which one to implement
{
  /* <header className={styles.header}>
      <div className={styles.logo}>
        <Image src="/header-logo.png" height={106} width={267} alt="logo" />
      </div>
      <div className={styles.navigation}>
        <div className={styles.navigationCategories}>
          {routingCategories.map(({ categoryName, id, src }) => (
            <div className={styles.category} key={id}>
              <Image src={src} height={18} width={16} alt={categoryName} />
              <p className={styles.categoryName}>{categoryName}</p>
            </div>
          ))}
        </div>
        <div className={styles.searchButton}>
          <Image
            src="/search-icon.svg"
            height={18}
            width={16}
            alt="search-icon"
          />
          <div>Search All NFTs</div>
        </div>
      </div>
      <div className={styles.userInfo}>
        <div className={styles.userAvatarAndName}>
          <div className={styles.avatarWrapper}>
            <Image
              src="/empty-avatar.png"
              height={29}
              width={29}
              alt="avatar"
            />
          </div>
          <div className={styles.clickableUserInfo}>
            <Username
              username="test-user"
              color="var(--white)"
              isConfirmed={false}
              className={styles.username}
            />
            <Image
              src="/delta-down-icon.svg"
              height={9}
              width={15}
              alt="avatar"
            />
          </div>
        </div>
        <div className={styles.userWorth}>
          <div className={styles.amountNumbers}>
            <AmountWithIcon amount={82828.28} color="primary" size="m" className={styles.amountData} />
            <AmountDifference direction="up" percent={12.47} className={styles.amountData} />
          </div>
          <div className={styles.chart}>
            <SmallChart data={fakeChartData} />
          </div>
        </div>
      </div>
    </header> */
}
