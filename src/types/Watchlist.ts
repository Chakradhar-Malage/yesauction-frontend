export interface WatchlistItem {
  watchlistId: number;
  auctionId: number;
  title: string;
  imageUrl?: string;
  currentPrice: number;
  endTime: string;
  status: string;
  addedAt: string;
}
