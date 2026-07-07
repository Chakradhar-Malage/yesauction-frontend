export interface Notification {
  id: number;
  userId: number;
  title?: string;
  message: string;
  type: "BID" | "AUCTION_END" | "AUCTION_WON" | "SYSTEM" | "WATCHLIST";
  isRead: boolean;
  createdAt: string;
  link?: string; // e.g. "/auctions/123"
  metadata?: any; // extra data like auctionId, bidAmount etc.
}

export interface NotificationsResponse {
  notifications: Notification[];
  unreadCount: number;
  total: number;
}
