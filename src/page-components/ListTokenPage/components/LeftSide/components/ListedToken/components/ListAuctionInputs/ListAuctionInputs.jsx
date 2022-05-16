import { useEffect, useState } from 'react';
//next
import Image from 'next/image';
//redux
import { useSelector, useDispatch } from 'react-redux';
import { addToken, getAllUserTokens, clearError } from 'src/redux/slices/ListTokenSlice';
import { open as openError } from 'src/redux/slices/errorSnackbarSlice';
import { getAllCurrencies } from 'src/redux/slices/generalDataSlice';
import { changeToken } from 'src/redux/slices/ListTokenSlice';
//mui
import TextField from '@mui/material/TextField';
import { Select, MenuItem } from '@mui/material';
//components
import { CustSwitch } from '../../../../../../../../components/CustSwitch/CustSwitch';
import { DatePicker } from '../DatePicker/DatePicker';
//hooks
import { useStyles } from '../../../../../../../../hooks/useStyles';
//utils
import { getEtherPrice } from '../../../../../../../../utils/index';
import { methods } from './ListAuctionInputs.utils';
//styles
import styles from './ListAuctionInputs.module.scss';

export const ListAuctionInputs = ({ id }) => {
  const dispatch = useDispatch();
  const muiClasses = useStyles();
  const { currencies, error } = useSelector((state) => state.generalData);
  const token = useSelector((state) => state.listToken.tokens).find((token) => token.id === id);
  const {
    auctionMethod,
    auctionReserveCurrency,
    auctionReservePrice,
    auctionReserveUsdPrice,
    auctionStartingCurrency,
    auctionStartingPrice,
    auctionStartingUsdPrice,
    auctionEndPrice,
    auctionEndUsdPrice,
    auctionEndCurrency,
    includeReservePrice,
  } = token;
  const [isDayPickerOpened, setIsDayPickerOpened] = useState(false);
  const [durationTextFieldValue, setDurationTextFieldValue] = useState('7 days');

  const handleEthPrice = async () => await getEtherPrice();

  useEffect(() => {
    auctionReservePrice < 0 && dispatch(changeToken({ id, field: 'auctionReservePrice', newValue: 0 }));
    auctionStartingPrice < 0 && dispatch(changeToken({ id, field: 'auctionStartingPrice', newValue: 0 }));
    auctionEndPrice < 0 && dispatch(changeToken({ id, field: 'auctionEndPrice', newValue: 0 }));
  }, [dispatch, auctionReservePrice, auctionStartingPrice, auctionEndPrice]);

  useEffect(() => {
    auctionReservePrice &&
      handleEthPrice().then((result) =>
        dispatch(
          changeToken({
            id,
            field: 'auctionReserveUsdPrice',
            newValue: (Number(auctionReservePrice) * result).toFixed(4),
          })
        )
      );
  }, [auctionReservePrice]);

  useEffect(() => {
    auctionStartingPrice &&
      handleEthPrice().then((result) =>
        dispatch(
          changeToken({
            id,
            field: 'auctionStartingUsdPrice',
            newValue: (Number(auctionStartingPrice) * result).toFixed(4),
          })
        )
      );
  }, [auctionStartingPrice]);

  useEffect(() => {
    auctionEndPrice &&
      handleEthPrice().then((result) =>
        dispatch(
          changeToken({
            id,
            field: 'auctionEndUsdPrice',
            newValue: (Number(auctionEndPrice) * result).toFixed(4),
          })
        )
      );
  }, [auctionEndPrice]);

  useEffect(() => {
    auctionEndPrice < auctionStartingPrice &&
      dispatch(changeToken({ id, field: 'auctionEndPrice', newValue: auctionStartingPrice }));
    auctionReservePrice < auctionStartingPrice &&
      dispatch(changeToken({ id, field: 'auctionReservePrice', newValue: auctionStartingPrice }));
  }, [auctionEndPrice, auctionStartingPrice, auctionReservePrice, dispatch]);

  useEffect(() => {
    currencies.length === 0 && dispatch(getAllCurrencies());
    currencies.length > 0 &&
      dispatch(changeToken({ id, field: 'auctionStartingCurrency', newValue: currencies[0].name }));
    currencies.length > 0 &&
      dispatch(changeToken({ id, field: 'auctionReserveCurrency', newValue: currencies[0].name }));
    currencies.length > 0 && dispatch(changeToken({ id, field: 'auctionEndCurrency', newValue: currencies[0].name }));
  }, [dispatch, currencies, id]);

  useEffect(() => {
    if (error) {
      dispatch(
        openError(
          error.response?.data ? `${error.response.data.statusCode} ${error.response.data.message}` : error.message
        )
      );
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleReservePrice = () => {
    dispatch(changeToken({ id, field: 'includeReservePrice', newValue: !includeReservePrice }));
  };

  return (
    <>
      <div className={styles.title}>
        <span>
          Method <span className={styles.star}>*</span>
        </span>
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
          sx={{ color: 'white' }}
          className={muiClasses.select}
          value={auctionMethod}
          InputProps={{ style: { color: 'white' } }}
          onChange={({ target: { value } }) => dispatch(changeToken({ id, field: 'auctionMethod', newValue: value }))}
        >
          {methods.map(({ text }) => (
            <MenuItem value={text} key={text}>
              <span>{text}</span>
            </MenuItem>
          ))}
        </Select>
      </div>
      <div className={styles.title} style={{ marginTop: '16px' }}>
        <span>
          Starting Price <span className={styles.star}>*</span>
        </span>
      </div>
      <div className={styles.priceField}>
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
          value={auctionStartingCurrency}
          InputProps={{ style: { color: 'white' } }}
          onChange={({ target: { value } }) =>
            dispatch(changeToken({ id, field: 'auctionStartingCurrency', newValue: value }))
          }
        >
          <MenuItem disabled value="none">
            <span style={{ color: 'rgb(77, 77, 77)' }}>Currency</span>
          </MenuItem>
          <MenuItem value={currencies[0].name} key={currencies[0].id}>
            <span>
              <span style={{ position: 'relative', top: '3px' }}>
                <Image
                  alt="currency-icon"
                  height={31}
                  loader={({ src }) => `${process.env.BACKEND_ASSETS_URL}/icons/${src}`}
                  src={currencies[0].icon}
                  width={31}
                />
              </span>
              <span style={{ marginLeft: '20px', position: 'relative', bottom: '6px' }}>{currencies[0].name}</span>
            </span>
          </MenuItem>
        </Select>
        <TextField
          fullWidth
          id="price"
          type="number"
          placeholder="Amount"
          variant="outlined"
          sx={{ width: '76%' }}
          onChange={({ target: { value } }) =>
            dispatch(changeToken({ id, field: 'auctionStartingPrice', newValue: value }))
          }
          className={muiClasses.textFieldRightHalf}
          value={auctionStartingPrice}
          InputProps={{ style: { color: 'white' } }}
        />
        {auctionStartingPrice && auctionStartingUsdPrice && (
          <div className={styles.usdPrice}>
            <span>${auctionStartingUsdPrice}</span>
          </div>
        )}
      </div>
      {auctionMethod === 'Sell with declining price' && (
        <>
          <div className={styles.title} style={{ marginTop: '16px' }}>
            <span>
              Ending Price <span className={styles.star}>*</span>
            </span>
          </div>
          <div className={styles.priceField}>
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
              value={auctionEndCurrency}
              InputProps={{ style: { color: 'white' } }}
              onChange={({ target: { value } }) =>
                dispatch(changeToken({ id, field: 'auctionEndCurrency', newValue: value }))
              }
            >
              <MenuItem disabled value="none">
                <span style={{ color: 'rgb(77, 77, 77)' }}>Currency</span>
              </MenuItem>
              <MenuItem value={currencies[0].name} key={currencies[0].id}>
                <span>
                  <span style={{ position: 'relative', top: '3px' }}>
                    <Image
                      alt="currency-icon"
                      height={31}
                      loader={({ src }) => `${process.env.BACKEND_ASSETS_URL}/icons/${src}`}
                      src={currencies[0].icon}
                      width={31}
                    />
                  </span>
                  <span style={{ marginLeft: '20px', position: 'relative', bottom: '6px' }}>{currencies[0].name}</span>
                </span>
              </MenuItem>
            </Select>
            <TextField
              fullWidth
              id="price"
              type="number"
              placeholder="Amount"
              variant="outlined"
              sx={{ width: '76%' }}
              onChange={({ target: { value } }) =>
                dispatch(changeToken({ id, field: 'auctionEndPrice', newValue: value }))
              }
              className={muiClasses.textFieldRightHalf}
              value={auctionEndPrice}
              InputProps={{ style: { color: 'white' } }}
            />
            {auctionEndPrice && auctionEndUsdPrice ? (
              <div className={styles.usdPrice}>
                <span>${auctionEndUsdPrice}</span>
              </div>
            ) : (
              <></>
            )}
          </div>
        </>
      )}
      <div className={styles.title}>
        <span>
          Duration <span className={styles.star}>*</span>
        </span>
      </div>
      <div className={styles.durationField}>
        <TextField
          fullWidth
          id="date"
          type="text"
          placeholder="Select duration"
          variant="outlined"
          onClick={() => setIsDayPickerOpened(true)}
          className={muiClasses.textField}
          value={durationTextFieldValue}
          InputProps={{ style: { color: 'white' }, readOnly: true }}
        />
        {isDayPickerOpened && (
          <DatePicker
            handleClose={() => setIsDayPickerOpened(false)}
            id={id}
            durationTextFieldValue={durationTextFieldValue}
            setDurationTextFieldValue={setDurationTextFieldValue}
          />
        )}
      </div>
      <div className={styles.sellAsBundle}>
        <span>Include reserve price</span>
        <CustSwitch checken={includeReservePrice} onChange={handleReservePrice} />
      </div>
      {includeReservePrice && (
        <>
          <div className={styles.priceField}>
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
              value={auctionReserveCurrency}
              InputProps={{ style: { color: 'white' } }}
              onChange={({ target: { value } }) =>
                dispatch(changeToken({ id, field: 'auctionReserveCurrency', newValue: value }))
              }
            >
              <MenuItem disabled value="none">
                <span style={{ color: 'rgb(77, 77, 77)' }}>Currency</span>
              </MenuItem>
              <MenuItem value={currencies[0].name} key={currencies[0].id}>
                <span>
                  <span style={{ position: 'relative', top: '3px' }}>
                    <Image
                      alt="currency-icon"
                      height={31}
                      loader={({ src }) => `${process.env.BACKEND_ASSETS_URL}/icons/${src}`}
                      src={currencies[0].icon}
                      width={31}
                    />
                  </span>
                  <span style={{ marginLeft: '20px', position: 'relative', bottom: '6px' }}>{currencies[0].name}</span>
                </span>
              </MenuItem>
            </Select>
            <TextField
              fullWidth
              id="price"
              type="number"
              placeholder="Amount"
              variant="outlined"
              sx={{ width: '76%' }}
              onChange={({ target: { value } }) =>
                dispatch(changeToken({ id, field: 'auctionReservePrice', newValue: value }))
              }
              className={muiClasses.textFieldRightHalf}
              value={auctionReservePrice}
              InputProps={{ style: { color: 'white' } }}
            />
            {auctionReservePrice && auctionReserveUsdPrice ? (
              <div className={styles.usdPrice}>
                <span>${auctionReserveUsdPrice}</span>
              </div>
            ) : (
              <></>
            )}
          </div>
        </>
      )}
      <div className={styles.fees}>
        <div className={styles.feesTitleDescriptionWrapper}>
          <span className={styles.title}>Fees</span>
          <span className={styles.description}>Service Fee</span>
        </div>
        {/* fakeFee */}
        <span>2,5%</span>
      </div>
    </>
  );
};
