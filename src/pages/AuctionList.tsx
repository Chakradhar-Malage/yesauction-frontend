import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import AuctionCard from "../Components/Auction/auctionCard";

interface Auction {
  id: number;
  title: string;
  description: string;
  currentPrice: number;
  endTime: string;
}

export default function AuctionList() {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const isGuest = !token;

  useEffect(() => {
    axiosClient.get("/auctions").then((res) => {
      setAuctions(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20 text-lg font-semibold">
        Loading auctions...
      </div>
    );
  }

  const visibleAuctions = isGuest ? auctions.slice(0, 3) : auctions;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      <h1 className="text-4xl font-bold text-center mb-10">
        Live Auctions
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {visibleAuctions.map((auction) => (
          <AuctionCard key={auction.id} {...auction} />
        ))}

      </div>

    </div>
  );
}