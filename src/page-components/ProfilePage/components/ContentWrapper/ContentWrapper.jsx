import { useState, useEffect, useCallback } from 'react';
//next
import Image from 'next/image';
//redux
import { useSelector, useDispatch } from 'react-redux';
import { getTokens, setData, clearOffsetAndTokens, clearError } from '../../../../redux/slices/profileFiltrationSlice';
import { open as openError } from '../../../../redux/slices/errorSnackbarSlice';
//classnames
import cn from 'classnames';
//infivite-scroll
import InfiniteScroll from 'react-infinite-scroll-component';
//components
import { Sidebar } from '../Sidebar/Sidebar';
import { NormalFilterSection } from './components/NormalFilterSection/NormalFilterSection';
import { OffersFilterSection } from './components/OffersFilterSection/OffersFilterSection';
import { TagsWrapper } from './components/TagsWrapper/TagsWrapper';
import { SquareNFTCard } from '../../../../components/SquareNFTCard/SquareNFTCard';
import { SmallNFTCard } from '../../../../components/SmallNFTCard/SmallNFTCard';
//utils
import { chooseSections, adaptActivities } from './ContentWrapper.utils';
//styles
import styles from './ContentWrapper.module.scss';

export const ContentWrapper = () => {
  const dispatch = useDispatch();
  const [isSidebarOpened, setIsSidebarOpened] = useState(true);
  const [publicAddress, setPublicAddress] = useState('');
  const [adaptedActivities, setAdaptedActivities] = useState([]);
  const {
    choosenSection,
    tokens,
    readyFilterOption,
    tokensGridScale,
    selectedStatuses,
    selectedCollections,
    selectedPrice,
    error,
  } = useSelector((state) => state.profileFiltration);
  const filtrationOptions = useSelector((state) => state.profileFiltration);

  useEffect(() => {
    const address = localStorage.getItem('account');
    setPublicAddress(address);
  }, []);
  console.log('---adaptedActivities', adaptedActivities);

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

  const handleGetTokens = useCallback(() => {
    dispatch(getTokens(choosenSection));
  }, [choosenSection, dispatch]);

  useEffect(() => {
    dispatch(clearOffsetAndTokens());
    handleGetTokens();
  }, [choosenSection]);

  useEffect(() => {
    if (choosenSection === 'activity') {
      adaptActivities(tokens).then((res) => setAdaptedActivities(res));
    }
  }, [tokens, choosenSection]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.chooseSectionWrapper}>
        {chooseSections.map(({ text, icon, nameForBE, forRedux }) => (
          <div
            className={cn(styles.chooseSection, {
              [styles.chooseSectionActive]: choosenSection === nameForBE,
            })}
            onClick={() => dispatch(setData({ field: 'choosenSection', data: nameForBE }))}
            key={text}
          >
            {icon}
            <span>
              {text}
              {nameForBE !== 'activity' && nameForBE !== 'offers' && `(${filtrationOptions[forRedux]})`}
            </span>
          </div>
        ))}
      </div>
      {chooseSections.map(({ nameForBE }) => (
        <>
          {choosenSection === nameForBE && (
            <div key={nameForBE} className={styles.bottomSideWrapper}>
              <Sidebar
                choosenTopSection={choosenSection}
                handleToggleSidebar={() => setIsSidebarOpened(!isSidebarOpened)}
                isOpened={isSidebarOpened}
              />
              <div className={styles.rightBottomSide}>
                {choosenSection !== 'activity' && choosenSection !== 'offers' && <NormalFilterSection />}
                {choosenSection === 'offers' && <OffersFilterSection />}
                <TagsWrapper choosenSection={choosenSection} />
                {tokens && tokens.length > 0 && (
                  <div>
                    {choosenSection !== 'activity' && choosenSection !== 'offers' && (
                      <InfiniteScroll
                        className={cn(styles.tokensGrid, {
                          [styles.tokensGridSmall]: tokensGridScale === 'small',
                          [styles.tokensGridLarge]: tokensGridScale === 'large',
                        })}
                        dataLength={30}
                        next={handleGetTokens}
                        hasMore={true}
                      >
                        {tokensGridScale === 'large' &&
                          tokens.map(({ name, category, status, price, collection, owner, fileName, id }) => (
                            <SquareNFTCard
                              category={category}
                              collection={collection}
                              fileName={fileName}
                              id={id}
                              key={id}
                              name={name}
                              owner={owner}
                              price={price}
                              status={status}
                            />
                          ))}
                        {tokensGridScale === 'small' &&
                          tokens.map(({ name, category, status, price, collection, owner, fileName, id }) => (
                            <SmallNFTCard
                              category={category}
                              collection={collection}
                              fileName={fileName}
                              id={id}
                              key={id}
                              name={name}
                              owner={owner}
                              price={price}
                              status={status}
                            />
                          ))}
                      </InfiniteScroll>
                    )}
                    {choosenSection === 'activity' && (
                      <InfiniteScroll
                        dataLength={30}
                        next={handleGetTokens}
                        hasMore={true}
                      >
                        <div className={styles.activitiesHead}>
                          <div className={styles.eventType} />
                          <div className={styles.itemInfo}>
                            <span>Item</span>
                          </div>
                          <div className={styles.priceInfo}>
                            <span>Price</span>
                          </div>
                          <div className={styles.quantity}>
                            <span>Quantity</span>
                          </div>
                          <div className={styles.from}>
                            <span>From</span>
                          </div>
                          <div className={styles.to}>
                            <span>To</span>
                          </div>
                          <div className={styles.time}>
                            <span>Time</span>
                          </div>
                        </div>
                        {adaptedActivities[0] &&
                          adaptedActivities[0].eventType &&
                          adaptedActivities.map(
                            ({ id, userFrom, userTo, price, eventType, quantity, item, usdPrice, date }) => (
                              <div className={styles.activityRow} key={id}>
                                <div className={styles.eventType}>
                                  {eventType === 'listings' && (
                                    <Image src="/activity/Icon-List.svg" alt="list" width={19} height={19} />
                                  )}
                                  {eventType === 'sales' && (
                                    <Image src="/activity/Icon-Sale.svg" alt="list" width={19} height={19} />
                                  )}
                                  {eventType === 'bids' && (
                                    <Image src="/activity/Icon-Minted.svg" alt="list" width={19} height={19} />
                                  )}
                                  {eventType === 'transfers' && (
                                    <Image src="/activity/Icon-Offer.svg" alt="list" width={19} height={19} />
                                  )}
                                  <span>{eventType[0].toUpperCase() + eventType.substring(1)}</span>
                                </div>
                                <div className={styles.itemInfo}>
                                  <div className={styles.activityImageWrapper}>
                                    <Image
                                      src={item.fileName}
                                      loader={({ src }) => `${process.env.BACKEND_ASSETS_URL}/nftMedia/${src}`}
                                      alt="nft-prewiev"
                                      layout="fill"
                                    />
                                  </div>
                                  <div className={styles.itemInfoName}>
                                    <span>{item.name}</span>
                                    <span>{item.collection.name}</span>
                                  </div>
                                </div>
                                <div className={styles.priceInfo}>
                                  <span className={styles.currency}>
                                    <Image
                                      src={item.blockchainType.icon}
                                      loader={({ src }) => `${process.env.BACKEND_ASSETS_URL}/icons/${src}`}
                                      alt="blockchain"
                                      width={19}
                                      height={19}
                                    />
                                    {price}
                                  </span>
                                  <span className={styles.usdPrice}>${usdPrice}</span>
                                </div>
                                <div className={styles.quantity}>
                                  <span>{quantity}</span>
                                </div>
                                <div className={styles.from}>
                                  <span>
                                    {userFrom.publicAddress === publicAddress
                                      ? 'you'
                                      : userFrom.name
                                      ? userFrom.name
                                      : userFrom.publicAddress}
                                  </span>
                                </div>
                                <div className={styles.to}>
                                  <span>
                                    {userTo?.publicAddress === publicAddress
                                      ? 'you'
                                      : userTo?.name
                                      ? userTo?.name
                                      : userTo?.publicAddress}
                                  </span>
                                </div>
                                <div className={styles.time}>
                                  <span>{date}</span>
                                  <Image src="/activity/Icon-FullSc.svg" alt="fullscreen" width={19} height={19} />
                                </div>
                              </div>
                            )
                          )}
                      </InfiniteScroll>
                    )}
                  </div>
                )}
                {!tokens ||
                  (tokens.length === 0 && (
                    <div className={styles.emptyTokens}>
                      <Image src="/profile/Icon-Empty.svg" height={156} width={160} alt="no-items" />
                      <span>No Items to display</span>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </>
      ))}
    </div>
  );
};
