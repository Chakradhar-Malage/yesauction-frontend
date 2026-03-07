export interface BidUpdate {
  amount: string;          // BigDecimal serializes to string in JSON by default
  bidderUsername: string;
  bidTime: string;         // ISO date string
}

export interface AuctionUpdateDto {
  auctionId: number;
  currentPrice: string;
  latestBid?: BidUpdate;
}

export interface AuctionDetailDto {
  id: number;
  title: string;
  description: string;
  currentPrice: number;
  startingPrice: number;
  endTime: string;
}