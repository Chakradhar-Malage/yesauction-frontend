import { Eye, Gavel, Star, Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import StatCard from "./StatsCard";
import { ProfileStatsData } from "../../hooks/useProfileStats";
import { ROUTES } from "../../utils/routes";

export default function ProfileStats({ stats }: { stats: ProfileStatsData }) {
  const navigate = useNavigate();

  const items = [
    { label: "My Auctions", value: stats.myAuctions, icon: Gavel, to: ROUTES.myAuctions },
    { label: "Bids Placed", value: stats.bidsPlaced, icon: Eye, to: ROUTES.myBids },
    { label: "Won Auctions", value: stats.wonAuctions, icon: Trophy, to: ROUTES.wonAuctions },
    { label: "Watchlist", value: stats.watchlist, icon: Star, to: ROUTES.watchlist },
  ];

  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold text-gray-900">Auction Activity</h2>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ label, value, icon, to }) => (
          <StatCard
            key={label}
            label={label}
            value={stats.loading ? undefined : value}
            icon={icon}
            onClick={() => navigate(to)}
          />
        ))}
      </div>
    </section>
  );
}