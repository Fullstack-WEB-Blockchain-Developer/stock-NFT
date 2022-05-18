import { useEffect, useRef } from 'react';
//redux
import { useSelector, useDispatch } from 'react-redux';
import { setData } from 'src/redux/slices/profileFiltrationSlice';
//classnames
import cn from 'classnames';
//styles
import styles from './OffersPopup.module.scss';
import { useOnClickOutside } from 'src/hooks/useOnClickOutside';

export const OffersPopup = ({ className, setIsOffersPopupOpened }) => {
  const ref = useRef();
  const dispatch = useDispatch();
  const { choosenSection } = useSelector((state) => state.profileFiltration);

  const close = () => setIsOffersPopupOpened(false);

  useOnClickOutside(ref, close);

  return (
    <div ref={ref} className={cn(className, styles.wrapper)}>
      <div
        className={cn({ [styles.active]: choosenSection === 'offersReceived' })}
        onClick={() => dispatch(setData({ field: 'choosenSection', data: 'offersReceived' }))}
      >
        <span>Received</span>
      </div>
      <div
        className={cn({ [styles.active]: choosenSection === 'offersMade' })}
        onClick={() => dispatch(setData({ field: 'choosenSection', data: 'offersMade' }))}
      >
        <span>Made</span>
      </div>
    </div>
  );
};
