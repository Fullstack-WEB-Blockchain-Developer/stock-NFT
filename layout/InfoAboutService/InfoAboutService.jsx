import Link from 'next/link';
import styles from './InfoAboutService.module.scss';

export const InfoAboutService = () => (
  <div className={styles.infoFooter}>
    <div>
      <span className={styles.infoText}>&copy; 2018 - 2022 Stoke, Inc</span>
    </div>
    <div className={styles.infoButtons}>
      <div className={styles.buttonTerms} role="button">
        <Link href="/terms-of-services">Terms of Service</Link>
      </div>
      <div className={styles.buttonPrivacy} role="button">
        <Link href="/privacy-policy">Privacy Policy</Link>
      </div>
    </div>
  </div>
);
