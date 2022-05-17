//classnames
import cn from 'classnames';
//styles
import styles from './OffersPopup.module.scss';

export const OffersPopup = ({ className }) => {
  return (
    <div className={cn(className, styles.wrapper)}>
      <div className={{ [styles.active]: choosenSection === 'offersReceived' }}>
        <span>Received</span>
      </div>
      <div className={{ [styles.active]: choosenSection === 'offersMade' }}>
        <span>Made</span>
      </div>
    </div>
  );
};
