import Sidebar from "../Components/Dashboard/Sidebar";
import StatsCards from "../Components/Dashboard/StatsCard";
import { useMyAuctions } from "../hooks/useMyAuctions";
import AuctionCard from "../Components/Auction/auctionCard";
import DashboardAuctionCard from "../Components/Dashboard/DashboardAuctionCard";

const SellerDashboard = () => {
  const { auctions, loading } = useMyAuctions();

  return (
    <div className="flex">
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <div className="flex-1 p-8 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        {/* STATS */}
        <StatsCards />

        {/* RECENT AUCTIONS */}
        <h2 className="text-xl font-semibold mb-4 mt-8">
          Recent Auctions
        </h2>

        {loading ? (
          <p>Loading...</p>
        ) : auctions.length === 0 ? (
          <p className="text-gray-500">
            No auctions created yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {auctions.slice(0, 3).map((auction: any) => (
  <DashboardAuctionCard
    key={auction.id}
    id={auction.id}
    title={auction.title}
    currentPrice={auction.currentPrice}
  />
))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerDashboard;