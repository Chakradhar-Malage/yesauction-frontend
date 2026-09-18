export interface User {
  id: number;
  username: string;
  email: string;
  roles: string[];                    
  mobileNumberVerified?: boolean;
  createdAt?: string | null;
  totalAuctionsCreated?: number;
  totalBidsPlaced?: number;
}