//redux
import { useSelector, useDispatch } from 'react-redux';
import {
  changeToken,
  deleteToken,
  toggleOpenToken,
} from '../../../../../../redux/slices/ListTokenSlice';
//next
import Image from 'next/image';
//classnames
import cn from 'classnames';
//components
import { ListFixedPriceInputs } from './components/ListFixedPriceInputs/ListFixedPriceInputs';
import { ListAuctionInputs } from './components/ListAuctionInputs/ListAuctionInputs';
//styles
import styles from './ListedToken.module.scss';

export const ListedToken = ({ id }) => {
  const dispatch = useDispatch();
  const { listingType, name, blockchainType } = useSelector(
    (state) => state.listToken.tokens
  ).find((token) => token.id === id);

  const isOpened = useSelector(
    (state) => state.listToken.openedTokens
  ).includes(id);

  const auctionMethods =
    blockchainType?.name !== 'Polygon'
      ? [
          { text: 'Fixed price', camelCase: 'fixedPrice' },
          { text: 'Time auction', camelCase: 'timeAuction' },
        ]
      : [{ text: 'Fixed price', camelCase: 'fixedPrice' }];

  return (
    <div className={styles.tokenListedWrapper}>
      <div className={styles.tokenListedHead}>
        <span>{name}</span>
        <div className={styles.deleteArrowWrapper}>
          <span onClick={() => dispatch(deleteToken(id))}>
            <Image
              alt="trash-icon"
              height={19}
              src="/view-token/Icon-Delete.svg"
              width={19}
            />
          </span>
          <span onClick={() => dispatch(toggleOpenToken(id))}>
            {isOpened ? (
              <Image
                alt="arrow-up-icon"
                src="/view-token/Icon-ArrowUp.svg"
                height={8}
                width={16}
              />
            ) : (
              <Image
                alt="arrow-down-icon"
                src="/view-token/Icon-ArrowDown.svg"
                height={8}
                width={16}
              />
            )}
          </span>
        </div>
      </div>
      <div
        className={cn(styles.tokenInfoWrapper, {
          [styles.isClosed]: !isOpened,
        })}
      >
        <div className={styles.title}>
          <span>Type</span>
        </div>
        <div className={styles.listTypesWrapper}>
          {auctionMethods.map(({ text, camelCase }) => (
            <div
              key={camelCase}
              className={cn(styles.listType, {
                [styles.activeType]: listingType === camelCase,
              })}
              onClick={() =>
                dispatch(
                  changeToken({
                    id,
                    field: 'listingType',
                    newValue: camelCase,
                  })
                )
              }
            >
              <Image
                alt="aquares-icon"
                src="/profile-settings/Icon-Site.svg"
                height={42}
                width={42}
              />
              <span>{text}</span>
            </div>
          ))}
        </div>
        {listingType === 'fixedPrice' ? (
          <ListFixedPriceInputs id={id} />
        ) : (
          <ListAuctionInputs id={id} />
        )}
      </div>
    </div>
  );
};
