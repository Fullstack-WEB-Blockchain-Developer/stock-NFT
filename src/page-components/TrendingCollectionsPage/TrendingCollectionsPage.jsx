import { useState, useEffect } from 'react';
//next
import Image from 'next/image';
//components
import { Selects } from './components/Selects/Selects';
import { CollectionRow } from './components/CollectionRow/CollectionRow';
//utils
import { getFilteredCollections } from './TrendingCollections.utils';
//styles
import styles from './TrendingCollectionsPage.module.scss';

export const TrendingCollectionsPage = ({ blockchains, categories }) => {
  const [filter, setFilter] = useState({ duration: 'Last 7 days', category: 'All Categories', chain: 'Ethereum' });
  const [collectionsFiltered, setCollectionsFiltered] = useState([]);

  useEffect(() => {
    const blockchainTypeId = blockchains.find(({ name }) => name === filter.chain).id;
    const categoryId = categories.find(({ name }) => name === filter.category)?.id;

    getFilteredCollections(filter.duration, categoryId, blockchainTypeId).then((result) => {
      setCollectionsFiltered([...result]);
    });
  }, [filter.duration, filter.category, filter.chain, blockchains, categories]);

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
        {collectionsFiltered.length > 0 ? (
          collectionsFiltered.map(
            (
              {
                collection_id,
                collection_logoImage,
                collection_name,
                floorPrice,
                items,
                last24h,
                last7d,
                owners,
                total_value,
              },
              index
            ) => (
              <CollectionRow
                floorPrice={floorPrice}
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
      </div>
    </div>
  );
};
