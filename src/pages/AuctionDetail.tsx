import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { fetchAuctionById, placeBid } from "../api/auctionApis";
import { useAuctionWebSocket } from "../hooks/useAuctionWebSocket";

import { AuctionDetailDto } from "../dto/AuctionUpdateDto";

export default function AuctionDetail() {

  const { id } = useParams();
  const auctionId = id ? Number(id) : null;

  const { updates, connected, error } = useAuctionWebSocket(auctionId);

  const [auction, setAuction] = useState<AuctionDetailDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [bidAmount, setBidAmount] = useState("");

  // Fetch initial auction
  useEffect(() => {
    if (!auctionId) return;

    const loadAuction = async () => {
      try {
        setLoading(true);
        const data = await fetchAuctionById(auctionId);
        setAuction(data);
      } catch (err) {
        console.error("Auction fetch failed", err);
      } finally {
        setLoading(false);
      }
    };

    loadAuction();
  }, [auctionId]);

  // Apply websocket updates
  useEffect(() => {
    if (!auction || updates.length === 0) return;

    const latest = updates[updates.length - 1];

    setAuction((prev) =>
      prev
        ? {
            ...prev,
            currentPrice: Number(latest.currentPrice),
          }
        : prev
    );
  }, [updates]);

  const handlePlaceBid = async () => {
    if (!auctionId) return;

    const amount = parseFloat(bidAmount);

    if (!amount || isNaN(amount)) {
      alert("Enter a valid bid amount");
      return;
    }

    try {
      await placeBid(auctionId, amount);
      setBidAmount("");
    } catch (err: any) {
      alert(err.response?.data?.error || "Bid failed");
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading auction...</div>;
  }

  if (!auction) {
    return <div className="text-center py-10">Auction not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-8">

      <h1 className="text-3xl font-bold mb-4">
        {auction.title}
      </h1>

      <p className="text-gray-600 mb-6">
        {auction.description}
      </p>

      <div className="grid md:grid-cols-2 gap-8 mb-8">

        <div>
          <p className="text-xl">
            Current Price:
            <span className="text-3xl font-bold text-green-600 ml-2">
              ₹{auction.currentPrice}
            </span>
          </p>

          <p className="mt-2 text-sm text-gray-500">
            Ends at: {new Date(auction.endTime).toLocaleString()}
          </p>
        </div>

        <div>
          <p>
            Connection: {connected ? "🟢 Live" : "🔴 Disconnected"}
          </p>

          {error && (
            <p className="text-red-500">{error}</p>
          )}
        </div>

      </div>

      {/* Bid Section */}

      <div className="flex items-center gap-4 mb-8">

        <input
          type="number"
          step="0.01"
          value={bidAmount}
          onChange={(e) => setBidAmount(e.target.value)}
          placeholder="Enter bid amount"
          className="border p-3 rounded w-64"
        />

        <button
          onClick={handlePlaceBid}
          className="bg-blue-600 text-white px-8 py-3 rounded hover:bg-blue-700"
        >
          Place Bid
        </button>

      </div>

      {/* Live Activity */}

      {updates.length > 0 && (
        <div className="mt-8">

          <h2 className="text-xl font-semibold mb-4">
            Live Activity
          </h2>

          <ul className="space-y-3 max-h-60 overflow-y-auto">

            {updates.map((update, i) => (
              <li key={i} className="bg-gray-50 p-4 rounded border">

                <strong>₹{update.latestBid?.amount}</strong>
                {" "}by{" "}
                <strong>{update.latestBid?.bidderUsername}</strong>

                <span className="text-sm text-gray-500 ml-4">
                  {new Date(update.latestBid?.bidTime || "").toLocaleTimeString()}
                </span>

              </li>
            ))}

          </ul>

        </div>
      )}

    </div>
  );
}
