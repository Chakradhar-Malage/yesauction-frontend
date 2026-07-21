import { useEffect } from "react";
import { useWatchlist } from "../hooks/useWatchlist";
import { Link } from "react-router-dom";
import AuctionCard from "../Components/Auction/auctionCard";

export default function Watchlist() {
  const { watchlist, loading } = useWatchlist();

  useEffect(() => {
    document.title = "My Watchlist - YesAuction";
  }, []);

  if (loading) {
    return <div className="text-center py-20 text-lg">Loading your watchlist...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Watchlist ({watchlist.length})</h1>
      </div>

      {watchlist.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl shadow">
          <p className="text-2xl text-gray-400 mb-4">Your watchlist is empty</p>
          <Link 
            to="/auctions" 
            className="text-blue-600 hover:underline text-lg"
          >
            Browse Auctions →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {watchlist.map((item) => (
            <AuctionCard 
              key={item.watchlistId}
              id={item.auctionId}
              title={item.title}
              description="" 
              currentPrice={item.currentPrice}
              endTime={item.endTime}
              imageUrl={item.imageUrl}
              isWatched={true} // Since it's in the watchlist
            />
          ))}
        </div>
      )}
    </div>
  );
}