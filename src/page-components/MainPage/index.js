import { Collections } from "./Collections/Collections";
import { HottestNFTCollectibles } from "./HottestNFTCollectibles/HottestNFTCollectibles";
import { TrendingNFTs } from "./TrendingNFTs/TrendingNFTs";
import { WeCanConnectWith } from "./WeCanConnectWith/WeCanConnectWith";
import { SpecialAuctionNFTs } from "./SpecialAuctionNFTs/SpecialAuctionNFTs";

export const MainPage = () => {
  return (
    <>
      <HottestNFTCollectibles />
      <TrendingNFTs />
      <WeCanConnectWith />
      <Collections />
      <SpecialAuctionNFTs />
    </>
  );
};
