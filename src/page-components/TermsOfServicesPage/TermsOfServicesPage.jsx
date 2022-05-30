import {
  createMarkup,
  getDateUpdate,
} from '../TermsOfServicesPage/TermsOfServicesPage.utils';
import styles from './TermsOfServicesPage.module.scss';

export const TermsOfServicesPage = ({ type }) => {
  const titleOfPage =
    type === 'terms' ? (
      <h2 className={styles.titleTerms}>Terms &amp; Conditions</h2>
    ) : (
      <h2 className={styles.titleTerms}>Privacy Policy</h2>
    );

  return (
    <div className={styles.wrapperTerms}>
      <div className={styles.contentTerms}>
        <div className={styles.blockHeaderTerms}>
          {titleOfPage}
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
};
