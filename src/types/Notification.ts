export interface Notification {
  id: number;
  title?: string;
  message: string;
  type: 'BID_PLACED' | 'OUTBID' | 'AUCTION_WON' | 'AUCTION_ENDED' | 'SYSTEM';
  isRead: boolean;
  link?: string;
  createdAt: string;
}

export interface UnreadCountResponse {
  unreadCount: number;
}