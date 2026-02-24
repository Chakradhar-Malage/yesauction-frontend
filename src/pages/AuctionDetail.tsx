import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuctionWebSocket } from '../hooks/useAuctionWebSocket';

// Helper to get token from localStorage (set it after login)
const getToken = () => localStorage.getItem('token') || '';

const AuctionDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const auctionId = id ? parseInt(id) : null;

  const { updates, connected, error } = useAuctionWebSocket(auctionId);

  const [auction, setAuction] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [bidAmount, setBidAmount] = useState<string>('');

  // Fetch initial auction data
  useEffect(() => {
    if (!auctionId) return;

    const fetchAuction = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:8081/api/auctions/${auctionId}`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        setAuction(res.data);
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAuction();
  }, [auctionId]);

  // Apply WebSocket updates on top of initial data
  useEffect(() => {
    if (updates.length > 0 && auction) {
      const latest = updates[updates.length - 1];
      setAuction((prev: any) => ({
        ...prev,
        currentPrice: latest.currentPrice,
        // If backend sends more fields, merge them here
      }));
    }
  }, [updates, auction]);

  const handlePlaceBid = async () => {
    if (!bidAmount || isNaN(parseFloat(bidAmount))) {
      alert('Enter a valid bid amount');
      return;
    }

    try {
      await axios.post(
        `http://localhost:8081/api/auctions/${auctionId}/bid`,
        { amount: parseFloat(bidAmount) },
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      setBidAmount(''); // clear input
      alert('Bid placed! Watch for live update.');
    } catch (err: any) {
      alert('Bid failed: ' + (err.response?.data?.error || err.message));
    }
  };

  if (loading) return <div className="text-center py-10">Loading auction...</div>;
  if (!auction) return <div className="text-center py-10">Auction not found</div>;

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-8">
      <h1 className="text-3xl font-bold mb-4">{auction.item?.title || 'Auction'}</h1>
      <p className="text-gray-600 mb-6">{auction.item?.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <p className="text-xl">
            Current Price:{' '}
            <span className="text-3xl font-bold text-green-600">
              ${auction.currentPrice}
            </span>
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Ends at: {new Date(auction.endTime).toLocaleString()}
          </p>
        </div>

        <div>
          <p>Connection: {connected ? '🟢 Live' : '🔴 Disconnected'}</p>
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </div>

      {/* Bid input */}
      <div className="flex items-center gap-4 mb-8">
        <input
          type="number"
          step="0.01"
          min={(parseFloat(auction.currentPrice) + 1).toFixed(2)}
          value={bidAmount}
          onChange={(e) => setBidAmount(e.target.value)}
          placeholder="Enter bid amount"
          className="border p-3 rounded w-64"
        />
        <button
          onClick={handlePlaceBid}
          className="bg-blue-600 text-white px-8 py-3 rounded hover:bg-blue-700"
        >
          Place Bid
        </button>
      </div>

      {/* Live bid activity */}
      {updates.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Live Activity</h2>
          <ul className="space-y-3 max-h-60 overflow-y-auto">
            {updates.map((update, i) => (
              <li key={i} className="bg-gray-50 p-4 rounded border">
                <strong>${update.latestBid?.amount}</strong> by{' '}
                <strong>{update.latestBid?.bidderUsername}</strong>
                <span className="text-sm text-gray-500 ml-4">
                  {new Date(update.latestBid?.bidTime || '').toLocaleTimeString()}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AuctionDetail;