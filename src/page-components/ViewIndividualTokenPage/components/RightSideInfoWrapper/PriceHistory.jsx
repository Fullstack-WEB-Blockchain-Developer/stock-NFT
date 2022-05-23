import { useCallback, useEffect, useState } from 'react';
//next
import Image from 'next/image';
//axios
import axios from 'axios';
//recharts
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
//classnames
import cn from 'classnames';
//mui
import { Select, MenuItem } from '@mui/material';
//hooks
import { useStyles } from '../../../../hooks/useStyles';
//utils
import { priceHistorySelectOptions, adaptChartData } from './RightSideInfoWrapper.utils';
import { getInterval } from 'src/page-components/ProfilePage/components/Chart/Chart.utils';
//styles
import styles from './RightSideInfoWrapper.module.css';

export const PriceHistory = ({ isPriceHistoryOpened, id }) => {
  const muiClasses = useStyles();

  const [average, setAverage] = useState(0);
  const [data, setData] = useState([]);
  const [interval, setInterval] = useState(0);
  const [selectedPeriod, setSelectedPeriod] = useState(priceHistorySelectOptions[0].text);

  const getPriceFromServer = useCallback(async () => {
    const daysOffset = priceHistorySelectOptions.find(({ text }) => text === selectedPeriod).daysOffset;

    const { data } = await axios.get(`${process.env.BACKEND_URL}/nfts/${id}/priceHistory?daysOffset=${daysOffset}`);

    setData(adaptChartData(data));
    setInterval(getInterval(data.length));
  }, [id, selectedPeriod]);

  useEffect(() => {
    getPriceFromServer();
  }, [getPriceFromServer]);

  useEffect(() => {
    const avg = Math.ceil((data.reduce((acc, curr) => (acc += curr.price), 0) / data.length) * 100) / 100;
    setAverage(avg);
  }, [data]);

  return (
    <>
      {data && data.length > 0 ? (
        <>
          <div
            className={cn(styles.filterAveragePriceWrapper, styles.opened, {
              [styles.closed]: !isPriceHistoryOpened,
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
                <div style={{ right: '16px', position: 'absolute', pointerEvents: 'none' }}>
                  <Image src="/view-token/Icon-ArrowDown.svg" height={8} width={16} alt="arrow-up" />
                </div>
              )}
              value={selectedPeriod}
              onChange={({ target: { value } }) => setSelectedPeriod(value)}
              className={muiClasses.select}
            >
              <MenuItem disabled value="none">
                <span style={{ color: 'rgb(77, 77, 77)' }}>Select period</span>
              </MenuItem>
              {priceHistorySelectOptions.map(({ id, text }) => (
                <MenuItem key={id} value={text}>
                  <span>{text}</span>
                </MenuItem>
              ))}
            </Select>
            <div className={styles.averagePriceWrapper}>
              <div>
                <Image src="/view-token/Icon-Weth.svg" width={19} height={19} alt="eth-icon" />
                <span className={styles.marginLeft4}>{average}</span>
              </div>
              <div>
                <span className={styles.greyVerySmallText}>Average Price</span>
              </div>
            </div>
          </div>
          <div
            className={cn(styles.chartWrapper, styles.opened, {
              [styles.closed]: !isPriceHistoryOpened,
            })}
          >
            {data && (
              <ResponsiveContainer width="100%" height={167}>
                <LineChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 5 }}>
                  <CartesianGrid stroke="#535354" vertical={true} sx={{marginBottom: '10px'}}/>
                  <XAxis interval={interval} dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="price" stroke="var(--primary)" strokeWidth={4} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </>
      ) : (
        <div
          className={cn(styles.emptySection, styles.opened, {
            [styles.closed]: !isPriceHistoryOpened,
          })}
        >
          <span>No price data</span>
        </div>
      )}
    </>
  );
};
