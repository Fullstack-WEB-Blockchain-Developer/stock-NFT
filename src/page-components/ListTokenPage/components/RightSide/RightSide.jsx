import { useState, useEffect } from 'react';
//next
import Image from 'next/image';
//redux
import { useSelector, useDispatch } from 'react-redux';
import {
  changeToken,
  toggleOpenPreview,
} from '../../../../redux/slices/ListTokenSlice';
//classnames
import cn from 'classnames';
//mui
import { Select, MenuItem } from '@mui/material';
//hooks
import { useStyles } from '../../../../hooks/useStyles';
//components
import { SquareNFTCard } from '../../../../components/SquareNFTCard/SquareNFTCard';
//utils
import { images, videos, audios } from 'src/helpers/extentions';
//styles
import styles from './RightSide.module.scss';
import { enableMapSet } from 'immer';

export const RightSide = ({ className }) => {
  const muiClasses = useStyles();
  const dispatch = useDispatch();
  const { tokens, openedPreviews, allUserTokens } = useSelector(
    (state) => state.listToken
  );
  const { currencies } = useSelector((state) => state.generalData);
console.log('---tokens', tokens)
  const handleSelectToken = (value, id) => {
    const newTokenToBundle = allUserTokens.find(
      (token) => token.name === value
    );
    const token = tokens.find((elem) => elem.id === id);

    dispatch(
      changeToken({
        id,
        field: 'bundle',
        newValue: [...token.bundle, newTokenToBundle],
      })
    );
  };
  console.log('---tokens', tokens);
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
                    <Image
                      alt="arrow-up-icon"
                      src="/view-token/Icon-ArrowUp.svg"
                      height={8}
                      width={16}
                    />
                  ) : (
                    <Image
                      alt="arrow-down-icon"
                      src="/view-token/Icon-ArrowDown.svg"
                      height={8}
                      width={16}
                    />
                  )}
                </span>
              </div>
              <SquareNFTCard
                {...token}
                notBundle
                price={
                  token.listingType === 'fixedPrice'
                    ? token.price 
                    : token.auctionStartingPrice
                }
                currency={currencies.find(
                  ({ name }) =>
                    name ===
                    (token.listingType === 'fixedPrice'
                      ? token.currency
                      : token.auctionStartingCurrency)
                )}
                className={cn({
                  [styles.closed]: !openedPreviews.includes(token.id),
                })}
              />
            </div>
          );
        } else {
          return (
            <div className={styles.tokenPreview} key={token.id}>
              <SquareNFTCard
                {...token}
                notBundle
                price={
                  token.listingType === 'fixedPrice'
                    ? token.price 
                    : token.auctionStartingPrice
                }
                currency={currencies.find(
                  ({ name }) =>
                    name ===
                    (token.listingType === 'fixedPrice'
                      ? token.currency
                      : token.auctionStartingCurrency)
                )}
                className={cn(styles.asBundleSquareCard, {
                  [styles.closed]: !openedPreviews.includes(token.id),
                })}
              />
              <div className={styles.tokenListedHead}>
                <span>{token.name}</span>
                <span onClick={() => dispatch(toggleOpenPreview(token.id))}>
                  {openedPreviews.includes(token.id) ? (
                    <Image
                      alt="arrow-up-icon"
                      src="/view-token/Icon-ArrowUp.svg"
                      height={8}
                      width={16}
                    />
                  ) : (
                    <Image
                      alt="arrow-down-icon"
                      src="/view-token/Icon-ArrowDown.svg"
                      height={8}
                      width={16}
                    />
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
                    {token.bundle.length}{' '}
                    {token.bundle.length > 1 ? 'Items' : 'Item'}
                  </span>
                </div>
                <Select
                  fullWidth
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  style={{
                    color: 'white',
                    marginBottom: '24px',
                  }}
                  onChange={({ target: { value } }) =>
                    handleSelectToken(value, token.id)
                  }
                  value="none"
                  className={muiClasses.select}
                >
                  <MenuItem disabled value="none">
                    <span style={{ color: 'rgb(77, 77, 77)' }}>
                      Select Items
                    </span>
                  </MenuItem>
                  {allUserTokens
                    .filter((elem) =>
                      token.bundle.every(
                        (bundToken) => bundToken.id !== elem.id
                      )
                    )
                    .map(({ name, fileName, id, coverName }) => (
                      <MenuItem key={id} value={name}>
                        <span className={styles.menuItem}>
                          {fileName && (
                            <span style={{ position: 'relative' }}>
                              {images.includes(
                                fileName
                                  .substring(fileName.indexOf('.') + 1)
                                  .toLowerCase()
                              ) && (
                                <Image
                                  alt={`${name}-image`}
                                  height={'25px'}
                                  loader={({ src }) =>
                                    `${process.env.BACKEND_ASSETS_URL}/nftMedia/${src}`
                                  }
                                  src={fileName}
                                  width={'25px'}
                                />
                              )}
                              {videos.includes(
                                fileName
                                  .substring(fileName.indexOf('.') + 1)
                                  .toLowerCase()
                              ) && (
                                <video
                                  src={`${process.env.BACKEND_ASSETS_URL}/nftMedia/${fileName}`}
                                  alt="token-video"
                                  className={styles.video}
                                />
                              )}
                              {audios.includes(
                                fileName
                                  .substring(fileName.indexOf('.') + 1)
                                  .toLowerCase()
                              ) && (
                                <>
                                  {coverName && (
                                    <Image
                                      alt={`${name}-image`}
                                      height={'25px'}
                                      loader={({ src }) =>
                                        `${process.env.BACKEND_ASSETS_URL}/nftMedia/${src}`
                                      }
                                      src={coverName}
                                      width={'25px'}
                                    />
                                  )}
                                </>
                              )}
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
                        {elem.fileName && (
                          <>
                            {images.includes(
                              elem.fileName
                                .substring(elem.fileName.indexOf('.') + 1)
                                .toLowerCase()
                            ) && (
                              <Image
                                alt={`${name}-image`}
                                loader={({ src }) =>
                                  `${process.env.BACKEND_ASSETS_URL}/nftMedia/${src}`
                                }
                                src={elem.fileName}
                                layout="fill"
                                objectFit="cover"
                              />
                            )}
                            {videos.includes(
                              elem.fileName
                                .substring(elem.fileName.indexOf('.') + 1)
                                .toLowerCase()
                            ) && (
                              <video
                                src={`${process.env.BACKEND_ASSETS_URL}/nftMedia/${elem.fileName}`}
                                alt="token-video"
                                className={styles.video}
                              />
                            )}
                            {audios.includes(
                              elem.fileName
                                .substring(elem.fileName.indexOf('.') + 1)
                                .toLowerCase()
                            ) && (
                              <>
                                {elem.coverName && (
                                  <Image
                                    alt={`${name}-image`}
                                    loader={({ src }) =>
                                      `${process.env.BACKEND_ASSETS_URL}/nftMedia/${src}`
                                    }
                                    src={elem.coverName}
                                    layout="fill"
                                    objectFit="cover"
                                  />
                                )}
                              </>
                            )}
                          </>
                        )}
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
