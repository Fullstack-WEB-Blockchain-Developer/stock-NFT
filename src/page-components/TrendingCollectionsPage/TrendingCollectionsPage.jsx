import { useState, useEffect } from 'react';
//next
import Image from 'next/image';
//components
import { Selects } from './components/Selects/Selects';
//styles
import styles from './TrendingCollectionsPage.module.scss';

export const TrendingCollectionsPage = ({ blockchains, categories }) => {
  const [filter, setFilter] = useState({ duration: 'Last 7 days', category: 'All Categories', chain: 'Ethereum' });

  useEffect(() => {}, [filter.duration, filter.category, filter.chain]);

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
      </div>
    </div>
  );
};
