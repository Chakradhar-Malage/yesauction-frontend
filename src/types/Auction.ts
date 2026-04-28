export interface Auction {
  id: number;
  title: string;
  description: string;
  currentPrice: number;
  startingPrice: number;
  endTime: string;
  category: string;
  imageUrl?: string | null;
}