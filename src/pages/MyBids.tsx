import { useMyBids } from "../hooks/useMyBids";
import AuctionCard from "../Components/Auction/auctionCard";

const MyBids = () => {
  const { bids, loading } = useMyBids();

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>My Bids</h2>

      {bids.length === 0 ? (
        <p>No bids placed yet.</p>
      ) : (
        bids.map((bid: any) => (
          <div key={bid.id}>
            {/* <AuctionCard auction={bid.auction} /> */}
            <p>Your Bid: ₹{bid.amount}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default MyBids;