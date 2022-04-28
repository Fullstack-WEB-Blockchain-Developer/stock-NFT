import { useState, useEffect, useCallback } from "react";
//next
import Image from "next/image";
//redux
import { useSelector, useDispatch } from "react-redux";
import { setField } from "../../../../redux/slices/userDataSlice";
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
  const [choosenSection, setChoosenSection] = useState("collected");
  const [isSidebarOpened, setIsSidebarOpened] = useState(true);
  const [tokens, setTokens] = useState([]);

  const { readyFilterOption, tokensGridScale, selectedStatuses, selectedCollections, selectedPrice } =
    useSelector((state) => state.profileFiltration);
  const { userData } = useSelector((state) => state);

  const getTokens = useCallback(async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const { sortOrder, sortBy } = readyFilterOption;

      let url = `${process.env.BACKEND_URL}/users/account/assets?offset=${tokens.length}&limit=30&tab=${choosenSection}&sortOrder=${sortOrder}&sortBy=${sortBy}`;
      url = constructUrl(url, selectedStatuses, selectedCollections, selectedPrice);

      const {
        data: { data, createdNfts, ownedNfts, favoritedNfts, totalValue },
      } = await axios.get(`${url}`, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });

      if (userData.ownedNfts === 0) {
        dispatch(setField({ field: "createdNfts", value: createdNfts }));
        dispatch(setField({ field: "favoritedNfts", value: favoritedNfts }));
        dispatch(setField({ field: "ownedNfts", value: ownedNfts }));
        dispatch(setField({ field: "totalValue", value: totalValue }));
      }

      return data;
    } catch (e) {
      dispatch(
        openError(e.response?.data ? `${e.response.data.statusCode} ${e.response.data.message}` : e.message)
      );
    }
  }, [
    choosenSection,
    dispatch,
    readyFilterOption,
    selectedCollections,
    selectedStatuses,
    selectedPrice,
    userData.ownedNfts,
  ]);

  useEffect(() => {
    getTokens().then((result) => setTokens(prev => [...prev, result]));
  }, [getTokens]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.chooseSectionWrapper}>
        {chooseSections.map(({ text, icon, nameForBE, forRedux }) => (
          <div
            className={cn(styles.chooseSection, {
              [styles.chooseSectionActive]: choosenSection === nameForBE,
            })}
            onClick={() => setChoosenSection(nameForBE)}
            key={text}
          >
            {icon}
            <span>
              {text}
              {nameForBE !== "activity" && nameForBE !== "offers" && `(${userData[forRedux]})`}
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
                  <div
                    className={cn(styles.tokensGrid, {
                      [styles.tokensGridSmall]: tokensGridScale === "small",
                      [styles.tokensGridLarge]: tokensGridScale === "large",
                    })}
                  >
                    <InfiniteScroll
                      dataLength={30} //This is important field to render the next data
                      next={getTokens}
                      hasMore={true}
                      loader={<h4>Loading...</h4>}
                      endMessage={
                        <p style={{ textAlign: "center", color: 'white' }}>
                          <b>Yay! You have seen it all</b>
                        </p>
                      }
                      // below props only if you need pull down functionality
                      refreshFunction={this.refresh}
                      pullDownToRefresh
                      pullDownToRefreshThreshold={50}
                      pullDownToRefreshContent={
                        <h3 style={{ textAlign: "center", color: 'white' }}>&#8595; Pull down to refresh</h3>
                      }
                      releaseToRefreshContent={
                        <h3 style={{ textAlign: "center", color: 'white' }}>&#8593; Release to refresh</h3>
                      }
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
