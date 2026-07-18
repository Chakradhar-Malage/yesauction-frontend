import axiosClient from "./axiosClient";
import { WatchlistItem } from "../types/Watchlist";

export const watchlistApi = {
  getWatchlist: () => 
    axiosClient.get<WatchlistItem[]>("/watchlist"),

  addToWatchlist: (auctionId: number) => 
    axiosClient.post(`/watchlist/${auctionId}`),

  removeFromWatchlist: (auctionId: number) => 
    axiosClient.delete(`/watchlist/${auctionId}`),

  checkWatchlistStatus: (auctionId: number) => 
    axiosClient.get<boolean>(`/watchlist/${auctionId}/status`),
};