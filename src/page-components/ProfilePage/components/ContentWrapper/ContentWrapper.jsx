import { useState, useEffect, useCallback } from "react";
//next
import Image from "next/image";
//redux
import { useSelector } from "react-redux";
//axios
import axios from "axios";
//classnames
import cn from "classnames";
//components
import { Sidebar } from "../Sidebar/Sidebar";
import { NormalFilterSection } from "./components/NormalFilterSection/NormalFilterSection";
import { OffersFilterSection } from "./components/OffersFilterSection/OffersFilterSection";
import { TagsWrapper } from "./components/TagsWrapper/TagsWrapper";
import { SquareNFTCard } from "../../../../components/SquareNFTCard/SquareNFTCard";
import { SmallNFTCard } from "../../../../components/SmallNFTCard/SmallNFTCard";
//utils & helpers
import { chooseSections, fakeActivities } from "./ContentWrapper.utils";
import { getDateAgo } from "../../../../helpers/getDateAgo";
import { getEtherPrice } from "../../../../utils";
//styles
import styles from "./ContentWrapper.module.scss";

export const ContentWrapper = () => {
  const [choosenSection, setChoosenSection] = useState("activity");
  const [isSidebarOpened, setIsSidebarOpened] = useState(true);
  const [tokens, setTokens] = useState(fakeActivities);

  const { readyFilterOption, tokensGridScale } = useSelector((state) => state.profileFiltration);

  //later it should be changed to icons, not nftMedia
  const imageLoader = ({ src }) => `${process.env.BACKEND_ASSETS_URL}/nftMedia/${src}`;

  // const getTokens = useCallback(async () => {
  //   const accessToken = localStorage.getItem("accessToken");
  //   const { sortOrder, sortBy } = readyFilterOption;

  //   const {
  //     data: { data },
  //   } = await axios.get(
  //     `${process.env.BACKEND_URL}/users/account/assets?tab=${choosenSection}&sortOrder=${sortOrder}&sortBy=${sortBy}`,
  //     {
  //       headers: {
  //         Authorization: "Bearer " + accessToken,
  //       },
  //     }
  //   );
  //     console.log('---data', data)
  //   return data;
  // }, [choosenSection, readyFilterOption]);

  // useEffect(() => {
  //   getTokens().then((result) => setTokens(result));
  // }, [getTokens]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.chooseSectionWrapper}>
        {chooseSections.map(({ text, icon, nameForBE }) => (
          <div
            className={cn(styles.chooseSection, {
              [styles.chooseSectionActive]: choosenSection === nameForBE,
            })}
            onClick={() => setChoosenSection(nameForBE)}
            key={text}
          >
            {icon}
            <span>{text}</span>
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
                {choosenSection !== "activity" && choosenSection !== "offers" && <NormalFilterSection />}
                {choosenSection === "offers" && <OffersFilterSection />}
                <TagsWrapper choosenSection={choosenSection} />
                {choosenSection !== "activity" && tokens && tokens.length > 0 && (
                  <div
                    className={cn(styles.tokensGrid, {
                      [styles.tokensGridSmall]: tokensGridScale === "small",
                      [styles.tokensGridLarge]: tokensGridScale === "large",
                    })}
                  >
                    {choosenSection !== "offers" &&
                      tokensGridScale === "large" &&
                      tokens.map(({ name, category, status, price, collection, owner, fileName, id }) => (
                        <SquareNFTCard
                          key={id}
                          name={name}
                          category={category}
                          status={status}
                          price={price}
                          owner={owner}
                          fileName={fileName}
                          collection={collection}
                        />
                      ))}
                    {choosenSection !== "offers" &&
                      tokensGridScale === "small" &&
                      tokens.map(({ name, category, status, price, collection, owner, fileName, id }) => (
                        <SmallNFTCard
                          key={id}
                          name={name}
                          category={category}
                          status={status}
                          price={price}
                          owner={owner}
                          fileName={fileName}
                          collection={collection}
                        />
                      ))}
                  </div>
                )}
                {choosenSection === "activity" && tokens && tokens.length > 0 && (
                  <div className={styles.activitiesWrapper}>
                    <div className={styles.activitiesHead}>
                      <div className={styles.actionColumn} />
                      <div className={styles.itemColumn}>
                        <span>Item</span>
                      </div>
                      <div className={styles.priceColumn}>
                        <span>Price</span>
                      </div>
                      <div className={styles.quantityColumn}>
                        <span>Quantity</span>
                      </div>
                      <div className={styles.fromColumn}>
                        <span>From</span>
                      </div>
                      <div className={styles.toColumn}>
                        <span>To</span>
                      </div>
                      <div className={styles.timeColumn}>
                        <span>Time</span>
                      </div>
                    </div>
                    {fakeActivities.map(({ buyer, seller, id, nft, action, quantity, date }) => (
                      <div className={styles.activityRow} key={id}>
                        <div className={cn(styles.actionColumn, styles.activity)}>
                          <Image
                            src={action.icon}
                            loader={imageLoader}
                            alt={action.name}
                            width={19}
                            height={19}
                          />
                          <span>{action.name}</span>
                        </div>
                        <div className={cn(styles.itemColumn, styles.item)}>
                          <div className={styles.itemDisplayFlex}>
                            <div className={styles.itemImageWrapper}>
                              <Image
                                src={nft.fileName}
                                alt="token-preview"
                                layout="fill"
                                loader={imageLoader}
                              />
                            </div>
                            <div className={styles.tokenInfoWrapper}>
                              <div className={styles.activityRowCollectionName}>
                                <span>{nft.collection.name}</span>
                              </div>
                              <div>
                                <span>{nft.name}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className={cn(styles.activityRowPriceWrapper, styles.priceColumn)}>
                          {nft.price ? (
                            <>
                              <div className={styles.activityRowEthPriceWrapper}>
                                <Image
                                  src={nft.price.currency.icon}
                                  alt={`${nft.price.currency}-icon`}
                                  loader={imageLoader}
                                  width={19}
                                  height={19}
                                />
                                <span>{nft.price.amount}</span>
                              </div>
                              <div className={styles.activityRowUsdPrice}>
                                {getEtherPrice().then(result => result * nft.price.amount)}
                              </div>
                            </>
                          ) : (
                            <span>———</span>
                          )}
                        </div>
                        <div className={styles.quantityColumn}>
                          <span>Quantity</span>
                        </div>
                        <div className={styles.fromColumn}>
                          <span>From</span>
                        </div>
                        <div className={styles.toColumn}>
                          <span>To</span>
                        </div>
                        <div className={styles.timeColumn}>
                          <span>Time</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {(!tokens || tokens.length === 0) && (
                  <div className={styles.emptyTokens}>
                    <Image src="/profile/Icon-Empty.svg" height={156} width={160} alt="no-items" />
                    <span>No Items to display</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      ))}
    </div>
  );
};
