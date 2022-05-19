import { useCallback, useEffect, useState } from 'react';
//axios
import axios from 'axios';
//recharts
import { LineChart, Line, CartesianGrid, XAxis, ResponsiveContainer, Tooltip } from 'recharts';
//classnames
import cn from 'classnames';
//utils
import { periods } from './Chart.utils';
import { getInterval } from './Chart.utils';
//styles
import styles from './Chart.module.css';

export const Chart = ({ userId }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('All');
  const [totalValuesArray, setTotalValuesArray] = useState([]);
  const [interval, setInterval] = useState(0);

  const getTotalValuesFromServer = useCallback(async () => {
    if (userId) {
      const { daysOffset } = periods.find(({ text }) => text === selectedPeriod);

      const { data } = await axios.get(
        `${process.env.BACKEND_URL}/users/${Number(userId)}/totalValueHistory?daysOffset=${daysOffset}`
      );

      const adaptedData = data.map(({ date, total_value }) => {
        const newDate = new Date(date);
        const monthDay = newDate.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
        return { date: monthDay, total: total_value };
      });

      setTotalValuesArray(adaptedData);
      setInterval(getInterval(adaptedData.length));
    }
  }, [selectedPeriod, userId]);

  useEffect(() => {
    getTotalValuesFromServer();
  }, [getTotalValuesFromServer]);

  return (
    <>
      <ResponsiveContainer width="100%" height={136}>
        <LineChart data={totalValuesArray} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <CartesianGrid stroke="rgb(55, 56, 58)" horizontal={false} />
          <Line type="linear" dataKey="total" stroke="#64FF8E" dot={false} strokeWidth={1.5} zIndex={20} />
          <XAxis dataKey="date" interval={interval} tickSize={0} height={1} stroke="white" zIndex={10} />
          <Tooltip
            itemStyle={{ color: 'var(--black)' }}
            labelStyle={{ color: 'var(--black)' }}
          />
        </LineChart>
      </ResponsiveContainer>
      <div className={styles.chartOptions}>
        <span>Total Value</span>
        <div className={styles.periods}>
          {periods.map(({ text }) => (
            <span
              key={text}
              className={cn(styles.period, {
                [styles.choosenPeriod]: selectedPeriod === text,
              })}
              onClick={() => setSelectedPeriod(text)}
            >
              {text}
            </span>
          ))}
        </div>
      </div>
    </>
  );
};
