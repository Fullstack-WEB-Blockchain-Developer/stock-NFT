import { useState, useEffect } from 'react';
//next
import Image from 'next/image';
import { useRouter } from 'next/router';
//redux
import { useSelector } from 'react-redux';
//spinner
import { Oval } from 'react-loader-spinner';
//components
import { CustButton } from '../../../../components/CustButton/CustButton';
//styles
import styles from './ProfileDataWrapper.module.css';
import { Chart } from '../Chart/Chart';

export const ProfileDataWrapper = () => {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [account, setAccount] = useState('');
  const [imageErrors, setImageErrors] = useState({
    image: false,
    banner: false,
  });

  const router = useRouter();

  const { imageUrl, banner, username, bio, userId } = useSelector((state) => state.userData);

  const { ownedNfts, totalValue, highestValue, mostCompleteCollection, volumeTraded } = useSelector(
    (state) => state.profileFiltration
  );

  const imageLoader = ({ src }) => src;

  const handleEditProfile = () => router.push('/settings');

  useEffect(() => {
    setAccount(localStorage.getItem('account'));
  }, []);

  return (
    <div className={styles.wrapper}>
      {banner && !imageErrors.banner && (
        <Image
          src={banner}
          loader={imageLoader}
          alt="profile-image"
          layout="fill"
          objectFit="cover"
          onError={(e) => e && setImageErrors({ ...imageErrors, banner: true })}
        />
      )}
      <div className={styles.gradient} />
      <div className={styles.profileImageWrapper}>
        {imageUrl && !imageErrors.image && (
          <Image
            src={imageUrl}
            loader={imageLoader}
            alt="profile-image"
            layout="fill"
            objectFit="cover"
            onLoadingComplete={() => setIsImageLoading(false)}
            onError={(e) => e && setImageErrors({ ...imageErrors, image: true })}
          />
        )}
        {imageErrors.image && (
          <Image
            src="/create-nft/empty-profileImage.png"
            loader={imageLoader}
            alt="profile-image"
            layout="fill"
            objectFit="cover"
            onLoadingComplete={() => setIsImageLoading(false)}
          />
        )}
        {isImageLoading && (
          <div className={styles.spinner}>
            <Oval
              ariaLabel="loading-indicator"
              height={100}
              width={100}
              strokeWidth={3}
              color="var(--black)"
              secondaryColor="var(--light-grey)"
            />
          </div>
        )}
      </div>
      <div className={styles.middleSection}>
        <div className={styles.account}>
          <span>
            {account.substring(0, 6)}...{account.substring(account.length - 6)}
          </span>
        </div>
        <div className={styles.username}>
          <span>{username ? username : 'Profile'}</span>
        </div>
        <div className={styles.bio}>
          <span>{bio}</span>
        </div>
        <div className={styles.midlleSectionBottom}>
          <div>
            <span className={styles.middleSectionBottomNumbers}>{ownedNfts || 0}</span>
            <span className={styles.middleSectionBottomDescription}>NFTs</span>
          </div>
          <div>
            <div className={styles.dataWithIcon}>
              <Image src="/profile/Icon-Price.svg" width={19} height={19} alt="price-icon" />
              <span className={styles.middleSectionBottomNumbers}>{totalValue || 0}</span>
            </div>
            <span className={styles.middleSectionBottomDescription}>Total Value</span>
          </div>
          <div>
            <div className={styles.dataWithIcon}>
              <Image src="/profile/Icon-Price.svg" width={19} height={19} alt="price-icon" />
              <span className={styles.middleSectionBottomNumbers}>{highestValue || 0}</span>
            </div>
            <span className={styles.middleSectionBottomDescription}>Highest Value</span>
          </div>
          <div>
            <span className={styles.middleSectionBottomNumbers}>{mostCompleteCollection || 0}</span>
            <span className={styles.middleSectionBottomDescription}>
              Most Complete
              <br /> Collection
            </span>
          </div>
          <div>
            <div className={styles.dataWithIcon}>
              <Image src="/profile/Icon-Price.svg" width={19} height={19} alt="price-icon" />
              <span className={styles.middleSectionBottomNumbers}>{volumeTraded || 0}</span>
            </div>
            <span className={styles.middleSectionBottomDescription}>Volume Traded</span>
          </div>
        </div>
      </div>
      <div className={styles.rightSection}>
        <div className={styles.actionsTitle}>
          <span>Actions</span>
        </div>
        <div className={styles.buttonsWrapper}>
          <CustButton color="primary" text="Edit Profile" onClick={handleEditProfile} />
          <CustButton color="primary" text="Share Profile" />
        </div>
        <div className={styles.chart}>
          <Chart userId={userId} />
        </div>
      </div>
    </div>
  );
};
