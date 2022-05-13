import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(
  {
    datePicker: {
      '&.MuiCustomized-datePicker': {
        backgroundColor: '#212020',
        color: 'white',
      },
      '& .css-1w13o7u-MuiTypography-root': {
        color: 'white',
      },
      '& .css-qhrdzm-MuiButtonBase-root-MuiPickersDay-root-MuiDateRangePickerDay-day': {
        color: 'white',
      },
      '& .css-l5pdik-MuiButtonBase-root-MuiPickersDay-root-MuiDateRangePickerDay-day': {
        color: 'var(--primary)',
      },
      '& .css-18fxmqw-MuiButtonBase-root-MuiPickersDay-root-MuiDateRangePickerDay-day.Mui-selected': {
        color: 'var(--primary)',
        backgroundColor: '#617BFF1A',
        boxShadow: 'inset 0px 0px 1px 1px var(--primary)',
        borderRadius: '4px',
        color: 'var(--primary)',
      },
      '& .css-1f2kitb-MuiDateRangePickerDay-root': {
        backgroundColor: '#617BFF1A',
        boxShadow: 'inset 0px 0px 1px 1px var(--primary)',
        borderRadius: '4px',
      },
      '& .css-18fxmqw-MuiButtonBase-root-MuiPickersDay-root-MuiDateRangePickerDay-day': {
        borderRadius: '0px',
      },
      '& .css-1h14vs8-MuiDateRangePickerDay-root, & .css-1m3meum-MuiDateRangePickerDay-root': {
        borderRadius: '0px',
        background: 'none',
      },
      '& .css-pgdzhj-MuiButtonBase-root-MuiPickersDay-root-MuiDateRangePickerDay-day.Mui-selected': {
        backgroundColor: '#617BFF1A',
        boxShadow: 'inset 0px 0px 1px 1px var(--primary)',
        borderRadius: '0px',
      },
      '& .css-1f2kitb-MuiDateRangePickerDay-root:first-of-type, & .css-1f2kitb-MuiDateRangePickerDay-root:last-of-type':
        {
          borderRadius: '4px',
        },
      '& .css-pgdzhj-MuiButtonBase-root-MuiPickersDay-root-MuiDateRangePickerDay-day.Mui-selected': {
        color: 'var(--primary)',
      },
      '& .css-pgdzhj-MuiButtonBase-root-MuiPickersDay-root-MuiDateRangePickerDay-day.Mui-selected': {
        backgroundColor: '#617BFF1A',
        boxShadow: 'inset 0px 0px 1px 1px var(--primary)',
        color: 'var(--primary)',
      },
      '& .css-pgdzhj-MuiButtonBase-root-MuiPickersDay-root-MuiDateRangePickerDay-day': {
        borderRadius: '4px',
      },
      '& .css-1fzen3a-MuiButtonBase-root-MuiPickersDay-root-MuiDateRangePickerDay-day': {
        border: 'none',
        color: 'var(--primary)',
      },
      '& .css-1m3meum-MuiDateRangePickerDay-root, & .css-1h14vs8-MuiDateRangePickerDay-root': {
        backgroundColor: '#617BFF1A',
        boxShadow: 'inset 0px 0px 1px 1px var(--primary)',
        borderRadius: '4px',
      },
      '& .css-jwafdq-MuiButtonBase-root-MuiPickersDay-root-MuiDateRangePickerDay-day': {
        borderRadius: '4px',
      },
      '& .css-jwafdq-MuiButtonBase-root-MuiPickersDay-root-MuiDateRangePickerDay-day': {
        boxShadow: 'inset 0px 0px 1px 1px var(--primary)',
        backgroundColor: '#617BFF1A',
        borderRadius: '4px',
      },
      '& .css-w38svh-MuiDateRangePickerDay-root': {
        background: 'none',
      },
      '& .css-jwafdq-MuiButtonBase-root-MuiPickersDay-root-MuiDateRangePickerDay-day.Mui-selected:hover, .css-qhrdzm-MuiButtonBase-root-MuiPickersDay-root-MuiDateRangePickerDay-day:hover':
        {
          backgroundColor: '#617BFF1A',
          borderRadius: '4px',
          border: '1px solid var(--primary)',
        },
      '& .css-1rhx85y-MuiButtonBase-root-MuiPickersDay-root-MuiDateRangePickerDay-day:not(.Mui-selected)': {
        color: 'var(--light-grey)',
        border: '1px solid var(--light-grey)',
      },
      '& .css-jgke5a-MuiButtonBase-root-MuiPickersDay-root-MuiDateRangePickerDay-day.Mui-selected': {
        backgroundColor: '#617BFF1A',
      },
      '& .css-jwafdq-MuiButtonBase-root-MuiPickersDay-root-MuiDateRangePickerDay-day:focus.Mui-selected': {
        backgroundColor: '#617BFF1A',
        color: 'var(--primary)',
      },
    },
    textField: {
      borderRadius: '7px',
      color: 'white !important',
      svg: {
        fill: 'white !important'
      },
      '& label': {
        color: 'var(--shadow)',
      },
      '& .css-vubbuv': {
        fill: 'white',
      },
      '& .css-segi59': {
        color: 'var(--white)',
      },
      '& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input': {
        color: 'white',
      },
      '& .css-i4bv87-MuiSvgIcon-root': {
        fill: 'white',
      },
      '& label.Mui-focused': {
        color: 'var(--primary)',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: 'yellow',
        borderRadius: '7px',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'var(--shadow)',
          borderRadius: '7px',
        },
        '&:hover fieldset': {
          borderColor: 'var(--shadow)',
          borderRadius: '7px',
        },
        '&.Mui-focused fieldset': {
          borderColor: 'var(--primary)',
          borderRadius: '7px',
          color: 'var(--primary)',
        },
        '& .Mui-error .Mui-focused fieldset': {
          color: 'red !important',
          borderColor: 'red',
        },
      },
    },
    textFieldError: {
      borderRadius: '7px',
      '& label.Mui-focused': {
        color: '#d32f2f',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: '#d32f2f',
        borderRadius: '7px',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: '#d32f2f',
          borderRadius: '7px',
        },
        '&:hover fieldset': {
          borderColor: '#d32f2f',
          borderRadius: '7px',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#d32f2f',
          borderRadius: '7px',
        },
        '& .Mui-error .Mui-focused fieldset': {
          color: '#d32f2f',
          borderColor: '#d32f2f',
        },
      },
    },
    icon: {
      fill: 'var(--light-grey)',
    },
    select: {
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        border: '2px solid var(--primary)',
      },
      '&.Mui-focused .MuiOutlinedInput-root': {
        border: '2px solid var(--primary)',
      },
      '&.MuiOutlinedInput-root:hover fieldset': {
        border: '1px solid var(--shadow)',
        borderRadius: '7px',
      },

      '&.MuiOutlinedInput-root fieldset': {
        border: '1px solid var(--shadow)',
        borderRadius: '7px',
      },
      '&.Mui-disabled span': {
        color: 'black',
      },
    },
    selectLeftHalf: {
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        border: '2px solid var(--primary)',
      },
      '&.Mui-focused .MuiOutlinedInput-root': {
        border: '2px solid var(--primary)',
      },
      '&.MuiOutlinedInput-root:hover fieldset': {
        border: '1px solid var(--shadow)',
        borderRadius: '7px 0 0 7px',
      },

      '&.MuiOutlinedInput-root fieldset': {
        border: '1px solid var(--shadow)',
        borderRadius: '7px 0 0 7px',
      },
      '&.Mui-disabled span': {
        color: 'black',
      },
    },
    textFieldLeftHalf: {
      borderRadius: '7px 0 0 7px',
      '& label.Mui-focused': {
        color: 'white',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: 'yellow',
        borderRadius: '7px 0 0 7px',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'var(--shadow)',
          borderRadius: '7px 0 0 7px',
        },
        '&:hover fieldset': {
          borderColor: 'var(--shadow)',
          borderRadius: '7px 0 0 7px',
        },
        '&.Mui-focused fieldset': {
          borderColor: 'var(--primary)',
          borderRadius: '7px 0 0 7px',
        },
      },
    },
    textFieldCenter: {
      borderRadius: '0',
      '& label.Mui-focused': {
        color: 'white',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: 'yellow',
        borderRight: 'none',
        borderLeft: 'none',
        borderRadius: '0',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'var(--shadow)',
          borderRight: 'none',
          borderLeft: 'none',
          borderRadius: '0',
        },
        '&:hover fieldset': {
          borderColor: 'var(--shadow)',
          borderRadius: '0',
        },
        '&.Mui-focused fieldset': {
          border: '2px solid var(--primary)',
          borderRadius: '0',
        },
      },
    },
    textFieldRightHalf: {
      borderRadius: '0 7px 7px 0',
      '& label.Mui-focused': {
        color: 'white',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: 'yellow',
        borderRadius: '0 7px 7px 0',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'var(--shadow)',
          borderRadius: '0 7px 7px 0',
        },
        '&:hover fieldset': {
          borderColor: 'var(--shadow)',
          borderRadius: '0 7px 7px 0',
        },
        '&.Mui-focused fieldset': {
          borderColor: 'var(--primary)',
          borderRadius: '0 7px 7px 0',
        },
      },
    },
    tripleTextFieldTop: {
      borderRadius: '0 7px 0 0',
      '& label.Mui-focused': {
        color: 'white',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: 'yellow',
        borderRadius: '0 7px 0 0',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'var(--shadow)',
          borderRadius: '0 7px 0 0',
          borderBottom: 'none',
          borderLeft: 'none',
        },
        '&:hover fieldset': {
          border: '1px solid var(--shadow)',
          borderRadius: '0 7px 0 0',
          borderBottom: 'none',

          borderLeft: 'none',
        },
        '&.Mui-focused fieldset': {
          border: '2px solid var(--primary)',
          borderRadius: '0 7px 0 0',
        },
      },
    },
    tripleTextFieldCenter: {
      borderRadius: '0px',
      '& label.Mui-focused': {
        color: 'white',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: 'yellow',
        borderRadius: '0px',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'var(--shadow)',
          borderRadius: '0px',
          borderBottom: 'none',
          borderLeft: 'none',
        },
        '&:hover fieldset': {
          borderColor: 'var(--shadow)',
          borderRadius: '0px',
          borderBottom: 'none',
          borderLeft: 'none',
        },
        '&.Mui-focused fieldset': {
          border: '2px solid var(--primary)',
          borderRadius: '0px',
        },
      },
    },
    tripleTextFieldBottom: {
      borderRadius: '0 0 7px 7px',
      '& label.Mui-focused': {
        color: 'white',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: 'yellow',
        borderRadius: '0 0 7px 0',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'var(--shadow)',
          borderRadius: '0 0 7px 0',
          borderLeft: 'none',
        },
        '&:hover fieldset': {
          borderColor: 'var(--shadow)',
          borderRadius: '0 0 7px 0',
          borderLeft: 'none',
        },
        '&.Mui-focused fieldset': {
          border: '2px solid var(--primary)',
          borderRadius: '0 0 7px 0',
        },
      },
    },
    textFieldWithoutLeft: {
      borderRadius: '0 7px 7px 0',
      '& label.Mui-focused': {
        color: 'white',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: 'yellow',
        borderRadius: '0 7px 7px 0',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'var(--shadow)',
          borderRadius: '0 7px 7px 0',
          borderLeft: 'none',
        },
        '&:hover fieldset': {
          borderColor: 'var(--shadow)',
          borderRadius: '0 7px 7px 0',
          borderLeft: 'none',
        },
        '&.Mui-focused fieldset': {
          border: '2px solid var(--primary)',
          borderRadius: '0 7px 7px 0',
        },
      },
    },
  },

  { name: 'MuiCustomized', index: 1 }
);
