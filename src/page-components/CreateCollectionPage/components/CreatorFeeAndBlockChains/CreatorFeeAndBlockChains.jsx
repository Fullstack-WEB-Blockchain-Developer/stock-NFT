import { useState, useEffect } from "react";
//next
import Image from "next/image";
//mui
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
//validator
import WAValidator from "wallet-address-validator";
//hooks
import { useStyles } from "../../../../hooks/useStyles";
//styles
import styles from "./CreatorFeeAndBlockChains.module.scss";

export const CreatorFeeAndBlockChains = ({ chains, values, setValues, errors, setErrors, paymentTokens }) => {
  const muiClasses = useStyles();

  const [availableTokens, setAvailableTokens] = useState(
    paymentTokens
      .filter((elem) => values.choosenPaymentTokens.every((item) => item.name !== elem.name))
      .filter(({ name }) => name !== "ETH" && name !== "WETH")
  );
  
  const handleChooseTokens = ({ target: { value } }) => {
    setValues({
      ...values,
      choosenPaymentTokens: [
        ...values.choosenPaymentTokens,
        availableTokens.find((elem) => elem.name === value),
      ],
    });
    setAvailableTokens([...availableTokens.filter((elem) => elem.name !== value)]);
  };

  const handleClickCross = (name) => {
    setAvailableTokens([...availableTokens, values.choosenPaymentTokens.find((elem) => elem.name === name)]);
    setValues({
      ...values,
      choosenPaymentTokens: [...values.choosenPaymentTokens.filter((elem) => elem.name !== name)],
    });
  };

  useEffect(() => {
    if (values.creatorFee < 0) setValues({ ...values, creatorFee: 0 });

    if (values.creatorFee > 10) {
      setErrors({
        ...errors,
        creatorFee: { isError: true, helperText: "Creator earnings cannot be greater than 10%" },
      });
    } else {
      setErrors({
        ...errors,
        creatorFee: { isError: false, helperText: "" },
      });
    }
  }, [values.creatorFee]);

  useEffect(() => {
    if (values.walletAddress) {
      if (WAValidator.validate(values.walletAddress, "ETH")) {
        setErrors({
          ...errors,
          walletAddress: { isError: false, helperText: "" },
        });
      } else {
        setErrors({
          ...errors,
          walletAddress: { isError: true, helperText: "Invalid wallet address" },
        });
      }
    }
  }, [values.walletAddress]);

  return (
    <>
      <div className={styles.title}>
        <span>Creator earnings</span>
      </div>
      <div className={styles.description}>
        <span>The number of items that can be minted. No gas cost to you!</span>
      </div>
      <div className={styles.title}>
        <span>Creator Fee</span>
      </div>
      <div className={styles.description}>
        <span>
          Collect a fee when a user re-sells an item you originally created. This is deducted from the final
          sale price and paid monthly to a payout address of your choosing.
        </span>
      </div>
      <TextField
        error={errors.creatorFee.isError}
        helperText={errors.creatorFee.isError && errors.creatorFee.helperText}
        fullWidth
        id="creatorFee"
        label="e.g. 2.5"
        variant="outlined"
        className={errors.creatorFee.isError ? muiClasses.textFieldError : muiClasses.textField}
        value={values.creatorFee}
        onChange={({ target: { value } }) => setValues({ ...values, creatorFee: value })}
        InputProps={{ style: { color: "white" } }}
        type="number"
      />
      {values.creatorFee && values.creatorFee > 0 && (
        <>
          <div className={styles.title}>
            <span>
              Your payout wallet address<span className={styles.star}>*</span>
            </span>
          </div>
          <TextField
            error={errors.walletAddress.isError}
            helperText={errors.walletAddress.isError && errors.walletAddress.helperText}
            fullWidth
            id="address"
            label="Please enter an address"
            variant="outlined"
            className={errors.walletAddress.isError ? muiClasses.textFieldError : muiClasses.textField}
            value={values.walletAddress}
            onChange={({ target: { value } }) => setValues({ ...values, walletAddress: value })}
            InputProps={{ style: { color: "white" } }}
          />
        </>
      )}
      <div className={styles.title}>
        <span>Blockchain</span>
      </div>
      <div className={styles.description}>
        <span>
          Select the blockchain where you’d like new items from this collection to be added by default.
        </span>
      </div>
      <Select
        fullWidth
        labelId="blockchain"
        id="blockchain"
        style={{
          color: "white",
        }}
        onChange={({ target: { value } }) => setValues({ ...values, blockchain: value })}
        value={values.blockchain}
        className={muiClasses.select}
      >
        <MenuItem disabled value="none">
          <span style={{ color: "rgb(77, 77, 77)" }}>Select Blockchain</span>
        </MenuItem>
        {chains.map(({ name, icon, id }) => (
          <MenuItem key={id} value={name}>
            <span className={styles.menuItem}>
              <Image
                alt={`${name}-icon`}
                height={28}
                loader={({ src }) => `${process.env.BACKEND_ASSETS_URL}/icons/${src}`}
                src={icon}
                width={28}
              />
              <span>{name}</span>
            </span>
          </MenuItem>
        ))}
      </Select>
      <div className={styles.title}>
        <span>Payment tokens</span>
      </div>
      <div className={styles.description}>
        <span>These tokens can be used to buy and sell your items. </span>
      </div>
      <div className={styles.paymentTokensWrapper}>
        <div className={styles.paymentTokenWrapper}>
          <Image src="/profile-settings/Icon-Eth.svg" width={31} height={31} alt="eth-icon" />
          <div className={styles.paymentTokenInfoWrapper}>
            <div className={styles.tokenName}>
              <span>ETH</span>
            </div>
            <div className={styles.tokenDescription}>
              <span>Ethereum</span>
            </div>
          </div>
        </div>
        <div className={styles.paymentTokenWrapper}>
          <Image src="/view-token/Icon-Weth.svg" width={31} height={31} alt="weth-icon" />
          <div className={styles.paymentTokenInfoWrapper}>
            <div className={styles.tokenName}>
              <span>WETH</span>
            </div>
            <div className={styles.tokenDescription}>
              <span>Ethereum</span>
            </div>
          </div>
        </div>
        {values.choosenPaymentTokens.map(({ name, icon, id, blockchain }) => (
          <div key={id} className={styles.paymentTokenWrapper}>
            {icon ? (
              <Image
                alt={`${name}-icon`}
                height={31}
                loader={({ src }) => `${process.env.BACKEND_ASSETS_URL}/icons/${src}`}
                src={icon}
                width={31}
              />
            ) : (
              <div className={styles.noIcon}>
                No<br></br> icon
              </div>
            )}
            <div className={styles.paymentTokenInfoWrapper}>
              <div className={styles.tokenName}>
                <span>{name}</span>
              </div>
              <div className={styles.tokenDescription}>
                <span>{blockchain}</span>
              </div>
            </div>
            <div className={styles.cross}>
              <div onClick={() => handleClickCross(name)}>
                <Image src="/create-nft/Icon-Close.svg" width={19} height={19} alt="close" />
              </div>
            </div>
          </div>
        ))}
        <Select
          fullWidth
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          style={{
            color: "white",
          }}
          onChange={handleChooseTokens}
          value="none"
          className={muiClasses.select}
        >
          <MenuItem disabled value="none">
            <span style={{ color: "rgb(77, 77, 77)" }}>Add Token</span>
          </MenuItem>
          {availableTokens.map(({ name, icon, id }) => (
            <MenuItem key={id} value={name}>
              <span className={styles.menuItem}>
                {icon && (
                  <Image
                    alt={`${name}-icon`}
                    height={28}
                    loader={({ src }) => `${process.env.BACKEND_ASSETS_URL}/icons/${src}`}
                    src={icon}
                    width={28}
                  />
                )}
                <span>{name}</span>
              </span>
            </MenuItem>
          ))}
        </Select>
      </div>
    </>
  );
};
