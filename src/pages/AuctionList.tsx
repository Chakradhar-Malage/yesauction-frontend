import { useEffect, useState } from "react";
import AuctionCard from "../Components/Auction/auctionCard";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  fetchAuctions,
  fetchAuctionsByCategory,
} from "../api/auctionApis";

interface Auction {
  id: number;
  title: string;
  description: string;
  currentPrice: number;
  endTime: string;
  status: string;
  category: string;
  imageUrl?: string | null;
}

export default function AuctionList() {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const category = searchParams.get("category");

  const token = localStorage.getItem("token");
  const isGuest = !token;

  useEffect(() => {
    const loadAuctions = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = category
          ? await fetchAuctionsByCategory(category)
          : await fetchAuctions();

        setAuctions(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load auctions. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadAuctions();
  }, [category]);

  // Limit auctions for guest users
  const visibleAuctions = isGuest
    ? auctions.slice(0, 3)
    : auctions;

  if (loading) {
    return (
      <div className="text-center py-20 text-lg font-semibold">
        Loading auctions...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-500 font-semibold">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 flex gap-8">
      
      {/* LEFT FILTER PANEL */}
      <div className="w-64 bg-white shadow-md rounded-xl p-5">
        <h2 className="font-bold text-lg mb-4">Filters</h2>

        <p className="mb-2 font-medium">Category</p>
        <ul className="space-y-2">
          {["Watches", "Jewelry", "Gaming", "Art", "Real Estate"].map(
            (cat) => (
              <li
                key={cat}
                className={`cursor-pointer hover:text-blue-500 ${
                  category === cat ? "text-blue-600 font-semibold" : ""
                }`}
                onClick={() =>
                  navigate(`/auctions?category=${cat}`)
                }
              >
                {cat}
              </li>
            )
          )}
        </ul>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1">
        <h1 className="text-4xl font-bold mb-6">
          {category ? `${category} Auctions` : "Live Auctions"}
        </h1>

        {/* Guest Notice */}
        {isGuest && auctions.length > 3 && (
          <p className="mb-4 text-sm text-gray-500">
            Showing limited auctions. Login to see all.
          </p>
        )}

        {/* Empty State */}
        {visibleAuctions.length === 0 ? (
          <p className="text-gray-500">No auctions found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleAuctions.map((auction) => (
              <AuctionCard key={auction.id} {...auction} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}