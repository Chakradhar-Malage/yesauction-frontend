import { useMyAuctions } from "../hooks/useMyAuctions";
import AuctionCard from "../Components/Auction/auctionCard";


const MyAuctions = () => {
  const { auctions, page, setPage, totalPages, loading } = useMyAuctions();

  if (loading) {
    return <p className="text-center mt-10">Loading your auctions...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Auctions</h1>
      </div>

      {/* Empty State */}
      {auctions.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">
            You haven't created any auctions yet.
          </p>
        </div>
      ) : (
        <>
          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {auctions.map((auction: any) => (
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

          {/* Pagination */}
          <div className="flex justify-center items-center gap-4 mt-8">
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
    </div>
  );
};

export default MyAuctions;