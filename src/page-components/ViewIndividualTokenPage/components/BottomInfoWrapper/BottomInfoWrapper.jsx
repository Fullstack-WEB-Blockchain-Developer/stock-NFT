import { useState, useEffect } from 'react';
//next
import Image from 'next/image';
//classnames
import cn from 'classnames';
//mui
import { Select, MenuItem } from '@mui/material';
//hooks
import { useStyles } from '../../../../hooks/useStyles';
//utils
import { filterOptions } from './BottomInfoWrapper.utils';
import { getDateAgo } from '../../../../helpers/getDateAgo';
//styles
import styles from '../RightSideInfoWrapper/RightSideInfoWrapper.module.css';

export const BottomInfoWrapper = ({ activity }) => {
  const [isActivityOpened, setIsActivityOpened] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('none');
  const [activityData, setActivityData] = useState(undefined);

  const muiClasses = useStyles();

  const adapterFunction = (initial) => {
    const newArray = [...initial].map((elem) => {
      return {
        ...elem,
        date: getDateAgo(elem.endDate || elem.updatedAt),
      };
    });

    return newArray;
  };

  useEffect(() => {
    const adapted = adapterFunction(activity).sort(
      (prev, curr) =>
        Date.parse(new Date(prev.updatedAt)) -
        Date.parse(new Date(curr.updatedAt))
    );
    setActivityData([...adapted]);
  }, [activity]);

  return (
    <div className={styles.box}>
      <div className={styles.sectionHeader}>
        <Image
          src="/view-token/Icon-Activity.svg"
          height={19}
          width={19}
          alt="description"
        />
        <div>
          <span>Item Activity</span>
          {isActivityOpened ? (
            <Image
              src="/view-token/Icon-ArrowUp.svg"
              height={15}
              width={30}
              alt="arrow-down"
              onClick={() => setIsActivityOpened(false)}
            />
          ) : (
            <Image
              src="/view-token/Icon-ArrowDown.svg"
              height={15}
              width={30}
              alt="arrow-up"
              onClick={() => setIsActivityOpened(true)}
            />
          )}
        </div>
      </div>
      {activityData && activityData.length > 0 ? (
        <>
          <div
            className={cn(styles.opened, styles.activityFilterWrapper, {
              [styles.closed]: !isActivityOpened,
            })}
          >
            <Select
              fullWidth
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              style={{
                color: 'white',
                width: '308px',
                height: '49px',
              }}
              IconComponent={() => (
                <div
                  style={{
                    right: '16px',
                    position: 'absolute',
                    pointerEvents: 'none',
                  }}
                >
                  <Image
                    src="/view-token/Icon-ArrowDown.svg"
                    height={8}
                    width={16}
                    alt="arrow-up"
                  />
                </div>
              )}
              value={selectedFilter}
              onChange={({ target: { value } }) => setSelectedFilter(value)}
              className={muiClasses.select}
            >
              <MenuItem disabled value="none">
                <span style={{ color: 'rgb(77, 77, 77)' }}>Filter</span>
              </MenuItem>
              {filterOptions.map(({ id, text }) => (
                <MenuItem key={id} value={text}>
                  <span>{text}</span>
                </MenuItem>
              ))}
            </Select>
          </div>
          <div
            className={cn(styles.tableRow, styles.opened, styles.tableHead, {
              [styles.closed]: !isActivityOpened,
            })}
          >
            <div className={styles.maxWidth150}>
              <span>Event</span>
            </div>
            <div
              className={cn(
                styles.maxWidth150,
                styles.marginRight10percent,
                styles.justufyRight
              )}
            >
              <span>Price</span>
            </div>
            <div>
              <span>From</span>
            </div>
            <div>
              <span>To</span>
            </div>
            <div className={styles.maxWidth150}>Date</div>
          </div>
          <div
            className={cn(styles.opened, {
              [styles.closed]: !isActivityOpened,
            })}
          >
            {activityData.map(
              ({ type, buyer, seller, price, usdPrice, date, id }) => (
                <div key={id} className={styles.tableRow}>
                  <div className={cn(styles.activityEvent, styles.maxWidth150)}>
                    {
                      <Image
                        src="/view-token/Icon-Offers.svg"
                        height={19}
                        width={19}
                        alt="eth-icon"
                      />
                    }
                    <span className={styles.marginLeft12}>{type}</span>
                  </div>
                  <div
                    className={cn(
                      styles.column,
                      styles.maxWidth150,
                      styles.marginRight10percent,
                      styles.alignRight
                    )}
                  >
                    <span className={styles.priceText}>
                      <Image
                        src="/view-token/Icon-Weth.svg"
                        height={19}
                        width={19}
                        alt="eth-icon"
                      />
                      <span
                        className={cn(styles.marginLeft4, styles.marginBottom4)}
                      >
                        {price}
                      </span>
                    </span>
                    <span className={styles.greySmallText}>{usdPrice}</span>
                  </div>
                  <div>
                    <span className={styles.link}>
                      {buyer.username ||
                        `${buyer.publicAddress.substring(
                          0,
                          6
                        )}...${buyer.publicAddress.substring(
                          buyer.publicAddress.length - 6
                        )}`}
                    </span>
                  </div>
                  <div>
                    <span className={styles.link}>
                      {seller.username ||
                        `${seller.publicAddress.substring(
                          0,
                          6
                        )}...${seller.publicAddress.substring(
                          seller.publicAddress.length - 6
                        )}`}
                    </span>
                  </div>
                  <div className={styles.maxWidth150}>
                    <span className={styles.activityDateText}>{date}</span>
                  </div>
                </div>
              )
            )}
          </div>
        </>
      ) : (
        <div
          className={cn(styles.emptySection, styles.opened, {
            [styles.closed]: !isActivityOpened,
          })}
        >
          <span>No item activity</span>
        </div>
      )}
    </div>
  );
};
