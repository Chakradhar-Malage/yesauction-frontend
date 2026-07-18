import { useState, useEffect, useCallback } from "react";
import { watchlistApi } from "../api/watchlistApis";
import { WatchlistItem } from "../types/Watchlist";

export const useWatchlist = () => {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchWatchlist = useCallback(async () => {
    try {
      setLoading(true);
      const res = await watchlistApi.getWatchlist();
      setWatchlist(res.data);
    } catch (err) {
      console.error("Failed to fetch watchlist", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const toggleWatchlist = async (auctionId: number, isCurrentlyWatched: boolean) => {
    try {
      if (isCurrentlyWatched) {
        await watchlistApi.removeFromWatchlist(auctionId);
        setWatchlist(prev => prev.filter(item => item.auctionId !== auctionId));
      } else {
        await watchlistApi.addToWatchlist(auctionId);
        // Refresh full list to get full details
        fetchWatchlist();
      }
    } catch (err) {
      console.error("Failed to toggle watchlist", err);
    }
  };

  useEffect(() => {
    fetchWatchlist();
  }, [fetchWatchlist]);

  return {
    watchlist,
    loading,
    toggleWatchlist,
    fetchWatchlist,
  };
};