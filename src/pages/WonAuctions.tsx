import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchWonAuctions } from "../api/profileApis";

interface WonAuction {
  auctionId: number;
  title: string;
  imageUrl?: string;
  winningAmount: number;
  endTime: string;
  sellerUsername: string;
}

export default function WonAuctions() {
  const [auctions, setAuctions] = useState<WonAuction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Won Auctions - YesAuction";
    fetchWonAuctions()
      .then(setAuctions)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const getImageSrc = (imageUrl?: string) => {
    if (!imageUrl) return "/placeholder.png";
    if (imageUrl.startsWith("http")) return imageUrl;
    return `http://localhost:8081/uploads/${imageUrl}`;
  };

  if (loading) {
    return <div className="text-center py-20">Loading your won auctions...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">
        Won Auctions ({auctions.length})
      </h1>

      {auctions.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl shadow">
          <p className="text-2xl text-gray-400 mb-4">You haven't won any auctions yet</p>
          <Link to="/auctions" className="text-blue-600 hover:underline text-lg">
            Browse Auctions →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {auctions.map((item) => (
            <Link
              key={item.auctionId}
              to={`/auction/${item.auctionId}`}
              className="bg-white rounded-xl shadow hover:shadow-lg transition p-5 block"
            >
              <img
                src={getImageSrc(item.imageUrl)}
                alt={item.title}
                className="h-40 w-full object-cover rounded-lg mb-4"
              />
              <h3 className="font-semibold text-lg mb-1 line-clamp-2">{item.title}</h3>
              <p className="text-green-600 font-bold text-lg mb-1">
                Won at ₹ {item.winningAmount}
              </p>
              <p className="text-sm text-gray-500">
                Seller: {item.sellerUsername}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Ended: {new Date(item.endTime).toLocaleString()}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}