import { useSellerStats } from "../../hooks/useSellerStats";

const StatCard = ({
  label,
  value,
  loading,
  prefix,
}: {
  label: string;
  value: string | number;
  loading: boolean;
  prefix?: string;
}) => (
  <div className="bg-white rounded-xl shadow p-5">
    <p className="text-gray-500 text-sm">{label}</p>
    {loading ? (
      <div className="h-8 mt-2 w-16 bg-gray-200 rounded animate-pulse" />
    ) : (
      <p className="text-3xl font-bold mt-1">
        {prefix}
        {value}
      </p>
    )}
  </div>
);

const StatsCards = () => {
  const { stats, loading, error } = useSellerStats();

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 text-sm rounded-xl p-4 mb-6">
        Couldn't load your stats. Try refreshing the page.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <StatCard
        label="Total Auctions"
        value={stats?.totalAuctions ?? 0}
        loading={loading}
      />
      <StatCard
        label="Active Bids"
        value={stats?.activeBids ?? 0}
        loading={loading}
      />
      <StatCard
        label="Total Earnings"
        value={(stats?.totalEarnings ?? 0).toLocaleString("en-IN")}
        loading={loading}
        prefix="₹ "
      />
    </div>
  );
};

export default StatsCards;