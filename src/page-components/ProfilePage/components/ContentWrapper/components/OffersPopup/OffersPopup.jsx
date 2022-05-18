import { useEffect } from 'react';
//redux
import { useSelector, useDispatch } from 'react-redux';
import { setData } from 'src/redux/slices/profileFiltrationSlice';
//classnames
import cn from 'classnames';
//styles
import styles from './OffersPopup.module.scss';

export const OffersPopup = ({ className, setIsOffersPopupOpened }) => {
  const dispatch = useDispatch();
  const { choosenSection } = useSelector((state) => state.profileFiltration);

  const close = () => setIsOffersPopupOpened(false);

  useEffect(() => {
    const handleMouseUp = () => {
      if (!e.path.includes(ref?.current)) {
        callback();
      }
    };

    document.addEventListener('mouseup', handleMouseUp);

    return () => document.removeEventListener('mouseup', handleMouseUp);
  });

  return (
    <div className={cn(className, styles.wrapper)}>
      <div
        className={cn({ [styles.active]: choosenSection === 'offersReceived' })}
        onClick={() => handleToggle(() => dispatch(setData({ field: 'choosenSection', data: 'offersReceived' })))}
      >
        <span>Received</span>
      </div>
      <div
        className={cn({ [styles.active]: choosenSection === 'offersMade' })}
        onClick={() => handleToggle(() => dispatch(setData({ field: 'choosenSection', data: 'offersMade' })))}
      >
        <span>Made</span>
      </div>
    </div>
  );
};
