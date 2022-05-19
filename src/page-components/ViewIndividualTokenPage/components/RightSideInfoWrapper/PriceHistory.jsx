import { useEffect, useState } from "react";
//next
import Image from "next/image";
//recharts
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";
//classnames
import cn from "classnames";
//mui
import { Select, MenuItem } from "@mui/material";
//hooks
import { useStyles } from "../../../../hooks/useStyles";
//utils
import { priceHistorySelectOptions, fakePriceData } from "./RightSideInfoWrapper.utils";
//styles
import styles from "./RightSideInfoWrapper.module.css";

export const PriceHistory = ({ isPriceHistoryOpened, id }) => {
  const [selectedPeriod, setSelectedPeriod] = useState(priceHistorySelectOptions[0].text);
  const [average, setAverage] = useState(0);
  const [data, setData] = useState(undefined);

  const muiClasses = useStyles();

  useEffect(() => {
    const avg =
      Math.ceil((fakePriceData.reduce((acc, curr) => (acc += curr.price), 0) / fakePriceData.length) * 100) /
      100;
    setAverage(avg);
    setData([...fakePriceData]);
  }, []);

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
                color: "white",
                width: "308px",
                height: "49px",
              }}
              IconComponent={() => (
                <div style={{ right: "16px", position: "absolute", pointerEvents: "none" }}>
                  <Image src="/view-token/Icon-ArrowDown.svg" height={8} width={16} alt="arrow-up" />
                </div>
              )}
              value={selectedPeriod}
              onChange={({ target: { value } }) => setSelectedPeriod(value)}
              className={muiClasses.select}
            >
              <MenuItem disabled value="none">
                <span style={{ color: "rgb(77, 77, 77)" }}>Select period</span>
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
                <LineChart data={fakePriceData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <CartesianGrid stroke="#535354" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Line
                    type="basis"
                    dataKey="price"
                    stroke="var(--primary)"
                    dot={false}
                    strokeWidth={4}
                    zIndex={20}
                  />
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
