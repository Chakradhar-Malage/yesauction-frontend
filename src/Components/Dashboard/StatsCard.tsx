const StatsCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div className="bg-white rounded-xl shadow p-5">
        <p className="text-gray-500 text-sm">Total Auctions</p>
        <p className="text-3xl font-bold mt-1">—</p>
      </div>

      <div className="bg-white rounded-xl shadow p-5">
        <p className="text-gray-500 text-sm">Active Bids</p>
        <p className="text-3xl font-bold mt-1">—</p>
      </div>

      <div className="bg-white rounded-xl shadow p-5">
        <p className="text-gray-500 text-sm">Total Earnings</p>
        <p className="text-3xl font-bold mt-1">₹ —</p>
      </div>
    </div>
  );
};

export default StatsCards;