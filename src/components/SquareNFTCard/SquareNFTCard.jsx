import { useState, useRef, useEffect } from 'react';
//next
import Image from 'next/image';
import { useRouter } from 'next/router';
//classnames
import cn from 'classnames';
//spinner
import { Oval } from 'react-loader-spinner';
//slider
import Slider from 'react-slick';
import { settings } from './SquareNFTCard.utils';
//components
import { Tag } from '../Tag/Tag';
//utils
import { videos, audios, images } from '../../helpers/extentions';
//styles
import styles from './SquareNFTCard.module.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const SquareNFTCard = ({
  bundle,
  category,
  className,
  collection,
  coverName,
  fileName,
  id,
  name,
  owner,
  price,
  status,
  blockchainType,
}) => {
  const [tokenFileError, setTokenFileError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [typeOfTokenFile, setTypeOfTokenFile] = useState();
  const router = useRouter();

  useEffect(() => {
    const end = fileName?.substring(fileName.indexOf('.') + 1).toLowerCase();

    if (images.includes(end)) {
      setTypeOfTokenFile('image');
    } else if (videos.includes(end)) {
      setTypeOfTokenFile('video');
    } else if (audios.includes(end)) {
      setTypeOfTokenFile('audio');
    }
  }, [fileName]);

  useEffect(() => {
    if (audioRef.current?.src || videoRef.current?.src) {
      setIsLoading(false);
    }
  }, [typeOfTokenFile]);

  const imageLoader = ({ src }) =>
    `${process.env.BACKEND_ASSETS_URL}/nftMedia/${src}`;

  const videoRef = useRef();
  const audioRef = useRef();

  return (
    <div className={cn(className, styles.wrapper)}>
      {!bundle || bundle.length === 0 ? (
        <>
          <div
            className={styles.imageWrapperWrapper}
            onClick={() => router.push(`/token/${id}`)}
          >
            <div
              className={cn(styles.imageWrapper, {
                [styles.blur]: status === 'pending',
              })}
            >
              {isLoading && (
                <div className={styles.spinner}>
                  <Oval
                    ariaLabel="loading-indicator"
                    color="var(--black)"
                    height={70}
                    secondaryColor="var(--light-grey)"
                    strokeWidth={3}
                    width={70}
                  />
                </div>
              )}
              {tokenFileError ? (
                <div className={styles.emptySection}>
                  <span>No file</span>
                </div>
              ) : (
                <>
                  {typeOfTokenFile === 'image' && (
                    <>
                      <Image
                        alt="token-image"
                        layout="fill"
                        objectFit="cover"
                        loader={imageLoader}
                        onError={() => setTokenFileError(true)}
                        onLoadingComplete={() => setIsLoading(false)}
                        src={fileName}
                      />
                    </>
                  )}
                  {typeOfTokenFile === 'video' && (
                    <video
                      alt="token-video"
                      autoPlay={false}
                      className={styles.video}
                      controls={status !== 'pending' ? 'controls' : false}
                      onError={() => setTokenFileError(true)}
                      ref={videoRef}
                      src={`${process.env.BACKEND_ASSETS_URL}/nftMedia/${fileName}`}
                    />
                  )}
                  {typeOfTokenFile === 'audio' && (
                    <>
                      {coverName && (
                        <Image
                          alt="token-image"
                          layout="fill"
                          objectFit="cover"
                          loader={imageLoader}
                          onError={() => setTokenFileError(true)}
                          onLoadingComplete={() => setIsLoading(false)}
                          src={coverName}
                        />
                      )}
                    </>
                  )}
                </>
              )}
            </div>
          </div>
          <div
            className={styles.infoWrapper}
            style={{
              justifyContent: price ? 'space-between' : 'space-evenly',
            }}
          >
            <div className={styles.name}>
              <span>{name}</span>
            </div>
            {price && blockchainType?.icon ? (
              <div className={styles.price}>
                <div className={styles.priceAmount}>
                  <Image
                    src={blockchainType.icon}
                    loader={({ src }) =>
                      `${process.env.BACKEND_ASSETS_URL}/icons/${src}`
                    }
                    alt={blockchainType.name}
                    width={19}
                    height={19}
                  />
                  <span>{price}</span>
                </div>
              </div>
            ) : (
              <></>
            )}
            <div className={styles.bottomSection}>
              <div className={styles.bottomLeft}>
                <div className={styles.collection}>
                  <span>{collection?.name}</span>
                </div>
                <div className={styles.address}>
                  {owner?.publicAddress.substring(0, 6)}...
                  {owner?.publicAddress.substring(
                    owner.publicAddress.length - 6
                  )}
                </div>
              </div>
              <div className={styles.bottomRight}>
                <Tag text={status === 'pending' ? status : category} />
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <Slider
            {...settings}
            lazyLoad="ondemand"
            draggable={true}
            adaptiveHeight={true}
            className={styles.slider}
          >
            {bundle.map((elem) => (
              <>
                <div
                  className={styles.imageWrapperWrapper}
                  onClick={() => router.push(`/token/${id}`)}
                >
                  <div
                    className={cn(styles.imageWrapper, {
                      [styles.blur]: elem.status === 'pending',
                    })}
                  >
                    {isLoading && (
                      <div className={styles.spinner}>
                        <Oval
                          ariaLabel="loading-indicator"
                          color="var(--black)"
                          height={70}
                          secondaryColor="var(--light-grey)"
                          strokeWidth={3}
                          width={70}
                        />
                      </div>
                    )}
                    {tokenFileError ? (
                      <div className={styles.emptySection}>
                        <span>No file</span>
                      </div>
                    ) : (
                      <>
                        {images.includes(
                          elem.fileName
                            ?.substring(elem.fileName.indexOf('.') + 1)
                            .toLowerCase()
                        ) && (
                          <>
                            <Image
                              alt="token-image"
                              layout="fill"
                              objectFit="cover"
                              loader={imageLoader}
                              onError={() => setTokenFileError(true)}
                              onLoadingComplete={() => setIsLoading(false)}
                              src={elem.fileName}
                            />
                          </>
                        )}
                        {videos.includes(
                          elem.fileName
                            ?.substring(elem.fileName.indexOf('.') + 1)
                            .toLowerCase()
                        ) && (
                          <video
                            alt="token-video"
                            autoPlay={false}
                            className={styles.video}
                            controls={status !== 'pending' ? 'controls' : false}
                            onError={() => setTokenFileError(true)}
                            ref={videoRef}
                            src={`${process.env.BACKEND_ASSETS_URL}/nftMedia/${elem.fileName}`}
                          />
                        )}
                        {audios.includes(
                          elem.fileName
                            ?.substring(fileName.indexOf('.') + 1)
                            .toLowerCase()
                        ) && (
                          <>
                            {elem.coverName && (
                              <Image
                                alt="token-image"
                                layout="fill"
                                objectFit="cover"
                                loader={imageLoader}
                                onError={() => setTokenFileError(true)}
                                onLoadingComplete={() => setIsLoading(false)}
                                src={elem.coverName}
                              />
                            )}
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
                <div className={styles.infoWrapper}>
                  <div className={styles.name}>
                    <span>{elem.name}</span>
                  </div>
                  {elem.price && elem.blockchainType?.icon ? (
                    <div className={styles.price}>
                      <div className={styles.priceAmount}>
                        <Image
                          src={elem.blockchainType.icon}
                          loader={({ src }) =>
                            `${process.env.BACKEND_ASSETS_URL}/icons/${src}`
                          }
                          alt={elem.blockchainType.name}
                          width={19}
                          height={19}
                        />
                        <span>{elem.price}</span>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                  <div className={styles.bottomSection}>
                    <div className={styles.bottomLeft}>
                      <div className={styles.collection}>
                        <span>{elem.collection?.name}</span>
                      </div>
                      <div className={styles.address}>
                        {elem.owner?.publicAddress.substring(0, 6)}...
                        {elem.owner?.publicAddress.substring(
                          elem.owner.publicAddress.length - 6
                        )}
                      </div>
                    </div>
                    <div className={styles.bottomRight}>
                      <Tag
                        text={
                          status === 'pending' ? elem.status : elem.category
                        }
                      />
                    </div>
                  </div>
                </div>
              </>
            ))}
          </Slider>
          <div className={styles.itemsQuantity}>{bundle.length} Items</div>
          <div className={styles.line} />
        </>
      )}
    </div>
  );
};
