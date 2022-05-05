//next
import Image from "next/image";
//redux
import { useSelector, useDispatch } from "react-redux";
import {
  changeToken,
  toggleOpenPreview,
} from "../../../../redux/slices/ListTokenSlice";
//classnames
import cn from "classnames";
//mui
import { Select, MenuItem } from "@mui/material";
//hooks
import { useStyles } from "../../../../hooks/useStyles";
//components
import { SquareNFTCard } from "../../../../components/SquareNFTCard/SquareNFTCard";
//styles
import styles from "./RightSide.module.scss";

export const RightSide = ({ className }) => {
  const muiClasses = useStyles();
  const dispatch = useDispatch();
  const { tokens, openedPreviews, allUserTokens } = useSelector((state) => state.listToken);

  const handleSelectToken = (id) => {
    const token = tokens.find((token) => token.id === id);
    dispatch(changeToken({ id, field: "bundle", newValue: [...token.bundle] }));
  };

  return (
    <div className={className}>
      <div className={styles.rightSideTitle}>
        <span>Preview</span>
      </div>
      {tokens.map((token) => {
        if (!token.asBundle) {
          return (
            <div className={styles.tokenPreview} key={token.id}>
              <div className={styles.tokenListedHead}>
                <span>{token.name}</span>
                <span onClick={() => dispatch(toggleOpenPreview(token.id))}>
                  {openedPreviews.includes(token.id) ? (
                    <Image alt="arrow-up-icon" src="/view-token/Icon-ArrowUp.svg" height={8} width={16} />
                  ) : (
                    <Image alt="arrow-down-icon" src="/view-token/Icon-ArrowDown.svg" height={8} width={16} />
                  )}
                </span>
              </div>
              <SquareNFTCard
                {...token}
                className={cn({
                  [styles.closed]: !openedPreviews.includes(token.id),
                })}
              />
            </div>
          );
        } else {
          return (
            <div className={styles.tokenPreview} key={token.id}>
              <SquareNFTCard {...token} className={styles.asBundleSquareCard} />
              <div className={styles.tokenListedHead}>
                <span>{token.name}</span>
                <span onClick={() => dispatch(toggleOpenPreview(token.id))}>
                  {openedPreviews.includes(token.id) ? (
                    <Image alt="arrow-up-icon" src="/view-token/Icon-ArrowUp.svg" height={8} width={16} />
                  ) : (
                    <Image alt="arrow-down-icon" src="/view-token/Icon-ArrowDown.svg" height={8} width={16} />
                  )}
                </span>
              </div>
              <div className={styles.itemQuantity}>
                <span>
                  {token.bundle.length} {token.bundle.length > 1 ? "Items" : "Item"}
                </span>
              </div>
              <Select
                fullWidth
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                style={{
                  color: "white",
                }}
                onChange={() => handleSelectToken(token.id)}
                value="none"
                className={muiClasses.select}
              >
                <MenuItem disabled value="none">
                  <span style={{ color: "rgb(77, 77, 77)" }}>Select Items</span>
                </MenuItem>
                {allUserTokens.map(({ name, fileName, id }) => (
                  <MenuItem key={id} value={name}>
                    <span className={styles.menuItem}>
                      {fileName && (
                        <Image
                          alt={`${name}-icon`}
                          height={63}
                          loader={({ src }) => `${process.env.BACKEND_ASSETS_URL}/nftMedia/${src}`}
                          src={fileName}
                          width={63}
                        />
                      )}
                      <span>{name}</span>
                    </span>
                  </MenuItem>
                ))}
              </Select>
            </div>
          );
        }
      })}
    </div>
  );
};
