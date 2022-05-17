import { useState, useEffect } from 'react';
//redux
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteFromArray,
  deleteFromArrayOfObjects,
  deletePrice,
  deleteAll,
  clearOffsetAndItems,
  getItems,
} from '../../../../../../redux/slices/profileFiltrationSlice';
//components
import { Tag } from './components/Tag';
import { PriceTag } from './components/PriceTag';
//utils
import { getAvailableSections } from './TagsWrapper.utils';
//styles
import styles from './TagsWrapper.module.scss';

export const TagsWrapper = ({ choosenSection }) => {
  const [isClearAll, setIsClearAll] = useState(false);
  const [displayedSections, setDisplayedSections] = useState(getAvailableSections(choosenSection));
  const dispatch = useDispatch();
  const { selectedStatuses, selectedPrice, selectedCollections, selectedChains, selectedOnSaleIn, selectedEventTypes } =
    useSelector((state) => state.profileFiltration);
  useEffect(() => {
    if (
      (displayedSections.includes('status') && selectedStatuses.length > 0) ||
      (displayedSections.includes('eventType') && selectedEventTypes.length > 0) ||
      (displayedSections.includes('price') && selectedPrice.min) ||
      (displayedSections.includes('collections') && selectedCollections.rows.length > 0) ||
      (displayedSections.includes('chains') && selectedChains.length > 0) ||
      (displayedSections.includes('onSaleIn') && selectedOnSaleIn.rows.length > 0)
    ) {
      setIsClearAll(true);
    } else {
      setIsClearAll(false);
    }
  }, [
    displayedSections,
    selectedChains,
    selectedCollections,
    selectedEventTypes,
    selectedOnSaleIn,
    selectedPrice,
    selectedStatuses,
  ]);

  const handleClose = (callback) => {
    dispatch(clearOffsetAndItems());
    dispatch(callback());
    dispatch(getItems());
  };

  return (
    <div className={styles.wrapper}>
      {displayedSections.includes('status') &&
        selectedStatuses.map(({ text, name }, i) => (
          <Tag
            key={`${name}-${i}`}
            text={text}
            handleClose={() =>
              handleClose(() =>
                deleteFromArrayOfObjects({ field: 'selectedStatuses', objectField: 'name', data: name })
              )
            }
          />
        ))}
      {displayedSections.includes('eventType') &&
        selectedEventTypes.map(({ text, name }, i) => (
          <Tag
            key={`${name}-${i}`}
            text={text}
            handleClose={() =>
              handleClose(() =>
                deleteFromArrayOfObjects({ field: 'selectedEventTypes', objectField: 'name', data: name })
              )
            }
          />
        ))}
      {displayedSections.includes('chains') &&
        selectedChains.map(({ name, icon }, i) => (
          <Tag
            key={`${name}-${i}`}
            text={name}
            icon={icon}
            handleClose={() =>
              handleClose(() => deleteFromArrayOfObjects({ field: 'selectedChains', objectField: 'name', data: name }))
            }
          />
        ))}
      {selectedPrice.min && (
        <PriceTag
          key="price-tag"
          currency={selectedPrice.currency}
          min={selectedPrice.min}
          max={selectedPrice.max}
          handleClose={() => handleClose(() => deletePrice())}
        />
      )}
      {displayedSections.includes('collections') &&
        selectedCollections.rows.map(({ name, icon }, i) => (
          <Tag
            key={`${name}-${i}`}
            text={name}
            icon={icon}
            handleClose={() =>
              handleClose(() =>
                deleteFromArrayOfObjects({
                  field: 'selectedCollections',
                  objectField: 'name',
                  data: { rows: name },
                })
              )
            }
          />
        ))}
      {displayedSections.includes('onSaleIn') &&
        selectedOnSaleIn.rows.map((elem, i) => (
          <Tag
            key={`${elem}-${i}`}
            text={elem}
            handleClose={() =>
              handleClose(() =>
                deleteFromArray({ field: 'selectedOnSaleIn', data: { ...selectedOnSaleIn, rows: elem } })
              )
            }
          />
        ))}
      {isClearAll && (
        <div className={styles.clearAll}>
          <span onClick={() => handleClose(() => deleteAll())}>Clear All</span>
        </div>
      )}
    </div>
  );
};
