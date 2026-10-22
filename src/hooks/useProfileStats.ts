import { useWatchlist } from "./useWatchlist";
import { useSellerStats } from "./useSellerStats";
import { useWonAuctionsCount } from "./useWonAuctionsCount";
import { User } from "../types/User";

export function useProfileStats(user: User) {
  const { count: wonAuctions, loading: wonLoading } = useWonAuctionsCount();
  const { watchlist, loading: watchlistLoading } = useWatchlist();
  const { stats: seller, loading: sellerLoading } = useSellerStats();

  return {
    loading: wonLoading || watchlistLoading || sellerLoading,
    myAuctions: user.totalAuctionsCreated ?? 0,
    bidsPlaced: user.totalBidsPlaced ?? 0,
    wonAuctions,
    watchlist: watchlist?.length ?? 0,
    seller, // SellerStats | null
  };
}

export type ProfileStatsData = ReturnType<typeof useProfileStats>;