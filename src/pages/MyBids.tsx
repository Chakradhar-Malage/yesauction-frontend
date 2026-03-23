import { useMyBids } from "../hooks/useMyBids";
import { Link } from "react-router-dom";


type Bid = {
  bidId: number;
  auctionId: number;
  auctionTitle: string;
  amount: number;
  bidTime: string;
  currentAuctionPrice: number;
};

const MyBids = () => {
  const { bids, loading } = useMyBids();

  if (loading) {
    return (
      <p className="text-center mt-10 text-lg font-semibold">
        Loading your bids...
      </p>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-8">My Bids</h1>

      {bids.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">
            You haven't placed any bids yet.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {bids.map((bid: Bid) => {
            const isWinning =
              bid.amount >= bid.currentAuctionPrice;

            const isEnded = false; // temporary

            return (
              <div
                key={bid.bidId}
                className="bg-white p-6 rounded-xl shadow flex flex-col md:flex-row md:justify-between md:items-center gap-4"
              >
                {/* LEFT */}
                <div>
                  <h2 className="text-lg font-semibold">
                    {bid.auctionTitle}
                  </h2>

                  <p className="text-gray-500 text-sm">
                    Bid Time:{" "}
                    {new Date(bid.bidTime).toLocaleString()}
                  </p>
                </div>

                {/* YOUR BID */}
                <div>
                  <p className="text-sm text-gray-500">
                    Your Bid
                  </p>
                  <p className="font-bold text-blue-600">
                    ₹ {bid.amount}
                  </p>
                </div>

                {/* CURRENT PRICE */}
                <div>
                  <p className="text-sm text-gray-500">
                    Current Price
                  </p>
                  <p className="font-bold text-green-600">
                    ₹ {bid.currentAuctionPrice}
                  </p>
                </div>

                {/* STATUS */}
                <div>
                  {isEnded ? (
                    <span className="px-3 py-1 text-sm bg-gray-300 rounded">
                      Ended
                    </span>
                  ) : isWinning ? (
                    <span className="px-3 py-1 text-sm bg-green-500 text-white rounded">
                      Winning
                    </span>
                  ) : (
                    <span className="px-3 py-1 text-sm bg-red-500 text-white rounded">
                      Outbid
                    </span>
                  )}
                </div>

                <Link
                  to={`/auction/${bid.auctionId}`} // singular, matches route
                  className="bg-blue-600 text-white px-4 py-2 rounded text-center"
                >
                  View Auction
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyBids;