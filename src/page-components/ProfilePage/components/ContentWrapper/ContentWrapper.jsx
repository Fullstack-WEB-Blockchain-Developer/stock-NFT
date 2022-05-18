import { useState, useEffect, useCallback } from 'react';
//next
import Image from 'next/image';
//redux
import { useSelector, useDispatch } from 'react-redux';
import { getItems, setData, clearOffsetAndItems, clearError } from '../../../../redux/slices/profileFiltrationSlice';
import { open as openError } from '../../../../redux/slices/errorSnackbarSlice';
import { getAllCategories } from 'src/redux/slices/generalDataSlice';
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
import { chooseSections, adaptActivities, adaptOffers } from './ContentWrapper.utils';
//styles
import styles from './ContentWrapper.module.scss';
import { OffersPopup } from './components/OffersPopup/OffersPopup';
import { CustButton } from 'src/components/CustButton/CustButton';
import { AcceptOfferModal } from 'src/modals/AcceptOfferModal/AcceptOfferModal';

export const ContentWrapper = () => {
  const dispatch = useDispatch();
  const [isOffersPopupOpened, setIsOffersPopupOpened] = useState(false);
  const [acceptOfferInfo, setAcceptOfferInfo] = useState({
    collection: '',
    id: 0,
    isOpened: false,
    price: 0,
    tokenFileName: '',
  });
  const [account, setAccount] = useState('');
  const [isSidebarOpened, setIsSidebarOpened] = useState(true);
  const [publicAddress, setPublicAddress] = useState('');
  const [adaptedActivities, setAdaptedActivities] = useState([]);
  const [adaptedOffers, setAdaptedOffers] = useState([]);

  const { choosenSection, items, itemsGridScale, error } = useSelector((state) => state.profileFiltration);
  const filtrationOptions = useSelector((state) => state.profileFiltration);

  useEffect(() => {
    const address = localStorage.getItem('account');
    setPublicAddress(address);
  }, []);
  console.log('---items', items);

  const handleGetItems = useCallback(() => {
    dispatch(getItems());
    setIsOffersPopupOpened(false);
  }, [dispatch]);

  const handleOpenAccept = ({ collection, id, tokenFileName, price }) => {
    setAcceptOfferInfo({ collection, id, tokenFileName, price, isOpened: true });
  };

  useEffect(() => {
    const account = localStorage.getItem('account');
    setAccount(account);
  }, []);

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

  useEffect(() => {
    dispatch(clearOffsetAndItems());
    handleGetItems();
  }, [choosenSection, dispatch, handleGetItems]);
  console.log('---acceptOfferInfo', acceptOfferInfo);
  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  useEffect(() => {
    if (choosenSection === 'activity') {
      adaptActivities(items).then((res) => setAdaptedActivities(res));
    }
  }, [items, choosenSection]);

  useEffect(() => {
    if (choosenSection === 'offersReceived' || choosenSection === 'offersMade') {
      adaptOffers(items).then((res) => setAdaptedOffers(res));
    }
  }, [items, choosenSection]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.chooseSectionWrapper}>
        {chooseSections.map(({ text, icon, nameForBE, forRedux }) => (
          <>
            {nameForBE !== 'offers' ? (
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
                  {nameForBE !== 'activity' && `(${filtrationOptions[forRedux]})`}
                </span>
              </div>
            ) : (
              <>
                <div
                  className={cn(styles.chooseSection, {
                    [styles.chooseSectionActive]:
                      choosenSection === 'offersReceived' || choosenSection === 'offersMade',
                  })}
                  onClick={() => setIsOffersPopupOpened(true)}
                  key={text}
                >
                  {icon}
                  <span>{text}</span>
                  {isOffersPopupOpened && (
                    <OffersPopup className={styles.offersPopup} setIsOffersPopupOpened={setIsOffersPopupOpened} />
                  )}
                </div>
              </>
            )}
          </>
        ))}
      </div>
      {chooseSections.map(({ nameForBE, isOffers }) => (
        <>
          {isOffers && (choosenSection === 'offersMade' || choosenSection === 'offersReceived') && (
            <div key={nameForBE} className={styles.bottomSideWrapper}>
              <Sidebar
                choosenTopSection={choosenSection}
                handleToggleSidebar={() => setIsSidebarOpened(!isSidebarOpened)}
                isOpened={isSidebarOpened}
              />
              <div className={styles.rightBottomSide}>
                <OffersFilterSection />
                <TagsWrapper choosenSection={choosenSection} />
                {items && adaptedOffers.length > 0 && adaptedOffers[0].nft && (
                  <div className={styles.offersWrapper}>
                    <div className={styles.offersTitle}>
                      <Image src="/view-token/Icon-Offers.svg" alt="offers-icon" width={19} height={19} />
                      <span>{choosenSection === 'offersReceived' ? 'Offers received' : 'Offers made'}</span>
                    </div>
                    <div className={styles.offersLegend}>
                      <div className={styles.offerItemColumn}>
                        <span>Items</span>
                      </div>
                      {['Price', 'USD Price', 'Expiration'].map((elem) => (
                        <div key={elem} className={styles.offer9PercentColumn}>
                          <span>{elem}</span>
                        </div>
                      ))}
                      <div className={styles.offer9PercentColumn}>
                        <span>{choosenSection === 'offersMade' ? 'To' : 'From'}</span>
                      </div>
                      <div className={styles.offerButtonColumn} />
                    </div>
                    {adaptedOffers.length > 0 &&
                      adaptedOffers.map(({ buyer, expirationDate, id, nft, price, seller, usdPrice }) => (
                        <div key={id} className={styles.offerWrapper}>
                          <div className={styles.offerItemColumn}>
                            <div className={styles.offerItemImageWrapper}>
                              <Image
                                src={nft.fileName}
                                loader={({ src }) => `${process.env.BACKEND_ASSETS_URL}/nftMedia/${src}`}
                                layout="fill"
                                alt={nft.name}
                              />
                            </div>
                            <div className={styles.offerItemInfoWrapper}>
                              <span className={styles.nftCollection}>{nft.collection.name}</span>
                              <span className={styles.nftName}>{nft.name}</span>
                            </div>
                          </div>
                          <div className={cn(styles.offer9PercentColumn, styles.offerPrice)}>
                            <span>{price}</span>
                          </div>
                          <div className={cn(styles.offer9PercentColumn, styles.offerPrice)}>
                            <span>${usdPrice}</span>
                          </div>
                          <div className={cn(styles.offer9PercentColumn, styles.offerExpiration)}>
                            <span>{expirationDate}</span>
                          </div>
                          <div className={cn(styles.offer9PercentColumn, styles.offerUser)}>
                            {choosenSection === 'offersMade' && (
                              <span>
                                {buyer?.username
                                  ? buyer?.publicAddress === account
                                    ? 'you'
                                    : buyer.username
                                  : `${buyer?.publicAddress.substring(0, 6)}...${buyer?.publicAddress.substring(
                                      buyer?.publicAddress.length - 6
                                    )}`}
                              </span>
                            )}
                            {choosenSection === 'offersReceived' && (
                              <span>
                                {seller?.username
                                  ? seller?.publicAddress === account
                                    ? 'you'
                                    : seller.username
                                  : `${seller?.publicAddress.substring(0, 6)}...${seller?.publicAddress.substring(
                                      seller?.publicAddress.length - 6
                                    )}`}
                              </span>
                            )}
                          </div>
                          <div className={styles.offerButtonColumn}>
                            {choosenSection === 'offersReceived' && (
                              <CustButton
                                color="ghost"
                                text="Accept"
                                onClick={() =>
                                  handleOpenAccept({
                                    collection: nft.collection.name,
                                    id,
                                    price,
                                    tokenFileName: nft.fileName,
                                  })
                                }
                                className={styles.offerButton}
                              />
                            )}
                            {choosenSection === 'offersMade' && (
                              <CustButton
                                color="ghost"
                                text="Cancel"
                                onClick={() => {}}
                                className={styles.offerButton}
                              />
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                )}
                {(!items || items.length === 0) && (
                  <div className={styles.emptyItems}>
                    <Image src="/profile/Icon-Empty.svg" height={156} width={160} alt="no-items" />
                    <span>No Items to display</span>
                  </div>
                )}
              </div>
            </div>
          )}
          {choosenSection === nameForBE && (
            <div key={nameForBE} className={styles.bottomSideWrapper}>
              <Sidebar
                choosenTopSection={choosenSection}
                handleToggleSidebar={() => setIsSidebarOpened(!isSidebarOpened)}
                isOpened={isSidebarOpened}
              />
              <div className={styles.rightBottomSide}>
                {choosenSection !== 'activity' && choosenSection !== 'offers' && <NormalFilterSection />}
                <TagsWrapper choosenSection={choosenSection} />
                {items && items.length > 0 && (
                  <div>
                    {choosenSection !== 'activity' && choosenSection !== 'offers' && (
                      <InfiniteScroll
                        className={cn(styles.itemsGrid, {
                          [styles.itemsGridSmall]: itemsGridScale === 'small',
                          [styles.itemsGridLarge]: itemsGridScale === 'large',
                        })}
                        dataLength={30}
                        next={handleGetItems}
                        hasMore={true}
                      >
                        {itemsGridScale === 'large' &&
                          items.map(
                            ({ name, category, blockchainType, status, price, collection, owner, fileName, id }) => (
                              <SquareNFTCard
                                blockchainType={blockchainType}
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
                            )
                          )}
                        {itemsGridScale === 'small' &&
                          items.map(
                            ({ name, category, blockchainType, status, price, collection, owner, fileName, id }) => (
                              <SmallNFTCard
                                blockchainType={blockchainType}
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
                            )
                          )}
                      </InfiniteScroll>
                    )}
                    {choosenSection === 'activity' && (
                      <InfiniteScroll dataLength={30} next={handleGetItems} hasMore={true}>
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
                        {adaptedActivities &&
                          adaptedActivities[0] &&
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
                {!items ||
                  (items.length === 0 && (
                    <div className={styles.emptyItems}>
                      <Image src="/profile/Icon-Empty.svg" height={156} width={160} alt="no-items" />
                      <span>No Items to display</span>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </>
      ))}
      <AcceptOfferModal
        {...acceptOfferInfo}
        handleClose={() => setAcceptOfferInfo({ ...acceptOfferInfo, isOpened: false })}
      />
    </div>
  );
};
