export interface User {
  id: number;
  username: string;
  email: string;
  roles: string[];                    // ← changed to array
  mobileNumberVerified?: boolean;
  createdAt?: string | null;
  totalAuctionsCreated?: number;
  totalBidsPlaced?: number;
}