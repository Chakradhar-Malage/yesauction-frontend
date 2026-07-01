import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Crown, Clock, Users, TrendingUp } from "lucide-react";

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

  // Fetch initial data
  useEffect(() => {
    if (!auctionId) return;

    const loadAuction = async () => {
      try {
        setLoading(true);
        const [auctionData, bids] = await Promise.all([
          fetchAuctionById(auctionId),
          fetchBidHistory(auctionId),
        ]);

        setAuction(auctionData);
        setBidHistory(bids);
      } catch (err) {
        console.error("Failed to load auction", err);
      } finally {
        setLoading(false);
      }
    };

    loadAuction();
  }, [auctionId]);

  // WebSocket updates
  useEffect(() => {
    if (!auction || updates.length === 0) return;

    const latest = updates[updates.length - 1];

    setAuction((prev) =>
      prev ? { ...prev, currentPrice: Number(latest.amount) } : prev
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

  const handlePlaceBid = async () => {
    if (!auctionId || !auction) return;

    const amount = parseFloat(bidAmount);
    const minBid = Number(auction.currentPrice) * 1.05;

    if (!amount || isNaN(amount) || amount < minBid) {
      alert(`Minimum bid is ₹${minBid.toFixed(2)}`);
      return;
    }

    try {
      await placeBid(auctionId, amount);
      setBidAmount("");
    } catch (err: any) {
      alert(err?.response?.data?.error || "Failed to place bid");
    }
  };

  if (loading) return <div className="text-center py-20 text-xl">Loading auction...</div>;
  if (!auction) return <div className="text-center py-20 text-xl">Auction not found</div>;

  const highestBid = bidHistory[bidHistory.length - 1];

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Left: Image */}
        <div className="relative group">
          <div className="aspect-square bg-gray-100 rounded-3xl overflow-hidden shadow-xl">
            <img
              src={
                auction.imageUrl
                  ? `http://localhost:8081/uploads/${auction.imageUrl}`
                  : "/placeholder.png"
              }
              alt={auction.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>

        {/* Right: Details */}
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">{auction.title}</h1>
            <p className="text-gray-600 leading-relaxed">{auction.description}</p>
          </div>

          {/* Price Card - Highlighted with Crown */}
          <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm relative overflow-hidden">
            <div className="absolute top-6 right-6">
              <div className="flex items-center gap-1.5 bg-amber-100 text-amber-700 px-4 py-1.5 rounded-2xl text-sm font-semibold">
                <Crown className="w-5 h-5" />
                Highest Bid
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm text-gray-500">Current Highest Bid</p>
              <p className="text-6xl font-bold text-gray-900 tracking-tighter">
                ₹{auction.currentPrice.toLocaleString()}
              </p>

              {highestBid && (
                <p className="text-gray-600 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  by <span className="font-semibold">{highestBid.bidderUsername}</span>
                </p>
              )}

              <div className="flex items-center gap-3 text-lg font-medium text-gray-700 pt-4 border-t">
                <Clock className="w-5 h-5 text-orange-500" />
                <span className={auctionEnded ? "text-red-600" : ""}>
                  {auctionEnded ? "Auction Ended" : timeLeft}
                </span>
              </div>
            </div>

            <div className="mt-6 text-sm text-gray-500 flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full ${connected ? "bg-green-500" : "bg-red-500"}`}
              />
              {connected ? "Live • Connected" : "Disconnected"}
            </div>
          </div>

          {/* Bid Input */}
          <div className="bg-white border border-gray-200 rounded-3xl p-8">
            <div className="flex gap-4">
              <input
                type="number"
                step="0.01"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                placeholder="Your bid amount"
                className="flex-1 border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-2xl px-6 py-4 text-lg outline-none transition-all"
                disabled={auctionEnded}
              />

              <button
                onClick={handlePlaceBid}
                disabled={auctionEnded || !bidAmount}
                className={`px-10 py-4 rounded-2xl font-semibold text-lg transition-all flex-shrink-0
                  ${
                    auctionEnded
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30 active:scale-95"
                  }`}
              >
                {auctionEnded ? "Auction Closed" : "Place Bid"}
              </button>
            </div>

            <p className="text-sm text-gray-500 mt-3">
              Minimum next bid: ₹
              {(Number(auction.currentPrice) * 1.05).toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* Bid History */}
      <div className="mt-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <Users className="w-6 h-6" />
            Bid History
          </h2>
          <span className="text-sm text-gray-500">
            {bidHistory.length} bids
          </span>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
          <div className="max-h-[420px] overflow-y-auto">
            {bidHistory.length === 0 ? (
              <p className="text-center py-12 text-gray-500">No bids yet</p>
            ) : (
              bidHistory
                .slice()
                .reverse()
                .map((bid, index) => {
                  const isHighest = index === 0;
                  return (
                    <div
                      key={index}
                      className={`flex justify-between items-center px-8 py-5 border-b last:border-b-0 transition-all
                        ${isHighest ? "bg-amber-50 border-amber-100" : "hover:bg-gray-50"}`}
                    >
                      <div className="flex items-center gap-4">
                        {isHighest && <Crown className="w-5 h-5 text-amber-600" />}
                        <div>
                          <p className="font-medium">{bid.bidderUsername}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(bid.bidTime).toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className={`text-xl font-bold ${isHighest ? "text-amber-600" : "text-gray-900"}`}>
                          ₹{bid.amount.toLocaleString()}
                        </p>
                        {isHighest && (
                          <p className="text-[10px] uppercase tracking-widest text-amber-600 font-semibold">LEADING</p>
                        )}
                      </div>
                    </div>
                  );
                })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}