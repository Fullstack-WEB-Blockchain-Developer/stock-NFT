import { useState, useEffect, useCallback } from "react";
//next
import Image from "next/image";
//redux
import { useSelector, useDispatch } from "react-redux";
import { getTokens, setData, clearOffsetAndTokens } from "../../../../redux/slices/profileFiltrationSlice";
import { open as openError } from "../../../../redux/slices/errorSnackbarSlice";
//axios
import axios from "axios";
//classnames
import cn from "classnames";
//infivite-scroll
import InfiniteScroll from "react-infinite-scroll-component";
//components
import { Sidebar } from "../Sidebar/Sidebar";
import { NormalFilterSection } from "./components/NormalFilterSection/NormalFilterSection";
import { OffersFilterSection } from "./components/OffersFilterSection/OffersFilterSection";
import { TagsWrapper } from "./components/TagsWrapper/TagsWrapper";
import { SquareNFTCard } from "../../../../components/SquareNFTCard/SquareNFTCard";
import { SmallNFTCard } from "../../../../components/SmallNFTCard/SmallNFTCard";
//utils
import { chooseSections, constructUrl } from "./ContentWrapper.utils";
//styles
import styles from "./ContentWrapper.module.scss";

export const ContentWrapper = () => {
  const dispatch = useDispatch();
  const [isSidebarOpened, setIsSidebarOpened] = useState(true);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  //const [tokens, setTokens] = useState([]);

  const {
    choosenSection,
    tokens,
    readyFilterOption,
    tokensGridScale,
    selectedStatuses,
    selectedCollections,
    selectedPrice,
  } = useSelector((state) => state.profileFiltration);
  const filtrationOptions = useSelector((state) => state.profileFiltration);

  const handleGetTokens = useCallback(() => {
    dispatch(getTokens(choosenSection));
  }, [choosenSection, dispatch]);

  useEffect(() => {
    dispatch(clearOffsetAndTokens())
    handleGetTokens();
  }, [choosenSection]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.chooseSectionWrapper}>
        {chooseSections.map(({ text, icon, nameForBE, forRedux }) => (
          <div
            className={cn(styles.chooseSection, {
              [styles.chooseSectionActive]: choosenSection === nameForBE,
            })}
            onClick={() => dispatch(setData({ field: "choosenSection", data: nameForBE }))}
            key={text}
          >
            {icon}
            <span>
              {text}
              {nameForBE !== "activity" && nameForBE !== "offers" && `(${filtrationOptions[forRedux]})`}
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
                {choosenSection !== "Activity" && choosenSection !== "Offers" && <NormalFilterSection />}
                {choosenSection === "Offers" && <OffersFilterSection />}
                <TagsWrapper choosenSection={choosenSection} />
                {tokens && tokens.length > 0 && (
                  <div>
                    <InfiniteScroll
                      className={cn(styles.tokensGrid, {
                        [styles.tokensGridSmall]: tokensGridScale === "small",
                        [styles.tokensGridLarge]: tokensGridScale === "large",
                      })}
                      dataLength={30}
                      next={handleGetTokens}
                      hasMore={true}
                    >
                      {choosenSection !== "Activity" &&
                        choosenSection !== "Offers" &&
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
                      {choosenSection !== "Activity" &&
                        choosenSection !== "Offers" &&
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
                    </InfiniteScroll>
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
