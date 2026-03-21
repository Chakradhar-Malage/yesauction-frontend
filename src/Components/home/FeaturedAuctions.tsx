import { useEffect, useState } from "react";
import useAuctions from "../../hooks/useAuctions";
import AuctionCard from "../Auction/auctionCard";
import { Link } from "react-router-dom";

export default function FeaturedAuctions() {
  const { auctions, loading } = useAuctions();
  const activeAuctions = auctions.filter(
    (auction) => auction.status === "ACTIVE",
  );
  const [isGuest, setIsGuest] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsGuest(!token);
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20 text-lg font-semibold">
        Loading auctions...
      </div>
    );
  }

  // const visibleAuctions = auctions.slice(0, 3);
  const lockedAuctions = auctions.slice(0, 3);

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold mb-10 text-center">
        Featured Auctions
      </h2>

      {/* If logged in show ALL auctions */}
      {!isGuest && (
        <div className="grid md:grid-cols-3 gap-8">
          {activeAuctions.map((auction) => (
            <AuctionCard
              key={auction.id}
              id={auction.id}
              title={auction.title}
              description={auction.description}
              currentPrice={auction.currentPrice}
              endTime={auction.endTime}
            />
          ))}
        </div>
      )}

      {/* Locked Auctions (only for guests) */}
      {isGuest && lockedAuctions.length > 0 && (
        <div className="relative mt-16">
          {/* Blurred Auctions */}
          <div className="grid md:grid-cols-3 gap-8 blur-sm pointer-events-none">
            {lockedAuctions.map((auction) => (
              <AuctionCard
                key={auction.id}
                title={auction.title}
                description={auction.description}
                currentPrice={String(auction.currentPrice)}
                endTime={auction.endTime}
                id={0}
              />
            ))}
          </div>

          {/* Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/70 backdrop-blur-sm rounded-xl">
            <div className="text-5xl mb-4">🔒</div>

            <h3 className="text-2xl font-bold mb-3">Unlock All Auctions</h3>

            <p className="text-gray-600 mb-6 text-center max-w-md">
              Create a free account to view and participate in all live
              auctions.
            </p>

            <div className="flex gap-4">
              <Link
                to="/login"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
