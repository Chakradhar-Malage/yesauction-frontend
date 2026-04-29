import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  fetchAuctionById,
  placeBid,
  fetchBidHistory,
} from "../api/auctionApis";
import { useAuctionWebSocket } from "../hooks/useAuctionWebSocket";
import useCountdown from "../hooks/useCountdown";

import { Bid } from "../types/Bid";
import { Auction } from "../types/Auction";
import { BidUpdate } from "../dto/AuctionUpdateDto";

export default function AuctionDetailPage() {
  const { id } = useParams();
  const auctionId = id ? Number(id) : null;

  const [auction, setAuction] = useState<Auction | null>(null);
  const [loading, setLoading] = useState(true);
  const [bidAmount, setBidAmount] = useState("");
  const [bidHistory, setBidHistory] = useState<Bid[]>([]);

  const { updates, connected, error } = useAuctionWebSocket(auctionId);

  const timeLeft = useCountdown(auction?.endTime);
  const auctionEnded = auction ? new Date(auction.endTime) < new Date() : false;

  /*
  ---------------------------
  FETCH AUCTION DATA
  ---------------------------
  */

  useEffect(() => {
    if (!auctionId) return;

    const loadAuction = async () => {
      try {
        setLoading(true);

        const data = await fetchAuctionById(auctionId);
        setAuction(data);

        const bids = await fetchBidHistory(auctionId);
        setBidHistory(bids);
      } catch (err) {
        console.error("Failed to load auction", err);
      } finally {
        setLoading(false);
      }
    };

    loadAuction();
  }, [auctionId]);

  /*
  ---------------------------
  WEBSOCKET PRICE UPDATE
  ---------------------------
  */

  useEffect(() => {
    if (!auction || updates.length === 0) return;

    const latest = updates[updates.length - 1];

    setAuction((prev) =>
      prev ? { ...prev, currentPrice: Number(latest.amount) } : prev,
    );

    setBidHistory((prev) => [
      ...prev,
      {
        amount: Number(latest.amount),
        bidderUsername: latest.bidderUsername,
        bidTime: latest.bidTime,
      },
    ]);
  }, [updates]);

  /*
  ---------------------------
  PLACE BID
  ---------------------------
  */

  const handlePlaceBid = async () => {
    if (!auctionId || !auction) return;

    const amount = parseFloat(bidAmount);

    const minBid = Number(auction.currentPrice) * 1.05;

    if (!amount || isNaN(amount) || amount < minBid) {
      alert(`Enter a valid bid amount (minimum ₹${minBid.toFixed(2)})`);
      return;
    }

    try {
      await placeBid(auctionId, amount);

      setBidAmount("");
    } catch (err: any) {
      alert(err?.response?.data?.error || "Bid failed");
    }
  };

  /*
  ---------------------------
  LOADING STATES
  ---------------------------
  */

  if (loading)
    return <div className="text-center py-20">Loading auction...</div>;

  if (!auction)
    return <div className="text-center py-20">Auction not found</div>;

  /*
  ---------------------------
  UI
  ---------------------------
  */

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="grid md:grid-cols-2 gap-10">
        {/* IMAGE */}

        <div className="h-96 bg-gray-200 rounded-xl flex items-center justify-center">
          <img
            src={
              auction.imageUrl
                ? `http://localhost:8081/uploads/${auction.imageUrl}`
                : "/placeholder.png"
            }
            alt={auction.title}
            className="h-80 w-full object-cover rounded-xl mb-4"
          />
          {/* <span className="text-gray-500">Auction Image</span> */}
        </div>

        {/* DETAILS */}

        <div>
          <h1 className="text-3xl font-bold mb-4">{auction.title}</h1>

          <p className="text-gray-600 mb-6">{auction.description}</p>

          <div className="bg-gray-100 p-6 rounded-xl mb-6">
            <p className="text-lg">Starting Price: ₹{auction.startingPrice}</p>

            <p className="text-3xl font-bold text-green-600">
              ₹{auction.currentPrice}
            </p>

            <p className="text-red-500 font-semibold">⏳ {timeLeft}</p>

            <p className="text-sm text-gray-500">
              Network: {connected ? "🟢 Connected" : "🔴 Disconnected"}
            </p>

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>

          {/* BID INPUT */}

          <div className="flex gap-4 mb-8">
            <input
              type="number"
              step="0.01"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              placeholder="Enter your bid"
              className="border p-3 rounded-lg flex-1"
            />

            <button
              onClick={handlePlaceBid}
              disabled={auctionEnded || !bidAmount}
              className={`px-6 py-3 rounded-lg text-white
              ${
                auctionEnded
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {auctionEnded ? "Auction Ended" : "Place Bid"}
            </button>
          </div>
        </div>
      </div>

      {/* BID HISTORY */}

      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">Bid History</h2>

        <div className="space-y-2 max-h-80 overflow-y-auto">
          {bidHistory
            .slice()
            .reverse()
            .map((bid, index) => (
              <div
                key={index}
                className="flex justify-between bg-gray-100 p-3 rounded"
              >
                <span>{bid.bidderUsername}</span>

                <span className="font-bold">₹{bid.amount}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
