import Sidebar from "../Dashboard/Sidebar";
import StatsCards from "../Dashboard/StatsCard";
import { useMyAuctions } from "../../hooks/useMyAuctions";
import AuctionCard from "../Auction/auctionCard";

const SellerDashboard = () => {
  const { auctions, loading } = useMyAuctions();

  return (
    <div className="flex">
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <div className="flex-1 p-8 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        {/* STATS */}
        <StatsCards />

        {/* RECENT AUCTIONS */}
        <h2 className="text-xl font-semibold mb-4">Recent Auctions</h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {auctions.slice(0, 3).map((auction: any) => (
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
      </div>
    </div>
  );
};

export default SellerDashboard;