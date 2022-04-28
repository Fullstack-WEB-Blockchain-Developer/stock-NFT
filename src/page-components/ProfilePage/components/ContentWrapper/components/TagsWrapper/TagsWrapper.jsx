import { useState, useEffect } from "react";
//redux
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFromArray,
  deleteFromArrayOfObjects,
  deletePrice,
  deleteAll,
} from "../../../../../../redux/slices/profileFiltrationSlice";
//components
import { Tag } from "./components/Tag";
import { PriceTag } from "./components/PriceTag";
//utils
import { getAvailableSections } from "./TagsWrapper.utils";
//styles
import styles from "./TagsWrapper.module.scss";

export const TagsWrapper = ({ choosenSection }) => {
  const [isClearAll, setIsClearAll] = useState(false);
  const [displayedSections, setDisplayedSections] = useState(getAvailableSections(choosenSection));
  const dispatch = useDispatch();
  const { selectedStatuses, selectedPrice, selectedCollections, selectedChains, selectedOnSaleIn } =
    useSelector((state) => state.profileFiltration);

  useEffect(() => {
    if (
      (displayedSections.includes("status") && selectedStatuses.length > 0) ||
      (displayedSections.includes("price") && selectedPrice.min) ||
      (displayedSections.includes("collections") && selectedCollections.rows.length > 0) ||
      (displayedSections.includes("chains") && selectedChains.length > 0) ||
      (displayedSections.includes("onSaleIn") && selectedOnSaleIn.rows.length > 0)
    ) {
      setIsClearAll(true);
    } else {
      setIsClearAll(false);
    }
  }, [
    displayedSections,
    selectedStatuses,
    selectedPrice,
    selectedCollections,
    selectedChains,
    selectedOnSaleIn,
  ]);

  return (
    <div className={styles.wrapper}>
      {displayedSections.includes("status") &&
        selectedStatuses.map(({ text, name }, i) => (
          <Tag
            key={`${name}-${i}`}
            text={text}
            handleClose={() =>
              dispatch(
                deleteFromArrayOfObjects({ field: "selectedStatuses", objectField: "name", data: name })
              )
            }
          />
        ))}
      {displayedSections.includes("chains") &&
        selectedChains.map(({ name, icon }, i) => (
          <Tag
            key={`${name}-${i}`}
            text={name}
            icon={icon}
            handleClose={() =>
              dispatch(deleteFromArrayOfObjects({ field: "selectedChains", objectField: "name", data: name }))
            }
          />
        ))}
      {selectedPrice.min && (
        <PriceTag
          key="price-tag"
          currency={selectedPrice.currency}
          min={selectedPrice.min}
          max={selectedPrice.max}
          handleClose={() => dispatch(deletePrice())}
        />
      )}
      {displayedSections.includes("collections") &&
        selectedCollections.rows.map(({ name, icon }, i) => (
          <Tag
            key={`${name}-${i}`}
            text={name}
            icon={icon}
            handleClose={() =>
              dispatch(
                deleteFromArrayOfObjects({
                  field: "selectedCollections",
                  objectField: "name",
                  data: { rows: name },
                })
              )
            }
          />
        ))}
      {displayedSections.includes("onSaleIn") &&
        selectedOnSaleIn.rows.map((elem, i) => (
          <Tag
            key={`${elem}-${i}`}
            text={elem}
            handleClose={() =>
              dispatch(
                deleteFromArray({ field: "selectedOnSaleIn", data: { ...selectedOnSaleIn, rows: elem } })
              )
            }
          />
        ))}
      {isClearAll && (
        <div className={styles.clearAll}>
          <span onClick={() => dispatch(deleteAll())}>Clear All</span>
        </div>
      )}
    </div>
  );
};
