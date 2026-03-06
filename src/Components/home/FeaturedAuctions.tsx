import AuctionCard from "../Auction/auctionCard";
import useAuctions from "../../hooks/useAuctions";

export default function FeaturedAuctions() {
  const { auctions, loading } = useAuctions();

  if (loading) {
    return <p className="text-center py-10">Loading auctions...</p>;
  }

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-10 text-center">
          Featured Auctions
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {auctions.slice(0, 6).map((auction) => (
            <AuctionCard
              key={auction.id}
              title={auction.title}
              description={auction.description}
              currentPrice={Number(auction.currentPrice)}
              endTime={auction.endTime}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
