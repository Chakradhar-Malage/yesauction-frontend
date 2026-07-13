export interface Notification {
  id: number;
  title?: string;
  message: string;
  type: 'BID_PLACED' | 'OUTBID' | 'AUCTION_WON' | 'AUCTION_ENDED' | 'SYSTEM';
  read: boolean;
  link?: string;
  createdAt: string;
}

export interface UnreadCountResponse {
  unreadCount: number;
}