import useAuctions from "../../hooks/useAuctions";
import AuctionCard from "../Auction/auctionCard";

export default function EndingSoon() {
  const { auctions } = useAuctions();
  const sorted = auctions
    .filter((auctions) => {
      const endTime = new Date(auctions.endTime);
      const remaningTime = endTime.getTime() - new Date().getTime();

      return remaningTime > 0 && remaningTime < 48 * 60 * 60 * 1000; // Ending within 48 hours
    })
    .sort(
      (a, b) => new Date(a.endTime).getTime() - new Date(b.endTime).getTime(),
    );

  const endingSoon = sorted.slice(0, 3);

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-10 text-center">Ending Soon</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {endingSoon.map((auction) => (
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
      </div>
    </section>
  );
}
