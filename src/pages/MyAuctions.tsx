import { useMyAuctions } from "../hooks/useMyAuctions";
import AuctionCard from "../Components/Auction/auctionCard";
import Navbar from "../Components/layout/Navbar";

const MyAuctions = () => {
  const { auctions, page, setPage, totalPages, loading } = useMyAuctions();

  if (loading) {
    return (
      <p className="text-center mt-10 text-lg font-semibold">
        Loading your auctions...
      </p>
    );
  }

  // Stats
  const total = auctions.length;
  const active = auctions.filter(
    (a: any) => new Date(a.endTime) > new Date()
  ).length;
  const ended = total - active;

  return (
    
      <><Navbar />
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Seller Dashboard</h1>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Total Auctions</p>
          <h2 className="text-2xl font-bold">{total}</h2>
        </div>

        <div className="bg-green-100 p-6 rounded-xl shadow">
          <p className="text-gray-600">Active</p>
          <h2 className="text-2xl font-bold text-green-700">{active}</h2>
        </div>

        <div className="bg-gray-200 p-6 rounded-xl shadow">
          <p className="text-gray-600">Ended</p>
          <h2 className="text-2xl font-bold">{ended}</h2>
        </div>

      </div>

      {/* EMPTY STATE */}
      {auctions.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg mb-4">
            You haven't created any auctions yet.
          </p>

          <a
            href="/create-auction"
            className="bg-blue-600 text-white px-6 py-2 rounded"
          >
            Create Your First Auction
          </a>
        </div>
      ) : (
        <>
          {/* GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {auctions.map((auction: any) => {
              const isActive = auction.status === "ACTIVE";

              return (
                <div key={auction.id} className="relative">

                  {/* STATUS BADGE */}
                  <span
                    className={`absolute top-3 left-3 text-xs px-2 py-1 rounded text-white ${isActive ? "bg-green-600" : "bg-gray-600"}`}
                  >
                    {isActive ? "LIVE" : "ENDED"}
                  </span>

                  <AuctionCard
                    id={auction.id}
                    title={auction.title}
                    description={auction.description}
                    currentPrice={auction.currentPrice}
                    endTime={auction.endTime}
                    imageUrl={auction.imageUrl}
                    showActions={true} // show edit/delete buttons
                  />
                </div>
              );
            })}

          </div>

          {/* PAGINATION */}
          <div className="flex justify-center items-center gap-4 mt-10">

            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 0}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Prev
            </button>

            <span className="font-medium">
              Page {page + 1} of {totalPages}
            </span>

            <button
              onClick={() => setPage(page + 1)}
              disabled={page + 1 >= totalPages}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>

          </div>
        </>
      )}
    </div></>
  );
};

export default MyAuctions;