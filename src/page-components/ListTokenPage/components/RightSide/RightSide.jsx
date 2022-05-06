//next
import Image from "next/image";
//redux
import { useSelector, useDispatch } from "react-redux";
import { changeToken, toggleOpenPreview } from "../../../../redux/slices/ListTokenSlice";
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
import { enableMapSet } from "immer";

export const RightSide = ({ className }) => {
  const muiClasses = useStyles();
  const dispatch = useDispatch();
  const { tokens, openedPreviews, allUserTokens } = useSelector((state) => state.listToken);

  const handleSelectToken = (value, id) => {
    const newTokenToBundle = allUserTokens.find((token) => token.name === value);
    const token = tokens.find((elem) => elem.id === id);
    dispatch(changeToken({ id, field: "bundle", newValue: [...token.bundle, newTokenToBundle] }));
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
              <SquareNFTCard {...token} className={cn(styles.asBundleSquareCard, {
                  [styles.closed]: !openedPreviews.includes(token.id),
                })} />
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
              <div
                className={cn({
                  [styles.closed]: !openedPreviews.includes(token.id),
                })}
              >
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
                    marginBottom: "24px",
                  }}
                  onChange={({ target: { value } }) => handleSelectToken(value, token.id)}
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
                          <span>
                            <Image
                              alt={`${name}-image`}
                              height={25}
                              loader={({ src }) => `${process.env.BACKEND_ASSETS_URL}/nftMedia/${src}`}
                              src={fileName}
                              width={25}
                            />
                          </span>
                        )}
                        <span>{name}</span>
                      </span>
                    </MenuItem>
                  ))}
                </Select>
                <div className={styles.selectedTokens}>
                  {token.bundle.map((elem) => (
                    <div key={elem.id} className={styles.bundleItemPreview}>
                      <div className={styles.bundleItemPreviewvImage}>
                        <Image
                          alt={`${elem.id}-image`}
                          layout="fill"
                          objectFit="cover"
                          loader={({ src }) => `${process.env.BACKEND_ASSETS_URL}/nftMedia/${src}`}
                          src={elem.fileName}
                        />
                      </div>
                      <div className={styles.bundleItemPreviewvDescription}>
                        <span>{elem.collection?.name}</span>
                        <span>{elem.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};
