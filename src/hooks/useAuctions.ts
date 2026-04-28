import { useEffect, useState } from "react";
import { fetchAuctions } from "../api/auctionApis";

export interface Auction {
  image: any;
  id: number;
  title: string;
  description: string;
  currentPrice: number;
  endTime: string;
  status: string;
  imageUrl?: string | null;
}

export default function useAuctions() {

  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAuctions()
      .then((data) => {
        setAuctions(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Auction fetch failed", err);
        setLoading(false);
      });
  }, []);

  return { auctions, loading };
}