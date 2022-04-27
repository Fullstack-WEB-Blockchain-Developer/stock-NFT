import { useState, useEffect, useCallback } from "react";
//next
import Image from "next/image";
//redux
import { useSelector, useDispatch } from "react-redux";
import { setField } from "../../../../redux/slices/userDataSlice";
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
//utils
import { chooseSections } from "./ContentWrapper.utils";
//styles
import styles from "./ContentWrapper.module.scss";

export const ContentWrapper = () => {
  const dispatch = useDispatch();
  const [choosenSection, setChoosenSection] = useState("collected");
  const [isSidebarOpened, setIsSidebarOpened] = useState(true);
  const [tokens, setTokens] = useState([]);

  const { readyFilterOption, tokensGridScale } = useSelector((state) => state.profileFiltration);
  const { userData } = useSelector((state) => state);

  const getTokens = useCallback(async () => {
    const accessToken = localStorage.getItem("accessToken");
    const { sortOrder, sortBy } = readyFilterOption;

    const {
      data: { data, createdNfts, ownedNfts, favoritedNfts, totalValue },
    } = await axios.get(
      `${process.env.BACKEND_URL}/users/account/assets?tab=${choosenSection}&sortOrder=${sortOrder}&sortBy=${sortBy}`,
      {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    );
    dispatch(setField({ field: "createdNfts", value: createdNfts }));
    dispatch(setField({ field: "ownedNfts", value: ownedNfts }));
    dispatch(setField({ field: "favoritedNfts", value: favoritedNfts }));
    dispatch(setField({ field: "totalValue", value: totalValue }));

    return data;
  }, [choosenSection, readyFilterOption, dispatch]);

  useEffect(() => {
    getTokens().then((result) => setTokens(result));
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
              {text}{nameForBE !== 'activity' && nameForBE !== 'offers' && `(${userData[forRedux]})`}
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
