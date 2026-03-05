import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

interface Auction {
  id: number;
  title: string;
  description: string;
  currentPrice: string;
  endTime: string;
}

export default function AuctionList() {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const isGuest = !token;

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/auctions")
      .then((res) => {
        setAuctions(res.data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  if (loading)
    return (
      <div className="text-center py-20 text-xl font-semibold animate-pulse">
        Loading auctions...
      </div>
    );

  const visibleAuctions = isGuest ? auctions.slice(0, 3) : auctions;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">

      {/* HEADER */}
      <div className="text-center mb-14">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Live Auctions
        </h1>
        <p className="text-gray-500 mt-3">
          Bid on exclusive items in real-time
        </p>
      </div>

      {/* AUCTION GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

        {visibleAuctions.map((auction) => (

          <div
            key={auction.id}
            className="group bg-white border rounded-xl p-6 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >
            {/* TITLE */}
            <h2 className="text-xl font-bold mb-2 group-hover:text-blue-600">
              {auction.title}
            </h2>

            {/* DESCRIPTION */}
            <p className="text-gray-600 mb-5 line-clamp-2">
              {auction.description}
            </p>

            {/* PRICE */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-500 text-sm">Current Bid</span>

              <span className="text-2xl font-bold text-green-600">
                ${auction.currentPrice}
              </span>
            </div>

            {/* END TIME */}
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>Ends</span>
              <span className="font-medium">
                {new Date(auction.endTime).toLocaleString()}
              </span>
            </div>

            {/* ACTION BUTTON */}
            <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
              View Auction
            </button>
          </div>

        ))}

      </div>

      {/* LOCKED SECTION */}
      {isGuest && auctions.length > 3 && (

        <div className="mt-16 text-center">

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border rounded-2xl p-12 shadow-lg">

            <div className="text-5xl mb-4">🔒</div>

            <h2 className="text-3xl font-bold mb-3">
              Unlock All Auctions
            </h2>

            <p className="text-gray-600 mb-8">
              Create an account to view and participate in hundreds of live auctions.
            </p>

            <div className="flex justify-center gap-5 flex-wrap">

              <Link
                to="/login"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition"
              >
                Register
              </Link>

              <Link
                to="/trial"
                className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition"
              >
                Start 5-Day Free Trial
              </Link>

            </div>
          </div>

        </div>

      )}

    </div>
  );
}