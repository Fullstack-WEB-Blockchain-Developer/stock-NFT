import { useEffect, useState } from 'react';
//next
import Image from 'next/image';
//mui
import TextField from '@mui/material/TextField';
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';
//styles
import cssStyles from './MakeOfferModal.module.css';
//hooks
import { useStyles } from '../../hooks/useStyles';

export const ComposedTextField = ({ modalData, setModalData, currencies }) => {
  const muiClasses = useStyles();

  const loadIcon = ({ src }) => {
    return `${process.env.BACKEND_ASSETS_URL}/icons/${src}`;
  };

  return (
    <div className={cssStyles.select}>
      <Select
        fullWidth
        id=""
        type="number"
        variant="outlined"
        IconComponent={() => (
          <div style={{ right: '16px', position: 'absolute', pointerEvents: 'none' }}>
            <Image src="/view-token/Icon-ArrowDown.svg" height={8} width={16} alt="arrow-up" />
          </div>
        )}
        sx={{ width: '24%', maxHeight: '56px', color: 'white' }}
        className={muiClasses.selectLeftHalf}
        value={modalData.currency.name}
        InputLabelProps={{
          style: { color: 'var(--shadow)' },
        }}
        InputProps={{ style: { color: 'white' } }}
        onChange={({ target: { value } }) =>
          setModalData({ ...modalData, currency: currencies.find((elem) => elem.name === value) })
        }
      >
        {currencies.map(({ name, id, icon }) => (
          <MenuItem value={name} key={id}>
            <span>
              <span style={{ position: 'relative', top: '3px' }}>
                <Image src={icon} loader={loadIcon} width={31} height={31} alt="currency-icon" />
              </span>
              <span style={{ marginLeft: '20px', position: 'relative', bottom: '6px' }}>{name}</span>
            </span>
          </MenuItem>
        ))}
      </Select>
      <TextField
        fullWidth
        id=""
        placeholder="Amount"
        type="number"
        variant="outlined"
        sx={{ width: '50%' }}
        className={muiClasses.textFieldCenter}
        value={modalData.amount}
        onChange={({ target: { value } }) => setModalData({ ...modalData, amount: Number(value) >= 0 ? value : '0' })}
        InputLabelProps={{
          style: { color: 'var(--shadow)' },
        }}
        InputProps={{ style: { color: 'white' }, inputProps: { min: 0 } }}
      />
      <TextField
        fullWidth
        id=""
        type="text"
        variant="outlined"
        sx={{ width: '26%' }}
        className={muiClasses.textFieldRightHalf}
        value={modalData.pricePerItem}
        InputLabelProps={{
          style: { color: 'var(--shadow)' },
        }}
        InputProps={{ style: { color: 'white' }, readOnly: true }}
      />
    </div>
  );
};
