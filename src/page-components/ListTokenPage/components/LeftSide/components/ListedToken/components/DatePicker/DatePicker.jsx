import { useEffect, useRef, useState } from 'react';
//next
import Image from 'next/image';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { changeToken } from '../../../../../../../../redux/slices/ListTokenSlice';
//mui
import TextField from '@mui/material/TextField';
import { Select, MenuItem } from '@mui/material';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
//hooks
import { useStyles } from '../../../../../../../../hooks/useStyles';
//utils
import { dateRanges, getDurationTextFieldValue } from './DatePicker.utils';
//styles
import styles from './DatePicker.module.scss';

export const DatePicker = ({ id, handleClose, setDurationTextFieldValue }) => {
  const muiClasses = useStyles();
  const dispatch = useDispatch();
  const wrapperRef = useRef();
  const selectRef = useRef();
  const { duration } = useSelector((state) => state.listToken.tokens).find((token) => token.id === id);

  const [selectedDateRange, setSelectedDateRange] = useState('7 days');
  const [time, setTime] = useState({
    start: new Date(),
    end: new Date(),
  });

  const handleSelectDateRange = (e) => {
    const {
      target: { value },
    } = e;

    setSelectedDateRange(value);
    let [start, end] = duration;
    start = new Date();
    end = new Date();
    end = Date.parse(end) + dateRanges.find(({ text }) => text === value).range;
    dispatch(changeToken({ id, field: 'duration', newValue: [start, end] }));
  };

  useEffect(() => {
    const startDate = new Date(duration[0]);
    const endDate = new Date(duration[1]);
    let startHours, startMinutes, endHours, endMinutes;

    if (time.start) {
      startHours = new Date(time.start).getHours();
      startMinutes = new Date(time.start).getMinutes();
      startDate.setHours(startHours);
      startDate.setMinutes(startMinutes);
    }

    if (time.end) {
      endHours = new Date(time.end).getHours();
      endMinutes = new Date(time.end).getMinutes();
      endDate.setHours(endHours);
      endDate.setMinutes(endMinutes);
    }

    dispatch(changeToken({ id, field: 'duration', newValue: [startDate, endDate] }));
  }, [time.start, time.end]);

  useEffect(() => {
    setDurationTextFieldValue(selectedDateRange !== 'none' ? selectedDateRange : getDurationTextFieldValue(duration));
  }, [duration]);

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <div className={styles.title}>
        <span>Date range</span>
        <span onClick={handleClose} style={{ cursor: 'pointer' }}>
          <Image src="/create-nft/Icon-Close.svg" alt="close-icon" width={15} height={15} onClick={handleClose} />
        </span>
      </div>
      <Select
        fullWidth
        id=""
        type="text"
        variant="outlined"
        IconComponent={() => (
          <div style={{ right: '16px', position: 'absolute', pointerEvents: 'none' }}>
            <Image src="/view-token/Icon-ArrowDown.svg" height={8} width={16} alt="arrow-up" />
          </div>
        )}
        sx={{ maxHeight: '56px', color: 'white' }}
        className={muiClasses.select}
        value={selectedDateRange}
        InputProps={{ style: { color: 'white' }, inputRef: selectRef }}
        onChange={handleSelectDateRange}
      >
        <MenuItem disabled value="none">
          <span style={{ color: 'rgb(77, 77, 77)' }}>Select range</span>
        </MenuItem>
        {dateRanges.map(({ text }) => (
          <MenuItem value={text} key={text}>
            <span>{text}</span>
          </MenuItem>
        ))}
      </Select>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateRangePicker
          startText="Starting date"
          endText="Ending date"
          className={muiClasses.datePicker}
          value={duration}
          onChange={(newValue) => {
            dispatch(changeToken({ id, field: 'duration', newValue }));
            setSelectedDateRange('none');
          }}
          renderInput={(startProps, endProps) => (
            <div className={styles.dateTextFieldsWrapper}>
              <div className={styles.leftTextField}>
                <TextField
                  {...startProps}
                  fullWidth
                  id="date"
                  type="date"
                  variant="outlined"
                  className={muiClasses.textField}
                  InputProps={{ style: { color: 'white' }, readOnly: true }}
                />
              </div>
              <div className={styles.dash}>-</div>
              <div className={styles.rightTextField}>
                <TextField
                  {...endProps}
                  fullWidth
                  id="date"
                  type="date"
                  variant="outlined"
                  className={muiClasses.textField}
                  InputProps={{ style: { color: 'white' }, readOnly: true }}
                />
              </div>
            </div>
          )}
        />
        <div className={styles.timePickersWrapper}>
          <div className={styles.timePicker}>
            <DesktopTimePicker
              label="Start time"
              onError={() => setTime({ ...time, start: new Date() + 1000 + 60 })}
              value={time.start}
              onChange={(newValue) => {
                setTime({ ...time, start: newValue });
              }}
              minTime={new Date()}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  type="time"
                  className={muiClasses.textField}
                  sx={{
                    color: 'white',
                  }}
                />
              )}
            />
          </div>
          <div className={styles.dash}>-</div>
          <div className={styles.timePicker}>
            <DesktopTimePicker
              label="End time"
              value={time.end}
              onChange={(newValue) => {
                setTime({ ...time, end: newValue });
              }}
              minTime={new Date(duration.start)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  type="time"
                  className={muiClasses.textField}
                  sx={{
                    color: 'white',
                  }}
                />
              )}
            />
          </div>
        </div>
      </LocalizationProvider>
    </div>
  );
};
