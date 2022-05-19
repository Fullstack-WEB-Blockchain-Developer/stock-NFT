import { useState } from "react";
//recharts
import { LineChart, Line, CartesianGrid, XAxis, ResponsiveContainer } from "recharts";
//classnames
import cn from "classnames";
//utils
import { periods } from "./Chart.utils";
//styles
import styles from "./Chart.module.css";

export const Chart = ({ data }) => {
  const [selectedPeriod, setSelectedPeriod] = useState("All");
  
  return (
    <>
      {data && data.length > 0 ? (
        <>
          {data && (
            <>
              <ResponsiveContainer width="100%" height={136}>
                <LineChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <CartesianGrid stroke="rgb(55, 56, 58)" horizontal={false} />
                  <Line
                    type="linear"
                    dataKey="price"
                    stroke="#64FF8E"
                    dot={false}
                    strokeWidth={1.5}
                    zIndex={20}
                  />
                  <XAxis dataKey={{}} tickSize={0} height={1} stroke="rgb(55, 56, 58)" zIndex={10} />
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
          )}
        </>
      ) : (
        <div className={styles.empty}>
          <span>No data</span>
        </div>
      )}
    </>
  );
};
