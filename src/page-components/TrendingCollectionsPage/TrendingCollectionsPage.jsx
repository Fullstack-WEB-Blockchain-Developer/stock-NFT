import { useState, useEffect } from 'react';
//next
import Image from 'next/image';
//redux
import { useDispatch } from 'react-redux';
import { open as openError } from 'src/redux/slices/errorSnackbarSlice';
//classnames
import cn from 'classnames';
//components
import { Selects } from './components/Selects/Selects';
import { CollectionRow } from './components/CollectionRow/CollectionRow';
//utils
import { getFilteredCollections } from './TrendingCollections.utils';
//styles
import styles from './TrendingCollectionsPage.module.scss';

export const TrendingCollectionsPage = ({ blockchains, categories }) => {
  const dispatch = useDispatch();

  const [filter, setFilter] = useState({ duration: 'Last 7 days', category: 'All Categories', chain: 'Ethereum' });
  const [collectionsFiltered, setCollectionsFiltered] = useState([]);
  const [collectionsQuantity, setCollectionsQuantity] = useState(0);
  const [paginationButtons, setPaginationButtons] = useState([]);
  const [choosenPagination, setChoosenPagination] = useState(0);
  const [offset, setOffset] = useState(0);
console.log('---collectionsFiltered', collectionsFiltered)
  const handlePagination = (index) => {
    setChoosenPagination(index);
    const thisOffset = index > 0 ? index * 100 : index;
    setOffset(index > 0 ? index * 100 : index);
    const blockchainTypeId = blockchains.find(({ name }) => name === filter.chain).id;
    const categoryId = categories.find(({ name }) => name === filter.category)?.id;

    getFilteredCollections(filter.duration, categoryId, blockchainTypeId, thisOffset)
      .then(({ data, quantity }) => {
        quantity !== collectionsQuantity && setChoosenPagination(0);
        setCollectionsFiltered(data.length > 0 ? [...data] : null);
        setCollectionsQuantity(quantity);

        const pages = Math.ceil(quantity / 100);
        const newPaginationButtons = new Array(pages).fill({}, 0).map((elem, index) => {
          const start = index === 0 ? 1 : index * 100;
          const end = quantity < 100 ? quantity : quantity < (index + 1) * 100 ? quantity : (index + 1) * 100;

          return { start, end };
        });

        setPaginationButtons(newPaginationButtons);
      })
      .catch((error) => {
        dispatch(
          openError(
            error.response?.data ? `${error.response.data.statusCode} ${error.response.data.message}` : error.message
          )
        );
      });
  };

  useEffect(() => {
    setOffset(0);
    const blockchainTypeId = blockchains.find(({ name }) => name === filter.chain).id;
    const categoryId = categories.find(({ name }) => name === filter.category)?.id;

    getFilteredCollections(filter.duration, categoryId, blockchainTypeId, 0)
      .then(({ data, quantity }) => {
        quantity !== collectionsQuantity && setChoosenPagination(0);
        setCollectionsFiltered(data.length > 0 ? [...data] : null);
        setCollectionsQuantity(quantity);

        const pages = Math.ceil(quantity / 100);
        const newPaginationButtons = new Array(pages).fill({}, 0).map((elem, index) => {
          const start = index === 0 ? 1 : index * 100;
          const end = quantity < 100 ? quantity : quantity < (index + 1) * 100 ? quantity : (index + 1) * 100;

          return { start, end };
        });

        setPaginationButtons(newPaginationButtons);
      })
      .catch((error) => {
        dispatch(
          openError(
            error.response?.data ? `${error.response.data.statusCode} ${error.response.data.message}` : error.message
          )
        );
      });
  }, [filter.duration, filter.category, filter.chain, blockchains, categories, dispatch, collectionsQuantity]);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentWrapper}>
        <div className={styles.pageTitle}>
          <span>Trending Collections</span>
        </div>
        <div className={styles.pageDescription}>
          <span>The top NFTs on Stoke, ranked by volume, floor price and other statistics.</span>
        </div>
        <div className={styles.selectsWrapper}>
          <Selects filter={filter} setFilter={setFilter} blockchains={blockchains} categories={categories} />
        </div>
        <div className={styles.tableHead}>
          <div className={styles.collectionName}>
            <span>Collection</span>
          </div>
          {['Volume', '24h %', '7d %', 'Floor Price', 'Owners', 'Items'].map((elem) => (
            <div className={styles.notCollectionName} key={elem}>
              <span>{elem}</span>
            </div>
          ))}
        </div>
        {collectionsFiltered ? (
          collectionsFiltered.map(
            (
              {
                blockchainType_id,
                collection_id,
                collection_logoImage,
                collection_name,
                floor_price,
                items,
                last24h,
                last7d,
                owners,
                total_value,
              },
              index
            ) => (
              <CollectionRow
                blockchainTypeIcon={blockchainType_id && blockchains.find(({ id }) => id === blockchainType_id).icon}
                floorPrice={floor_price}
                id={collection_id}
                items={items}
                key={collection_id}
                last24h={last24h}
                last7d={last7d}
                logo={collection_logoImage}
                name={collection_name}
                number={index + 1}
                owners={owners}
                volume={total_value}
              />
            )
          )
        ) : (
          <div className={styles.empty}>
            <Image src="/profile/Icon-Empty.svg" height={156} width={160} alt="no-items" />
            <span>No collections to display</span>
          </div>
        )}
        <div className={styles.paginationContainer}>
          <div className={styles.paginationButtons}>
            {paginationButtons.map(({ start, end }, index) => (
              <div
                key={start}
                className={cn(styles.paginationButton, {
                  [styles.choosenPagination]: index === choosenPagination,
                })}
                onClick={() => handlePagination(index)}
              >
                {start} - {end}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
