import { Star } from "lucide-react";
import { ProfileStatsData } from "../../hooks/useProfileStats";

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR", // change if you use another currency
    maximumFractionDigits: 0,
  }).format(amount);

export default function SellerReputation({ stats }: { stats: ProfileStatsData }) {
  const { seller, loading } = stats;

  const tiles = [
    { label: "Auctions Listed", value: seller?.totalAuctions },
    { label: "Active Bids", value: seller?.activeBids },
    {
      label: "Total Earnings",
      value: seller ? formatCurrency(seller.totalEarnings) : undefined,
    },
  ];

  return (
    <section className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Seller Summary</h2>
          <p className="mt-1 text-sm text-gray-500">
            Your performance as a seller on the marketplace.
          </p>
        </div>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-yellow-50 text-yellow-500">
          <Star className="h-6 w-6 fill-yellow-400" aria-hidden="true" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {tiles.map(({ label, value }) => (
          <div key={label} className="rounded-lg bg-gray-50 p-4 text-center">
            <p className="text-2xl font-semibold text-gray-900">
              {loading ? "…" : value ?? "—"}
            </p>
            <p className="mt-1 text-xs text-gray-500">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}