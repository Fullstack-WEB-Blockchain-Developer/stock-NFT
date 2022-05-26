import {
  createMarkup,
  getDateUpdate,
} from '../TermsOfServicesPage/TermsOfServicesPage.utils';
import styles from './TermsOfServicesPage.module.scss';

export const TermsOfServicesPage = () => (
  <div className={styles.wrapperTerms}>
    <div className={styles.contentTerms}>
      <div className={styles.blockHeaderTerms}>
        <h2 className={styles.titleTerms}>Terms & Conditions</h2>
        <span className={styles.updateText}>
          Last Updated: {getDateUpdate()}
        </span>
      </div>
      <div className={styles.blockCondition}>
        <span className={styles.textCondition}></span>
        <div dangerouslySetInnerHTML={createMarkup()}></div>
      </div>
    </div>
  </div>
);
