import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { fetchAuctionById, placeBid } from "../../api/auctionApis";
import { useAuctionWebSocket } from "../../hooks/useAuctionWebSocket";
import useCountdown from "../../hooks/useCountdown";

import { AuctionDetailDto } from "../../dto/AuctionUpdateDto";

export default function AuctionDetail() {

const { id } = useParams();
const auctionId = id ? Number(id) : null;

const { updates, connected, error } = useAuctionWebSocket(auctionId);

const [auction, setAuction] = useState<AuctionDetailDto | null>(null);
const [loading, setLoading] = useState(true);
const [bidAmount, setBidAmount] = useState("");

// Fetch auction initially
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

    setAuction(prev =>
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
return <div className="text-center py-20">Loading auction...</div>;
}

if (!auction) {
return <div className="text-center py-20">Auction not found</div>;
}

const timeLeft = useCountdown(auction.endTime);

return ( 
    <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-2 gap-10">

            {/* IMAGE */}
            <div className="h-96 bg-gray-200 rounded-xl"></div>

            {/* INFO */}
            <div>

            <h1 className="text-3xl font-bold mb-4">
                {auction.title}
            </h1>

            <p className="text-gray-600 mb-6">
                {auction.description}
            </p>

            <div className="bg-gray-100 p-6 rounded-xl mb-6">

                <p className="text-lg">
                Starting Price: ₹{auction.startingPrice}
                </p>

                <p className="text-3xl font-bold text-green-600">
                ₹{auction.currentPrice}
                </p>

                <p className="text-red-500 font-semibold">
                ⏳ {timeLeft}
                </p>

                <p className="text-sm text-gray-500">
                WebSocket: {connected ? "🟢 Connected" : "🔴 Disconnected"}
                </p>

                {error && (
                <p className="text-red-500 text-sm mt-2">
                    {error}
                </p>
                )}

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
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                >
                Place Bid
                </button>

            </div>

            {/* LIVE ACTIVITY */}
            {updates.length > 0 && (

                <div>

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

        </div>

    </div>
    );
}
