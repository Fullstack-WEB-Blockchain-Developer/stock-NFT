import { useEffect, useState, useRef } from 'react';
//next
import Image from 'next/image';
//redux
import { useSelector, useDispatch } from "react-redux";
import { getAllCurrencies } from "src/redux/slices/generalDataSlice";
import { changeToken } from "src/redux/slices/ListTokenSlice";
import { addToken, getAllUserTokens, clearError } from "src/redux/slices/ListTokenSlice";
import { open as openError } from "src/redux/slices/errorSnackbarSlice";
//mui
import TextField from '@mui/material/TextField';
import { Select, MenuItem } from '@mui/material';
//components
import { CustSwitch } from "src/components/CustSwitch/CustSwitch.jsx";
// import { CustSwitch } from "src/components/CustSwitch/CustSwitch";
import { DatePicker } from "../DatePicker/DatePicker";
//hooks
import { useStyles } from "src/hooks/useStyles";
//utils
import { getEtherPrice } from "src/utils/index";
//styles
import styles from './ListFixedPriceInputs.module.scss';

export const ListFixedPriceInputs = ({ id }) => {
  const anchor = useRef();
  const dispatch = useDispatch();
  const muiClasses = useStyles();
  const { currencies, error } = useSelector((state) => state.generalData);
  const token = useSelector((state) => state.listToken.tokens).find((token) => token.id === id);
  const { asBundle, bundleDescription, bundleName, currency, isReserved, price, specificBuyerAddress, usdPrice } =
    token;
  const [isDayPickerOpened, setIsDayPickerOpened] = useState(false);
  const [durationTextFieldValue, setDurationTextFieldValue] = useState('7 days');

  //TODO: fix date input and price input logic

  // const [currency, setCurrency] = useState();
  // const [price, setPrice] = useState();

  const handleAsBundle = () => {
    dispatch(changeToken({ id, field: 'asBundle', newValue: !asBundle }));
    dispatch(changeToken({ id, field: 'bundle', newValue: !asBundle ? [token] : [] }));
  };

  const handleEthPrice = async () => await getEtherPrice();

  useEffect(() => {
    price < 0 && dispatch(changeToken({ id, field: 'price', newValue: 0 }));
  }, [dispatch, price]);

  useEffect(() => {
    price &&
      handleEthPrice().then((result) => {
        dispatch(changeToken({ id, field: 'usdPrice', newValue: (Number(price) * result).toFixed(4) }));
      });
  }, [price]);

  useEffect(() => {
    currencies.length === 0 && dispatch(getAllCurrencies());
    currencies.length > 0 && dispatch(changeToken({ id, field: 'currency', newValue: currencies[0].name }));
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

  return (
    <>
      <div className={styles.title}>
        <span>
          Price <span className={styles.star}>*</span>
        </span>
      </div>
      <div className={styles.priceField}>
        <Select
          fullWidth
          id=""
          type="number"
          variant="outlined"
          // disabled
          IconComponent={() => (
            <div style={{ right: '16px', position: 'absolute', pointerEvents: 'none' }}>
              <Image src="/view-token/Icon-ArrowDown.svg" height={8} width={16} alt="arrow-up" />
            </div>
          )}
          sx={{ width: '24%', maxHeight: '56px', color: 'white' }}
          className={muiClasses.selectLeftHalf}
          value={currency}
          InputProps={{ style: { color: 'white' } }}
          onChange={({ target: { value } }) => dispatch(changeToken({ id, field: 'currency', newValue: value }))}
        >
          <MenuItem disabled value="none">
            <span style={{ color: 'rgb(77, 77, 77)' }}>Currency</span>
          </MenuItem>
          {currencies.map(({ name, id, icon }) => (
            <MenuItem value={name} key={id}>
              <span>
                <span style={{ position: 'relative', top: '3px' }}>
                  <Image
                    alt="currency-icon"
                    height={31}
                    loader={({ src }) => `${process.env.BACKEND_ASSETS_URL}/icons/${src}`}
                    src={icon}
                    width={31}
                  />
                </span>
                <span style={{ marginLeft: '20px', position: 'relative', bottom: '6px' }}>{name}</span>
              </span>
            </MenuItem>
          ))}
        </Select>
        <TextField
          fullWidth
          id="price"
          type="number"
          placeholder="Amount"
          variant="outlined"
          sx={{ width: '76%' }}
          onChange={({ target: { value } }) => dispatch(changeToken({ id, field: 'price', newValue: value }))}
          className={muiClasses.textFieldRightHalf}
          value={price}
          // TODO: please implement max price function
          InputProps={{ style: { color: "white" } }}
        />
        {price && usdPrice && (
          <div className={styles.usdPrice}>
            <span>${usdPrice}</span>
          </div>
        )}
      </div>
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
          ref={anchor}
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
        <span>Sell as bundle</span>
        <CustSwitch checken={asBundle} onChange={handleAsBundle} />
      </div>
      {asBundle && (
        <>
          <div className={styles.title}>
            <span>Name</span>
          </div>
          <div className={styles.bundleNameField}>
            <TextField
              fullWidth
              id="bundleName"
              label="Bundle name"
              type="text"
              variant="outlined"
              onChange={({ target: { value } }) => dispatch(changeToken({ id, field: 'bundleName', newValue: value }))}
              className={muiClasses.textField}
              value={bundleName}
              InputProps={{ style: { color: 'white' } }}
              inputProps={{ maxLength: 50 }}
            />
          </div>
          <div className={styles.title}>
            <span>Description</span>
          </div>
          <div className={styles.bundleNameField}>
            <TextField
              fullWidth
              id="bundleDescription"
              label="Bundle description"
              type="text"
              variant="outlined"
              onChange={({ target: { value } }) =>
                dispatch(changeToken({ id, field: 'bundleDescription', newValue: value }))
              }
              className={muiClasses.textField}
              value={bundleDescription}
              InputProps={{ style: { color: 'white' } }}
              inputProps={{ maxLength: 500 }}
              multiline
              minRows={4}
            />
          </div>
        </>
      )}
      <div className={styles.reserveForSpecific}>
        <div className={styles.reserveTextWrapper}>
          <div className={styles.title}>
            <span>Reserve for specific buyer</span>
          </div>
          <div className={styles.description}>
            <span>This item can be purchased as soon as it’s listed.</span>
          </div>
        </div>
        <CustSwitch
          checken={isReserved}
          onChange={() => dispatch(changeToken({ id, field: 'isReserved', newValue: !isReserved }))}
        />
      </div>
      {isReserved && (
        <div className={styles.reservedField}>
          <TextField
            fullWidth
            id="reserved"
            label="Wallet Address"
            type="text"
            variant="outlined"
            onChange={({ target: { value } }) =>
              dispatch(changeToken({ id, field: 'specificBuyerAddress', newValue: value }))
            }
            className={muiClasses.textField}
            value={specificBuyerAddress}
            InputProps={{ style: { color: 'white' } }}
            inputProps={{ maxLength: 50 }}
          />
        </div>
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
